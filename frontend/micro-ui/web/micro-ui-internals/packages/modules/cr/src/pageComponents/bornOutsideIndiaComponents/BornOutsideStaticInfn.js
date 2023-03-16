import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast, SubmitBar } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/BOBRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const BornOutsideStaticInfn = ({ config, onSelect, userType, formData, isEditBirth }) => {
  // console.log(JSON.stringify(formData));  
  console.log(formData);
  const [isEditBirthPageComponents, setIsEditBirthPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : false);

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
 
  const { data: AttentionOfDelivery = {}, isAttentionOfDeliveryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AttentionOfDelivery");
  const { data: DeliveryMethodList = {}, isDeliveryMethodListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeliveryMethod");
 
 

  
  let cmbAttDeliverySub = [];
  let cmbDeliveryMethod = [];



  AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"] && AttentionOfDelivery["birth-death-service"].AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"].AttentionOfDelivery.map((ob) => {
      cmbAttDeliverySub.push(ob);
    });
  DeliveryMethodList &&
    DeliveryMethodList["birth-death-service"] && DeliveryMethodList["birth-death-service"].DeliveryMethod &&
    DeliveryMethodList["birth-death-service"].DeliveryMethod.map((ob) => {
      cmbDeliveryMethod.push(ob);
    });

  const [pregnancyDuration, setPregnancyDuration] = useState(formData?.ChildDetails?.pregnancyDuration ? formData?.ChildDetails?.pregnancyDuration : "");
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(formData?.ChildDetails?.medicalAttensionSub?.code ? formData?.ChildDetails?.medicalAttensionSub : formData?.ChildDetails?.medicalAttensionSub ?
    (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]) : "");
  // const [medicalAttensionSub, setMedicalAttensionSub] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]) : formData?.ChildDetails?.medicalAttensionSub);
  const [deliveryMethods, setDeliveryMethod] = useState(formData?.ChildDetails?.deliveryMethods?.code ? formData?.ChildDetails?.deliveryMethods : formData?.ChildDetails?.deliveryMethods ?
    (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]) : "");
  //  const [deliveryMethods, setDeliveryMethod] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]) : formData?.ChildDetails?.deliveryMethods);
  const [birthWeight, setBirthWeight] = useState(formData?.ChildDetails?.birthWeight ? formData?.ChildDetails?.birthWeight : null);

  const [toast, setToast] = useState(false);

  const [BirthWeightError, setBirthWeightError] = useState(formData?.ChildDetails?.birthWeight ? false : false);
  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(formData?.ChildDetails?.medicalAttensionSub ? false : false);

  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(formData?.ChildDetails?.deliveryMethods ? false : false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.ChildDetails?.pregnancyDuration ? false : false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(formData?.ChildDetails?.pregnancyDuration ? false : false);
 
  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

 

  
  
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildMiddleNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildLastNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
 

  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setSelectChildFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildFirstNameMl('');
    }
    else {
      setChildFirstNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildMiddleNameMl('');
    }
    else {
      setChildMiddleNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildLastNameMl('');
    }
    else {
      setChildLastNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectPregnancyDuration(e) {
    setPregnancyDuration(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  }
 
  function setSelectMedicalAttensionSub(value) {
    setMedicalAttensionSub(value);
  }
 

  
 
    
 
  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
  }
  
  function setSelectBirthWeight(e) {
    if (e.target.value.length === 5) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setBirthWeight(e.target.value);
     

    }
  }
  let validFlag = true;
  const goNext = () => {
 
    if (birthWeight != null || birthWeight != "" || birthWeight != undefined) {
      let BirthWeightCheck = birthWeight;
      if (BirthWeightCheck < 0.25 || BirthWeightCheck > 10) {
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
      setBirthWeightError(true);
      validFlag = false;
      setBirthWeightError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (medicalAttensionSub == null || medicalAttensionSub == "" || medicalAttensionSub == undefined) {
      validFlag = false;
      setMedicalAttensionSubStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMedicalAttensionSubStError(false);
    }
    if (pregnancyDuration == null || pregnancyDuration == "" || pregnancyDuration == undefined) {
      validFlag = false;
      setPregnancyDurationStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      if (pregnancyDuration < 20 || pregnancyDuration > 44) {
        validFlag = false;
        setPregnancyDurationInvalidError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setPregnancyDurationStError(false);
        setPregnancyDurationInvalidError(false);
      }
    }
    if (deliveryMethods == null || deliveryMethods == "" || deliveryMethods == undefined) {
      validFlag = false;
      setDeliveryMethodStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeliveryMethodStError(false);
    }
    if (validFlag == true) {
 
   
      sessionStorage.setItem("birthWeight", birthWeight ? birthWeight : null);
      sessionStorage.setItem("pregnancyDuration", pregnancyDuration ? pregnancyDuration.code : null);
      sessionStorage.setItem("medicalAttensionSub", medicalAttensionSub ? medicalAttensionSub.code : null);
      sessionStorage.setItem("deliveryMethods", deliveryMethods ? deliveryMethods.code : null);
      let IsEditChangeScreen = (isEditBirth ? isEditBirth : false);
      onSelect(config.key, {
      
        birthWeight, pregnancyDuration, medicalAttensionSub, deliveryMethods, IsEditChangeScreen
      });
    }
  };
  // if (isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined)) {

    
   
  //   if (formData?.ChildDetails?.medicalAttensionSub != null) {
  //     if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
  //       setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]);
  //     }
  //   }
  
  //   if (formData?.ChildDetails?.deliveryMethods != null) {
  //     if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
  //       // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.ChildDetails?.deliveryMethods)[0]);
  //       setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]);
  //     }
  //   }
  // }

  if (  isAttentionOfDeliveryLoading || isDeliveryMethodListLoading ) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={
           !medicalAttensionSub || !deliveryMethods || birthWeight == null || pregnancyDuration === ""}> 
       
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_BIRTH_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} <span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbAttDeliverySub}
                  selected={medicalAttensionSub}
                  select={setSelectMedicalAttensionSub}
                  placeholder={`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
                />
              </div>
              
              <div className="col-md-3">
                <CardLabel>{`${t("CR_PREGNANCY_DURATION")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="pregnancyDuration"
                  value={pregnancyDuration}
                  onChange={setSelectPregnancyDuration}
                  placeholder={`${t("CR_PREGNANCY_DURATION")}`}
                  {...(validation = {
                    pattern: "^[0-9`' ]*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_PREGNANCY_DURATION"),
                  })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_DELIVERY_METHOD")}`} <span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbDeliveryMethod}
                  selected={deliveryMethods}
                  select={setSelectDeliveryMethod}
                  placeholder={`${t("CR_DELIVERY_METHOD")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_BIRTH_WEIGHT")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"decimal"}
                  optionKey="i18nKey"
                  name="birthWeight"
                  value={birthWeight}
                  onChange={setSelectBirthWeight}
                  placeholder={`${t("CR_BIRTH_WEIGHT")}`}
                  {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "decimal", title: t("CR_INVALID_BIRTH_WEIGHT") })}
                />
              </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={
           
                MedicalAttensionSubStError || DeliveryMethodStError || BirthWeightError
                || PregnancyDurationStError || PregnancyDurationInvalidError


              }
              label={
               
                  MedicalAttensionSubStError || DeliveryMethodStError || BirthWeightError
                  || PregnancyDurationStError || PregnancyDurationInvalidError
                  ?
                
                                                           BirthWeightError ? t(`BIRTH_WEIGHT_ERROR`)
                                                            : MedicalAttensionSubStError ? t(`BIRTH_ERROR_MEDICAL_ATTENSION_CHOOSE`)
                                                              : PregnancyDurationStError ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                                                                : PregnancyDurationInvalidError ? t(`BIRTH_ERROR_PREGNANCY_DURATION_INVALID_CHOOSE`)
                                                                  : DeliveryMethodStError ? t(`BIRTH_ERROR_DELIVERY_METHOD_CHOOSE`)


                                                                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
  }
};
export default BornOutsideStaticInfn;