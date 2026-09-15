## Trickcal Bug Tracker

Typescript React Express monorepo v2

## Features

- Backend
    - Auth
        - Github OAuth login, Username/Password login
        - JsonWebToken user state
        - Rate limiting on IP & username
    - Boards
        - CRUD operations
        - Add & Delete board collaborators
    - Sections
        - CRUD operations
    - Tickets
        - CRUD operations
        - Add & Delete ticket assignee
    - Socket Events
        - Notification of all board/section/ticket operations by server to client socket event
        - Presnsce tracking (who is currently viewing board)
        - Move ticket between sections by socket event
    - Horizontal Scaling On Sessions & SocketIO

- Repository
    - PNPM workspaces monorepo using TurboRepo
    - Repo wide build commands for local development with turborepo
    - Docker compose containerized environment for PostgreSQL Database & Node.JS Server & Vite React Client
        - server exposed on host localhost:3000
        - client exposed on host localhost:5173
        - db exposed on host port 5433

### Repo structure

```
root/
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── tsconfig.json
├── package.json
├── packages/
│   └── shared/
└── apps/
    ├── server/
    └── client/
```

## Start Commands

```bash
# Start container env
$ docker compose up
$ docker compose down

# Local build
$ pnpm install
$ turbo build
$ turbo start
$ turbo dev
```

## Endpoints & Socket Events

| Method | URI                                            | Function                   | Body (inputs)                                                                                  | Outputs                        | Notes                                                                           |
| ------ | ---------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| POST   | /auth/signup                                   | Signup                     | { username, password, name }                                                                   | userDto                        | password: { 8 - 16 characters, uppercase, lowercase, number, special character} |
| POST   | /auth/login                                    | Login                      | { username, password }                                                                         | { token }                      |                                                                                 |
| POST   | /auth/github                                   | GitHub oauth2 login/signup |                                                                                                |                                | Login with GitHub oauth. Creates an account if no account exists                |
| POST   | /auth/github/callback                          | GitHub oauth2 callback     |                                                                                                | { token }                      | Callback to receive token after successful authorization                        |
| GET    | /boards                                        | get boards                 |                                                                                                | boardDto[]                     |                                                                                 |
| POST   | /boards                                        | create boards              | { name, description }                                                                          | boardDto                       | name: { min: 1, max: 100 }, description: { min: 0, max: 1000 }                  |
| GET    | /boards/:boardId                               | get board by id            |                                                                                                | boardWithSectionsAndTicketsDto |                                                                                 |
| PATCH  | /boards/:boardId                               | patch board                | { name?, description? }                                                                        | boardDto                       | see POST /boards                                                                |
| DELETE | /boards/:boardId                               | delete board               |                                                                                                | boardDto                       | must be owner to delete board                                                   |
| POST   | /boards/:boardId/collaborators                 | add collaborator           | { collaboratorId }                                                                             | boardDto                       | must be owner to add collaborator                                               |
| DELETE | /boards/:boardId/collaborators/:collaboratorId | delete collaborator        |                                                                                                | boardDto                       | must be owner to delete collaborator                                            |
| POST   | /boards/:boardId/sections                      | create section             | { name, previousSectionId }                                                                    | sectionDto                     |                                                                                 |
| POST   | /boards/:boardId/sections/:sectionId/tickets   | create ticket              | { issueType, category, reproducibility, summary, description, priority, severity, assigneeId } | ticketDto                      |                                                                                 |
| PATCH  | sections/:sectionId                            | edit section               | { name }                                                                                       | sectionDto                     | name: { min: 1, max: 26 }                                                       |
| DELETE | sections/:sectionId                            | delete section             |                                                                                                | sectionDto                     |                                                                                 |
| PATCH  | tickets/:ticketId                              | update ticket              | { issueType, category, priority, severity, reproducibility, summary, description }             | ticketDto                      |                                                                                 |
| PUT    | tickets/:ticketId/assignee                     | update ticket assignee     | { assigneeId }                                                                                 | ticketDto                      | assignee must have board access                                                 |
| DELETE | tickets/:ticketId                              | delete ticket              |                                                                                                | ticketDto                      |                                                                                 |

| Client to server socket event | Arguments                                           | Use               |
| ----------------------------- | --------------------------------------------------- | ----------------- |
| 'connection'                  | token                                               | connect socket    |
| 'disconnect'                  |                                                     | disconnect socket |
| 'board:join_room'             | { boardId }, callback                               | join board room   |
| 'ticket:move'                 | { ticketId, sectionId, previousTicketId }, callback | move ticket       |

