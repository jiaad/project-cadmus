"use strict";

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('http-errors'),
    ExpectationFailed = _require.ExpectationFailed;

var supertest = require('supertest');

var app = require('../../../app');

var request = supertest(app);

var User = require('../../../models/User');

var _require2 = require('../../setUps/testDb'),
    setUpDB = _require2.setUpDB;

setUpDB('mern-user-test-password');
var params = {
  name: {
    first: "john",
    last: "cena"
  },
  email: "john@cena.com",
  password: "johncena",
  position: "dev web",
  isActive: true
};
afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return User.deleteMany({});

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe('User password Hash', function () {
  it('should hash password', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var newUser, createdUser, actualPassword;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            expect.assertions(1);
            newUser = new User(params);
            createdUser = newUser.save();
            actualPassword = params.password;
            expect(actualPassword).not.toEqual(createdUser.password);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});