import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const AdoptionFatherAddress = ({ config, onSelect, userType, formData }) => {
 const stateId = Digit.ULBService.getStateId();
 const { t } = useTranslation();
 let validation = {};
 const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
 const { data: State = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
 const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
 const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
 const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
 const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District"); 
 const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
 const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
//  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [isInitialRender, setIsInitialRender] = useState(true);
 const [lbs, setLbs] = useState(0);
 const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
 const [AdoptionFatherCountry, setAdoptionFatherCountry] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherCountry);
 const [AdoptionFatherStateName, setAdoptionFatherStateName] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherStateName);
 const [AdoptionFatherDistrict, setAdoptionFatherDistrict] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherDistrict);
 const [AdoptionFatherLBTypeName, setAdoptionFatherLBTypeName] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherLBTypeName);
 const [AdoptionFatherLBName, setAdoptionFatherLBName] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherLBName);
 const [AdoptionFatherTaluk, setAdoptionFatherTaluk] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherTaluk);
 const [AdoptionFatherPostOffice, setAdoptionFatherPostOffice] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherPostOffice);
 const [AdoptionFatherPincode, setAdoptionFatherPincode] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherPincode);
 const [AdoptionFatherHouseNameEn, setAdoptionFatherHouseNameEn] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherHouseNameEn); 
 const [AdoptionFatherHouseNameMl, setAdoptionFatherHouseNameMl] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherHouseNameMl); 
 const [AdoptionFatherBuldingNo, setAdoptionFatherBuldingNo] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherBuldingNo);
 const [AdoptionFatherDoorNo, setAdoptionFatherDoorNo] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherDoorNo);
 const [AdoptionFatherMainPlaceEn, setAdoptionFatherMainPlaceEn] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherMainPlaceEn); 
 const [AdoptionFatherMainPlaceMl, setAdoptionFatherMainPlaceMl] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherMainPlaceMl); 
 const [AdoptionFatherLocalityNameEn, setAdoptionFatherLocalityNameEn] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherLocalityNameEn); 
 const [AdoptionFatherLocalityNameMl, setAdoptionFatherLocalityNameMl] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherLocalityNameMl);
 const [AdoptionFatherStreetNameEn, setAdoptionFatherStreetNameEn] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherStreetNameEn);
 const [AdoptionFatherStreetNameMl, setAdoptionFatherStreetNameMl] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherStreetNameMl);  
 const [AdoptionFatherVillage, setAdoptionFatherVillage] = useState(formData?.AdoptionFatherAddressDetails?.AdoptionFatherVillage); 
 const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AdoptionFatherAddressDetails?.isPrsentAddress);

 
 
 let cmbPlace = [];
 let cmbTaluk = [];
 let cmbVillage = [];
 let cmbDistrict = [];
 let cmbPostOffice = [];
 let cmbCountry = [];
 let cmbState = [];
 let districtid = null;
 let cmbLBType = [];
 
 Taluk &&
 Taluk["common-masters"] &&
 Taluk["common-masters"].Taluk.map((ob) => {
 cmbTaluk.push(ob);
 });
 Village &&
 Village["common-masters"] &&
 Village["common-masters"].Village.map((ob) => {
 cmbVillage.push(ob);
 });
 PostOffice &&
 District["common-masters"] &&
 District["common-masters"].District.map((ob) => {
 cmbDistrict.push(ob);
 });
 PostOffice &&
 PostOffice["common-masters"] &&
 PostOffice["common-masters"].PostOffice.map((ob) => {
 cmbPostOffice.push(ob);
 });
 
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

 LBType &&
 LBType["common-masters"] &&
 LBType["common-masters"].LBType.map((ob) => {
 cmbLBType.push(ob);
 });

 const onSkip = () => onSelect();

 function setSelectAdoptionFatherCountry(value) {
  setAdoptionFatherCountry(value);
  console.log("Country" + cmbCountry); 
  }
  function setSelectAdoptionFatherStateName(value) {
  setAdoptionFatherStateName(value);
  console.log("StateName" + cmbState); 
  }
  function setSelectAdoptionFatherDistrict(value) {
    setIsInitialRender(true);
    setAdoptionFatherDistrict(value);
    setAdoptionFatherLBName(null);
    setLbs(null);
    districtid = value.districtid    
    }
 function setSelectAdoptionFatherLBTypeName(value) {
 setAdoptionFatherLBTypeName(value);
 
 }
 function setSelectAdoptionFatherLBName(value) {
  setAdoptionFatherLBName(value);
  
  }
  function setSelectAdoptionFatherVillage(value) {
    setAdoptionFatherVillage(value);
    console.log("Village" + cmbVillage);   
    }
 function setSelectAdoptionFatherTaluk(value) {
      setAdoptionFatherTaluk(value);
      console.log("Taluk" + cmbTaluk);   
  }
      
  function setSelectAdoptionFatherPostOffice(value) {
    setAdoptionFatherPostOffice(value);     
 }
