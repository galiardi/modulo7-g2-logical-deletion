-- $ docker volume create mysql-data

-- $ docker volume ls

-- $ docker run -d -p 33060:3306 --name mysql-db  -e MYSQL_ROOT_PASSWORD=secret --mount src=mysql-data,dst=/var/lib/mysql mysql

-- $ docker exec -it mysql-db mysql -p

CREATE DATABASE grupal2_ld;

-- SHOW DATABASES;

USE grupal2_ld;

CREATE TABLE student(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  idNumber VARCHAR(12) NOT NULL UNIQUE,
  course VARCHAR(30) NOT NULL,
  level INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  state INT NOT NULL DEFAULT 1
);

-- SHOW COLUMNS FROM student;


-- $ docker rm -f mysql-db
