var db = require("../models");

//Routes
module.exports = function(app) {
 
  //index route loads html file
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};