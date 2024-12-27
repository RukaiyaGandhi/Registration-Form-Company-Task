CREATE DATABASE Equip9;

USE Equip9;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    mobileNumber VARCHAR(10) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(50),
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedBy VARCHAR(50)
);

DELIMITER //

CREATE PROCEDURE CreateUser (
    IN fName VARCHAR(50),
    IN lName VARCHAR(50),
    IN mNumber VARCHAR(10),
    IN pHash VARCHAR(255),
    IN createdBy VARCHAR(50)
)
BEGIN
    INSERT INTO Users (firstName, lastName, mobileNumber, passwordHash, createdBy)
    VALUES (fName, lName, mNumber, pHash, createdBy);
END;
//

DELIMITER //

CREATE PROCEDURE GetUser (IN mNumber VARCHAR(10))
BEGIN
    SELECT * FROM Users WHERE mobileNumber = mNumber;
END;
//
