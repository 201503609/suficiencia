const mongodb = require('mongodb');
const DB_STR_CON = 'mongodb://rootdev:rootdev@34.67.40.100:27017'

let db = undefined;

function withDB(callback, collection = "users", database = "testdb",) {
    mongodb.MongoClient.connect(
        DB_STR_CON,
        { useUnifiedTopology: true },
        (err, client) => {
            if (err) {
                console.log('Erro withDB ', err);
            }
            db = client.db(database);
            const coll = db.collection(collection);
            console.log("working with ", database, ".", collection, "...");
            callback(coll);
        });
}

module.exports = withDB;
