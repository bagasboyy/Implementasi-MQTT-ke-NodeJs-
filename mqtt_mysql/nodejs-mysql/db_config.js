const mysql = require('mysql');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mqtt_nodejs"
});

db.connect(function(error){
    if(error){
        console.error(error);
    } else {
        console.info("Connected to Database");
    }
});

module.exports = db;