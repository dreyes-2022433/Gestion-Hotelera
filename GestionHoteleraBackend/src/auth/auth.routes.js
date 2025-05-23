import { Router } from 'express'
import { login, register, test } from './auth.controller.js'
import {validRegisterUser} from '../../helpers/validators.js'

const api = Router()

api.post('/register',[validRegisterUser] , register)
api.post('/login', login)
api.get('/test', test)

export default api
