import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressInsideKerala = ({ config, onSelect, userType, formData }) => {
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
 console.log("Country");
 console.log(Country);
 const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
 const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
 const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [WardNo, setWardNo] = useState(formData.AddressInsideKeralaDetails?.wardno);
//  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [isInitialRender, setIsInitialRender] = useState(true);
 const [lbs, setLbs] = useState(0);
 const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
 const [insideKeralaDistrict, setinsideKeralaDistrict] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaDistrict);
 const [insideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaLBTypeName);
 const [insideKeralaLBName, setinsideKeralaLBName] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaLBName);
 const [insideKeralaTaluk, setinsideKeralaTaluk] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaTaluk);
 const [insideKeralaPostOffice, setinsideKeralaPostOffice] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaPostOffice);
 const [insideKeralaPincode, setinsideKeralaPincode] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaPincode);
 const [insideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaHouseNameEn); 
 const [insideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaHouseNameMl); 
 const [insideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaLocalityNameEn); 
 const [insideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaLocalityNameMl);
 const [insideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaStreetNameEn);
 const [insideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaStreetNameMl);  
 const [insideKeralaVillage, setinsideKeralaVillage] = useState(formData?.AddressInsideKeralaDetails?.insideKeralaVillage);  
 
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
 District &&
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

  function setSelectinsideKeralaDistrict(value) {
    setIsInitialRender(true);
    setinsideKeralaDistrict(value);
    setinsideKeralaLBName(null);
    setLbs(null);
    districtid = value.districtid    
    }
 function setSelectinsideKeralaLBTypeName(value) {
 setinsideKeralaLBTypeName(value);
 
 }
 function setSelectinsideKeralaLBName(value) {
  setinsideKeralaLBName(value);
  
  }
  function setSelectinsideKeralaVillage(value) {
    setinsideKeralaVillage(value);
    console.log("Village" + cmbVillage);   
    }
 function setSelectinsideKeralaTaluk(value) {
      setinsideKeralaTaluk(value);
      console.log("Taluk" + cmbTaluk);   
  }
      
  function setSelectinsideKeralaPostOffice(value) {
    setinsideKeralaPostOffice(value);     
 }
