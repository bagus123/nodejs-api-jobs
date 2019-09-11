const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {ENUM} = require('../../utils/constant')

// in mongo 5xx can populate nested, please check documentation
// another populate nested
let mongoose = require('mongoose')
let deepPopulate = require('mongoose-deep-populate')(mongoose)
let Schema = mongoose.Schema;

module.exports = function (conn) {

  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: 'Invalid Email address' })
        }
      }
    },
    role: {
      type: String,
      default: 'USER',
      enum: ENUM.ROLE
    },
    password: {
      type: String,
      required: true,
      minLength: 7
    },
    tokens: [
      {
        type: String
      }
    ]
  })

  userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
    }
    next()
  })


  // remove password and token when get
  userSchema.methods.toJSON = function () {
    let obj = this.toObject()
    delete obj.password;
    delete obj.tokens;
    return obj;
  }

  //assign plugin
  userSchema.plugin(deepPopulate)
  const User = conn.model('User', userSchema)
  return User;
}
