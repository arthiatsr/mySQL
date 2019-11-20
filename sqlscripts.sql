DROP DATABASE bamazon;
CREATE DATABASE bamazon;
CREATE TABLE products(
item_id INTEGER PRIMARY KEY NOT NULL
,product_name VARCHAR(30)
,department_name VARCHAR(30)
,price DECIMAL(10,2)
,stock_qty INTEGER
);
USE bamazon;
INSERT INTO products(item_id, product_name, department_name, price, stock_qty) VALUES (8213,"womens jacket","apparel",79.99,900),(2567,"mens shoe","footwear",49.99,1000),(9578,"dove soap","cosmetic",10.00,500),(8346,"frying pan","cookware",50.00,1000);
select * from products;