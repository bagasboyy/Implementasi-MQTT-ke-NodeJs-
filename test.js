const mqtt = require('mqtt');
const mysql = require('mysql');
var Topic = '#';

const client = mqtt.connect({
  port: 1883,
  host: '127.0.0.1',
  keepalive: 10000,
});

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mqtt_nodejs'
});

client.on('connect', mqtt_connect);
function mqtt_connect() {
  //console.log("Connecting MQTT");
  client.subscribe(Topic, mqtt_subscribe);
};

function mqtt_subscribe(err, granted) {
  console.log("Subscribed to " + Topic);
  if (err) {console.log(err);}
};

client.on('message', mqtt_messsageReceived);
function mqtt_messsageReceived(topic, message, packet) {
	var message_str = message.toString(); //convert byte array to string
	// var message_str = message_str.sploiy(/\n$/, ''); //remove new line
  var message_str = message_str.split(',');

  //sql
  con.connect(function(err){
    var record = [
      message_str
    ];

    var sql = "INSERT INTO hasil_suhu (suhu, kelembaban) VALUES ?";
    con.query(sql, [record], function(err, result){
      if(err) throw err;
      console.log("i data ditambahkan")
    })
  })
};



// const mqtt = require('mqtt')

// const host = '127.0.0.1'
// const port = '1883'
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

// const connectUrl = `mqtt://${host}:${port}`

// const client = mqtt.connect(connectUrl, {
//   clientId,
//   clean: true,
//   connectTimeout: 4000,
//   // username: 'emqx',
//   // password: 'public',
//   reconnectPeriod: 1000,
// })

// const topic = '/nodejs/mqtt'

// client.on('connect', () => {
//   console.log('Connected')

//   client.subscribe([topic], () => {
//     console.log(`Subscribe to topic '${topic}'`)
//     client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//       if (error) {
//         console.error(error)
//       }
//     })
//   })
// })

// client.on('message', (topic, payload) => {
//   console.log('Received Message:', topic, payload.toString())
// })
