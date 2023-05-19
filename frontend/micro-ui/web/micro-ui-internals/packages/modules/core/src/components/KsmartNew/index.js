import React from "react";
import MenuBar from "./Menu";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Services from "./Services";
import TopBarSideBarKsmart from "./TopBarKsmartNew";

const KsmartHome = () => (<React.Fragment>
    {/* <TopBarSideBarKsmart/> */}
    <MenuBar/>
    <Carousel/>
    <Services/>
    <Footer/>
    {/* common footer */}
    </React.Fragment>);

export default KsmartHome;