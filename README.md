# nnotif

![example workflow](https://github.com/guillerglez88/nnotif/actions/workflows/ci-cd.yml/badge.svg)

Prove of concept for a user notifications platform in NodeJS

## Architecture

![arch diagram](docs/imgs/arch.jpg)

The key aspect of this architecture is the RESTfull style and the restrictions that compose REST architecture style itself:

- Stateless
- Cacheable
- Uniform interface
- Layered

### Techs

 | tech               |      version | desc                         |
 | ------------------ | -----------: | ---------------------------- |
 | **Node**           | `    19.5.0` | *platform*                   |
 | **ExpressJS**      | `    4.18.2` | *web api*                    |
 | **TypeScript**     | `     4.9.4` | *lang*                       |
 | **ESLint**         | `    8.32.0` | *linter*                     |
 | **Prettier**       | `     2.8.3` | *formatter*                  |
 | **Jest**           | `    29.4.1` | *test*                       |
 | **Postgres**       | `      14.5` | *polyglot-dbms(SQL & NoSql)* |
 | **Docker(linux)**  | `    4.13.0` | *container*                  |
 | **node-alpine**    | `lts-alpine` | *docker-image(LTS)*          |
 | **docker-compose** | `    2.11.2` | *orchestrator:dev*           |
 | **Kubernetes**     | `      1.25` | *orchestrator:prod*          |
 | **Helm**           | `    3.11.0` | *kube pkg manager*           |

CI-CD is achieved via a combination of docker-build & GitHub Actions. That is, you can have the workflow locally by running `docker build` because of the multi-stage Dockerfile which executes a bunch of CI tasks: `[restore-pks, build, lint, test, publish]`. This approach also ensures portability to any CI-CD runner.

Security is aproached by adding ingress only for public service in the cluster, the rest of the services remain in the private network of the cluster. Ideally OAuth should be supported for server-to-server authN & authZ. Haven't had time to implement OAuth for this version of the platform. There are many other features missing, not only OAuth, but also: OTel and APM are very important for the platform in order to improve monitoring and observability.

## Components

### nnotif-dynarest

RESTserver, with uniform interface, supports only RESTfull interactions, that is, everything is a Resource, and operations on resources are the standard ones:

```
GET /:type/:id
GET /List?of=:type&...

---

POST /:type
Content-Type: application/json

{...}

---

PUT /:type/:id
Content-Type: application/json

{...}

---

DELETE /:type/:id

---

PATCH /:type/:id
Content-Type: application/json

{...}
```

> ❗A distinguishing route path pattern here is the list resource route. Usually `GET /:type` is the preferred pattern for this kind of interactions but this doesn't is very RESTfull at all, because the kind of resource will vary in schema depending on when you are fetching a single resource or listing the resources. Moving to an approach where exists a `List` resource is a better approach and keeps the **Uniform Interface** constraint. It also adds the ability to store list of resources as a static list, implement pagination and navigation on top of `List` resource type.

Recommended optimization mechanisms like `ETag` has been implemented as well adding capability for caching taking advantage of network proxies caches.

### nnotif-public

This one is the public back-for-from, a middleware, or layer according to **Layered** restriction of REST. This service is very lightweight. Right now delegates all CRUD operations to dynarest, and adds validation and model translation. In the future, validation will be part of **dynarest**, in the form of validation as data, this hasn't been implemented yet though.

### nnotif-postman

This one will be the responsible for delivering every kind of notifications based on the subscription mechanism supported by **dynarest**. This service will use kafka as a support service for implementing fire-and-forget and queue of messages.

### Postgres

Postgres is used as the database management system because of it's feature of being polyglot, that is SQL and NO-SQL, as well as for it's great support for json and jsonb. Postgres supports ACID db operations as well as sql queries on top of json, great features for information systems and ETLs allowing data warehousing, data analisis and reporting from well stabblished tools.

### Kubernetes

This one allows platform resources management, balancing, scaling, monitoring and security. Since dynarest still doesn't support OAuth, kubernetes acts as a shield preventing request to reach the private network where unprotected services run.

### Helm

The package manager for kubernetes and the kubernetes build runner for getting the multi or single file for updating kubernetes cluster.

1- config hosts

If installing locally, add kube to hosts file. Example in linux:

`/etc/hosts`

add this line:

`127.0.0.1	nnotif.kubernetes.docker.internal`

2- install ingress-nginx

```
$> helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

IMPORTANT: wait 3 minutes for ingress to get ready

3- Gen docker images

deploayments are configured to never pull images, that is, use local registry images always, this means you have to run docker build or `docker compose up --build` at least once in order to generate docker images to be used by kubernetes deployments.

4- Deploy

```
$> cd ./kube/prod
$> ./deploy
```

### Docker

Present in the core of the architecture, docker allows the construction of microservices in order to extend the platform, either as middlewares or as notification transport services support, as well as allowing horizontal scaling in combination with kubernetes.

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
| remove      |      ✅      | `DELETE /:type/:id    ` |
| search      |      ❌      | `GET    /List?of=:type` |
| etag        |      ✅      | `GET    /:type/:id    ` |
| resource    |      ✅      | `POST   /Resource     ` |
| seq         |      ❌      | `POST   /Seq          ` |
| validations |      ❌      | `POST   /:type        ` |

### API

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
│   │   └── resource           // new resource type provisioning
│   │       ├── index.ts
│   │       └── trn.json.tpl
│   ├── nerves                 // REST operations
│   │   ├── create.ts          // POST /:type
│   │   ├── index.ts
│   │   ├── not-found.ts       // fallback at "/", not-implemented
│   │   ├── read.ts            //    GET /:type/:id     
│   │   ├── remove.ts          // DELETE /:type/:id     | not-implemented
│   │   ├── search.ts          //    GET /List?of=:type | not-implemented
│   │   ├── update.ts          //   POST /:type/:id     
│   │   └── upsert.ts          //    PUT /:type/:id     
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
│   │   ├── resource.test.ts   // resources normalization tests
│   │   ├── response.test.ts   // ExpressJS response utilities tests
│   │   └── routes.test.ts     // REST routes utilities tests
│   └── sanity.test.ts         // tests precondition checks
├── tsconfig.build.json        // build tscofig
├── tsconfig.json              // dev tsconfig
└── .vscode                    // vscode configs
    ├── launch.json
    └── tasks.json
```

## nnotif-public [wip 🛠]

Public back-for-front, RESTfull, subscriptions service. It works like a middleware between client apps and nnotif-dynarest. It narrows functionalities, scope and adding tailored validations.

### Capabilities

| operation | implemented | sample request         |
| --------- | :---------: | ---------------------- |
| subscribe |      ✅      | `POST   /subs        ` |
| details   |      ✅      | `GET    /subs/:id    ` |
| edit      |      ✅      | `PUT    /subs/:id    ` |
| list      |      ❌      | `GET /subs           ` |

### API

#### Subscribe:ok

**request -->**

```http
POST http://localhost:3001/subs
Accept: application/json
Content-Type: application/json

{
    "status": "active",
    "name": {
        "given": [
            "John"
        ],
        "family": ["Doe"]
    },
    "email": "nnotif-no-reply@mailinator.com",
    "gender": "male",
    "dob": "1988-04-18",
    "consent": true,
    "newsLetterId": "f03aad4e"
}
```

**response <--**

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Location: /subs/0b615089-59c3-4f00-b370-e12158d375f3
ETag: "697"
Content-Type: application/json; charset=utf-8
Content-Length: 226
Date: Tue, 31 Jan 2023 17:30:25 GMT
Connection: close

{
  "id": "0b615089-59c3-4f00-b370-e12158d375f3",
  "status": "active",
  "email": "nnotif-no-reply@mailinator.com",
  "name": {
    "given": [
      "John"
    ],
    "family": [
      "Doe"
    ]
  },
  "gender": "male",
  "dob": "1988-04-18",
  "consent": true,
  "newsLetterId": "f03aad4e"
}
```

#### Subscribe:err

**request -->**

```http
POST http://localhost:3001/subs
Accept: application/json
Content-Type: application/json

{
    "status": "active",
    "name": {
        "given": [
            "John"
        ],
        "family": ["Doe"]
    },
    "gender": "male",
    "dob": "1988-04-18",
    "consent": true,
    "newsLetterId": "f03aad4e"
}
```

**response <--**

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 146
ETag: W/"92-dcwv9+IxW9fyy/8CH86xj9t5fu0"
Date: Tue, 31 Jan 2023 17:35:09 GMT
Connection: close

{
  "type": "Outcome",
  "issues": [
    {
      "level": "error",
      "code": "/Coding/nnotif-public-subs-issue?code=required",
      "desc": "Prop: `email: string` is required"
    }
  ]
}
```

#### Edit

Edit subscription with status: cancelled, means you are cancelling subscription.

**request -->**

```http
PUT http://localhost:3001/subs/338981fb-c1e6-4647-b8fc-3f1d950ea205
Accept: application/json
Content-Type: application/json

{
    "status": "cancelled",
    "name": {
        "given": [
            "John"
        ],
        "family": ["Doe"]
    },
    "email": "nnotif-no-reply@mailinator.com",
    "gender": "male",
    "dob": "1988-04-18",
    "consent": true,
    "newsLetterId": "f03aad4e"
}
```

**response <--**

```http
HTTP/1.1 200 OK
X-Powered-By: Express
ETag: "721"
Content-Type: application/json; charset=utf-8
Content-Length: 226
Date: Tue, 31 Jan 2023 17:38:07 GMT
Connection: close

{
  "id": "338981fb-c1e6-4647-b8fc-3f1d950ea205",
  "status": "cancelled",
  "email": "nnotif-no-reply@mailinator.com",
  "name": {
    "given": [
      "John"
    ],
    "family": [
      "Doe"
    ]
  },
  "gender": "male",
  "dob": "1988-04-18",
  "consent": true,
  "newsLetterId": "f03aad4e"
}
```

### Get Subs

**request -->**

```http
GET http://localhost:3001/subs/10c9aeb5-2d11-4038-aebb-79638445b0c1
```

**response <--**

```http
HTTP/1.1 200 OK
X-Powered-By: Express
ETag: "685"
Content-Type: application/json; charset=utf-8
Content-Length: 226
Date: Tue, 31 Jan 2023 17:40:52 GMT
Connection: close

{
  "id": "10c9aeb5-2d11-4038-aebb-79638445b0c1",
  "status": "cancelled",
  "email": "nnotif-no-reply@mailinator.com",
  "name": {
    "given": [
      "John"
    ],
    "family": [
      "Doe"
    ]
  },
  "gender": "male",
  "dob": "1988-04-18",
  "consent": true,
  "newsLetterId": "f03aad4e"
}
```

### Dev

```
$> git clone https://github.com/guillerglez88/nnotif.git

$> docker compose up --build

$> cd ./nnotif-public
$> cp ./.env.tpl ./.env
$> npm run dev
```

### FS

```
.
├── docker-compose.debug.yml
├── docker-compose.yml
├── Dockerfile                  // multi-stage dockerfile
├── .dockerignore
├── .env.tpl                    // must: $> cp ./.env.tpl ./.env
├── .eslintignore
├── .eslintrc.json              // linter config
├── jest.config.json            // test runner config
├── package.json
├── package-lock.json
├── .prettierrc.json            // formatter config
├── src
│   ├── app.ts
│   ├── bin
│   │   └── www.ts
│   ├── libs                    // utility functions
│   │   ├── config.ts           // env abstraction
│   │   ├── dob.ts              // date of birth related functions
│   │   ├── email.ts            // email related functions
│   │   ├── funcs.ts            // helper functions
│   │   ├── mappers.ts          // dto mapping functions
│   │   └── outcome.ts          // validation result functions
│   ├── routes
│   │   └── subs.ts             // subs routes
│   ├── services                
│   │   ├── dynarest.ts         // backend abstraction
│   │   └── validation.ts       // validations service
│   └── types
│       ├── aliases.ts          // weird types aliases
│       ├── data.ts             // data types
│       ├── json.d.ts           // json modules type def
│       └── validation.ts       // validations types
├── test                        // tests, same fs structure as src
│   ├── fixture.ts              // static test data
│   ├── libs
│   │   ├── mappers.test.ts     // dto mapper tests
│   │   └── outcome.test.ts     // validation result tests
│   ├── sanity.test.ts          // test precondition checks
│   └── services
│       └── validation.test.ts  // validation service tests
├── tsconfig.build.json
├── tsconfig.json
└── .vscode
    ├── launch.json
    └── tasks.json
```