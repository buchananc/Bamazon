DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER(99)
    AUTO_INCREMENT NULL,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
    ("Lysol Wipes", "cleaning supplies", 12.34, 1000),
    ("Dingo Delights", "pet supplies", 6.89, 120),
    ("Oileus Tent", "outdoors", 75.99, 430),
    ("Brella Umbrella", "outdoors", 19.99, 430),
    ("Bone Broth Protein", "health", 29.50, 567),
    ("Keto Plus", "health", 54.95, 278),
    ("Papermate Felt Tip Pens", "office supplies", 12.98, 1240),
    ("Twinkle Star LED Lights", "lighting", 15.99, 478),
    ("Linenspa 8 Inch Memory Foam", "bedroom", 95.00, 134),
    ("Langsdom T7 True Wireless Earbuds", "audio", 76.99, 729),
    ("Dove Conditioner", "Cosmetics", 6.25, 627),
    ("Glad 12 Gal Trash Bags", "Grocery", 5.99, 300),
    ("Brawny Paper Towels", "Grocery", 4.25, 400),
    ("Granny Smith Apples", "Produce", 0.35, 800),
    ("Chiquita Bannana", "Produce", 0.20, 10000),
    ("Tropicana Orange Juice", "Grocery", 4.45, 267),
    ("Horizon Organic Milk", "Grocery", 4.50, 200),
    ("Huggies Diapers", "Children", 2.75, 476),
    ("Charmin Toiler Paper", "Grocery", 12.99, 575),
    ("Pampers Baby Wipes", "Children", 1.50, 423),
    ("Yoga Mat", "Sports", 12.75, 150),
    ("5lb Dumb Bell", "Sports", 7.99, 89),
    ("Tie Dye Shirt", "Clothing", 5.55, 120),
    ("Nike Shorts", "Clothing", 17.88, 250),
    ("Purina Cat Chow", "Pet", 7.25, 157),
    ("Fancy Feast Wet Cat Food", "Pet", 12.50, 163),
    ("Ibuprophen", "Pharmacy", 4.95, 389),
    ("Band Aid", "Pharmacy", 3.25, 550),
    ("Ben & Jerry Ice Cream", "Grocery", 3.25, 432);

SELECT * FROM products;