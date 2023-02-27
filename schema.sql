create database tekken_frame_data;

use tekken_frame_data;

CREATE TABLE characters (
    id int,
    name varchar(255),
    is_completed boolean
);

ALTER TABLE characters
ADD PRIMARY KEY (id);

INSERT INTO characters(id,name,is_completed) VALUES (1,"Jin",false);
INSERT INTO characters(id,name,is_completed) VALUES (2,"heihachi",true);
INSERT INTO characters(id,name,is_completed) VALUES (3,"julia",true); 