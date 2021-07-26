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
            const dataArray = data.split('\n');
            
            const arrayTotal = dataArray[0].split(':');
            const usageTotal = dataArray[1].split(':');

            const total = parseInt(arrayTotal[1].trim());
            const usage = parseInt(usageTotal[1].trim());


            res.status(200).json({
                total,
                usage
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;
