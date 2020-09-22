"use strict";

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _usersController = require("../controllers/usersController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();
/* GET users listing. */


router.get('/', _usersController.index);
router.post('/create', _usersController.create);
router.put('/:id/update', _usersController.update);
router.get('/:id', _usersController.show);
router.delete('/:id/delete', _usersController.deleteUser);
module.exports = router;