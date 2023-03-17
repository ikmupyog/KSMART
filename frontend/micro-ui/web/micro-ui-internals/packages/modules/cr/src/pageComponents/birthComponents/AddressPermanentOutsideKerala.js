import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const AddressPermanentOutsideKerala = ({ config, onSelect, userType, formData, permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict,
  permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk, permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn,
  permntOutsideKeralaVillage, setpermntOutsideKeralaVillage, permntOutsideKeralaPincode, setpermntOutsideKeralaPincode,
  permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn, permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl,
  permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn, permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl,
  permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn, permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl,
  permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn, permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl,
  value, setValue,isEditBirth = false, isEditDeath = false

}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  // const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  // const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  // const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  // const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  // const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

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
  let cmbFilterDistrict = [];
  let cmbLB = [];
  console.log(value);
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
  // PostOffice &&
  //   PostOffice["common-masters"] &&
  //   PostOffice["common-masters"].PostOffice.map((ob) => {
  //     cmbPostOffice.push(ob);
  //   });

  useEffect(() => {

    if (isInitialRender) {
      if (cmbDistrict.length > 0) {
        console.log(cmbDistrict);
        // currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setinsideKeralaLBName(currentLB[0]);
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === "pb");
        console.log(cmbFilterDistrict);
        // setpermntOutsideKeralaDistrict(cmbFilterDistrict);
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukvalue(cmbFilterTaluk);
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagevalue(cmbFilterVillage);
        setIsInitialRender(false);
      }
    }
  }, [cmbFilterDistrict, isInitialRender]);
  
  if (isEditBirth || isEditDeath) {
    if (formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (permntOutsideKeralaDistrict === undefined || permntOutsideKeralaDistrict === "")) {
        setpermntOutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaDistrict)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaTaluk != null) {
      if (cmbTaluk.length > 0 && (permntOutsideKeralaTaluk === undefined || permntOutsideKeralaTaluk === "")) {
        setpermntOutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaTaluk)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage != null) {
      if (cmbVillage.length > 0 && (permntOutsideKeralaVillage === undefined || permntOutsideKeralaVillage === "")) {
        setpermntOutsideKeralaVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage)[0]);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectpermntOutsideKeralaDistrict(value) {
    setpermntOutsideKeralaDistrict(value);
    districtid = value.districtid;
  }

  function setSelectpermntOutsideKeralaVillage(value) {
    setpermntOutsideKeralaVillage(value);
  }
  function setSelectpermntOutsideKeralaTaluk(value) {
    setpermntOutsideKeralaTaluk(value);
  }
  // function setSelectoutsideKeralaPostOffice(value) {
  //   setoutsideKeralaPostOffice(value);
  // }
  function setSelectpermntOutsideKeralaPincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        return false;
      } else if (e.target.value.length < 6) {
        setpermntOutsideKeralaPincode(e.target.value);
        return false;
      } else {
        setpermntOutsideKeralaPincode(e.target.value);
        return true;
      }
    }
  }
  function setSelectoutsideKeralaPostOfficeEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntoutsideKeralaPostOfficeEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectoutsideKeralaPostOfficeMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntoutsideKeralaPostOfficeMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectpermntOutsideKeralaHouseNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaHouseNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectpermntOutsideKeralaHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntOutsideKeralaHouseNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectpermntOutsideKeralaLocalityNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaLocalityNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectpermntOutsideKeralaLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntOutsideKeralaLocalityNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectpermntOutsideKeralaStreetNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaStreetNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectpermntOutsideKeralaStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntOutsideKeralaStreetNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectpermntOutsideKeralaCityVilgeEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaCityVilgeEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if(!(e.key.match(pattern))){
      e.preventDefault();
    }    
  }
  const goNext = () => {
  };

  if (isDistrictLoading || isTalukLoading || isVillageLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!permntOutsideKeralaDistrict}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_PERM_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>

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
              selected={permntOutsideKeralaDistrict}
              select={setSelectpermntOutsideKeralaDistrict}
              placeholder={`${t("CS_COMMON_DISTRICT")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TALUK_TEHSIL")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbTaluk}
              selected={permntOutsideKeralaTaluk}
              select={setSelectpermntOutsideKeralaTaluk}
              placeholder={`${t("CR_TALUK_TEHSIL")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TOWN_VILLAGE_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="i18nKey"
              option={cmbUrbanRural}
              selected={permntOutsideKeralaVillage}
              select={setSelectpermntOutsideKeralaVillage}
              placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_CITY_VILLAGE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaCityVilgeEn"
              value={permntOutsideKeralaCityVilgeEn}
              onChange={setSelectpermntOutsideKeralaCityVilgeEn}
              placeholder={`${t("CR_CITY_VILLAGE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_PIN_CODE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaPincode"
              value={permntOutsideKeralaPincode}
              onChange={setSelectpermntOutsideKeralaPincode}
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
          {/* <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                option={cmbPostOffice}
                selected={presentOutsideKeralaPostOffice}
                select={setSelectoutsideKeralaPostOffice}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div> */}
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaPostOfficeEn"
              value={permntOutsideKeralaPostOfficeEn}
              onChange={setSelectoutsideKeralaPostOfficeEn}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div>
          {/* <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaPostOfficeMl"
              value={permntOutsideKeralaPostOfficeMl}
              onChange={setSelectoutsideKeralaPostOfficeMl}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaLocalityNameEn"
              value={permntOutsideKeralaLocalityNameEn}
              onChange={setSelectpermntOutsideKeralaLocalityNameEn}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaLocalityNameMl"
              value={permntOutsideKeralaLocalityNameMl}
              onKeyPress = {setCheckMalayalamInputField}
              onChange={setSelectpermntOutsideKeralaLocalityNameMl}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaStreetNameEn"
              value={permntOutsideKeralaStreetNameEn}
              onChange={setSelectpermntOutsideKeralaStreetNameEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaStreetNameMl"
              value={permntOutsideKeralaStreetNameMl}
              onKeyPress = {setCheckMalayalamInputField}
              onChange={setSelectpermntOutsideKeralaStreetNameMl}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaHouseNameEn"
              value={permntOutsideKeralaHouseNameEn}
              onChange={setSelectpermntOutsideKeralaHouseNameEn}
              placeholder={`${t("CR_HOUSE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaHouseNameMl"
              value={permntOutsideKeralaHouseNameMl}
              onKeyPress = {setCheckMalayalamInputField}
              onChange={setSelectpermntOutsideKeralaHouseNameMl}
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
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPermanentOutsideKerala;