-- $ docker volume create mysql-data

-- $ docker volume ls

-- $ docker run -d -p 33060:3306 --name mysql-db  -e MYSQL_ROOT_PASSWORD=secret --mount src=mysql-data,dst=/var/lib/mysql mysql

-- $ docker exec -it mysql-db mysql -p

CREATE DATABASE grupal3;

-- SHOW DATABASES;

USE grupal3;

CREATE TABLE credential(
  id_credential INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE user(
  id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL UNIQUE,
  id_credential INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_credential) REFERENCES credential(id_credential)
);

-- SHOW COLUMNS FROM student;


-- $ docker rm -f mysql-db
