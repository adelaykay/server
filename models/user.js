import { Schema, model } from 'mongoose'
import validator from 'validator'
import { hash, compare } from 'bcrypt'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
)

userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled in')
  }
  if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email')
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Please enter a stronger password')
  // }
  const exists = await User.findOne({ email: email })
  if (!exists) {
    const salt = 10
    const hashPass = await hash(password, salt)

    const user = await this.create({ email, password: hashPass })
    return user
  } else {
    return { mssg: 'User already exists' }
  }
}

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })

  if (!user) return { mssg: 'User does not exist' }
  const match = await compare(password, user.password)
  if (!match) return { mssg: 'Incorrect password' }
  return user
}

const User = model('User', userSchema)

export default User
