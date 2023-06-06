import React, { useState, Fragment, useEffect } from "react";
import { CardText, FormStep, OTPInput, CardLabelError, Card } from "@egovernments/digit-ui-react-components";
import useInterval from "../../../hooks/useInterval";
import Background from "../../../components/Background";

const OTP_TIMEOUT = 90;

const SelectOtp = ({ config, otp, onOtpChange, onResend, onSelect, t, error, userType = "citizen" }) => {
  const [timeLeft, setTimeLeft] = useState(OTP_TIMEOUT);

  useInterval(
    () => {
      setTimeLeft(timeLeft - 1);
    },
    timeLeft > 0 ? 1000 : null
  );

  const handleResendOtp = () => {
    onResend();
    setTimeLeft(OTP_TIMEOUT);
  };

  if (userType === "employee") {
    return (
      <Fragment>
        <OTPInput length={6} onChange={onOtpChange} value={otp} style={{ backgroundColor: "red" }} />
        {timeLeft > 0 ? (
          <CardText>{`${t("CS_RESEND_ANOTHER_OTP")} ${timeLeft} ${t("CS_RESEND_SECONDS")}`}</CardText>
        ) : (
          <p className="card-text-button" onClick={handleResendOtp}>
            {t("CS_RESEND_OTP")}
          </p>
        )}
        {!error && <CardLabelError>{t("CS_INVALID_OTP")}</CardLabelError>}
      </Fragment>
    );
  }
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
          className="loginCard hidden-md hidden-xs"
          // style={{ margin: "0 auto", height: "600px", borderRadius: "25px", backgroundColor: "#00377B" }}
        >
          <div style={{ justifyContent: "space-around" }}>
            <div className="language-button-container hidden-md hidden-xs">
              <h1 className="logostyle">
                {/* <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image" style={{ maxWidth: "450px" }} /> */}
              </h1>
              <div style={{ textAlign: "center" }}>
                <div>
                  <img
                    className="loginImage"
                    src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Group.png"
                    alt="No Image"
                    style={{ maxWidth: "700px", marginTop: "70px" }}
                  />
                  <br></br>
                </div>
              </div>
              <div style={{ justifyContent: "space-between !important" }}></div>
            </div>
          </div>
        </Card>
      )}
      <div className="bannerCard otpCard removeBottomMargin" style={{ margin: "0 auto", width: "40%" }}>
        <div style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%" }}>
          <div className="language-button-container">
            <div>
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                {/* <img
                  src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/mail.png"
                  alt="No Image"
                  style={{ maxWidth: "100px", marginLeft: "121px", marginRight: "121px" }}
                /> */}

                <label style={{ fontSize: "25px", marginBottom: "20px !important", color: "#00377b", fontWeight: "600" }}>{`${t(
                  "CS_LOGIN_OTP"
                )}`}</label>
                <br></br>
                <label style={{ fontSize: "15px", marginTop: "20px !important", color: "#3b669b", fontWeight: "450" }}>
                  {`${t("CS_LOGIN_OTP_TEXT")}`}
                  {`${t("CORE_COMMON_MOBILE_NUMBER")}`}
                </label>
              </div>
            </div>
            <FormStep
              onSelect={onSelect}
              config={config}
              t={t}
              isDisabled={otp?.length !== 6}
              cardStyle={{
                border: "none",
                borderRadius: "12px",
                background: "#EDF2FA",
                boxShadow: "none",
              }}
            >
              <OTPInput length={6} onChange={onOtpChange} value={otp} />
              {timeLeft > 0 ? (
                <CardText style={{ color: "#3b669b", fontWeight: "350" }}>{`${t("CS_RESEND_ANOTHER_OTP")} ${timeLeft} ${t(
                  "CS_RESEND_SECONDS"
                )}`}</CardText>
              ) : (
                <p className="card-text-button" style={{ color: "#3b669b", fontWeight: "350" }} onClick={handleResendOtp}>
                  {t("CS_RESEND_OTP")}
                </p>
              )}
              {!error && <CardLabelError style={{ color: "#3b669b", fontWeight: "350" }}>{t("CS_INVALID_OTP")}</CardLabelError>}
            </FormStep>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default SelectOtp;
