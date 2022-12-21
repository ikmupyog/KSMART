import React, { Fragment, useMemo, useState, setValue, useEffect } from "react";
import { PageBasedInput, CardHeader, BackButton, Dropdown, CardLabelError, RadioOrSelect, CardLabel,SubmitBar,Card } from "@egovernments/digit-ui-react-components";
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
    districtid = district.districtid
    setShowError(false);
    // if(districtid){
    // }

  }
  useEffect(() => {
    if (isInitialRender) {

      if (selectedDistrict) {
        console.log(selectedDistrict.districtid);
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
      history.push("/digit-ui/citizen");
      if (selectedCity) {
        Digit.SessionStorage.set("CITIZEN.COMMON.HOME.CITY", selectedCity);
        history.push("/digit-ui/citizen");
      }
      else {
        setShowError(true);
      }
    } else {
      setShowError(true);
    }

  }

  return isLoading, isLoad ? (

    <loader />
  ) : (
    <Background>
      <>

        {/* <PageBasedInput texts={texts} onSubmit={onSubmit}> */}
        <div className="leftdiv">
          <div className="leftflex" >
            <h1 className="logostyle">
              {/* <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image" style={{ maxWidth: "450px" }} /> */}

            </h1>
            <div style={{ textAlign: "center", margin: "0 auto" }}>
              <div>
                <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" alt="No Image" style={{ maxWidth: "450px" }} />
                <label style={{ fontSize: "32px", marginBottom: "20px !important" }}>Exploring K-Smart</label><br></br>
                <label style={{ fontSize: "17px", marginTop: "20px !important" }}>Kerala - Solution For Administrative Reformation And Transformation.</label>
              </div>
            </div>
            <div style={{ justifyContent: "space-between !important" }} >

              <span style={{ marginRight: "60%" }} >2022&copy;K-Smart</span>&nbsp;
              <span  >
                <a className="text-white text-link" href="#">Legal</a>&nbsp;&nbsp;
                <a className="text-white text-link" href="#">Privacy</a>
              </span>

            </div>
          </div>
        </div>
        {/* <BackButton /> */}
        <Card className="bannerCard removeBottomMargin" style={{ margin: "0 auto" }}>
        <div  style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%" , width:"100%"}}>
            {/* <PageBasedInput texts={texts} onSubmit={onSubmit}> */}
               {/* <div className="row">
          <div className="col-md-6" > */}
          <div className="language-button-container"  >
              <CardHeader>{t("CS_COMMON_CHOOSE_LOCATION")}</CardHeader>
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
              <SubmitBar className="btnksmart" style={{ width: "35%",fonntF:"system-ui !important",fontWeight: "400 !important",fontSize: "17px !important" }} 
                label={t(`CORE_COMMON_CONTINUE`)} onSubmit={onSubmit} />
              {showError ? <CardLabelError>{t("CS_COMMON_LOCATION_SELECTION_ERROR")}</CardLabelError> : null}
              {/* </div> */}
        {/* </div> */}
        </div>
        </div>
        </Card>
            {/* </PageBasedInput> */}
          
      </>
    </Background>
  );
};

export default LocationSelection;
