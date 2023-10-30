import User from '../models/user.js'

export const signupUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.signup(email, password)
    console.log(user)
  } catch (error) {
    console.log(error.message)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    console.log(user.email, 'logged in')
    res.json({ accessToken: 'access_token', refreshToken: 'refresh_token' })
  } catch (error) {
    console.log(error.message)
  }
}