function setSelectAdoptionFatherPincode(e) {
  setAdoptionFatherPincode(e.target.value);      
}
 function setSelectAdoptionFatherBuldingNo(e) {
 setAdoptionFatherBuldingNo(e.target.value);

 }
 function setSelectAdoptionFatherDoorNo(e) {
 setAdoptionFatherDoorNo(e.target.value);
 
 }
 function setSelectAdoptionFatherHouseNameEn(e) {
 setAdoptionFatherHouseNameEn(e.target.value);
 
 }
 function setSelectAdoptionFatherHouseNameMl(e) {
  setAdoptionFatherHouseNameMl(e.target.value);
  
  }

 function setSelectAdoptionFatherMainPlaceEn(e) {
 setAdoptionFatherMainPlaceEn(e.target.value);
 
 }
 function setSelectAdoptionFatherMainPlaceMl(e) {
  setAdoptionFatherMainPlaceMl(e.target.value);
  
  }

 function setSelectAdoptionFatherLocalityNameEn(e) {
 setAdoptionFatherLocalityNameEn(e.target.value);
 
 }
 function setSelectAdoptionFatherLocalityNameMl(e) {
  setAdoptionFatherLocalityNameMl(e.target.value);
  
  }

 function setSelectAdoptionFatherStreetNameEn(e) {
 setAdoptionFatherStreetNameEn(e.target.value); 
 }

 function setSelectAdoptionFatherStreetNameMl(e) {
  setAdoptionFatherStreetNameMl(e.target.value); 
  }

 useEffect(() => {
 if (isInitialRender) {
 console.log("AdoptionFatherDistrict" + districtid);
 console.log(localbodies);
 if (AdoptionFatherDistrict) {
 setIsInitialRender(false);
 setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === AdoptionFatherDistrict.districtid));
 }
 }
 }, [lbs, isInitialRender]);
 const goNext = () => {
  
 sessionStorage.setItem("AdoptionFatherCountry", AdoptionFatherCountry ? AdoptionFatherCountry.code : null);
 sessionStorage.setItem("AdoptionFatherStateName", AdoptionFatherStateName ? AdoptionFatherStateName.code : null);
 sessionStorage.setItem("AdoptionFatherLBTypeName", AdoptionFatherLBTypeName ? AdoptionFatherLBTypeName.code : null);
 sessionStorage.setItem("AdoptionFatherBuldingNo", AdoptionFatherBuldingNo ? AdoptionFatherBuldingNo : null);
 sessionStorage.setItem("AdoptionFatherDoorNo", AdoptionFatherDoorNo ? AdoptionFatherDoorNo : null);
 sessionStorage.setItem("AdoptionFatherHouseNameEn", AdoptionFatherHouseNameEn ? AdoptionFatherHouseNameEn : null);
 sessionStorage.setItem("AdoptionFatherHouseNameMl", AdoptionFatherHouseNameMl ? AdoptionFatherHouseNameMl : null); 
 sessionStorage.setItem("AdoptionFatherMainPlaceEn", AdoptionFatherMainPlaceEn ? AdoptionFatherMainPlaceEn : null); 
 sessionStorage.setItem("AdoptionFatherMainPlaceMl", AdoptionFatherMainPlaceMl ? AdoptionFatherMainPlaceMl : null); 
 sessionStorage.setItem("AdoptionFatherLocalityNameEn", AdoptionFatherLocalityNameEn ? AdoptionFatherLocalityNameEn : null);
 sessionStorage.setItem("AdoptionFatherLocalityNameMl", AdoptionFatherLocalityNameMl ? AdoptionFatherLocalityNameMl : null);
 sessionStorage.setItem("AdoptionFatherStreetNameEn", AdoptionFatherStreetNameEn ? AdoptionFatherStreetNameEn : null);
 sessionStorage.setItem("AdoptionFatherStreetNameMl", AdoptionFatherStreetNameMl ? AdoptionFatherStreetNameMl : null);
 sessionStorage.setItem("AdoptionFatherVillage", AdoptionFatherVillage ? AdoptionFatherVillage.code : null);
 sessionStorage.setItem("AdoptionFatherLBName", AdoptionFatherLBName ? AdoptionFatherLBName : null);
 sessionStorage.setItem("AdoptionFatherDistrict", AdoptionFatherDistrict ? AdoptionFatherDistrict.code : null);
 sessionStorage.setItem("AdoptionFatherTaluk", AdoptionFatherTaluk ? AdoptionFatherTaluk.code : null);
 sessionStorage.setItem("AdoptionFatherPostOffice", AdoptionFatherPostOffice ? AdoptionFatherPostOffice.code : null);
 sessionStorage.setItem("AdoptionFatherPincode", AdoptionFatherPincode ? AdoptionFatherPincode.code  : null) ;
 sessionStorage.setItem("PermanentCountry", PermanentCountry ? PermanentCountry.code  : null);

 onSelect(config.key, {
 AdoptionFatherBuldingNo, AdoptionFatherDoorNo, AdoptionFatherHouseNameEn,AdoptionFatherHouseNameMl, AdoptionFatherLocalityNameEn, AdoptionFatherLocalityNameMl, AdoptionFatherLBTypeName, AdoptionFatherCountry, AdoptionFatherStateName, 
 AdoptionFatherMainPlaceEn, AdoptionFatherMainPlaceMl, AdoptionFatherStreetNameEn, AdoptionFatherStreetNameMl, AdoptionFatherVillage, AdoptionFatherLBName, AdoptionFatherDistrict, AdoptionFatherTaluk, AdoptionFatherPostOffice, AdoptionFatherPincode,
 
 });
 }
 return (
 <React.Fragment>
 {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdoptionFatherDoorNo}>

 <div className="row">
 <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span> </h1>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbCountry}
 selected={AdoptionFatherCountry}
 select={setSelectAdoptionFatherCountry}
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
 selected={AdoptionFatherStateName}
 select={setSelectAdoptionFatherStateName}
 disabled={isEdit}
 />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_DISTRICT")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={AdoptionFatherDistrict} select={setSelectAdoptionFatherDistrict} disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
 </div>
 
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={AdoptionFatherLBTypeName}
 select={setSelectAdoptionFatherLBTypeName}
 disabled={isEdit}
 />
 </div> 
 </div>
 </div> 
 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={lbs} selected={AdoptionFatherLBName} select={setSelectAdoptionFatherLBName} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbVillage} selected={AdoptionFatherVillage} select={setSelectAdoptionFatherVillage} disabled={isEdit} placeholder={`${t("CS_COMMON_VILLAGE")}`} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={AdoptionFatherTaluk} select={setSelectAdoptionFatherTaluk} disabled={isEdit} placeholder={`${t("CS_COMMON_TALUK")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPostOffice} selected={AdoptionFatherPostOffice} select={setSelectAdoptionFatherPostOffice} disabled={isEdit} placeholder={`${t("CS_COMMON_POST_OFFICE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_PIN_CODE")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherPincode" value={AdoptionFatherPincode} onChange={setSelectAdoptionFatherPincode} disable={isEdit} placeholder={`${t("CS_COMMON_PIN_CODE")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", maxLength: 6, minLength: 6, title: t("CS_COMMON_INVALID_PIN_CODE") })} />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherMainPlaceEn" value={AdoptionFatherMainPlaceEn} onChange={setSelectAdoptionFatherMainPlaceEn} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherMainPlaceMl" value={AdoptionFatherMainPlaceMl} onChange={setSelectAdoptionFatherMainPlaceMl} placeholder={`${t("CR_MAIN_PLACE_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherLocalityNameEn" value={AdoptionFatherLocalityNameEn} onChange={setSelectAdoptionFatherLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherLocalityNameMl" value={AdoptionFatherLocalityNameMl} onChange={setSelectAdoptionFatherLocalityNameMl} disable={isEdit} placeholder={`${t("CR_LOCALITY_ML")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
 </div>
 </div>
 </div>

 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherStreetNameEn" value={AdoptionFatherStreetNameEn} onChange={setSelectAdoptionFatherStreetNameEn} placeholder={`${t("CR_STREET_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherStreetNameMl" value={AdoptionFatherStreetNameMl} onChange={setSelectAdoptionFatherStreetNameMl} placeholder={`${t("CR_STREET_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherHouseNameEn" value={AdoptionFatherHouseNameEn} onChange={setSelectAdoptionFatherHouseNameEn} placeholder={`${t("CR_HOUSE_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherHouseNameMl" value={AdoptionFatherHouseNameMl} onChange={setSelectAdoptionFatherHouseNameMl} placeholder={`${t("CR_HOUSE_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })} />
 </div>
 </div>
 </div>
 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherBuldingNo" value={AdoptionFatherBuldingNo} onChange={setSelectAdoptionFatherBuldingNo} placeholder={`${t("CR_BUILDING_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_DOOR_NO")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionFatherDoorNo" value={AdoptionFatherDoorNo} onChange={setSelectAdoptionFatherDoorNo} placeholder={`${t("CR_DOOR_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })} />
 </div>
 </div>
 </div>
 
 

 </FormStep>
 </React.Fragment>
 );
};
export default AdoptionFatherAddress;