import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast, LanguageIcon } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import Timeline from "../../components/DRTimeline";
import { sortDropdownNames } from "../../utils";

const Initiater = ({ config, onSelect, userType, formData, isEditDeath = false }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
//  console.log(isEditDeath);
  const { t } = useTranslation();
  let validation = {};
  const cmbInitiatorRelation = [
    { i18nKey: "Father", code: "FATHER" },
    { i18nKey: "Mother", code: "MOTHER" },
    { i18nKey: "Others", code: "OTHERS" },
  ];  
  // console.log(Digit.UserService.getUser().info);
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const { name: name, } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const { mobileNumber: mobileNumber, } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const [IsDeclarationInitiator, setisInitiatorDeclaration] = useState(formData?.Initiator?.IsDeclarationInitiator ? formData?.Initiator?.IsDeclarationInitiator : formData?.InformationDeath?.Initiator?.IsDeclarationInitiator ? formData?.InformationDeath?.Initiator?.IsDeclarationInitiator : false);
  const [isCaretaker, setIsCaretaker] = useState(formData?.Initiator?.isCaretaker ? formData?.Initiator?.isCaretaker : formData?.InformationDeath?.Initiator?.isCaretaker ? formData?.InformationDeath?.Initiator?.isCaretaker : false);
  //const [InitiatorRelation, setInitiatorRelation] = useState(formData?.Initiator?.InitiatorRelation.code ? formData?.Initiator?.InitiatorRelation : formData?.InformationDeath?.Initiator?.InitiatorRelation ? cmbInitiatorRelation.filter(cmbInitiatorRelation => cmbInitiatorRelation.code === formData?.InformationDeath?.Initiator?.InitiatorRelation)[0] : "");
  const [InitiatorRelation, setInitiatorRelation] = useState(formData?.Initiator?.InitiatorRelation.code ? formData?.Initiator?.InitiatorRelation : formData?.InformationDeath?.Initiator?.InitiatorRelation ? cmbInitiatorRelation.filter(cmbInitiatorRelation => cmbInitiatorRelation.code === formData?.InformationDeath?.Initiator?.relation)[0] : "");
 
  const [InitiatorName, setInitiatorName] = useState(formData?.Initiator?.InitiatorName ? formData?.Initiator?.InitiatorName : formData?.InformationDeath?.Initiator?.InitiatorName ? formData?.InformationDeath?.Initiator?.InitiatorName : name);
  const [InitiatorAadhaar, setInitiatorAadhaar] = useState(formData?.Initiator?.InitiatorAadhaar ? formData?.Initiator?.InitiatorAadhaar : formData?.InformationDeath?.Initiator?.InitiatorAadhaar ? formData?.InformationDeath?.Initiator?.InitiatorAadhaar : "");
  const [InitiatorMobile, setInitiatorMobile] = useState(formData?.Initiator?.InitiatorMobile ? formData?.Initiator?.InitiatorMobile : formData?.InformationDeath?.Initiator?.InitiatorMobile ? formData?.InformationDeath?.Initiator?.InitiatorMobile : mobileNumber);
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.Initiator?.initiatorDesi ? formData?.Initiator?.initiatorDesi : formData?.InformationDeath?.Initiator?.initiatorDesi ? formData?.InformationDeath?.Initiator?.initiatorDesi : "");
  const [InitiatorAddress, setInitiatorAddress] = useState(formData?.Initiator?.InitiatorAddress ? formData?.Initiator?.InitiatorAddress : formData?.InformationDeath?.Initiator?.InitiatorAddress ? formData?.InformationDeath?.Initiator?.InitiatorAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [toast, setToast] = useState(false);
  const [InitiaterNameError, setInitiaterNameError] = useState(formData?.Initiator?.InitiatorName ? false : false);
  const [InitiaterAadharError, setInitiaterAadharError] = useState(formData?.Initiator?.InitiatorAadhaar ? false : false);
  const [InitiaterMobileError, setInitiaterMobileError] = useState(formData?.Initiator?.InitiatorMobile ? false : false);
  const [initiatorDesiError, setinitiatorDesiError] = useState(formData?.Initiator?.initiatorDesi ? false : false);

  const onSkip = () => onSelect();
  
  useEffect(() => {
    if (isInitialRender) {
      if (formData?.Initiator?.IsDeclarationInitiator != null) {
        setIsInitialRender(false);
        setisInitiatorDeclaration(formData?.Initiator?.IsDeclarationInitiator);
      }
      if (formData?.Initiator?.isCaretaker != null) {
        setIsInitialRender(false);
        setIsCaretaker(formData?.Initiator?.isCaretaker);
      }
    }
  }, [isInitialRender]);

  function setSelectInitiatorRelation(value) {
    setInitiatorRelation(value);
  }

  // function setSelectInitiatorRelation(e) {
  //   if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
  //     setInitiatorRelation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
  //   }
  // }

  function setSelectInitiatorName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setInitiatorName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectInitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9, ]*$") != null)) {
      setInitiatorAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }


  // function setSelectInitiatorAadhaar(e) {
  //   if (e.target.value.trim().length >= 0) {
  //     setInitiatorAadhaar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
  //   }
  // }

  function setSelectInitiatorAadhaar(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if ( newValue === formData?.InformationDeath?.DeceasedAadharNumber) {
      // If so, clear the Father's Aadhar number field
      setInitiatorAadhaar("");
      setInitiaterAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }else
    {
      setInitiatorAadhaar(newValue);
    }      
  }

  function setSelectInitiatorMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setInitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
 

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }

  function setCaretaker(e) {
    if (e.target.checked == true) {
      setIsCaretaker(e.target.checked);

      setinitiatorDesi("");

    } else {
      setIsCaretaker(e.target.checked);
    }
  }

  let validFlag = true;
  const goNext = () => {
    // if (InitiatorRelation == null || InitiatorRelation == "" || InitiatorRelation == undefined) {
    //   validFlag = false;
    //   setInitiatorRelationnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setInitiatorRelationnError(false);
    // }
    if (InitiatorName == null || InitiatorName == "" || InitiatorName == undefined) {
      validFlag = false;
      setInitiaterNameError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiaterNameError(false);
    }
    if (isCaretaker === true) {


      if (initiatorDesi == null || initiatorDesi == "" || initiatorDesi == undefined) {
        validFlag = false;
        setinitiatorDesiError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorDesiError(false);
      }
    }
    if (InitiatorAadhaar != null || InitiatorAadhaar != "" || InitiatorAadhaar != undefined) {
      let adharLength = InitiatorAadhaar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setInitiaterAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setInitiaterAadharError(false);
      }
    } else {
      validFlag = false;
      setInitiaterAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (InitiatorMobile != null || InitiatorMobile != "" || InitiatorMobile != undefined) {
      let mobileLength = InitiatorMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setInitiaterMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setInitiaterMobileError(false);
      }
    } else {
      validFlag = false;
      setInitiaterMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (validFlag == true) {

      onSelect(config.key, {
        InitiatorRelation,
        InitiatorName : InitiatorName.trim(),
        InitiatorAadhaar,
        InitiatorMobile,
        initiatorDesi : initiatorDesi.trim(),
        InitiatorAddress: InitiatorAddress.trim(),
        IsDeclarationInitiator,
        isCaretaker,
      });
    }
  };
  return (
    <React.Fragment>
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}

      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} 
      isDisabled={!InitiatorName || !InitiatorAadhaar || !InitiatorMobile 
        || (isCaretaker === true ? (initiatorDesi === "" || InitiatorAddress === "") : false)
      }>
        

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <CheckBox label={t("CR_INITIATOR_IS_CARETAKER")} onChange={setCaretaker} value={isCaretaker} checked={isCaretaker} />
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {isCaretaker === true && (
              <div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_INSTITUTION_NAME_DESIGNATION")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    optionKey="i18nKey"
                    name="initiatorDesi"
                    value={initiatorDesi}
                    onChange={setSelectinitiatorDesi}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                    //            disable={isCaretaker}
                    {...(validation = { pattern: "[a-zA-Z0-9_-]+", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
                  />
                </div>
              </div>
            )}
            {isCaretaker === false && (
              <div className="col-md-3">
               
                <CardLabel>{`${t("CR_InitiatorRelation")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={sortDropdownNames(cmbInitiatorRelation ? cmbInitiatorRelation : [],"code",t)}
                  selected={InitiatorRelation}
                  select={setSelectInitiatorRelation}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_InitiatorRelation")}`}
                />
              </div>
            )}
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_AADHAAR")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorAadhaar"
                value={InitiatorAadhaar}
                onChange={setSelectInitiatorAadhaar}
                disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INITIATOR_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorName"
                value={InitiatorName}
                onChange={setSelectInitiatorName}
                disable={isDisableEdit}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "[a-zA-Z0-9_- ]+", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="InitiatorMobile"
                value={InitiatorMobile}
                onChange={setSelectInitiatorMobile}
                disable={isDisableEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
            {isCaretaker === true && (
              <CardLabel>{`${t("CR_CARE_TAKER_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
            )}
             {isCaretaker === false && (
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
            )}
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorAddress"
                value={InitiatorAddress}
                onChange={setSelectInitiatorAddress}
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-0-9, ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>


        {toast && (
          <Toast
            error={InitiaterNameError || InitiaterAadharError || InitiaterMobileError || initiatorDesiError}
            label={
              InitiaterNameError || InitiaterAadharError || InitiaterMobileError || initiatorDesiError
                ? InitiaterNameError
                  ? t(`CR_ERROR_INITIATER_NAME_CHOOSE`)
                  : InitiaterAadharError
                    ? t(`CR_ERROR_INITIATER_AADHAR_CHOOSE`)
                    : InitiaterMobileError
                      ? t(`CR_ERROR_INITIATER_MOBILE_CHOOSE`)
                      : initiatorDesiError
                        ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
                        : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
      </FormStep>
    </React.Fragment>
  );
};
export default Initiater;
