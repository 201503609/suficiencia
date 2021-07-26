const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
    try {
        fs.readFile('/proc/procsdetail_module', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            //res.status(200).json(JSON.parse(data));
            res.status(200).json(data.body);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;
