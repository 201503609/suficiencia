const express = require('express');
const router = express.Router();
const conn = require('../mongoConn');

router.get('/', async (req, res) => {
    const data = req.body;
    try {
        conn(async (collection) => {
            collection.aggregate([
                {
                    $group: {
                        _id: '$location',
                        names: { $push: "$name" },
                    },
                },
                { $sort: { _id: 1 } }
            ])
                .toArray((err, result) => {
                    res.send(result.map(function (r) {
                        return {
                            '_id': r._id,
                            'names': r.names.splice(0, 5)
                        }
                    }));
                });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

module.exports = router;