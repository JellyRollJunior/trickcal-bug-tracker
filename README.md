# trickcal-bug-tracker

# todo

1. setup turbo repo workspace
2. setup client package
3. setup server package
4. setup shared package

# Setting up a TS turborepo workspace with pnpm

1. Init pnpm at root
2. Follow guide to install TurboRepo [here](https://turborepo.dev/docs/getting-started/add-to-existing-repository)
    - Replace next.js outputs with node outputs (dist)
3. Standardize external package versions using pnpm workspace catalogs
4. Install TS and create TS configs at root
5. Setup shared package with tsconfig & Zod
6. Setup server package
    - TS/Zod from catalog, TSX for --watch

# Repo structure

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
