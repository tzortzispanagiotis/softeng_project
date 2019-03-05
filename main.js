const express     = require('express'),
      app         = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      apiMiddlewares = require("./middlewares/apiMiddlewares"),
      db          = require("./database/connect"),
      Prices = require("./database/prices"),
      User  = require("./database/user"),
      Shops = require("./database/shops"),
      Product = require("./database/products"),
      InvalidTokens = require("./database/invalidTokens"),
      forget        = require("./database/forget.js"),
      myinit  = require("./database/database_init.js"),
      creds   = require("./configurations/credentials"),
      fs = require('fs'),
      https = require('https');
const test = require("./tests")
var options = {
    key:    fs.readFileSync("./certificates_for_https/server.key"), //mono gia ton maki oi alloi ta dika sas
    cert:   fs.readFileSync("./certificates_for_https/server.cert"),
};
String.prototype.startsWith = function(suffix) {
  return this.indexOf(suffix, 0) !== -1;
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

// Index Router:
const indexRouter = require("./routing/indexRouter.js")
app.use('/', indexRouter)

// Initialize the server


var server = https.createServer(options, app).listen(creds.port, function(){
  console.log("Hello World");
})
var flag=0 ; 

setTimeout(test.func, 3000)




