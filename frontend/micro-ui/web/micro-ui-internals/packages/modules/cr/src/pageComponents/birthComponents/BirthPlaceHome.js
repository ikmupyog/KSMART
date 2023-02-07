import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader,Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const BirthPlaceHome = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  // Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  const [toast, setToast] = useState(false);
  // const [countries, setcountry] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.BirthPlaceHomeDetails?.AdrsPostOffice);
  const [AdrsPincode, setAdrsPincode] = useState(formData?.BirthPlaceHomeDetails?.AdrsPincode);
  const [AdrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsHouseNameEn);
  const [AdrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsHouseNameMl);

  const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsLocalityNameEn);
  const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsLocalityNameMl);
  const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsStreetNameEn);
  const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsStreetNameMl);
  // const [WardNo, setWardNo] = useState(formData.BirthPlaceHomeDetails?.wardno);

  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomePostOffice ? false : false);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomePincode ? false : false);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeHouseNameEn ? false : false);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(
    formData?.BirthPlaceHomeDetails?.AdrsHomeLocalityNameEn ? false : false
  );
  const [AdsHomeStreetNameEnError, setAdsHomeStreetNameEnError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeStreetNameEn ? false : false);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeHouseNameMl ? false : false);
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(
    formData?.BirthPlaceHomeDetails?.AdrsHomeLocalityNameMl ? false : false
  );
  const [AdsHomeStreetNameMlError, setAdsHomeStreetNameMlError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeStreetNameMl ? false : false);

  let cmbCountry = [];
  let cmbState = [];
  let cmbPlace = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let districtid = null;
  let cmbLBType = [];
  let cmbLB = [];

  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });

  // let Zonal = [];
  // let cmbWardNo = [];
  // let cmbWardNoFinal = [];
  // boundaryList &&
  //   boundaryList["egov-location"] &&
  //   boundaryList["egov-location"].TenantBoundary.map((ob) => {
  //     //  console.log(ob);
  //     // if(ob?.boundary){
  //     Zonal.push(...ob.boundary.children);
  //     ob.boundary.children.map((obward) => {
  //       cmbWardNo.push(...obward.children);
  //     });
  //     // }
  //   });
  // //console.log(Zonal);
  // cmbWardNo.map((wardmst) => {
  //   wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
  //   wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
  //   cmbWardNoFinal.push(wardmst);
  // });

  const onSkip = () => onSelect();

  function setSelectAdrsPostOffice(value) {
    setAdrsPostOffice(value);
  }
  // function setSelectAdrsPincode(e) {
  //   if (e.target.value.length === 7) {
  //     return false;

  //   } else {
  //     setAdrsPincode(e.target.value);
  //   }
  // }

  function setSelectAdrsPincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        // setMotherAadhar(e.target.value);
        setPresentPincodeError(true);
        return false;
      } else if (e.target.value.length < 6) {
        setAdsHomePincodeError(true);
        setAdrsPincode(e.target.value);
        return false;
      } else {
        setAdsHomePincodeError(false);
        setAdrsPincode(e.target.value);

        return true;
      }
    }
  }

  function setSelectAdrsHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdrsHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectAdrsLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdrsLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsLocalityNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectAdrsStreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdrsStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsStreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  // function setSelectWard(value) {
  //   setWardNo(value);
  // }
  let validFlag = true;

  const goNext = () => {
   
    if (AdrsLocalityNameEn == null || AdrsLocalityNameEn == "" || AdrsLocalityNameEn == undefined) {
      validFlag = false;
      setAdsHomeLocalityNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAdsHomeLocalityNameEnError(false);
    }

    if (AdrsLocalityNameMl == null || AdrsLocalityNameMl == "" || AdrsLocalityNameMl == undefined) {
      validFlag = false;
      setAdsHomeLocalityNameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAdsHomeLocalityNameMlError(false);
    }
    if (AdrsHouseNameEn == null || AdrsHouseNameEn == "" || AdrsHouseNameEn == undefined) {
      validFlag = false;
      setAdsHomeHouseNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAdsHomeHouseNameEnError(false);
    }
    if (AdrsHouseNameMl == null || AdrsHouseNameMl == "" || AdrsHouseNameMl == undefined) {
      validFlag = false;
      setAdsHomeHouseNameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAdsHomeHouseNameMlError(false);
    }
   
  

    if (validFlag == true) {
    
      sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn  : null);
      sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl  ? AdrsHouseNameMl  : null);
      sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn  ? AdrsLocalityNameEn  : null);
      sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl  ? AdrsLocalityNameMl  : null);
      sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn  ? AdrsStreetNameEn  : null);
      sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl  ? AdrsStreetNameMl  : null);
      sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice  ? AdrsPostOffice.code  : null);
      sessionStorage.setItem("AdrsPincode", AdrsPincode  ? AdrsPincode .code  : null);
      // sessionStorage.setItem(" WardNo",  WardNo.code);

      onSelect(config.key, {
        AdrsHouseNameEn,
        AdrsHouseNameMl,
        AdrsLocalityNameEn,
        AdrsLocalityNameMl,
        AdrsStreetNameEn,
        AdrsStreetNameMl,
        AdrsPostOffice,
        AdrsPincode,
       
      });
    }
  };

  if (isPostOfficeLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdrsLocalityNameEn}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PLACE_HOME")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_WARD")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="namecmb"
                isMandatory={config.isMandatory}
                option={cmbWardNoFinal}
                selected={WardNo}
                select={setSelectWard}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div>   */}
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbPostOffice}
                selected={AdrsPostOffice}
                select={setSelectAdrsPostOffice}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_PIN_CODE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsPincode"
                value={AdrsPincode}
                onChange={setSelectAdrsPincode}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_PIN_CODE")}`}
                {...(validation = {
                  pattern: "^[0-9]{6}$",
                  isRequired: true,
                  type: "number",
                  maxLength: 6,
                  minLength: 6,
                  title: t("CS_COMMON_INVALID_PIN_CODE"),
                })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsLocalityNameEn"
                value={AdrsLocalityNameEn}
                onChange={setSelectAdrsLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsStreetNameEn"
                value={AdrsStreetNameEn}
                onChange={setSelectAdrsStreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_HOUSE_NAME_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsHouseNameEn"
                value={AdrsHouseNameEn}
                onChange={setSelectAdrsHouseNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {t("CR_LOCALITY_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsLocalityNameMl"
                value={AdrsLocalityNameMl}
                onChange={setSelectAdrsLocalityNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_LOCALITY_ML"),
                })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsStreetNameMl"
                value={AdrsStreetNameMl}
                onChange={setSelectAdrsStreetNameMl}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                disable={isEdit}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_STREET_NAME_ML"),
                })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_HOUSE_NAME_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsHouseNameMl"
                value={AdrsHouseNameMl}
                onChange={setSelectAdrsHouseNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_HOUSE_NAME_ML"),
                })}
              />
            </div>
          </div>
        </div>
        {toast && (
          <Toast
            error={
              AdsHomePincodeError ||
              AdsHomePostOfficeError ||             
              AdsHomeLocalityNameEnError ||
              AdsHomeLocalityNameMlError ||
              AdsHomeHouseNameEnError || AdsHomeHouseNameMlError
             
              
             
            }
            label={
              AdsHomePincodeError ||
              AdsHomePostOfficeError ||             
              AdsHomeLocalityNameEnError ||
              AdsHomeLocalityNameMlError ||
              AdsHomeHouseNameEnError || AdsHomeHouseNameMlError
            
                ? 
                  AdsHomePincodeError 
                  ? t(`BIRTH_ERROR_PINCODE_CHOOSE`)
                  : AdsHomePostOfficeError
                  ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`)
                 
                  : AdsHomeLocalityNameEnError
                  ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                  
                  : AdsHomeLocalityNameMlError
                  ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                  : AdsHomeHouseNameEnError
                  ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`)
                  : AdsHomeHouseNameMlError
                  ? t(`BIRTH_ERROR_HOUSE_NAME_ML_CHOOSE`)
                  
                
                  :
                    setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlaceHome;
