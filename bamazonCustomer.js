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
    getProductInfo();  // this function queries the database and lists all items in it.
});

// First function called to list all products and format layout of displayed items using client table function

function getProductInfo() {
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
        buyProduct
        
    })
}