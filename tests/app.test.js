const request = require('supertest')
const app = require('../src/app')

if (process.env.NODE_ENV == 'test') {
  require('dotenv').config()
}

let handler

describe('Testing an App', () => {
  beforeAll(async done => {
    try {
      handler = await app()
      done()
    } catch (e) {
      done(e)
    }
  })

  describe('Unit testing for every endpoint', () => {
    describe('`/classes` endpoint', () => {
      it('GET /classes will return an array with length 13', done => {
        request(handler.callback())
          .get('/classes')
          .end(function(err, res) {
            if (err) {
              return done(err)
            }

            expect(Array.isArray(res.body)).toBe(true)
            expect(res.body.length).toBe(13)

            done()
          })
      })
    })

    describe('`/heroes` endpoint', () => {
      it('GET /heroes will return an array with length 72', done => {
        request(handler.callback())
          .get('/heroes')
          .end(function(err, res) {
            if (err) {
              return done(err)
            }

            expect(Array.isArray(res.body)).toBe(true)
            expect(res.body.length).toBe(72)

            done()
          })
      })
    })

    describe('`/races` endpoint', () => {
      it('GET /races will return an array with length 15', done => {
        request(handler.callback())
          .get('/races')
          .end(function(err, res) {
            if (err) {
              return done(err)
            }

            expect(Array.isArray(res.body)).toBe(true)
            expect(res.body.length).toBe(15)

            done()
          })
      })
    })
  })
})
