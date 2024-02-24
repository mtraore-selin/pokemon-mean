## Prerequisites

- Docker
- Node v18+ (if running pokemon service locally)

## Docker environment

```bash
# Builds, (re)creates, starts, and attaches to containers for a service in detached mode. Ommit -d if you don't want to run in detached mode.
$ docker compose up -d
```

## Running application locally

If you want to run the application locally in development/watch mode, follow these steps:

```bash
$ docker compose down

$ docker compose up mongo mongo-seed -d

$ npm run start
or
$ npm run start:dev
or
$ npm run start:prod
```

npm install @nestjs/jwt passport passport-local bcrypt
