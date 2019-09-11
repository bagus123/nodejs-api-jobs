const elastic = require('./../utils/elasticUtil')
const redis = require('./../utils/redisUtil')
const { ELASTIC_INDEX } = require('./../utils/constant')
module.exports = {
    searchByElastic: async (q, page) => {
        try {

            if (page === undefined) {
                page = 0
            } else {
                if (typeof page === 'number') {
                    if (page == 1) {
                        page = 0
                    } else if (page > 1) {
                        page = ((page - 1) * 10) + 1;
                    }
                }
            }

            let query = {
                match_all: {}
            }
            if (q !== undefined) {
                if (typeof q === 'string') {
                    if (q.trim() !== '') {
                        query = {
                            query_string: {
                                query: q
                            }
                        }

                    }
                }
            }
            let payload = {
                _source: ['id', 'jobId', 'name', 'companyName', 'location'],
                from: page,
                size: 10,
                query
            }
            let response = await elastic.search(ELASTIC_INDEX, 'job', payload)
            let raws = response.hits.hits
            let jobs = []
            for (let i = 0; i < raws.length; i++) {
                const raw = raws[i];
                let job = raw._source;
                jobs.push(job)

            }
            console.log(jobs)

            return jobs
        } catch (err) {
            throw new Error(err.message)
        }
    },

    getJob: async (id) => {
        try {

            let job = await MODELS.Job.findOne({ _id: id })
            return job
        } catch (err) {
            throw new Error(err.message)
        }
    },
    deleteJob: async (id) => {
        try {
            let status = await MODELS.Job.remove({ _id: id })
            await elastic.deleteDocument(id)
            await redis.deleteKey(id)
            return { status }
        } catch (err) {
            throw new Error(err.message)
        }
    },

    addJob: async (newJob) => {
        try {
            let job = await MODELS.Job.create(newJob)
            await redis.setValue(id, job)
            return job
        } catch (err) {
            throw new Error(err.message)
        }
    },
    updateJob: async (id, newJob) => {
        try {

            let job = await MODELS.Job.findOne({ _id: id })
            if (!job) {
                throw new Error('job not found')
            }

            job.name = newJob.name !== undefined ? newJob.name : job.name
            job.slug = newJob.slug !== undefined ? newJob.slug : job.slug
            job.url = newJob.url !== undefined ? newJob.url : job.url
            job.companyName = newJob.companyName !== undefined ? newJob.companyName : job.companyName
            job.source = newJob.source !== undefined ? newJob.source : job.source
            job.salary = newJob.salary !== undefined ? newJob.salary : job.salary
            job.age = newJob.age !== undefined ? newJob.age : job.age
            job.education = newJob.education !== undefined ? newJob.education : job.education
            job.urlCompanyLogo = newJob.urlCompanyLogo !== undefined ? newJob.urlCompanyLogo : job.urlCompanyLogo
            job.location = newJob.location !== undefined ? newJob.location : job.location
            job.jobLevel = newJob.jobLevel !== undefined ? newJob.jobLevel : job.jobLevel
            job.jobType = newJob.jobType !== undefined ? newJob.jobType : job.jobType
            job.jobFunction = newJob.jobFunction !== undefined ? newJob.jobFunction : job.jobFunction
            job.jobIndustry = newJob.jobIndustry !== undefined ? newJob.jobIndustry : job.jobIndustry
            job.jobDescription = newJob.jobDescription !== undefined ? newJob.jobDescription : job.jobDescription
            job.publishDate = newJob.publishDate !== undefined ? newJob.publishDate : job.publishDate

            job = await job.save()
            let payload = JSON.parse(JSON.stringify(job))
            delete payload._id
            await elastic.addOrUpdateDocument(ELASTIC_INDEX, id, 'job', payload)
            await redis.setValue(id, job)
            return job
        } catch (err) {
            throw new Error(err.message)
        }
    }

}