# nnotif

![example workflow](https://github.com/guillerglez88/nnotif/actions/workflows/ci-cd.yml/badge.svg)

Prove of concept for a user notifications platform in NodeJS

### Techs

|                   | tech           |    version | note                  |
| ----------------- | -------------- | ---------: | --------------------- |
| platform          | node           |     19.5.0 |                       |
| lang              | typescript     |      4.9.4 |                       |
| linter            | eslint         |     8.32.0 |                       |
| formatter         | prettier       |      2.8.3 |                       |
| api               | expressjs      |     4.18.2 |                       |
| db                | postgres       |       14.5 | polyglot(SQL & NoSql) |
| container         | docker(linux)  |     4.13.0 | docker-desktop        |
| orchestrator:dev  | docker-compose |     2.11.2 | docker-desktop        |
| orchestrator:prod | kubernetes     |       1.25 |                       |
| image             | node           | lts-alpine | lightweight & LTS     |

CI-CD is achieved via a combination of docker-build & GitHub Actions. That is, you can have the workflow locally by running `docker build` because of the multi-stage Dockerfile which executes a bunch of CI tasks: `[restore-pks, build, lint, test, publish]`. This approach also ensures portability to any CI-CD runner.

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

Open this [link](http://localhost:3000/Resource/resource) in browser to se self describing api

## nnotif-dynarest [wip 🛠]

In a star style architecture, this service represents the center of the star. It will bring all the core and generic features for all the platform. It is a dynamic, data-driven, metadata-oriented, self-descriving REST server. That is, everithing is data, including the routes being registered to ExpressJS.


### Capabilities

| operation   | implemented | sample request          |
| ----------- | :---------: | ----------------------- |
| create      |      ✅      | `POST   /:type        ` |
| read        |      ✅      | `GET    /:type/:id    ` |
| upsert      |      ✅      | `PUT    /:type/:id    ` |
| remove      |      ❌      | `DELETE /:type/:id    ` |
| search      |      ❌      | `GET    /List?of=:type` |
| etag        |      ✅      | `GET    /:type/:id    ` |
| resource    |      ✅      | `POST   /Resource     ` |
| seq         |      ❌      | `POST   /Seq          ` |
| validations |      ❌      | `POST   /:type        ` |

### Dev

```
$> git clone https://github.com/guillerglez88/nnotif.git

$> docker compose up --build

$> cd ./nnotif-dynarest
$> cp ./.env.tpl ./.env
$> npm run dev
```