const redis = require('./../utils/redisUtil')

module.exports = {
    getJobCache: async (req, res, next) => {
        try {
            const { params } = req
            let id = params.jobId
            let raw = await redis.getValue(id)
            let job = JSON.parse(raw)
            console.log("RESPONSE FROM CACHE")
            return OUT.responseSuccess(res, { job })
        } catch (error) {
            console.log(error)
            next()
        }
        
     }
}