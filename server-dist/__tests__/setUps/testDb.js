"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.includes");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

function removeAllCollections() {
  return _removeAllCollections.apply(this, arguments);
}

function _removeAllCollections() {
  _removeAllCollections = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var collections, _i, _collections, collectionName, collection;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            collections = Object.keys(mongoose.connection.collections);
            _i = 0, _collections = collections;

          case 2:
            if (!(_i < _collections.length)) {
              _context4.next = 10;
              break;
            }

            collectionName = _collections[_i];
            collection = mongoose.connection.collections[collectionName];
            _context4.next = 7;
            return collection.deleteMany();

          case 7:
            _i++;
            _context4.next = 2;
            break;

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _removeAllCollections.apply(this, arguments);
}

function dropAllCollections() {
  return _dropAllCollections.apply(this, arguments);
}

function _dropAllCollections() {
  _dropAllCollections = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var collections, _i2, _collections2, collectionName, collection;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            collections = Object.keys(mongoose.connection.collections);
            _i2 = 0, _collections2 = collections;

          case 2:
            if (!(_i2 < _collections2.length)) {
              _context5.next = 20;
              break;
            }

            collectionName = _collections2[_i2];
            collection = mongoose.connection.collections[collectionName];
            _context5.prev = 5;
            _context5.next = 8;
            return collection.drop();

          case 8:
            _context5.next = 17;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](5);

            if (!(_context5.t0.message === 'ns not found')) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return");

          case 14:
            if (!_context5.t0.message.includes('a background operation is currently running')) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return");

          case 16:
            console.log(_context5.t0.message);

          case 17:
            _i2++;
            _context5.next = 2;
            break;

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 10]]);
  }));
  return _dropAllCollections.apply(this, arguments);
}

module.exports = {
  setUpDB: function setUpDB(databaseName) {
    beforeAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = "mongodb://127.0.0.1/".concat(databaseName);
              _context.next = 3;
              return mongoose.connect(url, {
                useNewUrlParser: true
              });

            case 3:
              console.log("MONGODB CONNECTED SUCCESSFULLY: ".concat(databaseName)); // await dbSetup(url)

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))); // Cleans up database between each test

    afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return removeAllCollections();

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))); // Disconnect Mongoose

    afterAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return dropAllCollections();

            case 2:
              _context3.next = 4;
              return mongoose.connection.close();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  }
};