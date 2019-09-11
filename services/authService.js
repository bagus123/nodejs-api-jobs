const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    register: async (newUser) => {
        try {
            let user = await MODELS.User.create(newUser)
            const token = jwt.sign({ _id: user._id }, CONFIG.jwt.secret, { expiresIn: CONFIG.jwt.expirationInSeconds })
            return { user: user.toJSON(), token };
        } catch (err) {
            throw new Error(err.message)
        }
    },
    login: async (email, password) => {
        try {
            let user = await MODELS.User.findOne({
                email
            })

            if (!user) {
                throw new Error({ error: 'Invalid login credentials' })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                throw new Error({ error: 'Invalid login credentials' })
            }

            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }

            const token = jwt.sign({ _id: user._id }, CONFIG.jwt.secret)
            user.tokens.push(token)
            user = await user.save(user)

            return { user: user.toJSON(), token };
        } catch (err) {
            throw new Error(err.message)
        }
    },
    logout: async (user) => {
        try {
            let tokens = user.tokens;
            //remove current token
            tokens = tokens.filter((token) => {
                return token != req.token
            })
            user.tokens = tokens;
            user = await user.save(user)
            return true;
        } catch (err) {
            throw new Error(err.message)
        }
    },
    validateToken:async (token)=>{
        const data = jwt.verify(token, CONFIG.jwt.secret)
        try {

            let user = await MODELS.User.findOne({
                _id: data._id,
                tokens: token
            })

            if (!user) {
                throw new Error('user not found')
            }
            return user;
        } catch (err) {
            throw new Error(err.message)
        }
    }
};
