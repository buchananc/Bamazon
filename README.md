# **Bamazon**
Bamazon, like its name, is a simple e-commerce app, or at least the backend for it. Check out this screencast on youtube to see how it works: bamazon on youtube.

Bamazon uses some third-party node modules, has it's own modules, and connects to a mysql database to store and retrieve product and department information.

___
## Third-party Node Modules
Bamazon uses these node modules: [CLI Table](https://www.npmjs.com/package/cli-table), [Inquirer](https://www.npmjs.com/package/inquirer), [MySql](https://www.npmjs.com/package/mysql), [Chalk](https://www.npmjs.com/package/chalk), and [Figlet](https://www.npmjs.com/package/figlet).

They are all dependencies in the [package.json](https://github.com/buchananc/Bamazon/blob/master/package-lock.json), so all you'll need to do is run:

```npm install```
___

## Customer Module
To run this module in the terminal:

```node bamazonCustomer.js```

The customer module lets users select a product to purchase, enter the number of items they wish to purchase, and then complete the purchase.

The complete purchase process shows how much the total cost is (based on number of items).

The customer module also updates to the total sales for a department, based on the purchased product's department.