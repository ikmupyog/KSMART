import { BackButton, Dropdown, FormComposer, Loader, Toast } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../../components/Background";
import Header from "../../../components/Header";

const ForgotPassword = ({ config: propsConfig, t }) => {
  const { data: cities, isLoading } = Digit.Hooks.useTenants();
  const [user, setUser] = useState(null);
  const { data: storeData, isLoading: isStoreLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const history = useHistory();
  const [showToast, setShowToast] = useState(null);
  const getUserType = () => Digit.UserService.getType();
  let sourceUrl = "https://s3.ap-south-1.amazonaws.com/egov-qa-assets";
  const pdfUrl = "https://pg-egov-assets.s3.ap-south-1.amazonaws.com/Upyog+Code+and+Copyright+License_v1.pdf";

  useEffect(() => {
    if (!user) {
      Digit.UserService.setType("employee");
      return;
    }
    Digit.UserService.setUser(user);
    const redirectPath = location.state?.from || "/digit-ui/employee";
    history.replace(redirectPath);
  }, [user]);

  const closeToast = () => {
    setShowToast(null);
  };

  const onForgotPassword = async (data) => {
    if (!data.city) {
      alert("Please Select City!");
      return;
    }
    const requestData = {
      otp: {
        mobileNumber: data.mobileNumber,
        userType: getUserType().toUpperCase(),
        type: "passwordreset",
        tenantId: data.city.code,
      },
    };
    try {
      await Digit.UserService.sendOtp(requestData, data.city.code);
      history.push(`/digit-ui/employee/user/change-password?mobile_number=${data.mobileNumber}&tenantId=${data.city.code}`);
    } catch (err) {
      setShowToast(err?.response?.data?.error?.fields?.[0]?.message || "Invalid login credentials!");
      setTimeout(closeToast, 5000);
    }
  };

  const navigateToLogin = () => {
    history.replace("/digit-ui/employee/login");
  };

  const [userId, city] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: {
            name: userId.name,
            componentInFront: "+91",
          },
          isMandatory: true,
        },
        {
          label: t(city.label),
          type: city.type,
          populators: {
            name: city.name,
            customProps: {},
            component: (props, customProps) => (
              <Dropdown
                option={cities}
                optionKey="name"
                id={city.name}
                className="login-city-dd"
                select={(d) => {
                  props.onChange(d);
                }}
                {...customProps}
              />
            ),
          },
          isMandatory: true,
        },
      ],
    },
  ];
  const mystyle = {
    background: "#bc5bfc",
    backgroundImage: "-webkit-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "-moz-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "-ms-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "-o-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "linear-gradient(to bottom, #bc5bfc, #2980b9)",
    webkitBorderRadius: "5",
    mozBorderRadius: "5",
    borderRadius: "5px",
    color: "#ffffff",
    fontSize: "17px !important",
    fontWeight: "400 !important",
    textDecoration: "none",
    lineHeight: "0 !important",
    fontFamily: "system-ui !important",
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Background>
      <div className="employeeBackbuttonAlign">
        <BackButton variant="white" style={{ borderBottom: "none" }} />
      </div>
      <div className="leftdiv">
        <div className="leftflex">
          <h1 className="logostyle">
            <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image" style={{ maxWidth: "450px" }} />

            <a href="" src={stateInfo?.logoUrl}>
              {/* <img className="bannerLogo" src={stateInfo?.logoUrl} alt="Digit" /> */}
              {/* KSMART */}
            </a>
          </h1>
          <div style={{ textAlign: "center", margin: "0 auto" }}>
            <div>
              <img
                src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png"
                alt="No Image"
                style={{ maxWidth: "450px", marginLeft: "80px", marginRight: "80px" }}
              />
              <label style={{ fontSize: "32px" }}>Exploring K-Smart</label>
              <br></br>
              <label style={{ fontSize: "17px" }}>Kerala - Solutions for Managing Administrative Reformation and Transformation.</label>
            </div>
          </div>
          <div style={{ justifyContent: "space-between !important" }}>
            <span style={{ justifyContent: "space-between !important" }}>2023&copy;K-Smart</span>&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ justifyContent: "space-between !important" }}>Powered By UPYOG</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ justifyContent: "space-between !important", marginLeft: "20px" }}>
              <a className="text-white text-link" href="#">
                Legal
              </a>
              &nbsp;&nbsp;
              <a className="text-white text-link" href="#">
                Privacy
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="rightdiv">
        <div className="rightflex">
          <FormComposer
            onSubmit={onForgotPassword}
            noBoxShadow
            inline
            submitInForm
            config={config}
            label={propsConfig.texts.submitButtonLabel}
            secondaryActionLabel={propsConfig.texts.secondaryButtonLabel}
            onSecondayActionClick={navigateToLogin}
            heading={"Forgot Password"}
            // heading={propsConfig.texts.header}
            // description={propsConfig.texts.description}
            headingStyle={{ textAlign: "left" }}
            cardStyle={{ maxWidth: "408px", margin: "auto" }}
            // className="employeeForgotPassword"
            className="loginFormStyleEmployee"
            buttonStyle={mystyle}
          >
            <Header />
          </FormComposer>
        </div>
      </div>
      {showToast && <Toast error={true} label={t(showToast)} onClose={closeToast} />}
      {/* <div style={{ width: '100%', position: "absolute", bottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', color:"white" }}>
          <img style={{ cursor: "pointer", display: "inline-flex", height: '1.4em' }} alt={"Powered by DIGIT"} src={`${sourceUrl}/digit-footer-bw.png`} onError={"this.src='./../digit-footer.png'"} onClick={() => {
            window.open('https://www.digit.org/', '_blank').focus();
          }}></img>
          <span style={{ margin: "0 10px" }}>|</span>
          <span style={{ cursor: "pointer", fontSize: "16px", fontWeight: "400"}} onClick={() => { window.open('https://niua.in/', '_blank').focus();}} >Copyright © 2022 National Institute of Urban Affairs</span>
          <span style={{ margin: "0 10px" }}>|</span>
          <a style={{ cursor: "pointer", fontSize: "16px", fontWeight: "400"}} href={pdfUrl} target='_blank'>UPYOG License</a>
        </div>
      </div> */}
    </Background>
  );
};

ForgotPassword.propTypes = {
  loginParams: PropTypes.any,
};

ForgotPassword.defaultProps = {
  loginParams: null,
};

export default ForgotPassword;
