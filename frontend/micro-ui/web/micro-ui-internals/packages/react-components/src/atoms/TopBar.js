import React, { useState } from "react";
// import { Dropdown, Hamburger, TopBar as TopBarComponent } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import Hamburger from "./Hamburger";
import Dropdown from "./Dropdown";
import CustomButton from "./CustomButton";
import { NotificationBell } from "./svgindex";

const TopBar = ({
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
    <div className="navbar">
      <div className="mainNav">
       
      <div className="center-container">
        {isMobile && <Hamburger handleClick={toggleSidebar} />}
        <img className="city" id="topbar-logo" src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="K-SMART" />
        <h3>{cityOfCitizenShownBesideLogo}</h3>
        </div>
        <div className="leftContainerNav">
          <div className="left" style={{marginRight:"20px"}}>
            <ChangeLanguage dropdown={true} />
          </div>
          <div className="RightMostTopBarOptions">
            {!hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? (
              <div className="EventNotificationWrapper" onClick={onNotificationIconClick}>
                {notificationCountLoaded && notificationCount ? (
                  <span>
                    <p>{notificationCount}</p>
                  </span>
                ) : null}
                <NotificationBell />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  img: PropTypes.string,
};

TopBar.defaultProps = {
  img: undefined,
};

export default TopBar;
