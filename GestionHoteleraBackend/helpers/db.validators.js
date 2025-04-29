import User from '../src/user/user.model.js'
import { isValidObjectId } from 'mongoose'

export const objectIdValid = async(objectId) => {
    if(!isValidObjectId(objectId)){
        throw new Error('Is not a valid ObjectId')
    }
}

// Verificar si el username ya existe
export const existUsername = async (username = '') => {
    const userFound = await User.findOne({ username })
    if (userFound) {
        throw new Error(`The username '${username}' is already taken`)
    }
}

// Verificar si el email ya existe
export const existEmail = async (email = '') => {
    const userFound = await User.findOne({ email })
    if (userFound) {
        throw new Error(`The email '${email}' is already registered`)
    }
}

// Verificar si el phone ya existe
export const existPhone = async (phone = '') => {
    const userFound = await User.findOne({ phone })
    if (userFound) {
        throw new Error(`The phone number '${phone}' is already registered`)
    }
}

// Verificar si el ID es un ObjectId válido
export const isValidMongoId = async (id = '') => {
    if (!isValidObjectId(id)) {
        throw new Error('Invalid MongoDB ObjectId')
    }
}
