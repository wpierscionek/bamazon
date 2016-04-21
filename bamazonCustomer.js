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

    // console.log('connected as id ' + connection.threadId);
});

//====================
//View All Products
//====================
connection.query("SELECT ItemId, ProductName, Price FROM products", function(err, inStock) {
    if (err) {
        throw (err);
    }
    var inventory = inStock;
    for (i = 0; i < inventory.length; i++) {
        console.log("Currently in stock " + inventory[i].ProductName + " ItemId #" + inventory[i].ItemId + " $" + inventory[i].Price);
        console.log("________________________________________________")

    }
});

//====================
//Customer Input
//====================
var askCustomer = function() {
    console.log("Welcome to Bamazon");
    console.log("We offer great products!");
    console.log("What would you like to buy?!")
    prompt.start();
    prompt.get(["ProductName", "Quantity"], function(err, result) {
        if (err) {
            throw (err);
        } else {
            connection.query("SELECT * From products", function(err, order) {
                if (err) {
                    throw (err);
                }

                for (i = 0; i < order.length; i++) {

                    if (order[i].ProductName === result.ProductName && result.Quantity <= order[i].StockQuantity) {
                        console.log("You Purchased: " + order[i].ProductName);
                        console.log("Quantity: " + result.Quantity);
                        console.log("You Pay: $" + (result.Quantity * order[i].Price));

                    } else if (order[i].ProductName === result.ProductName && result.Quantity > order[i].StockQuantity) {
                        console.log("Sorry, we only have in stock " + order[i].StockQuantity + " " + result.ProductName + " 's'");
                    }
                }
                connection.query("UPDATE products SET StockQuantity = StockQuantity - " + result.Quantity + " WHERE ProductName ='" + result.ProductName + "'", function(err, newStock) {
                    if (err) {
                        throw (err);
                    }
                    connection.query("SELECT * FROM products", function(err, update) {
                        var newInventory = update;
                        for (i = 0; i < newInventory.length; i++) {
                            console.log("Our Current Inventory " + newInventory[i].ProductName + " " + " Quantity " + newInventory[i].StockQuantity);
                            console.log("________________________________________________")
                        }

                    })

                })
            })
        }
    })
}
askCustomer();
