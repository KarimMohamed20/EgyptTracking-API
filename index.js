const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const ride = require("./routes/ride");
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

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

// USER
app.use("/api/v1", user);
app.use("/api/v1/ride", ride);

app.listen(PORT, () => {

  console.log(`Server Started at PORT ${PORT}`);
});
