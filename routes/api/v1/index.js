const auth = require('../../../middleware/auth')
const apiUserController = require('../../../controllers/api/v1/apiUserController')
const apiJobController = require('../../../controllers/api/v1/apiJobController')
module.exports = function (app) {
    app
        // USER
        .get('/user', auth.validateToken, apiUserController.getUser)

        // JOB
        // search, open for public no security checking
        .get('/job/search',apiJobController.search)

};
