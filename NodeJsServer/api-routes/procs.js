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
            data = data.replace('\n', '');
            //console.log('--- 2 ', data);
            //res.status(200).json(JSON.parse(data));
            res.status(200).json(data);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;
