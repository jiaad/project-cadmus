"use strict";

var _express = _interopRequireDefault(require("express"));

var _home = _interopRequireDefault(require("./home"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use('/api/v1', _home.default);
router.use('/api/v1/users', _users.default);
module.exports = router;