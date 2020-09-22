"use strict";

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

setUpDB('mern-jobs-test');
describe('home page', function () {
  it('should pass home index', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request.get('/api/v1/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

          case 2:
            res = _context.sent;
            expect(res.body.title).toEqual('index');
            expect(res.body.data).not.toBeNull();
            expect(res.body.data).toBeDefined();
            expect(res.body.data).not.toBeUndefined();
            expect(res.body.data).not.toBeFalsy();
            expect(res.body.data).toBeTruthy();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});