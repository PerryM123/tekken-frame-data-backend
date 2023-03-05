# Tekken Frame Data Backend ver0.1

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

※ TODO: After preparing docker, be sure to add on to the Getting Started section

## Techonogies being used

- Backend: Express.js
- Container Management: Docker
- Database: MySQL
- Frontend: NextJS（[参考](https://github.com/PerryM123/tekken-frame-data/blob/master/README-english.md)）

## TODO

- [ ] Preparing docker image and container
  - I'm having issues where the local mysql server works on my Macbook Air but not my Macbook Pro's local mysql server
- [ ] Integrate Open API
