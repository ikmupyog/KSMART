import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInformation = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: ReligionList = {}, isReligionListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: AttentionOfDelivery = {}, isAttentionOfDeliveryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "AttentionOfDelivery"
  );
  const { data: MedicalAttentionType = {}, isMedicalAttentionTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "MedicalAttentionType"
  );
  const { data: DeliveryMethodList = {}, isDeliveryMethodListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "DeliveryMethod"
  );
  const { data: ModeOfPregnancyList = {}, isModeOfPregnancyListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "ModeOfPregnancy"
  );
  const [BirthWeight, setBirthWeight] = useState(formData?.StatisticalInfoDetails?.BirthWeight ? formData?.StatisticalInfoDetails?.BirthWeight : "");
  // const [BirthHeight, setBirthHeight] = useState(formData?.StatisticalInfoDetails?.BirthHeight ? formData?.StatisticalInfoDetails?.BirthHeight : "");
  const [Religion, setReligion] = useState(formData?.StatisticalInfoDetails?.Religion ? formData?.StatisticalInfoDetails?.Religion : null);
  const [PregnancyDuration, setPregnancyDuration] = useState(
    formData?.StatisticalInfoDetails?.PregnancyDuration ? formData?.StatisticalInfoDetails?.PregnancyDuration : null
  );
  // const [MedicalAttension, setMedicalAttension] = useState(
  //   formData?.StatisticalInfoDetails?.MedicalAttension ? formData?.StatisticalInfoDetails?.MedicalAttension : null
  // );
  const [MedicalAttensionSub, setMedicalAttensionSub] = useState(
    formData?.StatisticalInfoDetails?.MedicalAttensionSub ? formData?.StatisticalInfoDetails?.MedicalAttensionSub : null
  );
  const [ModeOfPregnancy, setModeOfPregnancy] = useState(
    formData?.StatisticalInfoDetails?.ModeOfPregnancy ? formData?.StatisticalInfoDetails?.ModeOfPregnancy : null
  );
  const [DeliveryMethod, setDeliveryMethod] = useState(
    formData?.StatisticalInfoDetails?.DeliveryMethod ? formData?.StatisticalInfoDetails?.DeliveryMethod : null
  );
  const [DeliveryMethodSub, setDeliveryMethodSub] = useState(
    formData?.StatisticalInfoDetails?.DeliveryMethodSub ? formData?.StatisticalInfoDetails?.DeliveryMethodSub : null
  );
  // const [BirthPlaceDeccription, setBirthPlaceDeccription] = useState(
  //   formData?.StatisticalInfoDetails?.BirthPlaceDeccription ? formData?.StatisticalInfoDetails?.BirthPlaceDeccription : ""
  // );
  // const [BirthPlaceDeccriptionMl, setBirthPlaceDeccriptionMl] = useState(
  //   formData?.StatisticalInfoDetails?.BirthPlaceDeccriptionMl ? formData?.StatisticalInfoDetails?.BirthPlaceDeccriptionMl : ""
  // );
  // const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [toast, setToast] = useState(false);
  const [ReligionStError, setReligionStError] = useState(formData?.StatisticalInfoDetails?.Religion ? false : false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.StatisticalInfoDetails ? false : false);
  // const [MedicalAttensionStError, setMedicalAttensionStError] = useState(formData?.StatisticalInfoDetails?.MedicalAttension ? false : false);
  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(formData?.StatisticalInfoDetails?.MedicalAttensionSub ? false : false);
  const [ModeOfPregnancyStError, setModeOfPregnancyStError] = useState(formData?.StatisticalInfoDetails?.ModeOfPregnancy ? false : false);
  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(formData?.StatisticalInfoDetails?.DeliveryMethod ? false : false);
  const [DeliveryMethodSubStError, setDeliveryMethodSubStError] = useState(formData?.StatisticalInfoDetails?.DeliveryMethodSub ? false : false);
  const [BirthWeightError, setBirthWeightError] = useState(formData?.StatisticalInfoDetails?.DeliveryMethodSub ? false : false);
  
  // const [BirthPlaceDeccriptionStError, setBirthPlaceDeccriptionStError] = useState(
  //   formData?.StatisticalInfoDetails?.BirthPlaceDeccription ? false : false
  // );
  // const [BirthPlaceDeccriptionMlStError, setBirthPlaceDeccriptionMlStError] = useState(
  //   formData?.StatisticalInfoDetails?.BirthPlaceDeccriptionMl ? false : false
  // );
  let cmbAttDelivery = [];
  let cmbAttDeliverySub = [];
  let cmbDeliveryMethod = [];
  let cmbReligion = [];
  let cmbModePregnancy = [];

  const cmbPregWeek = [
    { i18nKey: "20", code: "20" },
    { i18nKey: "21", code: "21" },
    { i18nKey: "22", code: "22" },
    { i18nKey: "22", code: "22" },
    { i18nKey: "23", code: "23" },
    { i18nKey: "25", code: "25" },
    { i18nKey: "26", code: "26" },
    { i18nKey: "27", code: "27" },
    { i18nKey: "28", code: "28" },
    { i18nKey: "29", code: "29" },
    { i18nKey: "30", code: "30" },
    { i18nKey: "31", code: "31" },
    { i18nKey: "32", code: "32" },
    { i18nKey: "33", code: "33" },
    { i18nKey: "34", code: "34" },
    { i18nKey: "35", code: "35" },
    { i18nKey: "36", code: "36" },
    { i18nKey: "37", code: "37" },
    { i18nKey: "38", code: "38" },
    { i18nKey: "39", code: "39" },
    { i18nKey: "40", code: "40" },
    { i18nKey: "41", code: "41" },
    { i18nKey: "42", code: "42" },
  ];
  console.log(ReligionList);
  ReligionList &&
    ReligionList["common-masters"] &&
    ReligionList["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"] &&
    AttentionOfDelivery["birth-death-service"].AttentionOfDelivery.map((ob) => {
      cmbAttDeliverySub.push(ob);
    });
  MedicalAttentionType &&
    MedicalAttentionType["birth-death-service"] &&
    MedicalAttentionType["birth-death-service"].MedicalAttentionType.map((ob) => {
      cmbAttDelivery.push(ob);
    });
  DeliveryMethodList &&
    DeliveryMethodList["birth-death-service"] &&
    DeliveryMethodList["birth-death-service"].DeliveryMethod.map((ob) => {
      cmbDeliveryMethod.push(ob);
    });
  ModeOfPregnancyList &&
    ModeOfPregnancyList["birth-death-service"] &&
    ModeOfPregnancyList["birth-death-service"].ModeOfPregnancy.map((ob) => {
      cmbModePregnancy.push(ob);
    });
  const onSkip = () => onSelect();

  function setSelectBirthWeight(e) {
    if (e.target.value.length === 4) {
        return false;
        // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setBirthWeight(e.target.value);        
      // if(e.target.value <= 0 || e.target.value > 10 ){
      //   setBirthWeightError(true);
      //   setToast(true);
      //   setTimeout(() => {
      //   setToast(false);
      // }, 3000);
      // } else {
      //   setBirthWeightError(false);
      //   setBirthWeight(e.target.value);        
      // }
    
    }
  }
  // function setSelectBirthWeight(e) {
  //   if (e.target.value.length === 5) {
  //       return false;
  //       // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //       setBirthWeight(e.target.value);
  //   }
  // }
  // function setSelectBirthHeight(e) {
  //   if (e.target.value.length === 5) {
  //       return false;
  //       // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //       setBirthHeight(e.target.value);
        
  //   }
  // }
  function setSelectReligion(value) {
    setReligion(value);
  }
  function setSelectPregnancyDuration(value) {
    setPregnancyDuration(value);
  }
  // function setSelectMedicalAttension(value) {
  //   setMedicalAttension(value);
  // }
  function setSelectMedicalAttensionSub(value) {
    setMedicalAttensionSub(value);
  }
  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
  }
  function setSelectDeliveryMethodSub(value) {
    setDeliveryMethodSub(value);
  }
  function setSelectModeOfPregnancy(value) {
    setModeOfPregnancy(value);
  }
  // function setSelectBirthPlaceDeccription(e) {
  //   setBirthPlaceDeccription(e.target.value);
  // }
  // function setSelectBirthPlaceDeccriptionMl(e) {
  //   setBirthPlaceDeccriptionMl(e.target.value);
  // }

  let validFlag = true;
  const goNext = () => {
    if (ModeOfPregnancy == null || ModeOfPregnancy == "" || ModeOfPregnancy == undefined) {
      validFlag = false;
      setModeOfPregnancyStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setModeOfPregnancyStError(false);
    }
    if (PregnancyDuration == null || PregnancyDuration == "" || PregnancyDuration == undefined) {
      validFlag = false;
      setPregnancyDurationStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setPregnancyDurationStError(false);
    }    
    if (MedicalAttensionSub == null || MedicalAttensionSub == "" || MedicalAttensionSub == undefined) {
      validFlag = false;
      setMedicalAttensionSubStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMedicalAttensionSubStError(false);
    }
    if (DeliveryMethod == null || DeliveryMethod == "" || DeliveryMethod == undefined) {
      validFlag = false;
      setDeliveryMethodStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeliveryMethodStError(false);
    }
    console.log(BirthWeight);
    if (BirthWeight == null || BirthWeight == "" || BirthWeight == undefined) {
      validFlag = false;
      setBirthWeightError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if(BirthWeight !=null || BirthWeight !=""){
      let BirthWeightCheck = BirthWeight;
      if(BirthWeightCheck <= 0 || BirthWeightCheck > 10){
        validFlag = false;
        setBirthWeightError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setBirthWeightError(false);
      }      
    }    
    else {
      setBirthWeightError(false);
    }
    if (Religion == null || Religion == "" || Religion == undefined) {
      validFlag = false;
      setReligionStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setReligionStError(false);
    }

    // if (MedicalAttension == null || MedicalAttension == "" || MedicalAttension == undefined) {
    //   validFlag = false;
    //   setMedicalAttensionStError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setMedicalAttensionStError(false);
    // }

    
   
    

    // if (BirthPlaceDeccription == null || BirthPlaceDeccription == "" || BirthPlaceDeccription == undefined) {
    //   validFlag = false;
    //   setBirthPlaceDeccriptionStError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setBirthPlaceDeccriptionStError(false);
    // }
    // if (BirthPlaceDeccriptionMl == null || BirthPlaceDeccriptionMl == "" || BirthPlaceDeccriptionMl == undefined) {
    //   validFlag = false;
    //   setBirthPlaceDeccriptionMlStError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setBirthPlaceDeccriptionMlStError(false);
    // }

    if (validFlag == true) {
      sessionStorage.setItem("BirthWeight", BirthWeight ? BirthWeight : null);
      // sessionStorage.setItem("BirthHeight", BirthHeight ? BirthHeight : null);
      sessionStorage.setItem("Religion", Religion ? Religion.code : null);
      sessionStorage.setItem("PregnancyDuration", PregnancyDuration ? PregnancyDuration.code : null);
      // sessionStorage.setItem("MedicalAttension", MedicalAttension ? MedicalAttension.code : null);
      sessionStorage.setItem("MedicalAttensionSub", MedicalAttensionSub ? MedicalAttensionSub.code : null);
      sessionStorage.setItem("DeliveryMethod", DeliveryMethod ? DeliveryMethod.code : null);
      sessionStorage.setItem("ModeOfPregnancy", ModeOfPregnancy ? ModeOfPregnancy.code : null);
      // sessionStorage.setItem("BirthPlaceDeccription", BirthPlaceDeccription ? BirthPlaceDeccription : null);
      // sessionStorage.setItem("BirthPlaceDeccriptionMl", BirthPlaceDeccriptionMl ? BirthPlaceDeccriptionMl : null);

      onSelect(config.key, {
        BirthWeight,
        Religion,
        PregnancyDuration,       
        MedicalAttensionSub,
        DeliveryMethod,
        ModeOfPregnancy,
      });
    }
  };
  console.log(formData);

  if (
    isReligionListLoading ||
    isAttentionOfDeliveryLoading ||
    isMedicalAttentionTypeLoading ||
    isDeliveryMethodListLoading ||
    isModeOfPregnancyListLoading
  ) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!ModeOfPregnancy || !PregnancyDuration|| !MedicalAttensionSub || !DeliveryMethod || !Religion || !BirthWeight }>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              {/* <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_STATISTICAL_INFORMATION")}`}</span>{" "} */}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MODE_OF_PREGNANCY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbModePregnancy}
                selected={ModeOfPregnancy}
                select={setSelectModeOfPregnancy}
                placeholder={`${t("CR_MODE_OF_PREGNANCY")}`}
              />
            </div>
           
            {/* <div className="col-md-3">
              <CardLabel>{t("CR_BIRTH_HEIGHT")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="BirthHeight"
                value={BirthHeight}
                onChange={setSelectBirthHeight}
                placeholder={`${t("CR_BIRTH_HEIGHT")}`}
                {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: false, type: "number", title: t("CR_INVALID_BIRTH_HEIGHT") })}
              />
            </div> */}
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_PREGNANCY_DURATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="i18nKey"
                isMandatory={false}
                option={cmbPregWeek}
                selected={PregnancyDuration}
                select={setSelectPregnancyDuration}
                placeholder={`${t("CR_PREGNANCY_DURATION")}`}
              />
            </div>
           
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbAttDeliverySub}
                selected={MedicalAttensionSub}
                select={setSelectMedicalAttensionSub}
                placeholder={`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-3">
              <CardLabel>
                {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbAttDelivery}
                selected={MedicalAttension}
                select={setSelectMedicalAttension}
                placeholder={`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
              />
            </div> */}
           
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_DELIVERY_METHOD")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbDeliveryMethod}
                selected={DeliveryMethod}
                select={setSelectDeliveryMethod}
                placeholder={`${t("CR_DELIVERY_METHORD")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_BIRTH_WEIGHT")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="BirthWeight"
                value={BirthWeight}
                onChange={setSelectBirthWeight}
                placeholder={`${t("CR_BIRTH_WEIGHT")}`}
                {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CR_INVALID_BIRTH_WEIGHT") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_RELIGION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbReligion}
                selected={Religion}
                select={setSelectReligion}
                placeholder={`${t("CS_COMMON_RELIGION")}`}
              />
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_DESCRIPTION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="BirthPlaceDeccription"
                value={BirthPlaceDeccription}
                onChange={setSelectBirthPlaceDeccription}
                placeholder={`${t("CR_DESCRIPTION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
              />
            </div>
            <div className="col-md-6 ">
              <CardLabel>
                {`${t("CR_DESCRIPTION_ML")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="BirthPlaceDeccriptionMl"
                value={BirthPlaceDeccriptionMl}
                onChange={setSelectBirthPlaceDeccriptionMl}
                placeholder={`${t("CR_DESCRIPTION_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_DESCRIPTION_ML"),
                })}
              />
            </div>
          </div>
        </div> */}

        {toast && (
          <Toast
            error={
              ReligionStError ||
              PregnancyDurationStError ||             
              MedicalAttensionSubStError ||
              DeliveryMethodStError ||
              ModeOfPregnancyStError || BirthWeightError
             
              
              // || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
            }
            label={
              ReligionStError ||
              PregnancyDurationStError ||
              MedicalAttensionSubStError ||
              DeliveryMethodStError ||
              ModeOfPregnancyStError || BirthWeightError
            
                ? //  || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
                  // InstitutionError || SignedOfficerInstError || signedOfficerDesgInstError
                  ReligionStError
                  ? t(`BIRTH_ERROR_RELIGION_CHOOSE`)
                  : PregnancyDurationStError
                  ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                  // : MedicalAttensionStError
                  // ? t(`BIRTH_ERROR_MEDICAL_ATTENSION_SUB_CHOOSE`) 
                  : MedicalAttensionSubStError
                  ? t(`BIRTH_ERROR_MEDICAL_ATTENSION_CHOOSE`)
                  : DeliveryMethodStError
                  ? t(`BIRTH_ERROR_DELIVERY_METHOD_CHOOSE`)
                  : ModeOfPregnancyStError
                  ? t(`BIRTH_ERROR_MODE_PREGNANCY_CHOOSE`)
                  : BirthWeightError
                  ? t(`BIRTH_WEIGHT_ERROR`)
                  // : BirthPlaceDeccriptionStError
                  // ? t(`BIRTH_ERROR_DESCRIPTION_EN_ERROR`)
                  // : BirthPlaceDeccriptionMlStError
                  // ? t(`BIRTH_ERROR_DESCRIPTION_ML_ERROR`)
                  : // : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                    // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                    setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
        {/* <div className="row">
                    <div className="col-md-12" > */}

        {/* <div className="col-md-4" ><CardLabel>{`${t("CR_EDUCATION_SUBJECT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualificationSub} selected={FatherEducationSubject} 
                            select={setSelectFatherEducationSubject} disable={isFatherInfo} />
                        </div> */}

        {/* </div>
                </div> */}
      </FormStep>
    </React.Fragment>
  );
};
export default StatisticalInformation;
