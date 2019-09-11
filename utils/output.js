module.exports = {
    responseSuccess(res, data) {
        return res.json(
            {
                status: 'Success',
                statusCode: 200,
                data
            })
    },
    responseError(res, error) {
        let statusCode = 400;
        return res.status(statusCode).send({
            status: 'Error',
            statusCode,
            message: error.toString()
        })
    }
};
