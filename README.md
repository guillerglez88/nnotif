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
| test              | jest           |     29.4.1 |                       |
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

### FS

```
.
├── docker-compose.debug.yml
├── docker-compose.yml
├── Dockerfile                 // multi-stage Dockerfile
├── .dockerignore
├── .env.tpl                   // must: $> cp ./.env.tpl ./.env
├── .eslintignore
├── .eslintrc.json             // linter config
├── jest.config.json           // test runner config
├── package.json
├── package-lock.json
├── .prettierrc.json           // formatter config
├── src
│   ├── app.ts
│   ├── bin
│   │   └── www.ts
│   ├── data                   // data access stufs
│   │   ├── ddl.ts             // SQL-DDL operations
│   │   ├── dml.ts             // SQL-DML operations
│   │   ├── dql.ts             // SQL-DQL operations
│   │   ├── storage.ts         // repository abstraction
│   │   └── transaction.ts     // db transactions operations
│   ├── libs                   // utility functions
│   │   ├── config.ts          // env strongly typed
│   │   ├── resource.ts        // resources normalization
│   │   ├── response.ts        // ExpressJS response utilities
│   │   └── routes.ts          // REST routes utilities
│   ├── modules                // feature modules
│   │   └── resource
│   │       ├── index.ts
│   │       └── trn.json.tpl
│   ├── nerves                 // REST operations
│   │   ├── create.ts          // POST /:type
│   │   ├── index.ts
│   │   ├── not-found.ts       // fallback at "/", not-implemented
│   │   ├── read.ts            // GET /:type/:id
│   │   ├── remove.ts          // DELETE /:type/:id, not-implemented
│   │   ├── search.ts          // GET /List?of=:type, not-implemented
│   │   ├── update.ts          // POST /:type/:id
│   │   └── upsert.ts          // PUT /:type/:id
│   ├── routes
│   │   └── index.ts           // db-routes -> expressjs
│   ├── seed                   // app bootstrap
│   │   ├── bootstrap.json     // fundation data raw
│   │   └── index.ts
│   └── types
│       ├── aliases.ts         // aliasses for ugly types
│       ├── data.ts            // data access types
│       ├── fundation.ts       // REST types
│       └── json.d.ts          // .json modules type def
├── test                       // tests, file structure matches src file structure
│   ├── data                   // data access tests
│   │   ├── ddl.test.ts        // SQL-DDL tests
│   │   ├── dml.test.ts        // SQL-DML tests
│   │   └── dql.test.ts        // SQL-DQL tests
│   ├── fixture.ts             // static test data
│   ├── libs                   // utility functions tests
│   │   ├── resource.test.ts
│   │   ├── response.test.ts
│   │   └── routes.test.ts
│   └── sanity.test.ts         // tests precondition checks
├── tsconfig.build.json        // build tscofig
├── tsconfig.json              // dev tsconfig
└── .vscode                    // vscode configs
    ├── launch.json
    └── tasks.json
```