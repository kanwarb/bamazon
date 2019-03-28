/* Create a database call bamazon */
create database bamazon;

/* make bamazon the current database */
use bamazon;

/* Create products table to store items available for sale*/
create table products (
item_id INTEGER(11) auto_increment NOT NULL,
product_name varchar(100),
department_name varchar(100),
price FLOAT(6,2),
stock_quantity INTEGER(10),
product_sales FLOAT(6,2),
PRIMARY KEY (ITEM_ID)

);

/* Add dummy data for testing to the products table*/

insert into products(item_id,product_name,department_name,price,stock_quantity) values( 1, "Amazon Echo", "Electronics", 49.99,20);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 2, "Ink Cartridge", "Electronics", 19.99,150);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 3, "Hand Sanitizer", "Health", 9.99,500);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 4, "Soap", "Health", 4.99, 8000);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 5, "Whey Protein", "Health", 22.99, 4);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 6, "Water", "Groceries", 3.99, 40);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 7, "Oranges", "Groceries", 5.99, 20);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 8, "Trail Mix", "Groceries", 21.99, 23);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 9, "Paper Plates", "Household", 12.99, 55);
insert into products(item_id,product_name,department_name,price,stock_quantity) values( 10,"Cheerios", "Groceries", 6.99, 155);

/* Create a departments table with name of departments */
create table departments(
department_id INTEGER(11) auto_increment NOT NULL,
department_name varchar(100),
primary key (department_id)
);

/* Insert departements data into the table */

insert into departments(department_name) values('Electronics');
insert into departments(department_name) values('Apparels');
insert into departments(department_name) values('Shoes');
insert into departments(department_name) values('Health');
insert into departments(department_name) values('Necessities');
insert into departments(department_name) values('Video Games');