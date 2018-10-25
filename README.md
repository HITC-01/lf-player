# lf-player

> player feature for SoundCloud song page

## Related Projects

  - https://github.com/HITC-01/lf-player
  - https://github.com/teamName/BP-related_tracks
  - https://github.com/teamName/ms-comment
  - https://github.com/teamName/GK-user

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> To seed the DB run the following lines. You may need to change the username depending on your machine

```sh
cd database/seeding
bash dbSeed.sh
$MYSQL_EXEC  -u root < ../playerSchema.sql
$MYSQL_EXEC  -u root < dataSeeded.sql
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
