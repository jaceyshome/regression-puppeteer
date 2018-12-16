# Regression puppeteer
Regression puppeteer is a tool to write and run (visual) regression test with Puppeteer and Cucumber. With them, you are able to write visual test or Cucumber features with Puppeteer APIs.



## Getting started
These instructions will get you a copy of the project up and running on your local machine for development. See deployment for notes on how to deploy the project on a live system.


## Prerequisites
Install latest [Docker](https://docs.docker.com/install/), [docker-compose](https://docs.docker.com/compose/install/) and nodeJs 9.3.0 ( with [NVM](https://github.com/creationix/nvm) ).


## Installing
Install node modules with
```
npm install
```
or
```
yarn
```



## Running an example
Run visual result client application and restful server with
```
docker-compose up
```
The client application [http://localhost:7090](http://localhost:7090) is to view and compare visual results. The server [http://localhost:7071/](http://localhost:7071/) is to get and set visual results.

Run
```
npm run-script dev
```
to run development environment features.

The first time is to get the screenshot references.

Run `npm run-script dev` again, you will see results in client application [http://localhost:7090](http://localhost:7090).



## Configuration
The `/config/config.js` is the main configuration file, it loads different configuration files related to environment and returns the global configuration object.
The base configuration `config/config-base` has the list of viewports like this example:

```
var viewports = {
    //Iphone 5
    "mobile-portrait": {
        "name": "mobile portrait",
        "width": 320,
        "height": 568
    },
    ...
    "tablet-landscape": {
        "name": "tablet landscape",
        "width": 1024,
        "height": 768
    },
    //Desktop
    "desktop": {
        "name": "desktop",
        "width": 1200,
        "height": 900
    }
};
```


## Development
The example feature is `features/page-visual/page-visual.tpl`, the step `page-visual-steps.js` and `page-visual-support` are in the same folder.

### Scripts
Run `npm run build` to build Cucumber features for different viewport sizes. the related script is in `scripts/build-features`.



## Deployment
The `Dockerfile` is ready to use, related configuration file is `config/config-docker.js`. To build an image, set your docker repository in the `package.json`, for example
```
  "config": {
    "imageRepo": "jacobwang05/regression-puppeteer",
    "imageName": "regression-puppeteer",
    "imagePort": "7080"
  },
```
When you build an image, run
```
npm run docker:build
```
publish the image
```
npm run docker:publish
```

If you want to build and deploy a docker image, use [duluca/npm-scripts-for-docker.md](https://gist.github.com/duluca/d13e501e870215586271b0f9ce1781ce/).


## Built with
[Puppeteer](https://pptr.dev/) - puppeteer API

[CucumberJs](https://github.com/cucumber/cucumber-js) - Cucumber features

[npm-scripts-for-docker.md](https://gist.github.com/duluca/d13e501e870215586271b0f9ce1781ce/)

[regression-client](https://github.com/jaceyshome/regression-client) - client site visual result viewer

[regression-server](https://github.com/jaceyshome/regression-server) - server site database and restful API



## License
This project is licensed under the MIT License.



## Acknowledgments

### Tips
The screenshot images quality is 40 jpeg to control the page screenshot image size.
