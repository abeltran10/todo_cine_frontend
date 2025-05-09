import React from 'react'

import Card from 'react-bootstrap/Card';

const Notification = ({successMessage, errorMessage}) => {
    
    if (!successMessage && !errorMessage)
        return null

    const color = successMessage ? 'bg-success' : 'bg-warning'
    
    const message = successMessage ? successMessage : errorMessage

    return (
        <div><Card className={color} body>{message}</Card></div>
    )
}

export default Notification