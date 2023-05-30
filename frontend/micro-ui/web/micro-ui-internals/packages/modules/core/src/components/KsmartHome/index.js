import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import TopBar from "./TopBar";
import DesktopMenu from "./Menu/DesktopMenu";
import MobileMenu from "./Menu/MobileMenu";
import Banner from "./Banner";
import Services from "./Services";
import SmartULB from "./SmartULB";
import KsmartMedia from "./Media";
import Download from "./Download";
import KsmartFooter from "./Footer";

const KsmartHome = () => {

    return <React.Fragment>
        <div className="desktop_navbar-main d-none d-lg-block">
            <TopBar />
            <DesktopMenu />
        </div>
        <MobileMenu />
        <Banner />
        <Services />
        <SmartULB />
        <KsmartMedia />
        <Download />
        <KsmartFooter />
    </React.Fragment>
}

export default KsmartHome;


{/* <div className="mobile-navbar d-block d-lg-none py-2">
    <nav className="navbar">
        <div className="logo">
            <a href="#"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/k-smart-logo.png" alt="Logo" /></a>
        </div>
        <div className="nav-mob-links mobile-menu">
            <div className="mob-spacing-content">
                <ul className="">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Ksmart</a></li>
                    <li><a href="#">E Bridge</a></li>
                    <li><a href="#">Quick Pay</a></li>
                    <li><a href="#">Certificates</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/translate-icon.svg" alt="" /> Translate</a></li>
                    <li><a href="#"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/search-icon.svg" alt="" /> Search</a></li>
                    <li><a href="" className="h-login-btn"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Register</a></li>
                    <li><a href="" className="h-register-btn"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Login</a></li>
                </ul>
            </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <div className="burger" onClick={() => toggleMobileMenu()}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </button>
    </nav>
</div> */}