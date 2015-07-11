var MongoClient = require('mongodb').MongoClient;
var Hapi = require('hapi');
var config = require('./config.js');

var server = new Hapi.Server();

server.connection({
	port: process.env.PORT || 9000
});

server.register({
    register: require('hapi-mongodb'),
    options: {url: config.mongoUrl}
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

server.route({
	method: 'POST',
	path: '/product',
	handler: function (request, reply) {
		var db = request.server.plugins['hapi-mongodb'].db;
		var payload = request.payload;
		
		console.log('Request payload', payload);
		
		db.collection('products').insert(payload, function (err, writeResult) {
			if (err) {
				console.log('Product insert error', err);
			}
			
			console.log('Inserted product with _id', payload._id);
			reply({_id: payload._id});
		});
	}
});

server.route({
	method: 'GET',
	path: '/products',
	handler: function (request, reply) {
		var db = request.server.plugins['hapi-mongodb'].db;
		
		db.collection('products').find({}).toArray(function (err, products) {
			reply(products);
		});
	}
});

server.start(function () {
	console.log('Server started at %s', server.info.uri);
	console.log('Mongo at %s', config.mongoUrl);
});
