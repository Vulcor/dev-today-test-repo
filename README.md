Prerequisites
 - npm
 - Docker
 - docker-compose

 To launch the project:
 1) use 'npm install' in your console/terminal from the root directory to install all of the required project dependencies.
 2) use 'docker-compose up -d' in your console/terminal from the root directory to start a dockerised database.
 3) use 'npm run start' to launch the project.

 When the project has launched, go to http://127.0.0.1:3002/api/swagger#/Users/UserController_postHolidays in your browser, browse and use listed end-poinst

 If you've lost your user Id after the registration process to use in holidays registration, there's a user getter that fetches all users from DB
