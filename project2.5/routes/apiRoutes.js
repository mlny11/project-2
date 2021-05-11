//Requiring models
var db = require("../models");

//Routes
module.exports = function (app) {

  // Get all examples

  //Get route for retrieving transactions
  app.get("/api/transactions", function (req, res) {
    db.Transactions.findAll({}).then(function (dbTransactions) {
      res.json(dbTransactions);
    });
  });


  //POST for saving a new transaction
  app.post("/api/transactions", function (req, res) {
    console.log(req.body);
    db.Transactions.create({
      category: req.body.category,
      credit: req.body.credit,
      transAmount: req.body.transAmount,
      notes: req.body.notes,
    })
      //updating transactions
      .then(function (dbTransactions) {
        res.json(dbTransactions);
      });
  });

// get to pull all transactions from db



  app.get("/api/totalamount", function (req, res) {
    db.Transactions.findAll({}).then(function (dbTransactions) {
      var transactions = [];
      function add(a, b) {
        return parseFloat(a) + parseFloat(b);
      }
      for (i = 0; i < dbTransactions.length; i++) {
        transactions.push(dbTransactions[i].transAmount)
      }
      var sum = transactions.reduce(add, 0);
      res.json(sum);
    })
  })

// updates db total depending on credit or debit



  app.get("/api/totalcredit", function (req, res) {
    db.Transactions.findAndCountAll({where: {credit: true}}).then(function (dbTransactions) {
  console.log(dbTransactions.rows)
      var transactions = [];
      function add(a, b) {
        return parseFloat(a) + parseFloat(b);
      }
      for (i = 0; i < dbTransactions.rows.length; i++) {
          transactions.push(dbTransactions.rows[i].transAmount)
      }
      var sum = transactions.reduce(add, 0);
      res.json(sum);
      console.log(sum)
    })
  })


  app.get("/api/credits", function (req, res) {
    db.Transactions.findAndCountAll({where: {credit: true}}).then(function (dbTransactions) {    
      res.json(dbTransactions);
    });
  });


  app.get("/api/totaldebit", function (req, res) {
    db.Transactions.findAndCountAll({where: {credit: false}}).then(function (dbTransactions) {
  console.log(dbTransactions.rows)
      var transactions = [];
      function add(a, b) {
        return parseFloat(a) + parseFloat(b);
      }
      for (i = 0; i < dbTransactions.rows.length; i++) {
          transactions.push(Math.abs(dbTransactions.rows[i].transAmount))
      }
      var sum = transactions.reduce(add, 0);
      res.json(sum);
      console.log(sum)
    })
  })


  app.get("/api/debits", function (req, res) {
    db.Transactions.findAndCountAll({where: {credit: false}}).then(function (dbTransactions) {
      res.json(dbTransactions);
    });
  });

};