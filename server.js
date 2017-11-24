//Dependencies:
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
//================================================
//Express config (telling node creating an express server):
var PORT = process.env.PORT || 3012;
var app = express();


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(PORT, function (err) {
    if (err) {
        console.log("error: " + err)
    }
    console.log("Connected to PORT: " + PORT)
});