import React, { useRef, useEffect, useState } from "react";
import { CardText, FormStep, Card, BackButton } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import Background from "../../../components/Background";

const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config }) => {
  // useEffect(() => {
  //   const windowWidth = useRef(window.innerWidth);
  //   console.log(windowWidth.current);

  // }, [windowWidth]);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  return (
    <Background>
      {screenSize.dynamicWidth > 1250 && (
        <div className=" loginCard  hidden-md hidden-xs">
          <div style={{ justifyContent: "space-around" }}>
            <div className="language-button-container hidden-md hidden-xs">
              <div style={{ textAlign: "center" }}>
                <img
                  className="loginImage"
                  src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Group.png"
                  alt="No Image"
                  style={{
                    maxWidth: "700px",
                    marginTop: "70px",
                  }}
                />
                <br></br>
              </div>
              <div style={{ justifyContent: "space-between !important" }}></div>
            </div>
          </div>
        </div>
      )}
      <div className="loginBannerCard removeBottomMargin" style={{ backgroundColor: "#EDF2FA", border: "none", boxShadow: "none" }}>
        <div style={{ justifyContent: "space-around" }}>
          <div className="language-button-container">
            <div>
              <div className="loginMobile" style={{ margin: "0 auto" }}>
                <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Mobile+application.png" alt="No Image" style={{ maxWidth: "100px" }} />

                <label style={{ fontSize: "25px", marginBottom: "20px !important", color: "#00377b", fontWeight: "600", marginRight: "50px" }}>{`${t(
                  "CS_LOGIN_PROVIDE_MOBILE_NUMBER"
                )}`}</label>
                <br></br>
                <label style={{ fontSize: "15px", marginTop: "20px !important", color: "#3b669b", fontWeight: "490" }}>{`${t(
                  "CS_LOGIN_TEXT"
                )}`}</label>
                <FormStep
                  isDisabled={mobileNumber.length !== 10}
                  onSelect={onSelect}
                  config={config}
                  t={t}
                  componentInFront="+91"
                  onChange={onMobileChange}
                  value={mobileNumber}
                  cardStyle={{
                    border: "none",
                    borderRadius: "12px",
                    background: "#EDF2FA",
                    boxShadow: "none",
                    width: "100%",
                    margin: "0",
                    padding: "0",
                  }}
                ></FormStep>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="loginRegister">
        <div className="language-button-container">
          <div style={{ textAlign: "center", marginTop: "250px" }}>
            <img
              src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Mobile+application.png"
              alt="No Image"
              style={{ maxWidth: "100px", marginLeft: "40px", marginRight: "180px" }}
            />
            <div className="loginTitle">
              <label className="loginLabel">{`${t("CS_LOGIN_PROVIDE_MOBILE_NUMBER")}`}</label>
            </div>
            <label className="loginText">{`${t("CS_LOGIN_TEXT")}`}</label>
            <FormStep
              isDisabled={mobileNumber.length !== 10}
              onSelect={onSelect}
              config={config}
              t={t}
              componentInFront="+91"
              onChange={onMobileChange}
              value={mobileNumber}
              cardStyle={{
                border: "none",
                marginLeft: "25px",
                borderRadius: "12px",
                background: "#EDF2FA",
                boxShadow: "none",
                width: "550px",
              }}
            ></FormStep>{" "}
          </div>
        </div>
      </div> */}
    </Background>
  );
};

export default SelectMobileNumber;
