const express = require('express');
const router = express.Router();
const conn = require('../mongoConn');

router.post('/', async (req, res) => {
    console.log('Entro aca');
    const data = req.body;
    try{
        conn(async (collection) => {
            const result = await collection.insertOne(data);
            res.json(result);
        }, "test");
    }catch (err){
        console.log(err);
        res.status(500).json({'message': 'failed'});
    }
});

module.exports = router;
