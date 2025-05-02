import React, { useState } from 'react'
import { Register } from '../components/Register'
import './AuthPage.css'
import { Login } from '../components/Login'



//Componente exportado por Named (Quiero tener más componentes en un archivo)
export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false)
    const handleIsLogin = ()=>{
        setIsLogin((prev)=> !prev)
    } 
  return (
    <div className="auth-container">
        {
            isLogin ? (
                <>
        
                <Login handleIsLogin={handleIsLogin}/>
                </>
            ) : (
                <>    
                <Register handleIsLogin={handleIsLogin} />
                </>
            )
        }
    </div>
  )
}