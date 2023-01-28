# nnotif

![example workflow](https://github.com/guillerglez88/nnotif/actions/workflows/ci-cd.yml/badge.svg)

Prove of concept for a user notifications platform in NodeJS

### Techs

|                   |                |            |
| ----------------- | -------------- | ---------: |
| platform          | node           |     19.5.0 |
| lang              | typescript     |      4.9.4 |
| linter            | eslint         |     8.32.0 |
| formatter         | prettier       |      2.8.3 |
| api               | expressjs      |     4.18.2 |
| db                | postgres       |       14.5 |
| container         | docker(linux)  |     4.13.0 |
| orchestrator:dev  | docker-compose |     2.11.2 |
| orchestrator:prod | kubernetes     |       1.25 |
| image             | node           | lts-alpine |


## Docker

### Specific service

Using `nnotif-dynarest` as example

#### Build

```
$> cd ./nnotif-dynarest
$> docker build -t build --progress=plain .
```

#### Start

```
$> cd ./nnotif-dynarest
$> docker compose up --build
```

### Whole Solution

```
$> docker compose up --build
```

## nnotif-dynarest [wip 🛠]

In star model architecture, this service represents the center of the star. It will bring all the core and generic features for all the platform. It is a dynamic, data-driven, metadata-oriented, self-descriving REST server.

### Dev

```
$> git clone https://github.com/guillerglez88/nnotif.git

$> docker compose up --build

$> cd ./nnotif-dynarest
$> cp ./.env.tpl ./.env
$> npm run dev
```