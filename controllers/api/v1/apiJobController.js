
const jobService = require('./../../../services/jobService')
module.exports = {
    search: async (req, res) => {
        try {
            const { query } = req
            let q = query.q //keyword all text / all field search
            let page = query.page // page number, if not set default is 1
            let jobs = await jobService.searchByElastic(q, page)
            return OUT.responseSuccess(res, { jobs })
        } catch (err) {
            OUT.responseError(res, err)
        }
    }
}