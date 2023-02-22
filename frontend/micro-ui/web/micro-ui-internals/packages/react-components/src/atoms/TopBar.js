import React, { useState } from "react";
import PropTypes from "prop-types";
import Hamburger from "./Hamburger";
import { NotificationBell } from "./svgindex";

const TopBar = ({ img, isMobile, logoUrl, onLogout, toggleSidebar, ulb, userDetails, notificationCount, notificationCountLoaded, cityOfCitizenShownBesideLogo, onNotificationIconClick, hideNotificationIconOnSomeUrlsWhenNotLoggedIn,cityDetails,t }) => {
  return (
    <div className="navbar">
      <div className="center-container">
        {isMobile && <Hamburger handleClick={toggleSidebar} />}
        <img className="city" id="topbar-logo" src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="K-SMART" />

        {cityDetails?.city?.ulbGrade && (
          <h3>
            {" "}
            {t(cityDetails?.i18nKey).toUpperCase()}{" "}
            {t(`ULBGRADE_${cityDetails?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`).toUpperCase()}
          </h3>
        )}
      
         {/* <h3>{cityOfCitizenShownBesideLogo}</h3> */}
        
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
  );
};

TopBar.propTypes = {
  img: PropTypes.string,
};

TopBar.defaultProps = {
  img: undefined,
};

export default TopBar;
