const authService = require('../services/authService')
module.exports = {
    register: async (req, res) => {
        try {
            const { body } = req;
            const newUser = {
                name: body.name,
                email: body.email,
                password: body.password
            }
            let data = await authService.register(newUser)
            return OUT.responseSuccess(res, data)
        } catch (err) {
            OUT.responseError(res, err)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            let data = await authService.login(email, password)
            return OUT.responseSuccess(res, data)
        } catch (err) {
            OUT.responseError(res, err)
        }
    },
    logout: async (req, res) => {
        try {
            let { user } = req;
            await authService.logout(user)
            return OUT.responseSuccess(res, {})
        } catch (err) {
            OUT.responseError(res, err)
        }
    }
};
