## Description

Mini application for managing bank accounts, the ability to create them, replenish accounts and change statuses. The
logic of this application imposes some restrictions. For example, if the account has an inactive status, the user will
not be able to change the balance. If the limit is exceeded `dailyWithdrawalLimit`, the user will not be able to
withdraw money

###### This app has simple auth. Clients cannot see info about different clients

## Preparing

The .env file contains all the necessary variables for correct operation. Here is the value of the need

| Name              | Description                               | Default value                   |
|-------------------|-------------------------------------------|---------------------------------|
| POSTGRES_HOST     | postgres host                             |administration-clients-postgres-d|
| POSTGRES_PORT     | postgres port                             | 3000                            |
| POSTGRES_USER     | postgres user                             | postgres                        |
| POSTGRES_PASSWORD | postgres password                         | postgres                        |
| POSTGRES_DATABASE | name of database                          | administration-clients-db       |
| PORT              | port of the app                           | 3000                            |
| LIMIT_GET_BALANCE | the amount of money a user can withdraw per day | 4                         |
| JWT_SECRET_KEY    | jwt secret key                            | secret                          |
| JWT_EXPIRE        | time of living jwt token                  | 60                              |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with docker

```bash
$ docker-compose up
```

## Swagger

<a href="http://localhost:3000/api">
  <img src="https://seeklogo.com/images/S/swagger-logo-A49F73BAF4-seeklogo.com.png" height="80">
</a>

## Documentation

For check documentation, you can run this command^ 
```bash
$ npm run compodoc
```
After this, in folder of the project you will see folder `documention`

For check `coverage` documentation, you can run this command:
```bash
$ npm run compodoc:coverage
```
