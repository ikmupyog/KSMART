import React, { useState } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  TextArea,
  NewRadioButton,
  RadioButtons,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInfoContonue = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const menu = [
    { i18nKey: "YES", code: "YESSMOKE" },
    { i18nKey: "NO", code: "NOSMOKE" },
  ];
  const tab = [
    { i18nKey: "YES", code: "YESSMOKE" },
    { i18nKey: "NO", code: "NOSMOKE" },
  ];
  const [isSmoke, setisSmoke] = useState(formData?.StatisticalInfoContinue?.isSmoke);
  const [isTabacco, setisTabacco] = useState(formData?.StatisticalInfoContinue?.isTabacco);
  const [isPanMasala, setisPanMasala] = useState(formData?.StatisticalInfoContinue?.isPanMasala);
  const [isalcohol, setisalcohol] = useState(formData?.StatisticalInfoContinue?.isalcohol);
  const [isPregnent, setisPregnent] = useState(formData?.StatisticalInfoContinue?.isPregnent);
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const [setMedicalAttentionDeath, setSelectedMedicalAttentionDeath] = useState(formData?.StatisticalInfoContinue?.setMedicalAttentionDeath);
  const [setDeathMedicallyCertified, setSelectedDeathMedicallyCertified] = useState(formData?.StatisticalInfoContinue?.setDeathMedicallyCertified);
  const [setCauseOfDeathMain, setSelectedCauseOfDeathMain] = useState(formData?.StatisticalInfoContinue?.setCauseOfDeathMain);
  const [setCauseOfDeathSub, setSelectedCauseOfDeathSub] = useState(formData?.StatisticalInfoContinue?.setCauseOfDeathSub);
  const [setFemaleDeathPregnant, setSelectedFemaleDeathPregnant] = useState(formData?.StatisticalInfoContinue?.setFemaleDeathPregnant);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CauseOfDeath, setCauseOfDeath] = useState(formData?.StatisticalInfoContinue?.CauseOfDeath);

  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });

  const onSkip = () => onSelect();
  function selectisSmoke(value) {
    setisSmoke(value);
  }
  function selectisTabacco(value) {
    setisTabacco(value);
  }
  function selectisalcohol(value) {
    setisalcohol(value);
  }
  function selectisPregnent(value) {
    setisPregnent(value);
  }
  function selectisPanMasala(value) {
    setisPanMasala(value);
  }
  function selectPlaceofactivity(value) {
    setSelectedPlaceofActivity(value);
  }
  function selectMedicalAttentionDeath(value) {
    setSelectedMedicalAttentionDeath(value);
  }
  function selectDeathMedicallyCertified(value) {
    setSelectedDeathMedicallyCertified(value);
  }
  function selectCauseOfDeathMain(value) {
    setSelectedCauseOfDeathMain(value);
  }
  function selectCauseOfDeathSub(value) {
    setSelectedCauseOfDeathSub(value);
  }
  function selectFemaleDeathPregnant(value) {
    setSelectedFemaleDeathPregnant(value);
  }
  function setSelectCauseOfDeath(e) {
    setCauseOfDeath(e.target.value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    sessionStorage.setItem("setMedicalAttentionDeath", setMedicalAttentionDeath.code);
    sessionStorage.setItem("setDeathMedicallyCertified", setDeathMedicallyCertified.code);
    sessionStorage.setItem("setCauseOfDeathMain", setCauseOfDeathMain.code);
    sessionStorage.setItem("setCauseOfDeathSub", setCauseOfDeathSub.code);
    sessionStorage.setItem("setCauseOfDeath", setCauseOfDeath);
    sessionStorage.setItem("setFemaleDeathPregnant", setFemaleDeathPregnant.code);
    sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    sessionStorage.setItem("isSmoke", isSmoke.i18nKey);
    sessionStorage.setItem("isPanMasala", isPanMasala.i18nKey);
    sessionStorage.setItem("isalcohol", isalcohol.i18nKey);
    sessionStorage.setItem("isPregnent", isPregnent.i18nKey);

    onSelect(config.key, {
      setMedicalAttentionDeath,
      setDeathMedicallyCertified,
      setCauseOfDeathMain,
      setCauseOfDeathSub,
      setCauseOfDeath,
      setFemaleDeathPregnant,
      setPlaceofActivity,
      isSmoke,
      isPanMasala,
      isalcohol,
      isPregnent,
    });
  };
  console.log(formData);
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
        <header className="tittle">Statistical Information(Continue)</header>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_MEDICAL_ATTENTION_DEATH")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setMedicalAttentionDeath}
              select={selectMedicalAttentionDeath}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setDeathMedicallyCertified}
              select={selectDeathMedicallyCertified}
              disabled={isEdit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN_PART")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setCauseOfDeathMain}
              select={selectCauseOfDeathMain}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_PART")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setCauseOfDeathSub}
              select={selectCauseOfDeathSub}
              disabled={isEdit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_OTHER_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="CauseOfDeath"
              value={CauseOfDeath}
              onChange={setSelectCauseOfDeath}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_FEMALE_DEATH_PREGNANT")}</CardLabel>
            <RadioButtons
              t={t}
              optionsKey="i18nKey"
              isMandatory={config.isMandatory}
              options={menu}
              selectedOption={isPregnent}
              onSelect={selectisPregnent}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_HABITUALLY_SMOKE")}</CardLabel>
            <RadioButtons
              t={t}
              optionsKey="i18nKey"
              isMandatory={config.isMandatory}
              options={menu}
              selectedOption={isSmoke}
              onSelect={selectisSmoke}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_HABITUALLY_CHEW_TOBACCO")}</CardLabel>
            <RadioButtons
              t={t}
              optionsKey="i18nKey"
              isMandatory={config.isMandatory}
              options={tab}
              selectedOption={isTabacco}
              onSelect={selectisTabacco}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_HABITUALLY_CHEW_ARECANUT_PAN_MASALA")}</CardLabel>
            <RadioButtons
              t={t}
              optionsKey="i18nKey"
              isMandatory={config.isMandatory}
              options={menu}
              selectedOption={isPanMasala}
              onSelect={selectisPanMasala}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_HABITUALLY_DRINK_ALCOHOL")}</CardLabel>
            <RadioButtons
              t={t}
              optionsKey="i18nKey"
              isMandatory={config.isMandatory}
              options={menu}
              selectedOption={isalcohol}
              onSelect={selectisalcohol}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default StatisticalInfoContonue;
