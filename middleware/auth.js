const authService = require('../services/authService')
const out = require('../utils/output')

module.exports = {
    validateToken : async (req, res, next) => {
        try {
            const { headers } = req;
            const token = headers.token;
            let user = await authService.validateToken(token)
            if (user){
                req.user = user
                req.token = token
                next()
            }
        } catch (err) {
            out.responseError(res, err)
        }

    },
    validateUserAsAdmin: async (req, res, next) => {
        try {
            const { user } = req;
            if (user.role === 'ADMIN') {
                next()
            }
        } catch (err) {
            out.responseError(res, err)
        }

    }

}