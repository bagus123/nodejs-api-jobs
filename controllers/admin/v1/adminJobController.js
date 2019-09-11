const jobService = require('./../../../services/jobService')
module.exports = {
    getJob: async (req, res) => {
        try {
            const {params } = req
            let id = params.jobId
            let job = await jobService.getJob(id)
            return OUT.responseSuccess(res, { job })
        } catch (err) {
            OUT.responseError(res, err)
        }
    },
    addJob: async (req, res) => {
        try {
            const { body } = req
            let job = await jobService.addJob(body)
            return OUT.responseSuccess(res, { job })
        } catch (err) {
            OUT.responseError(res, err)
        }
    },
    updateJob: async (req, res) => {
        try {
            const { body, params } = req
            let id = params.jobId
            let job = await jobService.updateJob(id, body)
            return OUT.responseSuccess(res, { job })
        } catch (err) {
            OUT.responseError(res, err)
        }
    },
    deleteJob: async (req, res) => {
        try {
            const {params } = req
            let id = params.jobId
            let status = await jobService.deleteJob(id)
            return OUT.responseSuccess(res, status)
        } catch (err) {
            OUT.responseError(res, err)
        }
    }
}