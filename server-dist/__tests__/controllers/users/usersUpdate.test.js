"use strict";

require("core-js/modules/es.array.sort");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var supertest = require('supertest');

var app = require('../../../app');

var request = supertest(app);

var _require = require('../../setUps/testDb'),
    setUpDB = _require.setUpDB;

var User = require('../../../models/User');

var users = require('../../setUps/usersSeed'); // initilize DB


setUpDB('mern-jobs-update');
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
          return User.deleteMany({});

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
describe('User Update should pass', function () {
  it('should update the user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var user, res, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.findOne().sort({
              field: 'asc',
              _id: -1
            });

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return request.put("/api/v1/users/".concat(user._id, "/update")).send({
              name: {
                first: "terminator",
                last: "arnold"
              },
              email: user.email,
              password: user.password,
              position: user.position,
              isActive: user.isActive
            }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

          case 5:
            res = _context3.sent;
            data = res.body.data;
            expect(data.name.first).toEqual("terminator");
            expect(res.statusCode).toEqual(200);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});