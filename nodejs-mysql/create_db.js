var db = require("./db_config");

const sql = "CREATE DATABASE mqtt_nodejs";
db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
});