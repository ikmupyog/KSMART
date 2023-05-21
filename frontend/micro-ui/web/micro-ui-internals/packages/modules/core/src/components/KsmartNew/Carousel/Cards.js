import React from 'react'
import { Card } from 'react-bootstrap'

const Cards = (props) => {
    const { title = "welcome", icon } = props
    return (
        <Card>
            {icon && icon}
            {title}
        </Card>
    )
}

export default Card
