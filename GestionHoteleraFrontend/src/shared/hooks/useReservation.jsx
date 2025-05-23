import { useState, useEffect } from 'react'
import { registerReservation, getMyReservations, deleteReservation } from '../../services/api'

export const useReservation = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')
  const uid = localStorage.getItem('uid')

  const fetchMyReservations = async () => {
    if (!token || !uid) {
      setError('No token or user ID found')
      setReservations([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await getMyReservations(token)
      console.log('Respuesta del backend:', response)
      if (!response.error) {
        setReservations(response.data?.reservations || [])
      } else {
        setError(response.error)
        setReservations([])
      }
    } catch (err) {
      setError(err.message || 'Error fetching reservations')
      setReservations([])
    } finally {
      setLoading(false)
    }
  }

  // Crear una reserva
  const createReservation = async (reservationData) => {
    if (!token || !uid) {
      setError('No token or user ID found')
      return null
    }

    setLoading(true)
    setError(null)

    const dataWithUser = { ...reservationData, user: uid }
    console.log('Datos enviados para crear reserva:', dataWithUser)

    try {
      const response = await registerReservation(dataWithUser)
      if (!response.error) {
        await fetchMyReservations() 
        return response.data
      } else {
        setError(response.error)
        return null
      }
    } catch (err) {
      setError(err.message || 'Error creating reservation')
      return null
    } finally {
      setLoading(false)
    }
  }

  const removeReservation = async (reservationId) => {
    if (!token) {
      setError('No token found')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await deleteReservation(reservationId)
      if (!response.error) {
        setReservations((prev) => prev.filter(r => r._id !== reservationId))
        return response.data
      } else {
        setError(response.error)
        return null
      }
    } catch (err) {
      setError(err.message || 'Error deleting reservation')
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyReservations()
  }, []) 

  return {
    reservations,
    loading,
    error,
    fetchMyReservations,
    createReservation,
    removeReservation,
  }
}
