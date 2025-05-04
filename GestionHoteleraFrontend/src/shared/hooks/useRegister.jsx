import { useState } from "react"
import { registerRequest } from "../../services/api"
import toast from 'react-hot-toast'


export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const register = async(name,surname,username,email,password,phone) => {
setIsLoading(true)
        const user ={
            name,
            surname,
            username,
            email,
            password,
            phone
        }
        const response = await registerRequest(user)
        setIsLoading(false)
      if(response.error){
        setError(true)
        if(response?.error?.response?.data?.errors){
            let arrayErrors = response?.error?.response?.data?.errors
            for (const error of arrayErrors) {
                return toast.error(error.message)
            }
        }
        return toast.error(
            response?.error?.response?.data?.message ||
            response?.error?.data?.message ||
            'Error general al intentar registrar al usuario. Intenta de nuevo'
        )
      }
      setError(false)
      return toast.success('Te has registrado correctamente')
    }
    return {
        register,
        isLoading,
        error,
        setError
}
}