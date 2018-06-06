const { Client } = require("pg");
const db = module.exports;
const db_url = (process.env.YEA_POSTGRES_URL || process.env.DATABASE_URL);
const client = new Client({
    connectionString: db_url
});

function returnAccount(err, res) {
    let account = res.rows[0];

    if(err) {
        this(err);
    } else if(account) {
        this(null, new Account(account));
    } else {
        this(null, null);
    }
}

class Account {
    constructor(account) {
        Object.assign(this, account);
    }

    delete(cb) {
        client.query(
            "DELETE FROM accounts WHERE uid = $1",
            [this.uid],
            cb
        );
    }
}

db.newAccount = function(account, cb) {
    client.query(
        "INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [account.username, account.email || "", account.password],
        returnAccount.bind(cb)
    );
};

db.getAccount = function(username, cb) {
    client.query(
        "SELECT * FROM accounts WHERE username = $1",
        [username],
        returnAccount.bind(cb)
    );
};

db.getAllAccounts = function(cb) {
    client.query(
        "SELECT * FROM accounts",
        cb
    );
};

client.connect(err => {
    if(err) { throw err; }

    console.log("Connected to database.");
});