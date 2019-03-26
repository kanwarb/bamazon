var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table2');
// Initialize the database connection
var connection;
connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});
// Create a connection to the database and invoke the first function to list all items
connection.connect(function (err) {
    if (err) throw err;
    actionToPerform();  // this function queries the database and lists all items in it.
});

// First function called to list all products and format layout of displayed items using client table function

var getProdInf = function(func) {
    var table = new Table({
        head: ['Item_id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
        colWidths: [5, 50, 30, 10, 20]
    });

    connection.query("SELECT item_id,product_name,department_name, price,stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            table.push(
                [element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity]
            );

            //  console.log(element.item_id, ' ',  element.product_name,' ' , element.department_name, ' ', element.price, ' ', element.stock_quantity );
        });
        console.log(table.toString());
        func();

        
    })
}

// Show the Selection prompts for Manager Options
function actionToPerform() {

    inquirer.prompt([
        {
            name: 'managerAction',
            type: 'list',
            message: "What would you like to do",
            choices: ['View all Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit']
        }

    ]).then(function (answer) {
        switch (answer.managerAction) {
            case "View all Products for Sale":
                getProdInf(actionToPerform);
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;
            case 'Add to Inventory':
                getProdInf(addToInventory);
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            case 'Quit':
                connection.end();
                break;
        }
    });

}

// Give the user list of items that are near depleted i.e the inventory is 1 or 0
function viewLowInventory() {
    var table = new Table({
        head: ['Item_id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
        colWidths: [5, 50, 30, 10, 20]
    });
    connection.query("SELECT item_id,product_name,department_name, price,stock_quantity FROM products where stock_quantity <= 1", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            table.push(
                [element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity]
            );

            //  console.log(element.item_id, ' ',  element.product_name,' ' , element.department_name, ' ', element.price, ' ', element.stock_quantity );
        });
        console.log(table.toString());
        actionToPerform();
    })
}

function addToInventory() {
    inquirer.prompt([
        {
            name: 'Item_id',
            type: 'Input',
            message: "\n Enter ID of Item to add",
        },
        {
            name: 'addQuantity',
            type: 'Input',
            message: "Enter Quantity of Iteam to add",
        },

    ]).then(function (answer) {
        connection.query("Update products set stock_quantity = (stock_quantity +" + parseInt(answer.addQuantity) + ") where item_id=" + answer.Item_id, function (err, res) {
            if (err) throw err;
            actionToPerform();
        });
    });
}
// function getDepartments() {
//     var myChoices = [];
//     connection.query("SELECT department_name FROM departments", function (err, res) {
//         if (err) throw err;
//         res.forEach(function (element) {
//             myChoices.push(
//                 element.department_name
//             );
//             console.log(element.department_name);
//         });
//         console.log(myChoices);
//         return myChoices;
           
// });
// }

function addNewProduct() {
   
    var choices = [];
    connection.query("SELECT department_name FROM departments", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            choices.push(
                element.department_name
            );
            //console.log(element.department_name);
        });

    

    inquirer.prompt([
        {
            name: 'productName',
            type: 'Input',
            message: "\n What is the Name of the product you will like to add? ",
        },
        {
            name: 'prodDepartment',
            type: 'list',
            message: "Which department does this product fall under?",
            choices: choices
        },
        {
            name: 'productPrice',
            type: 'Input',
            message: "\n How much does the item cost? ",
        },
        {
            name: 'productQty',
            type: 'Input',
            message: "\n How many of the item do we have? ",
        },

    ]).then(function (answer) {
            name: 'productName',
        connection.query("insert into products(product_name,department_name,price,stock_quantity) values('" + answer.productName +"', '" + answer.prodDepartment + "'," + parseFloat(answer.productPrice,6,2) + ','+ parseInt(answer.productQty) + ")" , function (err, res) {
            if (err) throw err;
            actionToPerform();
        });
    });
});    
}