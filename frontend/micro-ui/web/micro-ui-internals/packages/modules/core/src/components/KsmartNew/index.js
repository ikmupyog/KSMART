import React from "react";
import MenuBar from "./Menu";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Services from "./Services";
import { Card, Row } from "react-bootstrap";

const KsmartHome = () => (<React.Fragment>
    <Row>
        <MenuBar />
    </Row>
    <Row style={{ paddingBottom: 20 }}>
        <Card style={{ backgroundColor: "darkblue" }} >
            <Carousel />
        </Card>
    </Row>
    <Services />
    <Footer />
    {/* common footer */}
</React.Fragment>);

export default KsmartHome;