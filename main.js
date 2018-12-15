const express     = require('express'),
      app         = express(),
      sequelize   = require("./database/connect");  // to create database connection
      sample      = require("./database/sampletable.js")


//  set up a static folder. if the frontend asks for something starting with ./static on path, node will search
//  for it in public folder
app.use("/static", express.static("./public"))

// set view engine as ejs to omit .ejs when rendering a view
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  sample.findAll().then(found => {
      res.send(found)
  })
})

app.listen(process.env.PORT || 1245, () => {
  console.log("Hello World");
})

// tzog
//PLE WAS HERE
// a
