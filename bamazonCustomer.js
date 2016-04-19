//====================
//Global
//====================
var mysql = require('mysql');
var prompt = require('prompt');

//====================
//Connection
//====================
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'

});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

//====================
//View All Products
//====================
connection.query("SELECT ItemId, ProductName, Price FROM products", function(err, inStock) {
    if (err) {
        throw (err);
    }
    console.log(inStock);
});

//====================
//Customer Input
//====================
var askCustomer = function() {
    prompt.start();
    console.log("Welcome to Bamazon");
    console.log("We offer great products!");
    console.log("What would you like to buy?!")
    prompt.get(["ItemId", "Quantity"], function(err, result) {
        if (err) {
            throw (err);
        } else {
            connection.query("Select * From products", function(err, result) {
                if (err) {
                    throw (err);
                }
                console.log(result);
            })
        }
    })
}
askCustomer();
