import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InstitutionAddress = ({ config, onSelect, userType, formData }) => {
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
 const [WardNo, setWardNo] = useState(formData.InstitutionAddressDetails?.wardno);
//  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [isInitialRender, setIsInitialRender] = useState(true);
 const [lbs, setLbs] = useState(0);
 const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
 const [AdrsCountry, setAdrsCountry] = useState(formData?.InstitutionAddressDetails?.AdrsCountry);
 const [AdrsStateName, setAdrsStateName] = useState(formData?.InstitutionAddressDetails?.AdrsStateName);
 const [AdrsDistrict, setAdrsDistrict] = useState(formData?.InstitutionAddressDetails?.AdrsDistrict);
 const [AdrsLBTypeName, setAdrsLBTypeName] = useState(formData?.InstitutionAddressDetails?.AdrsLBTypeName);
 const [AdrsLBName, setAdrsLBName] = useState(formData?.InstitutionAddressDetails?.AdrsLBName);
 const [AdrsTaluk, setAdrsTaluk] = useState(formData?.InstitutionAddressDetails?.AdrsTaluk);
 const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.InstitutionAddressDetails?.AdrsPostOffice);
 const [AdrsPincode, setAdrsPincode] = useState(formData?.InstitutionAddressDetails?.AdrsPincode);
 const [AdrsInstnNameEn, setAdrsInstnNameEn] = useState(formData?.InstitutionAddressDetails?.AdrsInstnNameEn); 
 const [AdrsInstnNameMl, setAdrsInstnNameMl] = useState(formData?.InstitutionAddressDetails?.AdrsInstnNameMl); 
 const [AdrsBuldingNo, setAdrsBuldingNo] = useState(formData?.InstitutionAddressDetails?.AdrsBuldingNo);
 const [AdrsResNo, setAdrsResNo] = useState(formData?.InstitutionAddressDetails?.AdrsResNo);

 const [AdrsDoorNo, setAdrsDoorNo] = useState(formData?.InstitutionAddressDetails?.AdrsDoorNo);
 const [AdrsMainPlaceEn, setAdrsMainPlaceEn] = useState(formData?.InstitutionAddressDetails?.AdrsMainPlaceEn); 
 const [AdrsMainPlaceMl, setAdrsMainPlaceMl] = useState(formData?.InstitutionAddressDetails?.AdrsMainPlaceMl); 
 const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.InstitutionAddressDetails?.AdrsLocalityNameEn); 
 const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.InstitutionAddressDetails?.AdrsLocalityNameMl);
 const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.InstitutionAddressDetails?.AdrsStreetNameEn);
 const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.InstitutionAddressDetails?.AdrsStreetNameMl);  
 const [AdrsVillage, setAdrsVillage] = useState(formData?.InstitutionAddressDetails?.AdrsVillage);  

 let cmbCountry = [];
 let cmbState = [];
 let cmbPlace = [];
 let cmbTaluk = [];
 let cmbVillage = [];
 let cmbDistrict = [];
 let cmbPostOffice = [];
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

 function setSelectAdrsCountry(value) {
  setAdrsCountry(value);
  console.log("Country" + cmbCountry);
  
  }
  function setSelectAdrsStateName(value) {
  setAdrsStateName(value);
  console.log("StateName" + cmbState);
  
  }

  function setSelectAdrsDistrict(value) {
    setIsInitialRender(true);
    setAdrsDistrict(value);
    setAdrsLBName(null);
    setLbs(null);
    districtid = value.districtid    
    }
 function setSelectAdrsLBTypeName(value) {
 setAdrsLBTypeName(value);
 
 }
 function setSelectAdrsLBName(value) {
  setAdrsLBName(value);
  
  }
  function setSelectAdrsVillage(value) {
    setAdrsVillage(value);
    console.log("Village" + cmbVillage);   
    }
 function setSelectAdrsTaluk(value) {
      setAdrsTaluk(value);
      console.log("Taluk" + cmbTaluk);   
  }
      
  function setSelectAdrsPostOffice(value) {
    setAdrsPostOffice(value);     
 }
