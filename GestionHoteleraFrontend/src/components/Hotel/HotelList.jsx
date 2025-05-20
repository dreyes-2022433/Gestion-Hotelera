import { useEffect, useState } from 'react'
import axios from 'axios'

export const HotelList = () => {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:3626/v1/hotel/getHotels")
        setHotels(res.data.hotels)
      } catch (error) {
        console.error("Error al cargar los hoteles:", error)
      }
    }

    fetchHotels()
  }, [])

  return (
    <div>
      <h2>Lista de Hoteles</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Categoría</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Descripción</th>
            <th>Servicios</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>{hotel.name}</td>
              <td>{hotel.direction}</td>
              <td>{hotel.category}</td>
              <td>{hotel.phone}</td>
              <td>{hotel.email}</td>
              <td>{hotel.description}</td>
              <td>{hotel.amenities}</td>
              <td>{hotel.status ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}