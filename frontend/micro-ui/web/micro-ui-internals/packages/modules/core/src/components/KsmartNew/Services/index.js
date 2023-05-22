import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaAccessibleIcon, FaArrowRight } from "react-icons/fa";

const styles = {
    card: {
        "text-align": "center",
        "border-bottom-left-radius": "30px",
        "border-top-right-radius": "30px",
        "border-bottom-right-radius": "0px",
        "border-top-left-radius": "0px"
    },
    roundedButton: {
        "border-radius": "20px",
        backgroundColor: "#00b9f2",
        width: 200,
        marginBlock: 20,
        marginRight: 20
    },
};

const CustomCard = props => {
    const { title = "", icon, description = "" } = props;
    return <Card style={styles.card}>
        <Row>
            <Col sm={10} style={{ textAlign: 'left' }}>{title}</Col>
            <Col sm={2}>{icon}</Col>
        </Row>
        <Row style={{ textAlign: 'center' }}>
            <Col sm={12}>{description}</Col>
        </Row>
        <Row style={{ textAlign: 'center' }}>
            <Col sm={6} style={{ textAlign: 'left' }}>Details</Col>
            <Col sm={6}><Button style={styles.roundedButton}>Start Service</Button></Col>
        </Row>
    </Card>
}

const Services = () => {
    return <Row>
        <Col sm={4}>
            <Card>

            </Card>
        </Col>
        <Col sm={4}>
            <CustomCard
                title="Civil Registration"
                icon={<FaAccessibleIcon />}
                description="Death Registration | Birth Registration | Marriage Registration" />
        </Col>
        <Col sm={4}>
            <CustomCard
                title="Civil Registration"
                icon={<FaAccessibleIcon />}
                description="Death Registration | Birth Registration | Marriage Registration" />
        </Col>
    </Row>
}

export default Services