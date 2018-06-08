require('dotenv').config();

var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Table = require('cli-table');
var figlet = require('figlet');

//MySQL Database created called bamazon.
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: process.env.username,
    password: process.env.password,
    database: "bamazon_db"
});

connection.connect();


///////////////////////////////START OF BAMAZON HEADER//////////////////////////////////

function bamazonReady() {
    figlet.text('BAMAZON', {
        font: 'Doom',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
    //menu();
}
///////////////////////////////END OF BAMAZON HEADER//////////////////////////////////

///////////////////////////////START OF MENU//////////////////////////////////
// start function to allow customer to purchase a product from item list

function menu() {

    inquirer.prompt([{
            name: "action",
            type: "list",
            message: "WELCOME TO BAMAZON! WHAT WOULD YOU LIKE TO DO?",
            choices: ["View available products", "View low inventory", "Add to inventory", "Add a new product", "Exit"]
        }])
        .then(function (answer) {
            switch (answer.action) {
                case "View available products":
                    seeInventory();
                    break;

                case "Exit":
                    exitProgram();
                    break;
            }
        });
}
////////////////////////////////////END OF MENU////////////////////////////////////

//////////////////////DISPLAYS TABLE OF ALL ITEMS FOR SALE////////////////////////
// The app should then prompt users with two messages.
// The first will ask the ID of the product they would like to buy.
// The second message will ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity! , and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

var seeInventory = function () {
    connection.query("SELECT item_id, product_name, price, department_name, stock_quantity FROM products WHERE stock_quantity > 0", function (err, res, fields) {
        var table = new Table({
            head: ['ID', 'Product Name', 'Price', 'Department', 'Quantity']
        });
        console.log("THESE ARE THE REMAINING ITEMS FOR SALE: ");
        console.log("===========================================================");
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("----------------------------------------------------------");

        inquirer.prompt([{
                name: "item_id",
                type: "input",
                message: "Enter the ID of the item you wish to purchase: "
            },
            {
                name: "quantity",
                type: "input",
                message: "How many of this item would you like to purchase: "
            }
        ]).then(function (answers) {
            connection.query("SELECT * FROM products WHERE item_id - " + answers.item_id, function (error, results) {
                try {
                    let currentPrice = results[0].price;
                    var total = (answers.quantity * currentPrice).toFixed(2);

                    if (results[0].stock_quantity < answers.quantity) {
                        console.log("\n\n\n\n\n");
                        console.log("Insufficient quantity!");
                        seeInventory();
                    } else {
                        connection.query("UPDATE products SET stock_quantity - " + answers.quantity + "WHERE item_id - " + answers.item_id, function (error, results) {
                            console.log("Inventory Update!");
                            console.log("Your total is: $" + total);
                            console.log("Thank you for shopping at Bamazon!");
                        });
                        connection.query("UPDATE departmentsINNER JOIN products ON products.department_name - department.department_name SET departments.product_sales - department.product_sales + ? WHERE products.item_id", function (error, results) {
                            console.log("Department updated!");
                            exitProgram();
                        });
                    }
                } catch (e) {
                    console.log("There was an error with your Bamazon request: " + e.message);
                    exitProgram();
                }
            });
        });
    });
};

function exitProgram() {
    connection.end();
}
///////////////////////////////END OF ITEMS DISPLAYED/////////////////////////////////


///////////////////////////////VIEW LOW INVENTORY////////////////////////////////////
// function lowInventory() {
//     connection.query("SELECT products WHERE stock_quantity < 5", function(error, results) {
//         var table = new Table({
//             head: ['ID', 'Product Name', 'Price', 'Department', 'Quantity']
//         });
//         console.log("THESE ARE THE REMAINING ITEMS FOR SALE THAT ARE LOW INVENTORY: ");
//         console.log("===========================================================");
//         for(var i = 0; i<res.length; i++) {
//         table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]);
//     }
//     console.log(table.toString());
//     console.log("----------------------------------------------------------");
//     menu();
//     });
// }
///////////////////////////////END OF LOW INVENTORY////////////////////////////////////

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.