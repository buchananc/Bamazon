require('dotenv').config()

var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Table = require('cli-table');

//MySQL Database created called bamazon.
var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 8889,

    // username
    user: process.env.username,

    // password
    password: process.env.password,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
});


// Created a Table inside of bamazon_db called products.
// The products table contains the following columns:
// item_id(unique id for each product)
// product_name(Name of product)
// department_name
// price(cost to customer)
// stock_quantity(how much of the product is available in stores)

// First display all of the items available for sale.
//Include the ids, names, and prices of products for sale.

var start = function() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "Welcome to Bamazon! What would you like to do?",
            choices: ["View available products", "Exit"]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View available products":
                    seeInventory();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

var seeInventory = function () {
    connection.query("SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0", function (err, res, fields) {
        var table = new Table({
            head: ['ID', 'Product Name', 'Price']
        });
        console.log("These are the remaining items on sale: ");
        console.log("=======================================");
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price]);
        }
        console.log(table.toString());
        console.log("---------------------------------------");        
    });
};

var itemsLeft = function (res) {
    inquirer.prompt ([{
        type: 'input',
        name: 'itemId',
        message: 'Enter the item ID of the product you would like to purchase.'
    },
    {
        type: 'input',
        name: 'choice',
        message: 'How many would you like to purchase?'
    }
    ]).then(function(answers){
        for(var i=0; i<res.length; i++){
            if (res[i].product_name==answers.choice){
                correct=true;
                var product=answers.choice;
                var id=i;
            }
        }

    })
}

// start function to allow customer to purchase a product from item list
start();
            
            
// The app should then prompt users with two messages.
// The first will ask the ID of the product they would like to buy.
// The second message will ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity! , and then prevent the order from going through.



        // However, if your store does have enough of the product, you should fulfill the customer's order.


        // This means updating the SQL database to reflect the remaining quantity.
        // Once the update goes through, show the customer the total cost of their purchase.