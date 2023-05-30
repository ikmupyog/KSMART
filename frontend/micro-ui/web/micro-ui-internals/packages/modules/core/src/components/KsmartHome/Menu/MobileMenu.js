import React, { useState } from 'react'

function MobileMenu() {

    const [display, setDisplay] = useState(false)


    function toggleMobileMenu() {
        const burger = document.querySelector('.burger');
        const body = document.querySelector('body');
        const menu = document.querySelector('.mobile-menu');
        const nav = document.querySelector('.nav-mob-links');
        const navLinks = document.querySelectorAll('.nav-mob-links li');

        menu.classList.toggle('active');
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });

        // body.classList.toggle('no-scroll');
        burger.classList.toggle('active');
        setDisplay(!display)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-block d-lg-none " style={{ position: "sticky", marginBottom: '0px' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/k-smart-logo.png" alt="" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <div className="burger" onClick={() => toggleMobileMenu()}>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </button>
                {/* <div > */}
                <div className="mobile-navbar py-2" style={{ display: display ? 'block' : 'none', width: '100%', transition: 'all 0.5s ease-in-out' }}>
                    <div className="nav-mob-links mobile-menu" style={{ marginBottom: '0px', padding: '25px' }}>
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
                </div>
            </div>
            {/* </div> */}
        </nav>
    )
}

export default MobileMenu