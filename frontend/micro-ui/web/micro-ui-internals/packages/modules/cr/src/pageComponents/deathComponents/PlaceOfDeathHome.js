import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader } from "@egovernments/digit-ui-react-components";
// import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathHome = ({ config, onSelect, userType, formData, AdrsCountry,setAdrsCountry, AdrsStateName,setAdrsStateName,AdrsDistrict,setAdrsDistrict,
  AdrsLBTypeName, setAdrsLBTypeName, AdrsLBName, setAdrsLBName, AdrsTaluk,setAdrsTaluk, AdrsPostOffice, setAdrsPostOffice,AdrsPincode, setAdrsPincode,
  AdrsHouseNameEn, setAdrsHouseNameEn,AdrsHouseNameMl, setAdrsHouseNameMl,AdrsResNo, setAdrsResNo,AdrsDoorNo, setAdrsDoorNo,
  AdrsMainPlaceEn, setAdrsMainPlaceEn,AdrsMainPlaceMl, setAdrsMainPlaceMl,AdrsLocalityNameEn, setAdrsLocalityNameEn,AdrsLocalityNameMl, setAdrsLocalityNameMl,
  AdrsStreetNameEn, setAdrsStreetNameEn ,AdrsStreetNameMl, setAdrsStreetNameMl,AdrsVillage, setAdrsVillage}) => {

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
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  //  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [isInitialRender, setIsInitialRender] = useState(true); 
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
  const [isDisableStatus, setDisableStatus] = useState(true);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  // const [AdrsCountry, setAdrsCountry] = useState(formData?.PlaceOfDeathHome?.AdrsCountry);
  // const [AdrsStateName, setAdrsStateName] = useState(formData?.PlaceOfDeathHome?.AdrsStateName);
  // const [AdrsDistrict, setAdrsDistrict] = useState(formData?.PlaceOfDeathHome?.AdrsDistrict);
  // const [AdrsLBTypeName, setAdrsLBTypeName] = useState(formData?.PlaceOfDeathHome?.AdrsLBTypeName);
  // const [AdrsLBName, setAdrsLBName] = useState(formData?.PlaceOfDeathHome?.AdrsLBName);
  // const [AdrsTaluk, setAdrsTaluk] = useState(formData?.PlaceOfDeathHome?.AdrsTaluk);
  // const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.PlaceOfDeathHome?.AdrsPostOffice);
  // const [AdrsPincode, setAdrsPincode] = useState(formData?.PlaceOfDeathHome?.AdrsPincode);
  // const [AdrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.PlaceOfDeathHome?.AdrsHouseNameEn);
  // const [AdrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.PlaceOfDeathHome?.AdrsHouseNameMl);
  // const [AdrsBuldingNo, setAdrsBuldingNo] = useState(formData?.PlaceOfDeathHome?.AdrsBuldingNo);
  // const [AdrsResNo, setAdrsResNo] = useState(formData?.PlaceOfDeathHome?.AdrsResNo);  
  // const [AdrsDoorNo, setAdrsDoorNo] = useState(formData?.PlaceOfDeathHome?.AdrsDoorNo);
  // const [AdrsMainPlaceEn, setAdrsMainPlaceEnAdrsMainPlaceEn, setAdrsMainPlaceEn] = useState(formData?.PlaceOfDeathHome?.AdrsMainPlaceEn);
  // const [AdrsMainPlaceMl, setAdrsMainPlaceMl] = useState(formData?.PlaceOfDeathHome?.AdrsMainPlaceMl);
  // const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.PlaceOfDeathHome?.AdrsLocalityNameEn);
  // const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.PlaceOfDeathHome?.AdrsLocalityNameMl);
  // const [AdrsCityEn, setAdrsCityEn] = useState(formData?.PlaceOfDeathHome?.AdrsCityNameEn);
  // const [AdrsCityMl, setAdrsCityMl] = useState(formData?.PlaceOfDeathHome?.AdrsCityMl);   
  // const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.PlaceOfDeathHome?.AdrsStreetNameEn);
  // const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.PlaceOfDeathHome?.AdrsStreetNameMl);
  // const [AdrsVillage, setAdrsVillage] = useState(formData?.PlaceOfDeathHome?.AdrsVillage);
  // const [WardNo, setWardNo] = useState(formData.PlaceOfDeathHome?.wardno);
  let currentLB = [];
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

  let cmbFilterCountry = [];
  let cmbFilterState = [];
  let cmbFilterDistrict = [];
  let cmbFilterLBtype = [];
  let cmbFilterTaluk = [];
  let cmbFilterVillage = [];
  
  // console.log("Taluk" + Taluk);
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
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
    localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
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
  useEffect(() => {

    if (isInitialRender) {
      // if (localbodies.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
      setAdrsLBName(currentLB[0]);
      cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
      setAdrsCountry(cmbFilterCountry[0]);
      cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
      setAdrsStateName(cmbFilterState[0]);
      cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.code === currentLB[0].city.distCodeStr);
      setAdrsDistrict(cmbFilterDistrict[0]);
      cmbFilterLBtype = cmbLBType.filter((cmbLBType) => cmbLBType.code === currentLB[0].city.lbtypecode);
      setAdrsLBTypeName(cmbFilterLBtype[0]);
      cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
      setLbsTalukvalue(cmbFilterTaluk);
      cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
      console.log(cmbFilterVillage);
      setLbsVillagevalue(cmbFilterVillage);
      setIsInitialRender(false);
    }
    // }
  }, [Country, State, District, LBType, localbodies,Talukvalues,Villagevalues, isInitialRender]);

  const onSkip = () => onSelect();
  function setSelectAdrsCountry(value) {
    setAdrsCountry(value);
   
  }
  function setSelectAdrsStateName(value) {
    setAdrsStateName(value);
    // console.log("StateName" + cmbState);
  }

  function setSelectAdrsDistrict(value) {
    setIsInitialRender(true);
    setAdrsDistrict(value);
    setAdrsLBName(null);   
    districtid = value.districtid;
  }
  function setSelectAdrsLBTypeName(value) {
    setAdrsLBTypeName(value);
  }
  function setSelectAdrsLBName(value) {
    setAdrsLBName(value);
  }
  function setSelectAdrsVillage(value) {
    setAdrsVillage(value);
    // console.log("Village" + cmbVillage);
  }
  function setSelectAdrsTaluk(value) {
    setAdrsTaluk(value);
    // console.log("Taluk" + cmbTaluk);
  }

  function setSelectAdrsPostOffice(value) {
    setAdrsPostOffice(value);
  }
  function setSelectAdrsPincode(e) {
    if (e.target.value.length === 7) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsPincode(e.target.value);
    }
  }
  // function setSelectAdrsBuldingNo(e) {
  //   setAdrsBuldingNo(e.target.value);
  // }
  function setSelectAdrsResNo(e) {   
    if (e.target.value.length === 21) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsResNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' ]/ig, ''));
    }


  }
  function setSelectAdrsDoorNo(e) {
    if (e.target.value.length === 5) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsDoorNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectAdrsHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
   function setSelectAdrsHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }

    }
    function setSelectAdrsMainPlaceEn(e) {
      if (e.target.value.length === 51) {
        return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setAdrsMainPlaceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
      }
  }
   function setSelectAdrsMainPlaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsMainPlaceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }

    }

  function setSelectAdrsLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
   function setSelectAdrsLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsLocalityNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }

    }
    // function setSelectAdrsCityEn(e) {
    //   setAdrsCityEn(e.target.value);
    // }
    //  function setSelectAdrsCityMl(e) {
    //   setAdrsCityMl(e.target.value);
  
    // }    

     function setSelectAdrsStreetNameEn(e) {
    setAdrsStreetNameEn(e.target.value);
   }

   function setSelectAdrsStreetNameMl(e) {    
    setAdrsStreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }
  // function setSelectWard(value) {
  //   setWardNo(value);
  // }

  
  const goNext = () => {
    // sessionStorage.setItem("AdrsCountry", AdrsCountry ?AdrsCountry.code : null);
    // sessionStorage.setItem("AdrsStateName", AdrsStateName? AdrsStateName.code : null);
    // sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName? AdrsLBTypeName.code : null);
    // sessionStorage.setItem("AdrsBuldingNo", AdrsBuldingNo); 
    // sessionStorage.setItem("AdrsResNo", AdrsResNo);
    // sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo);
    // sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn);
    // sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl);
    // sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn);
    // sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl);
    // sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn);
    // sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl);
    // sessionStorage.setItem("AdrsCityEn", AdrsCityEn);
    // sessionStorage.setItem("AdrsCityMl", AdrsCityMl);
    // sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn);
    // sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl);
    // sessionStorage.setItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
    // sessionStorage.setItem("AdrsLBName",AdrsLBName ? AdrsLBName.code: null);
    // sessionStorage.setItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
    // sessionStorage.setItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
    // sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice ?AdrsPostOffice.code : null);
    // sessionStorage.setItem("AdrsPincode", AdrsPincode);
   
    // onSelect(config.key, {
    //   AdrsBuldingNo,
    //   AdrsDoorNo,
    //   AdrsHouseNameEn,
    //   AdrsHouseNameMl,
    //   AdrsLocalityNameEn,
    //   AdrsLocalityNameMl,
    //   AdrsCityEn,
    //   AdrsCityMl,      
    //   AdrsCountry,
    //   AdrsStateName,
    //   AdrsLBTypeName,
    //   AdrsMainPlaceEn,
    //   AdrsMainPlaceMl,
    //   AdrsStreetNameEn,
    //   AdrsStreetNameMl,
    //   AdrsVillage,
    //   AdrsLBName,
    //   AdrsDistrict,
    //   AdrsTaluk,
    //   AdrsPostOffice,
    //   AdrsPincode,
    //   AdrsResNo,
    //   // WardNo
    // });
  };

  if (isCountryLoading || isStateLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdrsDoorNo}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOME_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbCountry}
                selected={AdrsCountry}
                select={setSelectAdrsCountry}
                disable={isDisableStatus}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_STATE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbState}
                selected={AdrsStateName}
                select={setSelectAdrsStateName}
                disable={isDisableStatus}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_DISTRICT")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbDistrict}
                selected={AdrsDistrict}
                select={setSelectAdrsDistrict}
                disable={isDisableStatus}
                // placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbLBType}
                selected={AdrsLBTypeName}
                select={setSelectAdrsLBTypeName}
                disable={isDisableStatus}
              />
            </div>
          </div>
        </div>
       
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_LB_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbLB}
                selected={AdrsLBName}
                select={setSelectAdrsLBName}
                disable={isDisableStatus}
                // placeholder={`${t("CS_COMMON_LB_NAME")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_TALUK")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbTaluk}
                selected={AdrsTaluk}
                select={setSelectAdrsTaluk}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_TALUK")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_VILLAGE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbVillage}
                selected={AdrsVillage}
                select={setSelectAdrsVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_VILLAGE")}`}
              />
            </div>
            <div className="col-md-2">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbPostOffice}
                selected={AdrsPostOffice}
                select={setSelectAdrsPostOffice}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div>
            <div className="col-md-1">
              <CardLabel>
                {t("CS_COMMON_PIN_CODE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsPincode"
                value={AdrsPincode}
                onChange={setSelectAdrsPincode}
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
            <div className="col-md-3">
              <CardLabel>
                {t("CR_MAIN_PLACE_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsMainPlaceEn"
                value={AdrsMainPlaceEn}
                onChange={setSelectAdrsMainPlaceEn}
                disable={isEdit}
                placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
              />
            </div>
            <div className="col-md-3" >
              <CardLabel>{t("CR_MAIN_PLACE_ML")}<span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput t={t} 
              isMandatory={false} 
              type={"text"} 
              optionKey="i18nKey" 
              name="AdrsMainPlaceMl" 
              value={AdrsMainPlaceMl} 
              onChange={setSelectAdrsMainPlaceMl} 
              placeholder={`${t("CR_MAIN_PLACE_ML")}`} 
              disable={isEdit} 
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })} />
           </div>
           <div className="col-md-3" >
            <CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsLocalityNameEn" value={AdrsLocalityNameEn} onChange={setSelectAdrsLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
            </div>
          <div className="col-md-3" >
            <CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput 
            t={t} 
            isMandatory={false} 
            type={"text"} 
            optionKey="i18nKey" 
            name="AdrsLocalityNameMl" 
            value={AdrsLocalityNameMl} 
            onChange={setSelectAdrsLocalityNameMl} 
            disable={isEdit} 
            placeholder={`${t("CR_LOCALITY_ML")}`} 
            {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
        </div>            
        </div>
        </div>
       
      {/* <div className="row">
        <div className="col-md-12" >
         <div className="col-md-6" >
            <CardLabel>{t("CR_CITY_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput 
            t={t} 
            isMandatory={false} 
            type={"text"} 
            optionKey="i18nKey" 
            name="AdrsCityEn" 
            value={AdrsCityEn} 
            onChange={setSelectAdrsCityEn} 
            placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
          </div>
         <div className="col-md-6" >
          <CardLabel>{t("CR_CITY_ML")}<span className="mandatorycss">*</span></CardLabel>
          <TextInput 
          t={t} 
          isMandatory={false} 
          type={"text"} 
          optionKey="i18nKey" 
          name="AdrsCityMl" 
          value={AdrsCityMl} 
          onChange={setSelectAdrsCityMl} 
          disable={isEdit} 
          placeholder={`${t("CR_LOCALITY_ML")}`} 
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
              <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
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
          <div className="col-md-3" >
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput t={t} 
            isMandatory={false} 
            type={"text"} 
            optionKey="i18nKey" 
            name="AdrsStreetNameMl" 
            value={AdrsStreetNameMl} 
            onChange={setSelectAdrsStreetNameMl} 
            placeholder={`${t("CR_STREET_NAME_ML")}`} 
            disable={isEdit} 
            {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })} />
          </div>
          <div className="col-md-3" >
            <CardLabel>{t("CR_HOUSE_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} 
            isMandatory={false} 
            type={"text"} 
            optionKey="i18nKey" 
            name="AdrsHouseNameEn" 
            value={AdrsHouseNameEn} 
            onChange={setSelectAdrsHouseNameEn} 
            placeholder={`${t("CR_HOUSE_NAME_EN")}`} 
            disable={isEdit} 
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })} />
            </div>
          <div className="col-md-3" >
            <CardLabel>{t("CR_HOUSE_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} 
            isMandatory={false} 
            type={"text"} 
            optionKey="i18nKey" 
            name="AdrsHouseNameMl" 
            value={AdrsHouseNameMl} 
            onChange={setSelectAdrsHouseNameMl} 
            placeholder={`${t("CR_HOUSE_NAME_ML")}`} 
            disable={isEdit} 
            {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })} />
          </div>
        </div>
       </div>
      
        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-4">
              <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsBuldingNo"
                value={AdrsBuldingNo}
                onChange={setSelectAdrsBuldingNo}
                placeholder={`${t("CR_BUILDING_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
              />
            </div> */}
            <div className="col-md-4">
              <CardLabel>
                {t("CR_DOOR_NO")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsDoorNo"
                value={AdrsDoorNo}
                onChange={setSelectAdrsDoorNo}
                placeholder={`${t("CR_DOOR_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsResNo"
                value={AdrsResNo}
                onChange={setSelectAdrsResNo}
                placeholder={`${t("CR_RES_ASSOCIATION_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO") })}
              />
            </div>
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
            </div>  */}
          </div>
        </div>
       
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathHome;
