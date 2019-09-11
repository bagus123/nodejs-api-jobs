module.exports = {
    getUser: async (req, res) => {
        try {
            const { user } = req
            return OUT.responseSuccess(res, { user })
        } catch (err) {
            OUT.responseError(res, err)
        }
    }
}