const express = require('express');
const router = express.Router();
const conn = require('../mongoConn');

router.get('/', async (req, res) => {
    const data = req.body;
    try {
        conn(async (collection) => {
            collection.find({}).toArray((err, result) => {
                res.json(result);
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

//• Datos almacenados en la base de datos, en MongoDB (ordenados por el último primero)
router.get('/last', async (req, res) => {
    try {
        conn(async (collection) => {
            const result = await collection.find({}).sort({
                "fecha": -1
            }).toArray(
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

module.exports = router;
