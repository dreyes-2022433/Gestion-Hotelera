import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:3626',
  timeout: 2000,
})



export const registerRequest = async (user) => {
    try{
        return await api.post('/api/auth/register', user,{
            type: 'multipart/form-data',
        })
    }catch (error) {
        return {
            error: true,
            error
        }
    }
}

export const loginRequest = async (user) => {
    try{
        return await api.post('/api/auth/login', user,{
            type: 'multipart/form-data',
            
        })
    }catch (error) {
        return {
            error: true,
            error
        }
    }
}

export const createHotel = async (hotelData) => {
  try {
    return await api.post('/v1/hotel/register', hotelData)
  } catch (error) {
    return { error: true, error }
  }
}

export const deleteHotel = async (hotelId) => {
  try {
    return await api.delete(`/v1/hotel/${hotelId}`)
  } catch (error) {
    return { error: true, error }
  }
}