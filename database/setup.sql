-- $ docker volume create mysql-data

-- $ docker volume ls

-- $ docker run -d -p 33060:3306 --name mysql-db  -e MYSQL_ROOT_PASSWORD=secret --mount src=mysql-data,dst=/var/lib/mysql mysql

-- $ docker exec -it mysql-db mysql -p

CREATE DATABASE grupal2_ld_user;

-- SHOW DATABASES;

USE grupal2_ld_user;

CREATE TABLE credential(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE user(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(60) NOT NULL UNIQUE,
  idNumber VARCHAR(12) NOT NULL UNIQUE,
  id_credential INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  state INT NOT NULL DEFAULT 1,
  FOREIGN KEY (id_credential) REFERENCES credential(id)
);

-- SHOW COLUMNS FROM student;


-- $ docker rm -f mysql-db
