# varlock Demo

This repository is a small SvelteKit demo showing how to use `varlock` to resolve environment variables from 1Password without committing plaintext secrets to the repo.

The app is intentionally simple. It loads a few env vars on the server and renders them in the UI so you can verify that `varlock` resolved them correctly.

## What This Demo Shows

- Defining env vars in [`.env.schema`](/Users/thitemple/src/yt/varlock-demo/.env.schema) instead of a committed `.env`
- Using `@varlock/1password-plugin` to fetch secrets from 1Password
- Using `@varlock/vite-integration` so the schema is available during local development
- Accessing typed env values through `varlock/env`
- Keeping secret resolution in server-side code

## How It Works Here

This repo wires `varlock` into three places:

1. [`.env.schema`](/Users/thitemple/src/yt/varlock-demo/.env.schema) defines the env contract, validation rules, type generation, and 1Password lookups.
2. [`vite.config.ts`](/Users/thitemple/src/yt/varlock-demo/vite.config.ts) enables the `varlock` Vite plugin.
3. [`src/routes/+page.server.ts`](/Users/thitemple/src/yt/varlock-demo/src/routes/+page.server.ts) reads resolved values from `varlock/env`.

The generated types live in [`src/lib/env.d.ts`](/Users/thitemple/src/yt/varlock-demo/src/lib/env.d.ts).

## Example Schema

The schema in this repo uses `1Password` paths that change based on `APP_ENV`:

```dotenv
# @plugin(@varlock/1password-plugin)
# @currentEnv=$APP_ENV
# @initOp(token=$OP_TOKEN, allowAppAuth=forEnv(dev))

# @type=enum(dev, prod)
APP_ENV=dev

DATABASE_URL=op(`op://varlock-demo-$APP_ENV/database/DATABASE_URL`)
GOOGLE_CLIENT_ID=op(`op://varlock-demo-$APP_ENV/auth/GOOGLE_CLIENT_ID`)
GOOGLE_CLIENT_SECRET=op(`op://varlock-demo-$APP_ENV/auth/GOOGLE_CLIENT_SECRET`)
```

That means:

- `APP_ENV=dev` reads from `varlock-demo-dev`
- `APP_ENV=prod` reads from `varlock-demo-prod`

## Prerequisites

- `bun`
- a 1Password service account token
- 1Password items matching the paths referenced in [`.env.schema`](/Users/thitemple/src/yt/varlock-demo/.env.schema)

## Running The Demo

Install dependencies:

```sh
bun install
```

Export your 1Password token:

```sh
export OP_TOKEN=your_1password_service_account_token
```

Optionally switch environments:

```sh
export APP_ENV=dev
# or
export APP_ENV=prod
```

Start the app:

```sh
bun run dev
```

Open the local app and confirm the server rendered values are being resolved from 1Password.

## Important Caveat

This project is a demo. The page currently renders resolved values directly in the browser so you can confirm the integration is working.

Do not copy that pattern into a real app for sensitive secrets. In production code, keep secrets on the server and expose only the derived behavior you actually need.

## Useful Commands

```sh
bun run dev
bun run check
bun run lint
bun run db:push
```

## Relevant Files

- [`.env.schema`](/Users/thitemple/src/yt/varlock-demo/.env.schema): env schema, validation, and 1Password integration
- [`vite.config.ts`](/Users/thitemple/src/yt/varlock-demo/vite.config.ts): enables `varlockVitePlugin()`
- [`src/routes/+page.server.ts`](/Users/thitemple/src/yt/varlock-demo/src/routes/+page.server.ts): reads env values on the server
- [`src/lib/server/db/index.ts`](/Users/thitemple/src/yt/varlock-demo/src/lib/server/db/index.ts): example of using env for database setup
