import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPresent = ({ config, onSelect, userType, formData }) => {
 const stateId = Digit.ULBService.getStateId();
 const { t } = useTranslation();
 let validation = {};
 const tenantId = Digit.ULBService.getCurrentTenantId();
 const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
 const { data: State = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
 const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
 const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
 const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
 const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District"); 
 const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
 const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
 const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [WardNo, setWardNo] = useState(formData.TradeDetails?.address?.wardno);
//  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [isInitialRender, setIsInitialRender] = useState(true);
 const [lbs, setLbs] = useState(0);
 const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
 const [MotherDistrict, setMotherDistrict] = useState(formData?.AddressPresentDetails?.MotherDistrict);
 const [MotherLBTypeName, setMotherLBTypeName] = useState(formData?.AddressPresentDetails?.MotherLBTypeName);
 const [MotherLBName, setMotherLBName] = useState(formData?.AddressPresentDetails?.MotherLBName);
 const [MotherTaluk, setMotherTaluk] = useState(formData?.AddressPresentDetails?.MotherTaluk);
 const [MotherPostOffice, setMotherPostOffice] = useState(formData?.AddressPresentDetails?.MotherPostOffice);
 const [MotherPincode, setMotherPincode] = useState(formData?.AddressPresentDetails?.MotherPincode);
 const [MotherHouseNameEn, setMotherHouseNameEn] = useState(formData?.AddressPresentDetails?.MotherHouseNameEn); 
 const [MotherHouseNameMl, setMotherHouseNameMl] = useState(formData?.AddressPresentDetails?.MotherHouseNameMl); 
 const [MotherBuldingNo, setMotherBuldingNo] = useState(formData?.AddressPresentDetails?.MotherBuldingNo);
 const [MotherResNo, setMotherResNo] = useState(formData?.AddressPresentDetails?.MotherResNo);

 const [MotherDoorNo, setMotherDoorNo] = useState(formData?.AddressPresentDetails?.MotherDoorNo);
 const [MotherMainPlaceEn, setMotherMainPlaceEn] = useState(formData?.AddressPresentDetails?.MotherMainPlaceEn); 
 const [MotherMainPlaceMl, setMotherMainPlaceMl] = useState(formData?.AddressPresentDetails?.MotherMainPlaceMl); 
 const [MotherLocalityNameEn, setMotherLocalityNameEn] = useState(formData?.AddressPresentDetails?.MotherLocalityNameEn); 
 const [MotherLocalityNameMl, setMotherLocalityNameMl] = useState(formData?.AddressPresentDetails?.MotherLocalityNameMl);
 const [MotherStreetNameEn, setMotherStreetNameEn] = useState(formData?.AddressPresentDetails?.MotherStreetNameEn);
 const [MotherStreetNameMl, setMotherStreetNameMl] = useState(formData?.AddressPresentDetails?.MotherStreetNameMl);  
 const [MotherVillage, setMotherVillage] = useState(formData?.AddressPresentDetails?.MotherVillage);  
 
 let cmbPlace = [];
 let cmbTaluk = [];
 let cmbVillage = [];
 let cmbDistrict = [];
 let cmbPostOffice = [];
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


 LBType &&
 LBType["common-masters"] &&
 LBType["common-masters"].LBType.map((ob) => {
 cmbLBType.push(ob);
 });
 let Zonal = [];
 let cmbWardNo = [];
 let cmbWardNoFinal = [];
 boundaryList &&
   boundaryList["egov-location"] &&
   boundaryList["egov-location"].TenantBoundary.map((ob) => {
     //  console.log(ob);
     // if(ob?.boundary){
     Zonal.push(...ob.boundary.children);
     ob.boundary.children.map((obward) => {
       cmbWardNo.push(...obward.children);
     });
     // }

   });
 //console.log(Zonal);
 cmbWardNo.map((wardmst) => {
   wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
   wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
   cmbWardNoFinal.push(wardmst);
 });



 const onSkip = () => onSelect();

  function setSelectMotherDistrict(value) {
    setIsInitialRender(true);
    setMotherDistrict(value);
    setMotherLBName(null);
    setLbs(null);
    districtid = value.districtid    
    }
 function setSelectMotherLBTypeName(value) {
 setMotherLBTypeName(value);
 
 }
 function setSelectMotherLBName(value) {
  setMotherLBName(value);
  
  }
  function setSelectMotherVillage(value) {
    setMotherVillage(value);
    console.log("Village" + cmbVillage);   
    }
 function setSelectMotherTaluk(value) {
      setMotherTaluk(value);
      console.log("Taluk" + cmbTaluk);   
  }
      
  function setSelectMotherPostOffice(value) {
    setMotherPostOffice(value);     
 }
function setSelectMotherPincode(e) {
  setMotherPincode(e.target.value);      
}
 function setSelectMotherBuldingNo(e) {
 setMotherBuldingNo(e.target.value);

 }
 function setSelectMotherResNo(e) {
  setMotherResNo(e.target.value);
 
  }
 function setSelectMotherDoorNo(e) {
 setMotherDoorNo(e.target.value);
 
 }
 function setSelectMotherHouseNameEn(e) {
 setMotherHouseNameEn(e.target.value);
 
 }
 function setSelectMotherHouseNameMl(e) {
  setMotherHouseNameMl(e.target.value);
  
  }

 function setSelectMotherMainPlaceEn(e) {
 setMotherMainPlaceEn(e.target.value);
 
 }
 function setSelectMotherMainPlaceMl(e) {
  setMotherMainPlaceMl(e.target.value);
  
  }

 function setSelectMotherLocalityNameEn(e) {
 setMotherLocalityNameEn(e.target.value);
 
 }
 function setSelectMotherLocalityNameMl(e) {
  setMotherLocalityNameMl(e.target.value);
  
  }

 function setSelectMotherStreetNameEn(e) {
 setMotherStreetNameEn(e.target.value); 
 }

 function setSelectMotherStreetNameMl(e) {
  setMotherStreetNameMl(e.target.value); 
  }
  function setSelectWard(value) {
    setWardNo(value);
  }

 useEffect(() => {
 if (isInitialRender) {
 console.log("MotherDistrict" + districtid);
 console.log(localbodies);
 if (MotherDistrict) {
 setIsInitialRender(false);
 setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === MotherDistrict.districtid));
 }
 }
 }, [lbs, isInitialRender]);
 const goNext = () => {

 sessionStorage.setItem("MotherLBTypeName", MotherLBTypeName.code);
 sessionStorage.setItem("MotherBuldingNo", MotherBuldingNo);
 sessionStorage.setItem("MotherResNo", MotherResNo);
 sessionStorage.setItem("MotherDoorNo", MotherDoorNo);
 sessionStorage.setItem("MotherHouseNameEn", MotherHouseNameEn);
 sessionStorage.setItem("MotherHouseNameMl", MotherHouseNameMl); 
 sessionStorage.setItem("MotherMainPlaceEn", MotherMainPlaceEn); 
 sessionStorage.setItem("MotherMainPlaceMl", MotherMainPlaceMl); 
 sessionStorage.setItem("MotherLocalityNameEn", MotherLocalityNameEn);
 sessionStorage.setItem("MotherLocalityNameMl", MotherLocalityNameMl);
 sessionStorage.setItem("MotherStreetNameEn", MotherStreetNameEn);
 sessionStorage.setItem("MotherStreetNameMl", MotherStreetNameMl);
 sessionStorage.setItem("MotherVillage", MotherVillage.code);
 sessionStorage.setItem("MotherLBName", null);
 sessionStorage.setItem("MotherDistrict", MotherDistrict.code);
 sessionStorage.setItem("MotherTaluk", MotherTaluk.code);
 sessionStorage.setItem("MotherPostOffice", MotherPostOffice.code);
 sessionStorage.setItem("MotherPincode", MotherPincode.code);

 onSelect(config.key, {
  MotherBuldingNo, MotherDoorNo, MotherHouseNameEn,MotherHouseNameMl, MotherLocalityNameEn, 
  MotherLocalityNameMl, MotherLBTypeName, MotherMainPlaceEn, MotherMainPlaceMl, MotherStreetNameEn, 
  MotherStreetNameMl, MotherVillage, MotherLBName, MotherDistrict, MotherTaluk, MotherPostOffice, MotherPincode, MotherResNo,
  
  });
  }
 return (
 <React.Fragment>
 {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!MotherDoorNo}>

 <div className="row">
 <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span> </h1>
 </div>
 </div>

 

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_DISTRICT")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={MotherDistrict} select={setSelectMotherDistrict} disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
 </div>
 
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={MotherLBTypeName}
 select={setSelectMotherLBTypeName}
 disabled={isEdit}
 />
 </div> 
 </div>
 </div> 
 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={lbs} selected={MotherLBName} select={setSelectMotherLBName} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbVillage} selected={MotherVillage} select={setSelectMotherVillage} disabled={isEdit} placeholder={`${t("CS_COMMON_VILLAGE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={MotherTaluk} select={setSelectMotherTaluk} disabled={isEdit} placeholder={`${t("CS_COMMON_TALUK")}`} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={WardNo} select={setSelectWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPostOffice} selected={MotherPostOffice} select={setSelectMotherPostOffice} disabled={isEdit} placeholder={`${t("CS_COMMON_POST_OFFICE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_PIN_CODE")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherPincode" value={MotherPincode} onChange={setSelectMotherPincode} disable={isEdit} placeholder={`${t("CS_COMMON_PIN_CODE")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", maxLength: 6, minLength: 6, title: t("CS_COMMON_INVALID_PIN_CODE") })} />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherMainPlaceEn" value={MotherMainPlaceEn} onChange={setSelectMotherMainPlaceEn} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherMainPlaceMl" value={MotherMainPlaceMl} onChange={setSelectMotherMainPlaceMl} placeholder={`${t("CR_MAIN_PLACE_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherLocalityNameEn" value={MotherLocalityNameEn} onChange={setSelectMotherLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherLocalityNameMl" value={MotherLocalityNameMl} onChange={setSelectMotherLocalityNameMl} disable={isEdit} placeholder={`${t("CR_LOCALITY_ML")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
 </div>
 </div>
 </div>

 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherStreetNameEn" value={MotherStreetNameEn} onChange={setSelectMotherStreetNameEn} placeholder={`${t("CR_STREET_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherStreetNameMl" value={MotherStreetNameMl} onChange={setSelectMotherStreetNameMl} placeholder={`${t("CR_STREET_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherHouseNameEn" value={MotherHouseNameEn} onChange={setSelectMotherHouseNameEn} placeholder={`${t("CR_HOUSE_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_HOUSE_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherHouseNameMl" value={MotherHouseNameMl} onChange={setSelectMotherHouseNameMl} placeholder={`${t("CR_HOUSE_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })} />
 </div>
 </div>
 </div>
 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherBuldingNo" value={MotherBuldingNo} onChange={setSelectMotherBuldingNo} placeholder={`${t("CR_BUILDING_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_DOOR_NO")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherDoorNo" value={MotherDoorNo} onChange={setSelectMotherDoorNo} placeholder={`${t("CR_DOOR_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_RES_ASSOCIATION_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherResNo" value={MotherResNo} onChange={setSelectMotherResNo} placeholder={`${t("CCR_RES_ASSOCIATION_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO") })} />
 </div>
 </div>
 </div>
 

 </FormStep>
 </React.Fragment>
 );
};
export default AddressPresent;