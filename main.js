const express     = require('express'),
      app         = express(),
      sequelize   = require("./database/connect"),  // to create database connection
      bodyParser  = require("body-parser"),
      sample      = require("./database/sampletable.js");

// set view engine as ejs to omit .ejs when rendering a view
app.set("view engine", "ejs");

//-------MIDDLEWARES-------//
// set up a static folder. if the frontend asks for something starting with ./static on path,
// node will search for it in public folder
app.use("/static", express.static("./public"))

// bodyParser for parsing POST requests:
app.use(bodyParser.urlencoded({ extended: true }));

//------ROUTING------------//
// API Router:
const masterApiRouter = require("./routing/masterApiRouter.js")
app.use("/observatory/api", masterApiRouter)
// TODO: Index Routers



// Initialize the server
app.listen(process.env.PORT || 8765, () => {
  console.log("Hello World");
})