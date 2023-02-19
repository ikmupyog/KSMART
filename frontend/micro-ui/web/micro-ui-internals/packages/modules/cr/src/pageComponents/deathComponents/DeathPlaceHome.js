import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader,Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const DeathPlaceHome = ({ config, onSelect, userType, formData ,DeathPlaceHomepostofficeId, setDeathPlaceHomepostofficeId,DeathPlaceHomepincode, 
  setDeathPlaceHomepincode,DeathPlaceHomehoueNameEn, setDeathPlaceHomehoueNameEn,DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl,DeathPlaceHomelocalityEn, 
  setDeathPlaceHomelocalityEn,DeathPlaceHomelocalityMl, setDeathPlaceHomelocalityMl,DeathPlaceHomestreetNameEn, setDeathPlaceHomestreetNameEn,
  DeathPlaceHomestreetNameMl, setDeathPlaceHomestreetNameMl,DeathPlaceWardId, setDeathPlaceWardId}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  // Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "boundary-data");
  const [toast, setToast] = useState(false);
  // const [countries, setcountry] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  // const [DeathPlaceHomepostofficeId, setDeathPlaceHomepostofficeId] = useState(formData?.DeathPlaceHome?.DeathPlaceHomepostofficeId);
  // const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(formData?.DeathPlaceHome?.DeathPlaceHomepincode);
  // const [DeathPlaceHomehoueNameEn, setDeathPlaceHomehoueNameEn] = useState(formData?.DeathPlaceHome?.DeathPlaceHomehoueNameEn);
  // const [DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl] = useState(formData?.DeathPlaceHome?.DeathPlaceHomehoueNameMl);
  // const [DeathPlaceHomelocalityEn, setDeathPlaceHomelocalityEn] = useState(formData?.DeathPlaceHome?.DeathPlaceHomelocalityEn);
  // const [DeathPlaceHomelocalityMl, setDeathPlaceHomelocalityMl] = useState(formData?.DeathPlaceHome?.DeathPlaceHomelocalityMl);
  // const [DeathPlaceHomestreetNameEn, setDeathPlaceHomestreetNameEn] = useState(formData?.DeathPlaceHome?.DeathPlaceHomestreetNameEn);
  // const [DeathPlaceHomestreetNameMl, setDeathPlaceHomestreetNameMl] = useState(formData?.DeathPlaceHome?.DeathPlaceHomestreetNameMl);
  // const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData.DeathPlaceHome?.DeathPlaceWardId);
 
  
  
  let cmbPostOffice = [];
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });

    let Zonal = [];
    let cmbWardNo = [];
    let cmbWardNoFinal = [];
    boundaryList &&
      boundaryList["egov-location"] &&
      boundaryList["egov-location"].TenantBoundary.map((ob) => {
        if (ob?.hierarchyType.code === "REVENUE") {
          Zonal.push(...ob.boundary.children);
          ob.boundary.children.map((obward) => {
            cmbWardNo.push(...obward.children);
          });
        }
      });
  
    cmbWardNo.map((wardmst) => {
      wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
      wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
      cmbWardNoFinal.push(wardmst);
    });
  const onSkip = () => onSelect();

  function setSelectDeathPlaceHomepostofficeId(value) {
    setDeathPlaceHomepostofficeId(value);
    setDeathPlaceHomepincode(value.pincode);
  }
  function setSelectDeathPlaceHomepincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        // setMotherAadhar(e.target.value);
        setPresentPincodeError(true);
        return false;
      } else if (e.target.value.length < 6) {
        setAdsHomePincodeError(true);
        setDeathPlaceHomepincode(e.target.value);
        return false;
      } else {
        setAdsHomePincodeError(false);
        setDeathPlaceHomepincode(e.target.value);

        return true;
      }
    }
  }

  function setSelectDeathPlaceHomehoueNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomehoueNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceHomehoueNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomehoueNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectDeathPlaceHomelocalityEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomelocalityEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceHomelocalityMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomelocalityMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectDeathPlaceHomestreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomestreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceHomestreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setDeathPlaceHomestreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectDeathPlaceWardId(value) {
    setDeathPlaceWardId(value);
  }
  let validFlag = true;

  const goNext = () => { 
    
      // sessionStorage.setItem("DeathPlaceHomehoueNameEn", DeathPlaceHomehoueNameEn ? DeathPlaceHomehoueNameEn  : null);
      // sessionStorage.setItem("DeathPlaceHomehoueNameMl", DeathPlaceHomehoueNameMl  ? DeathPlaceHomehoueNameMl  : null);
      // sessionStorage.setItem("DeathPlaceHomelocalityEn", DeathPlaceHomelocalityEn  ? DeathPlaceHomelocalityEn  : null);
      // sessionStorage.setItem("DeathPlaceHomelocalityMl", DeathPlaceHomelocalityMl  ? DeathPlaceHomelocalityMl  : null);
      // sessionStorage.setItem("DeathPlaceHomestreetNameEn", DeathPlaceHomestreetNameEn  ? DeathPlaceHomestreetNameEn  : null);
      // sessionStorage.setItem("DeathPlaceHomestreetNameMl", DeathPlaceHomestreetNameMl  ? DeathPlaceHomestreetNameMl  : null);
      // sessionStorage.setItem("DeathPlaceHomepostofficeId", DeathPlaceHomepostofficeId  ? DeathPlaceHomepostofficeId.code  : null);
      // sessionStorage.setItem("DeathPlaceHomepincode", DeathPlaceHomepincode  ? DeathPlaceHomepincode .code  : null);
      // sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code  : null);

      onSelect(config.key, {
        // DeathPlaceHomehoueNameEn,
        // DeathPlaceHomehoueNameMl,
        // DeathPlaceHomelocalityEn,
        // DeathPlaceHomelocalityMl,
        // DeathPlaceHomestreetNameEn,
        // DeathPlaceHomestreetNameMl,
        // DeathPlaceHomepostofficeId,
        // DeathPlaceHomepincode ,
        // DeathPlaceWardId,    
      });    
  };

  if (isPostOfficeLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!DeathPlaceHomelocalityEn}>
      <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_HOME")}`}</span>
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
                option={cmbWardNoFinal}
                selected={DeathPlaceWardId}
                select={setSelectDeathPlaceWardId}
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
                isMandatory={false}
                option={cmbPostOffice}
                selected={DeathPlaceHomepostofficeId}
                select={setSelectDeathPlaceHomepostofficeId}
                disabled={isEdit}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomepincode"
                value={DeathPlaceHomepincode}
                onChange={setSelectDeathPlaceHomepincode}
                disable={isEdit}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomelocalityEn"
                value={DeathPlaceHomelocalityEn}
                onChange={setSelectDeathPlaceHomelocalityEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomestreetNameEn"
                value={DeathPlaceHomestreetNameEn}
                onChange={setSelectDeathPlaceHomestreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                disable={isEdit}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomehoueNameEn"
                value={DeathPlaceHomehoueNameEn}
                onChange={setSelectDeathPlaceHomehoueNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomelocalityMl"
                value={DeathPlaceHomelocalityMl}
                onChange={setSelectDeathPlaceHomelocalityMl}
                disable={isEdit}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomestreetNameMl"
                value={DeathPlaceHomestreetNameMl}
                onChange={setSelectDeathPlaceHomestreetNameMl}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                disable={isEdit}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceHomehoueNameMl"
                value={DeathPlaceHomehoueNameMl}
                onChange={setSelectDeathPlaceHomehoueNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_HOUSE_NAME_ML"),
                })}
              />
            </div>
          </div>
        </div>  
      </FormStep>
    </React.Fragment>
  );
};
export default DeathPlaceHome;
