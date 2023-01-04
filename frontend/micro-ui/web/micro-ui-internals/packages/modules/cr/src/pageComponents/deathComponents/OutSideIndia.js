import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const OutSideIndia = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(formData?.AddressOfDecesed?.setPlaceofActivity);
  const [AdressEn, setAdressEn] = useState(formData?.AddressOfDecesed?.AdressEn);
  const [AdressMl, setAdressMl] = useState(formData?.AddressOfDecesed?.AdressMl);
  const [AdressEnB, setAdressEnB] = useState(formData?.AddressOfDecesed?.AdressEnB);
  const [AdressMlB, setAdressMlB] = useState(formData?.AddressOfDecesed?.AdressMlB);
  const [LocalityEn, setLocalityEn] = useState(formData?.AddressOfDecesed?.LocalityEn);
  const [LocalityMl, setLocalityMl] = useState(formData?.AddressOfDecesed?.LocalityMl);
  const [ProvinceEn, setProvinceEn] = useState(formData?.AddressOfDecesed?.ProvinceEn);
  const [ProvinceMl, setProvinceMl] = useState(formData?.AddressOfDecesed?.ProvinceMl);
  const [setCountry, setSelectedCountry] = useState(formData?.InformationDeath?.setCountry);

  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }
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
  function selectCountry(e) {
    setSelectedCountry(e.target.value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }
  const goNext = () => {
    sessionStorage.setItem("AdressEn", AdressEn);
    sessionStorage.setItem("AdressMl", AdressMl);
    sessionStorage.setItem("AdressEnB", AdressEnB);
    sessionStorage.setItem("AdressMlB", AdressMlB);
    sessionStorage.setItem("LocalityEn", LocalityEn);
    sessionStorage.setItem("LocalityMl", LocalityMl);
    sessionStorage.setItem("ProvinceEn", ProvinceEn);
    sessionStorage.setItem("ProvinceMl", ProvinceMl);
    sessionStorage.setItem("setCountry", setCountry.code);
    onSelect(config.key, { AdressEn, AdressMl, AdressEnB, AdressMlB, LocalityEn, LocalityMl, ProvinceEn, ProvinceMl, setCountry });
  };
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
        <header className="card-header" style={{ fontSize: "35px" }}>
          {t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}
        </header>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="col-md-4 ">
              <hr className="aligncss"></hr>
            </div>
            <div className="col-md-4 ">
              <h1 className="headingh1">
                <span>{t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}</span>
              </h1>
            </div>
            <div className="col-md-4">
              <hr className="aligncss"></hr>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_ADDRESS_1_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
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
          <div className="col-md-6">
            <CardLabel>{t("CR_ADDRESS_1_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
              type={"text"}
              optionKey="i18nKey"
              name="AdressMl"
              value={AdressMl}
              onChange={setSelectAdressMl}
              disable={isEdit}
              placeholder={`${t("CR_ADDRESS_1_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
              {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
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
          <div className="col-md-6">
            <CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
              type={"text"}
              optionKey="i18nKey"
              name="LocalityMl"
              value={LocalityMl}
              onChange={setSelectLocalityMl}
              disable={isEdit}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
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
          <div className="col-md-6">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={TextTrackCueList}
              type={"text"}
              optionKey="i18nKey"
              name="ProvinceMl"
              value={ProvinceMl}
              onChange={setSelectProvinceMl}
              disable={isEdit}
              placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_ML") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_COUNTRY")}</CardLabel>
            <Dropdown t={t} 
            optionKey="name" 
            isMandatory={false} 
            option={cmbNation} 
            selected={setCountry} 
            select={selectCountry} 
            disabled={isEdit}
            placeholder={`${t("CS_COMMON_COUNTRY")}`}
             />
           
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default OutSideIndia;
