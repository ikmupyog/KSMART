import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FaRegUserCircle, FaSearchPlus } from 'react-icons/fa'


const styles = {
}
export const SquareCards = (props) => {
    const { title = "welcome", icon } = props
    return (
        <Card style={{ textAlign: 'center' }}>
            {icon && icon}
            {title}
        </Card>
    )
}

const CarouselCards = () => <Row>
    <Col sm={2} >
        <SquareCards title="Quick Search" icon={<FaSearchPlus />} />
    </Col>
    <Col sm={2}>
        <SquareCards title=" Citizen Services" icon={<FaRegUserCircle />} />
    </Col>
    <Col sm={2}>
        <SquareCards title=" My Profile" icon={<FaRegUserCircle />} />
    </Col>
    <Col sm={2}>
        <SquareCards title=" Trade License" icon={<FaRegUserCircle />} />
    </Col>
    <Col sm={4}>
        <Card>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Enter Application Id"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="info">Search</Button>
            </Form>
        </Card>
    </Col>
</Row>

export default CarouselCards
