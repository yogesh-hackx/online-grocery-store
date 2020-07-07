const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
    it('responds with a json message', (done) => {
        request(app)
            .get('/api/v1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(
                200,
                {
                    message: 'API for grocery-store',
                },
                done,
            );
    });
});

describe('GET /api/v1/products', () => {
    it('responds with a json message', (done) => {
        request(app)
            .get('/api/v1/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// TODO: Add tests for product POST req.
