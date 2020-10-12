const express = require("express");
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const InitiateMongoServer = require("./config/db");
const bodyParser = require("body-parser");

// Websockets
var rideWebsocket = require("./controllers/ride/websocket")

// Routes
const userRoute = require("./routes/user");
const rideRoute = require("./routes/ride");

// Initiate Mongo Server
InitiateMongoServer();


// PORT
const PORT = process.env.PORT || 3000;

var ride = io.of("/ride")

rideWebsocket(ride)




// Middleware
app.use(bodyParser.json());
/**
 * Router Middleware
 * Router - /api/v1/*
 * Method - *
 */
app.use("/api/v1", userRoute);
app.use("/api/v1/ride", rideRoute);


// Running server
server.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
