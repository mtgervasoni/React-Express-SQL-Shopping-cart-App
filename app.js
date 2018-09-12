const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// Set up the express app
const app = express();

//passport for JWT auth
const passport = require("passport");

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport middleware:
app.use(passport.initialize());

//Passport Config (JWT Strategy):
require("./server/config/passport.js")(passport);
// Require our routes into the application.
require("./server/routes")(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Invalid Request."
  })
);

module.exports = app;
