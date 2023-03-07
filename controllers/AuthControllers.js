const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const Register = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      username,
      passwordDigest,
      firstName,
      lastName
    })
    res.send(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals
    res.send(payload)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  Login,
  Register,
  CheckSession
}
