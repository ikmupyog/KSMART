import React, { useState } from "react";
// import { Dropdown, Hamburger, TopBarKsmart as TopBarComponent } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import Hamburger from "./Hamburger";
import Dropdown from "./Dropdown";
import CustomButton from "./CustomButton";
import { NotificationBell } from "./svgindex";

const TopBarKsmart = ({
    img,
    isMobile,
    logoUrl,
    onLogout,
    toggleSidebar,
    ulb,
    userDetails,
    notificationCount,
    notificationCountLoaded,
    cityOfCitizenShownBesideLogo,
    onNotificationIconClick,
    hideNotificationIconOnSomeUrlsWhenNotLoggedIn,
    cityDetails,
    t,
}) => {
    const ChangeLanguage = (prop) => {
        const isDropdown = prop.dropdown || false;
        const { data: storeData, isLoading } = Digit.Hooks.useStore.getInitData();
        const { languages, stateInfo } = storeData || {};
        const selectedLanguage = Digit.StoreData.getCurrentLanguage();
        const [selected, setselected] = useState(selectedLanguage);
        const handleChangeLanguage = (language) => {
            setselected(language.value);
            Digit.LocalizationService.changeLanguage(language.value, stateInfo.code);
        };

        if (isLoading) return null;

        if (isDropdown) {
            return (
                <div>
                    <Dropdown
                        option={languages}
                        selected={languages.find((language) => language.value === selectedLanguage)}
                        optionKey={"label"}
                        select={handleChangeLanguage}
                        freeze={true}
                        customSelector={<label className="cp">{languages.find((language) => language.value === selected).label}</label>}
                    />
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div style={{ marginBottom: "5px" }}>Language</div>
                    <div className="language-selector">
                        {languages.map((language, index) => (
                            <div className="language-button-container" key={index}>
                                <CustomButton
                                    selected={language.value === selected}
                                    text={language.label}
                                    onClick={() => handleChangeLanguage(language)}
                                ></CustomButton>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            );
        }
    };
    //  let citizenHomeCity =Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY" )
    return (
        // <div className="navbar">
        //   <div className="mainNav">

        //   <div className="center-container">
        //     {isMobile && <Hamburger handleClick={toggleSidebar} />}
        //     <img className="city" id="topbar-logo" src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="K-SMART" />
        //     <h3>{cityOfCitizenShownBesideLogo}</h3>
        //     </div>
        //     <div className="leftContainerNav">
        //       <div className="left" style={{marginRight:"20px"}}>
        //         <ChangeLanguage dropdown={true} />
        //       </div>
        //       <div className="RightMostTopBarOptions">
        //         {!hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? (
        //           <div className="EventNotificationWrapper" onClick={onNotificationIconClick}>
        //             {notificationCountLoaded && notificationCount ? (
        //               <span>
        //                 <p>{notificationCount}</p>
        //               </span>
        //             ) : null}
        //             <NotificationBell />
        //           </div>
        //         ) : null}
        //       </div>
        //     </div>
        //   </div>
        // </div>

        <div className="desktop_navbar-main d-none d-lg-block">
            <div className="ks-topNavbar animated fadeInUp">
                <div className="container">
                    <nav className="sm-navigatin-flex d-flex align-items-center justify-content-between">
                        <div className="ksmart-logo-fx d-flex align-items-center gap-5">
                            <a href="">
                            <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image"  /> 
                                {/* <img src="images/k-smart-logo.png" alt="" className="k-logo1"></img> */}
                                </a>
                            <div className="center-ln-logo"></div>
                            <a href=""><img src="images/Government_of_Kerala_Logo.png" alt="" className="k-logo2"></img></a>
                        </div>
                        <ul className="login-regis-group d-flex align-items-center gap-4">
                            <li><a href="" className="h-login-btn"><img src="images/login-icon.svg" alt=""></img> Register</a></li>
                            <li><a href="" className="h-register-btn"><img src="images/login-icon.svg" alt=""></img> Login</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

TopBarKsmart.propTypes = {
    img: PropTypes.string,
};

TopBarKsmart.defaultProps = {
    img: undefined,
};

export default TopBarKsmart;
