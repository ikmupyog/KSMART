import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";
// import { sleep } from "react-query/types/core/utils";

const BirthPlaceHome = ({
  config,
  onSelect,
  userType,
  formData,
  adrsPincode,
  adrsHouseNameEn,
  adrsHouseNameMl,
  adrsLocalityNameEn,
  adrsLocalityNameMl,
  adrsStreetNameEn,
  adrsStreetNameMl,
  wardNo,
  setWardNo,
  adrsPostOffice,
  setAdrsPostOffice,
  setAdrsPincode,
  setAdrsHouseNameEn,
  setAdrsHouseNameMl,
  setAdrsLocalityNameEn,
  setAdrsLocalityNameMl,
  setAdrsStreetNameEn,
  setAdrsStreetNameMl,
  PostOfficevalues,
  setPostOfficevalues,
  isEditAdoption,
  searchedApp,
}) => {
  const [pofilter, setPofilter] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  let validation = {};
  // const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  // console.log(tenantId);
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  //const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [cmbFilterPostOffice, setCmbFilterPostOffice] = useState([]);
  const [isDisableEdit, setisDisableEdit] = useState(isEditAdoption ? isEditAdoption : false);
  //let cmbPostOffice = [];
  let cmbLB = [];
  let currentLB = [];

  // PostOffice &&
  //   PostOffice["common-masters"] &&
  //   PostOffice["common-masters"].PostOffice &&
  //   PostOffice["common-masters"].PostOffice.map((ob) => {
  //     cmbPostOffice.push(ob);
  //   });
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });

  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Zonal.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      }
    });
  cmbWardNo.map((wardmst, index) => {
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });
  const sortWardList = cmbWardNoFinal.sort((a, b) => a.wardno - b.wardno);
  useEffect(() => {
    if (isInitialRender) {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        //setCmbFilterPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        //setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        if (currentLB.length > 0) {
          setCmbFilterPostOffice(currentLB[0].poList);
          setPostOfficevalues(currentLB[0].poList);
          setIsInitialRender(false);
        }
      }
    }
  }, [localbodies, PostOfficevalues, isInitialRender]);
  const onSkip = () => onSelect();
  if (isEditAdoption) {
    if (formData?.AdoptionChildDetails?.adrsPostOffice != null) {
      if (PostOfficevalues.length > 0 && (adrsPostOffice === undefined || adrsPostOffice === "")) {
        let pin = PostOfficevalues.filter((PostOfficevalues) => PostOfficevalues.code === formData?.AdoptionChildDetails?.adrsPostOffice)[0];
        setAdrsPostOffice(PostOfficevalues.filter((PostOfficevalues) => PostOfficevalues.code === formData?.AdoptionChildDetails?.adrsPostOffice)[0]);
        setAdrsPincode(pin.pincode);
      }
    }
    if (formData?.AdoptionChildDetails?.wardNo != null) {
      if (cmbWardNo.length > 0 && (wardNo === undefined || wardNo === "")) {
        setWardNo(cmbWardNo.filter((cmbWardNo) => cmbWardNo.code === formData?.AdoptionChildDetails?.wardNo)[0]);
      }
    }
  }
  function setSelectAdrsPostOffice(value) {
    setAdrsPostOffice(value);
    setAdrsPincode(value.pincode);
  }
  // function setSelectAdrsPincode(e) {
  //   if (e.target.value.length === 7) {
  //     return false;

  //   } else {
  //     setAdrsPincode(e.target.value);
  //   }
  // }

  // function setSelectAdrsPincode(e) {
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 6) {
  //       return false;
  //     } else if (e.target.value.length < 6) {
  //       setAdrsPincode(e.target.value);
  //       return false;
  //     } else {
  //       setAdrsPincode(e.target.value);
  //       return true;
  //     }
  //   }
  // }
  const setSelectAdrsPincode = (e) => {
    if (e.target.value.length === 6) {
      setPostOfficevalues(PostOfficevalues.filter((postoffice) => parseInt(postoffice.pincode) === parseInt(e.target.value)));
      setPofilter(true);
    } else {
      setPostOfficevalues(cmbFilterPostOffice);
      setPofilter(false);
    }
    setAdrsPincode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 6));
    setAdrsPostOffice(PostOfficevalues.filter((postoffice) => parseInt(postoffice.pincode) === parseInt(e.target.value))[0]);
  };

  function setSelectAdrsHouseNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null) {
      setAdrsHouseNameEn(e.target.value.trim().length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setSelectAdrsHouseNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setAdrsHouseNameMl("");
    } else {
      setAdrsHouseNameMl(e.target.value.trim().length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }

  function setSelectAdrsLocalityNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setAdrsLocalityNameEn(e.target.value.trim().length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setSelectAdrsLocalityNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setAdrsLocalityNameMl("");
    } else {
      setAdrsLocalityNameMl(e.target.value.trim().length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }

  function setSelectAdrsStreetNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setAdrsStreetNameEn(e.target.value.trim().length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setSelectAdrsStreetNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setAdrsStreetNameMl("");
    } else {
      setAdrsStreetNameMl(e.target.value.trim().length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setSelectWard(value) {
    setWardNo(value);
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  function setCheckMalayalamInputSplChar(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  let validFlag = true;

  const goNext = () => {};

  if (isWardLoaded || islocalbodiesLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!adrsLocalityNameEn}> */}
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PLACE_HOME")}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_WARD")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="namecmb"
                  option={sortWardList}
                  selected={wardNo}
                  select={setSelectWard}
                  placeholder={`${t("CS_COMMON_WARD")}`}
                  disable={searchedApp}
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
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  option={sortDropdownNames(PostOfficevalues ? PostOfficevalues : [], "name", t)}
                  selected={adrsPostOffice}
                  select={setSelectAdrsPostOffice}
                  disable={searchedApp}
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
                  name="adrsPincode"
                  value={adrsPincode}
                  onChange={setSelectAdrsPincode}
                  disable={searchedApp}
                  placeholder={`${t("CS_COMMON_PIN_CODE")}`}
                  {...(validation = {
                    pattern: "^[0-9]{6}$",
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
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_LOCALITY_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="adrsLocalityNameEn"
                  value={adrsLocalityNameEn}
                  onChange={setSelectAdrsLocalityNameEn}
                  disable={searchedApp.adrsLocalityNameEn}
                  placeholder={`${t("CR_LOCALITY_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="adrsStreetNameEn"
                  value={adrsStreetNameEn}
                  onChange={setSelectAdrsStreetNameEn}
                  disable={searchedApp.adrsStreetNameEn}
                  placeholder={`${t("CR_STREET_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
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
                  name="adrsHouseNameEn"
                  value={adrsHouseNameEn}
                  onChange={setSelectAdrsHouseNameEn}
                  disable={searchedApp.adrsHouseNameEn}
                  placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_LOCALITY_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="adrsLocalityNameMl"
                  value={adrsLocalityNameMl}
                  onKeyPress={setCheckMalayalamInputField}
                  onChange={setSelectAdrsLocalityNameMl}
                  disable={searchedApp.adrsLocalityNameMl}
                  placeholder={`${t("CR_LOCALITY_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_LOCALITY_ML"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="adrsStreetNameMl"
                  value={adrsStreetNameMl}
                  onKeyPress={setCheckMalayalamInputField}
                  onChange={setSelectAdrsStreetNameMl}
                  disable={searchedApp.adrsStreetNameMl}
                  placeholder={`${t("CR_STREET_NAME_ML")}`}
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
                  name="adrsHouseNameMl"
                  value={adrsHouseNameMl}
                  onKeyPress={setCheckMalayalamInputSplChar}
                  onChange={setSelectAdrsHouseNameMl}
                  disable={searchedApp.adrsHouseNameMl}
                  placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                />
              </div>
            </div>
          </div>
        </div>
        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default BirthPlaceHome;
