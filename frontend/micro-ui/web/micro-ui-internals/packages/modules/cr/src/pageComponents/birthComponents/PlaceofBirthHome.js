import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const PlaceofBirthHome = ({
  config,
  onSelect,
  userType,
  formData,
  AdrsCountry,
  setAdrsCountry,
  AdrsStateName,
  setAdrsStateName,
  AdrsDistrict,
  setAdrsDistrict,
  AdrsLBTypeName,
  setAdrsLBTypeName,
  AdrsTaluk,
  setAdrsTaluk,
  AdrsPostOffice,
  setAdrsPostOffice,
  AdrsPincode,
  setAdrsPincode,
  AdrsHouseNameEn,
  setAdrsHouseNameEn,
  AdrsResNoEn,
  setAdrsResNoEn,
  AdrsInfomntName,
  setAdrsInfomntName,
  AdrsDoorNo,
  setAdrsDoorNo,
  AdrsSubNo,
  setAdrsSubNo,
  AdrsMainPlaceEn,
  setAdrsMainPlaceEn,
  AdrsLocalityNameEn,
  setAdrsLocalityNameEn,
  AdrsStreetNameEn,
  setAdrsStreetNameEn,
  AdrsVillage,
  setAdrsVillage,
  AdrsLBName,
  setAdrsLBName,
  AdrsMainPlaceMl,
  setAdrsMainPlaceMl,
  AdrsLocalityNameMl,
  setAdrsLocalityNameMl,
  AdrsStreetNameMl,
  setAdrsStreetNameMl,
  AdrsHouseNameMl,
  setAdrsHouseNameMl,
  AdrsResNoMl,
  setAdrsResNoMl, setLBCombo, LBCombo

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
  // Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  //  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
  const [isDisableStatus, setDisableStatus] = useState(true);

  // const [countries, setcountry] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [AdrsCountry, setAdrsCountry] = useState(formData?.BirthPlaceHomeDetails?.AdrsCountry);
  // const [AdrsStateName, setAdrsStateName] = useState(formData?.BirthPlaceHomeDetails?.AdrsStateName);
  // const [AdrsDistrict, setAdrsDistrict] = useState(formData?.BirthPlaceHomeDetails?.AdrsDistrict);
  // const [AdrsLBTypeName, setAdrsLBTypeName] = useState(formData?.BirthPlaceHomeDetails?.AdrsLBTypeName);
  // const [AdrsLBName, setAdrsLBName] = useState(formData?.BirthPlaceHomeDetails?.AdrsLBName);
  // const [AdrsTaluk, setAdrsTaluk] = useState(formData?.BirthPlaceHomeDetails?.AdrsTaluk);
  // const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.BirthPlaceHomeDetails?.AdrsPostOffice);
  // const [AdrsPincode, setAdrsPincode] = useState(formData?.BirthPlaceHomeDetails?.AdrsPincode);
  // const [AdrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsHouseNameEn);
  // //  const [AdrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsHouseNameMl);
  // const [AdrsBuldingNo, setAdrsBuldingNo] = useState(formData?.BirthPlaceHomeDetails?.AdrsBuldingNo);
  // const [AdrsResNoEn, setAdrsResNoEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsResNoEn);
  //const [AdrsResNoMl, setAdrsResNoMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsResNoMl);
  // const [AdrsInfomntName, setAdrsInfomntName] = useState(formData?.BirthPlaceHomeDetails?.AdrsInfomntName);
  // const [AdrsDoorNo, setAdrsDoorNo] = useState(formData?.BirthPlaceHomeDetails?.AdrsDoorNo);
  // const [AdrsSubNo, setAdrsSubNo] = useState(formData?.BirthPlaceHomeDetails?.AdrsSubNo);
  // const [AdrsMainPlaceEn, setAdrsMainPlaceEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsMainPlaceEn);
  // //  const [AdrsMainPlaceMl, setAdrsMainPlaceMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsMainPlaceMl);
  // const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsLocalityNameEn);
  //  const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsLocalityNameMl);
  // const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.BirthPlaceHomeDetails?.AdrsStreetNameEn);
  // //  const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.BirthPlaceHomeDetails?.AdrsStreetNameMl);
  // const [AdrsVillage, setAdrsVillage] = useState(formData?.BirthPlaceHomeDetails?.AdrsVillage);
  // const [WardNo, setWardNo] = useState(formData.BirthPlaceHomeDetails?.wardno);

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
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
      // console.log("cmbLB" + localbodies); 
      // setIsInitialRender(true);

    });
  let currentLB = [];
  let cmbFilterCountry = [];
  let cmbFilterState = [];
  let cmbFilterDistrict = [];
  let cmbFilterLBtype = [];
  let cmbFilterTaluk = [];
  let cmbFilterVillage = [];
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
  function setSelectAdrsCountry(value) {
    setAdrsCountry(value);
  }
  function setSelectAdrsStateName(value) {
    setAdrsStateName(value);
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
  }
  function setSelectAdrsTaluk(value) {
    setAdrsTaluk(value);
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
  function setSelectAdrsResNoEn(e) {
    if (e.target.value.length === 21) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsResNoEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' ]/ig, ''));
    }
  }
  function setSelectAdrsResNoMl(e) {
    if (e.target.value.length === 11) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsResNoMl(e.target.value.replace(/^[a-zA-Z-.`' ]/ig, ''));
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
  function setSelectAdrsSubNo(e) {
    if (e.target.value.length === 5) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdrsSubNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
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
  function setSelectAdrsInfomntName(e) {
    setAdrsInfomntName(e.target.value);
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
    // sessionStorage.setItem("AdrsCountry", AdrsCountry.code);
    // sessionStorage.setItem("AdrsStateName", AdrsStateName.code);
    // sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName.code);
    // sessionStorage.setItem("AdrsBuldingNo", AdrsBuldingNo);
    // sessionStorage.setItem("AdrsResNoEn", AdrsResNoEn);
    // sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo);
    // sessionStorage.setItem("AdrsSubNo", AdrsSubNo);
    // sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn);
    // //  sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl);
    // sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn);
    // //  sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl);
    // sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn);
    // //  sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl);
    // sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn);
    // //  sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl);
    // sessionStorage.setItem("AdrsVillage", AdrsVillage.code);
    // sessionStorage.setItem("AdrsLBName", null);
    // sessionStorage.setItem("AdrsDistrict", AdrsDistrict.code);
    // sessionStorage.setItem("AdrsTaluk", AdrsTaluk.code);
    // sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice.code);
    // sessionStorage.setItem("AdrsPincode", AdrsPincode.code);
    // sessionStorage.setItem("AdrsInfomntName", AdrsInfomntName);
    // // sessionStorage.setItem(" WardNo",  WardNo);
    // onSelect(config.key, {
    //   AdrsBuldingNo,
    //   AdrsDoorNo,
    //   AdrsHouseNameEn,
    //   AdrsLocalityNameEn,
    //   AdrsInfomntName,
    //   AdrsCountry,
    //   AdrsStateName,
    //   AdrsLBTypeName,
    //   AdrsMainPlaceEn,
    //   AdrsStreetNameEn,
    //   AdrsVillage,
    //   AdrsLBName,
    //   AdrsDistrict,
    //   AdrsTaluk,
    //   AdrsPostOffice,
    //   AdrsPincode,
    //   AdrsResNoEn,
    //   // WardNo
    // });
  };

  if (isCountryLoading || isStateLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdrsCountry}>
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
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_LB_TYPE")}`} <span className="mandatorycss">*</span>
              </CardLabel>
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
                placeholder={`${t("CS_COMMON_LB_NAME")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_TALUK")}

              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={Talukvalues}
                selected={AdrsTaluk}
                select={setSelectAdrsTaluk}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_TALUK")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_VILLAGE")}

              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={Villagevalues}
                selected={AdrsVillage}
                select={setSelectAdrsVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_VILLAGE")}`}
              />
            </div>
            {/* <div className="col-md-3">
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
            </div> */}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-3">
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
            </div> */}
            <div className="col-md-6">
              <CardLabel>
                {t("CR_MAIN_PLACE_EN")}

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
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_MAIN_PLACE_ML")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsMainPlaceMl"
                value={AdrsMainPlaceMl}
                onChange={setSelectAdrsMainPlaceMl}
                placeholder={`${t("CR_MAIN_PLACE_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-3">
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
            </div> */}
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_EN")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsLocalityNameEn"
                value={AdrsLocalityNameEn}
                onChange={setSelectAdrsLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_ML")}

              </CardLabel>
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
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
             <div className="col-md-4">
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
            </div>                
          </div>
        </div> */}

        {/* <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsLocalityNameEn" value={AdrsLocalityNameEn} onChange={setSelectAdrsLocalityNameEn} placeholder={`${t("CR_LOCALITY_EN")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })} />
 </div>
 <div className="col-md-6" ><CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
 <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsLocalityNameMl" value={AdrsLocalityNameMl} onChange={setSelectAdrsLocalityNameMl} disable={isEdit} placeholder={`${t("CR_LOCALITY_ML")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })} />
 </div>
 </div>
 </div> */}

        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-3">
              <CardLabel>{t("CR_STREET_NAME_EN")}  </CardLabel>
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
            </div> */}
            <div className="col-md-6">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}

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
            {/* <div className="col-md-3" ><CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdrsStreetNameMl" value={AdrsStreetNameMl} onChange={setSelectAdrsStreetNameMl} placeholder={`${t("CR_STREET_NAME_ML")}`} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })} />
          </div>     */}
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
                name="AdrsResNoEn"
                value={AdrsResNoEn}
                onChange={setSelectAdrsResNoEn}
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
                name="AdrsResNoMl"
                value={AdrsResNoMl}
                onChange={setSelectAdrsResNoMl}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_ML") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NAME_EN")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsHouseNameEn"
                value={AdrsHouseNameEn}
                onChange={setSelectAdrsHouseNameEn}
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
                name="AdrsHouseNameMl"
                value={AdrsHouseNameMl}
                onChange={setSelectAdrsHouseNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">

            <div className="col-md-3">
              <CardLabel>{t("CR_DOOR_NO")}</CardLabel>
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
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DOOR_NO") })}
              />

            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_SUB_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsSubNo"
                value={AdrsSubNo}
                onChange={setSelectAdrsSubNo}
                placeholder={`${t("CR_SUB_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_SUB_NO") })}
              />

            </div>
          </div>
        </div>


      </FormStep>
    </React.Fragment>
  );
};
export default PlaceofBirthHome;
