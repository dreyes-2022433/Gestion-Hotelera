import React, { useState } from 'react';
import { useLogin } from '../shared/hooks/useLogin';
import { validateEmail, validatePassword } from '../shared/validators/validator.js';
import { emailValidationMessage, passwordValidationMessage } from '../shared/validators/validator.js';
import { Input } from './Input';
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

  const isSubmitButtonDisabled =
    !formData.email.isValid || !formData.password.isValid;

  const handelLogin = (e) => {
    e.preventDefault();
    login(formData.email.value, formData.password.value);
    
  }
 const handleValidationOnBlur = (value, field)=>{
         let isValid = false
         switch (field) {    
             case 'email':
                 isValid = validateEmail(value)
                 break;
             
             case 'password':
                 isValid = validatePassword(value)
                 break;
             
         }
         setFormData((prevData)=> (
             {
                 ...prevData,
                 [field]: {
                     ...prevData[field],
                     isValid,
                     showError: !isValid
                 }
             }
         ))
     }
const handleValueChange = (value, field)=>{
    setFormData((prevData)=> (
        {
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }
    ))
    console.log(formData)
}
return(
    <>
        <div className='register-container'>
        <h1>Iniciar sesion</h1>
                <form
                    id='formulario'
                    className='auth-form' 
                    onSubmit={handelLogin}
                >
                    <Input
                        field='email'
                        label='Email'
                        value={formData.email.value}
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.email.showError}
                        validationMessage={'Debe ser un email valido'}
                        />
                    <Input 
                        field='password'
                        label='password'
                        value={formData.password.value}
                        type='text'
                        onChangeHandler={handleValueChange}
                       onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.password.showError}
                        validationMessage={'La contraseña debe ser valida'}
                    
                    />  
                    <button type="submit" disabled={isSubmitButtonDisabled} >Logearte</button>
                    <button onClick={handleIsLogin}>Registrarte</button>
                    </form>

        </div>
    </>
)
}