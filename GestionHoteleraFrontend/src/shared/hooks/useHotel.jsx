import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { createHotel, deleteHotel } from '../../services/api'

export function useHotel() {
  const [hotels, setHotels] = useState([])
  const [form, setForm] = useState({
    name: '',
    direction: '',
    category: '',
    phone: '',
    email: '',
    description: '',
    amenities: ''
  })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const fetchHotels = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:3626/v1/hotel/getHotels')
      if (res.status === 200 && res.data.hotels) {
        setHotels(res.data.hotels)
      } else {
        toast({
          title: 'Error al cargar hoteles',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    } catch (error) {
      toast({
        title: 'Error de conexión',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  const addHotel = async () => {
    if (
      !form.name ||
      !form.direction ||
      !form.category ||
      !form.phone ||
      !form.email ||
      !form.description ||
      !form.amenities
    ) {
      toast({
        title: 'Completa todos los campos obligatorios',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      toast({
        title: 'No autorizado',
        description: 'Inicia sesión como admin',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }

    setLoading(true)
    const res = await createHotel(form)
    if (res.error) {
      toast({
        title: 'Error al agregar hotel',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      setHotels(prev => [...prev, res.data.hotel])
      toast({
        title: 'Hotel agregado',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setForm({
        name: '',
        direction: '',
        category: '',
        phone: '',
        email: '',
        description: '',
        amenities: ''
      })
    }
    setLoading(false)
  }

  const removeHotel = async id => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast({
        title: 'No autorizado',
        description: 'Inicia sesión como admin',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }

    setLoading(true)
    const res = await deleteHotel(id)
    if (res.error) {
      toast({
        title: 'Error al eliminar hotel',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      setHotels(prev => prev.filter(hotel => hotel._id !== id))
      toast({
        title: 'Hotel eliminado',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
    setLoading(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return { hotels, form, loading, handleChange, addHotel, removeHotel }
}
