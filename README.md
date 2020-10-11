Time tables of routes in Helsinki Region from Efficode office to users selected address and vice versa.

## Tools and Technologies
  1. React js
  2. Bootstrap 4 UI framework
  3. Eslint for linting code
  4. Graphql for query to server
  5. Docker for containerization
  6. Travis CI for a CI/CD deployment pipeline
  7. Heroku cloud

## Run project without docker locally
  1. Go to the app directory from terminal which is `/transport-info/app`
  2. Install package.json dependencies by this command `npm install`
  3. Run the application by this command `npm start`
  4. Application will be available at this url [http://localhost:3000](http://localhost:3000)
  5. To run lint test, keep inside `/transport-info/app` directory and run `npm lint` from terminal

## Run project with docker
  1. Go to the root directory from terminal which is transport-info
  2. Run this command `docker-compose up --build`
  3. After successful run, project will be containerized and availabe at this url [http://localhost:3000](http://localhost:3000)
  4. To run lint test, first run this command `docker exec -it transport_info /bin/sh` (N.B. transport_info is the container name). This command will take you to the inside of `transport_info` container
  5. Now in the bash, run this command `npm run lint`

## Heroku cloud url

  With the help of Travis CI, this project has been deployed on to heroku cloud.
  1. The project is containerized and the image is pushed to both docker hub and heroku registry.
  2. Only the lint test is checked before deployment.
  3. docker hub url for this project image is available at [docker hub](https://hub.docker.com/repository/docker/rupak08012/transport_info)
  4. Project url in heroku is available here [transport info](https://public-transport-info.herokuapp.com/).

## Missing items
  1. A good UI
  2. Test cases