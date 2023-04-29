create database tekken_frame_data;

use tekken_frame_data;

CREATE TABLE characters (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name varchar(255),
    is_completed boolean,
    PRIMARY KEY (id)
);

INSERT INTO characters(name,is_completed) VALUES ("jin",false);
INSERT INTO characters(name,is_completed) VALUES ("heihachi",true);
INSERT INTO characters(name,is_completed) VALUES ("julia",true);

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (id)
);