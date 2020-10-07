/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
import redis, { client, GET_ASYNC, SET_ASYNC } from '../config/redis'
import asyncHandler from './asyncHandler'

exports.redisGetData = function (redisId = null) {
  return asyncHandler(async (req, res, next) => {
    let returnRedis
    if (redisId === null) returnRedis = req.params.id
    else returnRedis = redisId
    const getRedisData = await GET_ASYNC(returnRedis)
    if (getRedisData) {
      console.log('using Cached Data')
      res.status(200).json({ success: true, data: JSON.parse(getRedisData) })
      return
    }
    next()
  })
}
