# nnotif
Prove of concept for a user notifications platform in NodeJS

| tech              | choise         | version |
| ----------------- | -------------- | ------: |
| platform          | node           |  19.5.0 |
| db                | postgres       |    14.5 |
| lang              | typescript     |  4.09.4 |
| container         | docker(linux)  |  4.13.0 |
| dev-orchestrator  | docker-compose |  2.11.2 |
| prod-orchestrator | kubernetes     |    1.25 |


## Testing env startup

```
$> docker compose up --build
```