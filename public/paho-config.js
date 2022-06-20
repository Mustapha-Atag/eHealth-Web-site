console.log("paho-config.js was loaded!");

// *** Global variables ***
var client;
var clientId = "Atag_Paho_jsClient_3049588";
var reconnectTimeout = 2000;
var host = "test.mosquitto.org";
var port = 8081;
var connected = false;
var topic = "Taha/+";

// *** callBack functions ***
function onConnect() {
	console.log("Connected successfully to " + host);
  connected = true;
  client.subscribe(topic);
  console.log("subscribed to topic: " + topic);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    connected = false;
    console.log("onConnectionLost:"+ responseObject.errorMessage);
  }
}

function onMessageDelivered(message) {
  console.log("onMessageDelivered:" + message.payloadString);
}

// *** function for connecting to the broker ***
function MQTTconnect(clientId) {
  if (connected == false) {
    console.log("connecting to "+ host +", port: "+ port + " ...");
    client = new Paho.MQTT.Client(host, port, "/ws", clientId);
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.onMessageDelivered = onMessageDelivered;

    // options
    var options = {
      useSSL:true,
      timeout: 3,
      keepAliveInterval: 120,
      onSuccess: onConnect
    };
        
    client.connect(options);
  } else {
    console.log("paho client is already connected!");
  }
}

// *** start & stop the mqtt connection ***
function start() {
  MQTTconnect(clientId);
}

function stop() {
  if (connected) {
      connected = false;
      client.disconnect();
      console.log("client is disconnected now!");
  } else {
      console.log("client is already disconnected!");
  }
}