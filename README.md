# TechExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## To serve the app

- you just need to run `docker-compose up`
- navigate to `http://localhost:3000/`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running e2e tests

the server should be running
`docker-compose up`
from another terminal

- without docker

change `e2e/cypress.json` baseurl from `app:3000` to `localhost:3000`

```
cd e2e
npm i
npx cypress run
```

####
