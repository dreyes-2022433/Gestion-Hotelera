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

  return (
    <header>
      <h1>Hotel Paraíso</h1>
      <nav>
        <a href="#">Perfil</a>
        <a href="Home/Hotelpage">Hoteles</a>
        <a href="#">Servicios</a>
        <a href="#">Contacto</a>
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </nav>
    </header>
  )
}
