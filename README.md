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
