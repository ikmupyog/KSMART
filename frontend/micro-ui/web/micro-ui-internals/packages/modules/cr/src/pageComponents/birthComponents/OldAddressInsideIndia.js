import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox,Loader ,Toast} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const AddressAdrsInsideIndia = ({
  config,
  onSelect,
  userType,
  formData,
  AdrsInsideIndiaCountry,
  setAdrsInsideIndiaCountry,
  AdrsInsideIndiaStateName,
  setAdrsInsideIndiaStateName,
  AdrsInsideIndiaDistrict,
  setAdrsInsideIndiaDistrict,  
  AdrsInsideIndiaTaluk,
  setAdrsInsideIndiaTaluk,
  AdrsInsideIndiaPostOffice,
  setAdrsInsideIndiaPostOffice,
  AdrsInsideIndiaPincode,
  setAdrsInsideIndiaPincode,
  AdrsInsideIndiaHouseNameEn,
  setAdrsInsideIndiaHouseNameEn,
  AdrsInsideIndiaHouseNameMl,
  setAdrsInsideIndiaHouseNameMl,
  AdrsInsideIndiaResNoEn,
  setAdrsInsideIndiaResNoEn, 
  AdrsInsideIndiaResNoMl, 
  setAdrsInsideIndiaResNoMl,
  AdrsInsideIndiaMainPlaceEn,
  setAdrsInsideIndiaMainPlaceEn,
  AdrsInsideIndiaLocalityNameEn,
  setAdrsInsideIndiaLocalityNameEn,  
  AdrsInsideIndiaVillage,
  setAdrsInsideIndiaVillage, 
  AdrsInsideIndiaMainPlaceMl,
  setAdrsInsideIndiaMainPlaceMl,
  AdrsInsideIndiaLocalityNameMl,
  setAdrsInsideIndiaLocalityNameMl, 
  AdrsInsideIndiaCityVilgeEn,
  setAdrsInsideIndiaCityVilgeEn,
  AdrsInsideIndiaCityVilgeMl,
  setAdrsInsideIndiaCityVilgeMl,

 
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  // console.log("localbodies" + LBCombo);
  // Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  
  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderTenant, setIsInitialRenderTenant] = useState(true);
  const [country, setcountrys] = useState(0);
  const [states, setStates] = useState(0);
  const [districts, setdistricts] = useState(0);
  const [lbtypes, setlbtypes] = useState(0);
  const [lbs, setLbs] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");



  // const [AdrsInsideIndiaCountry, setAdrsInsideIndiaCountry] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaCountry ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaCountry : null);
  // const [AdrsInsideIndiaStateName, setAdrsInsideIndiaStateName] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaStateName ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaStateName : null);
  // const [AdrsInsideIndiaDistrict, setAdrsInsideIndiaDistrict] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaDistrict ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaDistrict : null);
  // const [AdrsInsideIndiaTaluk, setAdrsInsideIndiaTaluk] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaTaluk ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaTaluk : null);
  // const [AdrsInsideIndiaPostOffice, setAdrsInsideIndiaPostOffice] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaPostOffice ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaPostOffice : null);
  // const [AdrsInsideIndiaPincode, setAdrsInsideIndiaPincode] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaPincode ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaPincode : null);
  // const [AdrsInsideIndiaHouseNameEn, setAdrsInsideIndiaHouseNameEn] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaHouseNameEn ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaHouseNameEn : null);
  // const [AdrsInsideIndiaHouseNameMl, setAdrsInsideIndiaHouseNameMl] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaHouseNameMl ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaHouseNameMl : null);
  // const [AdrsInsideIndiaResNoEn, setAdrsInsideIndiaResNoEn] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaResNoEn ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaResNoEn : null);
  // const [AdrsInsideIndiaResNoMl, setAdrsInsideIndiaResNoMl] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaResNoMl ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaResNoMl : null);
  // const [AdrsInsideIndiaMainPlaceEn, setAdrsInsideIndiaMainPlaceEn] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaMainPlaceEn ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaMainPlaceEn : null);
  // const [AdrsInsideIndiaMainPlaceMl, setAdrsInsideIndiaMainPlaceMl] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaMainPlaceMl ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaMainPlaceMl : null);
  // const [AdrsInsideIndiaCityVilgeEn,  setAdrsInsideIndiaCityVilgeEn] = useState(formData?.AddressInsideIndiaDetails?. AdrsInsideIndiaCityVilgeEn ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaCityVilgeEn : null);
  // const [AdrsInsideIndiaCityVilgeMl, setAdrsInsideIndiaCityVilgeMl] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaCityVilgeMl ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaCityVilgeMl : null);  
  // const [AdrsInsideIndiaLocalityNameEn, setAdrsInsideIndiaLocalityNameEn] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaLocalityNameEn ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaLocalityNameEn : null);
  // const [AdrsInsideIndiaLocalityNameMl, setAdrsInsideIndiaLocalityNameMl] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaLocalityNameMl ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaLocalityNameMl : null);  
  // const [AdrsInsideIndiaVillage, setAdrsInsideIndiaVillage] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaVillage ? formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaVillage : null);

    // const [AdrsInsideIndiaPincodeError, setAdrsInsideIndiaPincodeError] = useState(formData?.AddressInsideIndiaDetails?.AdrsInsideIndiaPincode ? false : false);

  const cmbUrbanRural = [
    { i18nKey: "Town", code: "TOWN" },
    { i18nKey: "Village", code: "VILLAGE" },
];
let cmbfilterCountry = [];
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
  function setSelectAdrsInsideIndiaCountry(value) {
    setAdrsInsideIndiaCountry(value);
    console.log("Country" + cmbCountry);
  }

  function setSelectAdrsInsideIndiaStateName(value) {
    setAdrsInsideIndiaStateName(value);
    console.log("StateName" + cmbState);
  }

  function setSelectAdrsInsideIndiaDistrict(value) {
   
    setAdrsInsideIndiaDistrict(value);    
    districtid = value.districtid;
  }
  // function setSelectAdrsInsideIndiaLBTypeName(value) {
  //   setAdrsInsideIndiaLBTypeName(value);
  // }
  // function setSelectAdrsInsideIndiaLBName(value) {
  //   setAdrsInsideIndiaLBName(value);
  // }
  function setSelectAdrsInsideIndiaVillage(value) {
    setAdrsInsideIndiaVillage(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectAdrsInsideIndiaTaluk(value) {
    setAdrsInsideIndiaTaluk(value);
    console.log("Taluk" + cmbTaluk);
  }

  function setSelectAdrsInsideIndiaPostOffice(value) {
    setAdrsInsideIndiaPostOffice(value);
  }
  // function setSelectAdrsInsideIndiaPincode(e) {
  //   setAdrsInsideIndiaPincode(e.target.value);
  // }
  
  function setSelectAdrsInsideIndiaPincode(e) {
    if (e.target.value.length === 7) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsInsideIndiaPincode(e.target.value);
    }
  }

  // function setSelectAdrsInsideIndiaPincode(e) {
  //   if (e.target.value.length != 0) {

  //     if (e.target.value.length > 6) {
  //       // setMotherAadhar(e.target.value);
  //       setAdrsInsideIndiaPincodeeError(true);
  //       return false;
  //     } else if (e.target.value.length < 6) {
  //       setAdrsInsideIndiaPincodeeError(true);
  //       setAdrsInsideIndiaPincode(e.target.value);
  //       return false;
  //     }
  //     else {
  //       setAdrsInsideIndiaPincodeeError(false);
  //       setAdrsInsideIndiaPincode(e.target.value);
        
  //     }
  //   }
  // }


  function setSelectAdrsInsideIndiaResNoEn(e) {
    if (e.target.value.length === 20) {
      return false;
     
    } else {
    setAdrsInsideIndiaResNoEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
}
  function setSelectAdrsInsideIndiaResNoMl(e) {
    if (e.target.value.length === 20) {
      return false;
      
    } else {
    setAdrsInsideIndiaResNoMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
}
  
  function setSelectAdrsInsideIndiaHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      
    } else {
      setAdrsInsideIndiaHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
    }
  }

  function setSelectAdrsInsideIndiaHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsInsideIndiaHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`' ]/ig,''));
    }
  }
 

  function setSelectAdrsInsideIndiaMainPlaceEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
    setAdrsInsideIndiaMainPlaceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }

}
  function setSelectAdrsInsideIndiaMainPlaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
    setAdrsInsideIndiaMainPlaceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
  }

  function setSelectAdrsInsideIndiaCityVilgeEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
    setAdrsInsideIndiaCityVilgeEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
}
  function setSelectAdrsInsideIndiaCityVilgeMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setAdrsInsideIndiaCityVilgeMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
  
}
  function setSelectAdrsInsideIndiaLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
    setAdrsInsideIndiaLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
    }
  }
  function setSelectAdrsInsideIndiaLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
    setAdrsInsideIndiaLocalityNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
  }
 
  const goNext = () => {

   
  
    //  sessionStorage.setItem("AdrsInsideIndiaCountry", AdrsInsideIndiaCountry.code ? AdrsInsideIndiaCountry.code  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaStateName", AdrsInsideIndiaStateName.code ? AdrsInsideIndiaStateName.code  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaDistrict", AdrsInsideIndiaDistrict.code ? AdrsInsideIndiaDistrict.code  : null );    
    //  sessionStorage.setItem("AdrsInsideIndiaHouseNameEn", AdrsInsideIndiaHouseNameEn ? AdrsInsideIndiaHouseNameEn  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaHouseNameMl", AdrsInsideIndiaHouseNameMl ? AdrsInsideIndiaHouseNameMl  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaMainPlaceEn", AdrsInsideIndiaMainPlaceEn ? AdrsInsideIndiaMainPlaceEn  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaMainPlaceMl", AdrsInsideIndiaMainPlaceMl ? AdrsInsideIndiaMainPlaceMl  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaCityVilgeEn", AdrsInsideIndiaCityVilgeEn ? AdrsInsideIndiaCityVilgeEn  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaCityVilgeMl", AdrsInsideIndiaCityVilgeMl ? AdrsInsideIndiaCityVilgeMl  : null );     
    //  sessionStorage.setItem("AdrsInsideIndiaLocalityNameEn", AdrsInsideIndiaLocalityNameEn ? AdrsInsideIndiaLocalityNameEn  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaLocalityNameMl", AdrsInsideIndiaLocalityNameMl ? AdrsInsideIndiaLocalityNameMl  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaVillage", AdrsInsideIndiaVillage.code ? AdrsInsideIndiaVillage.code  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaResNoEn", AdrsInsideIndiaResNoEn ? AdrsInsideIndiaResNoEn  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaResNoMl", AdrsInsideIndiaResNoMl ? AdrsInsideIndiaResNoMl : null );   
    //  sessionStorage.setItem("AdrsInsideIndiaTaluk", AdrsInsideIndiaTaluk.code ? AdrsInsideIndiaTaluk.code  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaPostOffice", AdrsInsideIndiaPostOffice.code ? AdrsInsideIndiaPostOffice.code  : null );
    //  sessionStorage.setItem("AdrsInsideIndiaPincode", AdrsInsideIndiaPincode ? AdrsInsideIndiaPincode  : null );   
    // onSelect(config.key, {     
            
    //   AdrsInsideIndiaCountry,
    //   AdrsInsideIndiaStateName,
    //   AdrsInsideIndiaDistrict,
    //   AdrsInsideIndiaTaluk,
    //   AdrsInsideIndiaVillage,
    //   AdrsInsideIndiaMainPlaceEn,
    //   AdrsInsideIndiaMainPlaceMl,
    //   AdrsInsideIndiaCityVilgeEn,
    //   AdrsInsideIndiaCityVilgeMl,      
    //   AdrsInsideIndiaLocalityNameEn,
    //   AdrsInsideIndiaLocalityNameMl, 
    //   AdrsInsideIndiaPostOffice,
    //   AdrsInsideIndiaPincode,
    //   AdrsInsideIndiaResNoEn,
    //   AdrsInsideIndiaResNoMl,
    //   AdrsInsideIndiaHouseNameEn,
    //   AdrsInsideIndiaHouseNameMl,
     
    // });
  };

  if (isCountryLoading || isStateLoading  || isPostOfficeLoading  || isDistrictLoading || isTalukLoading || isVillageLoading ) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdrsInsideIndiaCountry}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOME_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbCountry}
                selected={AdrsInsideIndiaCountry}
                select={setSelectAdrsInsideIndiaCountry}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_STATE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbState}
                selected={AdrsInsideIndiaStateName}
                select={setSelectAdrsInsideIndiaStateName}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_DISTRICT")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbDistrict}
                selected={AdrsInsideIndiaDistrict}
                select={setSelectAdrsInsideIndiaDistrict}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>           
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">            
            <div className="col-md-6">
              <CardLabel>
                {t("CR_TALUK_TEHSIL")}
              
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbTaluk}
                selected={AdrsInsideIndiaTaluk}
                select={setSelectAdrsInsideIndiaTaluk}
                disabled={isEdit}
                placeholder={`${t("CR_TALUK_TEHSIL")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_TOWN_VILLAGE_EN")}              
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="i18nKey"
                isMandatory={true}
                option={cmbUrbanRural}
                selected={AdrsInsideIndiaVillage}
                select={setSelectAdrsInsideIndiaVillage}
                disabled={isEdit}
                placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
              />
            </div>            
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">          
            <div className="col-md-6">
              <CardLabel>{t("CR_CITY_VILLAGE_NAME_EN")}             
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaCityVilgeEn"
                value={AdrsInsideIndiaCityVilgeEn}
                onChange={setSelectAdrsInsideIndiaCityVilgeEn}
                disable={isEdit}
                placeholder={`${t("CR_CITY_VILLAGE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_CITY_VILLAGE_NAME_ML")}
               
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaCityVilgeMl"
                value={AdrsInsideIndiaCityVilgeMl}
                onChange={setSelectAdrsInsideIndiaCityVilgeMl}
                placeholder={`${t("CR_CITY_VILLAGE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_ML") })}
              />
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">          
            <div className="col-md-6">
              <CardLabel>{t("CR_MAIN_PLACE_EN")}             
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaMainPlaceEn"
                value={AdrsInsideIndiaMainPlaceEn}
                onChange={setSelectAdrsInsideIndiaMainPlaceEn}
                disable={isEdit}
                placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_MAIN_PLACE_ML")}              
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaMainPlaceMl"
                value={AdrsInsideIndiaMainPlaceMl}
                onChange={setSelectAdrsInsideIndiaMainPlaceMl}
                placeholder={`${t("CR_MAIN_PLACE_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">    
             <div className="col-md-6">
              <CardLabel>{t("CR_LOCALITY_EN")}              
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaLocalityNameEn"
                value={AdrsInsideIndiaLocalityNameEn}
                onChange={setSelectAdrsInsideIndiaLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_LOCALITY_ML")}              
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaLocalityNameMl"
                value={AdrsInsideIndiaLocalityNameMl}
                onChange={setSelectAdrsInsideIndiaLocalityNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">          
            <div className="col-md-6">
              <CardLabel>{t("CS_COMMON_POST_OFFICE")}
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbPostOffice}
                selected={AdrsInsideIndiaPostOffice}
                select={setSelectAdrsInsideIndiaPostOffice}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CS_COMMON_PIN_CODE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaPincode"
                value={AdrsInsideIndiaPincode}
                onChange={setSelectAdrsInsideIndiaPincode}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_PIN_CODE")}`}
                {...(validation = {
                  pattern: "^[a-zA-Z-.`' ]*$",
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
            <div className="col-md-6">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaResNoEn"
                value={AdrsInsideIndiaResNoEn}
                onChange={setSelectAdrsInsideIndiaResNoEn}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_EN") })}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaResNoMl"
                value={AdrsInsideIndiaResNoMl}
                onChange={setSelectAdrsInsideIndiaResNoMl}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_ML")}`}
                disable={isEdit}
                {...(validation = {  pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_ML") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_HOUSE_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaHouseNameEn"
                value={AdrsInsideIndiaHouseNameEn}
                onChange={setSelectAdrsInsideIndiaHouseNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NAME_ML")}
              
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInsideIndiaHouseNameMl"
                value={AdrsInsideIndiaHouseNameMl}
                onChange={setSelectAdrsInsideIndiaHouseNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
              />
            </div>
          </div>
        </div>

     
        
      </FormStep>
    </React.Fragment>
  );
};
export default AddressAdrsInsideIndia;
