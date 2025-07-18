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
    name VARCHAR(100) NOT NULL,
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
    name VARCHAR(100) NOT NULL,
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

-- TODO
-- INSERT queries

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
