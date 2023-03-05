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

※ TODO: Docker ができたらもうすぐ Docker 手順も追記必須

## Techonogies being used

- サーバーサイド技術: Express.js
- コンテナ管理: Docker
- データベース: MySQL
- フロントエンド技術: NextJS（[参考](https://github.com/PerryM123/tekken-frame-data)）

## TODO

- [ ] docker イメージとコンテナの準備
  - 自分の Macbook Air 内の mysql でちゃんと動いてるけど自分の Macbook Pro 内の MYSQL では不具合ばっかりなので docker を使うことになりました
- [ ] Open API に紐づくこと
