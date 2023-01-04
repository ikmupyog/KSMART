import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const BirthParentsAddress = ({ config, onSelect, userType, formData }) => {
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
 const [BirthMotherCountry, setBirthMotherCountry] = useState(formData?.BirthMotherAddressDetails?.BirthMotherCountry);
 const [BirthMotherStateName, setBirthMotherStateName] = useState(formData?.BirthMotherAddressDetails?.BirthMotherStateName);
 const [BirthMotherDistrict, setBirthMotherDistrict] = useState(formData?.BirthMotherAddressDetails?.BirthMotherDistrict);
 const [BirthMotherLBTypeName, setBirthMotherLBTypeName] = useState(formData?.BirthMotherAddressDetails?.BirthMotherLBTypeName);
 const [BirthMotherLBName, setBirthMotherLBName] = useState(formData?.BirthMotherAddressDetails?.BirthMotherLBName);
 const [BirthMotherTaluk, setBirthMotherTaluk] = useState(formData?.BirthMotherAddressDetails?.BirthMotherTaluk);
 const [BirthMotherPostOffice, setBirthMotherPostOffice] = useState(formData?.BirthMotherAddressDetails?.BirthMotherPostOffice);
 const [BirthMotherPincode, setBirthMotherPincode] = useState(formData?.BirthMotherAddressDetails?.BirthMotherPincode);
 const [BirthMotherHouseNameEn, setBirthMotherHouseNameEn] = useState(formData?.BirthMotherAddressDetails?.BirthMotherHouseNameEn); 
 const [BirthMotherBuldingNo, setBirthMotherBuldingNo] = useState(formData?.BirthMotherAddressDetails?.BirthMotherBuldingNo);
 const [BirthMotherDoorNo, setBirthMotherDoorNo] = useState(formData?.BirthMotherAddressDetails?.BirthMotherDoorNo);
 const [BirthMotherMainPlaceEn, setBirthMotherMainPlaceEn] = useState(formData?.BirthMotherAddressDetails?.BirthMotherMainPlaceEn); 
 const [BirthMotherLocalityNameEn, setBirthMotherLocalityNameEn] = useState(formData?.BirthMotherAddressDetails?.BirthMotherLocalityNameEn); 
 const [BirthMotherStreetNameEn, setBirthMotherStreetNameEn] = useState(formData?.BirthMotherAddressDetails?.BirthMotherStreetNameEn); 
 const [BirthMotherVillage, setBirthMotherVillage] = useState(formData?.BirthMotherAddressDetails?.BirthMotherVillage); 
 const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.BirthMotherAddressDetails?.isPrsentAddress);

 
 
 let cmbPlace = [];
 let cmbTaluk = [];
 let cmbVillage = [];
 let cmbDistrict = [];
 let cmbPostOffice = [];
 let cmbCountry = [];
 let cmbState = [];
 let districtid = null;
 let cmbLBType = [];
 
 console.log("Taluk" + Taluk);
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

 function setSelectBirthMotherCountry(value) {
  setBirthMotherCountry(value);
  console.log("Country" + cmbCountry); 
  }
  function setSelectBirthMotherStateName(value) {
  setBirthMotherStateName(value);
  console.log("StateName" + cmbState); 
  }
  function setSelectBirthMotherDistrict(value) {
    setIsInitialRender(true);
    setBirthMotherDistrict(value);
    setBirthMotherLBName(null);
    setLbs(null);
    districtid = value.districtid    
    }
 function setSelectBirthMotherLBTypeName(value) {
 setBirthMotherLBTypeName(value);
 
 }
 function setSelectBirthMotherLBName(value) {
  setBirthMotherLBName(value);
  
  }
  function setSelectBirthMotherVillage(value) {
    setBirthMotherVillage(value);
    console.log("Village" + cmbVillage);   
    }
 function setSelectBirthMotherTaluk(value) {
      setBirthMotherTaluk(value);
      console.log("Taluk" + cmbTaluk);   
  }
      
  function setSelectBirthMotherPostOffice(value) {
    setBirthMotherPostOffice(value);     
 }
