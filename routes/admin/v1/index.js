const auth = require('../../../middleware/auth')
const cache = require('../../../middleware/cache')
const adminUserController = require('../../../controllers/admin/v1/adminUserController')
const adminJobController = require('../../../controllers/admin/v1/adminJobController')
module.exports = function (app) {
    app
        // USER
        .get('/user', auth.validateToken, auth.validateUserAsAdmin, adminUserController.getUser)

        // JOB
        // jobId here mean _id document mongo
        .get('/job/:jobId', auth.validateToken, auth.validateUserAsAdmin, cache.getJobCache, adminJobController.getJob)
        .post('/job', auth.validateToken, auth.validateUserAsAdmin, adminJobController.addJob)
        .put('/job/:jobId', auth.validateToken, auth.validateUserAsAdmin, adminJobController.updateJob)
        .delete('/job/:jobId', auth.validateToken, auth.validateUserAsAdmin, adminJobController.deleteJob)

};
