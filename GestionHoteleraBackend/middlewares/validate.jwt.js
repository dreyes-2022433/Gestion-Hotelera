import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../src/user/user.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY

        if (!secretKey) {
            return res.status(500).send({
                success: false,
                message: 'Internal server error: SECRET_KEY missing'
            })
        }

        const token = req.headers['authorization'] || req.headers['x-access-token']

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized: Token missing'
            })
        }

        let decoded
        try {
            decoded = jwt.verify(token, secretKey)
        } catch (err) {
            return res.status(401).send({
                success: false,
                message: 'Invalid or expired token'
            })
        }

        const userId = decoded.uid || decoded._id

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).send({
                success: false,
                message: 'Invalid token: User ID is not valid'
            })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized: User does not exist'
            })
        }

        req.user = user
        next()
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'ADMIN') {
            return res.status(403).send({
                success: false,
                message: 'Access denied: Admins only'
            })
        }
        next()
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Unauthorized role'
        })
    }
}
