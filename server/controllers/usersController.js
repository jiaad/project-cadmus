import asyncHandler from "../middleware/asyncHandler";
import httpStatusCode from 'http-status-codes'
import User from '../models/User'
import ErrorResponse from '../utils/errorResponse'


module.exports = {
  index: asyncHandler(async (req, res, next) => {
    let users = await User.find()
    res.status(httpStatusCode.OK).json({title: 'users',data: users});
  }),

  create: asyncHandler(async (req, res, next) => {

      let params = req.body
      let user = await User.create(params)
      res.status(201).json({
        success: true, data: user
      })
  }),
  show: asyncHandler(async (req, res, next) => {
    let id = req.params.id
    let user = await User.findById(id)
    console.log('show controller: : ', user)
    if(!user){
      return next(new ErrorResponse('User not found with this id', httpStatusCode.NOT_FOUND))
    }
    res.status(httpStatusCode.OK).json({success: true, data: user})
  }),

  update: asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(200).json({success: true, data: user, msg: 'Updated successfully'})
  }),

  deleteUser: asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(httpStatusCode.OK).json({success: true, msg: "successfully deleted user", data: {}});
  }),
  
}