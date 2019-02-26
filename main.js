const express     = require('express'),
      app         = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      apiMiddlewares = require("./middlewares/apiMiddlewares"),
      db          = require("./database/connect"),
      myinit  = require("./database/database_init.js"),
      fs = require('fs'),
      https = require('https');

var options = {
    key:    fs.readFileSync("./certificates_for_https/server.key"), //mono gia ton maki oi alloi ta dika sas
    cert:   fs.readFileSync("./certificates_for_https/server.cert"),
};


// set view engine as ejs to omit .ejs when rendering a view
app.set("view engine", "ejs");

//-------MIDDLEWARES-------//
// set up a static folder. if the frontend asks for something starting with ./static on path,
// node will search for it in public folder
app.use("/static", express.static("./public"))

// bodyParser for parsing POST requests:
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//method override using X-HTTP-Method-Override header
app.use(methodOverride('X-HTTP-Method-Override'));

//------ROUTING------------//
// API Router:
const masterApiRouter = require("./routing/masterApiRouter.js")
app.use("/observatory/api", apiMiddlewares.apiBadFormatRequest, masterApiRouter)
// TODO: Index Routers

app.get("/", (req, res) => {
  res.render('index')
})

app.get("/login", (req, res) => {
  res.render('loginregister')
})

app.get("/contact", (req, res) => {
  res.render('contact')
})
app.get("/getall", (req, res) => {
  res.render('getall')
})

// Initialize the server

var server = https.createServer(options, app).listen(6888, function(){
  console.log("Hello World");
})

