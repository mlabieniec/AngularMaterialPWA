# Angular Material PWA Part Two

This is part two for [this blog post series](https://medium.com/@michaellabieniec/part-1-building-a-progressive-web-application-pwa-with-angular-material-and-aws-amplify-5c741c957259). Follow the instructions in the post to initialize the project.

# Build Your Own App

To use as a scaffold for your own PWA, you can copy `partTwo` as a starting point for your app.

```
$ cp -fR AngularMaterialPWA/partTwo ./my-app
$ cd my-app && npm i
$ amplify init
$ amplify add auth # Check the details on the blog post for selections
```

## Production server
To run a production server and test the service worker functionality run `npm start`. This will run a production build (after building the angular assets) on `http://localhost:8080` using the node `http-server` module.

## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
