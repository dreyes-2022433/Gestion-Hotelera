import User from './user.model.js'
import argon2 from 'argon2'

export const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'ADMIN' })
    if (!adminExists) {
      const hashedPassword = await argon2.hash('Password123!')
      const admin = new User({
        name: 'Admin',
        surname: 'Admin',
        username: 'isAdmin',
        email: 'isadmingmail.com',
        password: hashedPassword,
        phone: '12345678',
        role: 'ADMIN'
      })
      await admin.save()
      console.log('Admin created')
    }
  } catch (err) {
    console.error('Error creating default admin:', err)
  }
}
