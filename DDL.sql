-- Group 12, Car City Sales Management System
-- Lindsey Clement & Brandon Mcconathy

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Drops tables if they exist in the DB
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS CarModel;
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Repairs;
DROP TABLE IF EXISTS Transactions;

-- Creates all tables
CREATE TABLE Customers (
    customerID INT NOT NULL AUTO_INCREMENT,
    fName VARCHAR(100) NOT NULL,
    lName VARCHAR(100) NOT NULL,
    addressLine1 VARCHAR(150) NOT NULL,
    addressLine2 VARCHAR(150),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    postalCode VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    email VARCHAR(254) NOT NULL,
    PRIMARY KEY (customerID)
);

CREATE TABLE Employees (
    employeeID INT NOT NULL AUTO_INCREMENT,
    fName VARCHAR(100) NOT NULL,
    lName VARCHAR(100) NOT NULL,
    jobTitle VARCHAR(50) NOT NULL,
    isDealer BOOLEAN NOT NULL,
    email VARCHAR(254) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    PRIMARY KEY (employeeID)
);

CREATE TABLE CarModel (
    carModelID INT NOT NULL AUTO_INCREMENT,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY (carModelID)
);

CREATE TABLE Cars (
    carID INT NOT NULL AUTO_INCREMENT,
    carModelID INT NOT NULL,
    isPreOwned BOOLEAN NOT NULL,
    recievedDate DATE NOT NULL,
    isForSale BOOLEAN NOT NULL,
    PRIMARY KEY (carID),
    FOREIGN KEY (carModelID) REFERENCES CarModel(carModelID)
    ON DELETE CASCADE
);

CREATE TABLE Repairs (
    repairID INT NOT NULL AUTO_INCREMENT,
    employeeID INT NOT NULL,
    carID INT NOT NULL,
    serviceDate DATE NOT NULL,
    serviceType VARCHAR(100) NOT NULL,
    notes VARCHAR(255),
    cost DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (repairID),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
    ON DELETE CASCADE,
    FOREIGN KEY (carID) REFERENCES Cars(carID)
    ON DELETE CASCADE
);

CREATE TABLE Transactions (
    transactionID INT NOT NULL AUTO_INCREMENT,
    customerID INT NOT NULL,
    employeeID INT NOT NULL,
    carID INT NOT NULL,
    transactionDate DATE NOT NULL,
    transactionAmount DECIMAL(10, 2) NOT NULL,
    paid BOOLEAN NOT NULL,
    PRIMARY KEY (transactionID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
    ON DELETE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
    ON DELETE CASCADE,
    FOREIGN KEY (carID) REFERENCES Cars(carID)
    ON DELETE CASCADE
);

-- Inserts data into all of the tables
INSERT INTO Customers (fName, lName, addressLine1, city, state, country, postalCode, phoneNumber, email)
VALUES ("John", "Doe", "123 State St", "Los Angeles", "California", "United States", "90001", "6265551234", "johndoe@example.com"),
("Alex", "Johnson", "321 Apple St", "Los Angeles", "California", "United States", "90001", "6265554321", "alex.j@example.com"),
("Ryan", "Roberts", "456 Orange Rd", "Las Vegas", "Nevada", "United States", "80002", "8275551234", "r.roberts@example.com"),
("Monica", "Myers", "654 Mountain St", "Portland", "Oregon", "United States", "70001", "6215559876", "monicamy@example.com"),
("Linda", "Smith", "987 Main St", "Portland", "Oregon", "United States", "70001", "6215559229", "lindasmith@example.com"),
("Jane", "Doe", "123 State St", "Los Angeles", "California", "United States", "90001", "6265559090", "janedoe@example.com");

INSERT INTO CarModel (make, model, year)
VALUES ("Honda", "Accord", 2025),
("Honda", "Accord", 2024),
("Ford", "Explorer", 2025),
("Toyota", "Camry", 2024),
("Honda", "Civic", 2025),
("Tesla", "Model 3", 2025),
("Tesla", "Model Y", 2024);

INSERT INTO Cars (carModelID, isPreOwned, recievedDate, isForSale)
VALUES ((SELECT carModelID FROM CarModel WHERE make = "Honda" AND model = "Accord" AND year = 2025), 0, "2025-03-10", 1),
((SELECT carModelID FROM CarModel WHERE make = "Honda" AND model = "Accord" AND year = 2024), 1, "2025-05-02", 1),
((SELECT carModelID FROM CarModel WHERE make = "Honda" AND model = "Accord" AND year = 2025), 0, "2025-03-10", 0),
((SELECT carModelID FROM CarModel WHERE make = "Tesla" AND model = "Model 3" AND year = 2025), 0, "2025-06-03", 1),
((SELECT carModelID FROM CarModel WHERE make = "Tesla" AND model = "Model Y" AND year = 2024), 1, "2024-12-20", 0),
((SELECT carModelID FROM CarModel WHERE make = "Tesla" AND model = "Model Y" AND year = 2024), 1, "2024-12-20", 1);

-- TODO
-- INSERT queries for the remaining tables

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
