# **Bamazon**
Bamazon, like its name, is a simple e-commerce app, or at least the backend for it. Bamazon uses some third-party node modules, has it's own modules, and connects to a mysql database to store and retrieve product and department information.

___
## Third-party Node Modules
Bamazon uses these node modules: [CLI Table](https://www.npmjs.com/package/cli-table), [Inquirer](https://www.npmjs.com/package/inquirer), [MySql](https://www.npmjs.com/package/mysql), [Chalk](https://www.npmjs.com/package/chalk), and [Figlet](https://www.npmjs.com/package/figlet).

They are all dependencies in the [package.json](https://github.com/buchananc/Bamazon/blob/master/package-lock.json), so all you'll need to do is run:

```npm install```
___

## Customer Module
### Start

To run this module in the terminal:

```node bamazonCustomer.js```

![start](https://user-images.githubusercontent.com/35079979/41186587-e8fb95ce-6b66-11e8-8ca8-7a5bbe636493.png)

### Menu

The customer is prompted with a 'Welcome Menu.'

![menu](https://user-images.githubusercontent.com/35079979/41186591-0e5cecdc-6b67-11e8-9158-2d96aea3bb10.png)

The customer module lets users select an item to purchase from a list of products.

Next they are asked to enter the number of items they wish to purchase. 

![list](https://user-images.githubusercontent.com/35079979/41186609-6cce842e-6b67-11e8-8910-c2fc6d673b8f.png)

Finally, they will receive their a completed transaction for their purchase. The completed purchase process shows how much the total cost is (based on number of items).

![transaction](https://user-images.githubusercontent.com/35079979/41186611-7614ce30-6b67-11e8-9d45-a7474d4a79bc.png)

The customer module also updates to the total sales for a department, based on the purchased product's department.

![updatedtable](https://user-images.githubusercontent.com/35079979/41186625-96f0035e-6b67-11e8-815a-934e9c259a12.png)
