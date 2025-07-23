import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const newUser = new User({ name, email, password })
    await newUser.save()

    res.status(201).json({ message: 'Usuario registrado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const isMatch = await user.comparePassword?.(password) ?? false
    const bcrypt = await import('bcryptjs')
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.status(200).json({ message: 'Login exitoso', token })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}
