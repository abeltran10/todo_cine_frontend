import React from 'react'

import Card from 'react-bootstrap/Card';

const Notification = ({successMessage, errorMessage}) => {
    
    if (successMessage === null && errorMessage === null)
        return null

    const color = successMessage !== null ? 'bg-success' : 'bg-warning'
    
    let message = successMessage !== null ? successMessage : errorMessage

    return (
        <Card className={color} body>{message}</Card>
    )
}

export default Notification