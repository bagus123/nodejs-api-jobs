const authController = require("../../controllers/authController")
const auth = require("../../middleware/auth")
module.exports = function (app) {
    app
        // AUTH
        .post("/login", authController.login)
        .post("/register", authController.register)
        .post("/logout", auth.validateToken, authController.register)
};
