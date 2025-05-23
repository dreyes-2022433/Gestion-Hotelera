import React, { useState } from 'react';
import { useLogin } from '../shared/hooks/useLogin';
import { validateEmail, validatePassword } from '../shared/validators/validator.js';
import { Navigate } from 'react-router-dom';

export const Login = ({ handleIsLogin }) => {
  const form = {
    email: {
      value: '',
      isValid: false,
      showError: false,
    },
    password: {
      value: '',
      isValid: false,
      showError: false,
    },
  };

  const [formData, setFormData] = useState(form);
  const { login } = useLogin();

  const isSubmitButtonDisabled = !formData.email.isValid || !formData.password.isValid;

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData.email.value, formData.password.value);
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'email':
        isValid = validateEmail(value);
        break;
      case 'password':
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }));
  };

  return (
    <>
      <style>
        {`
          .content {
            width: 90%;
            max-width: 450px;
            padding: 5vh 4vw;
            background: rgba(221, 225, 231, 0.8);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .content .text {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 2vh;
            color: #595959;
            text-align: center;
          }
          .field {
            height: 6vh;
            width: 100%;
            display: flex;
            position: relative;
            margin-bottom: 2vh;
          }
          .field .input {
            height: 100%;
            width: 100%;
            padding-left: 2vw;
            outline: none;
            border: none;
            font-size: 1.2rem;
            background: rgba(221, 225, 231, 0.8);
            color: #595959;
            border-radius: 1.5rem;
            box-shadow: inset 2px 2px 5px #BABECC, inset -5px -5px 10px #ffffff73;
          }
          .field .input:focus {
            box-shadow: inset 1px 1px 2px #BABECC, inset -1px -1px 2px #ffffff73;
          }
          .field .label {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 2vw;
            pointer-events: none;
            color: #666666;
            font-size: 1.2rem;
          }
          .field .input:valid ~ .label {
            opacity: 0;
          }
          .button {
            margin: 2vh 0;
            width: 100%;
            height: 6vh;
            font-size: 1.2rem;
            line-height: 6vh;
            font-weight: 600;
            background: rgba(221, 225, 231, 0.8);
            border-radius: 1.5rem;
            border: none;
            outline: none;
            cursor: pointer;
            color: #595959;
            box-shadow: 2px 2px 5px #BABECC, -5px -5px 10px #ffffff73;
          }
          .button:focus {
            color: #3498db;
            box-shadow: inset 2px 2px 5px #BABECC, inset -5px -5px 10px #ffffff73;
          }
          .button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .sign-up {
            margin: 1.5vh 0;
            color: #595959;
            font-size: 1.1rem;
            text-align: center;
          }
          .sign-up a {
            color: #3498db;
            text-decoration: none;
          }
          .sign-up a:hover {
            text-decoration: underline;
          }
          /* Media queries para pantallas más pequeñas */
          @media (max-height: 700px) {
            .content {
              padding: 3vh 3vw;
            }
            .content .text {
              font-size: 2rem;
              margin-bottom: 1.5vh;
            }
            .field {
              height: 5vh;
              margin-bottom: 1.5vh;
            }
            .field .input {
              font-size: 1rem;
              padding-left: 1.5vw;
            }
            .field .label {
              font-size: 1rem;
              left: 1.5vw;
            }
            .button {
              height: 5vh;
              font-size: 1rem;
              line-height: 5vh;
              margin: 1.5vh 0;
            }
            .sign-up {
              font-size: 0.9rem;
              margin: 1vh 0;
            }
          }
          @media (max-height: 500px) {
            .content {
              padding: 2vh 2vw;
            }
            .content .text {
              font-size: 1.8rem;
              margin-bottom: 1vh;
            }
            .field {
              height: 4vh;
              margin-bottom: 1vh;
            }
            .field .input {
              font-size: 0.9rem;
              padding-left: 1vw;
            }
            .field .label {
              font-size: 0.9rem;
              left: 1vw;
            }
            .button {
              height: 4vh;
              font-size: 0.9rem;
              line-height: 4vh;
              margin: 1vh 0;
            }
            .sign-up {
              font-size: 0.8rem;
              margin: 0.8vh 0;
            }
          }
          @media (max-width: 400px) {
            .content {
              padding: 2vh 2vw;
            }
            .content .text {
              font-size: 1.8rem;
            }
            .field .input {
              font-size: 0.9rem;
              padding-left: 1vw;
            }
            .field .label {
              font-size: 0.9rem;
              left: 1vw;
            }
            .button {
              font-size: 0.9rem;
            }
            .sign-up {
              font-size: 0.8rem;
            }
          }
        `}
      </style>
      <div className="content">
        <div className="text">Login</div>
        <div className="field">
          <input
            type="text"
            className="input"
            value={formData.email.value}
            onChange={(e) => handleValueChange(e.target.value, 'email')}
            onBlur={(e) => handleValidationOnBlur(e.target.value, 'email')}
            required
          />
          <label className="label">Correo</label>
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            value={formData.password.value}
            onChange={(e) => handleValueChange(e.target.value, 'password')}
            onBlur={(e) => handleValidationOnBlur(e.target.value, 'password')}
            required
          />
          <label className="label">Contraseña</label>
        </div>
        <button
          type="button"
          className="button"
          onClick={handleLogin}
          disabled={isSubmitButtonDisabled}
        >
          Iniciar Sesión
        </button>
        <div className="sign-up">
          ¿No eres miembro?{' '}
          <a href="#" onClick={handleIsLogin}>
            Regístrate ahora
          </a>
        </div>
      </div>
    </>
  );
};