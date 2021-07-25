db.createUser(
    {
        user: "rootdev",
        pwd: "rootdev",
        roles: [
            {
                role: "readWrite",
                db: "mydb"
            }
        ]
    }
)