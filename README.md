#NodeJS and MongoDB Example

This is a simple example of how to use [NodeJS](https://nodejs.org/) to talk to a [MongoDB](https://www.mongodb.com/) database.

## Installation
1. Install [NodeJS](https://nodejs.org/).
2. Install MongoDB [drivers](http://docs.mongodb.org/ecosystem/drivers/).
3. Create an account for yourself on [MongoLab](https://mongolab.com).
	- Provision a database
	- Add a user to the database
	- Add the connection string to config.js in this project. It will look something like `mongodb://<dbuser>:<dbpassword>@ds12345.mongolab.com:45632/myDbName` 
4. `npm install` in the project directory to install the Node dependencies.
5. `npm start` will start the API server.

## Using the API

If you're on a *nix machine then good ol' `curl` will work.

### Insert a product

`curl -X POST --data '{"name":"Galaxy Class Starship"}' -H 'Content-Type: application/json' http://localhost:9000/product`

### Get all products

`curl -X GET http://localhost:9000/products`


## Creating endpoints

Getting an API started with [HapiJS](http://hapijs.com/) is very simple. It's a matter of creating a server object and then calling `server#route` with a configuration object for your API endpoints.

```
var Hapi = require('hapi');
var server = new Hapi.Server();

server.route({
	method: 'GET',
	path: '/hello',
	handler: function (request, reply) {
		reply({ message: 'hello world' });
	}
});
```

