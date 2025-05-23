import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3626',
  timeout: 2000
})

export const registerRequest = async (user) => {
  try {
    return await api.post('/api/auth/register', user, {
      type: 'multipart/form-data'
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const loginRequest = async (user) => {
  try {
    return await api.post('/api/auth/login', user, {
      type: 'multipart/form-data'
    })
  } catch (error) {
    return { error: true, error }
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

export const registerReservation = async (reservationData) => {
  const token = localStorage.getItem('token')
  const uid = localStorage.getItem('uid')
  console.log('Creando reserva con UID:', uid)

  try {
    return await api.post('/v1/reservations/register', reservationData, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const getMyReservations = async (token) => {
  const uid = localStorage.getItem('uid')
  try {
    const response = await api.get(`/v1/reservations/my/${uid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response
  } catch (error) {
    return { error: true, error }
  }
}



export const deleteReservation = async (reservationId) => {
  const token = localStorage.getItem('token')
  try {
    return await api.delete(`/v1/reservations/delete/${reservationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (error) {
    return { error: true, error }
  }
}
