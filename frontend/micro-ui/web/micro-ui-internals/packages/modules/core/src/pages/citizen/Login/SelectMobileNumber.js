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
        <Card
          className="bannerCard removeBottomMargin hidden-md hidden-xs"
          style={{ marginBottom: "20px", marginLeft: "60px", backgroundColor: "#00377B", height: "680px", width: "45%", borderRadius: "25px" }}
        >
          <div style={{ justifyContent: "space-around", padding: "0px 20px 200px 0px", width: "100%" }}>
            <div className="language-button-container hidden-md hidden-xs">
              <div style={{ textAlign: "center", marginRight: "100px" }}>
                <img
                  className="loginImage"
                  src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Group.png"
                  alt="No Image"
                  style={{
                    maxWidth: "700px",
                    marginLeft: "0px",
                    marginRight: "70px",
                    marginTop: "120px",
                  }}
                />
                {/* <label style={{ fontSize: "25px", marginBottom: "20px !important" }}>{`${t("CS_LOGIN_PROVIDE_MOBILE_NUMBER")}`}</label> */}
                <br></br>
              </div>
              <div style={{ justifyContent: "space-between !important" }}></div>
            </div>
          </div>
        </Card>
      )}
      {/* </div>
      </div> */}
      {/* <Card> */}
      <div style={{ justifyContent: "space-around", padding: "10px 100px 300px 40px", margin: "14px 100px 0px 0px" }}>
        <div className="language-button-container">
          <div style={{ textAlign: "center", marginTop: "250px" }}>
            <img
              src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Mobile+application.png"
              alt="No Image"
              style={{ maxWidth: "100px", marginLeft: "10px", marginRight: "180px" }}
            />
            <div style={{ margin: "0px 200px 0px 0px" }}>
              <label style={{ fontSize: "23px", color: "#00377B", fontWeight: "600" }}>{`${t("CS_LOGIN_PROVIDE_MOBILE_NUMBER")}`}</label>
            </div>
            <br></br>
            <label
              style={{
                fontSize: "14px",
                color: "#3B669B",
                fontWeight: "500",
              }}
            >{`${t("CS_LOGIN_TEXT")}`}</label>
          </div>

          <FormStep
            isDisabled={mobileNumber.length !== 10}
            onSelect={onSelect}
            config={config}
            t={t}
            componentInFront="+91"
            onChange={onMobileChange}
            value={mobileNumber}
            cardStyle={{ border: "none", marginRight: "10px", borderRadius: "12px" }}
          ></FormStep>
        </div>
      </div>
      {/* </Card> */}
    </Background>
  );
};

export default SelectMobileNumber;
