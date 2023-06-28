# Fullstack PERN - frontend git submodule

Clone parent repo and follow instructions to run the fullstack app.

```
git clone https://github.com/Anthony-Phillip-Collins/fullstack-docker-pern.git
```

# Heroku

Create service

```
heroku create fullstack-docker-pern-frontend
```

Add Buildpack

```
heroku buildpacks:set heroku/nodejs
```

Add remote (should it not exist yet)

```
git remote add heroku https://git.heroku.com/fullstack-docker-pern-frontend.git
```

login to container

```
heroku container:login
```

set stack to container

```
heroku stack:set container -a fullstack-docker-pern-frontend
```

push changes

```
git push heroku main
```

### bugfixing

set port

```
heroku config:set PORT=80
```

add nginx buildpack

```
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nginx
```

ssh into container
```
heroku buildpacks:add heroku/exec
heroku ps:exec
```