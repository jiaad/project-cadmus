/* eslint-disable no-useless-return */
import { GET_ASYNC } from '../config/redis'
import asyncHandler from '../middleware/asyncHandler'

exports.redisGetDataService = asyncHandler(async (redisId, res) => {
  const data = await GET_ASYNC(redisId)
  if (data) {
    console.log('USING REDIS CACHED DATA')
    return res.status(200).json({ success: true, data: JSON.parse(data) })
  }
})
