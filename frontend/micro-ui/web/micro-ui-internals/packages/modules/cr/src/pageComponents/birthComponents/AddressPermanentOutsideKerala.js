import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";
// import { sleep } from "react-query/types/core/utils";

const AddressPermanentOutsideKerala = ({ config, onSelect, userType, formData, permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict,
  permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk, permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn,
  permntOutsideKeralaVillage, setpermntOutsideKeralaVillage, permntOutsideKeralaPincode, setpermntOutsideKeralaPincode,
  permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn, permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl,
  permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn, permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl,
  permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn, permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl,
  permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn, permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl,
  value, setValue, isEditBirth = false, isEditDeath = false, isEditStillBirth = false, isEditAdoption, isEditBirthNAC = false,
  countryValuePermanent, setCountryValuePermanent, valuePermanent, setValuePermanent, isPrsentAddress, setIsPrsentAddress

  // isInitialRender, setIsInitialRender

}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
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
  //isEditBirth ? isEditBirth : isEditDeath ? false :
  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const [cmbFilterPerDistrict, setcmbFilterPerDistrict] = useState();
  const cmbUrbanRural = [
    { name: "Town",namelocal:"ടൌണ്‍", code: "TOWN" },
    { name: "Village",namelocal:"വില്ലേജ്", code: "VILLAGE" },
  ];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let districtid = null;
  let cmbFilterDistrict = [];
  let cmbLB = [];
  Taluk &&
    Taluk["common-masters"] && Taluk["common-masters"].Taluk &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] && Village["common-masters"].Village &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  District &&
    District["common-masters"] && District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  // PostOffice &&
  //   PostOffice["common-masters"] &&
  //   PostOffice["common-masters"].PostOffice.map((ob) => {
  //     cmbPostOffice.push(ob);
  //   });

  useEffect(() => {
    setcmbFilterPerDistrict(cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === valuePermanent));
    // }
  }, [valuePermanent])
  useEffect(() => {

    if (isInitialRender) {
      if (cmbDistrict.length > 0) {
        // currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setinsideKeralaLBName(currentLB[0]);
        //cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === "pb");
        setcmbFilterPerDistrict(cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === valuePermanent));
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukvalue(cmbFilterTaluk);
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagevalue(cmbFilterVillage);
        setIsInitialRender(false);
      }
    }
  }, [cmbFilterPerDistrict, isInitialRender]);

  if (isEditBirth) {
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
      if (cmbUrbanRural.length > 0 && (permntOutsideKeralaVillage === undefined || permntOutsideKeralaVillage === "")) {
        setpermntOutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage)[0]);
      }
    }
  } else if (isEditDeath) {
    if (formData?.AddressBirthDetails?.permntOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (permntOutsideKeralaDistrict === undefined || permntOutsideKeralaDistrict === "")) {
        setpermntOutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AddressBirthDetails?.permntOutsideKeralaDistrict)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntOutsideKeralaTaluk != null) {
      if (cmbTaluk.length > 0 && (permntOutsideKeralaTaluk === undefined || permntOutsideKeralaTaluk === "")) {
        setpermntOutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AddressBirthDetails?.permntOutsideKeralaTaluk)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntOutsideKeralaVillage != null) {
      if (cmbUrbanRural.length > 0 && (permntOutsideKeralaVillage === undefined || permntOutsideKeralaVillage === "")) {
        setpermntOutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.AddressBirthDetails?.permntOutsideKeralaVillage)[0]);
      }
    }
  } else if (isEditStillBirth) {
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (permntOutsideKeralaDistrict === undefined || permntOutsideKeralaDistrict === "")) {
        setpermntOutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaDistrict)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaTaluk != null) {
      if (cmbTaluk.length > 0 && (permntOutsideKeralaTaluk === undefined || permntOutsideKeralaTaluk === "")) {
        setpermntOutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaTaluk)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage != null) {
      if (cmbUrbanRural.length > 0 && (permntOutsideKeralaVillage === undefined || permntOutsideKeralaVillage === "")) {
        setpermntOutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage)[0]);
      }
    }
  } else if (isEditAdoption !== false) {
    if (formData?.AdoptionAddressBasePage?.permntOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (permntOutsideKeralaDistrict === undefined || permntOutsideKeralaDistrict === "")) {
        setpermntOutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AdoptionAddressBasePage?.permntOutsideKeralaDistrict)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntOutsideKeralaTaluk != null) {
      if (cmbTaluk.length > 0 && (permntOutsideKeralaTaluk === undefined || permntOutsideKeralaTaluk === "")) {
        setpermntOutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AdoptionAddressBasePage?.permntOutsideKeralaTaluk)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntOutsideKeralaVillage != null) {
      if (cmbUrbanRural.length > 0 && (permntOutsideKeralaVillage === undefined || permntOutsideKeralaVillage === "")) {
        setpermntOutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.AdoptionAddressBasePage?.permntOutsideKeralaVillage)[0]);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectpermntOutsideKeralaDistrict(value) {
    setpermntOutsideKeralaDistrict(value);
    districtid = value.districtid;
    setcmbFilterPerDistrict(null);
  }

  function setSelectpermntOutsideKeralaVillage(value) {
    setpermntOutsideKeralaVillage(value);
  }
  function setSelectpermntOutsideKeralaTaluk(e) {
    // setpermntOutsideKeralaTaluk(value);
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaTaluk(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  // function setSelectoutsideKeralaPostOffice(value) {
  //   setoutsideKeralaPostOffice(value);
  // }
  function setSelectpermntOutsideKeralaPincode(e) {
    setpermntOutsideKeralaPincode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6));
  }
  function setSelectoutsideKeralaPostOfficeEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntoutsideKeralaPostOfficeEn(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
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
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null)) {
      setpermntOutsideKeralaHouseNameEn(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectpermntOutsideKeralaHouseNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntOutsideKeralaHouseNameMl('');
    }
    else {
      setpermntOutsideKeralaHouseNameMl(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectpermntOutsideKeralaLocalityNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaLocalityNameEn(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectpermntOutsideKeralaLocalityNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntOutsideKeralaLocalityNameMl('');
    }
    else {
      setpermntOutsideKeralaLocalityNameMl(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectpermntOutsideKeralaStreetNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaStreetNameEn(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectpermntOutsideKeralaStreetNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntOutsideKeralaStreetNameMl('');
    }
    else {
      setpermntOutsideKeralaStreetNameMl(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectpermntOutsideKeralaCityVilgeEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntOutsideKeralaCityVilgeEn(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setCheckMalayalamInputFieldWithSplChar(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]/;
    if (!(e.key.match(pattern))) {
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
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!permntOutsideKeralaDistrict}> */}
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_PERM_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_DISTRICT")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey={locale === "en_IN" ? "name" : "namelocal"}
              option={sortDropdownNames(cmbFilterPerDistrict ? cmbFilterPerDistrict : [], "name", t)}
              selected={permntOutsideKeralaDistrict}
              select={setSelectpermntOutsideKeralaDistrict}
              disable={isDisableEdit}
              placeholder={`${t("CS_COMMON_DISTRICT")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TALUK_TEHSIL")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaTaluk"
              value={permntOutsideKeralaTaluk}
              onChange={setSelectpermntOutsideKeralaTaluk}
              placeholder={`${t("CR_TALUK_TEHSIL")}`}
              disable={isDisableEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
            {/* <Dropdown
              t={t}
              optionKey="name"
              option={cmbTaluk}
              selected={permntOutsideKeralaTaluk}
              select={setSelectpermntOutsideKeralaTaluk}
              disable={isDisableEdit} 
              placeholder={`${t("CR_TALUK_TEHSIL")}`}
            /> */}
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TOWN_VILLAGE_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
              option={sortDropdownNames(cmbUrbanRural ? cmbUrbanRural : [], "code", t)}
              selected={permntOutsideKeralaVillage}
              select={setSelectpermntOutsideKeralaVillage}
              disable={isDisableEdit}
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
              disable={isDisableEdit}
              placeholder={`${t("CR_CITY_VILLAGE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
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
              disable={isDisableEdit}
              placeholder={`${t("CS_COMMON_PIN_CODE")}`}
              {...(validation = {
                pattern: "^[0-9]*$",
                isRequired: true,
                type: "text",
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
              disable={isDisableEdit}
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
      </div>
      <div className="row">
        <div className="col-md-12">
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
              disable={isDisableEdit}
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
              onKeyPress={setCheckMalayalamInputField}
              onChange={setSelectpermntOutsideKeralaLocalityNameMl}
              disable={isDisableEdit}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C ]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideKeralaStreetNameEn"
              value={permntOutsideKeralaStreetNameEn}
              onChange={setSelectpermntOutsideKeralaStreetNameEn}
              disable={isDisableEdit}
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
              onKeyPress={setCheckMalayalamInputField}
              onChange={setSelectpermntOutsideKeralaStreetNameMl}
              disable={isDisableEdit}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C ]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
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
              disable={isDisableEdit}
              placeholder={`${t("CR_HOUSE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
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
              onKeyPress={setCheckMalayalamInputFieldWithSplChar}
              onChange={setSelectpermntOutsideKeralaHouseNameMl}
              disable={isDisableEdit}
              placeholder={`${t("CR_HOUSE_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_HOUSE_NAME_ML"),
              })}
            />
          </div>
        </div>
      </div>
      {/* </FormStep> */}
    </React.Fragment>
  );
};
export default AddressPermanentOutsideKerala;