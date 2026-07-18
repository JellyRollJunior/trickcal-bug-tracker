# trickcal-bug-tracker

#### Includes

- Root
    - PNPM package manager
    - Workspace linking client/server/shared
    - Standardized TypeScript/Zod/Prettier version through workspace catalog
    - base TypeScript config
- Client
    - Vite Typescript, React, React compiler
    - React Router, TailwindCSS, Zod
    - Prettier Tailwind Config
    - Path Aliasing
        - @: './src'
    - Vitest w/ jsdom (render React components) & userEvent
    - Shared folder as dependency
- Server
    - TypeScript, Express, Zod, Cors
    - Jest supertest
    - Shared folder as dependency
- Shared
    - Typescript, Zod

### Workspace setup

1. Init pnpm at root
2. Follow guide to install TurboRepo [here](https://turborepo.dev/docs/getting-started/add-to-existing-repository)
    - Replace next.js outputs with node outputs (dist)
3. Standardize external package versions using pnpm workspace catalogs
4. Install TS and create TS configs at root

### Client setup

1. Follow guide [here](https://github.com/JellyRollJunior/typescript-react-express-template)
    - Template outdated, use `$ pnpm create vite`
    - Path aliasing outdated -> use files found in this repo: tsconfig.json, tsconfig.app.json, vite.config.ts, vitest.config.ts
    - Vitest config outdated -> use files found in this repo: vitest.config.ts

### Server setup

### Shared setup
1. Install dependencies
2. Add shared as workspace dependencies for client/server

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
