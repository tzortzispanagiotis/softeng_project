const express     = require('express'),
      app         = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      apiMiddlewares = require("./middlewares/apiMiddlewares"),
      db          = require("./database/connect");


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



// Initialize the server
app.listen(process.env.PORT || 8888, () => {
  console.log("Hello World");
})