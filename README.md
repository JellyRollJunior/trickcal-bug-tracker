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

## Learning Outcomes
- Prisma indexing
    - foreign keys not indexed by default
    - indexing based on actual query patterns, not defensively on every column
- Prisma nested creates

## TODO
- error handler
    - database error

- if null -> return 404 board not found
- get board by ID authorization check?
- Right now tickets has no select, so it pulls every field on Ticket — which is probably fine, since Ticket doesn't have obviously sensitive fields like User does. But it does mean you're fetching description (potentially large text) for every ticket just to render a Kanban card, when your card UI likely only needs id, summary, priority, severity, assignee, order for the board view itself:

- shared
    - type checks selects/includes -> shared types  

- later
    -   set token to proper  expire time



## Process
- get board route
    - setup controller
    - setup route
    - permission check
    - shared types
    - dto mapper

- board summary shared (for get /boards post /boards)
    - dto mapper

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
