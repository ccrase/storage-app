DROP DATABASE IF EXISTS storageapp_db;
CREATE DATABASE storageapp_db;
USE storageapp_db;

CREATE TABLE customers (
  customer_id  INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255),
  first_name  VARCHAR(45) NOT NULL,
  last_name  VARCHAR(45) NOT NULL,
  email_address VARCHAR(75),
  phone_number   VARCHAR(11),
  host_rating INT NOT NULL DEFAULT 0,
  first_time_login BOOLEAN NOT NULL DEFAULT true,
  google_id VARCHAR (255),
  PRIMARY KEY (customer_id)
);