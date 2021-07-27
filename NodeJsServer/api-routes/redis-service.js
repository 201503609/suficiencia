// redisDemo.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

var redis = require('redis');
var redisCliente = redis.createClient(); // esto crea un nuevo cliente

redisCliente.on('connect ', function () {
    console.log('Redis client connected ');
});

redisCliente.on('error ', function (err) {
    console.log('Algo salio mal ' + err);
});

router.get('/', async (req, res) => {
    try {
        console.log("working with redis collection");

        redisCliente.on('connect ', function () {
            console.log('Redis client connected ');
        });

        res.status(200).json('hola');
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;


