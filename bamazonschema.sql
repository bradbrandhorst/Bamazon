DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (

item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)

);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Coil - Love's Secret Domain","Records",14.99,6),
("Copra by Michel Fiffe","Comics",5.00,10),
("Infinite Jest by David Foster Wallace","Books",18.95,2),
("INLAND EMPIRE","DVDs",19.99,10),
("Suave Shampoo","Health and Beauty",3.99,20),
("Wilson Volleyball","Sporting Goods",25.98,5),
("Colored Pencils","Art Supplies",7.99,20),
("Thundershirt","Pet Care",24.99,3),
("HP Spectre Laptop","Electronics",1399.99,4),
("Ragnarok by Walter Simonson","Comics",3.99,3);

select * from products;