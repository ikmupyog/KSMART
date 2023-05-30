import React from 'react'

function DesktopMenu() {
    return (
        <div className="second-navbar-k animated fadeInUp">
            <div className="container-fluid">
                <nav className="main-flexnavaet d-flex align-items-center justify-content-between">
                    <ul className="big-leftnavbarDrv d-flex align-items-center">
                        <li><a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/home-icon.svg" alt="" /></a></li>
                        <li><a href="">About Ksmart</a></li>
                        <li><a href="">E Bridge</a></li>
                        <li><a href="">Quick Pay</a></li>
                        <li><a href="">Certificates</a></li>
                    </ul>
                    <ul className="right_iconNavbar d-flex align-items-center">
                        <li><a href="">Support</a></li>
                        <div className="mid-line-nav"></div>
                        <li><a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/translate-icon.svg" alt="" /> Translate</a></li>
                        <div className="mid-line-nav"></div>
                        <li><a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/search-icon.svg" alt="" /></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default DesktopMenu