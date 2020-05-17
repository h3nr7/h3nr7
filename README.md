# H3NR7 website 

[![CircleCI](https://circleci.com/gh/h3nr7/h3nr7.svg?style=svg)](<LINK>)

### Documentations
* [Preloading Assets]('./documentations/ASSETSLOAD.md)
* [Styling & CSS](./documentations/STYLES.md)
* [WebGL](WEBGL.md)
* [Contentful](CONTENTFUL.md)
* [Advanced concept in JavaScript](./documentations/JAVASCRIPTDEEP.md)
* [Server side rendering](./documentations/SSR.md)


This is an express typescript site using contentful CMS.  Above documentations contains all the learning and highlights of this project.

### ENV Var (within .env locally)
```env
NODE_ENV=development
SESSION_SECRET=SOME_SESSION_SECRET
APP_LOGGER_NAME=SOME_LOGGER_NAME_FOR_BUNYAN
MONGODB_URI=SOME_MONGO_URI
REDIS_URI=SOME_REDIS_URI
```

### Docker
#### To start docker locally and build
```
docker-compose up --build
```

#### To stop
```
docker-compose down
```

#### Check container is running
```
docker ps
```

#### Check container
```
docker volume ls
```

### Mongo (locally)
#### To spin up mongo without docker-compose
```
docker run --name mongo_db -v mongodata:/data/db -d -p 27017:27017 mongo
```

#### Log into the mongo docker instance
```
winpty docker exec -it mongo_db bash
```

#### Then login to mongo
```
mongo admin -u root -p rootpassword
```

#### show databases
```
show dbs
```

#### show collections
```
show collections
```

#### find data in collection
```
db.COLLECTION_NAME.find()
```

#### save data in collection
```
db.COLLECTION_NAME.save({"NAME":"SOME_NAME"})
```


#### Open and/or Create Database
```mongo
use DATABASENAME
```

#### create user on database
```mongo
db.createUser({ user:"USERNAME", pwd:"PASSWORD", roles:[{role:"readWrite", db:"DATABASENAME"}]});
```

#### Stop docker
```
docker stop mongo_db
```
```
docker rm mongo_db
```

#### Clear docker for space (beware, literally everything!!!)
```
docker system prune --volumes
```

#### Now you can authenticate with connection string
```mongo
mongodb://USERNAME:PASSWORD@mongo_db:27017/DATABASENAME
```
