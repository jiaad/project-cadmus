"use strict";

var _express = _interopRequireDefault(require("express"));

var _homeController = require("../controllers/homeController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();
/* GET home page. */


router.get('/', _homeController.index);
module.exports = router;