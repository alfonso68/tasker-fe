# Radar Task Manager [FRONTEND]

## Requrements
- Docker: Version >= 26.1.1
- Git: Version >= 2.45.1

## Description

**Frontend** repository for Task Manager App bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dev setup

```bash
# Clone repository
$ git clone https://github.com/alfonso68/tasker-fe.git

# Change directory
$ cd tasker-fe

# Copy env file
$ cp .env .env.local
```

## Firebase setup .env

```yaml
# Replace #[PLACEHOLDERS]# in .env.local file

REACT_APP_FIREBASE_API_KEY=#[FIREBASE_API_KEY]#
REACT_APP_FIREBASE_AUTH_DOMAIN=#[FIREBASE_AUTH_DOMAIN]#
REACT_APP_FIREBASE_DATABASE_URL=#[FIREBASE_DATABASE_URL]#
REACT_APP_FIREBASE_PROJECT_ID=#[FIREBASE_PROJECT_ID]#
REACT_APP_FIREBASE_STORAGE_BUCKET=#[FIREBASE_STORAGE_BUCKET]#
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=#[FIREBASE_MESSAGING_SENDER_ID]#
REACT_APP_FIREBASE_APP_ID=#[FIREBASE_APP_ID]#
```

## Build & Run

```bash
# Change to project root dir
$ cd tasker-fe

# Install libs & Build
$ npm install
$ npm run build

# Run on Docker
$ docker-compose up --build

# Wait for message:
...
...
...
app-1  | webpack compiled successfully
```


## Access Login & Register

- Go to http://localhost:3001/
- Register in Register form

## Stop & Shutdown containers
```bash
# Press Ctrl + c to stop container and then run below command:
 
$ docker-compose down -v 
```