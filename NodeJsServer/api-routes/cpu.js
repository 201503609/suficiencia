const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
    try {
        fs.readFile('/proc/CPU_201503609', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('ESTO ', data);
            const dataArray = data.split('\n');
            console.log('ESTO 2 ', dataArray);
            console.log('ESTO + ', dataArray[0]);
            console.log('ESTO ++ ', dataArray[1]);
            const total = parseInt(dataArray[0]).toString();
            const usage = parseInt(dataArray[1]).toString();

            res.status(200).json({
                total,
                usage,
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;
