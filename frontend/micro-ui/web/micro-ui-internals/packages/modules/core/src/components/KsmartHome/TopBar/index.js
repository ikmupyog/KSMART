import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function TopBar() {

    const history = useHistory();

    const onLoginClick = () => history.push({
        pathname: '/digit-ui/citizen/login',
        state: {
            from: '/digit-ui/citizen/home'
        }
    });

    return (
        <div className="ks-topNavbar animated fadeInUp">
            <div className="container-fluid">
                <nav className="sm-navigatin-flex d-flex align-items-center justify-content-between">
                    <div className="ksmart-logo-fx d-flex align-items-center gap-5">
                        <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/k-smart-logo.png" alt="" className="k-logo1" /></a>
                        <div className="center-ln-logo"></div>
                        <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Government_of_Kerala_Logo.png" alt="" className="k-logo2" /></a>
                    </div>
                    <ul className="login-regis-group d-flex align-items-center gap-4">
                        <li><Button className="h-login-btn"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Register</Button></li>
                        <li><Button className="h-register-btn" onClick={onLoginClick}><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Login</Button></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default TopBar