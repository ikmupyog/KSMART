import React, { useState, useContext, useEffect,useMemo, Loader } from "react";
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
  PopUp,
  OTPInput,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import { esignSteps } from "./config";
import SelectMobileNumber from "./SelectMobileNumber";
import SelectOtp from "./SelectOtp";



const StatisticalInfoAbandoned = ({ config, onSelect, userType, formData, isEditAbandonedDeath,isUserRegistered = true }) => {
   
    const { t } = useTranslation();
    const stepItems = useMemo(() =>
    esignSteps.map(
      (step) => {
        const texts = {};
        for (const key in step.texts) {
          texts[key] = t(step.texts[key]);
        }
        return { ...step, texts };
      },
      [esignSteps]
    )
  );
  const [mobileNumber,setMobileNumber]=useState();
  const getUserType = () => Digit.UserService.getType();

    const handleMobileChange = (event) => {
        console.log("event",event)
        const { value } = event.target;
        setParmas({ ...params, mobileNumber: value });
      };
    
      const selectOtp = async () => {
        // try {
        //   setIsOtpValid(true);
          const { otp } = params;
          if (isUserRegistered) {
            const requestData = {
              username: mobileNumber,
              password: otp,
              tenantId: 32,
              userType: "citizen",
            };
    
            const res = await Digit.UserService.authenticate(requestData).then((res)=>
            console.log("res",res))
        }
    
            // if (location.state?.role) {
            //   const roleInfo = info.roles.find((userRole) => userRole.code === location.state.role);
            //   if (!roleInfo || !roleInfo.code) {
            //     setError(t("ES_ERROR_USER_NOT_PERMITTED"));
            //     setTimeout(() => history.replace(DEFAULT_REDIRECT_URL), 5000);
            //     return;
            //   }
            // }
    // if(window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")){
    //   info.tenantId= Digit.ULBService.getStateId();
    // }
    
        //     setUser({ info, ...tokens });
        //   } else if (!isUserRegistered) {
        //     const requestData = {
        //       name,
        //       username: mobileNumber,
        //       otpReference: otp,
        //       tenantId: stateCode,
        //     };
    
        //     const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.UserService.registerUser(requestData, stateCode);
          
        //     if(window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")){
        //     info.tenantId= Digit.ULBService.getStateId();
        //     }
    
        //     setUser({ info, ...tokens });
        //   }
        // } catch (err) {
        //   setIsOtpValid(false);
        // }
      };
    
      const TYPE_LOGIN = { type: "login" };
      const TYPE_REGISTER = { type: "register" };
    const selectMobileNumber = async () => {
        // setParmas({ ...params, ...mobileNumber });
        const data = {
          mobileNumber,
          tenantId: 32,
          userType: getUserType(),
        };
        console.log("selectMobileNumber")
        //  Digit.UserService.sendOtp(data, stateCode);
      sendOtp({ otp: { ...data, ...TYPE_REGISTER } });

        // if (isUserRegistered) {
        //   const [res, err] = await
        //   if (!err) {
        //     history.replace(`${path}/otp`, { from: getFromLocation(location.state, searchParams), role: location.state?.role });
        //     return;
        //   } else {
        //     if (!(location.state && location.state.role === 'FSM_DSO')) {
        //       history.push(`/digit-ui/citizen/register/name`, { from: getFromLocation(location.state, searchParams), data:data });
        //     }
        //   }
        //   if (location.state?.role) {
        //     setError(location.state?.role === "FSM_DSO" ? t("ES_ERROR_DSO_LOGIN") : "User not registered.");
        //   }
        // } else {
        //   const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
        //   if (!err) {
        //     history.replace(`${path}/otp`, { from: getFromLocation(location.state, searchParams) });
        //     return;
        //   }
        // }
      };

    const handleOtpChange = (otp) => {
        setParmas({ ...params, otp });
      };
      const [modalOpen, setModalOpen] = useState(false);
      const [user, setUser] = useState(null);
      const [error, setError] = useState(null);
      const [isOtpValid, setIsOtpValid] = useState(true);
      const [tokens, setTokens] = useState(null);
      const [params, setParmas] = useState(isUserRegistered?{}:location?.state?.data);
      const [errorTO, setErrorTO] = useState(null);
      const searchParams = Digit.Hooks.useQueryParams();
    

    //   const resendOtp = async () => {
    //     // const { mobileNumber } = params;
    //     const data = {
    //       mobileNumber,
    //       tenantId: 32,
    //       userType: getUserType(),
    //     };
    //     if (!isUserRegistered) {
    //       const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
    //     } else if (isUserRegistered) {
    //       const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_LOGIN } });
    //     }
    //   };
    
      const sendOtp = async (data) => {
        console.log("sendOtp")
       try {
        console.log("try reached==",data);
          const res = await 
          Digit.UserService.sendOtp(data, 32).then((res)=>
        {  console.log("res",res)
          setModalOpen(true)}
          )
          return [res, null];
       } catch (err) {
        console.log("catch reached==",err);
           return [null, err];
        }
      };
    
      
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
  const [isInitialRenderDeathCauseFilterList, setIsInitialRenderDeathCauseFilterList] = useState(false);
  const [DeathCauseFilterList, setDeathCauseFilterList] = useState(null);

  useEffect(() => {
    if (isInitialRenderDeathCauseFilterList) {
      if (DeathCauseMain) {
        setDeathCauseFilterList(cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.maincode === DeathCauseMain.code));
        setIsInitialRenderDeathCauseFilterList(false);
      }
    }
  }, [DeathCauseFilterList, isInitialRenderDeathCauseFilterList]);
  const [DeathCauseMain, setDeathCauseMain] = useState(

    formData?.StatisticalInfoAbandoned?.DeathCauseMain?.code
      ? formData?.StatisticalInfoAbandoned?.DeathCauseMain
      : formData?.StatisticalInfoAbandoned?.DeathCauseMain
      ? cmbDeathmain.filter((cmbDeathmain) => cmbDeathmain.code === formData?.StatisticalInfoAbandoned?.DeathCauseMain)[0]
      : ""
  );
  const [DeathCauseSub, setDeathCauseSub] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSub?.code
      ? formData?.StatisticalInfoAbandoned?.DeathCauseSub
      : formData?.StatisticalInfoAbandoned?.DeathCauseSub
      ? cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfoAbandoned?.DeathCauseSub)[0]
      : ""
  );
 
  // const { data: deathsub = {}, isLoadingB } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeathCauseSub");
  const [MedicalAttentionType, setMedicalAttentionType] = useState(
    formData?.StatisticalInfoAbandoned?.MedicalAttentionType?.code
      ? formData?.StatisticalInfoAbandoned?.MedicalAttentionType
      : formData?.StatisticalInfoAbandoned?.MedicalAttentionType
      ? cmbAttention.filter((cmbAttention) => cmbAttention.code === formData?.StatisticalInfoAbandoned?.MedicalAttentionType)[0]
      : ""
  );
  // const [MedicalAttentionType, setMedicalAttentionType] = useState(
  //   formData?.StatisticalInfoAbandoned?.MedicalAttentionType ? formData?.StatisticalInfoAbandoned?.MedicalAttentionType : null
  // );

  const [IsAutopsyPerformed, setIsAutopsyPerformed] = useState(
    formData?.StatisticalInfoAbandoned?.IsAutopsyPerformed ? formData?.StatisticalInfoAbandoned?.IsAutopsyPerformed : null
  );
  const handleIsAutopsyPerformed = (e) => {
    selectIsAutopsyPerformed(e.target.value);
  };
  const [IsAutopsyCompleted, setIsIsAutopsyCompleted] = useState(
    formData?.StatisticalInfoAbandoned?.IsAutopsyCompleted ? formData?.StatisticalInfoAbandoned?.IsAutopsyCompleted : null
  );
  const handleIsAutopsyCompleted = (e) => {
    selectIsIsAutopsyCompleted(e.target.value);
  };
  const [MannerOfDeath, setMannerOfDeath] = useState(
    formData?.StatisticalInfoAbandoned?.MannerOfDeath?.code
      ? formData?.StatisticalInfoAbandoned?.MannerOfDeath
      : formData?.StatisticalInfoAbandoned?.MannerOfDeath
      ? cmbmannerofdeath.filter((cmbmannerofdeath) => cmbmannerofdeath.code === formData?.StatisticalInfoAbandoned?.MannerOfDeath)[0]
      : ""
  );
  const [DeathMedicallyCertified, setDeathMedicallyCertified] = useState(
    formData?.StatisticalInfoAbandoned?.DeathMedicallyCertified?.code
      ? formData?.StatisticalInfoAbandoned?.DeathMedicallyCertified
      : formData?.StatisticalInfoAbandoned?.DeathMedicallyCertified
      ? menub.filter((menub) => menub.code === formData?.StatisticalInfoAbandoned?.DeathMedicallyCertified)[0]
      : ""
  );
 
  // const [DeathCauseMain, setDeathCauseMain] = useState(formData?.StatisticalInfoAbandoned?.DeathCauseMain ? formData?.StatisticalInfoAbandoned?.DeathCauseMain : null);
  const [DeathCauseMainCustom, setDeathCauseMainCustom] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseMainCustom ? formData?.StatisticalInfoAbandoned?.DeathCauseMainCustom : null
  );
  const [DeathCauseMainInterval, setDeathCauseMainInterval] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseMainInterval ? formData?.StatisticalInfoAbandoned?.DeathCauseMainInterval : null
  );
  const [DeathCauseMainTimeUnit, setDeathCauseMainTimeUnit] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit?.code
      ? formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit
      : formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit
      ? minutes.filter((minutes) => minutes.code === formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit)[0]
      : ""
  );
  // const [DeathCauseMainTimeUnit, setDeathCauseMainTimeUnit] = useState(
  //   formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit ? formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit : null
  // );
 
  // const [DeathCauseSub, setDeathCauseSub] = useState(formData?.StatisticalInfoAbandoned?.DeathCauseSub ? formData?.StatisticalInfoAbandoned?.DeathCauseSub : null);
  const [DeathCauseSubCustom, setDeathCauseSubCustom] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSubCustom ? formData?.StatisticalInfoAbandoned?.DeathCauseSubCustom : null
  );

  const [DeathCauseSubInterval, setDeathCauseSubInterval] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSubInterval ? formData?.StatisticalInfoAbandoned?.DeathCauseSubInterval : null
  );
  // const [DeathCauseSubTimeUnit, setDeathCauseSubTimeUnit] = useState(
  //   formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit ? formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit : null
  // );
  const [DeathCauseSubTimeUnit, setDeathCauseSubTimeUnit] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit?.code
      ? formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit
      : formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit
      ? days.filter((days) => days.code === formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit)[0]
      : ""
  );
  const [DeathCauseSub2, setDeathCauseSub2] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSub2?.code
      ? formData?.StatisticalInfoAbandoned?.DeathCauseSub2
      : formData?.StatisticalInfoAbandoned?.DeathCauseSub2
      ? cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfoAbandoned?.DeathCauseSub2)[0]
      : ""
  );
  // const [DeathCauseSub2, DeathCauseSub2] = useState(formData?.StatisticalInfoAbandoned?.DeathCauseSub2 ? formData?.StatisticalInfoAbandoned?.DeathCauseSub2 : null);
  const [DeathCauseSubCustom2, setDeathCauseSubCustom2] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSubCustom2 ? formData?.StatisticalInfoAbandoned?.DeathCauseSubCustom2 : null
  );
  const [DeathCauseSubInterval2, setDeathCauseSubInterval2] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSubInterval2 ? formData?.StatisticalInfoAbandoned?.DeathCauseSubInterval2 : null
  );
  const [DeathCauseSubTimeUnit2, setDeathCauseSubTimeUnit2] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2?.code
      ? formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2
      : formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2
      ? months.filter((months) => months.code === formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2)[0]
      : ""
  );
  // const [DeathCauseSubTimeUnit2, setDeathCauseSubTimeUnit2] = useState(
  //   formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2 ? formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2 : null
  // );

  const [DeathCauseOther, setDeathCauseOther] = useState(
    formData?.StatisticalInfoAbandoned?.DeathCauseOther ? formData?.StatisticalInfoAbandoned?.DeathCauseOther : null
  );
  // const [pregnancyDuration, setPregnancyDuration] = useState(formData?.ChildDetails?.pregnancyDuration ? (cmbPregWeek.filter(cmbPregWeek => cmbPregWeek.code === formData?.ChildDetails?.pregnancyDuration)[0]) : "");
  const [IsdeceasedPregnant, setIsdeceasedPregnant] = useState(
    formData?.StatisticalInfoAbandoned?.IsdeceasedPregnant
      ? cmbDelivary.filter((cmbDelivary) => cmbDelivary.code === formData?.StatisticalInfoAbandoned?.IsdeceasedPregnant)[0]
      : ""
  );

  const [IsDelivery, setIsDelivery] = useState(formData?.StatisticalInfoAbandoned?.IsdeceasedPregnant ? formData?.StatisticalInfoAbandoned?.IsdeceasedPregnant : null);
  const [DeathDuringDelivery, setIsDeathDuringDelivery] = useState(
    formData?.StatisticalInfoAbandoned?.DeathDuringDelivery ? formData?.StatisticalInfoAbandoned?.DeathDuringDelivery : null
  );
  const handleDeathDuringDelivery = (e) => {
    selectDeathDuringDelivery(e.target.value);
  };
  const [AlcoholType, setAlcoholType] = useState(formData?.StatisticalInfoAbandoned?.AlcoholType ? formData?.StatisticalInfoAbandoned?.AlcoholType : null);
  const handleAlcoholType = (e) => {
    selectAlcoholType(e.target.value);
  };
  const [SmokingType, setSmokingType] = useState(formData?.StatisticalInfoAbandoned?.SmokingType ? formData?.StatisticalInfoAbandoned?.SmokingType : null);
  const handleSmokingType = (e) => {
    selectSmokingType(e.target.value);
  };
  const [TobaccoType, setTobaccoType] = useState(formData?.StatisticalInfoAbandoned?.isTabacco ? formData?.StatisticalInfoAbandoned?.isTabacco : null);
  const handleTobaccoType = (e) => {
    selectTobaccoType(e.target.value);
  };
  const [value, setValue] = useState();

  //////////////////////
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  if (isEditAbandonedDeath) {
    if (formData?.StatisticalInfoAbandoned?.MedicalAttentionType != null) {
      if (cmbAttention.length > 0 && (MedicalAttentionType === undefined || MedicalAttentionType === "")) {
        setMedicalAttentionType(cmbAttention.filter((cmbAttention) => cmbAttention.code === formData?.StatisticalInfoAbandoned?.MedicalAttentionType)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.MannerOfDeath != null) {
      if (cmbmannerofdeath.length > 0 && (MannerOfDeath === undefined || MannerOfDeath === "")) {
        setMannerOfDeath(cmbmannerofdeath.filter((cmbmannerofdeath) => cmbmannerofdeath.code === formData?.StatisticalInfoAbandoned?.MannerOfDeath)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.DeathMedicallyCertified != null) {
      if (menub.length > 0 && (DeathMedicallyCertified === undefined || DeathMedicallyCertified === "")) {
        setDeathMedicallyCertified(menub.filter((menub) => menub.code === formData?.StatisticalInfoAbandoned?.DeathMedicallyCertified)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.DeathCauseMain != null) {
      if (cmbDeathmain.length > 0 && (DeathCauseMain === undefined || DeathCauseMain === "")) {
        setDeathCauseMain(cmbDeathmain.filter((cmbDeathmain) => cmbDeathmain.code === formData?.StatisticalInfoAbandoned?.DeathCauseMain)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit != null) {
      if (minutes.length > 0 && (DeathCauseMainTimeUnit === undefined || DeathCauseMainTimeUnit === "")) {
        setDeathCauseMainTimeUnit(minutes.filter((minutes) => minutes.code === formData?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.DeathCauseSub != null) {
      if (cmbDeathsub.length > 0 && (DeathCauseSub === undefined || DeathCauseSub === "")) {
        setDeathCauseSub(cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfoAbandoned?.DeathCauseSub)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit != null) {
      if (days.length > 0 && (DeathCauseSubTimeUnit === undefined || DeathCauseSubTimeUnit === "")) {
        setDeathCauseSubTimeUnit(days.filter((days) => days.code === formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.DeathCauseSub2 != null) {
      if (cmbDeathsub.length > 0 && (DeathCauseSub2 === undefined || DeathCauseSub2 === "")) {
        setDeathCauseSub2(cmbDeathsub.filter((cmbDeathsub) => cmbDeathsub.code === formData?.StatisticalInfoAbandoned?.DeathCauseSub2)[0]);
      }
    }
    if (formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2 != null) {
      if (months.length > 0 && (DeathCauseSubTimeUnit2 === undefined || DeathCauseSubTimeUnit2 === "")) {
        setDeathCauseSubTimeUnit2(months.filter((months) => months.code === formData?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2)[0]);
      }
    }
    // if (formData?.StatisticalInfoAbandoned?.IsdeceasedPregnant != null) {
    //   if (cmbDelivary.length > 0 && (IsdeceasedPregnant === undefined || IsdeceasedPregnant === "")) {
    //     setDeathCauseSubTimeUnit2(cmbDelivary.filter((cmbDelivary) => months.code === formData?.StatisticalInfoAbandoned?.IsdeceasedPregnant)[0]);
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
    setIsInitialRenderDeathCauseFilterList(true)

  }
  function selectDeathCauseMainCustom(e) {
    setDeathCauseMainCustom(e.target.value);
  }
  function selectDeathCauseMainInterval(e) {
    if (e.target.value.trim().length >= 0) {
      setDeathCauseMainInterval(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
    }
   
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
    if (e.target.value.trim().length >= 0) {
      setDeathCauseSubInterval(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
    }
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
    if (e.target.value.trim().length >= 0) {
      setDeathCauseSubInterval2(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
    }
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

  function setMobile(value) {
    console.log("setMobile")
    setMobileNumber(value);
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



  const [MPDesignation, setMPDesignation] = useState(
    formData?.StatisticalInfoAbandoned?.MPDesignation ? formData?.StatisticalInfoAbandoned?.MPDesignation : ""
  );
  // MPDesignation
  function setSelectMPDesignation(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMPDesignation(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }

  const [MPName, setMPName] = useState(
    formData?.StatisticalInfoAbandoned?.MPName ? formData?.StatisticalInfoAbandoned?.MPName : ""
  );
  // MPDesignation
  function setSelectMPName(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMPName(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  const [MPAadharNumber, setMPAadharNumber] = useState(
    formData?.StatisticalInfoAbandoned?.MPAadharNumber ? formData?.StatisticalInfoAbandoned?.MPAadharNumber : ""
  );

  function setSelectMPAadharNumber(e) {

    if (e.target.value.trim().length >= 0) {
      setMPAadharNumber(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
    
  }
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
      MPDesignation,
      MPAadharNumber,
      MPName
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
                    option={DeathCauseFilterList}
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
        <div className="row">
          <div className="col-md-12">
          <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}> {t("CR_MEDICAL_PRACTITIONER")}</span>{" "}
            </h1>
            </div>
            </div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_NAME")}`}
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MPName"
                    value={MPName}
                    onChange={setSelectMPName}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_DESIGNATION")}`}
                  </CardLabel> 
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MPDesignation"
                    value={MPDesignation}
                    onChange={setSelectMPDesignation}
                    placeholder={`${t("CR_DESIGNATION")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="MPAadharNumber"
                    value={MPAadharNumber}
                    onChange={setSelectMPAadharNumber}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
            </div>
        </div>
        {/* <div className="row">
            <div className="col-md-12">
                <div className="col-md-6">
                <input type='text' style={{border:'1px solid black',borderRadius:'3px'}} onChange={(e)=>setMobileNumber(e.target.value)}/>
          <button type="button" onClick={selectMobileNumber}
            style={{backgroundColor:'rgb(234, 61, 50)',color:'white',padding:'10px',width:'200px',height:'30px'}}>esign</button>
    
                </div>
              
            </div>
       
         
        </div> */}
      </FormStep>
      {/* {
            modalOpen&&
            <PopUp>
        
                <div className="popup-module" style={{ padding: "1rem", borderRadius: "1rem" }}> */}
        {/* <h1 style={{fontWeight:600,marginBottom:"1rem"}}></h1> */}
        {/* <h1 className="headingh1">
          <span style={{ background: "#fff", padding: "0 10px" }}>{'OTP VERIFICATION'}</span>{" "}
        </h1> */}
      
                {/* <button type="button" onClick={selectMobileNumber}
            style={{backgroundColor:'rgb(234, 61, 50)',color:'white',borderRadius:'3px'}}>Send Otp</button> */}
                 {/* <OTPInput length={6} onChange={handleOtpChange} value={params.otp} />
                 <button type='button' onClick={selectOtp}>
                    Verify otp
                 </button>
                <button type="button" onClick={()=>setModalOpen(false)}
            style={{backgroundColor:'rgb(234, 61, 50)',color:'white',borderRadius:'3px'}}>Close</button>
                </div>
      
            </PopUp>
          } */}
         
    </React.Fragment>
  );
};

export default StatisticalInfoAbandoned;
