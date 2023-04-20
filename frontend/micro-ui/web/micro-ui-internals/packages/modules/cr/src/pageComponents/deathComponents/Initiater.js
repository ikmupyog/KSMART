import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";

import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const Initiater = ({ config, onSelect, userType, formData, isEditDeath }) => {
  const stateId = Digit.ULBService.getStateId();
  // console.log(isEditDeath);
  console.log(formData);

  const { t } = useTranslation();
  let validation = {};
  const cmbRelation = [
    { i18nKey: "Father", code: "FATHER" },
    { i18nKey: "Mother", code: "MOTHER" },
    { i18nKey: "Others", code: "OTHERS" },
  ];  
  const [IsDeclarationInitiator, setIsDeclarationInitiator] = useState(
 formData?.Initiator?.IsDeclarationInitiator ? formData?.Initiator?.IsDeclarationInitiator : false
   );
  // const [isDeclarationInfotwo, setIsDeclarationInfotwo] = useState(
  //   formData?.Initiator?.isDeclarationInfotwo ? formData?.Initiator?.isDeclarationInfotwo : false
  // );
  const { name: name, } = Digit.UserService.getUser().info;
  const { mobileNumber: mobileNumber, } = Digit.UserService.getUser().info; 
 // const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.Initiator?.isInitiatorDeclaration ? formData?.Initiator?.isInitiatorDeclaration :  false);
  const [isCaretaker, setIsCaretaker] = useState(formData?.Initiator?.isCaretaker ? formData?.Initiator?.isCaretaker :  false);
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.Initiator?.isInitiatorDeclaration ? formData?.Initiator?.isInitiatorDeclaration : formData?.InformationDeath?.Initiator?.isInitiatorDeclaration ? formData?.InformationDeath?.Initiator?.isInitiatorDeclaration : false);
  const [InitiatorAadhaar, setInitiatorAadhaar] = useState(formData?.Initiator?.InitiatorAadhaar ? formData?.Initiator?.InitiatorAadhaar : formData?.InformationDeath?.Initiator?.InitiatorAadhaar ? formData?.InformationDeath?.Initiator?.InitiatorAadhaar :"");
  const [InitiatorName, setInitiatorName] = useState(formData?.Initiator?.InitiatorName ? formData?.Initiator?.InitiatorName : formData?.InformationDeath?.Initiator?.InitiatorName ? formData?.InformationDeath?.Initiator?.InitiatorName : name);
  const [InitiatorRelation, setInitiatorRelation] = useState(formData?.Initiator?.InitiatorRelation.code ? formData?.Initiator?.InitiatorRelation : formData?.Initiator?.relation ? cmbRelation.filter(cmbRelation => cmbRelation.code === formData?.Initiator?.relation)[0] : "");
  const [InitiatorMobile, setInitiatorMobile] = useState(formData?.Initiator?.InitiatorMobile ? formData?.Initiator?.InitiatorMobile : 
    formData?.InformationDeath?.Initiator?.InitiatorMobile ? formData?.InformationDeath?.Initiator?.InitiatorMobile :mobileNumber);
  const [InitiatorAddress, setInitiatorAddress] = useState(formData?.Initiator?.InitiatorAddress ? formData?.Initiator?.InitiatorAddress : 
    formData?.InformationDeath?.Initiator?.InitiatorAddress ? formData?.InformationDeath?.Initiator?.InitiatorAddress :"");
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.Initiator?.initiatorDesi ? formData?.Initiator?.initiatorDesi :
    formData?.InformationDeath?.Initiator?.initiatorDesi ? formData?.InformationDeath?.Initiator?.initiatorDesi :  "");
  const [isDisableEdit, setisDisableEdit] = useState(isEditDeath ? false : false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);

  const [InitiaterRelationError, setInitiaterRelationError] = useState(formData?.Initiator?.InitiatorRelation ? false : false);
  const [InitiaterNameError, setInitiaterNameError] = useState(formData?.Initiator?.InitiatorName ? false : false);
  const [InitiaterAadharError, setInitiaterAadharError] = useState(formData?.Initiator?.InitiatorAadhaar ? false : false);
  const [InitiaterMobileError, setInitiaterMobileError] = useState(formData?.Initiator?.InitiatorMobile ? false : false);

  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.Initiator?.IsDeclarationInitiator != null) {
        setIsInitialRender(false);
        setIsDeclarationInitiator(formData?.Initiator?.IsDeclarationInitiator);
      }
      if (formData?.Initiator?.isCaretaker != null) {
        setIsInitialRender(false);
        setIsCaretaker(formData?.Initiator?.isCaretaker);
      }
    }
  }, [isInitialRender]);




  function setselectIsDeclarationInitiator(e) {
    if (e.target.checked == true) {
      setIsDeclarationInitiator(e.target.checked);
    } else {
      setIsDeclarationInitiator(e.target.checked);
    }
  }
  // function setDeclarationInfotwo(e) {
  //   if (e.target.checked == true) {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   } else {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   }
  // }

  function setSelectInitiatorAadhaar(e) {
    if (e.target.value.trim().length >= 0) {
      setInitiatorAadhaar(e.target.value.trim().length <= 12 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  function setSelectInitiatorName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setInitiatorName(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectInitiatorRelation(value) {
    setInitiatorRelation(value);
  }
  

  function setSelectInitiatorMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setInitiatorMobile(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectInitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9 ]*$") != null) {
      setInitiatorAddress(e.target.value.length <= 250 ? e.target.value : e.target.value.substring(0, 250));
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
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  let validFlag = true;
  const goNext = () => {
    // if (InitiatorRelation == null || InitiatorRelation == "" || InitiatorRelation == undefined) {
    //   validFlag = false;
    //   setInitiaterRelationError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setInitiaterRelationError(false);
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

   

    if (InitiatorAadhaar.trim() == null || InitiatorAadhaar.trim() == '' || InitiatorAadhaar.trim() == undefined) {
      setInitiatorAadhaar("");
    } else if (InitiatorAadhaar != null && InitiatorAadhaar != "") {
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
    }



    if (InitiatorMobile == null || InitiatorMobile == "" || InitiatorMobile == undefined) {
      validFlag = false;
      setInitiaterMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiaterMobileError(false);
    }

    if (validFlag == true) {
      // sessionStorage.setItem("IsDeclarationInitiator", IsDeclarationInitiator ? IsDeclarationInitiator : null);
      // // sessionStorage.setItem("isDeclarationInfotwo", isDeclarationInfotwo ? isDeclarationInfotwo : null);
      // sessionStorage.setItem("InitiatorRelation", InitiatorRelation ? InitiatorRelation : null);
      // sessionStorage.setItem("InitiatorName", InitiatorName ? InitiatorName : null);
      // sessionStorage.setItem("InitiatorAadhaar", InitiatorAadhaar ? InitiatorAadhaar : null);
      // sessionStorage.setItem("InitiatorMobile", InitiatorMobile ? InitiatorMobile : null);
      // sessionStorage.setItem("InitiatorAddress", InitiatorAddress ? InitiatorAddress : null);

      onSelect(config.key, {
        IsDeclarationInitiator,
        // isDeclarationInfotwo,
        InitiatorName,
        InitiatorRelation,
        InitiatorAadhaar,
        InitiatorMobile,
        InitiatorAddress,        
        isCaretaker,
        initiatorDesi        
      });
    }
  };
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {/* {window.location.href.includes("/citizen/cr-death-creation/initiator") || window.location.href.includes("/employee/cr-death-creation/initiator") ? <Timeline currentStep={5} /> : null} */}
      
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}  isDisabled={!InitiatorName || !InitiatorAadhaar || !InitiatorMobile || !InitiatorAddress
      }>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_DETAILS")}`}</span>
            </h1>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setselectIsDeclarationInitiator}
                value={IsDeclarationInitiator}
                checked={IsDeclarationInitiator}
              />
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <CheckBox label={t("CR_INITIATOR_IS_CARETAKER")} onChange={setCaretaker} value={isCaretaker} checked={isCaretaker} />
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAddress"
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div> */}
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
                    // disable={isDisableEdit}
                    placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                    //            disable={isCaretaker}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
                  />
                </div>
              </div>
            )}
            {isCaretaker === false && (
              <div className="col-md-3">
              <CardLabel>
                {`${t("CR_RELATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              {/* <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorRelation"
                value={InitiatorRelation}
                onChange={setSelectInitiatorRelation}
                placeholder={`${t("CR_RELATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_RELATION") })}
              /> */}
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbRelation}
                  selected={InitiatorRelation}
                  select={setSelectInitiatorRelation}
                  placeholder={`${t("CR_RELATION")}`}
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
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="InitiatorAadhaar"
                value={InitiatorAadhaar}
                onChange={setSelectInitiatorAadhaar}
                onKeyPress={setCheckSpecialChar}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INITIATOR_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorName"
                value={InitiatorName}
                onChange={setSelectInitiatorName}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="InitiatorMobile"
                value={InitiatorMobile}
                onChange={setSelectInitiatorMobile}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorAddress"
                value={InitiatorAddress}
                onChange={setSelectInitiatorAddress}
                placeholder={`${t("CR_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>
          </div>
        </div> */}

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
            error={InitiaterNameError || InitiaterAadharError || InitiaterMobileError || InitiaterRelationError}
            label={
              InitiaterNameError || InitiaterAadharError || InitiaterMobileError || InitiaterRelationError
                ? InitiaterNameError
                  ? t(`CR_ERROR_INITIATER_NAME_CHOOSE`)
                  : InitiaterAadharError
                  ? t(`CR_ERROR_INITIATER_AADHAR_CHOOSE`)
                  : InitiaterMobileError
                  ? t(`CR_ERROR_INITIATER_MOBILE_CHOOSE`)
                  : InitiaterRelationError
                  ? t(`CR_ERROR_INITIATER_RELATION_CHOOSE`)
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
