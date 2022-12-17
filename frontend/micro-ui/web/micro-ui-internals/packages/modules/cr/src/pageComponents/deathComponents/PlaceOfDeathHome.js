import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathHome = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "mtaluk");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");

  const [setVillage, setSelectedVillage] = useState(formData?.PlaceOfDeathHome?.setVillage);
  const [setLbName, setSelectedLbName] = useState(formData?.PlaceOfDeathHome?.setVillage);
  const [setPostOffice, setSelectedPostOffice] = useState(formData?.PlaceOfDeathHome?.setPostOffice);
  const [PinCode, setSelectedPinCode] = useState(formData?.PlaceOfDeathHome?.HouseNo);
  const [setTaluk, setSelectedTaluk] = useState(formData?.PlaceOfDeathHome?.setTaluk);
  const [setDistrict, setSelectedDistrict] = useState(formData?.PlaceOfDeathHome?.setDistrict);
  const [BuildingNo, setSelectedBuildingNo] = useState(formData?.PlaceOfDeathHome?.BuildingNo);
  const [HouseNo, setSelectedHouseNo] = useState(formData?.PlaceOfDeathHome?.HouseNo);
  const [Locality, setLocality] = useState(formData?.PlaceOfDeathHome?.Locality);
  const [LocalityML, setLocalityML] = useState(formData?.PlaceOfDeathHome?.LocalityML);
  const [CityEn, setCityEn] = useState(formData?.PlaceOfDeathHome?.CityEn);
  const [CityMl, setCityMl] = useState(formData?.PlaceOfDeathHome?.CityMl);

  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  let cmbVillage = [];
  let cmbTaluk = [];
  let cmbDistrict = [];

  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
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
    setSelectedBuildingNo(e.target.value);
  }
  function setSelectHouseNo(e) {
    setSelectedHouseNo(e.target.value);
  }
  function setSelectPinCode(e) {
    setSelectedPinCode(e.target.value);
  }
  function setSelectLocality(e) {
    setLocality(e.target.value);
  }
  function setSelectLocalityML(e) {
    setLocalityML(e.target.value);
  }
  function setSelectCityEn(e) {
    setCityEn(e.target.value);
  }
  function setSelectCityMl(e) {
    setCityMl(e.target.value);
  }
  function selectVillage(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedVillage(value);
  }
  function selectPostOffice(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPostOffice(value);
  }

  function selectLbName(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedLbName(value);
  }
  function selectTaluk(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTaluk(value);
  }
  function selectDistrict(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }

  function selectDistrict(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedDistrict(value);
  }

  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }
  function selectPlaceofactivity(value) {
    setSelectedPlaceofActivity(value);
  }

  const goNext = () => {
    sessionStorage.setItem("setVillage", setVillage.code);
    sessionStorage.setItem("setLbName", setLbName.code);
    sessionStorage.setItem("setPostOffice", setPostOffice.code);
    sessionStorage.setItem("PinCode", PinCode);
    sessionStorage.setItem("setTaluk", setTaluk.code);
    sessionStorage.setItem("setDistrict", setDistrict.code);
    sessionStorage.setItem("BuildingNo", BuildingNo.code);
    sessionStorage.setItem("HouseNo", HouseNo.code);
    sessionStorage.setItem("Locality", Locality.code);
    sessionStorage.setItem("LocalityML", LocalityML.code);
    sessionStorage.setItem("CityEn", CityEn.code);
    sessionStorage.setItem("CityMl", CityMl.code);

    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, {
      setVillage,
      setLbName,
      setPostOffice,
      PinCode,
      setTaluk,
      setDistrict,
      BuildingNo,
      HouseNo,
      Locality,
      LocalityML,
      CityEn,
      CityMl,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <header className="tittle">Place Of Death Home </header>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Place Of Death Home")}`}</span>
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
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", title: t("TL_INVALID_TRADE_NAME") })}
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
              name="LocalityML"
              value={LocalityML}
              onChange={setSelectLocalityML}
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
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "number", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathHome;
