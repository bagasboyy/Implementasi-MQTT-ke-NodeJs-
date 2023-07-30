const db = require("./db_config");

const sql = `CREATE TABLE hasil_suhu 
    (
        id int NOT NULL AUTO_INCREMENT,
        suhu VARCHAR(255), 
        kelembaban VARCHAR(255),
        PRIMARY KEY (id)
    )`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});