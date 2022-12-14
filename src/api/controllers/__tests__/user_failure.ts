import request from 'supertest';
import { Express } from 'express-serve-static-core';

import UserService from '../../services/user';
import { createServer } from '../../../utils/server';
import { faker } from '@faker-js/faker';

jest.mock('../../services/user');

let server: Express
beforeAll(async () => {
    server = await createServer()
});

describe('auth failure', () => {
    it('should return 500 & valid response if auth rejects with an error', done => {
        (UserService.auth as jest.Mock).mockRejectedValue(new Error())
        request(server)
            .get('/api/v1/goodbye')
            .set('Authorization', 'Bearer fakeToken')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ error: {
                    type: 'internal_server_error',
                    message: 'Internal Server Error'
                }})
                done()
            })
    })
})

describe('createUser failure', () => {
    it('should return 500 "valid response if auth rejects with an error', done => {
        (UserService.createUser as jest.Mock).mockResolvedValue({ error: { type: 'unknown'}})
        request(server)
            .post('/api/v1/user')
            .send({
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.name.firstName()
            })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({
                    error: {
                        type: 'internal_server_error',
                        message: 'Internal Server Error'
                    }
                })
                done()
            })
    })
})