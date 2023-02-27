import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const AddressPermanentInsideKerala = ({ config, onSelect, userType, formData,
  permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict,
  permntInKeralaAdrLBName, setpermntInKeralaAdrLBName,
  permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk, permntInKeralaAdrVillage, setpermntInKeralaAdrVillage,
  permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice, permntInKeralaAdrPincode, setpermntInKeralaAdrPincode,
  permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn,
  permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl, permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn,
  permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl, permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn,
  permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl, lbs, setLbs, Talukvalues, setLbsTalukvalue, Villagevalues, setLbsVillagevalue, permntInKeralaWardNo,
  setpermntInKeralaWardNo, PostOfficevalues, setPostOfficevalues

}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [tenantWard,setTenantWard]=useState(tenantId);
  const [tenantboundary, setTenantboundary] = useState(false);
  const queryClient = useQueryClient();
  if (tenantboundary) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    queryClient.removeQueries("CR_VILLAGE");
    queryClient.removeQueries("CR_TALUK");
    queryClient.removeQueries("CR_TALUK");
    setTenantboundary(false);
  }
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "cochin/egov-location", "boundary-data");
  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableStatus, setDisableStatus] = useState(true);

  // const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrDistrict);
  // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLBTypeName);
  // const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLBName);
  // const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrTaluk);
  // const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrVillage);
  // const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrPostOffice);
  // const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrPincode);
  // const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrHouseNameEn);
  // const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrHouseNameMl);
  // const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLocalityNameEn);
  // const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLocalityNameMl);
  // const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrStreetNameEn);
  // const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaWardNo);

  let cmbLB = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let districtid = null;
  let cmbLBType = [];
  let cmbFilterDistrict = [];
  let cmbFilterTaluk = [];
  let cmbFilterVillage = [];
  let cmbFilterPostOffice = [];

  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
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
  let currentLB = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      // console.log(ob);
      // if(ob?.boundary){
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
      // }
    });
  //console.log(Zonal);
  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });
  useEffect(() => {

    if (isInitialRender) {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        setpermntInKeralaAdrLBName(currentLB[0]);
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.code === currentLB[0].city.distCodeStr);
        setpermntInKeralaAdrDistrict(cmbFilterDistrict[0]);
        cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        setLbsTalukvalue(cmbFilterTaluk);
        cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        setLbsVillagevalue(cmbFilterVillage);
        cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid);
        setPostOfficevalues(cmbFilterPostOffice);
        setIsInitialRender(false);
      }
    }
  }, [District, LBType, localbodies, Talukvalues, Villagevalues, PostOfficevalues, lbs, isInitialRender]);

  const onSkip = () => onSelect();

  function setSelectpermntInKeralaAdrDistrict(value) {
    // setIsInitialRender(true);
    setpermntInKeralaAdrDistrict(value);
    setpermntInKeralaAdrLBName(null);
    setLbs(null);
    districtid = value.districtid;
    setTenantboundary(true);
    if (cmbLB.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === value.code);
      setLbs(currentLB);
      setpermntInKeralaAdrLBName(currentLB);
      cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === districtid);
      setLbsTalukvalue(cmbFilterTaluk);
      cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === districtid);
      setLbsVillagevalue(cmbFilterVillage);
      cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === districtid);
      setPostOfficevalues(cmbFilterPostOffice);
      setIsInitialRender(false);
  }
  }
  function setSelectpermntInKeralaAdrLBTypeName(value) {
    setinsideKeralaLBTypeName(value);
  }
  function setSelectpermntInKeralaAdrLBName(value) {
    setTenantWard(value.code);
    setpermntInKeralaAdrLBName(value);
  }
  function setSelectpermntInKeralaAdrVillage(value) {
    setpermntInKeralaAdrVillage(value);
  }
  function setSelectpermntInKeralaAdrTaluk(value) {
    setpermntInKeralaAdrTaluk(value);
  }

  function setSelectpermntInKeralaAdrPostOffice(value) {
    setpermntInKeralaAdrPostOffice(value);
    setpermntInKeralaAdrPincode(value.pincode);
  }
  function setSelectpermntInKeralaAdrPincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        return false;
      } else if (e.target.value.length < 6) {
        setpermntInKeralaAdrPincode(e.target.value);
        return false;
      } else {
        setpermntInKeralaAdrPincode(e.target.value);
        return true;
      }
    }
  }
  function setSelectpermntInKeralaAdrHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectpermntInKeralaAdrHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrHouseNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrLocalityNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }

  function setSelectpermntInKeralaAdrStreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }

  function setSelectpermntInKeralaAdrStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrStreetNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }

  function setSelectWard(value) {
    setpermntInKeralaWardNo(value);
  }

  // useEffect(() => {
  //     if (isInitialRender) {
  //         console.log("presentInsideKeralaDistrict" + districtid);
  //         console.log(localbodies);
  //         if (presentInsideKeralaDistrict) {
  //             setIsInitialRender(false);
  //             setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === presentInsideKeralaDistrict.districtid));
  //         }
  //     }
  // }, [lbs, isInitialRender]);
  const goNext = () => {
    //  sessionStorage.setItem("permntInKeralaAdrLBTypeName", permntInKeralaAdrLBTypeName.code);

    // sessionStorage.setItem("permntInKeralaAdrHouseNameEn", permntInKeralaAdrHouseNameEn ? permntInKeralaAdrHouseNameEn : null);
    // sessionStorage.setItem("permntInKeralaAdrHouseNameMl", permntInKeralaAdrHouseNameMl ? permntInKeralaAdrHouseNameMl : null);
    // sessionStorage.setItem("permntInKeralaAdrLocalityNameEn", permntInKeralaAdrLocalityNameEn ? permntInKeralaAdrLocalityNameEn : null);
    // sessionStorage.setItem("permntInKeralaAdrLocalityNameMl", permntInKeralaAdrLocalityNameMl ? permntInKeralaAdrLocalityNameMl : null);
    // sessionStorage.setItem("permntInKeralaAdrStreetNameEn", permntInKeralaAdrStreetNameEn ? permntInKeralaAdrStreetNameEn : null);
    // sessionStorage.setItem("permntInKeralaAdrStreetNameMl", permntInKeralaAdrStreetNameMl ? permntInKeralaAdrStreetNameMl : null);
    // sessionStorage.setItem("permntInKeralaAdrVillage", permntInKeralaAdrVillage ? permntInKeralaAdrVillage.code : null);
    // sessionStorage.setItem("permntInKeralaAdrLBName", permntInKeralaAdrLBName ? permntInKeralaAdrLBName : null);
    // sessionStorage.setItem("permntInKeralaAdrDistrict", permntInKeralaAdrDistrict ? permntInKeralaAdrDistrict.code : null);
    // sessionStorage.setItem("permntInKeralaAdrTaluk", permntInKeralaAdrTaluk ? permntInKeralaAdrTaluk.code : null);
    // sessionStorage.setItem("permntInKeralaAdrPostOffice", permntInKeralaAdrPostOffice ? permntInKeralaAdrPostOffice.code : null);
    // sessionStorage.setItem("permntInKeralaAdrPincode", permntInKeralaAdrPincode ? permntInKeralaAdrPincode.code : null);
    // sessionStorage.setItem("permntInKeralaWardNo", permntInKeralaWardNo ? permntInKeralaWardNo.code : null);

    // onSelect(config.key, {
    //   permntInKeralaAdrLBName,
    //   permntInKeralaAdrDistrict,
    //   permntInKeralaAdrTaluk,
    //   permntInKeralaAdrVillage,
    //   permntInKeralaAdrLocalityNameEn,
    //   permntInKeralaAdrStreetNameEn,
    //   permntInKeralaAdrHouseNameEn,
    //   permntInKeralaAdrLocalityNameMl,
    //   permntInKeralaAdrStreetNameMl,
    //   permntInKeralaAdrHouseNameMl,
    //   permntInKeralaAdrPincode,
    //   permntInKeralaAdrPostOffice,
    //   permntInKeralaWardNo,
    // });
  };

  if (islocalbodiesLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading || isWardLoaded) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >

        <div className="row">
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_DISTRICT")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbDistrict}
              selected={permntInKeralaAdrDistrict}
              select={setSelectpermntInKeralaAdrDistrict}
              placeholder={`${t("CS_COMMON_DISTRICT")}`}
             // disable={isDisableStatus}
            />
          </div>

          {/* <div className="col-md-6" >
                    <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
                    <Dropdown
                    t={t}
                    optionKey="name"
                    option={cmbLBType}
                    selected={permntInKeralaAdrLBTypeName}
                    select={setSelectpermntInKeralaAdrLBTypeName}
                    
                    />
                    </div> */}
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_TALUK")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={Talukvalues}
              selected={permntInKeralaAdrTaluk}
              select={setSelectpermntInKeralaAdrTaluk}
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
              option={Villagevalues}
              selected={permntInKeralaAdrVillage}
              select={setSelectpermntInKeralaAdrVillage}
              placeholder={`${t("CS_COMMON_VILLAGE")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_LB_NAME")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={lbs}
              selected={permntInKeralaAdrLBName}
              select={setSelectpermntInKeralaAdrLBName}
              // disable={isDisableStatus}
              placeholder={`${t("CS_COMMON_LB_NAME")}`}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>
              {`${t("CS_COMMON_WARD")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="namecmb"
              option={cmbWardNoFinal}
              selected={permntInKeralaWardNo}
              select={setSelectWard}
              placeholder={`${t("CS_COMMON_WARD")}`}
              {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={PostOfficevalues}
              selected={permntInKeralaAdrPostOffice}
              select={setSelectpermntInKeralaAdrPostOffice}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_PIN_CODE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntInKeralaAdrPincode"
              value={permntInKeralaAdrPincode}
              onChange={setSelectpermntInKeralaAdrPincode}
              disable={isDisableStatus}
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
        <div className="row">
          <div className="col-md-4">
            <CardLabel>
              {t("CR_LOCALITY_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntInKeralaAdrLocalityNameEn"
              value={permntInKeralaAdrLocalityNameEn}
              onChange={setSelectpermntInKeralaAdrLocalityNameEn}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntInKeralaAdrStreetNameEn"
              value={permntInKeralaAdrStreetNameEn}
              onChange={setSelectpermntInKeralaAdrStreetNameEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CR_HOUSE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntInKeralaAdrHouseNameEn"
              value={permntInKeralaAdrHouseNameEn}
              onChange={setSelectpermntInKeralaAdrHouseNameEn}
              placeholder={`${t("CR_HOUSE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
            />
          </div>
        </div>
        <div className="row">
        
         
          <div className="col-md-4">
            <CardLabel>
              {t("CR_LOCALITY_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntInKeralaAdrLocalityNameMl"
              value={permntInKeralaAdrLocalityNameMl}
              onChange={setSelectpermntInKeralaAdrLocalityNameMl}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntInKeralaAdrStreetNameMl"
              value={permntInKeralaAdrStreetNameMl}
              onChange={setSelectpermntInKeralaAdrStreetNameMl}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CR_HOUSE_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntInKeralaAdrHouseNameMl"
              value={permntInKeralaAdrHouseNameMl}
              onChange={setSelectpermntInKeralaAdrHouseNameMl}
              placeholder={`${t("CR_HOUSE_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_HOUSE_NAME_ML"),
              })}
            />
          </div>
        </div>

        <div className="row">
        
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPermanentInsideKerala;