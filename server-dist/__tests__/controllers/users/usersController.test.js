"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var supertest = require('supertest');

var app = require('../../../app');

var request = supertest(app);

var User = require('../../../models/User');

var mongoose = require('mongoose');

var _require = require('../../../models/User'),
    deleteOne = _require.deleteOne;

var databaseName = 'mern-job-test';

var dbConnect = require('../../setUps/testDb');

var users = require('../../setUps/usersSeed'); // beforeAll(async function  () {
// const url =  `mongodb://127.0.0.1/${databaseName}`
// await mongoose.connect(url, { useNewUrlParser: true })
// console.log(`MONGODB CONNECTED SUCCESSFULLY: ${databaseName}`)
// await


dbConnect.setUpDB('mern-job-controller'); // })

beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return User.create(users);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return User.deleteMany();

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))); // afterEach(async () => {
// })
// describe('POST end points for user on /api/V1/users/cerate', async () => {

it('should Create a USER', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(done) {
    var res, email, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            User.deleteMany();
            _context3.next = 3;
            return request.post('/api/v1/users/create').send({
              "name": {
                "first": "jiad",
                "last": "tusher"
              },
              "email": "cellsaga@gmail.com",
              "position": "freelance",
              "isActive": true,
              "password": "azerty"
            }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201);

          case 3:
            res = _context3.sent;
            email = "cellsaga@gmail.com";
            _context3.next = 7;
            return User.findOne({
              email: email
            });

          case 7:
            user = _context3.sent;
            // assert(response.body.data, user)
            expect(res.body.data.email).toEqual(user.email);
            expect(res.body.success).toEqual(true);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('data');
            done();

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}()); // })

it('should return ressource not found', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var res, err;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return request.get('/api/v1/users/121FF465dfbdd56').set('Accept', 'application/json').expect('Content-Type', /json/).expect(404);

        case 2:
          res = _context4.sent;
          err = 'Ressource not found';
          expect(res.body.error).toEqual(err);
          expect(res.body.success).toEqual(false); // .expect('"Ressource not found"') // expecting content value
          // const user = User.findById({id: '121FF465dfbdd56'}) 

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
it('should show all the users in index page', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  var res;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res = request.get('/api/v1/users').set('Accept', 'application/json').expect('Content-Type', 'application/json').expect(200);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
it('should show ell users api/v1/users', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
  var res;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return request.get('/api/v1/users').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

        case 2:
          res = _context6.sent;
          console.log(users);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
it('should show 404 and user not found message', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
  var res, err;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return request.get('/api/v1/users/5f63d16ab2cc340bac605923').set('Accept', 'application/json').expect('Content-Type', /json/).expect(404);

        case 2:
          res = _context7.sent;
          expect(res.body.success).toEqual(false);
          err = "User not found with this id";
          expect(res.body.error).toEqual(err);

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
}))); // Cleans up database between each test
// test('should NOT CREATE A USER', async () => {
//   const res = supertest
//     .post('/api/v1/users/create')
//     .send({
//       "name": {
//         "first": "jiad",
//         "last": "tusher"
//     },
//     "email": "jiadabdul99@gmail.com",
//     "position": "freelance",
//     "isActive": true,
//     "password": "azerty"
//     })
// });