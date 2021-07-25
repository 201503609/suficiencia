// redisDemo.js
var redis = require('redis ');
var redisCliente = redis.createClient(); // esto crea un nuevo cliente

redisCliente.on('connect ', function () {
    console.log('Redis client connected ');
});

redisCliente.on('error ', function (err) {
    console.log('Algo salio mal ' + err);
});