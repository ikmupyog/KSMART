import React, { useEffect, useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../../utils";

const BrideAddressPermanentOutsideIndia = ({
  config,
  onSelect,
  userType,
  formData,
  permntOutsideIndiaLineoneEn,
  setadrsPermntOutsideIndiaLineoneEn,
  permntOutsideIndiaLineoneMl,
  setadrsPermntOutsideIndiaLineoneMl,
  permntOutsideIndiaLinetwoEn,
  setadrsPermntOutsideIndiaLinetwoEn,
  permntOutsideIndiaLinetwoMl,
  setadrsPermntOutsideIndiaLinetwoMl,
  permntOutsideIndiaprovinceEn,
  setPermntOutsideIndiaprovinceEn,
  permntOutsideIndiaprovinceMl,
  setPermntOutsideIndiaprovinceMl,
  permntOutsideIndiaVillage,
  setadrsPermntOutsideIndiaVillage,
  permntOutsideIndiaCityTown,
  setadrsPermntOutsideIndiaCityTown,
  permanentOutsideIndiaPostCode,
  setPermantpostCode,
  setpermntInKeralaAdrDistrict,
  setpermntInKeralaAdrLBName,
  setpermtaddressStateName,
  isEditMarriage = false,
  isEditDeath = false,
  isEditStillBirth = false,
  isEditAdoption,
  isEditBirthNAC = false,
  isPrsentAddress,
  setIsPrsentAddress,
  // isInitialRender, setIsInitialRender
  //isEditMarriage ? isEditMarriage : isEditDeath ? false :
  //  permntOutsideIndiaCountry,  setPermntOutsideIndiaCountry, countryvalue, setCountryValue,
}) => {
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  let validation = {};
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let cmbVillage = [];
  const cmbUrbanRural = [
    { i18nKey: "Town", code: "TOWN" },
    { i18nKey: "Village", code: "VILLAGE" },
  ];

  if (isEditMarriage) {
    if (formData?.BrideAddressDetails?.permntOutsideIndiaVillage != null) {
      if (cmbVillage.length > 0 && (permntOutsideIndiaVillage === undefined || permntOutsideIndiaVillage === "")) {
        setadrsVillage(
          cmbVillage.filter((cmbVillage) => cmbVillage.code === formData?.BrideAddressDetails?.permntOutsideIndiaVillage)[0]
        );
      }
    }
  } else if (isEditDeath) {
    if (formData?.BrideAddressDetails?.permntOutsideIndiaVillage != null) {
      if (cmbVillage.length > 0 && (permntOutsideIndiaVillage === undefined || permntOutsideIndiaVillage === "")) {
        setadrsVillage(cmbVillage.filter((cmbVillage) => cmbVillage.code === formData?.BrideAddressDetails?.permntOutsideIndiaVillage)[0]);
      }
    }
  } else if (isEditStillBirth) {
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaVillage != null) {
      if (cmbVillage.length > 0 && (permntOutsideIndiaVillage === undefined || permntOutsideIndiaVillage === "")) {
        setadrsVillage(
          cmbVillage.filter((cmbVillage) => cmbVillage.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaVillage)[0]
        );
      }
    }
  }
  if (isEditAdoption !== false) {
    if (formData?.AdoptionAddressBasePage?.permntOutsideIndiaVillage != null) {
      if (cmbVillage.length > 0 && (permntOutsideIndiaVillage === undefined || permntOutsideIndiaVillage === "")) {
        setadrsVillage(cmbVillage.filter((cmbVillage) => cmbVillage.code === formData?.AdoptionAddressBasePage?.permntOutsideIndiaVillage)[0]);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectadrsPermntOutsideIndiaVillage(value) {
    setadrsPermntOutsideIndiaVillage(value);
  }

  function setSelectadrsPermntOutsideIndiaCityTown(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setadrsPermntOutsideIndiaCityTown(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectadrsPermntOutsideIndiaLineoneEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setadrsPermntOutsideIndiaLineoneEn(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectadrsPermntOutsideIndiaLinetwoEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setadrsPermntOutsideIndiaLinetwoEn(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectadrsPermntOutsideIndiaLinetwoMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setadrsPermntOutsideIndiaLinetwoMl("");
    } else {
      setadrsPermntOutsideIndiaLinetwoMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectadrsPermntOutsideIndiaLineoneMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setadrsPermntOutsideIndiaLineoneMl("");
    } else {
      setadrsPermntOutsideIndiaLineoneMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectLocalityEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setLocalityEn(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectLocalityMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setLocalityMl("");
    } else {
      setLocalityMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  // function setSelectResNoEn(e) {
  //   if (e.target.value.length === 20) {
  //     return false;
  //   } else {
  //     setResNoEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
  //   }
  // }
  // function setSelectResNoMl(e) {
  //   if (e.target.value.length === 20) {
  //     return false;
  //   } else {
  //     setResNoMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
  //   }
  // }
  function setSelectHouseNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setHouseNameEn(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectHouseNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setHouseNameMl("");
    } else {
      setHouseNameMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectPermntOutsideIndiaprovinceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setPermntOutsideIndiaprovinceEn(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectPermntOutsideIndiaprovinceMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setPermntOutsideIndiaprovinceMl("");
    } else {
      setPermntOutsideIndiaprovinceMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectProvinceMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setProvinceMl("");
    } else {
      setProvinceMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectPermntOutsideIndiaCountry(value) {
    setPermntOutsideIndiaCountry(value);
  }
  // function setSelectPostCode(e) {
  //   setPermantpostCode(e.target.value);
  // }
  function setSelectPostCode(e) {
    setPermantpostCode(e.target.value.length <= 6 ? e.target.value.replace(/[^a-zA-Z0-9]/ig, '') : e.target.value.replace(/[^a-zA-Z0-9]/ig, '').substring(0, 6));
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    setpermntInKeralaAdrDistrict(null);
    setpermntInKeralaAdrLBName(null);
    setpermtaddressStateName(null);
  }, []);

  const goNext = () => {};
  if (isCountryLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} > */}
      {/* <header className="card-header" style={{ fontSize: "35px" }}>
        {t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}
      </header> */}
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {/* <div className="col-md-4">
          <CardLabel>
            {`${t("CS_COMMON_COUNTRY")}`}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            t={t}
            optionKey="name"
            option={cmbCountry}
            selected={permntOutsideIndiaCountry}
            select={setSelectPermntOutsideIndiaCountry}
            placeholder={`${t("CS_COMMON_COUNTRY")}`}
          />
        </div> */}
          <div className="col-md-6">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideIndiaprovinceEn"
              value={permntOutsideIndiaprovinceEn}
              onChange={setSelectPermntOutsideIndiaprovinceEn}
              placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
              disable={isDisableEdit}
              {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideIndiaprovinceMl"
              value={permntOutsideIndiaprovinceMl}
              onKeyPress={setCheckMalayalamInputField}
              onChange={setSelectPermntOutsideIndiaprovinceMl}
              placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
              disable={isDisableEdit}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C ]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STATE_REGION_PROVINCE_ML"),
              })}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-4">
            <CardLabel>
              {t("CR_TOWN_VILLAGE_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="i18nKey"
              option={sortDropdownNames(cmbUrbanRural ? cmbUrbanRural : [], "code", t)}
              selected={permntOutsideIndiaVillage}
              select={setSelectadrsPermntOutsideIndiaVillage}
              disable={isDisableEdit}
              placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CR_CITY_TOWN_EN")} <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideIndiaCityTown"
              value={permntOutsideIndiaCityTown}
              onChange={setSelectadrsPermntOutsideIndiaCityTown}
              placeholder={`${t("CR_CITY_TOWN_EN")}`}
              disable={isDisableEdit}
              {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_ZIP_CODE")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permanentOutsideIndiaPostCode"
              value={permanentOutsideIndiaPostCode}
              onChange={setSelectPostCode}
              disable={isDisableEdit}
              placeholder={`${t("CR_ZIP_CODE")}`}
              {...(validation = {
                pattern: "^[a-zA-Z0-9]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_ZIP_CODE"),
              })}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <CardLabel>{t("CR_ADDRES_LINE_ONE_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideIndiaLineoneEn"
              value={permntOutsideIndiaLineoneEn}
              onChange={setSelectadrsPermntOutsideIndiaLineoneEn}
              disable={isDisableEdit}
              placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_ADDRES_LINE_ONE_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideIndiaLineoneMl"
              value={permntOutsideIndiaLineoneMl}
              onKeyPress={setCheckMalayalamInputField}
              onChange={setSelectadrsPermntOutsideIndiaLineoneMl}
              disable={isDisableEdit}
              placeholder={`${t("CR_ADDRES_LINE_ONE_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C ]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_ADDRES_LINE_ONE_ML"),
              })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <CardLabel>{t("CR_ADDRES_LINE_TWO_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideIndiaLinetwoEn"
              value={permntOutsideIndiaLinetwoEn}
              onChange={setSelectadrsPermntOutsideIndiaLinetwoEn}
              disable={isDisableEdit}
              placeholder={`${t("CR_ADDRES_LINE_TWO_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_TWO_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_ADDRES_LINE_TWO_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="permntOutsideIndiaLinetwoMl"
              value={permntOutsideIndiaLinetwoMl}
              onKeyPress={setCheckMalayalamInputField}
              onChange={setSelectadrsPermntOutsideIndiaLinetwoMl}
              placeholder={`${t("CR_ADDRES_LINE_TWO_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C ]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_ADDRES_LINE_TWO_ML"),
              })}
            />
          </div>
        </div>
      </div>
      {/* </FormStep> */}
    </React.Fragment>
  );
};
export default BrideAddressPermanentOutsideIndia;
