create database tekken_frame_data;

use tekken_frame_data;

CREATE TABLE characters (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name varchar(255),
    is_completed boolean,
    description varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO characters(name,is_completed,description) VALUES ("jin",false,"description1");
INSERT INTO characters(name,is_completed,description) VALUES ("heihachi",true,"description2");
INSERT INTO characters(name,is_completed,description) VALUES ("julia",true,"description3");

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    role_id integer,
    PRIMARY KEY (id),
    UNIQUE KEY (id)
);

INSERT INTO users(name,password,email,role_id) VALUES ("perry",MD5("123"),"perry@email.com",0);
INSERT INTO users(name,password,email,role_id) VALUES ("john",MD5("doe"),"john@email.com",1);
INSERT INTO users(name,password,email,role_id) VALUES ("peter",MD5("paker"),"peter@email.com",2);
