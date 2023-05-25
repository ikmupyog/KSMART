import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";

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
  permanentOutsideIndiaPostCode, setPermantpostCode, permntOutsideIndiaCountry, setPermntOutsideIndiaCountry, isEditBirth = false, isEditDeath = false,isEditAdoption,
  isEditStillBirth = false,isEditBirthNAC=false
  // isInitialRender, setIsInitialRender
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  let validation = {};
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const [isDisableEdit, setisDisableEdit] = useState(false);

  let cmbCountry = [];
  Country &&
    Country["common-masters"] && Country["common-masters"].Country &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  const cmbUrbanRural = [
    { name: "Town",namelocal:"ടൌണ്‍", code: "TOWN" },
    { name: "Village",namelocal:"വില്ലേജ്", code: "VILLAGE" },
  ];

  if (isEditBirth) {
    if (formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutSideIndiaadrsVillage === undefined || presentOutSideIndiaadrsVillage === "")) {
        setadrsVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage)[0]);
      }
    }
  } else if (isEditAdoption!==false){
    if (formData?.AdoptionAddressBasePage?.presentOutSideIndiaadrsVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutSideIndiaadrsVillage === undefined || presentOutSideIndiaadrsVillage === "")) {
        setadrsVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.AdoptionAddressBasePage?.presentOutSideIndiaadrsVillage)[0]);
      }
    }
  }else if (isEditDeath) {
    if (formData?.AddressBirthDetails?.presentOutSideIndiaadrsVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutSideIndiaadrsVillage === undefined || presentOutSideIndiaadrsVillage === "")) {
        setadrsVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.AddressBirthDetails?.presentOutSideIndiaadrsVillage)[0]);
      }
    }
  } else if (isEditStillBirth) {
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutSideIndiaadrsVillage === undefined || presentOutSideIndiaadrsVillage === "")) {
        setadrsVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage)[0]);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectadrsVillage(value) {
    setadrsVillage(value);
    if (isPrsentAddress) {
      setadrsPermntOutsideIndiaVillage(value);
    } 
    // else {
    //   setadrsPermntOutsideIndiaVillage('');
    // }
  }

  function setSelectadrsCityTown(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9,/ ]*$") != null)) {
      setadrsCityTown(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaCityTown(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      } 
      // else {
      //   setadrsPermntOutsideIndiaCityTown('');
      // }
    }
  }

  function setSelectAdressEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9,/ ]*$") != null)) {
      setAdressEn(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLineoneEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      } 
      // else {
      //   setadrsPermntOutsideIndiaLineoneEn('');
      // }
    }
  }
  function setSelectAdressEnB(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9,/ ]*$") != null)) {
      setAdressEnB(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLinetwoEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      } 
      // else {
      //   setadrsPermntOutsideIndiaLinetwoEn('');
      // }
    }
  }

  function setSelectAdressMlB(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C,0-9 \/-]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setAdressMlB('');
    }
    else {
      setAdressMlB(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLinetwoMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      } 
      // else {
      //   setadrsPermntOutsideIndiaLinetwoMl('');
      // }
    }
  }
  function setSelectAdressMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C,0-9 \/-]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setAdressMl('');
    }
    else {
      setAdressMl(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      if (isPrsentAddress) {
        setadrsPermntOutsideIndiaLineoneMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      } 
      // else {
      //   setadrsPermntOutsideIndiaLineoneMl('');
      // }
    }
  }

  function setSelectProvinceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9,/ ]*$") != null)) {
      setProvinceEn(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      if (isPrsentAddress) {
        setPermntOutsideIndiaprovinceEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      } 
      // else {
      //   setPermntOutsideIndiaprovinceEn('');
      // }
    }
  }
  function setSelectProvinceMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C,0-9 \/-]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setProvinceMl('');
    }
    else {
      setProvinceMl(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      if (isPrsentAddress) {
        setPermntOutsideIndiaprovinceMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
      } 
      // else {
      //   setPermntOutsideIndiaprovinceMl('');
      // }
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
    setPostCode(e.target.value.length <= 6 ? e.target.value.replace(/[^a-zA-Z0-9]/ig, '') : (e.target.value.replace(/[^a-zA-Z0-9]/ig, '')).substring(0, 6));
    if (isPrsentAddress) {
      setPermantpostCode(e.target.value.trim().length <= 6 ? e.target.value.trim().replace(/[^a-zA-Z0-9]/ig, '') : (e.target.value.trim().replace(/[^a-zA-Z0-9]/ig, '')).substring(0, 6));
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C,0-9 \/-]/;
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
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaProvinceEn"
                value={presentOutSideIndiaProvinceEn}
                onChange={setSelectProvinceEn}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                disable={isDisableEdit}
                {...(validation = { pattern: "^[a-zA-Z-0-9,/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_ML")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaProvinceMl"
                value={presentOutSideIndiaProvinceMl}
                onKeyPress={setCheckMalayalamInputField}
                onChange={setSelectProvinceMl}
                disable={isDisableEdit}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C,0-9 \/-]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
              /> 
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <CardLabel>
                {t("CR_TOWN_VILLAGE_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                option={sortDropdownNames(cmbUrbanRural ? cmbUrbanRural : [],"code",t)}
                selected={presentOutSideIndiaadrsVillage}
                select={setSelectadrsVillage}
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
                name="presentOutSideIndiaadrsCityTown"
                value={presentOutSideIndiaadrsCityTown}
                onChange={setSelectadrsCityTown}
                disable={isDisableEdit}
                placeholder={`${t("CR_CITY_TOWN_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-0-9,/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_ZIP_CODE")}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaPostCode"
                value={presentOutSideIndiaPostCode}
                onChange={setSelectPostCode}
                style={{ textTransform: "uppercase" }}
                disable={isDisableEdit}
                placeholder={`${t("CR_ZIP_CODE")}`}
                {...(validation = {
                  pattern: "^[a-zA-Z0-9]*$",
                  isRequired: true,
                  type: "text",
                  maxLength: 6,
                  minLength: 6,
                  title: t("CR_INVALID_ZIP_CODE"),
                })}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_EN")}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressEn"
                value={presentOutSideIndiaAdressEn}
                onChange={setSelectAdressEn}
                disable={isDisableEdit}
                placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-0-9,/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
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
                disable={isDisableEdit}
                placeholder={`${t("CR_ADDRES_LINE_TWO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-0-9,/ ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_TWO_EN") })}
              />
            </div>

          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_ML")}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressMl"
                value={presentOutSideIndiaAdressMl}
                onKeyPress={setCheckMalayalamInputField}
                onChange={setSelectAdressMl}
                disable={isDisableEdit}
                placeholder={`${t("CR_ADDRES_LINE_ONE_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C,0-9 \/-]*$",
                  isRequired: true,
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
                disable={isDisableEdit}
                placeholder={`${t("CR_ADDRES_LINE_TWO_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C,0-9 \/-]*$",
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