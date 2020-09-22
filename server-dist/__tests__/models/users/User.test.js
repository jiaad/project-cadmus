"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var supertest = require('supertest');

var app = require('../../../app');

var request = supertest(app);

var User = require('../../../models/User');

var _require = require('../../setUps/testDb'),
    setUpDB = _require.setUpDB;

setUpDB('mern-user-test');
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
it('should return true ', function () {
  expect(process.env.NODE_ENV).toEqual("test");
});
describe('It should Create Users', function () {
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
  it('should create a user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var newUser, savedUser, expected, actual;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newUser = new User(params);
            _context3.next = 3;
            return newUser.save();

          case 3:
            savedUser = _context3.sent;
            expected = "john";
            actual = savedUser.name.first;
            expect(actual).toEqual(expected);
            actual = 'john@cena.com';
            expect(savedUser.email).toEqual(actual);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
describe('Should not create Users', function () {
  it('sshould send error msg (name.first) and not create an User', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var newUser, unsavedUser, msg, err;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expect.assertions(3);
            params.name.first = '';
            _context4.prev = 2;
            newUser = new User(params);
            _context4.next = 6;
            return newUser.save();

          case 6:
            unsavedUser = _context4.sent;
            _context4.next = 17;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            console.log(_typeof(_context4.t0.message), err);
            expect(_context4.t0).toBeTruthy();
            /** to See if the error cintains Please enter your name  */

            msg = "Please enter your first name";
            err = String(_context4.t0).includes(msg);
            expect(err).toEqual(true);
            expect(_context4.t0.message).toMatch(new RegExp(msg));

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 9]]);
  })));
  it('should send error msg (name.last) and not create an User ', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var newUser, unsavedUser, msg, err;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            expect.assertions(3);
            params.name.first = 'john';
            params.name.last = '';
            _context5.prev = 3;
            newUser = new User(params);
            _context5.next = 7;
            return newUser.save();

          case 7:
            unsavedUser = _context5.sent;
            _context5.next = 17;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](3);
            expect(_context5.t0).toBeTruthy();
            /** to See if the error cintains Please enter your name  */

            msg = "Please enter your last name";
            err = String(_context5.t0).includes(msg);
            expect(err).toEqual(true);
            expect(_context5.t0.message).toMatch(new RegExp(msg));

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 10]]);
  })));
  it('should send an error msg (email) and not create an User ', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var newUser, unsavedUser, msg, err;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            expect.assertions(3);
            params.name.last = 'cena';
            params.email = '';
            _context6.prev = 3;
            newUser = new User(params);
            _context6.next = 7;
            return newUser.save();

          case 7:
            unsavedUser = _context6.sent;
            _context6.next = 17;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](3);
            expect(_context6.t0).toBeTruthy();
            /** to See if the error cintains Please enter your name  */

            msg = "Please enter your email";
            err = String(_context6.t0).includes(msg);
            expect(err).toEqual(true);
            expect(_context6.t0.message).toMatch(new RegExp(msg));

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 10]]);
  })));
  it('should send error msg (password) and not create an User ', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var newUser, unsavedUser, msg, err;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            expect.assertions(3);
            params.email = 'john@cena.com';
            params.password = '';
            _context7.prev = 3;
            newUser = new User(params);
            _context7.next = 7;
            return newUser.save();

          case 7:
            unsavedUser = _context7.sent;
            _context7.next = 17;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](3);
            expect(_context7.t0).toBeTruthy();
            /** to See if the error cintains Please enter your name  */

            msg = "Please enter your password";
            err = String(_context7.t0).includes(msg);
            expect(err).toEqual(true);
            expect(_context7.t0.message).toMatch(new RegExp(msg));

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 10]]);
  })));
  it('should send error msg (isActive) and not create an User ', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var param, newUser, unsavedUser, msg, err;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            expect.assertions(3);
            params.password = 'johncena';
            param = params.isActive = null; // console.error(params)

            _context8.prev = 3;
            newUser = new User(params);
            _context8.next = 7;
            return newUser.save();

          case 7:
            unsavedUser = _context8.sent;
            _context8.next = 18;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](3);
            expect(_context8.t0).toBeTruthy();
            /** to See if the error cintains Please enter your name  */

            msg = "Please enter your status";
            console.log(_context8.t0);
            err = String(_context8.t0).includes(msg);
            expect(err).toEqual(true);
            expect(_context8.t0.message).toMatch(new RegExp(msg));

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[3, 10]]);
  })));
  it('should send error msg (position) and not create an User ', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var newUser, unsavedUser, msg, err;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            expect.assertions(3);
            params.isActive = true;
            params.position = ''; // console.error(params)

            _context9.prev = 3;
            newUser = new User(params);
            _context9.next = 7;
            return newUser.save();

          case 7:
            unsavedUser = _context9.sent;
            _context9.next = 18;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](3);
            expect(_context9.t0).toBeTruthy();
            /** to See if the error cintains Please enter your name  */

            msg = "Please enter your position";
            console.log(_context9.t0);
            err = String(_context9.t0).includes(msg);
            expect(err).toEqual(true);
            expect(_context9.t0.message).toMatch(new RegExp(msg));

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[3, 10]]);
  })));
});