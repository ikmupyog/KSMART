import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Toast, TextArea } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const DeathOutsideJurisdiction = ({
  config,
  onSelect,
  userType,
  formData,
  DeathPlaceCountry,
  setSelectDeathPlaceCountry,
  DeathPlaceState,
  SelectDeathPlaceState,
  DeathPlaceDistrict,
  SelectDeathPlaceDistrict,
  DeathPlaceCity,
  SelectDeathPlaceCity,
  DeathPlaceRemarksEn,
  SelectDeathPlaceRemarksEn,
  DeathPlaceRemarksMl,
  SelectDeathPlaceRemarksMl,
  DeathPlaceWardId,
  setDeathPlaceWardId,
  PlaceOfBurialEn,
  SelectPlaceOfBurialEn,
  PlaceOfBurialMl,
  SelectPlaceOfBurialMl,
  GeneralRemarks,
  setGeneralRemarks,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isDisableStatus, setDisableStatus] = useState(true);

  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "boundary-data");
  const [toast, setToast] = useState(false);
  // const [DeathPlaceCountry, setSelectDeathPlaceCountry] = useState(formData?.DeathOutsideJurisdiction?.DeathPlaceCountry);
  // const [DeathPlaceState, SelectDeathPlaceState] = useState(formData?.DeathOutsideJurisdiction?.DeathPlaceState);
  // const [DeathPlaceDistrict, SelectDeathPlaceDistrict] = useState(formData?.DeathOutsideJurisdiction?.DeathPlaceDistrict);
  // const [DeathPlaceCity, SelectDeathPlaceCity] = useState(formData?.DeathOutsideJurisdiction?.DeathPlaceCity);
  // const [DeathPlaceRemarksEn, SelectDeathPlaceRemarksEn] = useState(formData?.DeathOutsideJurisdiction?.DeathPlaceRemarksEn);
  // const [DeathPlaceRemarksMl, SelectDeathPlaceRemarksMl] = useState(formData?.DeathOutsideJurisdiction?.DeathPlaceRemarksMl);
  // const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData.DeathOutsideJurisdiction?.DeathPlaceWardId);
  // const [PlaceOfBurialEn, SelectPlaceOfBurialEn] = useState(formData?.DeathOutsideJurisdiction?.PlaceOfBurialEn);
  // const [PlaceOfBurialMl, SelectPlaceOfBurialMl] = useState(formData?.DeathOutsideJurisdiction?.PlaceOfBurialMl);
  // const [GeneralRemarks, setGeneralRemarks] = useState(formData?.DeathOutsideJurisdiction?.GeneralRemarks);
  PlaceOfBurialMl;
  let cmbNation = [];
  let cmbState = [];
  let cmbDistrict = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  State &&
    State["common-masters"] &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
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
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });
  const onSkip = () => onSelect();

  function selectDeathPlaceCountry(value) {
    setSelectDeathPlaceCountry(value);
  }
  function setSelectDeathPlaceState(value) {
    SelectDeathPlaceState(value);
  }
  function setSelectDeathPlaceDistrict(value) {
    SelectDeathPlaceDistrict(value);
  }
  function setSelectDeathPlaceCity(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      SelectDeathPlaceCity(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceRemarksEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      SelectDeathPlaceRemarksEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectDeathPlaceRemarksMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      SelectDeathPlaceRemarksMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectDeathPlaceWardId(value) {
    setDeathPlaceWardId(value);
  }
  function setSelectPlaceOfBurialEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      SelectPlaceOfBurialEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectPlaceOfBurialMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      SelectPlaceOfBurialMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectGeneralRemarks(e) {
    if (e.target.value.length === 102) {
      return false;
    } else {
      setGeneralRemarks(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  const goNext = () => {
    // sessionStorage.setItem("DeathPlaceCountry", DeathPlaceCountry ? DeathPlaceCountry.code  : null);
    // sessionStorage.setItem("DeathPlaceState", DeathPlaceState ? DeathPlaceState.code  : null);
    // sessionStorage.setItem("DeathPlaceDistrict", DeathPlaceDistrict ? DeathPlaceDistrict.code  : null);
    // sessionStorage.setItem("DeathPlaceCity", DeathPlaceCity ? DeathPlaceCity  : null);
    // sessionStorage.setItem("DeathPlaceRemarksEn", DeathPlaceRemarksEn ? DeathPlaceRemarksEn  : null);
    // sessionStorage.setItem("DeathPlaceRemarksMl", DeathPlaceRemarksMl ? DeathPlaceRemarksMl  : null);
    // sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code  : null);
    // sessionStorage.setItem("PlaceOfBurialEn", PlaceOfBurialEn ? PlaceOfBurialEn  : null);
    // sessionStorage.setItem("PlaceOfBurialMl", PlaceOfBurialMl ? PlaceOfBurialMl  : null);
    // sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
    onSelect(config.key, {
      // DeathPlaceCountry,
      // DeathPlaceState,
      // DeathPlaceDistrict,
      // DeathPlaceCity,
      // DeathPlaceRemarksEn,
      // DeathPlaceRemarksMl,
      // DeathPlaceWardId,
      // PlaceOfBurialMl,
      // PlaceOfBurialEn,
      // GeneralRemarks,
    });
  };

  return (
    <React.Fragment>
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={
          !DeathPlaceCountry ||
          !DeathPlaceState ||
          !DeathPlaceRemarksEn ||
          !DeathPlaceRemarksMl ||
          !DeathPlaceWardId ||
          !PlaceOfBurialMl ||
          !PlaceOfBurialEn
        }
      >
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_COUNTRY")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbNation}
                selected={DeathPlaceCountry}
                select={selectDeathPlaceCountry}
                disable={isDisableStatus}
                placeholder={`${t("CS_COMMON_COUNTRY")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbState}
                selected={DeathPlaceState}
                select={setSelectDeathPlaceState}
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
                isMandatory={false}
                option={cmbDistrict}
                selected={DeathPlaceDistrict}
                select={setSelectDeathPlaceDistrict}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CR_CITY_VILLAGE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceCity"
                value={DeathPlaceCity}
                onChange={setSelectDeathPlaceCity}
                placeholder={`${t("CR_CITY_VILLAGE")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_PLACE_DEATH_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceRemarksEn"
                value={DeathPlaceRemarksEn}
                onChange={setSelectDeathPlaceRemarksEn}
                placeholder={`${t("CR_PLACE_DEATH_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_PLACE_DEATH_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_PLACE_DEATH_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathPlaceRemarksMl"
                value={DeathPlaceRemarksMl}
                onChange={setSelectDeathPlaceRemarksMl}
                placeholder={`${t("CR_PLACE_DEATH_ML")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_PLACE_DEATH_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_BURIAL_CREMATION")}`}</span>
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
                {t("CR_PLACE_BURIAL_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PlaceOfBurialEn"
                value={PlaceOfBurialEn}
                onChange={setSelectPlaceOfBurialEn}
                placeholder={`${t("CR_PLACE_BURIAL_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_PLACE_BURIAL_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_PLACE_BURIAL_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PlaceOfBurialMl"
                value={PlaceOfBurialMl}
                onChange={setSelectPlaceOfBurialMl}
                placeholder={`${t("CR_PLACE_BURIAL_ML")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_PLACE_BURIAL_ML") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_OTHER_DETAILS_EN")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="GeneralRemarks"
                value={GeneralRemarks}
                onChange={setSelectGeneralRemarks}
                placeholder={`${t("CR_OTHER_DETAILS_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default DeathOutsideJurisdiction;
