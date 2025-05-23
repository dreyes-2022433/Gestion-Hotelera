import React from "react"
import { useNavigate } from "react-router-dom"
import "../pages/MainPage.css"

export const NavigationNav = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/', { replace: true })
  }

  const handleClickHoteles = (e) => {
    const currentPath = window.location.pathname.toLowerCase()
    const hotelesPath = "/home/hotelpage"

    if (currentPath === hotelesPath) {
      e.preventDefault()
    }
  }

  return (
    <header>
      <h1>Hotel Paraíso</h1>
      <nav>
        <a href="#">Perfil</a>
        <a href="/Home/Hotelpage" onClick={handleClickHoteles}>Hoteles</a>
        <a href="#">Servicios</a>
        <a href="#">Contacto</a>
        <a href="/Home/ReservationPage">Reservaciones</a>
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </nav>
    </header>
  )
}
