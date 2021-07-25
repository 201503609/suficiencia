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

module.exports = router;
