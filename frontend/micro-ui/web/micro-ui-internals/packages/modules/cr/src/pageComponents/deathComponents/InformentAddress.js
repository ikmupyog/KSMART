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
  const [setVillage, setSelectedVillage] = useState(formData?.InformentAddress?.setVillage);
  const [setTaluk, setSelectedTaluk] = useState(formData?.InformentAddress?.setTaluk);
  const [setDistrict, setSelectedDistrict] = useState(formData?.InformentAddress?.setDistrict);
  const [BuildingNo, setBuildingNo] = useState(formData?.InformentAddress?.BuildingNo);
  const [HouseNo, setHouseNo] = useState(formData?.InformentAddress?.HouseNo);
  const [Locality, setLocality] = useState(formData?.InformentAddress?.Locality);
  const [LocalityMl, setLocalityMl] = useState(formData?.InformentAddress?.LocalityMl);
  const [CityEn, setCityEn] = useState(formData?.InformentAddress?.CityEn);
  const [CityMl, setCityMl] = useState(formData?.InformentAddress?.CityMl);
  const [PinCode, setPinCode] = useState(formData?.InformentAddress?.PinCode);
  const [setPostOffice, setSelectedPostOffice] = useState(formData?.InformentAddress?.setPostOffice);
  const [setLbName, setSelectedLbName] = useState(formData?.InformentAddress?.setLbName);

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
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
  function setSelectBuildingNo(e) {
    setBuildingNo(e.target.value);
  }
  function setSelectHouseNo(e) {
    setHouseNo(e.target.value);
  }
  function setSelectLocality(e) {
    setLocality(e.target.value);
  }
  function setSelectLocalityMl(e) {
    setLocalityMl(e.target.value);
  }
  function setSelectCityEn(e) {
    setCityEn(e.target.value);
  }
  function setSelectCityMl(e) {
    setCityMl(e.target.value);
  }
  function setSelectPinCode(e) {
    setPinCode(e.target.value);
  }

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
  function selectPostOffice(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPostOffice(value);
  }
  function selectLbName(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedLbName(value);
  }

  const goNext = () => {
    sessionStorage.setItem("setVillage", setVillage.code);
    sessionStorage.setItem("setTaluk", setTaluk.code);
    sessionStorage.setItem("setDistrict", setDistrict.code);
    sessionStorage.setItem("BuildingNo", BuildingNo);
    sessionStorage.setItem("HouseNo", HouseNo);
    sessionStorage.setItem("Locality", Locality);
    sessionStorage.setItem("LocalityMl", LocalityMl);
    sessionStorage.setItem("CityEn", CityEn);
    sessionStorage.setItem("CityMl", CityMl);
    sessionStorage.setItem("PinCode", PinCode);
    sessionStorage.setItem("setPostOffice", setPostOffice.code);
    sessionStorage.setItem("setLbName", setLbName).code;

    onSelect(config.key, {
      setVillage,
      setTaluk,
      setDistrict,
      BuildingNo,
      HouseNo,
      Locality,
      LocalityMl,
      CityEn,
      CityMl,
      PinCode,
      setPostOffice,
      setLbName,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
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
              type={"number"}
              optionKey="i18nKey"
              name="BuildingNo"
              value={BuildingNo}
              onChange={setSelectBuildingNo}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_HOUSE_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="HouseNo"
              value={HouseNo}
              onChange={setSelectHouseNo}
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
              name="Locality"
              value={Locality}
              onChange={setSelectLocality}
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
              name="LocalityMl"
              value={LocalityMl}
              onChange={setSelectLocalityMl}
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
              name="CityEn"
              value={CityEn}
              onChange={setSelectCityEn}
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
              name="CityMl"
              value={CityMl}
              onChange={setSelectCityMl}
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
            <Dropdown t={t} optionKey="code" isMandatory={false} option={cmbPlace} selected={setLbName} select={selectLbName} disabled={isEdit} />
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
              selected={setPostOffice}
              select={selectPostOffice}
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
              name="PinCode"
              value={PinCode}
              onChange={setSelectPinCode}
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
