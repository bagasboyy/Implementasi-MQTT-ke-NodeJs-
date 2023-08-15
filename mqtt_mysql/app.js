// Environment
require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mqtt = require("mqtt");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var Topic = "#";

// Port
const serverPort = process.env.SERVER_PORT;
const ioPort = process.env.SOCKET_PORT;
const mqttPort = process.env.MQTT_PORT;

// Express Routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

const server = http.createServer(app);

// server.listen(serverPort, () => {
//   console.log(`Example app listening on port ${serverPort}`)
// })

// Initialize MYSQL
const mysqlHost = process.env.MYSQL_HOST;
var con = mysql.createConnection({
  host: mysqlHost,
  user: "root",
  password: "",
  database: "mqtt_nodejs",
});

// Initialize Socket IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost",
      "http://localhost:80",
      "http://localhost:8000",
      "http://127.0.0.1:8000",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST"],
    credentials: false,
  },
});

server.listen(serverPort, () => {
  console.log("listening on *:3000");
});

// Initialize MQTT
const mqttHost = process.env.MQTT_HOST;
const client = mqtt.connect({
  port: mqttPort,
  host: mqttHost,
  clientId: "Client_" + Math.floor(Math.random() * 999999),
  keepalive: 10000,
});

client.on("connect", mqtt_connect);
function mqtt_connect() {
  //console.log("Connecting MQTT");
  client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
  console.log("Subscribed to " + Topic);
  if (err) {
    console.log(err);
  }
}

client.on("message", mqtt_messsageReceived);
function mqtt_messsageReceived(topic, message, packet) {
  var message_str = message.toString(); //convert byte array to string
  // var message_str = message_str.sploiy(/\n$/, ''); //remove new line
  var message_str = message_str.split(",");

  //sql
  con.connect(function (err) {
    var record = [message_str];

    var sql = "INSERT INTO hasil_suhu (suhu, kelembaban) VALUES ?";
    con.query(sql, [record], function (err, result) {
      if (err) throw err;
      console.log("1 data ditambahkan");
      io.emit("test", `server: ${record}`);
      // io.on("connection", (socket) => {
        
      //   console.log("a user connected");
      //   socket.on("disconnect", () => {
      //     console.log("user disconnected");
      //   });
        
      //   // socket.on("test", (record) => {
      //   //   console.log("message: " + record);
      //   // });
      //   // socket.on("test", (record) => {
      //   //   io.emit("test", `server: ${record}`);
      //   // });
      // });
      
      
    });
  });
  
}
