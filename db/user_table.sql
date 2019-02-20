
-- Drop colors table if it exists
DROP TABLE IF EXISTS users;
-- Create the colors table
CREATE TABLE users
(
  id INT NOT NULL
   PRIMARY KEY AUTO_INCREMENT,
  
  username VARCHAR
(40) UNIQUE NOT NULL,

  password CHAR
(50) NOT NULL
);