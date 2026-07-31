## Trickcal Bug Tracker

Typescript React Express monorepo v2

## Features

- App
    - 
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

## Endpoints

| Method | URI                                          | Function                   | Body (inputs)                                                                              | Outputs                        | Notes                                                                           |
| ------ | -------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------- |
| POST   | /auth/signup                                 | Signup                     | username, password, name                                                                   | userDto                        | password: { 8 - 16 characters, uppercase, lowercase, number, special character} |
| POST   | /auth/login                                  | Login                      | username, password                                                                         | { token }                      |                                                                                 |
| POST   | /auth/github                                 | GitHub oauth2 login/signup |                                                                                            |                                | Login with GitHub oauth. Creates an account if no account exists                |
| POST   | /auth/github/callback                        | GitHub oauth2 callback     |                                                                                            | { token }                      | Callback to receive token after successful authorization                        |
| GET    | /boards                                      | get boards                 |                                                                                            | boardDto[]                     |                                                                                 |
| POST   | /boards                                      | create boards              | name, description                                                                          | boardDto                       |                                                                                 |
| GET    | /boards/:boardId                             | get board by id            |                                                                                            | boardWithSectionsAndTicketsDto |                                                                                 |
| POST   | /boards/:boardId/sections                    | create section             | name, previousSectionId, nextSectionId                                                     | sectionDto                     |                                                                                 |
| POST   | /boards/:boardId/sections/:sectionId/tickets | create ticket              | issueType, category, reproducibility, summary, description, priority, severity, assigneeId | ticketDto                      |                                                                                 |

## Learning Outcomes

- Prisma indexing
    - foreign keys not indexed by default
    - indexing based on actual query patterns, not defensively on every column
- Prisma nested creates
- Solidify TypeScript data return workflow
    - DB object in Prisma Schema - Type name: Base
    - Query object with extras - Type name: BaseWithExtras
        - Query using custom reusable selects w/ Prisma Validator
        - Create intermediate types w/ Prisma GetPayload
    - Manipulate data, do logic with data, etc.
    - Map BaseWithExtras to dto & send to user - Type name: BaseDto or BaseWithExtrasDto
- Socket event vs Route
    - Does this need to happen many times per second/minute during normal use?
    - Can the UI reasonably proceed optimistically without waiting for confirmation?
- Solidify [router -> controller -> service -> query] architecture
    - If service logic in minimal, just directly call query from controller
        - Don't add extra layers to navigate for no reason
- One Prisma query does not necessarily equal One SQL query
    - verify with the following snippet!
- Prisma sorting -> PSQL uses local collation -> sorting string keys does not work as expect in JS
    - solution: manually edit SQL field to sort as expected (see prisma migration files)
- Docker + Docker compose
    - Writing dockerfile, docker-compose.yaml, .dockerignore, .env.docker
    - Containerizing PostgreSQL database, Node.js server, Vite ReactJs client
    - Composing above 3 ^
    - Multi stage builds to utilize layer caching
    - NGINX to serve client static files & use smaller base image
    - Workflow:
        - Develop on local
        - Periodically check everything works on container

## Process

- socket events: move item
    - move item query
    - define shared socket paramters
    - move item handler
    - move item register event handler


## TODO

- sockets
    - extract callback guard
- later
    - set token to proper expire time
- test
    - test extract order logic
- default board
    - extract default board settings
    - generate orders from fractional-idexing

| Method | URI                                         |
| ------ | ------------------------------------------- |
| PATCH  | /section/:sectionId                         |
| DELETE | /section/:sectionId                         |
| PATCH  | /ticket/:ticketId                           |
| DELETE | /ticket/:ticketId                           |

## Planned features

- presence tracking
- redis cache
- redis horizontal scaling w/ socket io
- redis zero downtime updates
- login attempt rate limit
- user is editing tracker
- oauth login in popup?

## template

const getBoard = async (
req: Request<{}, {}, {}>,
res: Response,
next: NextFunction
) => {
try {

    } catch (error) {
        next(error)
    }

};
