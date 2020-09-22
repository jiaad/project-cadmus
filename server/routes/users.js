import express from'express'
import httpCode from 'http-status-codes'
import {index, create, show, update, deleteUser} from '../controllers/usersController'
import authenticateJWT from '../middleware/Authenticate'
var router = express.Router();
/* GET users listing. */
router.get('/',authenticateJWT, index);
router.post('/create', create)
router.put('/:id/update',update)
router.get('/:id', show)
router.delete('/:id/delete', deleteUser)

module.exports = router;
