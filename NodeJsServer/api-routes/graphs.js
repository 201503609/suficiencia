const express = require('express');
const router = express.Router();
const conn = require('../mongoConn');

router.get('/gender', async (req, res) => {
    const data = req.body;
    try {
        conn(async (collection) => {
            collection.
                aggregate([
                    {
                        $group: {
                            _id: "$gender",
                            count: { $sum: 1 }
                        }
                    }
                ])
                .toArray((err, result) => {
                    res.json(result);
                });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

router.get('/location', async (req, res) => {
    const data = req.body;
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
            ).toArray(
                (err, result) => {
                    if (err) {
                        res.status(500).json({ 'message': 'failed' })
                    }
                    res.json(result);
                }
            );
        }, "test");
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

// • Gráfica de pie de los géneros de los vacunados por país, en MongoDB.
router.get('/general', async (req, res) => {
    const data = req.body;
    try {
        conn(async (collection) => {
            const result = await collection.aggregate(
                [
                    {
                        $group: {
                            _id: {
                                location: "$location",
                                gender: "$gender"
                            },
                            genderCount: { $sum: 1 }
                        }
                    },
                    {
                        $group: {
                            _id: "$_id.location",
                            genders: {
                                $push: {
                                    gender: "$_id.gender",
                                    count: "$genderCount"
                                }
                            },
                            total: { $sum: "$genderCount" }
                        }
                    }
                ]).toArray(
                    (err, result) => {
                        if (err) {
                            res.status(500).json({ 'message': 'failed' })
                        }
                        res.json(result);
                    }
                );
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});


module.exports = router;
