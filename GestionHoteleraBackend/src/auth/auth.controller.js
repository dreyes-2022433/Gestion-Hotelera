import User from '../user/user.model.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { name, surname, username, email, password, phone, role } = req.body

    const hashedPassword = await argon2.hash(password)

    const user = new User({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      phone,
      role: role?.toUpperCase() || 'CLIENT',
      profilePicture: req.file?.path || ''
    })

    await user.save()

    res.status(201).json({ message: 'User registered successfully', user })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message })
  }
}

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'Invalid email or password' })

    const passwordMatch = await argon2.verify(user.password, password)
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid email or password' })

    const token = jwt.sign({ uid: user._id }, process.env.SECRET_KEY, { expiresIn: '4h' })

    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message })
  }
}

// Ruta protegida (para cuando actives JWT)
export const test = (req, res) => {
  res.json({ message: 'Token válido', uid: req.user?.uid || 'token no verificado aún' })
}
