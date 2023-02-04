import React, { useState, Fragment,useEffect } from "react";
import { ButtonSelector, CardText, FormStep, LinkButton, OTPInput, CardLabelError, Card } from "@egovernments/digit-ui-react-components";
import useInterval from "../../../hooks/useInterval";
import Background from "../../../components/Background";

const SelectOtp = ({ config, otp, onOtpChange, onResend, onSelect, t, error, userType = "citizen" }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useInterval(
    () => {
      setTimeLeft(timeLeft - 1);
    },
    timeLeft > 0 ? 1000 : null
  );

  const handleResendOtp = () => {
    onResend();
    setTimeLeft(2);
  };

  if (userType === "employee") {
    return (
      <Fragment>
        <OTPInput length={6} onChange={onOtpChange} value={otp} />
        {timeLeft > 0 ? (
          <CardText>{`${t("CS_RESEND_ANOTHER_OTP")} ${timeLeft} ${t("CS_RESEND_SECONDS")}`}</CardText>
        ) : (
          <p className="card-text-button" onClick={handleResendOtp}>
            {t("CS_RESEND_OTP")}
          </p>
        )}
        {!error && <CardLabelError>{t("CS_INVALID_OTP")}</CardLabelError>}
      </Fragment>
    )
  }
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return (() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])
  return (
    <Background>
      {screenSize.dynamicWidth > 1250 && (
        <Card className="bannerCard removeBottomMargin hidden-md hidden-xs" style={{ margin: "0 auto", backgroundColor: "#6e80e5" }}>
          <div style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%", width: "100%" }}>

            <div className="language-button-container hidden-md hidden-xs"  >
              <h1 className="logostyle">
                {/* <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image" style={{ maxWidth: "450px" }} /> */}

              </h1>
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <div>
                  <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/citizenlogin.png" alt="No Image"
                    style={{ maxWidth: "490px", marginLeft: "80px", marginRight: "80px" }} />
                  <label style={{ fontSize: "25px", marginBottom: "20px !important" }}>{`${t("Provide Your One Time Password")}`}</label><br></br>
                  {/* <label style={{ fontSize: "17px", marginTop: "20px !important" }}>Kerala - Solutions for Managing Administrative Reformation and Transformation.</label> */}
                </div>
              </div>
              <div style={{ justifyContent: "space-between !important" }} >

                {/*<span style={{ marginRight: "60%" }} >2023&copy;K-Smart</span>&nbsp;
            <span  >
              <a className="text-white text-link" href="#">Legal</a>&nbsp;&nbsp;
              <a className="text-white text-link" href="#">Privacy</a>
            </span> */}

              </div>
            </div>
          </div>
        </Card>)}
      <Card className="bannerCard removeBottomMargin" style={{ margin: "0 auto",width: "40%"  }}>
        <div style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%", }}>

          <div className="language-button-container"  >
            <div>
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/mail.png" alt="No Image"
                  style={{ maxWidth: "100px", marginLeft: "121px", marginRight: "121px" }} />

                <label style={{ fontSize: "25px", marginBottom: "20px !important" }}>{`${t("CS_LOGIN_OTP")}`}</label><br></br>
                <label style={{ fontSize: "15px", marginTop: "20px !important" }}>{`${t("CS_LOGIN_OTP_TEXT")}`}{`${t("CORE_COMMON_MOBILE_NUMBER")}`}</label>
              </div>
            </div>
            <FormStep onSelect={onSelect} config={config} t={t} isDisabled={otp?.length !== 6}>
              <OTPInput length={6} onChange={onOtpChange} value={otp} />
              {timeLeft > 0 ? (
                <CardText>{`${t("CS_RESEND_ANOTHER_OTP")} ${timeLeft} ${t("CS_RESEND_SECONDS")}`}</CardText>
              ) : (
                <p className="card-text-button" onClick={handleResendOtp}>
                  {t("CS_RESEND_OTP")}
                </p>
              )}
              {!error && <CardLabelError>{t("CS_INVALID_OTP")}</CardLabelError>}
            </FormStep>
          </div>
        </div>
      </Card>
    </Background>
  );
};

export default SelectOtp;
