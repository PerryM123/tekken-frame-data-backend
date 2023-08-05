import { apiPath } from './utils/constants';
import request from 'supertest';
import server from '../src/server';
import { AppDataSource } from './datasource';
import { addCharacter200, getCharacterList200, getSpecificCharacter200 } from './mockData/getCharacterList.200';
import getAllCharacters200Response from './mockData/getCharacterList.200.json';
import getSpecificCharacter200Response from './mockData/getSpecificCharacter.200.json';
import getSpecificCharacter404Response from './mockData/getSpecificCharacter.404.json';
import addCharacters200Response from './mockData/addCharacters.200.json';
import addCharacters409Response from './mockData/addCharacters.409.json';
import addCharacterName400Response from './mockData/addCharacters.400name.json';
import addCharacterComplete400Response from './mockData/addCharacters.400complete.json';
import addCharacterDescription400Response from './mockData/addCharacters.400description.json';

describe('APIレスポンス', () => {
  beforeEach(() => {
    delete require.cache[require.resolve('./server')];
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll((done) => {
    server.close(done);
  });

  describe('Charactersコントローラーについて', () => {
    describe('キャラ一覧取得API', () => {
      test('キャラター一覧を取得すると200を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            find: () => {
              return getCharacterList200;
            }
          };
        });
        const response = await request(server)
          .get(`${apiPath}/characters`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY });
        expect(response.body).toMatchObject(getAllCharacters200Response);
        expect(response.statusCode).toBe(200);
      });
    });
    describe('特定のキャラ取得API', () => {
      test('特定のキャラが存在されると200を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOneBy: () => {
              return getSpecificCharacter200;
            }
          };
        });
        const response = await request(server)
          .get(`${apiPath}/characters/Jin-copy3`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY });
        expect(response.body).toMatchObject(getSpecificCharacter200Response);
        expect(response.statusCode).toBe(200);
      });
      test('特定のキャラが存在しないと404を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOneBy: () => {
              return undefined;
            }
          };
        });
        const response = await request(server)
          .get(`${apiPath}/characters/no-character`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY });
        expect(response.body).toMatchObject(getSpecificCharacter404Response);
        expect(response.statusCode).toBe(404);
      });
    });
    describe('キャラ追加API', () => {
      test('新規でキャラターを追加すると200を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOneBy: () => {
              return undefined;
            },
            manager: {
              save: jest.fn()
            }
          };
        });
        const response = await request(server)
          .post(`${apiPath}/characters`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY })
          .send({
            name: 'Jun1234',
            is_completed: false,
            description: 'hello-world'
          });
        expect(response.body).toMatchObject(addCharacters200Response);
        expect(response.statusCode).toBe(200);
      });
      test('すでに存在されてるキャラがあると409を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOneBy: () => {
              return addCharacter200;
            }
          };
        });
        const response = await request(server)
          .post(`${apiPath}/characters`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY })
          .send({
            name: 'perry',
            is_completed: true,
            description: 'hello'
          });
        expect(response.body).toMatchObject(addCharacters409Response);
        expect(response.statusCode).toBe(409);
      });
      test('bodyのnameがないと400を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOneBy: () => {
              return undefined;
            }
          };
        });
        const response = await request(server)
          .post(`${apiPath}/characters`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY })
          .send({
            is_completed: true,
            description: 'hello'
          });
        expect(response.body).toMatchObject(addCharacterName400Response);
        expect(response.statusCode).toBe(400);
      });
      test('bodyのis_completeがないと400を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOneBy: () => {
              return undefined;
            }
          };
        });
        const response = await request(server)
          .post(`${apiPath}/characters`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY })
          .send({
            name: 'jin',
            description: 'hello'
          });
        expect(response.body).toMatchObject(addCharacterComplete400Response);
        expect(response.statusCode).toBe(400);
      });
      test('bodyのdescriptionがないと400を返す', async () => {
        jest.spyOn(AppDataSource, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOneBy: () => {
              return undefined;
            }
          };
        });
        const response = await request(server)
          .post(`${apiPath}/characters`)
          .set({ 'x-api-key': process.env.SECRET_API_KEY })
          .send({
            name: 'jin',
            is_completed: true
          });
        expect(response.body).toMatchObject(addCharacterDescription400Response);
        expect(response.statusCode).toBe(400);
      });
    });
    describe('通常エラー', () => {
      test('x-api-keyは違ったら401を返す', async () => {
        const response = await request(server).get(`${apiPath}/characters`).set({ 'x-api-key': 'wrong-key' });
        expect(response.statusCode).toBe(401);
      });
    });
    // TODO: キャラ削除APIテストを書く
    // TODO: キャラ更新APIテストを書く
  });
});
