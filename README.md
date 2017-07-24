## Front End Architecture Overview

The application build with Angular 1.6.x. Whole search functionality put into a separate `whois.search` submodule which should be used by higher order modules. `whois` module is responsible for routing and application bootstrap.

Internaly search module consists of two low-order components:

* search form which is responsible for form UI and validation;
* search results which is responsible for results presentation.

There is also one high-order (or container in React terminology) component which is responsible for making requests based on data got from form and then passing results to search results component.

Generaly UI has feature-based folder structure.

Build dist folder is `ui/dist`.

## Back End Architecture Overwiew

Not much here.

Communication with verisign grs and MongoDB (for logs) is made by related services. There is also middleware based on those services and used by expressjs application.

As for configuration, there are two versions of that one for local instance and the second one for launcing in Docker.

For security staff please see below.

## Run the application

To run application with docker just run `docker-compose up` out of root folder of the project.

If you don't have Docker installed on your machine please refer to [Docker official documentation](https://docs.docker.com/engine/installation/).

If you have MongoDB installed locally you can try launch the application without Docker. Just run following command in your terminal `npm run build-ui && npm start`.

Open http://localhost:3000/ in your browser.

## Security

* [helmet](https://www.npmjs.com/package/helmet) to secure your Express apps by setting various HTTP headers
* [snyk](https://www.npmjs.com/package/snyk) to check dependencies vulnerabilites. To check run `npm run security`
