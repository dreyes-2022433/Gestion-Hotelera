//Modelo de Usuarios

import mongoose, { Schema, model } from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: [25, `Can't be overcome 25 characters`],
            minLength: [3, `Can't be less than 3 characters`],
            required: [true, 'Name is required']
        },
        surname: {
            type: String, 
            maxLength: [25, `Can't be overcome 25 characters`],
            minLength: [3, `Can't be less than 3 characters`],
            required: [true, 'Surname is required']
        },
        username: {
            type: String,
            maxLength: [25, `Can't be overcome 25 characters`],
            minLength: [3, `Can't be less than 3 characters`],
            required: [true, 'Username is required'],
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            minLength: [8, 'Password must be at least 8 characters'],
            maxLength: [100, 'Password can\'t exceed 100 characters'],
            required: [true, 'Password is required'],
            match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Password is not strong enough']
          } ,
        profilePicture: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            unique: true,
            required: [true, 'Phone is required'],
            minLength: [3, `Can't be less than 3 characters`],
            maxLength: [15, `Can't be overcome 15 characters`],
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN', 'CLIENT']
        }
    }
)

//Modificar el toJSON para excluir datos en la respuesta
userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}
  

//Crear y exportar el modelo
export default model('User',  userSchema)