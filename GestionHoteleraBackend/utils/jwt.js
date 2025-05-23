'use strict'

import jwt from 'jsonwebtoken'

export const generateJwt = async(userId) => {
  try {
    return jwt.sign(
      { uid: userId }, 
      process.env.SECRET_KEY,
      {
        expiresIn: '3h',
        algorithm: 'HS256'
      }
    )
  } catch (err) {
    console.error(err)
    return err
  }
}
