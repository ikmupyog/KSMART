import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPresentOutsideIndia = ({ config, onSelect, userType, formData, presentOutSideIndiaAdressEn, setAdressEn,
  presentOutSideIndiaAdressMl, setAdressMl, presentOutSideIndiaAdressEnB, setAdressEnB, presentOutSideIndiaAdressMlB,
  setAdressMlB, presentOutSideIndiaProvinceEn, setProvinceEn, presentOutSideIndiaProvinceMl, setProvinceMl, presentOutSideIndiaadrsVillage, setadrsVillage,
  presentOutSideIndiaadrsCityTown, setadrsCityTown, presentOutSideIndiaPostCode, setPostCode,
  //  presentOutSideCountry,  setOutSideCountry, countryvalue, setCountryValue,
  isPrsentAddress, setIsPrsentAddress, permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn,
  permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl, permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn,
  permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl, permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn,
  permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl,
  permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage, permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown,
  permanentOutsideIndiaPostCode, setPermantpostCode, permntOutsideIndiaCountry, setPermntOutsideIndiaCountry, isEditBirth = false, isEditAbandonedDeath = false,
  // isInitialRender, setIsInitialRender
}) => {
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
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  const cmbUrbanRural = [
    { i18nKey: "Town", code: "TOWN" },
    { i18nKey: "Village", code: "VILLAGE" },
  ];

  if (isEditBirth) {
    if (formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutSideIndiaadrsVillage === undefined || presentOutSideIndiaadrsVillage === "")) {
        setadrsVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage)[0]);
      }
    }
  } else if (isEditAbandonedDeath) {
    if (formData?.AddressBirthDetails?.presentOutSideIndiaadrsVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutSideIndiaadrsVillage === undefined || presentOutSideIndiaadrsVillage === "")) {
        setadrsVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.AddressBirthDetails?.presentOutSideIndiaadrsVillage)[0]);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectadrsVillage(value) {
    setadrsVillage(value);
    if (isPrsentAddress) {
      setadrsPermntOutsideIndiaVillage(value);
    } else {
      setadrsPermntOutsideIndiaVillage('');
    }
  }

  function setSelectadrsCityTown(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setadrsCityTown(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaCityTown(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      } else {
        setadrsPermntOutsideIndiaCityTown('');
      }
    }
  }

  function setSelectAdressEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setAdressEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLineoneEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      } else {
        setadrsPermntOutsideIndiaLineoneEn('');
      }
    }
  }
  function setSelectAdressEnB(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setAdressEnB(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLinetwoEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      } else {
        setadrsPermntOutsideIndiaLinetwoEn('');
      }
    }
  }

  function setSelectAdressMlB(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setAdressMlB('');
    }
    else {
      setAdressMlB(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLinetwoMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      } else {
        setadrsPermntOutsideIndiaLinetwoMl('');
      }
    }
  }
  function setSelectAdressMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setAdressMl('');
    }
    else {
      setAdressMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLineoneMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      } else {
        setadrsPermntOutsideIndiaLineoneMl('');
      }
    }
  }

  function setSelectProvinceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setProvinceEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setPermntOutsideIndiaprovinceEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      } else {
        setPermntOutsideIndiaprovinceEn('');
      }
    }
  }
  function setSelectProvinceMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setProvinceMl('');
    }
    else {
      setProvinceMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setPermntOutsideIndiaprovinceMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      } else {
        setPermntOutsideIndiaprovinceMl('');
      }
    }
  }

  // function setSelectOutSideCountry(value) {
  //   setOutSideCountry(value);
  //   if (isPrsentAddress) {
  //     setPermntOutsideIndiaCountry(presentOutSideCountry);
  //   } else {
  //     setPermntOutsideIndiaCountry('');
  //   }
  // }
  // function setSelectPostCode(e) {
  //   setPostCode(e.target.value);
  // }
  function setSelectPostCode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        return false;
      } else if (e.target.value.length < 6) {
        setPostCode(e.target.value);
        return false;
      } else {
        setPostCode(e.target.value);
        if (isPrsentAddress) {
          setPermantpostCode(e.target.value);
        } else {
          setPermantpostCode('');
        }
      }
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  const goNext = () => {

  };
  if (isCountryLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentOutSideIndiaAdressEn}> */}
          {/* <header className="card-header" style={{ fontSize: "35px" }}>
          {t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}
        </header> */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-md-4">
            <CardLabel>
              {`${t("CS_COMMON_COUNTRY")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbCountry}
              selected={presentOutSideCountry}
              select={setSelectOutSideCountry}
              placeholder={`${t("CS_COMMON_COUNTRY")}`}
            />
          </div> */}
            <div className="col-md-6">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaProvinceEn"
                value={presentOutSideIndiaProvinceEn}
                onChange={setSelectProvinceEn}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_ML")} </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaProvinceMl"
                value={presentOutSideIndiaProvinceMl}
                onKeyPress={setCheckMalayalamInputField}
                
                onChange={setSelectProvinceMl}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                {...(validation = {  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false,type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <CardLabel>
                {t("CR_TOWN_VILLAGE_EN")}
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="i18nKey"
                option={cmbUrbanRural}
                selected={presentOutSideIndiaadrsVillage}
                select={setSelectadrsVillage}
                placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_CITY_TOWN_EN")} 
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaadrsCityTown"
                value={presentOutSideIndiaadrsCityTown}
                onChange={setSelectadrsCityTown}
                placeholder={`${t("CR_CITY_TOWN_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_ZIP_CODE")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaPostCode"
                value={presentOutSideIndiaPostCode}
                onChange={setSelectPostCode}
                placeholder={`${t("CR_ZIP_CODE")}`}
                {...(validation = {
                  pattern: "^[a-zA-Z-.0-9`' ]*$",
                  isRequired: false,
                  type: "number",
                  max: 6,
                  min: 6,
                  title: t("CR_INVALID_ZIP_CODE"),
                })}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_EN")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressEn"
                value={presentOutSideIndiaAdressEn}
                onChange={setSelectAdressEn}
                placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_EN")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressEnB"
                value={presentOutSideIndiaAdressEnB}
                onChange={setSelectAdressEnB}
                placeholder={`${t("CR_ADDRES_LINE_TWO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_TWO_EN") })}
              />
            </div>

          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_ML")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressMl"
                value={presentOutSideIndiaAdressMl}
                onKeyPress={setCheckMalayalamInputField}
                onChange={setSelectAdressMl}
                placeholder={`${t("CR_ADDRES_LINE_ONE_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_ADDRES_LINE_ONE_ML"),
                })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_ML")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressMlB"
                value={presentOutSideIndiaAdressMlB}
                onKeyPress={setCheckMalayalamInputField}
                onChange={setSelectAdressMlB}
                placeholder={`${t("CR_ADDRES_LINE_TWO_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_ADDRES_LINE_TWO_ML"),
                })}
              />
            </div>
          </div>
        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default AddressPresentOutsideIndia;