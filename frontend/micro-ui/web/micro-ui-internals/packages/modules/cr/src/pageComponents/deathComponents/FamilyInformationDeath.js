import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const FamilyInformationBirth = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");

  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const [setTitle, setSelectedTitle] = useState(formData?.DeathDetails?.setTitle);
  const [setTitleB, setSelectedTitleB] = useState(formData?.DeathDetails?.setTitle);
  const [FatherOrHusbandNameEN, setFatherOrHusbandNameEN] = useState(null);
  const [FatherOrHusbandNameMl, setFatherOrHusbandNameMl] = useState(null);
  const [MotherNameEn, setMotherNameEn] = useState(null);
  // const [FirstNameB, setFirstNameB] = useState(null);
  const [MotherNameMl, setMotherNameMl] = useState(null);
  // const [MLFirstName, setMLFirstName] = useState(null);
  const [FatherOrHusbandAdharNo, setFatherOrHusbandAdharNo] = useState(null);
  const [MotherAdharNo, setMotherAdharNo] = useState(null);


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
  let cmbTitle = [];
  title &&
    title["common-masters"] &&
    title["common-masters"].Title.map((ob) => {
      cmbTitle.push(ob);
    });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }
  function selectTitle(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTitle(value);
  }
  function selectTitleB(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTitleB(value);
  }
  function setSelectFatherOrHusbandNameEN(e) {
    setFatherOrHusbandNameEN(e.target.value);
  }
  function setSelectFatherOrHusbandNameMl(e) {
    setFatherOrHusbandNameMl(e.target.value);
  }
  function setSelectMotherNameEn(e) {
    setMotherNameEn(e.target.value);
  }
  function setSelectMotherNameMl(e) {
    setMotherNameMl(e.target.value);
  }
  function setSelectFatherOrHusbandAdharNo(e) {
    setFatherOrHusbandAdharNo(e.target.value);
  }
  function setSelectMotherAdharNo(e) {
    setMotherAdharNo(e.target.value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, { setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <header className="tittle">Family Details </header>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_FATHER_OR_HUSBAND")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{`${t("CR_TITLE_EN")}`}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitle} select={selectTitle} disabled={isEdit} />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="FatherOrHusbandNameEN"
              value={FatherOrHusbandNameEN}
              onChange={setSelectFatherOrHusbandNameEN}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_ML")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="FatherOrHusbandNameMl"
              value={FatherOrHusbandNameMl}
              onChange={setSelectFatherOrHusbandNameMl}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="FatherOrHusbandAdharNo"
              value={FatherOrHusbandAdharNo}
              onChange={setSelectFatherOrHusbandAdharNo}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_MOTHER")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{`${t("CR_TITLE_EN")}`}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitleB} select={selectTitleB} disabled={isEdit} />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MotherNameEn"
              value={MotherNameEn}
              onChange={setSelectMotherNameEn}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_ML")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MotherNameMl"
              value={MotherNameMl}
              onChange={setSelectMotherNameMl}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MotherAdharNo"
              value={MotherAdharNo}
              onChange={setSelectMotherAdharNo}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default FamilyInformationBirth;
