//Dependencies
var express = require("express");

//Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Routes for API and HTML to serve different files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Starts the server to begin listening
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});