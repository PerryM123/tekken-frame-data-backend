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

CREATE TABLE moves (
    id INTEGER NOT NULL AUTO_INCREMENT,
    character_id INTEGER NOT NULL,
    input varchar(255) NOT NULL,
    start_up INTEGER NOT NULL,
    hit_type varchar(255) NOT NULL,
    damage varchar(255) NOT NULL,
    block varchar(255) NOT NULL,
    hit varchar(255) NOT NULL,
    counter varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (id)
);

INSERT INTO moves(character_id,input,start_up,hit_type,damage,block,hit,counter) values (1,"1",10,"H","7",1,8,8);
INSERT INTO moves(character_id,input,start_up,hit_type,damage,block,hit,counter) values (1,"1,1",10,"H,H","7,6",3,8,8);
INSERT INTO moves(character_id,input,start_up,hit_type,damage,block,hit,counter) values (2,"3",12,"H","7",1,8,8);
INSERT INTO moves(character_id,input,start_up,hit_type,damage,block,hit,counter) values (3,"d4",14,"L","3",4,3,9);
INSERT INTO moves(character_id,input,start_up,hit_type,damage,block,hit,counter) values (3,"2,2,2",10,"H","7",2,8,10);