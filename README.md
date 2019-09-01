# Sidekicker Coding Challenge

## Setup
* Install [Docker](https://docs.docker.com/get-started/)
* Build: `docker-compose build`
* Run: `docker-compose up`
* Execute tasks: `docker-compose exec <container_name> <cmd>`. 
  * e.g. `docker-compose exec coding-challenge-backend php artisan migrate`

## Development
* React frontend: http://localhost
* Lumen backend: http://localhost:8000

## Migrate and seed database
Update fixture files at `backend/database/seeds/fixtures`

Shell in to backend docker image
```shell script
docker-compose run --rm coding-challenge-backend bash
```
and run:
```shell script
php artisan migrate:fresh
php artisan db:seed
```
