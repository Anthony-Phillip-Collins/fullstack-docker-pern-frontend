# Fullstack Docker PERN - frontend

This is a submodule of its parent project:  
https://github.com/Anthony-Phillip-Collins/fullstack-docker-pern/

## Local development

To run the full project locally visit the [parent project](https://github.com/Anthony-Phillip-Collins/fullstack-docker-pern/) and follow the instructions of the [README.md](https://github.com/Anthony-Phillip-Collins/fullstack-docker-pern/blob/main/README.md).

## Deploy to Heroku

Follow these steps to create an app on Heroku that serves the frontend.

1. Create an account with [Heroku](https://www.heroku.com) and log in via cli

```bash
heroku login
```

2. Create app

```bash
heroku create appname
```

3. Set stack to container

```bash
heroku stack:set container -a appname
```

4. Open second terminal window for logging

```bash
heroku logs -t --app appname
```

5. Update `VITE_API_BASE_URL` in _Dockerfile.prod_ with the url of the heroku app that was created with the [backend submodule](https://github.com/Anthony-Phillip-Collins/fullstack-docker-pern-backend). You can get the web url from the backend app:info like this `heroku apps:info -a backendAppName`

```bash
ENV VITE_API_BASE_URL=https://backendAppName-800d35caffaa.herokuapp.com/api
```

6. Commit changes

7. Push to Heroku

```bash
git push heroku main
```

8. Open app

```bash
heroku open
```
