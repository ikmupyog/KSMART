import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const AddressOutsideKerala = ({ config, onSelect, userType, formData }) => {
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

  const [outsideKeralaDistrict, setoutsideKeralaDistrict] = useState(
    formData?.AddressOutsideKeralaDetails?.outsideKeralaDistrict ? formData?.AddressOutsideKeralaDetails?.outsideKeralaDistrict : null
  );
  const [outsideKeralaTaluk, setoutsideKeralaTaluk] = useState(
    formData?.AddressOutsideKeralaDetails?.outsideKeralaTaluk ? formData?.AddressOutsideKeralaDetails?.outsideKeralaTaluk : null
  );

  const [outsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(
    formData?.AddressOutsideKeralaDetails?.outsideKeralaCityVilgeEn ? formData?.AddressOutsideKeralaDetails?.outsideKeralaCityVilgeEn : null
  );
  const [outsideKeralaCityVilgeMl, setoutsideKeralaCityVilgeMl] = useState(
    formData?.AddressOutsideKeralaDetails?.outsideKeralaCityVilgeMl ? formData?.AddressOutsideKeralaDetails?.outsideKeralaCityVilgeMl : null
  );

  const [outsideKeralaVillage, setoutsideKeralaVillage] = useState(
    formData?.AddressOutsideKeralaDetails?.outsideKeralaVillage ? formData?.AddressOutsideKeralaDetails?.outsideKeralaVillage : null
  );
  const [outsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaPostOffice);
  const [outsideKeralaPincode, setoutsideKeralaPincode] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaPincode);
  const [outsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaHouseNameEn);
  const [outsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaHouseNameMl);
  const [outsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaLocalityNameEn);
  const [outsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaLocalityNameMl);
  const [outsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaStreetNameEn);
  const [outsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(formData?.AddressOutsideKeralaDetails?.outsideKeralaStreetNameMl);

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

  const onSkip = () => onSelect();

  function setSelectoutsideKeralaDistrict(value) {
    setoutsideKeralaDistrict(value);
    districtid = value.districtid;
  }

  function setSelectoutsideKeralaVillage(value) {
    setoutsideKeralaVillage(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectoutsideKeralaTaluk(value) {
    setoutsideKeralaTaluk(value);
    console.log("Taluk" + cmbTaluk);
  }

  // function setSelectoutsideKeralaPincode(e) {
  //   setoutsideKeralaPincode(e.target.value);
  // }

  function setSelectoutsideKeralaPostOffice(value) {
    setoutsideKeralaPostOffice(value);
  }
  function setSelectoutsideKeralaPincode(e) {
    setoutsideKeralaPincode(e.target.value);
  }

  function setSelectoutsideKeralaHouseNameEn(e) {
    setoutsideKeralaHouseNameEn(e.target.value);
  }
  function setSelectoutsideKeralaHouseNameMl(e) {
    setoutsideKeralaHouseNameMl(e.target.value);
  }

  function setSelectoutsideKeralaLocalityNameEn(e) {
    setoutsideKeralaLocalityNameEn(e.target.value);
  }
  function setSelectoutsideKeralaLocalityNameMl(e) {
    setoutsideKeralaLocalityNameMl(e.target.value);
  }

  function setSelectoutsideKeralaStreetNameEn(e) {
    setoutsideKeralaStreetNameEn(e.target.value);
  }

  function setSelectoutsideKeralaStreetNameMl(e) {
    setoutsideKeralaStreetNameMl(e.target.value);
  }

  function setSelectoutsideKeralaCityVilgeEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaCityVilgeEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectoutsideKeralaCityVilgeMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setoutsideKeralaCityVilgeMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  const goNext = () => {
    sessionStorage.setItem("outsideKeralaDistrict", outsideKeralaDistrict.code ? outsideKeralaDistrict.code : null);

    sessionStorage.setItem("outsideKeralaCityVilgeEn", outsideKeralaCityVilgeEn ? outsideKeralaCityVilgeEn : null);
    sessionStorage.setItem("outsideKeralaCityVilgeMl", outsideKeralaCityVilgeMl ? outsideKeralaCityVilgeMl : null);
    sessionStorage.setItem("outsideKeralaVillage", outsideKeralaVillage.code ? outsideKeralaVillage.code : null);
    sessionStorage.setItem("outsideKeralaTaluk", outsideKeralaTaluk.code ? outsideKeralaTaluk.code : null);
    sessionStorage.setItem("outsideKeralaPostOffice", outsideKeralaPostOffice.code);
    sessionStorage.setItem("outsideKeralaPincode", outsideKeralaPincode.code);
    sessionStorage.setItem("outsideKeralaHouseNameEn", outsideKeralaHouseNameEn);
    sessionStorage.setItem("outsideKeralaHouseNameMl", outsideKeralaHouseNameMl);

    sessionStorage.setItem("outsideKeralaLocalityNameEn", outsideKeralaLocalityNameEn);
    sessionStorage.setItem("outsideKeralaLocalityNameMl", outsideKeralaLocalityNameMl);
    sessionStorage.setItem("outsideKeralaStreetNameEn", outsideKeralaStreetNameEn);
    sessionStorage.setItem("outsideKeralaStreetNameMl", outsideKeralaStreetNameMl);
    onSelect(config.key, {
      outsideKeralaDistrict,
      outsideKeralaTaluk,
      outsideKeralaVillage,
      outsideKeralaCityVilgeEn,
      outsideKeralaCityVilgeMl,
      outsideKeralaPincode,
      outsideKeralaPostOffice,
      outsideKeralaLocalityNameEn,
      outsideKeralaStreetNameEn,
      outsideKeralaHouseNameEn,
      outsideKeralaLocalityNameMl,
      outsideKeralaStreetNameMl,
      outsideKeralaHouseNameMl,
    });
  };

  if (isCountryLoading || isStateLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!outsideKeralaDistrict}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OUTSIDE_KERALA_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
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
                selected={outsideKeralaDistrict}
                select={setSelectoutsideKeralaDistrict}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_TALUK_TEHSIL")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbTaluk}
                selected={outsideKeralaTaluk}
                select={setSelectoutsideKeralaTaluk}
                disabled={isEdit}
                placeholder={`${t("CR_TALUK_TEHSIL")}`}
              />
            </div>

            <div className="col-md-4">
              <CardLabel>{t("CR_TOWN_VILLAGE_EN")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="i18nKey"
                isMandatory={true}
                option={cmbUrbanRural}
                selected={outsideKeralaVillage}
                select={setSelectoutsideKeralaVillage}
                disabled={isEdit}
                placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12"></div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{t("CR_CITY_VILLAGE_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="outsideKeralaCityVilgeEn"
                value={outsideKeralaCityVilgeEn}
                onChange={setSelectoutsideKeralaCityVilgeEn}
                disable={isEdit}
                placeholder={`${t("CR_CITY_VILLAGE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
              />
            </div>
            {/* <div className="col-md-6">
              <CardLabel>
                {t("CR_CITY_VILLAGE_NAME_ML")}
               
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="outsideKeralaCityVilgeMl"
                value={outsideKeralaCityVilgeMl}
                onChange={setSelectoutsideKeralaCityVilgeMl}
                placeholder={`${t("CR_CITY_VILLAGE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_ML") })}
              />
            </div> */}
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
                selected={outsideKeralaPostOffice}
                select={setSelectoutsideKeralaPostOffice}
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
                name="outsideKeralaPincode"
                value={outsideKeralaPincode}
                onChange={setSelectoutsideKeralaPincode}
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
                name="outsideKeralaLocalityNameEn"
                value={outsideKeralaLocalityNameEn}
                onChange={setSelectoutsideKeralaLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="outsideKeralaStreetNameEn"
                value={outsideKeralaStreetNameEn}
                onChange={setSelectoutsideKeralaStreetNameEn}
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
                name="outsideKeralaHouseNameEn"
                value={outsideKeralaHouseNameEn}
                onChange={setSelectoutsideKeralaHouseNameEn}
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
                name="outsideKeralaLocalityNameMl"
                value={outsideKeralaLocalityNameMl}
                onChange={setSelectoutsideKeralaLocalityNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="outsideKeralaStreetNameMl"
                value={outsideKeralaStreetNameMl}
                onChange={setSelectoutsideKeralaStreetNameMl}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })}
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
                name="outsideKeralaHouseNameMl"
                value={outsideKeralaHouseNameMl}
                onChange={setSelectoutsideKeralaHouseNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressOutsideKerala;
