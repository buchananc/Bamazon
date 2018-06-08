require('dotenv').config();

var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Table = require('cli-table');
// var figlet = require('figlet');

//MySQL Database created called bamazon.
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: process.env.username,
    password: process.env.password,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    begin();
});

///////////////////////////////TRIGGER WELCOME//////////////////////////////////

function begin() {
    // clear();
    // console.log(figlet.textSync('BAMAZON', {
    //     font: 'Ghost',
    //     horizontalLayout: 'default',
    //     verticalLayout: 'default'
    // }));

    inquirer.prompt([{
            name: "action",
            type: "list",
            message: "Welcome to Bamazon! What would you like to do?",
            choices: ["View available products", "Exit"]
        }])
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
}
///////////////////////////////END OF WELCOME//////////////////////////////////

//////////////////////DISPLAYS INVENTORY IN A TABLE////////////////////////
var seeInventory = function () {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0", function (err, res, fields) {
        var table = new Table({
            head: ['ID', 'Product Name', 'Price', 'Quantity']
        });
        console.log("These are the remaining items on sale: ");
        console.log("===========================================================");
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("----------------------------------------------------------");  
        whatId();
    });
};
///////////////////////////////END OF TABLE FUNCTION//////////////////////////////////
var whatId = function(){
    var buySomething = function (answers) {
        console.log("You chose: ", answers);
    };

    var questions = [{
        name: "id",
        type: "input",
        message: "Enter the ID of the item you wish to purchase: "
    },
    {
        name: "amount",
        type: "input",
        message: "How many of this item would you like to purchase: "
    }];
    
    inquirer.prompt(questions, buySomething);
};

