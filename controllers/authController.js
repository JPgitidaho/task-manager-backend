import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function login(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Correo o contraseña incorrectos' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Correo o contraseña incorrectos' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token })
  } catch (err) {
    console.error(err) 
    res.status(500).json({ msg: 'Error del servidor' })
  }
}
