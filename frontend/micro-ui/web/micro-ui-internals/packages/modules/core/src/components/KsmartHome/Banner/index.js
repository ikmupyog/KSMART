import React from 'react'
import Carousel from '../Carousel'

function Banner() {
    return (
        <div className="header-banner-main position-relative">
            <div className="container-fluid">
                <div className="header-banner pt-4">
                    <Carousel />
                </div>
                <div className="row py-5">
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                        <div className="header-btm-search-box">
                            <div className="inner-box-v">
                                <div className="icon-btm-sre">
                                    <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/quick.svg" alt="" />
                                </div>
                                <h4>Quick Search</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                        <div className="header-btm-search-box">
                            <div className="inner-box-v">
                                <div className="icon-btm-sre">
                                    <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/citizen.svg" alt="" />
                                </div>
                                <h4>Citizen Services</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                        <div className="header-btm-search-box">
                            <div className="inner-box-v">
                                <div className="icon-btm-sre">
                                    <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/my-profile.svg" alt="" />
                                </div>
                                <h4>My Profile</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                        <div className="header-btm-search-box">
                            <div className="inner-box-v">
                                <div className="icon-btm-sre">
                                    <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/trade.svg" alt="" />
                                </div>
                                <h4>Trade Licenses</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 wow animated fadeInUp">
                        <div className="applicatio-id-mn">
                            <div className="input-field-main">
                                <input type="text" name="" id="" placeholder="Enter Application ID" />
                                <button>Check</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row wow animated fadeInUp">
                    <div className="col-12">
                        <ul className="header-bottom-patti">
                            <li><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/info.svg" alt="" /> Info Guide</li>
                            <li><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/kid.svg" alt="" /> KID</li>
                            <li><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/e-servis.svg" alt="" /> E-Services</li>
                            <li><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/application.svg" alt="" /> My Applications</li>
                            <li><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/akshaya.svg" alt="" /> Akshaya</li>
                            <li><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/public.svg" alt="" /> Public Grievance</li>
                            <li><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/help.svg" alt="" /> Help</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner