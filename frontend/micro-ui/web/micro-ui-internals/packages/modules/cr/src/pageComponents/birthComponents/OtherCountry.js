import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea ,BackButton} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const OtherCountry = ({ config, onSelect, userType, formData }) => {
  // const stateId = Digit.ULBService.getStateId();
  // const tenantId = Digit.ULBService.getCurrentTenantId(); 
  const { t } = useTranslation();
  let validation = {};
  
  // const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherBithPlace");
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
 
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");  
  // const [setOtherCountryType, setSelectedOtherCountryType] = useState(formData?.PlaceOfDeathOther?.setOtherCountryType);
  const [AdrsInfontName, setAdrsInfontName] = useState(formData?.OtherCountry?.AdrsInfontName);
  const [ AdrsOtherCountry, setAdrsOtherCountry] = useState(formData?.OtherCountry?.AdrsOtherCountry);
  const [ OtherCountryDesption, setOtherCountryDesption] = useState(formData?.OtherCountry?.OtherCountryDesption);
  const [OtherCountryMobilNo, setOtherCountryMobilNo] = useState(formData?.OtherCountry?.OtherCountryMobilNo);
  const [OtherCountryAadhaar, setOtherCountryAadhaar] = useState(formData?.OtherCountry?.OtherCountryAadhaar);
  // let naturetypecmbvalue = null;
 
 
  const onSkip = () => onSelect();

  function setSelectAdrsInfontName(e) {
    setAdrsInfontName(e.target.value);
  }

  function setSelectAdrsOtherCountry(e) {
    setAdrsOtherCountry(e.target.value);
  }
  function setSelectOtherCountryDesption(e) {
    setOtherCountryDesption(e.target.value);
  }  
 
  function  setSelectOtherCountryMobilNo(e) {
    setOtherCountryMobilNo(e.target.value);
  }
  function  setSelectOtherCountryAadhaar(e) {
    setOtherCountryAadhaar(e.target.value);
  }
  const goNext = () => {   
    sessionStorage.setItem("AdrsInfontName", AdrsInfontName);   
    sessionStorage.setItem("AdrsOtherCountry", AdrsOtherCountry);
    sessionStorage.setItem("OtherCountryDesption", OtherCountryDesption);
    sessionStorage.setItem("setOtherCountryMobilNo", OtherCountryMobilNo);
    sessionStorage.setItem("setOtherCountryAadhaar", OtherCountryAadhaar);  
      
    onSelect(config.key, {
      AdrsInfontName,      
       AdrsOtherCountry,
       OtherCountryDesption,
       OtherCountryMobilNo, 
       OtherCountryAadhaar,
     
      });
  };
  return (
    <React.Fragment>
     {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
     <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled = {!AdrsInfontName}>
      <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OTHER_COUNTRY_DETAILS")}`}</span> </h1>
                    </div>
                </div>

    <div className="row">
    <div className="col-md-12" >
        
        <div className="col-md-4">
              <CardLabel>
                {t("CR_INFORMANT_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInfontName"
                value={AdrsInfontName}
                onChange={setSelectAdrsInfontName}
                placeholder={`${t("CR_INFORMANT_NAME")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
              />
            </div>
            <div className="col-md-4">
            <CardLabel>{`${t("CR_MOBILE_NO")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="OtherCountryMobilNo"
              value={OtherCountryMobilNo}
              onChange={setSelectOtherCountryMobilNo}
              disable={isEdit}
              placeholder={`${t("CR_MOBILE_NO")}`}
              {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false,title: t("CR_INVALID_MOBILE_NO") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="OtherCountryAadhaar"
              value={OtherCountryAadhaar}
              onChange={setSelectOtherCountryAadhaar}
              disable={isEdit}
              placeholder={`${t("CS_COMMON_AADHAAR")}`}
              {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false ,title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
      </div> 
    </div>  
    <div className="row">
         <div className="col-md-12" >
         <div className="col-md-6" >
          <CardLabel>{`${t("CR_ADDRESS")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="AdrsOtherCountry"
            value={AdrsOtherCountry}
            onChange={setSelectAdrsOtherCountry}
            disable={isEdit}
            placeholder={`${t("CR_ADDRESS")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
        </div>
         <div className="col-md-6" >
         <CardLabel>{`${t("CR_DESCRIPTION")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="OtherCountryDesption"
            value={OtherCountryDesption}
            onChange={setSelectOtherCountryDesption}
            disable={isEdit}
            placeholder={`${t("CR_DESCRIPTION")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
            />
        </div>
      </div>  
    </div>    
      </FormStep>
    </React.Fragment>
  );
};
export default OtherCountry;