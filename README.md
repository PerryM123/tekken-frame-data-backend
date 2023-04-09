# Tekken Frame Data Backend ver0.1

※ [English README.md is here！](README-english.md)👈

## なぜ作ってるか

僕は主にフロントエンド開発をやっててあまりバックエンド開発に触れる機会が非常に少ないため、自分のフロントエンド個人プロジェクト（[参考](https://github.com/PerryM123/tekken-frame-data)）にちゃんとしたバックエンド（REST API、mysql データベースなど）を導入したいと思ってます。

## 目的

鉄拳 7 という格闘ゲームのフレームデータの元に CRUD 操作を行う REST API 作成

## Getting Started

```
$ git clone git@github.com:PerryM123/tekken-frame-data-backend.git
$ cd tekken-frame-data-backend
$ yarn
$ yarn dev
```

# Dockerについて
※ 事前準備:

- 1. Docker Desktop を導入してください（[Mac 導入方法](https://qiita.com/gahoh/items/92217e0a887bb81e3155)・[Windows 導入方法](https://qiita.com/gahoh/items/7b21377b5c9e3ffddf4a)
- 2. 導入後、Docker Desktop を開いてください

## アプリ起動
```
# コンテナ起動
$ cd ~/workspace/tekken-frame-data-backend
$ docker-compose up -d
# コンテナ確認
$ docker container ls
# node起動
$ yarn dev
```

## MySQLデータベース初期化
※ 事前準備: コンテナ起動
```
# コンテナに接続
$ docker exec -it tekken-frame-data-backend_mysqldb_1 bash
# mysqlにログインし、パスワードへログイン（パスワードは.envを参考してください）
@ bash-4.2
$ mysql -u root -p mysql
# schema.sqlを反映する
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

- サーバーサイド技術: Express.js
- コンテナ管理: Docker
- データベース: MySQL
- フロントエンド技術: NextJS（[参考](https://github.com/PerryM123/tekken-frame-data)）

## TODO

- [ ] Open API に紐づくこと
