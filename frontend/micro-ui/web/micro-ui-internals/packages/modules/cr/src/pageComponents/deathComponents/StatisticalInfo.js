import React, { useState, useContext, useEffect, Loader } from "react";
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
const StatisticalInfo = ({ config, onSelect, userType, formData, iseditDeath }) => {
  // const { DeceasedGender } = props;

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
            value="probably"
            checked={selected === "probably"}
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
      </div>
    );
  };

  console.log(formData);
  const [visible, setVisible] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const minutes = [
    { i18nKey: "Min", code: "CR_MIN" },
    { i18nKey: "Hours", code: "CR_HOURS" },
  ];
  const days = [
    { i18nKey: "Days", code: "CR_DAYS" },
    { i18nKey: "Weeks", code: "CR_WEEKS" },
  ];
  const months = [
    { i18nKey: "Months", code: "CR_MONTHS" },
    { i18nKey: "Years", code: "CR_YEARS" },
  ];
  const menub = [
    { i18nKey: "YES", code: "CR_YES" },
    { i18nKey: "NO", code: "CR_NO" },
  ];
  const cmbDelivary = [
    { i18nKey: "No", code: "CR_NO" },
    { i18nKey: "Still Birth", code: "CR_STILL_BIRTH" },
    { i18nKey: "Live Birth", code: "CR_LIVE_BIRTH" },
  ];

  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: attention = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MedicalAttentionType");
  const { data: deathmain = {}, isLoadingA } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCause");
  const { data: deathsub = {}, isLoadingsub } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");
  const { data: mannerOfDeath = {}, isLoadingmanner } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MannerOfDeath");
  const { data: pregnantDeceased = {}, isLoadingPregnant } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "PregnantDeceased"
  );
  const { data: birthStatus = {}, isLoadingBirthStatus } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "BirthStatus");
  const [isInitialRender, setIsInitialRender] = useState(true);
  let cmbbirthstatus = [];
  birthStatus &&
    birthStatus["birth-death-service"] &&
    birthStatus["birth-death-service"].PregnantDeceased.map((ob) => {
      cmbbirthstatus.push(ob);
    });
  let cmbpregnantDeceased = [];
  pregnantDeceased &&
    pregnantDeceased["birth-death-service"] &&
    pregnantDeceased["birth-death-service"].PregnantDeceased.map((ob) => {
      cmbpregnantDeceased.push(ob);
    });
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
  let cmbmannerofdeath = [];
  mannerOfDeath &&
    mannerOfDeath["birth-death-service"] &&
    mannerOfDeath["birth-death-service"].MannerOfDeath.map((ob) => {
      cmbmannerofdeath.push(ob);
    });
  console.log(mannerOfDeath);

  // const { data: deathsub = {}, isLoadingB } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");
  const [MedicalAttentionType, setMedicalAttentionType] = useState(
    formData?.StatisticalInfo?.MedicalAttentionType?.code
      ? formData?.StatisticalInfo?.MedicalAttentionType
      : formData?.StatisticalInfo?.MedicalAttentionType
      ? cmbAttention.filter((cmbAttention) => cmbAttention.code === formData?.StatisticalInfo?.MedicalAttentionType)[0]
      : ""
  );
  // const [MedicalAttentionType, setMedicalAttentionType] = useState(
  //   formData?.StatisticalInfo?.MedicalAttentionType ? formData?.StatisticalInfo?.MedicalAttentionType : null
  // );
  const [IsAutopsyPerformed, setIsAutopsyPerformed] = useState(
    formData?.StatisticalInfo?.IsAutopsyPerformed ? formData?.StatisticalInfo?.IsAutopsyPerformed : null
  );
  const handleIsAutopsyPerformed = (e) => {
    selectIsAutopsyPerformed(e.target.value);
  };
  const [IsAutopsyCompleted, setIsIsAutopsyCompleted] = useState(
    formData?.StatisticalInfo?.IsAutopsyCompleted ? formData?.StatisticalInfo?.IsAutopsyCompleted : null
  );
  const handleIsAutopsyCompleted = (e) => {
    selectIsIsAutopsyCompleted(e.target.value);
  };
  const [MannerOfDeath, setMannerOfDeath] = useState(
    formData?.StatisticalInfo?.MannerOfDeath?.code
      ? formData?.StatisticalInfo?.MannerOfDeath
      : formData?.StatisticalInfo?.MannerOfDeath
      ? cmbmannerofdeath.filter((cmbmannerofdeath) => cmbmannerofdeath.code === formData?.StatisticalInfo?.MannerOfDeath)[0]
      : ""
  );
  const [DeathMedicallyCertified, setDeathMedicallyCertified] = useState(
    formData?.StatisticalInfo?.DeathMedicallyCertified?.code
      ? formData?.StatisticalInfo?.DeathMedicallyCertified
      : formData?.StatisticalInfo?.DeathMedicallyCertified
      ? menub.filter((menub) => menub.code === formData?.StatisticalInfo?.DeathMedicallyCertified)[0]
      : ""
  );
  const [DeathCauseMain, setDeathCauseMain] = useState(
    formData?.StatisticalInfo?.DeathCauseMain?.code
      ? formData?.StatisticalInfo?.DeathCauseMain
      : formData?.StatisticalInfo?.DeathCauseMain
      ? cmbDeathmain.filter((cmbDeathmain) => cmbDeathmain.code === formData?.StatisticalInfo?.DeathCauseMain)[0]
      : ""
  );
  // const [DeathCauseMain, setDeathCauseMain] = useState(formData?.StatisticalInfo?.DeathCauseMain ? formData?.StatisticalInfo?.DeathCauseMain : null);
  const [DeathCauseMainCustom, setDeathCauseMainCustom] = useState(
    formData?.StatisticalInfo?.DeathCauseMainCustom ? formData?.StatisticalInfo?.DeathCauseMainCustom : null
  );
  const [DeathCauseMainInterval, setDeathCauseMainInterval] = useState(
    formData?.StatisticalInfo?.DeathCauseMainInterval ? formData?.StatisticalInfo?.DeathCauseMainInterval : null
  );
  const [DeathCauseMainTimeUnit, setDeathCauseMainTimeUnit] = useState(
    formData?.StatisticalInfo?.DeathCauseMainTimeUnit?.code
      ? formData?.StatisticalInfo?.DeathCauseMainTimeUnit
      : formData?.StatisticalInfo?.DeathCauseMainTimeUnit
      ? minutes.filter((minutes) => minutes.code === formData?.StatisticalInfo?.DeathCauseMainTimeUnit)[0]
      : ""
  );
  // const [DeathCauseMainTimeUnit, setDeathCauseMainTimeUnit] = useState(
  //   formData?.StatisticalInfo?.DeathCauseMainTimeUnit ? formData?.StatisticalInfo?.DeathCauseMainTimeUnit : null
  // );
  const [DeathCauseSub, setDeathCauseSub] = useState(
    formData?.StatisticalInfo?.DeathCauseSub?.code
      ? formData?.StatisticalInfo?.DeathCauseSub
      : formData?.StatisticalInfo?.DeathCauseSub
      ? cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfo?.DeathCauseSub)[0]
      : ""
  );
  // const [DeathCauseSub, setDeathCauseSub] = useState(formData?.StatisticalInfo?.DeathCauseSub ? formData?.StatisticalInfo?.DeathCauseSub : null);
  const [DeathCauseSubCustom, setDeathCauseSubCustom] = useState(
    formData?.StatisticalInfo?.DeathCauseSubCustom ? formData?.StatisticalInfo?.DeathCauseSubCustom : null
  );

  const [DeathCauseSubInterval, setDeathCauseSubInterval] = useState(
    formData?.StatisticalInfo?.DeathCauseSubInterval ? formData?.StatisticalInfo?.DeathCauseSubInterval : null
  );
  // const [DeathCauseSubTimeUnit, setDeathCauseSubTimeUnit] = useState(
  //   formData?.StatisticalInfo?.DeathCauseSubTimeUnit ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit : null
  // );
  const [DeathCauseSubTimeUnit, setDeathCauseSubTimeUnit] = useState(
    formData?.StatisticalInfo?.DeathCauseSubTimeUnit?.code
      ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit
      : formData?.StatisticalInfo?.DeathCauseSubTimeUnit
      ? days.filter((days) => days.code === formData?.StatisticalInfo?.DeathCauseSubTimeUnit)[0]
      : ""
  );
  const [DeathCauseSub2, setDeathCauseSub2] = useState(
    formData?.StatisticalInfo?.DeathCauseSub2?.code
      ? formData?.StatisticalInfo?.DeathCauseSub2
      : formData?.StatisticalInfo?.DeathCauseSub2
      ? cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfo?.DeathCauseSub2)[0]
      : ""
  );
  // const [DeathCauseSub2, DeathCauseSub2] = useState(formData?.StatisticalInfo?.DeathCauseSub2 ? formData?.StatisticalInfo?.DeathCauseSub2 : null);
  const [DeathCauseSubCustom2, setDeathCauseSubCustom2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubCustom2 ? formData?.StatisticalInfo?.DeathCauseSubCustom2 : null
  );
  const [DeathCauseSubInterval2, setDeathCauseSubInterval2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubInterval2 ? formData?.StatisticalInfo?.DeathCauseSubInterval2 : null
  );
  const [DeathCauseSubTimeUnit2, setDeathCauseSubTimeUnit2] = useState(
    formData?.StatisticalInfo?.DeathCauseSubTimeUnit2?.code
      ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit2
      : formData?.StatisticalInfo?.DeathCauseSubTimeUnit2
      ? months.filter((months) => months.code === formData?.StatisticalInfo?.DeathCauseSubTimeUnit2)[0]
      : ""
  );
  // const [DeathCauseSubTimeUnit2, setDeathCauseSubTimeUnit2] = useState(
  //   formData?.StatisticalInfo?.DeathCauseSubTimeUnit2 ? formData?.StatisticalInfo?.DeathCauseSubTimeUnit2 : null
  // );

  const [DeathCauseOther, setDeathCauseOther] = useState(
    formData?.StatisticalInfo?.DeathCauseOther ? formData?.StatisticalInfo?.DeathCauseOther : null
  );
  // const [pregnancyDuration, setPregnancyDuration] = useState(formData?.ChildDetails?.pregnancyDuration ? (cmbPregWeek.filter(cmbPregWeek => cmbPregWeek.code === formData?.ChildDetails?.pregnancyDuration)[0]) : "");
  const [IsdeceasedPregnant, setIsdeceasedPregnant] = useState(
    formData?.StatisticalInfo?.IsdeceasedPregnant
      ? cmbDelivary.filter((cmbDelivary) => cmbDelivary.code === formData?.StatisticalInfo?.IsdeceasedPregnant)[0]
      : ""
  );

  const [IsDelivery, setIsDelivery] = useState(formData?.StatisticalInfo?.IsdeceasedPregnant ? formData?.StatisticalInfo?.IsdeceasedPregnant : null);
  const [DeathDuringDelivery, setIsDeathDuringDelivery] = useState(
    formData?.StatisticalInfo?.DeathDuringDelivery ? formData?.StatisticalInfo?.DeathDuringDelivery : null
  );
  const handleDeathDuringDelivery = (e) => {
    selectDeathDuringDelivery(e.target.value);
  };
  const [AlcoholType, setAlcoholType] = useState(formData?.StatisticalInfo?.AlcoholType ? formData?.StatisticalInfo?.AlcoholType : null);
  const handleAlcoholType = (e) => {
    selectAlcoholType(e.target.value);
  };
  const [SmokingType, setSmokingType] = useState(formData?.StatisticalInfo?.SmokingType ? formData?.StatisticalInfo?.SmokingType : null);
  const handleSmokingType = (e) => {
    selectSmokingType(e.target.value);
  };
  const [TobaccoType, setTobaccoType] = useState(formData?.StatisticalInfo?.isTabacco ? formData?.StatisticalInfo?.isTabacco : null);
  const handleTobaccoType = (e) => {
    selectTobaccoType(e.target.value);
  };
  const [value, setValue] = useState();

  //////////////////////
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  if (iseditDeath) {
    if (formData?.StatisticalInfo?.MedicalAttentionType != null) {
      if (cmbAttention.length > 0 && (MedicalAttentionType === undefined || MedicalAttentionType === "")) {
        setMedicalAttentionType(cmbAttention.filter((cmbAttention) => cmbAttention.code === formData?.StatisticalInfo?.MedicalAttentionType)[0]);
      }
    }
    if (formData?.StatisticalInfo?.MannerOfDeath != null) {
      if (cmbmannerofdeath.length > 0 && (MannerOfDeath === undefined || MannerOfDeath === "")) {
        setMannerOfDeath(cmbmannerofdeath.filter((cmbmannerofdeath) => cmbmannerofdeath.code === formData?.StatisticalInfo?.MannerOfDeath)[0]);
      }
    }
    if (formData?.StatisticalInfo?.DeathMedicallyCertified != null) {
      if (menub.length > 0 && (DeathMedicallyCertified === undefined || DeathMedicallyCertified === "")) {
        setDeathMedicallyCertified(menub.filter((menub) => menub.code === formData?.StatisticalInfo?.DeathMedicallyCertified)[0]);
      }
    }
    if (formData?.StatisticalInfo?.DeathCauseMain != null) {
      if (cmbDeathmain.length > 0 && (DeathCauseMain === undefined || DeathCauseMain === "")) {
        setDeathCauseMain(cmbDeathmain.filter((cmbDeathmain) => cmbDeathmain.code === formData?.StatisticalInfo?.DeathCauseMain)[0]);
      }
    }
    if (formData?.StatisticalInfo?.DeathCauseMainTimeUnit != null) {
      if (minutes.length > 0 && (DeathCauseMainTimeUnit === undefined || DeathCauseMainTimeUnit === "")) {
        setDeathCauseMainTimeUnit(minutes.filter((minutes) => minutes.code === formData?.StatisticalInfo?.DeathCauseMainTimeUnit)[0]);
      }
    }
    if (formData?.StatisticalInfo?.DeathCauseSub != null) {
      if (cmbDeathsub.length > 0 && (DeathCauseSub === undefined || DeathCauseSub === "")) {
        setDeathCauseSub(cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfo?.DeathCauseSub)[0]);
      }
    }
    if (formData?.StatisticalInfo?.DeathCauseSubTimeUnit != null) {
      if (days.length > 0 && (DeathCauseSubTimeUnit === undefined || DeathCauseSubTimeUnit === "")) {
        setDeathCauseSubTimeUnit(days.filter((days) => days.code === formData?.StatisticalInfo?.DeathCauseSubTimeUnit)[0]);
      }
    }
    if (formData?.StatisticalInfo?.DeathCauseSub2 != null) {
      if (cmbDeathsub.length > 0 && (DeathCauseSub2 === undefined || DeathCauseSub2 === "")) {
        setDeathCauseSub2(cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfo?.DeathCauseSub2)[0]);
      }
    }
    if (formData?.StatisticalInfo?.DeathCauseSubTimeUnit2 != null) {
      if (months.length > 0 && (DeathCauseSubTimeUnit2 === undefined || DeathCauseSubTimeUnit2 === "")) {
        setDeathCauseSubTimeUnit2(months.filter((months) => months.code === formData?.StatisticalInfo?.DeathCauseSubTimeUnit2)[0]);
      }
    }
    // if (formData?.StatisticalInfo?.IsdeceasedPregnant != null) {
    //   if (cmbDelivary.length > 0 && (IsdeceasedPregnant === undefined || IsdeceasedPregnant === "")) {
    //     setDeathCauseSubTimeUnit2(cmbDelivary.filter((cmbDelivary) => months.code === formData?.StatisticalInfo?.IsdeceasedPregnant)[0]);
    //   }
    // }
    
  }
  let naturetypecmbvalue = null;

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
  function selectDeathCauseMainCustom(e) {
    setDeathCauseMainCustom(e.target.value);
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
  function selectDeathCauseSubCustom(e) {
    setDeathCauseSubCustom(e.target.value);
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
  function selectDeathCauseSubCustom2(e) {
    setDeathCauseSubCustom2(e.target.value);
  }
  function selectDeathCauseSubInterval2(e) {
    setDeathCauseSubInterval2(e.target.value);
  }
  function selectDeathCauseSubTimeUnit2(value) {
    setDeathCauseSubTimeUnit2(value);
  }
  function selectDeathCauseOther(e) {
    setDeathCauseOther(e.target.value);
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
  function selectAlcoholType(value) {
    setAlcoholType(value);
  }
  let naturetype = null;
  let currentMainCause = [];
  let cmbFilterdeathsub = [];
  useEffect(() => {
    if (isInitialRender) {
      currentMainCause = cmbDeathmain.filter((cmbDeathmain) => cmbDeathmain.code);
      cmbFilterdeathsub = cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.maincode === currentMainCause[0].code);
      selectDeathCauseSub(cmbFilterdeathsub[0]);
      setIsInitialRender(false);
    }
  }, [deathsub, isInitialRender, deathmain]);

  const onSkip = () => onSelect();

  // useEffect(() => {
  //   if (isInitialRender) {
  //     if (MedicalAttentionType) {
  //       setIsInitialRender(false);
  //       naturetype = MedicalAttentionType.code;
  //       setValue(naturetype);
  //       if (naturetype === "MEDICAL_ATTENTION_TYPE_INSTITUTION") {

  //         // <Institution DeathCauseMain={DeathCauseMain}
  //         // DeathCauseMainCustom={DeathCauseMainCustom}
  //         // DeathCauseMainInterval = {DeathCauseMainInterval}
  //         // DeathCauseMainTimeUnit= {DeathCauseMainTimeUnit}
  //         // DeathCauseSub = {DeathCauseSub}
  //         // DeathCauseSubCustom = {DeathCauseSubCustom}
  //         // DeathCauseSubInterval = {DeathCauseSubInterval}
  //         // DeathCauseSubTimeUnit = {DeathCauseSubTimeUnit}
  //         // DeathCauseSub2 = {DeathCauseSub2}
  //         // DeathCauseSubCustom2 = {DeathCauseSubCustom2}
  //         // DeathCauseSubInterval2 = {DeathCauseSubInterval2}
  //         // DeathCauseSubTimeUnit2 = {DeathCauseSubTimeUnit2}
  //         // />;

  //       }
  //     }
  //   }

  //   MedicalAttentionType.code === "MEDICAL_ATTENTION_TYPE_INSTITUTION"
  // });

  const goNext = () => {
    sessionStorage.setItem("MedicalAttentionType", MedicalAttentionType ? MedicalAttentionType.code : null);
    sessionStorage.setItem("IsAutopsyPerformed", IsAutopsyPerformed ? IsAutopsyPerformed : null);
    sessionStorage.setItem("IsAutopsyCompleted", IsAutopsyCompleted ? IsAutopsyCompleted : null);
    sessionStorage.setItem("MannerOfDeath", MannerOfDeath ? MannerOfDeath.code : null);
    sessionStorage.setItem("DeathMedicallyCertified", DeathMedicallyCertified ? DeathMedicallyCertified.code : null);

    sessionStorage.setItem("DeathCauseOther", DeathCauseOther ? DeathCauseOther.code : null);
    sessionStorage.setItem("IsdeceasedPregnant", IsdeceasedPregnant ? IsdeceasedPregnant.code : null);
    sessionStorage.setItem("IsDelivery", IsDelivery ? IsDelivery.code : null);
    sessionStorage.setItem("DeathDuringDelivery", DeathDuringDelivery ? DeathDuringDelivery : null);
    sessionStorage.setItem("SmokingType", SmokingType ? SmokingType : null);
    sessionStorage.setItem("TobaccoType", SmokingType ? SmokingType : null);
    sessionStorage.setItem("AlcoholType", AlcoholType ? AlcoholType : null);

    sessionStorage.setItem("DeathCauseMain", DeathCauseMain ? DeathCauseMain.code : null);
    sessionStorage.setItem("DeathCauseMainCustom", DeathCauseMainCustom ? DeathCauseMainCustom : null);
    sessionStorage.setItem("DeathCauseMainInterval", DeathCauseMainInterval ? DeathCauseMainInterval : null);
    sessionStorage.setItem("DeathCauseMainTimeUnit", DeathCauseMainTimeUnit ? DeathCauseMainTimeUnit.code : null);
    sessionStorage.setItem("DeathCauseSub", DeathCauseSub ? DeathCauseSub.code : null);
    sessionStorage.setItem("DeathCauseSubCustom", DeathCauseSubCustom ? DeathCauseSubCustom : null);
    sessionStorage.setItem("DeathCauseSubInterval", DeathCauseSubInterval ? DeathCauseSubInterval : null);
    sessionStorage.setItem("DeathCauseSubTimeUnit", DeathCauseSubTimeUnit ? DeathCauseSubTimeUnit.code : null);
    sessionStorage.setItem("DeathCauseSub2", DeathCauseSub2 ? DeathCauseSub2.code : null);
    sessionStorage.setItem("DeathCauseSubCustom2", DeathCauseSubCustom2 ? DeathCauseSubCustom2 : null);
    sessionStorage.setItem("DeathCauseSubInterval2", DeathCauseSubInterval2 ? DeathCauseSubInterval2 : null);
    sessionStorage.setItem("DeathCauseSubTimeUnit2", DeathCauseSubTimeUnit2 ? DeathCauseSubTimeUnit2.code : null);

    onSelect(config.key, {
      MedicalAttentionType,
      IsAutopsyPerformed,
      IsAutopsyCompleted,
      MannerOfDeath,
      DeathMedicallyCertified,
      DeathCauseMain,
      DeathCauseMainCustom,
      DeathCauseMainInterval,
      DeathCauseMainTimeUnit,
      DeathCauseSub,
      DeathCauseSubCustom,
      DeathCauseSubInterval,
      DeathCauseSubTimeUnit,
      DeathCauseSub2,
      DeathCauseSubCustom2,
      DeathCauseSubInterval2,
      DeathCauseSubTimeUnit2,
      DeathCauseOther,
      IsdeceasedPregnant,
      DeathDuringDelivery,
      SmokingType,
      TobaccoType,
      AlcoholType,
    });
  };

  console.log(formData);
  // if (isLoading || isLoadingA || isLoadingsub || isLoadingmanner || isLoadingPregnant || isLoadingBirthStatus) {
  //   return <Loader></Loader>;
  // }

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}

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
                    // isMandatory={config.isMandatory}
                    selected={IsAutopsyPerformed}
                    onSelect={selectIsAutopsyPerformed}
                    handleChange={handleIsAutopsyPerformed}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("CR_WERE_AUTOPSY")}</CardLabel>
                  <RadioButtons
                    t={t}
                    // optionsKey="i18nKey"
                    // onChange={setOptionkey}
                    // isMandatory={config.isMandatory}
                    selected={IsAutopsyCompleted}
                    onSelect={selectIsIsAutopsyCompleted}
                    handleChange={handleIsAutopsyCompleted}
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
                    optionKey="name"
                    isMandatory={false}
                    option={cmbmannerofdeath}
                    selected={MannerOfDeath}
                    select={selectMannerOfDeath}
                    disabled={isEdit}
                    placeholder={`${t("CR_DEATH_OCCUR")}`}
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
                optionKey="i18nKey"
                isMandatory={false}
                option={menub}
                selected={DeathMedicallyCertified}
                select={selectDeathMedicallyCertified}
                disabled={isEdit}
                placeholder={`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}`}
              />
            </div>
          </div>
          {/*  INSTITUTION */}
          {/* {value === "MEDICAL_ATTENTION_TYPE_INSTITUTION" && ( */}
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
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    // optionKey="i18nKey"
                    name="DeathCauseMainCustom"
                    value={DeathCauseMainCustom}
                    onChange={selectDeathCauseMainCustom}
                    disable={isEdit}
                    placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}`}
                  />
                </div>
                <div className="col-md-4">
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
                    placeholder={`${t("CR_APROXIMATE")}`}
                    // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                  />
                </div>
                <div className="col-md-2">
                  <CardLabel>{t("CR_TIME_UNIT")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="code"
                    isMandatory={false}
                    option={minutes}
                    selected={DeathCauseMainTimeUnit}
                    select={selectDeathCauseMainTimeUnit}
                    disabled={isEdit}
                    placeholder={`${t("CR_TIME_UNIT")}`}
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
                  <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_A")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbDeathsub}
                    selected={DeathCauseSub}
                    select={selectDeathCauseSub}
                    disabled={isEdit}
                    placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_A")}`}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="DeathCauseSubCustom"
                    value={DeathCauseSubCustom}
                    onChange={selectDeathCauseSubCustom}
                    disable={isEdit}
                    placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}`}
                  />
                </div>
                <div className="col-md-4">
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
                    placeholder={`${t("CR_APROXIMATE")}`}
                  />
                </div>
                <div className="col-md-2">
                  <CardLabel>{t("CR_TIME_UNIT")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="code"
                    isMandatory={false}
                    option={days}
                    selected={DeathCauseSubTimeUnit}
                    select={selectDeathCauseSubTimeUnit}
                    disabled={isEdit}
                    placeholder={`${t("CR_TIME_UNIT")}`}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_B")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbDeathsub}
                    selected={DeathCauseSub2}
                    select={selectDeathCauseSub2}
                    disabled={isEdit}
                    placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_B")}`}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="DeathCauseSubCustom2"
                    value={DeathCauseSubCustom2}
                    onChange={selectDeathCauseSubCustom2}
                    disable={isEdit}
                    placeholder={`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}`}
                  />
                </div>
                <div className="col-md-4">
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
                    placeholder={`${t("CR_APROXIMATE")}`}
                    // {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
                  />
                </div>
                <div className="col-md-2">
                  <CardLabel>{t("CR_TIME_UNIT")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="code"
                    isMandatory={false}
                    option={months}
                    selected={DeathCauseSubTimeUnit2}
                    select={selectDeathCauseSubTimeUnit2}
                    disabled={isEdit}
                    placeholder={`${t("CR_TIME_UNIT")}`}
                    {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MONTH") })}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
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
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathCauseOther"
                value={DeathCauseOther}
                onChange={selectDeathCauseOther}
                disable={isEdit}
                placeholder={`${t("CR_DEATH_CAUASE_OTHER")}`}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_CAUSE_OTHER_ML") })}
              />
            </div>
          </div>
        </div>
        {formData?.InformationDeath?.DeceasedGender.code == "FEMALE" &&
          (console.log(formData?.InformationDeath?.DeceasedGender.code),
          (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PREGNANCY_STATUS_DECEASED")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{t("CR_DECEASED_PREGNANT")}</CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbbirthstatus}
                      selected={IsDelivery}
                      select={selectIsDelivery}
                      disabled={isEdit}
                      placeholder={`${t("CR_DECEASED_PREGNANT")}`}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{t("CR_WAS_THERE_DELIVARY")}</CardLabel>
                    {/* <div className="col-md-6 "> */}
                    <Dropdown
                      t={t}
                      optionKey="i18nKey"
                      isMandatory={false}
                      option={cmbDelivary}
                      selected={IsdeceasedPregnant}
                      select={selectIsdeceasedPregnant}
                      disabled={isEdit}
                      placeholder={`${t("CR_WAS_THERE_DELIVARY")}`}
                    />
                  </div>
                  <div className="col-md-6">
                    <CardLabel>{t("CR_DURING_DELIVERY")}</CardLabel>
                    <RadioButton
                      t={t}
                      // optionsKey="i18nKey"
                      // onChange={setOptionkey}
                      // isMandatory={config.isMandatory}
                      selected={DeathDuringDelivery}
                      Select={selectDeathDuringDelivery}
                      handleChange={handleDeathDuringDelivery}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        ;
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HABITS")}`}</span>{" "}
            </h1>
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
                // isMandatory={config.isMandatory}
                selected={SmokingType}
                onSelect={selectSmokingType}
                handleChange={handleSmokingType}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>{t("CR_HABITUALLY_CHEW_TOBACCO")}</CardLabel>
              {/* <div className="statistical-flex"> */}
              <RadioButton
                t={t}
                // optionsKey="i18nKey"
                // onChange={setOptionkey}
                // isMandatory={config.isMandatory}
                selected={TobaccoType}
                onSelect={selectTobaccoType}
                handleChange={handleTobaccoType}
              />
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
                handleChange={handleAlcoholType}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default StatisticalInfo;
