import React from 'react'

function Services() {
    return (
        <div className="services-ksmart-main-bg">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="services-heading-fx d-flex align-items-center justify-content-between wow animated fadeInUp">
                            <h2>Services</h2>
                            <a href="" className="btn-view-service">Show All Services </a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="left_services-webv wow animated fadeInUp">
                            <nav className="services-tabs-cat pt-4">
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-serviceone-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-serviceone" type="button" role="tab" aria-controls="nav-serviceone"
                                        aria-selected="true"><span><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/medal.png" alt="" /></span> Frequently Used
                                        Services</button>
                                    <button className="nav-link" id="nav-servicetwo-tab" data-bs-toggle="tab" data-bs-target="#nav-servicetwo"
                                        type="button" role="tab" aria-controls="nav-servicetwo" aria-selected="false"><span><img
                                            src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service2.svg" alt="" /></span> Priority Services</button>
                                    <button className="nav-link" id="nav-servicethree-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-servicethree" type="button" role="tab" aria-controls="nav-servicethree"
                                        aria-selected="false"><span><img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service3.svg" alt="" /></span> Smart ULB</button>
                                    <button className="nav-link" id="nav-servicefour-tab" data-bs-toggle="tab" data-bs-target="#nav-servicefour"
                                        type="button" role="tab" aria-controls="nav-servicefour" aria-selected="false"><span><img
                                            src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service4.svg" alt="" /></span> Predictive Services</button>
                                    <button className="nav-link" id="nav-servicefive-tab" data-bs-toggle="tab" data-bs-target="#nav-servicefive"
                                        type="button" role="tab" aria-controls="nav-servicefive" aria-selected="false"><span><img
                                            src="https://ulb-logos.s3.ap-south-1.amazonaws.com/service5.svg" alt="" /></span> K-Doc Cloud</button>
                                </div>
                            </nav>
                            <lottie-player className="mt-5" src="https://ulb-logos.s3.ap-south-1.amazonaws.com/55177.json" background="transparent" speed="1" loop=""
                                autoplay=""></lottie-player>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
                                tabindex="0">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Civil Registration <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem1.png" alt="" />
                                            </div>
                                            <h5>Death Registration | Birth Registration | Marriage Registration</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Public Grievances Redressal <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem2.png" alt="" />
                                            </div>
                                            <h5>New Grievance | RTI | Status</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Citizen Welfare <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem3.png" alt="" />
                                            </div>
                                            <h5>Housing Assistance | Social Security Pensions | Financial Assistances & Allowances</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Business Facilitation <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem4.png" alt="" />
                                            </div>
                                            <h5>IFTE & OS License | Industry | Factory | Workshop Establishment | Installation Permit</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Building Permit <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem5.png" alt="" />
                                            </div>
                                            <h5>Permits and approvals | Licensee services | Building Plan Scrutiny Services | To get an</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Taxt <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem6.png" alt="" />
                                            </div>
                                            <h5>Property Tax | Professional Tex | Water Vessels | Entertainment Tax</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Civil Registration <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem7.png" alt="" />
                                            </div>
                                            <h5>Death Registration | Birth Registration | Marriage Registration</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 wow animated fadeInUp">
                                        <div className="services-box-depend">
                                            <div className="heading-serv d-flex justify-content-between align-items-center">
                                                <h4>Civic Amenities & Public Utilities <span><i className="fal fa-long-arrow-right"></i></span></h4>
                                                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/sitem8.png" alt="" />
                                            </div>
                                            <h5>Crematorium | Water Supply Ambulance Mobile Mortuary | Sewage Treatment</h5>
                                            <div className="bottom-service-cont d-flex align-items-center justify-content-between mt-1">
                                                <a href="" className="service-details-btn">Service Deetails</a>
                                                <a href="" className="service-start-btn">Service Start</a>
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
    )
}

export default Services