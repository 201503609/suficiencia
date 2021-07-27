// redisDemo.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

var redis = require('redis');
var client = redis.createClient(); // esto crea un nuevo cliente
var multi = client.multi();

client.on('connect ', function () {
    console.log('Redis client connected ');
});

client.on('error ', function (err) {
    console.log('Algo salio mal ' + err);
});

router.post('/newCase', async (req, res) => {
    const data = req.body;
    try {
        multi.rpush('testlist', JSON.stringify(data));
        multi.exec(function (err, response) {
            if (err) throw err;
            res.json(response);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' })
    }
});

router.get('/', async (req, res) => {
    try {
        client.set("key:3", "value3new");
        console.log("working with redis +++++++", client.get("key:3", redis.print));

        res.status(200).json('hola');

    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

router.get('/allVals', async (req, res) => {
    try {
        var totalVals = '';
        client.lrange('testlist', 0, -1, function (error, items) {
            if (error) throw error;

            items.forEach(function (item) {
                /// processItem(item)
                totalVals += item;
            });
            var arrRet = totalVals;
            console.log('arrRet ', arrRet);

            res.status(200).json({ 'message': totalVals });
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;


