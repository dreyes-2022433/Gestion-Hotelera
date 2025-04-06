import { Router } from 'express'
import { login, register, test } from './auth.controller.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.get('/test', test)

export default api
