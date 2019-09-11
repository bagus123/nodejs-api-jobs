module.exports = {
    run: async () => {
        let user = await MODELS.User.findOne({ email: 'jobdb.sa@gmail.com' })
        if (!user) {
            await MODELS.User.create({
                name: 'superAdmin',
                email: 'jobdb.sa@gmail.com',
                role: 'ADMIN',
                password: '123456'
            })

        }

    }
}