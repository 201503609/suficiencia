// redisDemo.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

var redis = require('redis');
var client = redis.createClient(); // esto crea un nuevo cliente

client.on('connect ', function () {
    console.log('Redis client connected ');
});

client.on('error ', function (err) {
    console.log('Algo salio mal ' + err);
});

router.get('/', async (req, res) => {
    try {
        console.log("working with redis collection");
        client.set("key:3", "value3new");
        console.log("working with redis +++++++", client.get("key:3"));

        res.status(200).json('hola');
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;


