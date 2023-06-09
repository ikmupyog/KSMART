import React, { Fragment, useMemo, useState, setValue, useEffect } from "react";
import {
  PageBasedInput,
  CardHeader,
  BackButton,
  Dropdown,
  CardLabelError,
  RadioOrSelect,
  CardLabel,
  SubmitBar,
  Card,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Background from "../../../components/Background";

const LocationSelection = () => {
  /////////////////////////////////////////////////////////////////////////////////
  const { t } = useTranslation();
  const history = useHistory();
  const { data: { districts } = {}, isLoad } = Digit.Hooks.useStore.getInitData();
  const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
  const [lbs, setLbs] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [selectedCity, setSelectedCity] = useState(() => ({ code: Digit.ULBService.getCitizenCurrentTenant(true) }));
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [showError, setShowError] = useState(false);
  let districtid = null;
  const texts = useMemo(
    () => ({
      header: t("CS_COMMON_CHOOSE_LOCATION"),
      submitBarLabel: t("CORE_COMMON_CONTINUE"),
    }),
    [t]
  );

  function selectCity(city) {
    setSelectedCity(city);
    setShowError(false);
  }

  function selectDistrict(district) {
    setIsInitialRender(true);
    setSelectedDistrict(district);
    setSelectedCity(null);
    setLbs(null);
    districtid = district.districtid;
    setShowError(false);
    // if(districtid){
    // }
  }
  useEffect(() => {
    if (isInitialRender) {
      if (selectedDistrict) {
        setIsInitialRender(false);
        setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === selectedDistrict.districtid));
      }
    }
  }, [lbs, isInitialRender]);

  // const RadioButtonProps = useMemo(() => {
  //   return {
  //     options: cities,
  //     optionsKey: "i18nKey",
  //     additionalWrapperClass: "reverse-radio-selection-wrapper",
  //     onSelect: selectCity,
  //     selectedOption: selectedCity,
  //   };
  // }, [cities, t, selectedCity]);

  function onSubmit() {
    if (selectedDistrict) {
      Digit.SessionStorage.set("CITIZEN.COMMON.HOME.DISTRICT", selectedDistrict);
      // history.push("/digit-ui/citizen");
      history.push("/digit-ui/citizen/home");
      if (selectedCity) {
        Digit.SessionStorage.set("CITIZEN.COMMON.HOME.CITY", selectedCity);
        // history.push("/digit-ui/citizen");
        history.push("/digit-ui/citizen/home");
      } else {
        setShowError(true);
      }
    } else {
      setShowError(true);
    }
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
    isLoading,
    isLoad ? (
      <loader />
    ) : (
      <Background>
        {screenSize.dynamicWidth > 1250 && (
          <div className="loginCard  hidden-md hidden-xs w-7/12" style={{ borderRadius: "25px", backgroundColor: "#00377B" }}>
            <div className="leftflex">
              <div style={{ textAlign: "center" }}>
                <img
                  className="loginImage"
                  src="https://ulb-logos.s3.ap-south-1.amazonaws.com/Group.png"
                  alt="No Image"
                  style={{ maxWidth: "700px", marginTop: "70px" }}
                />
                <label style={{ fontSize: "32px", marginBottom: "20px !important" }}>Exploring K-Smart</label>
                <br></br>
                <label style={{ fontSize: "17px", marginTop: "20px !important", width: "60%" }}>
                  Kerala - Solutions for Managing Administrative Reformation and Transformation.
                </label>
              </div>
              {/* <div style={{ justifyContent: "space-between !important" }}>
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
              </div> */}
            </div>
          </div>
        )}
        {/* <BackButton /> */}
        <Card className=" removeBottomMargin" style={{ margin: "0 auto", border: "none", boxShadow: "none", padding: "0px", width: "500px" }}>
          <div style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%", width: "100%" }}>
            <div className="language-button-container">
              <p style={{ color: "#00377b", fontWeight: "500", fontSize: "28px" }}>{t("CS_COMMON_CHOOSE_LOCATION")}</p>
              <CardLabel>{t("CS_COMMON_DISTRICT")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={districts}
                selected={selectedDistrict}
                select={selectDistrict}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
              {/* </div> */}
              {/* <div className="col-md-6" > */}
              <CardLabel>{t("CS_COMMON_LB")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={lbs}
                selected={selectedCity}
                select={selectCity}
                placeholder={`${t("CS_COMMON_LB")}`}
              />
              <SubmitBar
                style={{ fonntF: "system-ui !important", fontWeight: "400 !important", fontSize: "17px !important", marginTop: "30px" }}
                label={t(`CORE_COMMON_CONTINUE`)}
                onSubmit={onSubmit}
              />
              {showError ? <CardLabelError>{t("CS_COMMON_LOCATION_SELECTION_ERROR")}</CardLabelError> : null}
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </Card>
        {/* </PageBasedInput> */}
      </Background>
    )
  );
};

export default LocationSelection;
