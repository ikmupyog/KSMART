import React, { useState, Fragment,useEffect } from "react";
import {  CardText, FormStep, OTPInput, CardLabelError, Card } from "@egovernments/digit-ui-react-components";
import useInterval from "../../../../../modules/core/src/hooks/useInterval";
import { OTP_TIMEOUT } from "../../config/constants";

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
    <div>
     
      <Card className="bannerCard removeBottomMargin" style={{ margin: "0 auto",width: "40%"  }}>
        <div style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%", }}>

          <div className="language-button-container"  >
            <div>
              <div style={{ textAlign: "center", margin: "0 auto" }}>

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
    </div>
  );
};

export default SelectOtp;
