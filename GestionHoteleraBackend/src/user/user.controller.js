import User from './user.model.js'

// Obtener perfil por ID (por ahora simula que estás autenticado)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Actualizar perfil por ID
export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true })
    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Eliminar cuenta por ID
export const deleteUserAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Account deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Actualizar usuario por ID
export const updateUserById = async (req, res) => {
  try {
    const updates = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true })
    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Eliminar usuario por ID
export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Cambiar rol
export const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body
    if (!['ADMIN', 'CLIENT'].includes(role.toUpperCase())) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: role.toUpperCase() },
      { new: true }
    )

    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