function setSelectAdrsPincode(e) {
  setAdrsPincode(e.target.value);      
}
 function setSelectAdrsBuldingNo(e) {
 setAdrsBuldingNo(e.target.value);

 }
 function setSelectAdrsResNo(e) {
  setAdrsResNo(e.target.value);
 
  }
 function setSelectAdrsDoorNo(e) {
 setAdrsDoorNo(e.target.value);
 
 }
 function setSelectAdrsInstnNameEn(e) {
 setAdrsInstnNameEn(e.target.value);
 
 }
 function setSelectAdrsInstnNameMl(e) {
  setAdrsInstnNameMl(e.target.value);
  
  }

 function setSelectAdrsMainPlaceEn(e) {
 setAdrsMainPlaceEn(e.target.value);
 
 }
 function setSelectAdrsMainPlaceMl(e) {
  setAdrsMainPlaceMl(e.target.value);
  
  }

 function setSelectAdrsLocalityNameEn(e) {
 setAdrsLocalityNameEn(e.target.value);
 
 }
 function setSelectAdrsLocalityNameMl(e) {
  setAdrsLocalityNameMl(e.target.value);
  
  }

 function setSelectAdrsStreetNameEn(e) {
 setAdrsStreetNameEn(e.target.value); 
 }

 function setSelectAdrsStreetNameMl(e) {
  setAdrsStreetNameMl(e.target.value); 
  }
  function setSelectWard(value) {
    setWardNo(value);
  }

 useEffect(() => {
 if (isInitialRender) {
 console.log("AdrsDistrict" + districtid);
 console.log(localbodies);
 if (AdrsDistrict) {
 setIsInitialRender(false);
 setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === AdrsDistrict.districtid));
 }
 }
 }, [lbs, isInitialRender]);
 const goNext = () => {
 sessionStorage.setItem("AdrsCountry", AdrsCountry.code);
 sessionStorage.setItem("AdrsStateName", AdrsStateName.code);
 sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName.code);
 sessionStorage.setItem("AdrsBuldingNo", AdrsBuldingNo);
 sessionStorage.setItem("AdrsResNo", AdrsResNo);
 sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo);
 sessionStorage.setItem("AdrsInstnNameEn", AdrsInstnNameEn);
 sessionStorage.setItem("AdrsInstnNameMl", AdrsInstnNameMl); 
 sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn); 
 sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl); 
 sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn);
 sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl);
 sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn);
 sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl);
 sessionStorage.setItem("AdrsVillage", AdrsVillage.code);
 sessionStorage.setItem("AdrsLBName", null);
 sessionStorage.setItem("AdrsDistrict", AdrsDistrict.code);
 sessionStorage.setItem("AdrsTaluk", AdrsTaluk.code);
 sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice.code);
 sessionStorage.setItem("AdrsPincode", AdrsPincode.code);

 onSelect(config.key, {
  AdrsBuldingNo, AdrsDoorNo, AdrsInstnNameEn,AdrsInstnNameMl, AdrsLocalityNameEn, AdrsCountry, AdrsStateName,
  AdrsLocalityNameMl, AdrsLBTypeName, AdrsMainPlaceEn, AdrsMainPlaceMl, AdrsStreetNameEn, 
  AdrsStreetNameMl, AdrsVillage, AdrsLBName, AdrsDistrict, AdrsTaluk, AdrsPostOffice, AdrsPincode, AdrsResNo,
  
  });
  }
 return (
 <React.Fragment>
 {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdrsDoorNo}>

 <div className="row">
 <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSTITUTION_ADDRESS")}`}</span> </h1>
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
 selected={AdrsCountry}
 select={setSelectAdrsCountry}
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
 selected={AdrsStateName}
 select={setSelectAdrsStateName}
 disabled={isEdit}
 />
 </div>
 </div>
 </div>


 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_DISTRICT")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={AdrsDistrict} select={setSelectAdrsDistrict} disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
 </div>
 
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={AdrsLBTypeName}
 select={setSelectAdrsLBTypeName}
 disabled={isEdit}
 />
 </div> 
 </div>
 </div> 
 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={lbs} selected={AdrsLBName} select={setSelectAdrsLBName} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbVillage} selected={AdrsVillage} select={setSelectAdrsVillage} disabled={isEdit} placeholder={`${t("CS_COMMON_VILLAGE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={AdrsTaluk} select={setSelectAdrsTaluk} disabled={isEdit} placeholder={`${t("CS_COMMON_TALUK")}`} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={WardNo} select={setSelectWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPostOffice} selected={AdrsPostOffice} select={setSelectAdrsPostOffice} disabled={isEdit} placeholder={`${t("CS_COMMON_POST_OFFICE")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_PIN_CODE")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsPincode" value={AdrsPincode} onChange={setSelectAdrsPincode} disable={isEdit} placeholder={`${t("CS_COMMON_PIN_CODE")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", maxLength: 6, minLength: 6, title: t("CS_COMMON_INVALID_PIN_CODE") })} />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsMainPlaceEn" value={AdrsMainPlaceEn} onChange={setSelectAdrsMainPlaceEn} disable={isEdit} placeholder={`${t("CR_MAIN_PLACE_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_MAIN_PLACE_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsMainPlaceMl" value={AdrsMainPlaceMl} onChange={setSelectAdrsMainPlaceMl} placeholder={`${t("CR_MAIN_PLACE_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsLocalityNameEn" value={AdrsLocalityNameEn} onChange={setSelectAdrsLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsLocalityNameMl" value={AdrsLocalityNameMl} onChange={setSelectAdrsLocalityNameMl} disable={isEdit} placeholder={`${t("CR_LOCALITY_ML")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
 </div>
 </div>
 </div>

 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsStreetNameEn" value={AdrsStreetNameEn} onChange={setSelectAdrsStreetNameEn} placeholder={`${t("CR_STREET_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsStreetNameMl" value={AdrsStreetNameMl} onChange={setSelectAdrsStreetNameMl} placeholder={`${t("CR_STREET_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_INSTITUTION_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsInstnNameEn" value={AdrsInstnNameEn} onChange={setSelectAdrsInstnNameEn} placeholder={`${t("CR_INSTITUTION_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INSTITUTION_NAME_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_INSTITUTION_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsInstnNameMl" value={AdrsInstnNameMl} onChange={setSelectAdrsInstnNameMl} placeholder={`${t("CR_INSTITUTION_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INSTITUTION_NAME_ML") })} />
 </div>
 </div>
 </div>
 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsBuldingNo" value={AdrsBuldingNo} onChange={setSelectAdrsBuldingNo} placeholder={`${t("CR_BUILDING_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_DOOR_NO")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsDoorNo" value={AdrsDoorNo} onChange={setSelectAdrsDoorNo} placeholder={`${t("CR_DOOR_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_RES_ASSOCIATION_NO")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsResNo" value={AdrsResNo} onChange={setSelectAdrsResNo} placeholder={`${t("CR_RES_ASSOCIATION_NO")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO") })} />
 </div>
 </div>
 </div>
 

 </FormStep>
 </React.Fragment>
 );
};
export default InstitutionAddress;