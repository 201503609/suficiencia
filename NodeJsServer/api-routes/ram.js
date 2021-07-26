const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
    try {
        fs.readFile('/proc/ram_module', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            const dataArray = data.split(';');
            const totalRam = parseInt(dataArray[0]);
            const freeRam = parseInt(dataArray[1]);
            const usedRam = totalRam - freeRam;
            const percent = (freeRam * 100) / totalRam;

            res.status(200).json({
                totalRam,
                freeRam,
                percent,
                usedRam
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;
