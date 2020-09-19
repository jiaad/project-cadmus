import express from'express'
import httpCode from 'http-status-codes'
import {index, create, show} from '../controllers/usersController'

var router = express.Router();
/* GET users listing. */
router.get('/', index);
router.post('/create', create)
router.get('/:id', show)

module.exports = router;
