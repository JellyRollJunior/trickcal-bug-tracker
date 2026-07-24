## Trickcal Bug Tracker

Typescript React Express monorepo v2

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

## Endpoints

| Method | URI                   | Function                   | Body (inputs)                   | Outputs         | Notes                                                                           |
| ------ | --------------------- | -------------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------- |
| POST   | /auth/signup          | Signup                     | username, password, displayName | { displayName } | password: { 8 - 16 characters, uppercase, lowercase, number, special character} |
| POST   | /auth/login           | Login                      | username, password              | { token }       |                                                                                 |
| POST   | /auth/github          | GitHub oauth2 login/signup |                                 |                 | Login with GitHub oauth. Creates an account if no account exists                |
| POST   | /auth/github/callback | GitHub oauth2 callback     |                                 | { token }       | Callback to receive token after successful authorization                        |
| GET    | /boards               | get boards                 |                                 | { token }       |                                                                                 |
| POST   | /boards               | create boards              |                                 | { token }       |                                                                                 |
| GET    | /boards/:boardId      | get board by id            |                                 | { token }       |                                                                                 |

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

## TODO

- later
    - set token to proper expire time

| Method | URI                                         |
| ------ | ------------------------------------------- |
| POST   | /boards/:boardId/sections                   |
| PATCH  | /section/:sectionId                         |
| DELETE | /section/:sectionId                         |
| POST   | /boards/:boardId/sections/:sectionId/ticket |
| PATCH  | /ticket/:ticketId                           |
| DELETE | /ticket/:ticketId                           |

## Process

- validate board route inputs
- Create ticket route
    -
- socket events
    - export io

## Planned features

- docker compose setup
- presence tracking
- redis cache
- redis horizontal scaling w/ socket io
- redis zero downtime updates
- login attempt rate limit
- user is editing tracker

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
