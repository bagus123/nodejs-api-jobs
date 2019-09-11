const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient(CONFIG.redis.port, CONFIG.redis.host)

module.exports = {
    getValue: async (key) => {
        let response = await client.getAsync(key)
        return response

    },
    setValue: async (key, value) => {
        let response = await client.setAsync(key, value)
        return response
    },
    deleteKey: async (key, value) => {
        let response = await client.delAsync(key)
        return response
    }
}