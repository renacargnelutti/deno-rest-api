# Deno Rest API (deno-rest-api)
This repo is used only to test Deno and PostgreSQL features.

---

#### Deno installation
To run the project you have to install Deno [here](https://deno.land/#installation)

---

#### PostgreSQL installation
In this project we are using postgres to save and retrieve data, so you have two options to choose:
##### 1) Docker - Docker Compose
Here you can run it with Docker and Docker compose (installation links: [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/)). Once you have it installed you can go to root folder and run:
```sh
> docker-compose -f docker/docker-compose.yaml up
```
##### 2) Existing server
If you have an existing PostgreSQL server you can define the connections values in:
*deno-rest-api/db/database.js*
---

#### Running
After installations steps you will be able to run the project located on root folder (The param -A is only for development and it allows every permission), with the following command:
```sh
> deno run -A index.ts
```

Project based on: [Dev.to website](https://dev.to/kryz/write-a-small-api-using-deno-1cl0)

##### Have fun and every doubt you can have, just let me know.