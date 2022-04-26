# TechExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## To serve the app
- Run `docker compose build`
- then Run `docker compose up`
  *this will serve the app to `http://localhost:3000/`
  and at the same time will run **e2e tests** and **unit tests***
- navigate to `http://localhost:3000/`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

#### using docker :

Run `docker compose run unit`

#### without docker :

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running e2e tests

the server should be running
`docker compose up`
from another terminal

- without docker

change `e2e/cypress.json` baseurl from `app` to `localhost:3000`

```
cd e2e
npm i
npx cypress run
```

## Packages and libraries used:
- angular material for design components
- NGXS for app state management
- Cypress with typescript and cucumber to implement integration tests
- mat-table-exporter to export table data as csv, and other extensions
- ng-table-virtual-scroll to handle virtual scrolling (as virtual scrolling is not supported for mat-tables yet)

## To be improved
- use the API download option instead of using export packages
- make table columns dynamic (to add or remove columns as we like)
- add more unit tests
- cover more scenarios in e2e
- consider more devices sizes in responsive design
- create a separate folder for docker containing all docker related files for serving the app itself and running unit and e2e tests

####
