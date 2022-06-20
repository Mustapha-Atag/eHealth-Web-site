console.log("home.js was loaded!");

// *** MQTT part ***
function onMessageArrived(message) {
    let roomTemp = document.getElementById("roomTemp");
    let heartRate = document.getElementById("heartRate");
    let bloodOxy = document.getElementById("bloodOxy");
    let bodyTemp = document.getElementById("bodyTemp");
    let topic = message.destinationName;
    console.log("onMessageArrived:" + "[" + message.destinationName + "] " + message.payloadString);
    if (topic == "Taha/others") {
      let sensorsData = message.payloadString.split(',');
  
      roomTemp.innerText = parseInt(sensorsData[0]);
      heartRate.innerText = parseInt(sensorsData[1]);
    }
}
  