import React from "react"



export const Input = ({ field,label,value,onChangeHandler, type,showErrorMessage,validationMessage,onBlurHandler}) => {
    const handleValueChange = (e) => {
        onChangeHandler(e.target.value , field)
    }
    const handleBlur = (e) => {
        onBlurHandler(e.target.value, field)
    }
    return (
        <>
            <div className="input-label">
                <span>{label}</span>
            </div>
        {(
            <input 
                type={type}
                name={field}
                value={value}
                onChange={handleValueChange}
                onBlur={handleBlur}
                />
        )
        }
        <span className='auth-form-validation-message' >{showErrorMessage && validationMessage}</span>
        </>
    )
}