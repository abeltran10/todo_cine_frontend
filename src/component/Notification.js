import React from 'react'

const Notification = ({successMessage, errorMessage}) => {
    const successStyle = {backgroundColor: '#198754', borderRadius: '50rem', color: 'white', textAlign: 'center'}
    const errorStyle = {backgroundColor: '#dc3545', borderRadius: '50rem', color: 'white', textAlign: 'center'}
    
    if (successMessage === null && errorMessage === null)
        return null

    const style = successMessage !== null ? successStyle : errorStyle
    
    let message = successMessage !== null ? successMessage : errorMessage

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification