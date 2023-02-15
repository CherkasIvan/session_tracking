## Description

Mini application for managing hotels numbers, the ability to create them.

## Preparing

The .env file contains all the necessary variables for correct operation. Here is the value of the need

| Name              | Description                               | Default value                   |
|-------------------|-------------------------------------------|---------------------------------|
| POSTGRES_HOST     | postgres host                             | localhost                       |
| POSTGRES_PORT     | postgres port                             | 3000                            |
| POSTGRES_USER     | postgres user                             | postgres                        |
| POSTGRES_PASSWORD | postgres password                         | postgres                        |
| POSTGRES_DATABASE | name of database                          | administration-clients-db       |
| PORT              | port of the app                           | 3000                            |

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