function setSelectBirthMotherPincode(e) {
  setBirthMotherPincode(e.target.value);      
}
 function setSelectBirthMotherBuldingNo(e) {
 setBirthMotherBuldingNo(e.target.value);

 }
 function setSelectBirthMotherDoorNo(e) {
 setBirthMotherDoorNo(e.target.value);
 
 }
 function setSelectBirthMotherHouseNameEn(e) {
 setBirthMotherHouseNameEn(e.target.value);
 
 }

 function setSelectBirthMotherMainPlaceEn(e) {
 setBirthMotherMainPlaceEn(e.target.value);
 
 }

 function setSelectBirthMotherLocalityNameEn(e) {
 setBirthMotherLocalityNameEn(e.target.value);
 
 }

 function setSelectBirthMotherStreetNameEn(e) {
 setBirthMotherStreetNameEn(e.target.value); 
 }



 useEffect(() => {
 if (isInitialRender) {
 console.log("BirthMotherDistrict" + districtid);
 console.log(localbodies);
 if (BirthMotherDistrict) {
 setIsInitialRender(false);
 setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === BirthMotherDistrict.districtid));
 }
 }
 }, [lbs, isInitialRender]);
 const goNext = () => {
 sessionStorage.setItem("BirthMotherCountry", BirthMotherCountry.code);
 sessionStorage.setItem("BirthMotherStateName", BirthMotherStateName.code);
 sessionStorage.setItem("BirthMotherLBTypeName", BirthMotherLBTypeName.code);
 sessionStorage.setItem("BirthMotherBuldingNo", BirthMotherBuldingNo);
 sessionStorage.setItem("BirthMotherDoorNo", BirthMotherDoorNo);
 sessionStorage.setItem("BirthMotherHouseNameEn", BirthMotherHouseNameEn); 
 sessionStorage.setItem("BirthMotherMainPlaceEn", BirthMotherMainPlaceEn); 
 sessionStorage.setItem("BirthMotherLocalityNameEn", BirthMotherLocalityNameEn);
 sessionStorage.setItem("BirthMotherStreetNameEn", BirthMotherStreetNameEn);
 sessionStorage.setItem("BirthMotherVillage", BirthMotherVillage.code);
 sessionStorage.setItem("BirthMotherLBName", null);
 sessionStorage.setItem("BirthMotherDistrict", BirthMotherDistrict.code);
 sessionStorage.setItem("BirthMotherTaluk", BirthMotherTaluk.code);
 sessionStorage.setItem("BirthMotherPostOffice", BirthMotherPostOffice.code);
 sessionStorage.setItem("BirthMotherPincode", BirthMotherPincode.code);
 sessionStorage.setItem("PermanentCountry", PermanentCountry.code);

 onSelect(config.key, {
 BirthMotherBuldingNo, BirthMotherDoorNo, BirthMotherHouseNameEn, BirthMotherLocalityNameEn, BirthMotherLBTypeName, BirthMotherCountry, BirthMotherStateName, 
 BirthMotherMainPlaceEn, BirthMotherStreetNameEn,  BirthMotherVillage, BirthMotherLBName, BirthMotherDistrict, BirthMotherTaluk, BirthMotherPostOffice, BirthMotherPincode,
 
 });
 }
 return (
 <React.Fragment>
 {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthMotherDoorNo}>



 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbCountry}
 selected={BirthMotherCountry}
 select={setSelectBirthMotherCountry}
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
 selected={BirthMotherStateName}
 select={setSelectBirthMotherStateName}
 disabled={isEdit}
 />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_DISTRICT")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={BirthMotherDistrict} select={setSelectBirthMotherDistrict} disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
 </div>
 
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={BirthMotherLBTypeName}
 select={setSelectBirthMotherLBTypeName}
 disabled={isEdit}
 />
 </div> 
 </div>
 </div> 
 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={lbs} selected={BirthMotherLBName} select={setSelectBirthMotherLBName} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbVillage} selected={BirthMotherVillage} select={setSelectBirthMotherVillage} disabled={isEdit} placeholder={`${t("CS_COMMON_VILLAGE")}`} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={BirthMotherTaluk} select={setSelectBirthMotherTaluk} disabled={isEdit} placeholder={`${t("CS_COMMON_TALUK")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPostOffice} selected={BirthMotherPostOffice} select={setSelectBirthMotherPostOffice} disabled={isEdit} placeholder={`${t("CS_COMMON_POST_OFFICE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_PIN_CODE")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherPincode" value={BirthMotherPincode} onChange={setSelectBirthMotherPincode} disable={isEdit} placeholder={`${t("CS_COMMON_PIN_CODE")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", maxLength: 6, minLength: 6, title: t("CS_COMMON_INVALID_PIN_CODE") })} />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherMainPlaceEn" value={BirthMotherMainPlaceEn} onChange={setSelectBirthMotherMainPlaceEn} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherLocalityNameEn" value={BirthMotherLocalityNameEn} onChange={setSelectBirthMotherLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 </div>
 </div>


 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherStreetNameEn" value={BirthMotherStreetNameEn} onChange={setSelectBirthMotherStreetNameEn} placeholder={`${t("CR_STREET_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherHouseNameEn" value={BirthMotherHouseNameEn} onChange={setSelectBirthMotherHouseNameEn} placeholder={`${t("CR_HOUSE_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })} />
 </div>
 </div>
 </div>
 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherBuldingNo" value={BirthMotherBuldingNo} onChange={setSelectBirthMotherBuldingNo} placeholder={`${t("CR_BUILDING_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_DOOR_NO")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherDoorNo" value={BirthMotherDoorNo} onChange={setSelectBirthMotherDoorNo} placeholder={`${t("CR_DOOR_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })} />
 </div>
 </div>
 </div>
 
 {/* <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbState}
 selected={StateName}
 select={setSelectStateName}
 disabled={isEdit}
 />
 </div>
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbCountry}
 selected={MotherCountry}
 select={setSelectMotherCountry}
 disabled={isEdit}
 />
 </div>
 </div>
 </div> */}
 

 </FormStep>
 </React.Fragment>
 );
};
export default BirthParentsAddress;