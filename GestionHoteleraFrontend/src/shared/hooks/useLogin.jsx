import { loginRequest } from "../../services/api";
import { use, useState } from "react";
import toast from "react-hot-toast";
import { Home } from "../../pages/MainPage";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logeado, setLogeado] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    const user = {
      email,
      password,
    };
    const response = await loginRequest(user);
    setIsLoading(false);
    if (response.error) {
      setError(true);
      if (response?.error?.response?.data?.errors) {
        let arrayErrors = response?.error?.response?.data?.errors;
        for (const error of arrayErrors) {
          return toast.error(error.message);
        }
      }
      return toast.error(
        response?.error?.response?.data?.message ||
          response?.error?.data?.message ||
          "Error general al intentar registrar al usuario. Intenta de nuevo"
      );
    }
    setError(false);
    toast.success("Te has logueado correctamente");
    navigate("/Home")
  };

  return {
    login,
    isLoading,
    error,
    setError,
  };
}