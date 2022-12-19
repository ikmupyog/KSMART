import { BackButton, Dropdown, FormComposer, Loader, Toast, CardLabel } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../../components/Background";
import Header from "../../../components/Header";

/* set employee details to enable backward compatiable */
const setEmployeeDetail = (userObject, token) => {
  let locale = JSON.parse(sessionStorage.getItem("Digit.locale"))?.value || "en_IN";
  localStorage.setItem("Employee.tenant-id", userObject?.tenantId);
  localStorage.setItem("tenant-id", userObject?.tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Employee.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Employee.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
};

const Login = ({ config: propsConfig, t, isDisabled }) => {
  const { data: cities, isLoading } = Digit.Hooks.useTenants();
  const { data: storeData, isLoading: isStoreLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [disable, setDisable] = useState(false);

  const history = useHistory();
  // const getUserType = () => "EMPLOYEE" || Digit.UserService.getType();
  let sourceUrl = "https://s3.ap-south-1.amazonaws.com/egov-qa-assets";
  const pdfUrl = "https://pg-egov-assets.s3.ap-south-1.amazonaws.com/Upyog+Code+and+Copyright+License_v1.pdf";

  useEffect(() => {
    if (!user) {
      return;
    }
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
    if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;
    Digit.UserService.setUser(user);
    setEmployeeDetail(user?.info, user?.access_token);
    let redirectPath = "/digit-ui/employee";

    /* logic to redirect back to same screen where we left off  */
    if (window?.location?.href?.includes("from=")) {
      redirectPath = decodeURIComponent(window?.location?.href?.split("from=")?.[1]) || "/digit-ui/employee";
    }

    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.every((e) => e.code === "NATADMIN")) {
      redirectPath = "/digit-ui/employee/payment/integration/dss/NURT_DASHBOARD";
    }
    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.every((e) => e.code === "STADMIN")) {
      redirectPath = "/digit-ui/employee/payment/integration/dss/home";
    }

    history.replace(redirectPath);
  }, [user]);

  const onLogin = async (data) => {
    if (!data.city) {
      alert("Please Select City!");
      return;
    }
    setDisable(true);

    const requestData = {
      ...data,
      userType: "EMPLOYEE",
    };
    requestData.tenantId = data.city.code;
    delete requestData.city;
    try {
      const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
      Digit.SessionStorage.set("Employee.tenantId", info?.tenantId);
      setUser({ info, ...tokens });
    } catch (err) {
      setShowToast(err?.response?.data?.error_description || "Invalid login credentials!");
      setTimeout(closeToast, 5000);
    }
    setDisable(false);
  };

  const closeToast = () => {
    setShowToast(null);
  };

  const onForgotPassword = () => {
    history.push("/digit-ui/employee/user/forgot-password");
  };
  const mystyle = {
    background: "#bc5bfc",
    backgroundImage: "-webkit-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "-moz-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "-ms-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "-o-linear-gradient(top, #bc5bfc, #2980b9)",
    backgroundImage: "linear-gradient(to bottom, #bc5bfc, #2980b9)",
    borderRadius: "9px",
    Color: "#ffffff",
    fontSize: "20px",
    padding: "10px 20px 10px 20px",
    textDecoration: "none",
  };
  const [userId, password, city] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: {
            name: userId.name,
          },
          isMandatory: true,
        },
        {
          label: t(password.label),
          type: password.type,
          populators: {
            name: password.name,
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
                className="login-city-dd"
                optionKey="i18nKey"
                select={(d) => {
                  props.onChange(d);
                }}
                t={t}
                {...customProps}
              />
            ),
          },
          isMandatory: true,
        },
      ],
    },
  ];

  return isLoading || isStoreLoading ? (
    <Loader />
  ) : (
    <Background >
      <div className="leftdiv">
        <div className="leftflex" >
          <h1 className="logostyle">

            <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image" style={{ maxWidth: "450px" }} />

            <a href="" src={stateInfo?.logoUrl}>
              {/* <img className="bannerLogo" src={stateInfo?.logoUrl} alt="Digit" /> */}
              {/* KSMART */}
            </a>
          </h1>
          <div style={{ textAlign: "center", margin: "0 auto" }}>
            <div>
              <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" alt="No Image" style={{ maxWidth: "450px" }} />
              <label style={{ fontSize: "32px" }}>Exploring K-Smart</label><br></br>
              <label style={{ fontSize: "17px" }}>Kerala - Solution For Administrative Reformation And Transformation.</label>
            </div>
          </div>
          <div style={{ justifyContent: "space-between !important" }} >

            <span style={{ marginRight: "70%" }} >2022&copy;K-Smart</span>&nbsp;
            <span  >
              <a className="text-white text-link" href="#">Legal</a>&nbsp;&nbsp;
              <a className="text-white text-link" href="#">Privacy</a>
            </span>

          </div>
        </div>
      </div>

      <div className="rightdiv">
        <div className="rightflex" >
          <FormComposer
            onSubmit={onLogin}
            isDisabled={isDisabled || disable}
            noBoxShadow
            inline
            submitInForm
            config={config}
            label={propsConfig.texts.submitButtonLabel}
            secondaryActionLabel={propsConfig.texts.secondaryButtonLabel}
            onSecondayActionClick={onForgotPassword}
            heading={"Sign In"}
            // heading={propsConfig.texts.header}
            headingStyle={{ textAlign: "left" }}

            cardStyle={{ margin: "auto", minWidth: "408px" }}
            className="loginFormStyleEmployee"
            buttonStyle={mystyle}
          >
          </FormComposer>
          {showToast && <Toast error={true} label={t(showToast)} onClose={closeToast} />}

        </div>
      </div>
      <div className="employeeBackbuttonAlign">
        <BackButton variant="white" style={{ borderBottom: "none" }} />
      </div>


    </Background>
  );
};

Login.propTypes = {
  loginParams: PropTypes.any,
};

Login.defaultProps = {
  loginParams: null,
};

export default Login;
