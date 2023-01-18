import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressOutsideIndia = ({ config, onSelect, userType, formData , AdressEn,setAdressEn, AdressMl, setAdressMl, AdressEnB ,setAdressEnB,AdressMlB,
    setAdressMlB,LocalityEn,setLocalityEn,LocalityMl,setLocalityMl, ProvinceEn,setProvinceEn, ProvinceMl, setProvinceMl,OutSideCountry, setOutSideCountry

}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Country = {},isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  
  // const [AdressEn, setAdressEn] = useState(formData?.AddressOutsideIndiaDetails?.AdressEn);
  // const [AdressMl, setAdressMl] = useState(formData?.AddressOutsideIndiaDetails?.AdressMl);
  // const [AdressEnB, setAdressEnB] = useState(formData?.AddressOutsideIndiaDetails?.AdressEnB);
  // const [AdressMlB, setAdressMlB] = useState(formData?.AddressOutsideIndiaDetails?.AdressMlB);
  // const [LocalityEn, setLocalityEn] = useState(formData?.AddressOutsideIndiaDetails?.LocalityEn);
  // const [LocalityMl, setLocalityMl] = useState(formData?.AddressOutsideIndiaDetails?.LocalityMl);
  // const [ProvinceEn, setProvinceEn] = useState(formData?.AddressOutsideIndiaDetails?.ProvinceEn);
  // const [ProvinceMl, setProvinceMl] = useState(formData?.AddressOutsideIndiaDetails?.ProvinceMl);
  // const [OutSideCountry, setOutSideCountry] = useState(formData?.AddressOutsideIndiaDetails?.OutSideCountry);

  // const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  const onSkip = () => onSelect();

  // function selectPlaceofactivity(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedPlaceofActivity(value);
  // }
  function setSelectAdressEn(e) {
    setAdressEn(e.target.value);
  }
  function setSelectAdressEnB(e) {
    setAdressEnB(e.target.value);
  }
  function setSelectAdressMlB(e) {
    setAdressMlB(e.target.value);
  }
  function setSelectAdressMl(e) {
    setAdressMl(e.target.value);
  }
  function setSelectLocalityEn(e) {
    setLocalityEn(e.target.value);
  }
  function setSelectLocalityMl(e) {
    setLocalityMl(e.target.value);
  }
  function setSelectProvinceEn(e) {
    setProvinceEn(e.target.value);
  }
  function setSelectProvinceMl(e) {
    setProvinceMl(e.target.value);
  }
  function setSelectOutSideCountry(value) {
    setOutSideCountry(value);
    console.log("Country" + cmbCountry);   
  }
  
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }
  
  const goNext = () => {
    // sessionStorage.setItem("AdressEn", AdressEn ? AdressEn  : null);
    // sessionStorage.setItem("AdressMl", AdressMl  ? AdressMl  : null);
    // sessionStorage.setItem("AdressEnB", AdressEnB  ? AdressEnB  : null);
    // sessionStorage.setItem("AdressMlB", AdressMlB  ? AdressMlB  : null) ;
    // sessionStorage.setItem("LocalityEn", LocalityEn  ? LocalityEn  : null);
    // sessionStorage.setItem("LocalityMl", LocalityMl  ? LocalityMl  : null);
    // sessionStorage.setItem("ProvinceEn", ProvinceEn  ? ProvinceEn  : null);
    // sessionStorage.setItem("ProvinceMl", ProvinceMl  ? ProvinceMl  : null);
    // sessionStorage.setItem("OutSideCountry", OutSideCountry ? OutSideCountry.code : null);
    // onSelect(config.key, { AdressEn, AdressMl, AdressEnB, AdressMlB, LocalityEn, LocalityMl, ProvinceEn, ProvinceMl, OutSideCountry, });
  };
  if (isCountryLoading ) {
    return <Loader></Loader>;
   }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdressEn}>
        <header className="card-header" style={{ fontSize: "35px" }}>
          {t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}
        </header>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <CardLabel>{t("CR_ADDRESS_1_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="AdressEn"
              value={AdressEn}
              onChange={setSelectAdressEn}
              disable={isEdit}
              placeholder={`${t("CR_ADDRESS_1_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_ADDRESS_1_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="AdressMl"
              value={AdressMl}
              onChange={setSelectAdressMl}
              disable={isEdit}
              placeholder={`${t("CR_ADDRESS_1_ML")}`}
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_ADDRESS_2_EN")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="AdressEnB"
              value={AdressEnB}
              onChange={setSelectAdressEnB}
              disable={isEdit}
              placeholder={`${t("CR_ADDRESS_2_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
          </div>
        </div>
      
        <div className="row">
        <div className="col-md-4">
            <CardLabel>{t("CR_ADDRESS_2_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="AdressMlB"
              value={AdressMlB}
              onChange={setSelectAdressMlB}
              disable={isEdit}
              placeholder={`${t("CR_ADDRESS_2_ML")}`}
              {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LocalityEn"
              value={LocalityEn}
              onChange={setSelectLocalityEn}
              disable={isEdit}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LocalityMl"
              value={LocalityMl}
              onChange={setSelectLocalityMl}
              disable={isEdit}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
            />
          </div>
        </div>
        <div >
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ProvinceEn"
              value={ProvinceEn}
              onChange={setSelectProvinceEn}
              disable={isEdit}
              placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ProvinceMl"
              value={ProvinceMl}
              onChange={setSelectProvinceMl}
              disable={isEdit}
              placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",  isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_ML") })}
            />
          </div>
          <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbCountry}
                selected={OutSideCountry}
                select={setSelectOutSideCountry}
                disabled={isEdit}
              />
            </div>
        </div>
        
        </div>
       
      </FormStep>
    </React.Fragment>
  );
};
export default AddressOutsideIndia;
