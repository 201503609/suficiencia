const express = require('express');
const router = express.Router();
const conn = require('../mongoConn');

var redis = require('redis');
var client = redis.createClient(); // esto crea un nuevo cliente
var multi = client.multi();

router.get('/test', async (req, res) => {
    const data = req.body;
    try {
        res.send('hola test covid vaccinated');
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

/*
{
    "name": "Pablo Mendoza"
    "location": "Guatemala City"
    "gender": "male"
    "age": 35
    "vaccine_type": "Sputnik V"
}
*/
router.post('/newVaccinated', async (req, res) => {
    const data = req.body;
    try {
        conn(async (collection) => {
            data.fecha = new Date();
            const result = await collection.insertOne(data);
            //res.json(result);    
        }, "test");

        multi.rpush('redisList', JSON.stringify(data));
        multi.exec(function (err, response) {
            if (err) throw err;
            res.json(response);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' })
    }
});

// • Los diez países con más vacunados, en Redis.
router.get('/topTenVaccinated', async (req, res) => {
    try {
        conn(async (collection) => {
            const result = await collection.aggregate(
                [
                    {
                        $group: {
                            _id: "$location",
                            count: { $sum: 1 }
                        }
                    }
                ]
            ).sort({
                "fecha": -1
            }).limit(10).toArray(
                (err, result) => {
                    if (err) {
                        res.status(500).json({ 'message': 'failed' })
                    }
                    console.log(result);
                    res.json(result);
                }
            );
        }, "test");
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' })
    }
});


function RemoveAccents(str) {
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
        if ((x = accents.indexOf(str[i])) != -1) {
            str[i] = accentsOut[x];
        }
    }
    return str.join('');
}

function GetRegion(departament = 'Guatemala') {
    departament = RemoveAccents(departament);
    switch (departament.toLowerCase()) {
        case "guatemala":
            return "Metropolitana";
        case "alta verapaz":
        case "baja verapaz":
            return "Norte";
        case "chiquimula":
        case "el progreso":
        case "izabal":
        case "zacapa":
            return "Noroeste";
        case "jutiapa":
        case "jalapa":
        case "santa rosa":
            return "Suroeste";
        case "chimaltenango":
        case "sacatepequez":
        case "escuintla":
            return "Central";
        case "quetzaltenango":
        case "retalhuleu":
        case "san marcos":
        case "suchitepequez":
        case "solola":
        case "totonicapan":
            return "Sureste";
        case "huehuetenango":
        case "quiche":
            return "Noreste";
        case "peten":
            return "Petén";

    }
}

module.exports = router;
