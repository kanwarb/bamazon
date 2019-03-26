create database bamazon;

use bamazon;
create table products (
item_id INTEGER(11) auto_increment NOT NULL,
product_name varchar(100),
department_name varchar(100),
price FLOAT(6,2),
stock_quantity INTEGER(10),
PRIMARY KEY (ITEM_ID)
)