const elastic = require('./elasticUtil')
const redis = require('./redisUtil')
const { ELASTIC_INDEX } = require('./constant')
async function doTaskElasticForDataJob() {

    let valid = await elastic.indexExists(ELASTIC_INDEX)
    if (!valid) {
        await elastic.initIndex(ELASTIC_INDEX)

        let payload = {
            properties: {
                jobId: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                name: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                salary: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                age: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                education: {
                    type: 'string',
                    index: 'not_analyzed'
                },


                slug: {
                    type: 'string',
                    index: 'not_analyzed'
                },
                url: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                companyName: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                source: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                urlCompanyLogo: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                location: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                jobFunction: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                jobIndustry: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                jobLevel: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                jobType: {
                    type: 'string',
                    index: 'not_analyzed'
                },

                jobDescription: {
                    type: 'text',
                    index: 'not_analyzed'
                },
                publishDate: {
                    type: 'string',
                    index: 'not_analyzed'
                },
                updatedAt: {
                    type: 'date',
                    index: 'not_analyzed'
                },
                createdAt: {
                    type: 'date',
                    index: 'not_analyzed'
                }
            }


        }
        await elastic.initMapping(ELASTIC_INDEX, 'job', payload)
    }

    // find newer 100 last update
    let jobs = await MODELS.Job.find({})
        .sort({ updateAt: 'desc' })
        .limit(100)

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        let payload = JSON.parse(JSON.stringify(job))
        payload.id = payload._id;
        delete payload._id;
        await elastic.addOrUpdateDocument(ELASTIC_INDEX, payload.id, 'job', payload)
        console.log('[DONE] insert or update document job id', payload.id)
    }

    console.log('[DONE] Task Elastic for data job')


}
async function doTaskElastic() {
    let response = await elastic.getStatus()

    if (response && response.status === 'green') {
        console.log('Elastic is Online')
        // run task elastic for data job
        doTaskElasticForDataJob()

        // put here another data
        // .....
    }
}


async function doTaskRedis() {
    // find newer 100 last update
    let jobs = await MODELS.Job.find({})
        .sort({ updateAt: 'desc' })
        .limit(100)

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        let payload = JSON.parse(JSON.stringify(job))
        await redis.setValue(payload._id, JSON.stringify(job))
        console.log('[DONE] set map redis job key', payload._id)
    }
    console.log('[DONE] Task Redis for data job')
}


module.exports = {
    runElasticTask: () => {
        // run worker for elastic
        doTaskElastic()

    },
    runRedisTask: () => {
        // run worker for redis
        doTaskRedis()
    }
}