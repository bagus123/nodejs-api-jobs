
const userSeed = require('./UserSeed')
module.exports = {
    runAll: async () => {

        // run user seed
        await userSeed.run()

        // put other seed here
        // ......
    }
};
