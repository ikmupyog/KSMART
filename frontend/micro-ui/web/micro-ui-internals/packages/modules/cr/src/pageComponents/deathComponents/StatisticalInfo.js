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

const StatisticalInfo = ({ config, onSelect, userType, formData }) => {
  const RadioButton = ({ selected, handleChange }) => {
    return (
      <div className="statistical-radio">
        <div>
          <input
            type="radio"
            id="yes"
            // name="answer"
            value="yes"
            checked={selected === "yes"}
            onChange={handleChange}
          />
          <label htmlFor="yes">{t("CR_YES")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            // name="answer"
            value="no"
            checked={selected === "no"}
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
            value="yes"
            // checked={selected === "1"}
            onChange={handleChange}
          />
          <label htmlFor="yes">{t("CR_YES")}</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            // name="answer"
            value="no"
            // checked={selected === "0"}
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
  const options = [
    { i18nKey: "yes", code: "Yes" },
    { i18nKey: "no", code: "No" },
  ];

  const menub = [
    { i18nKey: "YES", code: "YES" },
    { i18nKey: "NO", code: "NO" },
  ];

  // const handleRadioChangeTabacco = (e) => {
  //   setisTabacco(e.target.value);
  // };
  const [isPanMasala, setisPanMasala] = useState(formData?.StatisticalInfoContinue?.isPanMasala ? formData?.StatisticalInfoContinue?.isPanMasala : 0);
  const handleRadioChangePanmasala = (e) => {
    selectisPanMasala(e.target.value);
  };
  // const handleRadioChange = (e) => {
  //   selectisalcohol(e.target.value);
  // };

  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: attention = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MedicalAttentionType");
  const { data: deathmain = {}, isLoadingA } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCause");
  const { data: deathsub = {}, isLoadingsub } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");

  // const { data: deathsub = {}, isLoadingB } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");
  const [MedicalAttentionType, setMedicalAttentionType] = useState(
    formData?.StatisticalInfo?.MedicalAttentionType ? formData?.StatisticalInfo?.MedicalAttentionType : null
  );
  const [IsAutopsyPerformed, setIsAutopsyPerformed] = useState(
    formData?.StatisticalInfo?.IsAutopsyPerformed ? formData?.StatisticalInfo?.IsAutopsyPerformed : null
  );
  const handleRadioChangeAutopsy = (e) => {
    selectIsAutopsyPerformed(e.target.value);
  };
  const [IsAutopsyCompleted, setIsIsAutopsyCompleted] = useState(
    formData?.StatisticalInfo?.IsAutopsyCompleted ? formData?.StatisticalInfo?.IsAutopsyCompleted : null
  );
  const handleRadioChangeAutopsyCompleted = (e) => {
    selectIsAutopsyPerformed(e.target.value);
  };
  const [MannerOfDeath, setMannerOfDeath] = useState(formData?.StatisticalInfo?.MannerOfDeath ? formData?.StatisticalInfo?.MannerOfDeath : null);
  const [DeathMedicallyCertified, setDeathMedicallyCertified] = useState(
    formData?.StatisticalInfo?.DeathMedicallyCertified ? formData?.StatisticalInfo?.DeathMedicallyCertified : null
  );
  const [DeathCauseMain, setDeathCauseMain] = useState(formData?.StatisticalInfo?.DeathCauseMain ? formData?.StatisticalInfo?.DeathCauseMain : null);
  const [DeathCauseMainCustom, setDeathCauseMainCustom] = useState(
    formData?.StatisticalInfo?.DeathCauseMainCustom ? formData?.StatisticalInfo?.DeathCauseMainCustom : null
  );
  const [DeathCauseMainInterval, setDeathCauseMainInterval] = useState(
    formData?.StatisticalInfo?.DeathCauseMainInterval ? formData?.StatisticalInfo?.DeathCauseMainInterval : null
  );
  const [DeathCauseMainTimeUnit, setDeathCauseMainTimeUnit] = useState(
    formData?.StatisticalInfo?.DeathCauseMainTimeUnit ? formData?.StatisticalInfo?.DeathCauseMainTimeUnit : null
  );
  const [DeathCauseSub, setDeathCauseSub] = useState(formData?.StatisticalInfo?.DeathCauseSub ? formData?.StatisticalInfo?.DeathCauseSub : null);
  const [DeathCauseSubCustom, setDeathCauseSubCustom] = useState(
    formData?.StatisticalInfo?.DeathCauseSubCustom ? formData?.StatisticalInfo?.DeathCauseSubCustom : null
  );

  const [DeathCauseSubInterval, setDeathCauseSubInterval] = useState(
    formData?.StatisticalInfo?.DeathCauseSubInterval ? formData?.StatisticalInfo?.DeathCauseSubInterval : null
  );
  const [DeathCauseSubTimeUnit, setDeathCauseSubTimeUnit] = useState(
    formData?.StatisticalInfo?.DeathCauseSubTimeUnit ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit : null
  );
  const [DeathCauseSub2, setDeathCauseSub2] = useState(formData?.StatisticalInfo?.DeathCauseSub2 ? formData?.StatisticalInfo?.DeathCauseSub2 : null);
  const [DeathCauseSubCustom2, setDeathCauseSubCustom2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubCustom2 ? formData?.StatisticalInfo?.DeathCauseSubCustom2 : null
  );
  const [DeathCauseSubInterval2, setDeathCauseSubInterval2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubInterval2 ? formData?.StatisticalInfo?.DeathCauseSubInterval2 : null
  );
  const [DeathCauseSubTimeUnit2, setDeathCauseSubTimeUnit2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubTimeUnit2 ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit2 : null
  );

  const [DeathCauseOther, setDeathCauseOther] = useState(
    formData?.StatisticalInfo?.DeathCauseOther ? formData?.StatisticalInfo?.DeathCauseOther : null
  );
  const [IsdeceasedPregnant, setIsdeceasedPregnant] = useState(
    formData?.StatisticalInfo?.IsdeceasedPregnant ? formData?.StatisticalInfo?.IsdeceasedPregnant : null
  );
  const [IsDelivery, setIsDelivery] = useState(formData?.StatisticalInfo?.IsdeceasedPregnant ? formData?.StatisticalInfo?.IsdeceasedPregnant : null);
  const [DeathDuringDelivery, setIsDeathDuringDelivery] = useState(
    formData?.StatisticalInfo?.DeathDuringDelivery ? formData?.StatisticalInfo?.DeathDuringDelivery : null
  );
  const [AlcoholType, setAlcoholType] = useState(formData?.StatisticalInfo?.isalcohol ? formData?.StatisticalInfo?.isalcohol : null);

  const handleRadioChangeB = (e) => {
    selectIsdeceasedPregnant(e.target.value);
  };
  const [SmokingType, setSmokingType] = useState(formData?.StatisticalInfo?.SmokingType ? formData?.StatisticalInfo?.SmokingType : null);
  const [TobaccoType, setTobaccoType] = useState(formData?.StatisticalInfo?.isTabacco ? formData?.StatisticalInfo?.isTabacco : null);
  const [value, setValue] = useState();

  //////////////////////
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

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
  let cmbDeathsub = [];
  deathsub &&
    deathsub["birth-death-service"] &&
    deathsub["birth-death-service"].DeathCauseSub.map((ob) => {
      cmbDeathsub.push(ob);
    });

  const onSkip = () => onSelect();

  function selectMedicalAttentionDeath(value) {
    setMedicalAttentionType(value);
    setValue(value.code);
  }
  function selectIsAutopsyPerformed(value) {
    setIsAutopsyPerformed(value);
  }
  function selectIsIsAutopsyCompleted(value) {
    setIsIsAutopsyCompleted(value);
  }
  function selectMannerOfDeath(value) {
    setMannerOfDeath(value);
  }
  function selectDeathMedicallyCertified(value) {
    setDeathMedicallyCertified(value);
  }
  function selectDeathCauseMain(value) {
    setDeathCauseMain(value);
  }
  function selectDeathCauseMainCustom(value) {
    setDeathCauseMainCustom(value);
  }
  function selectDeathCauseMainInterval(e) {
    setDeathCauseMainInterval(e.target.value);
  }
  function selectDeathCauseMainTimeUnit(value) {
    setDeathCauseMainTimeUnit(value);
  }
  function selectDeathCauseSub(value) {
    setDeathCauseSub(value);
  }
  function selectDeathCauseSubCustom(value) {
    setDeathCauseSubCustom(value);
  }
  function selectDeathCauseSubInterval(e) {
    setDeathCauseSubInterval(e.target.value);
  }
  function selectDeathCauseSubTimeUnit(value) {
    setDeathCauseSubTimeUnit(value);
  }
  function selectDeathCauseSub2(value) {
    setDeathCauseSub2(value);
  }
  function selectDeathCauseSubCustom2(value) {
    setDeathCauseSubCustom2(value);
  }
  function selectDeathCauseSubInterval2(e) {
    setDeathCauseSubInterval2(e.target.value);
  }
  function selectDeathCauseSubTimeUnit2(value) {
    setDeathCauseSubTimeUnit2(value);
  }
  function selectDeathCauseOther(value) {
    setDeathCauseOther(value);
  }
  function selectIsdeceasedPregnant(value) {
    setIsdeceasedPregnant(value);
  }
  function selectIsDelivery(value) {
    setIsDelivery(value);
  }
  function selectDeathDuringDelivery(value) {
    setIsDeathDuringDelivery(value);
  }
  function selectSmokingType(value) {
    setSmokingType(value);
  }
  function selectTobaccoType(value) {
    setTobaccoType(value);
  }
  ///////////////////////

  function selectAlcoholType(value) {
    setAlcoholType(value);
  }

  function selectisPanMasala(value) {
    setisPanMasala(value);
  }
  // function selectPlaceofactivity(value) {
  //   setSelectedPlaceofActivity(value);
  // }

  // function selectCauseOfDeathMain(value) {
  //   setCauseOfDeathMain(value);
  // }

  // function selectFemaleDeathPregnant(value) {
  //   setSelectedFemaleDeathPregnant(value);
  // }
  // function setSelectCauseOfDeath) {
  //   setSelectedCauseOfDeath(e.target.value);
  // }
  // function setSelectalcoholyears(e) {
  //   setSelectedalcoholyears(e.target.value);
  // }
  // const [optionkey, setOptionkey] = useState("");
  // console.log(optionkey);

  const goNext = () => {
    sessionStorage.setItem("MedicalAttentionType", MedicalAttentionType ? MedicalAttentionType.code : null);

    onSelect(config.key, {
      MedicalAttentionType,
    });
  };
  console.log(formData);
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_MORE_INFO")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_MEDICAL_ATTENTION_DEATH")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbAttention}
                selected={MedicalAttentionType}
                select={selectMedicalAttentionDeath}
                disabled={isEdit}
                placeholder={`${t("CR_MEDICAL_ATTENTION_DEATH")}`}
              />
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_AUTOPSY_POSTMARTUM")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_AUTOPSY_PERFORM")}</CardLabel>
                  <RadioButtons
                    t={t}
                    // optionsKey="i18nKey"
                    // onChange={setOptionkey}
                    isMandatory={config.isMandatory}
                    selected={IsAutopsyPerformed}
                    onSelect={selectIsAutopsyPerformed}
                    handleChange={handleRadioChangeAutopsy}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("CR_WERE_AUTOPSY")}</CardLabel>
                  <RadioButtons
                    t={t}
                    // optionsKey="i18nKey"
                    // onChange={setOptionkey}
                    isMandatory={config.isMandatory}
                    selected={IsAutopsyCompleted}
                    onSelect={selectIsIsAutopsyCompleted}
                    handleChange={handleRadioChangeAutopsyCompleted}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MANNER_OF_DEATH")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_DEATH_OCCUR")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="code"
                    isMandatory={false}
                    option={menub}
                    selected={MannerOfDeath}
                    select={selectMannerOfDeath}
                    disabled={isEdit}
                    placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CAUSE_OF_DEATH")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menub}
                selected={DeathMedicallyCertified}
                select={selectDeathMedicallyCertified}
                disabled={isEdit}
                placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
              />
            </div>
          </div>
          {/*  INSTITUTION */}
          {value === "MEDICAL_ATTENTION_TYPE_INSTITUTION" && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_IMMEDIATE_CAUSE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathmain}
                      selected={DeathCauseMain}
                      select={selectDeathCauseMain}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathsub}
                      selected={DeathCauseMainCustom}
                      select={selectDeathCauseMainCustom}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}`}
                    />
                  </div>
                  {/* <div className="col-md-3">
              <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_OTHER")}</CardLabel>
              <TextInput
                // t={t}
                // isMandatory={false}
                // type={"text"}
                // // optionKey="i18nKey"
                // name="CauseOfDeath"
                // value={CauseOfDeath}
                // // onChange={setSelectCauseOfDeath}
                // disable={isEdit}
                // placeholder={`${t(" ")}`}
                // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
              />
            </div> */}
                  <div className="col-md-3">
                    <CardLabel>{t("CR_APROXIMATE")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      // optionKey="i18nKey"
                      name="DeathCauseMainInterval"
                      value={DeathCauseMainInterval}
                      onChange={selectDeathCauseMainInterval}
                      disable={isEdit}
                      placeholder={`${t(" ")}`}
                      // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_UNIT")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="code"
                      isMandatory={false}
                      option={menub}
                      selected={DeathCauseMainTimeUnit}
                      select={selectDeathCauseMainTimeUnit}
                      disabled={isEdit}
                      placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_UNDERLYING_CAUSE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathmain}
                      selected={DeathCauseSub}
                      select={selectDeathCauseSub}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN_PART")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathsub}
                      selected={DeathCauseSubCustom}
                      select={selectDeathCauseSubCustom}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_PART")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_APROXIMATE")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="DeathCauseSubInterval"
                      value={DeathCauseSubInterval}
                      onChange={selectDeathCauseSubInterval}
                      disable={isEdit}
                      // placeholder={`${t(" ")}`}
                      // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_UNIT")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="code"
                      isMandatory={false}
                      option={menub}
                      selected={DeathCauseSubTimeUnit}
                      select={selectDeathCauseSubTimeUnit}
                      disabled={isEdit}
                      placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathmain}
                      selected={DeathCauseSub2}
                      select={selectDeathCauseSub2}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN_PART")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbDeathsub}
                      selected={DeathCauseSubCustom2}
                      select={selectDeathCauseSubCustom2}
                      disabled={isEdit}
                      placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_PART")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_APROXIMATE")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="DeathCauseSubInterval2"
                      value={DeathCauseSubInterval2}
                      onChange={selectDeathCauseSubInterval2}
                      disable={isEdit}
                      placeholder={`${t(" ")}`}
                      // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_UNIT")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="code"
                      isMandatory={false}
                      option={menub}
                      selected={DeathCauseSubTimeUnit2}
                      select={selectDeathCauseSubTimeUnit2}
                      disabled={isEdit}
                      placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OTHER_SIGNIFICANT")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_DEATH_CAUASE_OTHER")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menub}
                selected={DeathCauseOther}
                select={selectDeathCauseOther}
                disabled={isEdit}
                placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED ")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_FEMALE_DEATH_PREGNANT")}</CardLabel>
              {/* <div className="col-md-6 "> */}
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menub}
                selected={IsdeceasedPregnant}
                onSelect={selectIsdeceasedPregnant}
                disabled={isEdit}
              />
            </div>
          </div>
        </div>
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
        <div className="row">
          <div className="col-md-12">
           
            <div className="col-md-6">
              <CardLabel>{t("CR_WAS_THERE")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menub}
                selected={IsDelivery}
                onSelect={selectIsDelivery}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_DURING_DELIVERY")}</CardLabel>
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                isMandatory={config.isMandatory}
                selected={DeathDuringDelivery}
                onSelect={selectDeathDuringDelivery}
                // handleChange={handleRadioChangeSmoke}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <h4 style={{ fontWeight: "bold", marginBottom: "15px" }}>{t("CR_HABITS")}</h4>
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
                selected={SmokingType}
                onSelect={selectSmokingType}
                // handleChange={handleRadioChangeSmoke}
              />
              {/* <div>
              {isSmoke === "yes" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
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
              </div> */}
            </div>

            <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_CHEW_TOBACCO")}</CardLabel>
              {/* <div className="statistical-flex"> */}
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                isMandatory={config.isMandatory}
                selected={TobaccoType}
                onSelect={selectTobaccoType}
                // handleChange={handleRadioChangeTabacco}
              />
              {/* {isTabacco === "yes" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
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
              )} */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_DRINK_ALCOHOL")}</CardLabel>
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                isMandatory={config.isMandatory}
                selected={AlcoholType}
                onSelect={selectAlcoholType}
              />
              {/* {isalcohol === "yes" && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_YEAR")}</CardLabel>
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
              )} */}
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default StatisticalInfo;
