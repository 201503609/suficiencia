/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
//https://us-central1-fine-byway-320501.cloudfunctions.net/function-2

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
                res.status(200).json(newReplies);
            }
        });
    });
};
