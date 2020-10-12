const express = require("express");
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const InitiateMongoServer = require("./config/db");
const bodyParser = require("body-parser");


// Routes
const user = require("./routes/user");
const ride = require("./routes/ride");

// Initiate Mongo Server
InitiateMongoServer();


// PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello in Node Js!" });
});

/**
 * Router Middleware
 * Router - /api/v1/*
 * Method - *
 */
app.use("/api/v1", user);
app.use("/api/v1/ride", ride);


// Running server
server.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
