# lf-player

> player feature for SoundCloud song page

## Related Projects

  - https://github.com/HITC-01/lf-player
  - https://github.com/HITC-01/BP-related_tracks
  - https://github.com/HITC-01/ms-comment
  - https://github.com/HITC-01/GK-user

## Table of Contents

1. [Steps to startup](#startup)
1. [Database](#database)
1. [Requirements](#requirements)
1. [Development](#development)

## Startup

To run everything, follow this process.

1. Install dependencies (see [Dependencies](#dependencies))
2. Edit the created .env file for your environment, with the following format: `VAR=input`
3. Seed the database (see [DB section](#database))
4. Run the [development commands](#development) on different terminals.
5. Navigate to `localhost:PORT` on a browser!

## Database

> To seed the DB run the following lines. You may need to change the username depending on your machine

```sh
cd database/seeding
bash dbSeed.sh
$MYSQL_EXEC  -u root < ../playerSchema.sql
$MYSQL_EXEC  -u root < dataSeeded.sql
cd ../../
```

Where `$MYSQL_EXEC` is the path/name of mySQL on your local

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

From within the root directory:

```sh
nodemon server/index.js
webpack-cli  --watch
./node_modules/sass/sass.js --watch public/assets/styles/main.scss public/assets/styles/main.css
```

### Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
