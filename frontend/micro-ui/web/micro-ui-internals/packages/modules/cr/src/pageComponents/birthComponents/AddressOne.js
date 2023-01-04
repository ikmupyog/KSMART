import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressOne = ({ config, onSelect, userType, formData }) => {
 const stateId = Digit.ULBService.getStateId();
 const { t } = useTranslation();
 let validation = {};
 const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
 const { data: State = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");

//  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [isInitialRender, setIsInitialRender] = useState(true);
 const [lbs, setLbs] = useState(0);
 const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
 const [PresentCountry, setPresentCountry] = useState(formData?.AddressOneDetails?.PresentCountry);
 const [PresentStateName, setPresentStateName] = useState(formData?.AddressOneDetails?.PresentStateName);
 let cmbCountry = [];
 let cmbState = []; 
 Country &&
 Country["common-masters"] &&
 Country["common-masters"].Country.map((ob) => {
 cmbCountry.push(ob);
 });
 
 State &&
 State["common-masters"] &&
 State["common-masters"].State.map((ob) => {
 cmbState.push(ob);
 });

 const onSkip = () => onSelect();

 function setSelectPresentCountry(value) {
  setPresentCountry(value);
  console.log("Country" + cmbCountry); 
  }
  function setSelectPresentStateName(value) {
  setPresentStateName(value);
  console.log("StateName" + cmbState); 
  }

 
 const goNext = () => {
 sessionStorage.setItem("PresentCountry", PresentCountry.code);
 sessionStorage.setItem("PresentStateName", PresentStateName.code);
 onSelect(config.key, {
  PresentCountry, PresentStateName,  
 });
 }
 return (
 <React.Fragment>
 {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!PresentCountry}>

 {/* <div className="row">
 <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span> </h1>
 </div>
 </div> */}

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbCountry}
 selected={PresentCountry}
 select={setSelectPresentCountry}
 disabled={isEdit}
 />
 </div>
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbState}
 selected={PresentStateName}
 select={setSelectPresentStateName}
 disabled={isEdit}
 />
 </div>
 </div>
 </div>

 
 
 

 </FormStep>
 </React.Fragment>
 );
};
export default AddressOne;