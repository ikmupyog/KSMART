import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const FamilyInformationBirth = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");

  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const [setTitle, setSelectedTitle] = useState(formData?.FamilyInformationDeath?.setTitle);
  const [setTitleB, setSelectedTitleB] = useState(formData?.FamilyInformationDeath?.setTitleB);
  const [FatherOrHusbandNameEN, setFatherOrHusbandNameEN] = useState(formData?.FamilyInformationDeath?.FatherOrHusbandNameEN);
  const [FatherOrHusbandNameMl, setFatherOrHusbandNameMl] = useState(formData?.FamilyInformationDeath?.FatherOrHusbandNameMl);
  const [MotherNameEn, setMotherNameEn] = useState(formData?.FamilyInformationDeath?.MotherNameEn);
  const [MotherNameMl, setMotherNameMl] = useState(formData?.FamilyInformationDeath?.MotherNameMl);
  const [FatherOrHusbandAdharNo, setFatherOrHusbandAdharNo] = useState(formData?.FamilyInformationDeath?.FatherOrHusbandAdharNo);
  const [MotherAdharNo, setMotherAdharNo] = useState(formData?.MotherAdharNo?.MotherAdharNo);

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [TradeName, setTradeName] = useState(null);
  // const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  // let cmbPlace = [];
  // place &&
  //   place["TradeLicense"] &&
  //   place["TradeLicense"].PlaceOfActivity.map((ob) => {
  //     cmbPlace.push(ob);
  //   });
  let cmbTitle = [];
  title &&
    title["common-masters"] &&
    title["common-masters"].Title.map((ob) => {
      cmbTitle.push(ob);
    });

  const onSkip = () => onSelect();

  // function selectPlaceofactivity(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedPlaceofActivity(value);
  // }
  function selectTitle(value) {
    setSelectedTitle(value);
  }
  function selectTitleB(value) {
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
  // function setSelectTradeName(e) {
  //   setTradeName(e.target.value);
  // }
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }

  const goNext = () => {
    sessionStorage.setItem("setTitle", setTitle?setTitle.code:null);
    sessionStorage.setItem("setTitleB", setTitleB?setTitleB.code:null);
    sessionStorage.setItem("FatherOrHusbandNameEN", FatherOrHusbandNameEN);
    sessionStorage.setItem("FatherOrHusbandNameMl", FatherOrHusbandNameMl);
    sessionStorage.setItem("MotherNameEn", MotherNameEn);
    sessionStorage.setItem("MotherNameMl", MotherNameMl);
    sessionStorage.setItem("FatherOrHusbandAdharNo", FatherOrHusbandAdharNo);
    sessionStorage.setItem("MotherAdharNo", MotherAdharNo);

    onSelect(config.key, {
      setTitle,
      setTitleB,
      FatherOrHusbandNameEN,
      FatherOrHusbandNameMl,
      MotherNameEn,
      MotherAdharNo,
      FatherOrHusbandAdharNo,
      MotherNameMl,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_FATHER_OR_HUSBAND")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitle} select={selectTitle} disabled={isEdit} placeholder={`${t("CR_TITLE_NAME_EN")}`} />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_EN")}`} <span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={TextTrackCue}
              type={"text"}
              optionKey="i18nKey"
              name="FatherOrHusbandNameEN"
              value={FatherOrHusbandNameEN}
              onChange={setSelectFatherOrHusbandNameEN}
              disable={isEdit}
              placeholder={`${t("CR_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_ML")}`} <span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
              type={"text"}
              optionKey="i18nKey"
              name="FatherOrHusbandNameMl"
              value={FatherOrHusbandNameMl}
              onChange={setSelectFatherOrHusbandNameMl}
              disable={isEdit}
              placeholder={`${t("CR_NAME_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_ML") })}
            />
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <div className="col-md-4">
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
              placeholder={`${t("CS_COMMON_AADHAAR")}`}
              {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false,title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DETAILS_OF_MOTHER")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitleB} select={selectTitleB} disabled={isEdit} placeholder={`${t("CR_TITLE_NAME_EN")}`}/>
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
              type={"text"}
              optionKey="i18nKey"
              name="MotherNameEn"
              value={MotherNameEn}
              onChange={setSelectMotherNameEn}
              disable={isEdit}
              placeholder={`${t("CR_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={true}
              type={"text"}
              optionKey="i18nKey"
              name="MotherNameMl"
              value={MotherNameMl}
              onChange={setSelectMotherNameMl}
              disable={isEdit}
              placeholder={`${t("CR_NAME_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_ML") })}
            />
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <div className="col-md-4">
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
              placeholder={`${t("CS_COMMON_AADHAAR")}`}
              {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default FamilyInformationBirth;
