# Coffee-App Public API

[![N|NodeJS](https://indglobal.in/wp-content/uploads/2018/11/nodejs-square.png)](https://nodejs.org/)

Coffee-App is an online web service Restful public API:

- A client is building an e-commerce mobile application for their line of coffee machines and custom coffee pods.
- They are looking to have two screens: one screen to display coffee machines and one screen to display coffee pods. 
- On the coffee machines screen, the user may filter by product type and water line. 
- On the coffee pods screen, the user may filter by product type, coffee flavor, and pack size.

# Getting Started!

You need at least Node V.10 or greater.

This web service API build on top of nodejs and express, please always use 'https' over multiple networks.

Coffee-App is licensed under MIT please read the LICENSE before any usage.

### Installation

Coffee-App requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd coffee-app
$ npm install
$ npm run dev
```

For production environments...

```sh
$ npm install --production
$ npm run build:node
$ npm start
```
This will build the app inside lib directory and run NODE_ENV=production instance.

### Database Seeding

For development only!

```sh
$ cd coffee-app
$ npm run db:seed
```
### Plugins

Coffee-App is currently extended with the following plugins. Instructions on how to use them in your own application are linked below (only some of the plugins are mentioned here, please check the package json file for more info).

| Plugin | README |
| ------ | ------ |
| @babel/core | [https://babeljs.io/docs/en] |
| @babel/node | [https://babeljs.io/docs/en/babel-node] |
| expressjs | [https://expressjs.com] |
| eslint | [https://eslint.org] |
| jest | [https://jestjs.io] |
| flow | [https://flow.org] |


### Development @Testing

Want to run some tests? Great!

coffee-app uses Jest + Supertest for fast testing.
Make a change in your file and instantanously see your test results!

Open your favorite Terminal and run these commands.

Run Test without coverage:
```sh
$ npm run test
```

Run Test with coverage:
```sh
$ npm run test:full
```

#### Building Source Code
For production release:
```sh
$ npm run build:node
```

### Docker
Coffee-App is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

Install Docker
Begin with installing Docker for your type of OS.

Then:
```sh
cd coffee-app
docker build -t coffee-app .
```
This will create the coding-invester image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -p 3000:3000 coffee-app
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

#### Endpoints

Currently available endpoints:

```sh
GET /
 api/machines
 api/pods
```

#### Kubernetes

See [Kubernetes Documentation](https://kubernetes.io/docs)


License
----

MIT