| Server to client socket event | Payload                                 | Use                                 |
| ----------------------------- | --------------------------------------- | ----------------------------------- |
| 'board:user-joined-room'      | { user }                                | notify user joined room             |
| 'board:user-left-room'        | { userId }                              | notify user left room               |
| 'board:edited'                | { board }                               | notify board name/desciption edited |
| 'board:deleted'               | { board }                               | notify board deletion               |
| 'board:added-collaborator'    | { user, board }                         | notify board collaborator added     |
| 'board:removed-collaborator'  | { user, board }                         | notify board collaborator deleted   |
| 'section:created'             | { boardId, section }                    | notify section created              |
| 'section:edited'              | { boardId, section }                    | notify section edited               |
| 'section:deleted'             | { boardId, section }                    | notify section deleted              |
| 'ticket:created'              | { boardId, ticket }                     | notify ticket created               |
| 'ticket:updated'              | { updatedBy, ticket }                   | notify ticket updated               |
| 'ticket:updated-assignee'     | { updatedBy, previousAssignee, ticket } | notify ticket assignee updated      |
| 'ticket:moved'                | { movedBy, previousSectionId, ticket }  | notify ticket moved                 |
| 'ticket:deleted'              | { deletedBy, ticket }                   | notify ticket deleted               |

## Learning Outcomes

- Prisma indexing
    - foreign keys not indexed by default
    - indexing based on actual query patterns, not defensively on every column
- Prisma nested create
- Solidify TypeScript data return workflow
    - DB object in Prisma Schema - Type name: Base
    - Query object with extras - Type name: BaseWithExtras
        - Query using custom reusable selects w/ Prisma Validator
        - Create intermediate types w/ Prisma GetPayload
    - Manipulate data, do logic with data, etc.
    - Map BaseWithExtras to dto & send to user - Type name: BaseDto or BaseWithExtrasDto
- Solidify TypeScript shared workflow
    - define schema, request body, dtos, socket events, errors in shared
    - import them in client / server
- Socket event vs Route
    - Does this need to happen many times per second/minute during normal use?
    - Can the UI reasonably proceed optimistically without waiting for confirmation?
- Solidify [router -> controller -> service -> query] architecture
    - If service logic in minimal, just directly call query from controller
        - Don't add extra layers to navigate for no reason
- One Prisma query does not necessarily equal One SQL query
- Prisma sorting -> PSQL uses local collation -> sorting string keys does not work as expect in JS
    - solution: manually edit SQL field to sort as expected (see prisma migration files)
- Docker & Docker compose
    - Writing dockerfile, docker-compose.yaml, .dockerignore, .env.docker
    - Containerizing PostgreSQL database, Node.js server, Vite ReactJs client
    - Composing above 3 ^
    - Multi stage builds to utilize layer caching
    - NGINX to serve client static files & use smaller base image
    - Workflow:
        - Develop on local
        - Periodically check everything works on container
- Prisma update input
    - Prisma generates a fully-optional "update input" type for every model
    - Simplifies typing the edit object
- Shared workflow
    - Shared imports from server
    - Setup server as source of truth tbh
- Setup local Redis instance
    - SSH into redis cli to view keys and values
    - Tested local installation & redis docker image
- Rate limiting
    - Using [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) & Redis
    - Only consume points on auth failure
    - Reset points on auth success
- Horizontal Scaling
    - Sessions: redis + [connect-redis](https://github.com/tj/connect-redis) + express-session
    - SocketIO: redis + [@socketio/redis-adapter](https://socket.io/docs/v4/redis-adapter/)

- Background image component w/ fixed positioning
- React Query (TanStack Query)
    - Query client setup + defaults, useQuery, useMutation, query/cache invalidation
- Solidify request pipeline
    - Hook uses TanStack to make request using our resource retrieval function -> resource retrieval function calls base api request function
    - On error, API request function uses resolveError to throw error returned by server -> resolved error is caught by useQuery so we can narrow the error using instanceof & handle
- Extracting component logic into hook to separate logic and UI

## Neat Bugs

- Database Prisma migration desync
    - Developing on local DB and testing on docker container DB instance causes migration drift
    - On docker compose server startup, execute prisma migration deploy to ensure DB sync
- Instanceof does not work on data received server!
    - Network serialization (JSON) strips prototype chains
    - Instanceof works by checking of our objects prototype is the same instance as the constructors
        - Object.getPrototypeOf(obj) === Constructor.prototype

## Current

## Todo list

backend
- get /users 

- auth
    - login w/ github
    - login w/ google
    - signup
- UI
    - display boards
    - display board
    - select board
- boards
    - get boards
    - get board
- section
    - edit section
- tickets
    - edit ticket
    - move ticket
    - create ticket

## Improvements

- assignedTo -> assigneeId
- set token to proper expire time
- default board
    - extract default board settings
    - generate orders from fractional-indexing
- empty payload 500 error expected?
