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

## TODO

- error handler
    - database error

- later
    - set token to proper expire time

## Process

- Errors
    - create 404 error

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
