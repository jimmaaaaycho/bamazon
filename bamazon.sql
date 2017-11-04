
CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Shaving Cream', 'Health and Beauty', 2.99, 1000),
		('To Kill a Mocking Bird', 'Books', 4.99, 2000),
		('Sabras Hummus', 'Grocery', 5.99, 1000),
		('Bai Cococnut', 'Grocery', 2.99, 1000),
		('Mac Book Pro 2017', 'Electronics', 3000, 500),
		('Bamazon Echo', 'Electronics', 179, 1000),
		('Shampoo', 'Health and Beauty', 3.99, 4000),
		('Avocados', 'Grocery', 1.99, 4000),
		('Pizza', 'Grocery', 4.99, 1000),
		('Pizza Bible', 'Books', 29.99, 1000);

		