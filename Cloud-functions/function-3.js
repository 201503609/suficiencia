/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
//https://us-central1-fine-byway-320501.cloudfunctions.net/function-3

const redis = require("redis");

exports.helloWorld = async (req, res) => {
    const client = redis.createClient(6379, "34.67.40.100");
    client.on('connect', function () {
        client.lrange("redisList", 0, -1, function (err, replies) {
            if (err) {
                console.log("Error" + err.toString());
                res.json({ msg: err.toString() });
            } else {
                let newReplies = replies.map(element => JSON.parse(element));
                const myJSON = JSON.stringify(newReplies);
                let arr1 = '{\"datos\": ' + myJSON + "}";
                console.log('arr1', arr1);
                let arr2 = JSON.parse(arr1);
                console.log('arr2', arr2);

                var counts = arr2.datos.reduce((p, c) => {
                    var name = c.location;
                    if (!p.hasOwnProperty(name)) {
                        p[name] = 0;
                    }
                    p[name]++;
                    return p;
                }, {});

                var countsExtended = Object.keys(counts).map(k => {
                    return { _id: k, count: counts[k] };
                });

                countsExtended.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));

                res.status(200).json(countsExtended);
            }
        });
    });
};
