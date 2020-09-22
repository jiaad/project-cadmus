"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var asyncHandler = function asyncHandler(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;