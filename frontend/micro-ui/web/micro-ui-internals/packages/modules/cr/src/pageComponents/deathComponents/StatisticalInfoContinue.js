import React, { useState } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  BackButton,
  DatePicker,
  TextArea,
  NewRadioButton,
  RadioButtons,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInfoContinue = ({ config, onSelect, userType, formData }) => {
  const RadioButton = ({ selected, handleChange }) => {
    return (
      <div className="statistical-radio">
        <div>
          <input
            type="radio"
            id="yes"
            // name="answer"
            value="1"
            checked={selected === "1"}
            onChange={handleChange}
          />
          <label htmlFor="yes">{t("CR_YES")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            // name="answer"
            value="0"
            checked={selected === "0"}
            onChange={handleChange}
          />
          <label htmlFor="no">{t("CR_NO")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="prob"
            // name="answer"
            value="prob"
            checked={selected === "prob"}
            onChange={handleChange}
          />
          <label htmlFor="prob">{t("CR_PROBABILY")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="unknown"
            // name="answer"
            value="unknown"
            checked={selected === "unknown"}
            onChange={handleChange}
          />
          <label htmlFor="unknown">{t("CR_UNKNOWN")}</label>
        </div>
      </div>
    );
  };
  const RadioButtons = ({ selected, handleChange }) => {
    return (
      <div className="statistical-radiop">
        <div>
          <input
            type="radio"
            id="yes"
            // name="answer"
            value="1"
            checked={selected === "1"}
            onChange={handleChange}
          />
          <label htmlFor="yes">{t("CR_YES")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            // name="answer"
            value="0"
            checked={selected === "0"}
            onChange={handleChange}
          />
          <label htmlFor="no">{t("CR_NO")}</label>
        </div>
      </div>
    );
  };

  console.log(formData);
  const [visible, setVisible] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const menu = [
    { i18nKey: "YES", code: "YES" },
    { i18nKey: "NO", code: "NO" },
  ];
  const options = [
    { i18nKey: "yes", code: "Yes" },
    { i18nKey: "no", code: "No" },
  ];

  const menub = [
    { i18nKey: "YES", code: "YES" },
    { i18nKey: "NO", code: "NO" },
  ];
  const smoke = [
    { i18nKey: "YES", code: "YESSMOKE" },
    { i18nKey: "NO", code: "NOSMOKE" },
  ];
  const tab = [
    { i18nKey: "YES", code: "YESSMOKE" },
    { i18nKey: "NO", code: "NOSMOKE" },
  ];
  const pan = [
    { i18nKey: "YES", code: "YESSMOKE" },
    { i18nKey: "NO", code: "NOSMOKE" },
  ];
  const alcohol = [
    { i18nKey: "YES", code: "YESSMOKE" },
    { i18nKey: "NO", code: "NOSMOKE" },
  ];

  const [isSmoke, setisSmoke] = useState(formData?.StatisticalInfoContinue?.isSmoke ? formData?.StatisticalInfoContinue?.isSmoke : 0);
  const handleRadioChangeSmoke = (e) => {
    selectisSmoke(e.target.value);
  };
  const [isTabacco, setisTabacco] = useState(formData?.StatisticalInfoContinue?.isTabacco ? formData?.StatisticalInfoContinue?.isTabacco : 0);
  const handleRadioChangeTabacco = (e) => {
    setisTabacco(e.target.value);
  };
  const [isPanMasala, setisPanMasala] = useState(formData?.StatisticalInfoContinue?.isPanMasala ? formData?.StatisticalInfoContinue?.isPanMasala : 0);
  const handleRadioChangePanmasala = (e) => {
    selectisPanMasala(e.target.value);
  };
  const [isalcohol, setisalcohol] = useState(formData?.StatisticalInfoContinue?.isalcohol ? formData?.StatisticalInfoContinue?.isalcohol : 0);
  const handleRadioChange = (e) => {
    selectisalcohol(e.target.value);
  };
  const [isPregnent, setisPregnent] = useState(formData?.StatisticalInfoContinue?.isPregnent ? formData?.StatisticalInfoContinue?.isPregnent : 0);
  const handleRadioChangeB = (e) => {
    selectisPregnent(e.target.value);
  };
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: attention = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MedicalAttentionType");
  const { data: deathmain = {}, isLoadingA } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCause");
  // const { data: deathsub = {}, isLoadingB } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");
  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const [setMedicalAttentionDeath, setSelectedMedicalAttentionDeath] = useState(formData?.StatisticalInfoContinue?.setMedicalAttentionDeath);
  const [setDeathMedicallyCertified, setSelectedDeathMedicallyCertified] = useState(formData?.StatisticalInfoContinue?.setDeathMedicallyCertified);
  const [setCauseOfDeathMain, setSelectedCauseOfDeathMain] = useState(formData?.StatisticalInfoContinue?.setCauseOfDeathMain);
  const [setCauseOfDeathSub, setSelectedCauseOfDeathSub] = useState(formData?.StatisticalInfoContinue?.setCauseOfDeathSub);
  // const [setFemaleDeathPregnant, setSelectedFemaleDeathPregnant] = useState(formData?.StatisticalInfoContinue?.setFemaleDeathPregnant);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [CauseOfDeath, setSelectedCauseOfDeath] = useState(formData?.StatisticalInfoContinue?.CauseOfDeath);
  // const [alcoholyears, setSelectedalcoholyears] = useState(formData?.StatisticalInfoContinue?.alcoholyears);
  const [answer, setAnswer] = useState("");
  const [text, setText] = useState(formData?.StatisticalInfoContinue?.text ? formData?.StatisticalInfoContinue?.text : "");
  const [textPregnant, setTextPregnant] = useState(
    formData?.StatisticalInfoContinue?.textPregnant ? formData?.StatisticalInfoContinue?.textPregnant : ""
  );
  const [textSmoke, setTextSmoke] = useState(formData?.StatisticalInfoContinue?.textSmoke ? formData?.StatisticalInfoContinue?.textSmoke : "");
  const [textTabacco, setTextTabacco] = useState(
    formData?.StatisticalInfoContinue?.textTabacco ? formData?.StatisticalInfoContinue?.textTabacco : ""
  );
  const [textPanMasala, setTextPanMasala] = useState(
    formData?.StatisticalInfoContinue?.textPanMasala ? formData?.StatisticalInfoContinue?.textPanMasala : ""
  );

  let naturetypecmbvalue = null;
  let cmbAttention = [];
  attention &&
    attention["birth-death-service"] &&
    attention["birth-death-service"].MedicalAttentionType.map((ob) => {
      cmbAttention.push(ob);
    });
  let cmbDeathmain = [];
  deathmain &&
    deathmain["birth-death-service"] &&
    deathmain["birth-death-service"].DeathCause.map((ob) => {
      cmbDeathmain.push(ob);
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
  // function selectPlaceofactivity(value) {
  //   setSelectedPlaceofActivity(value);
  // }
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
  // function selectFemaleDeathPregnant(value) {
  //   setSelectedFemaleDeathPregnant(value);
  // }
  function setSelectCauseOfDeath(e) {
    setSelectedCauseOfDeath(e.target.value);
  }
  // function setSelectalcoholyears(e) {
  //   setSelectedalcoholyears(e.target.value);
  // }
  // const [optionkey, setOptionkey] = useState("");
  // console.log(optionkey);

  const goNext = () => {
    sessionStorage.setItem("setMedicalAttentionDeath", setMedicalAttentionDeath ? setMedicalAttentionDeath.code : null);
    sessionStorage.setItem("setDeathMedicallyCertified", setDeathMedicallyCertified ? setDeathMedicallyCertified.code : null);
    sessionStorage.setItem("setCauseOfDeathMain", setCauseOfDeathMain ? setCauseOfDeathMain.code : null);
    sessionStorage.setItem("setCauseOfDeathSub", setCauseOfDeathSub ? setCauseOfDeathSub.code : null);
    sessionStorage.setItem("setCauseOfDeath", CauseOfDeath);
    // sessionStorage.setItem("setalcoholyears", alcoholyears);
    // sessionStorage.setItem("setFemaleDeathPregnant", setFemaleDeathPregnant?setFemaleDeathPregnant.code:null);
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity ? setPlaceofActivity.code : null);
    sessionStorage.setItem("isSmoke", isSmoke);
    sessionStorage.setItem("isPanMasala", isPanMasala);
    sessionStorage.setItem("isalcohol", isalcohol);
    sessionStorage.setItem("isPregnent", isPregnent);
    sessionStorage.setItem("isTabacco", isTabacco);
    sessionStorage.setItem("textTabacco", textTabacco ? textTabacco : null);
    sessionStorage.setItem("text", text ? text : null);
    sessionStorage.setItem("textPregnant", textPregnant ? textPregnant : null);
    sessionStorage.setItem("textSmoke", textSmoke ? textSmoke : null);
    sessionStorage.setItem("textPanMasala", textPanMasala ? textPanMasala : null);

    onSelect(config.key, {
      setMedicalAttentionDeath,
      setDeathMedicallyCertified,
      setCauseOfDeathMain,
      setCauseOfDeathSub,
      CauseOfDeath,
      textTabacco,
      text,
      textPregnant,
      textPanMasala,
      textSmoke,
      // setFemaleDeathPregnant,
      // setPlaceofActivity,
      isSmoke,
      isPanMasala,
      isalcohol,
      isPregnent,
      isTabacco,
    });
  };
  console.log(formData);
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_MEDICAL_ATTENTION_DEATH")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbAttention}
                selected={setMedicalAttentionDeath}
                select={selectMedicalAttentionDeath}
                disabled={isEdit}
                placeholder={`${t("CR_MEDICAL_ATTENTION_DEATH")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menub}
                selected={setDeathMedicallyCertified}
                select={selectDeathMedicallyCertified}
                disabled={isEdit}
                placeholder={`${t(" ")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN_PART")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbDeathmain}
                selected={setCauseOfDeathMain}
                select={selectCauseOfDeathMain}
                disabled={isEdit}
                placeholder={`${t(" ")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_PART")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbDeathmain}
                selected={setCauseOfDeathSub}
                select={selectCauseOfDeathSub}
                disabled={isEdit}
                placeholder={`${t(" ")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          
            {/* <div className="col-md-6">
              <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_OTHER_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                // optionKey="i18nKey"
                name="CauseOfDeath"
                value={CauseOfDeath}
                onChange={setSelectCauseOfDeath}
                disable={isEdit}
                placeholder={`${t(" ")}`}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
              />
            </div> */}
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_FEMALE_DEATH_PREGNANT")}</CardLabel>
              {/* <div className="col-md-6 "> */}
              <RadioButtons
                t={t}
                optionsKey="i18nKey"
                // onChange={setOptionkey}
                option={options}
                isMandatory={config.isMandatory}
                selected={isPregnent}
                onSelect={selectisPregnent}
                handleChange={handleRadioChangeB}
              />
              {/* </div> */}
            </div>
            
            <div>
              {/* <RadioButtons
                t={t}
                optionsKey="i18nKey"
                isMandatory={config.isMandatory}
                options={menu}
                selectedOption={isPregnent}
                onSelect={selectisPregnent}

              /> */}
            </div>         
            </div>
        </div>
      <div className="row">
      <div className="col-md-12">
         <div className="col-md-12">
              <CardLabel>{t("CR_HABITS")}</CardLabel>              
        </div>
      </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_SMOKE")}</CardLabel>
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                isMandatory={config.isMandatory}
                selected={isSmoke}
                onSelect={selectisSmoke}
                handleChange={handleRadioChangeSmoke}
              />
              {isSmoke === "1" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
                  {/* <TextInput type="text" id="text" value={textSmoke} onChange={(e) => setTextSmoke(e.target.value)} /> */}
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    // optionKey="i18nKey"
                    name="textSmoke"
                    value={textSmoke}
                    onChange={(e) => setTextSmoke(e.target.value)}
                    disable={isEdit}
                    placeholder={`${t("CR_YEAR")}`}
                    {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CR_INVALID_YEAR") })}
                  />
                </div>
              )}
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_CHEW_TOBACCO")}</CardLabel>
              {/* <div className="statistical-flex"> */}
                <RadioButton
                  t={t}
                  // optionsKey="i18nKey"
                  // onChange={setOptionkey}
                  isMandatory={config.isMandatory}
                  selected={isTabacco}
                  onSelect={selectisTabacco}
                  handleChange={handleRadioChangeTabacco}
                />
                {isTabacco === "1" && (
                  <div className="col-md-3">
                    <CardLabel>{t("CR_YEAR")}</CardLabel>
                    {/* <TextInput type="text" id="text" value={textTabacco} onChange={(e) => setTextTabacco(e.target.value)} /> */}
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"number"}
                      // optionKey="i18nKey"
                      name="textTabacco"
                      value={textTabacco}
                      onChange={(e) => setTextTabacco(e.target.value)}
                      disable={isEdit}
                      placeholder={`${t("CR_YEAR")}`}
                      {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CR_INVALID_YEAR") })}
                    />
                  </div>
                )}
              {/* </div> */}
            </div>           
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
        <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_CHEW_ARECANUT_PAN_MASALA")}</CardLabel>
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                isMandatory={config.isMandatory}
                selected={isPanMasala}
                onSelect={selectisPanMasala}
                handleChange={handleRadioChangePanmasala}
              />
              {isPanMasala === "1" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
                  {/* <TextInput type="text" id="text" value={textPanMasala} onChange={(e) => setTextPanMasala(e.target.value)} /> */}
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    // optionKey="i18nKey"
                    name="textPanMasala"
                    value={textPanMasala}
                    onChange={(e) => setTextPanMasala(e.target.value)}
                    disable={isEdit}
                    placeholder={`${t("CR_YEAR")}`}
                    {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CR_INVALID_YEAR") })}
                  />
               </div>
              )}           
        </div>
        <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_DRINK_ALCOHOL")}</CardLabel>
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                isMandatory={config.isMandatory}
                selected={isalcohol}
                onSelect={selectisalcohol}
                handleChange={handleRadioChange}
              />
              {isalcohol === "1" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
                  {/* <TextInput type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} /> */}
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    // optionKey="i18nKey"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disable={isEdit}
                    placeholder={`${t("CR_YEAR")}`}
                    {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CR_INVALID_YEAR") })}
                  />
                </div>
              )}               
        </div>
      </div>
    </div>        
        
      </FormStep>
    </React.Fragment>
  );
};

export default StatisticalInfoContinue;