function setSelectinsideKeralaPincode(e) {
  setinsideKeralaPincode(e.target.value);      
}

 function setSelectinsideKeralaHouseNameEn(e) {
 setinsideKeralaHouseNameEn(e.target.value);
 
 }
 function setSelectinsideKeralaHouseNameMl(e) {
  setinsideKeralaHouseNameMl(e.target.value);
  
  }


 function setSelectinsideKeralaLocalityNameEn(e) {
 setinsideKeralaLocalityNameEn(e.target.value);
 
 }
 function setSelectinsideKeralaLocalityNameMl(e) {
  setinsideKeralaLocalityNameMl(e.target.value);
  
  }

 function setSelectinsideKeralaStreetNameEn(e) {
 setinsideKeralaStreetNameEn(e.target.value); 
 }

 function setSelectinsideKeralaStreetNameMl(e) {
  setinsideKeralaStreetNameMl(e.target.value); 
  }
  function setSelectWard(value) {
    setWardNo(value);
  }

 useEffect(() => {
 if (isInitialRender) {
 console.log("insideKeralaDistrict" + districtid);
 console.log(localbodies);
 if (insideKeralaDistrict) {
 setIsInitialRender(false);
 setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === insideKeralaDistrict.districtid));
 }
 }
 }, [lbs, isInitialRender]);
 const goNext = () => {

//  sessionStorage.setItem("insideKeralaLBTypeName", insideKeralaLBTypeName.code);

 sessionStorage.setItem("insideKeralaHouseNameEn", insideKeralaHouseNameEn);
 sessionStorage.setItem("insideKeralaHouseNameMl", insideKeralaHouseNameMl); 

 sessionStorage.setItem("insideKeralaLocalityNameEn", insideKeralaLocalityNameEn);
 sessionStorage.setItem("insideKeralaLocalityNameMl", insideKeralaLocalityNameMl);
 sessionStorage.setItem("insideKeralaStreetNameEn", insideKeralaStreetNameEn);
 sessionStorage.setItem("insideKeralaStreetNameMl", insideKeralaStreetNameMl);
 sessionStorage.setItem("insideKeralaVillage", insideKeralaVillage.code);
 sessionStorage.setItem("insideKeralaLBName", null);
 sessionStorage.setItem("insideKeralaDistrict", insideKeralaDistrict.code);
 sessionStorage.setItem("insideKeralaTaluk", insideKeralaTaluk.code);
 sessionStorage.setItem("insideKeralaPostOffice", insideKeralaPostOffice.code);
 sessionStorage.setItem("insideKeralaPincode", insideKeralaPincode.code);

 onSelect(config.key, {
  insideKeralaLBName, 
  insideKeralaDistrict, 
  insideKeralaTaluk, 
  insideKeralaVillage,
  insideKeralaLocalityNameEn, 
  insideKeralaStreetNameEn, 
  insideKeralaHouseNameEn,
  insideKeralaLocalityNameMl,
  insideKeralaStreetNameMl,
  insideKeralaHouseNameMl,
  insideKeralaPincode,
  insideKeralaPostOffice,
  
  });
  }
 return (
 <React.Fragment>
 {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null} */}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!insideKeralaDistrict}>

 <div className="row">
 <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span> </h1>
 </div>
 </div>

 

 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_DISTRICT")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={insideKeralaDistrict} select={setSelectinsideKeralaDistrict} disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
 </div>
 
 {/* <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={insideKeralaLBTypeName}
 select={setSelectinsideKeralaLBTypeName}
 disabled={isEdit}
 />
 </div>  */}
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={insideKeralaTaluk} select={setSelectinsideKeralaTaluk} disabled={isEdit} placeholder={`${t("CS_COMMON_TALUK")}`} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbVillage} selected={insideKeralaVillage} select={setSelectinsideKeralaVillage} disabled={isEdit} placeholder={`${t("CS_COMMON_VILLAGE")}`} />
 </div>
 </div>
 </div> 
 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={lbs} selected={insideKeralaLBName} select={setSelectinsideKeralaLBName} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
 </div>
 <div className="col-md-6" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={WardNo} select={setSelectWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div>
 
 </div>
 </div>
 
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-4" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insideKeralaLocalityNameEn" value={insideKeralaLocalityNameEn} onChange={setSelectinsideKeralaLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insideKeralaStreetNameEn" value={insideKeralaStreetNameEn} onChange={setSelectinsideKeralaStreetNameEn} placeholder={`${t("CR_STREET_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_HOUSE_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insideKeralaHouseNameEn" value={insideKeralaHouseNameEn} onChange={setSelectinsideKeralaHouseNameEn} placeholder={`${t("CR_HOUSE_NAME_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })} />
 </div>
 </div>
 </div>
 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-4" ><CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insideKeralaLocalityNameMl" value={insideKeralaLocalityNameMl} onChange={setSelectinsideKeralaLocalityNameMl} disable={isEdit} placeholder={`${t("CR_LOCALITY_ML")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insideKeralaStreetNameMl" value={insideKeralaStreetNameMl} onChange={setSelectinsideKeralaStreetNameMl} placeholder={`${t("CR_STREET_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })} />
 </div>
 <div className="col-md-4" ><CardLabel>{t("CR_HOUSE_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insideKeralaHouseNameMl" value={insideKeralaHouseNameMl} onChange={setSelectinsideKeralaHouseNameMl} placeholder={`${t("CR_HOUSE_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })} />
 </div>
 </div>
 </div>

 <div className="row">
 <div className="col-md-12" >
 
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPostOffice} selected={insideKeralaPostOffice} select={setSelectinsideKeralaPostOffice} disabled={isEdit} placeholder={`${t("CS_COMMON_POST_OFFICE")}`} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CS_COMMON_PIN_CODE")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insideKeralaPincode" value={insideKeralaPincode} onChange={setSelectinsideKeralaPincode} disable={isEdit} placeholder={`${t("CS_COMMON_PIN_CODE")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", maxLength: 6, minLength: 6, title: t("CS_COMMON_INVALID_PIN_CODE") })} />
 </div>
 </div>
 </div>

 
 
 
 
 

 </FormStep>
 </React.Fragment>
 );
};
export default AddressInsideKerala;