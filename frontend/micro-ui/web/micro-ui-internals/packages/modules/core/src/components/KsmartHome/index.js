import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "./Carousel";

const KsmartHome = () => (<React.Fragment>
    <div class="desktop_navbar-main d-none d-lg-block">
        <div class="ks-topNavbar animated fadeInUp">
            <div class="container">
                <nav class="sm-navigatin-flex d-flex align-items-center justify-content-between">
                    <div class="ksmart-logo-fx d-flex align-items-center gap-5">
                        <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/logo_bule.png" alt="" class="k-logo1" /></a>
                        <div class="center-ln-logo"></div>
                        <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Government_of_Kerala_Logo.png" alt="" class="k-logo2" /></a>
                    </div>
                    <ul class="login-regis-group d-flex align-items-center gap-4">
                        <li><a href="" class="h-login-btn"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Register</a></li>
                        <li><a href="" class="h-register-btn"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Login</a></li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="second-navbar-k animated fadeInUp">
            <div class="container">
                <nav class="main-flexnavaet d-flex align-items-center justify-content-between">
                    <ul class="big-leftnavbarDrv d-flex align-items-center">
                        <li><a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/home-icon.svg" alt="" /></a></li>
                        <li><a href="">About Ksmart</a></li>
                        <li><a href="">E Bridge</a></li>
                        <li><a href="">Quick Pay</a></li>
                        <li><a href="">Certificates</a></li>
                    </ul>
                    <ul class="right_iconNavbar d-flex align-items-center">
                        <li><a href="">Support</a></li>
                        <div class="mid-line-nav"></div>
                        <li><a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/translate-icon.svg" alt="" /> Translate</a></li>
                        <div class="mid-line-nav"></div>
                        <li><a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/search-icon.svg" alt="" /></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    {/* <!-- mobile menu section start  --> */}
    <div class="mobile-navbar d-block d-lg-none py-2">
        <nav class="navbar">
            <div class="logo">
                <a href="#"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/logo_bule.png" alt="Logo" /></a>
            </div>
            <div class="nav-mob-links mobile-menu">
                <div class="mob-spacing-content">
                    <ul class="">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Ksmart</a></li>
                        <li><a href="#">E Bridge</a></li>
                        <li><a href="#">Quick Pay</a></li>
                        <li><a href="#">Certificates</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/translate-icon.svg" alt="" /> Translate</a></li>
                        <li><a href="#"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/search-icon.svg" alt="" /> Search</a></li>
                        <li><a href="" class="h-login-btn"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Register</a></li>
                        <li><a href="" class="h-register-btn"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/login-icon.svg" alt="" /> Login</a></li>
                    </ul>
                </div>
            </div>
            <div class="burger" onclick="toggleMobileMenu()">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </nav>
    </div>
    {/* <!-- end mobile menu  --> */}

    {/* <!-- banner section start  --> */}
    <div class="header-banner-main position-relative">
        <div class="container">

            <Carousel />

            <div class="row py-5">
                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                    <div class="header-btm-search-box">
                        <div class="inner-box-v">
                            <div class="icon-btm-sre">
                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/quick.svg" alt="" />
                            </div>
                            <h4>Quick Search</h4>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                    <div class="header-btm-search-box">
                        <div class="inner-box-v">
                            <div class="icon-btm-sre">
                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/citizen.svg" alt="" />
                            </div>
                            <h4>Citizen Services</h4>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                    <div class="header-btm-search-box">
                        <div class="inner-box-v">
                            <div class="icon-btm-sre">
                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/my-profile.svg" alt="" />
                            </div>
                            <h4>My Profile</h4>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0 wow animated fadeInUp">
                    <div class="header-btm-search-box">
                        <div class="inner-box-v">
                            <div class="icon-btm-sre">
                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/trade.svg" alt="" />
                            </div>
                            <h4>Trade Licenses</h4>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 wow animated fadeInUp">
                    <div class="applicatio-id-mn">
                        <div class="input-field-main">
                            <input type="text" name="" id="" placeholder="Enter Application ID" />
                            <button>Check</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row wow animated fadeInUp">
                <div class="col-12">
                    <ul class="header-bottom-patti">
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

    {/* <!-- services section start  --> */}
    <div class="services-ksmart-main-bg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="services-heading-fx d-flex align-items-center justify-content-between wow animated fadeInUp">
                        <h2>Services</h2>
                        <a href="" class="btn-view-service">Show All Services </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <div class="left_services-webv wow animated fadeInUp">
                        <nav class="services-tabs-cat pt-4">
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button class="nav-link active" id="nav-serviceone-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-serviceone" type="button" role="tab" aria-controls="nav-serviceone"
                                    aria-selected="true"><span><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/medal.png" alt="" /></span> Frequently Used
                                    Services</button>
                                <button class="nav-link" id="nav-servicetwo-tab" data-bs-toggle="tab" data-bs-target="#nav-servicetwo"
                                    type="button" role="tab" aria-controls="nav-servicetwo" aria-selected="false"><span><img
                                        src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service2.svg" alt="" /></span> Priority Services</button>
                                <button class="nav-link" id="nav-servicethree-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-servicethree" type="button" role="tab" aria-controls="nav-servicethree"
                                    aria-selected="false"><span><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service3.svg" alt="" /></span> Smart ULB</button>
                                <button class="nav-link" id="nav-servicefour-tab" data-bs-toggle="tab" data-bs-target="#nav-servicefour"
                                    type="button" role="tab" aria-controls="nav-servicefour" aria-selected="false"><span><img
                                        src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service4.svg" alt="" /></span> Predictive Services</button>
                                <button class="nav-link" id="nav-servicefive-tab" data-bs-toggle="tab" data-bs-target="#nav-servicefive"
                                    type="button" role="tab" aria-controls="nav-servicefive" aria-selected="false"><span><img
                                        src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service5.svg" alt="" /></span> K-Doc Cloud</button>
                            </div>
                        </nav>
                        <lottie-player class="mt-5" src="images/55177.json" background="transparent" speed="1" loop=""
                            autoplay=""></lottie-player>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
                            tabindex="0">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Civil Registration <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem1.png" alt="" />
                                        </div>
                                        <h5>Death Registration | Birth Registration | Marriage Registration</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Public Grievances Redressal <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem2.png" alt="" />
                                        </div>
                                        <h5>New Grievance | RTI | Status</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Citizen Welfare <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem3.png" alt="" />
                                        </div>
                                        <h5>Housing Assistance | Social Security Pensions | Financial Assistances & Allowances</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Business Facilitation <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem4.png" alt="" />
                                        </div>
                                        <h5>IFTE & OS License | Industry | Factory | Workshop Establishment | Installation Permit</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Building Permit <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem5.png" alt="" />
                                        </div>
                                        <h5>Permits and approvals | Licensee services | Building Plan Scrutiny Services | To get an</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Taxt <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem6.png" alt="" />
                                        </div>
                                        <h5>Property Tax | Professional Tex | Water Vessels | Entertainment Tax</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Civil Registration <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem7.png" alt="" />
                                        </div>
                                        <h5>Death Registration | Birth Registration | Marriage Registration</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 wow animated fadeInUp">
                                    <div class="services-box-depend">
                                        <div class="heading-serv d-flex justify-content-between align-items-center">
                                            <h4>Civic Amenities & Public Utilities <span><i class="fal fa-long-arrow-right"></i></span></h4>
                                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem8.png" alt="" />
                                        </div>
                                        <h5>Crematorium | Water Supply Ambulance Mobile Mortuary | Sewage Treatment</h5>
                                        <div class="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                            <a href="" class="service-details-btn">Service Deetails</a>
                                            <a href="" class="service-start-btn">Service Start</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Smart ULB section start  --> */}
    <div class="sulb-section-d">
        <div class="container">
            <div class="media-title-top wow animated fadeInUp">Smart ULB</div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-3 mb-lg-0 wow animated fadeInUp">
                    <div class="s-smark-ulBox">
                        <lottie-player src="images/61565.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        <div class="ULB-text-content-b">
                            <h3>Integrate Your Family</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Maecenas pulvinar quis scelerisque id. A elit donec elit elit
                                in nulla magna. Risus nec sit quis ornare cursus.</p>
                            <a href="" class="know-more-btn">know More</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-3 mb-lg-0 wow animated fadeInUp">
                    <div class="s-smark-ulBox">
                        <lottie-player src="images/93905.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        <div class="ULB-text-content-b">
                            <h3>Integrate Your Properties & Buildings</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Maecenas pulvinar quis scelerisque id. A elit donec elit elit
                                in nulla magna. Risus nec sit quis ornare cursus.</p>
                            <a href="" class="know-more-btn">know More</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-3 mb-lg-0 wow animated fadeInUp">
                    <div class="s-smark-ulBox">
                        <lottie-player src="images/30304.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        <div class="ULB-text-content-b">
                            <h3>Integrate Your Health & Education</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Maecenas pulvinar quis scelerisque id. A elit donec elit elit
                                in nulla magna. Risus nec sit quis ornare cursus.</p>
                            <a href="" class="know-more-btn">know More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row wow animated fadeInUp">
                <a href="" class="ULB-show-btn">Show All</a>
            </div>
        </div>
    </div>


    {/* <!-- Ksmart Media Center section start  --> */}
    <div class="k-smarrt-media-mainsec">
        <div class="container">
            <div class="media-title-top wow animated fadeInUp">Ksmart Media Center</div>
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10">
                    <nav class="custom-navtabs-k wow animated fadeInUp">
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-News-tab" data-bs-toggle="tab" data-bs-target="#nav-News"
                                type="button" role="tab" aria-controls="nav-News" aria-selected="true">Latest News</button>
                            <button class="nav-link" id="nav-Events-tab" data-bs-toggle="tab" data-bs-target="#nav-Events"
                                type="button" role="tab" aria-controls="nav-Events" aria-selected="false">Events</button>
                            <button class="nav-link" id="nav-Advertisments-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-Advertisments" type="button" role="tab" aria-controls="nav-Advertisments"
                                aria-selected="false">Advertisments</button>
                            <button class="nav-link" id="nav-Photos-tab" data-bs-toggle="tab" data-bs-target="#nav-Photos"
                                type="button" role="tab" aria-controls="nav-Photos" aria-selected="false">Photos</button>
                            <button class="nav-link" id="nav-Videos-tab" data-bs-toggle="tab" data-bs-target="#nav-Videos"
                                type="button" role="tab" aria-controls="nav-Videos" aria-selected="false">Videos</button>
                            <button class="nav-link" id="nav-Initiatives-tab" data-bs-toggle="tab" data-bs-target="#nav-Initiatives"
                                type="button" role="tab" aria-controls="nav-Initiatives" aria-selected="false">Initiatives</button>
                        </div>
                    </nav>
                </div>
                <div class="col-lg-1"></div>
            </div>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-News" role="tabpanel" aria-labelledby="nav-News-tab"
                    tabindex="0">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 mb-3 mb-lg-0 wow animated fadeInUp">
                            <div class="media-box-view-cont">
                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/media1.png" alt="" class="media-images" />
                                <div class="member-layer-content">
                                    <h6>Programmer and icon control the system in data center room</h6>
                                    <p><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.4235 1.7876C10.8195 1.7876 10.3298 1.29791 10.3298 0.693848C10.3298 0.338379 10.029 0.0375977 9.67352 0.0375977C9.3454 0.0375977 9.01727 0.338379 9.01727 0.693848C9.01727 1.29791 8.52758 1.7876 7.92352 1.7876H6.17352C5.56946 1.7876 5.07977 1.29791 5.07977 0.693848C5.07977 0.338379 4.77899 0.0375977 4.42352 0.0375977C4.04071 0.0375977 3.76727 0.338379 3.76727 0.693848C3.76727 1.29791 3.27758 1.7876 2.67352 1.7876C1.68915 1.7876 0.923523 2.58057 0.923523 3.5376V12.2876C0.923523 13.272 1.68915 14.0376 2.67352 14.0376H11.4235C12.3806 14.0376 13.1735 13.272 13.1735 12.2876V3.5376C13.1735 2.58057 12.3806 1.7876 11.4235 1.7876ZM10.4391 5.2876C11.2244 5.2876 11.861 5.92419 11.861 6.70947C11.861 7.49475 11.2244 8.13135 10.4391 8.13135H9.12665C8.34137 8.13135 7.70477 7.49475 7.70477 6.70947C7.70477 5.92419 8.34137 5.2876 9.12665 5.2876H10.4391ZM4.9704 5.2876C5.75568 5.2876 6.39227 5.92419 6.39227 6.70947C6.39227 7.49475 5.75568 8.13135 4.9704 8.13135H3.6579C2.87262 8.13135 2.23602 7.49475 2.23602 6.70947C2.23602 5.92419 2.87262 5.2876 3.6579 5.2876H4.9704ZM2.23602 12.2876V11.522C2.23602 10.3743 3.16643 9.44385 4.31415 9.44385H4.75165C5.65774 9.44385 6.39227 10.1784 6.39227 11.0845C6.39227 11.9906 5.65774 12.7251 4.75165 12.7251H2.67352C2.42743 12.7251 2.23602 12.5337 2.23602 12.2876ZM11.4235 12.7251H9.3454C8.43931 12.7251 7.70477 11.9906 7.70477 11.0845C7.70477 10.1784 8.43931 9.44385 9.3454 9.44385H9.7829C10.9306 9.44385 11.861 10.3743 11.861 11.522V12.2876C11.861 12.5337 11.6423 12.7251 11.4235 12.7251Z"
                                            fill="white" />
                                    </svg>Friday 3 February 2023</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-3 mb-lg-0 wow animated fadeInUp">
                            <div class="media-box-view-cont">
                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/media2.png" alt="" class="media-images" />
                                <div class="member-layer-content">
                                    <h6>Programmer and icon control the system in data center room</h6>
                                    <p><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.4235 1.7876C10.8195 1.7876 10.3298 1.29791 10.3298 0.693848C10.3298 0.338379 10.029 0.0375977 9.67352 0.0375977C9.3454 0.0375977 9.01727 0.338379 9.01727 0.693848C9.01727 1.29791 8.52758 1.7876 7.92352 1.7876H6.17352C5.56946 1.7876 5.07977 1.29791 5.07977 0.693848C5.07977 0.338379 4.77899 0.0375977 4.42352 0.0375977C4.04071 0.0375977 3.76727 0.338379 3.76727 0.693848C3.76727 1.29791 3.27758 1.7876 2.67352 1.7876C1.68915 1.7876 0.923523 2.58057 0.923523 3.5376V12.2876C0.923523 13.272 1.68915 14.0376 2.67352 14.0376H11.4235C12.3806 14.0376 13.1735 13.272 13.1735 12.2876V3.5376C13.1735 2.58057 12.3806 1.7876 11.4235 1.7876ZM10.4391 5.2876C11.2244 5.2876 11.861 5.92419 11.861 6.70947C11.861 7.49475 11.2244 8.13135 10.4391 8.13135H9.12665C8.34137 8.13135 7.70477 7.49475 7.70477 6.70947C7.70477 5.92419 8.34137 5.2876 9.12665 5.2876H10.4391ZM4.9704 5.2876C5.75568 5.2876 6.39227 5.92419 6.39227 6.70947C6.39227 7.49475 5.75568 8.13135 4.9704 8.13135H3.6579C2.87262 8.13135 2.23602 7.49475 2.23602 6.70947C2.23602 5.92419 2.87262 5.2876 3.6579 5.2876H4.9704ZM2.23602 12.2876V11.522C2.23602 10.3743 3.16643 9.44385 4.31415 9.44385H4.75165C5.65774 9.44385 6.39227 10.1784 6.39227 11.0845C6.39227 11.9906 5.65774 12.7251 4.75165 12.7251H2.67352C2.42743 12.7251 2.23602 12.5337 2.23602 12.2876ZM11.4235 12.7251H9.3454C8.43931 12.7251 7.70477 11.9906 7.70477 11.0845C7.70477 10.1784 8.43931 9.44385 9.3454 9.44385H9.7829C10.9306 9.44385 11.861 10.3743 11.861 11.522V12.2876C11.861 12.5337 11.6423 12.7251 11.4235 12.7251Z"
                                            fill="white" />
                                    </svg>Friday 3 February 2023</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-3 mb-lg-0 wow animated fadeInUp">
                            <div class="media-box-view-cont">
                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/media3.png" alt="" class="media-images" />
                                <div class="member-layer-content">
                                    <h6>Programmer and icon control the system in data center room</h6>
                                    <p><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.4235 1.7876C10.8195 1.7876 10.3298 1.29791 10.3298 0.693848C10.3298 0.338379 10.029 0.0375977 9.67352 0.0375977C9.3454 0.0375977 9.01727 0.338379 9.01727 0.693848C9.01727 1.29791 8.52758 1.7876 7.92352 1.7876H6.17352C5.56946 1.7876 5.07977 1.29791 5.07977 0.693848C5.07977 0.338379 4.77899 0.0375977 4.42352 0.0375977C4.04071 0.0375977 3.76727 0.338379 3.76727 0.693848C3.76727 1.29791 3.27758 1.7876 2.67352 1.7876C1.68915 1.7876 0.923523 2.58057 0.923523 3.5376V12.2876C0.923523 13.272 1.68915 14.0376 2.67352 14.0376H11.4235C12.3806 14.0376 13.1735 13.272 13.1735 12.2876V3.5376C13.1735 2.58057 12.3806 1.7876 11.4235 1.7876ZM10.4391 5.2876C11.2244 5.2876 11.861 5.92419 11.861 6.70947C11.861 7.49475 11.2244 8.13135 10.4391 8.13135H9.12665C8.34137 8.13135 7.70477 7.49475 7.70477 6.70947C7.70477 5.92419 8.34137 5.2876 9.12665 5.2876H10.4391ZM4.9704 5.2876C5.75568 5.2876 6.39227 5.92419 6.39227 6.70947C6.39227 7.49475 5.75568 8.13135 4.9704 8.13135H3.6579C2.87262 8.13135 2.23602 7.49475 2.23602 6.70947C2.23602 5.92419 2.87262 5.2876 3.6579 5.2876H4.9704ZM2.23602 12.2876V11.522C2.23602 10.3743 3.16643 9.44385 4.31415 9.44385H4.75165C5.65774 9.44385 6.39227 10.1784 6.39227 11.0845C6.39227 11.9906 5.65774 12.7251 4.75165 12.7251H2.67352C2.42743 12.7251 2.23602 12.5337 2.23602 12.2876ZM11.4235 12.7251H9.3454C8.43931 12.7251 7.70477 11.9906 7.70477 11.0845C7.70477 10.1784 8.43931 9.44385 9.3454 9.44385H9.7829C10.9306 9.44385 11.861 10.3743 11.861 11.522V12.2876C11.861 12.5337 11.6423 12.7251 11.4235 12.7251Z"
                                            fill="white" />
                                    </svg>Friday 3 February 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <a href="" class="more-media-btn wow animated fadeInUp">Show All News</a>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-Events" role="tabpanel" aria-labelledby="nav-Events-tab" tabindex="0">2</div>
                <div class="tab-pane fade" id="nav-Advertisments" role="tabpanel" aria-labelledby="nav-Advertisments-tab"
                    tabindex="0">3</div>
                <div class="tab-pane fade" id="nav-Photos" role="tabpanel" aria-labelledby="nav-Photos-tab" tabindex="0">4</div>
                <div class="tab-pane fade" id="nav-Videos" role="tabpanel" aria-labelledby="nav-Videos-tab" tabindex="0">5</div>
                <div class="tab-pane fade" id="nav-Initiatives" role="tabpanel" aria-labelledby="nav-Initiatives-tab"
                    tabindex="0">6</div>
            </div>
        </div>
    </div>

    {/* <!-- download section start  --> */}
    <div class="section-download-ksm">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 dwl-border-r mb-4 mb-lg-0 wow animated fadeInUp">
                    <div
                        class="app-download-icvd d-block d-lg-flex d-md-flex align-items-center gap-3 text-center text-lg-start text-md-start">
                        <div class="bg-app-icon">
                            <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/apple-icon.svg" alt="" /></a>
                            <div class="app-center-hr"></div>
                            <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/playstore-icon.svg" alt="" /></a>
                        </div>
                        <div class="download-kkk-text">
                            <h6>Download App</h6>
                            <p>On the following platforms</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 dwl-border-r mb-4 mb-lg-0 wow animated fadeInUp">
                    <div
                        class="app-download-icvd d-block d-lg-flex d-md-flex align-items-center gap-3 text-center text-lg-start text-md-start">
                        <div class="bg-app-icon bg-transparent">
                            <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/email-signup.svg" alt="" /></a>
                        </div>
                        <div class="download-kkk-text">
                            <h6>Newsletter Signup</h6>
                            <p>Subscribe to our weekly newsletter</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 mb-4 mb-lg-0 wow animated fadeInUp">
                    <div
                        class="app-download-icvd d-block d-lg-flex d-md-flex align-items-center gap-3 text-center text-lg-start text-md-start">
                        <div class="bg-app-icon bg-transparent">
                            <a href=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/logo_bule.png" alt="" class="logo-here-f" /></a>
                        </div>
                        <div class="download-kkk-text">
                            <h6>Channels</h6>
                            <p>for service and to communicate with Authority</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- footer section start    --> */}
    <footer class="footer-ksmart-bg">
        <div class="container">
            <ul class="undifine-footer-vb wow animated fadeInUp">
                <li><a href="">FAQ</a></li>
                <li><a href="">Sitemap</a></li>
                <li><a href="">Contact Us</a></li>
                <li><a href="">Archive</a></li>
                <li><a href="">ICP Email</a></li>
                <li><a href="">Suppliers’ inquiries</a></li>
                <li><a href="">Help</a></li>
                <li><a href="">Vendor Portal</a></li>
                <li><a href="">Job Application</a></li>
                <li><a href="">Emergency Notices</a></li>
                <li><a href="">Digital Customer Policy</a></li>
            </ul>
            <div class="row">
                <div class="col-lg-3 wow animated fadeInUp">
                    <div class="counter-call0main text-center">
                        <h4>Visitors Counter</h4>
                        <a href="">3,546,646</a>
                    </div>
                </div>
                <div class="col-lg-6 wow animated fadeInUp">
                    <div class="social-media-kt text-center">
                        <h4>Social Media & Programs</h4>
                        <ul>
                            <li><a href="" alt="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip"
                                data-bs-placement="top" data-bs-title="Facebook"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/social1.svg" alt="" /></a></li>
                            <li><a href="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="Twitter"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/social2.svg" alt="" /></a></li>
                            <li><a href="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="Instagram"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/social3.svg" alt="" /></a></li>
                            <li><a href="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="Linkdin"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/social4.svg" alt="" /></a></li>
                            <li><a href="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="Messenger"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/social5.svg" alt="" /></a></li>
                            <li><a href="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title=""><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/social6.svg" alt="" /></a></li>
                            <li><a href="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="pinterest"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/social7.svg" alt="" /></a></li>
                            <li><a href="" alt="" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip"
                                data-bs-placement="top" data-bs-title="Youtube"><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/youtube.svg" alt="" /></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 wow animated fadeInUp">
                    <div class="counter-call0main text-center">
                        <h4>Call Center</h4>
                        <a href="">XX434564 (Available 24/7)</a>
                    </div>
                </div>
            </div>
            <div class="row logo-texet-spTop">
                <div class="footer-logo-sm text-center wow animated fadeInUp">
                    <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/logo_bule.png" alt="" />
                </div>
                <ul class="undifine-footer-vb wow animated fadeInUp">
                    <li><a href="">Accessibility</a></li>
                    <li><a href="">Disclaimer</a></li>
                    <li><a href="">Terms & Conditions</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Copyright</a></li>
                    <li><a href="">ICP Terminology</a></li>
                    <li><a href="">Customer Charter</a></li>
                </ul>
            </div>
        </div>
        <div class="copygirht_footer">
            <div class="h6 wow animated fadeInUp">Copyright © 2023 Ksmart For Identity, Citizenship, Customs & Port Security.
                All rights reserved.</div>
        </div>
    </footer>
</React.Fragment>);

export default KsmartHome;