import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformentAddress = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "mtaluk");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const [setVillage, setSelectedVillage] = useState(formData?.TradeDetails?.setVillage);
  const [setTaluk, setSelectedTaluk] = useState(formData?.TradeDetails?.setTaluk);
  const [setDistrict, setSelectedDistrict] = useState(formData?.TradeDetails?.setDistrict);
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  let cmbVillage = [];
  let cmbTaluk = [];
  let cmbDistrict = [];
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].mtaluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });

  const onSkip = () => onSelect();

  function selectVillage(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedVillage(value);
  }
  function selectTaluk(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTaluk(value);
  }
  function selectDistrict(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedDistrict(value);
  }
  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }

  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, { setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
        <header className="tittle">Informent Address </header>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_HOUSE_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_LOCALITY_EN")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_LOCALITY_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_CITY_EN")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_CITY_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_VILLAGE")}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbVillage} selected={setVillage} select={selectVillage} disabled={isEdit} />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_LB_NAME")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setPlaceofActivity}
              select={selectPlaceofactivity}
              disabled={isEdit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_TALUK")}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={setTaluk} select={selectTaluk} disabled={isEdit} />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_DISTRICT")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbDistrict}
              selected={setDistrict}
              select={selectDistrict}
              disabled={isEdit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_POST_OFFICE")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setPlaceofActivity}
              select={selectPlaceofactivity}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_PIN_CODE")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default InformentAddress;
