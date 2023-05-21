import React from "react";
import MenuBar from "./Menu";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Services from "./Services";
import { Row } from "react-bootstrap";
import Cards from "./Carousel/Cards";
import { FaUserCircle } from "react-icons/fa";

const KsmartHome = () => (<React.Fragment>
    <Row>
        <MenuBar />
    </Row>
    <Row style={{ marginTop: '80px', backgroundColor: "#bbd6df" }}>
        <Carousel />
        <Cards title="Quick Search" icon={<FaUserCircle />} />
    </Row>
    <Services />
    <Footer />
    {/* common footer */}
</React.Fragment>);

export default KsmartHome;