# Angular Material PWA

This repository is the completed parts and code for [this blog post series](https://medium.com/@michaellabieniec/part-1-building-a-progressive-web-application-pwa-with-angular-material-and-aws-amplify-5c741c957259).

Each part is an independent application that can be served. If you are following the blog post and want to create part two yourself, just copy `partOne` to a new application and follow the part two post. Please open an issue if you find bugs or have questions.

# Build Your Own App

To use as a scaffold for your own PWA, you can copy `partTwo` which has authentication/authorization in it, or `partOne` if you don't want auth started yet (which is part two of the blog series). 

```
$ cp -fR AngularMaterialPWA/partTwo ./my-app
$ cd my-app && npm i
$ amplify init
$ amplify add auth
$ amplify add hosting
```