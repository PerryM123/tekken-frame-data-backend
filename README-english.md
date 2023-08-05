# Tekken Frame Data Backend ver0.2.2

※ [日本語の README.md はここ！](README.md)👈
以下

## Why Am I Making This?

I am mainly a frontend development and never really had the chance to work on backend development so I am developing a backend (REST API, mysql データベース, etc) for my [personal frontend project](https://github.com/PerryM123/tekken-frame-data/blob/master/README-english.md).

## The Goal

To develop a REST API that handles CRUD operations for the frame data of a fighting game called Tekken 7.

## Getting Started

```
$ git clone git@github.com:PerryM123/tekken-frame-data-backend.git
$ cd tekken-frame-data-backend
$ yarn
$ yarn dev
```

# About Docker
※ Required:

1. Download Docker Desktop（[Mac 導入方法](https://qiita.com/gahoh/items/92217e0a887bb81e3155)・[Windows 導入方法](https://qiita.com/gahoh/items/7b21377b5c9e3ffddf4a)
2. After installation, open Docker Desktop

## Starting Application
```
# Start container
$ cd ~/workspace/tekken-frame-data-backend
$ docker-compose up -d
# Check container
$ docker container ls
# Start node
$ yarn dev
```

## Setting Up MySQL Database
※ Required: Container is running
```
# Connect to database container
$ docker exec -it tekken-frame-data-backend_mysqldb_1 bash
# log into mysql and input password（Refer to the password in .env file）
@ bash-4.2
$ mysql -u root -p mysql
# Add schema.sql
mysql> create database tekken_frame_data;
    ->     use tekken_frame_data;
    ->     CREATE TABLE characters (
    ->     id INTEGER NOT NULL AUTO_INCREMENT,
    ->     name varchar(255),
    ->     is_completed boolean,
    ->     PRIMARY KEY (id)
    -> );
```

## Techonogies being used

- Backend: Express.js
- Container Management: Docker
- Database: MySQL
- Frontend: NextJS（[参考](https://github.com/PerryM123/tekken-frame-data/blob/master/README-english.md)）

## TODO

- [ ] Integrate Open API
