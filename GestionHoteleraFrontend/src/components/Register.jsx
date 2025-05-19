import React,{ useState } from "react"
import { useRegister } from "../shared/hooks/useRegister"
import { validateEmail, validateName, validatePassConfirm, validatePassword, validatePhone, validateUsername } from "../shared/validators/validator.js"
import { emailValidationMessage, passConfirmValidationMessage, passwordValidationMessage, phoneValidationMessage, usernameValidationMessage } from "../shared/validators/validator.js"
import { Input } from "./Input"
import { Link } from 'react-router-dom'


export const Register = ({handleIsLogin}) => {

    const form = {
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        surname: {
            value: '',
            isValid: false,
            showError: false
        },
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        phone: {
            value: '',
            isValid: false,
            showError: false
        },
        
        passwordConfirm: {
            value: '',
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(form)

    const {register} = useRegister()
                    
    const isSubmitButtonDisabled = 
    !formData.email.isValid ||
    !formData.username.isValid ||
    !formData.password.isValid ||
    !formData.passwordConfirm.isValid ||
    !formData.surname.isValid ||
    !formData.name.isValid ||
    !formData.phone.isValid
    
    const handleRegister = (e)=>{
        e.preventDefault()
        register(
            formData.name.value,
            formData.surname.value,
            formData.username.value,
            formData.email.value,
            formData.password.value,
            formData.phone.value,
    
        )
    }

    const handleValidationOnBlur = (value, field)=>{
        let isValid = false
        switch (field) {
            case 'name':
                isValid = validateName(value)
                break;
                case 'surname':
                isValid = validateUsername(value)   
                break;
            case 'phone':
                isValid = validatePhone(value)
                break;
            case 'email':
                isValid = validateEmail(value)
                break;
            case 'username':
                isValid = validateUsername(value)
                break;
            case 'password':
                isValid = validatePassword(value)
                break;
            case 'passwordConfirm':
                isValid = validatePassConfirm(formData.password.value, value)
                break;
            default:
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

    //Función manejadora de cambios del estado
                        //nuevo valor //Input que cambió
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

    return (
        <div className='register-container'>
            <h1>REGISTRAR</h1>
        <form
            id='formulario'
            className='auth-form' 
            onSubmit={handleRegister}
        >
            <Input
                field='name'
                label='Name'
                value={formData.name.value}
                type='text'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.name.showError}
                validationMessage={'El nombre debe tener entre 3 y 8 caracteres (Sin espacios)'}
                />
            <Input 
                field='surname'
                label='Surname'
                value={formData.surname.value}
                type='text'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.surname.showError}
                validationMessage={'El apellido debe tener entre 3 y 8 caracteres (Sin espacios)'}
            
            />  
            <Input 
                field='username'
                label='Username'
                value={formData.username.value}
                type='text'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.username.showError}
                validationMessage={usernameValidationMessage}
            />

            <Input 
                field='email'
                label='Email'
                value={formData.email.value}
                type='email'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.email.showError}
                validationMessage={emailValidationMessage}
            />

            <Input 
                field='password'
                label='Password'
                value={formData.password.value}
                type='password'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={passwordValidationMessage}
            />

            <Input 
                field='passwordConfirm'
                label='Password Confirmation'
                value={formData.passwordConfirm.value}
                type='password'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.passwordConfirm.showError}
                validationMessage={passConfirmValidationMessage}
            />  
            <Input
                field='phone'
                label='Phone'
                value={formData.phone.value}
                type='text'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.phone.showError}
                validationMessage={phoneValidationMessage}
            
            />
                <button type="submit" disabled={isSubmitButtonDisabled} >Registrarse</button>
                <button onClick={handleIsLogin}>Volver a Login</button>
            </form>
        </div>
    )
}