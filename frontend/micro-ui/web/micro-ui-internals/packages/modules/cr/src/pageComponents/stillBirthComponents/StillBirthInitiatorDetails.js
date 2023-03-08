import React, { useState, useEffect } from "react";
import Timeline from "../../components/SBRTimeline";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const StillBirthInitiatorDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.StillBirthInitiatorDetails?.isInitiatorDeclaration ? formData?.StillBirthInitiatorDetails?.isInitiatorDeclaration : false);
  const [isCaretaker, setIsCaretaker] = useState(formData?.StillBirthInitiatorDetails?.isCaretaker ? formData?.StillBirthInitiatorDetails?.isCaretaker : false);
  const [relation, setrelation] = useState(formData?.StillBirthInitiatorDetails?.relation ? formData?.StillBirthInitiatorDetails?.relation : "");
  const [initiatorNameEn, setinitiatorNameEn] = useState(formData?.StillBirthInitiatorDetails?.initiatorNameEn ? formData?.StillBirthInitiatorDetails?.initiatorNameEn : "");
  const [initiatorAadhar, setinitiatorAadhar] = useState(formData?.StillBirthInitiatorDetails?.initiatorAadhar ? formData?.StillBirthInitiatorDetails?.initiatorAadhar : "");
  const [initiatorMobile, setinitiatorMobile] = useState(formData?.StillBirthInitiatorDetails?.initiatorMobile ? formData?.StillBirthInitiatorDetails?.initiatorMobile : "");
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.StillBirthInitiatorDetails?.initiatorDesi ? formData?.StillBirthInitiatorDetails?.initiatorDesi : "");
  const [initiatorAddress, setinitiatorAddress] = useState(formData?.StillBirthInitiatorDetails?.initiatorAddress ? formData?.StillBirthInitiatorDetails?.initiatorAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.StillBirthInitiatorDetails?.initiatorNameEn ? false : false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(formData?.StillBirthInitiatorDetails?.initiatorAadhar ? false : false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(formData?.StillBirthInitiatorDetails?.initiatorMobile ? false : false);
  const [initiatorDesiError, setinitiatorDesiError] = useState(formData?.StillBirthInitiatorDetails?.initiatorDesi ? false : false);
 
  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.StillBirthInitiatorDetails?.isInitiatorDeclaration != null) {
        setIsInitialRender(false);
        setisInitiatorDeclaration(formData?.StillBirthInitiatorDetails?.isInitiatorDeclaration);
      }
      if (formData?.StillBirthInitiatorDetails?.isCaretaker != null) {
        setIsInitialRender(false);
        setIsCaretaker(formData?.StillBirthInitiatorDetails?.isCaretaker);
      }
    }
  }, [isInitialRender]);

  let userInfo = window.localStorage.getItem("user-info");
  console.log(JSON.stringify(userInfo).id);

  function setSelectrelation(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setrelation(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectinitiatorNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setinitiatorNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setinitiatorDesi(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectinitiatorAddress(e) {
    if (e.target.value.length === 251) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setinitiatorAddress(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }


  function setSelectinitiatorAadhar(e) {
    setinitiatorAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setinitiatorAadharError(true);
        return false;
      } else if (e.target.value.length < 12) {
        setinitiatorAadharError(true);
        setinitiatorAadhar(e.target.value);
        return false;
      } else {
        setinitiatorAadharError(false);
        setinitiatorAadhar(e.target.value);
        return true;
      }
    } else {
      setinitiatorAadharError(false);
      setinitiatorAadhar(e.target.value);
      return true;
    }
  }
  // function setSelectinitiatorAadhar(e) {

  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 12) {
  //       return false;
  //     } else if (e.target.value.length < 12) {
  //       setinitiatorAadhar(e.target.value);
  //       return false;
  //     } else {
  //       setinitiatorAadhar(e.target.value);
  //     }
  //   } else {
  //     setinitiatorAadhar(e.target.value);
  //   }
  // }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
  // function setSelectinitiatorMobile(e) {
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 10) {
  //       return false;
  //     } else if (e.target.value.length < 10) {
  //       setinitiatorMobile(e.target.value);
  //       return false;
  //     } else {
  //       setinitiatorMobile(e.target.value);
  //     }
  //   } else {
  //     setinitiatorMobile(e.target.value);
  //   }
  // }

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
    // if (relation == null || relation == "" || relation == undefined) {
    //   validFlag = false;
    //   setrelationnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setrelationnError(false);
    // }
    if (initiatorNameEn == null || initiatorNameEn == "" || initiatorNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
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

    if (initiatorAadhar == null || initiatorAadhar == "" || initiatorAadhar == undefined) {
      validFlag = false;
      setinitiatorAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinitiatorAadharError(false);
    }
    if (initiatorMobile == null || initiatorMobile == "" || initiatorMobile == undefined) {
      validFlag = false;
      setinitiatorMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinitiatorMobileError(false);
    }

    if (validFlag == true) {
      sessionStorage.setItem("relation", relation ? relation : null);
      sessionStorage.setItem("initiatorNameEn", initiatorNameEn ? initiatorNameEn : null);
      sessionStorage.setItem("initiatorAadhar", initiatorAadhar ? initiatorAadhar : null);

      sessionStorage.setItem("initiatorMobile", initiatorMobile ? initiatorMobile : null);
      sessionStorage.setItem("initiatorDesi", initiatorDesi ? initiatorDesi : null);
      sessionStorage.setItem("initiatorAddress", initiatorAddress ? initiatorAddress : null);
      sessionStorage.setItem("isInitiatorDeclaration", isInitiatorDeclaration ? isInitiatorDeclaration : null);
      sessionStorage.setItem("isCaretaker", isCaretaker ? isCaretaker : null);

      onSelect(config.key, {
        relation,
        initiatorNameEn,
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi,
        initiatorAddress,
        isInitiatorDeclaration,
        isCaretaker,
      });
    }
  };
  console.log(formData);
  return (
    <React.Fragment>
       <BackButton>{t("CS_COMMON_BACK")}</BackButton>
       {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={
        !isInitiatorDeclaration || !initiatorNameEn || !initiatorAadhar || !initiatorMobile
        }>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
          <div className="col-md-12">
            <CheckBox
              label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
              onChange={setDeclarationInfo}
              value={isInitiatorDeclaration}
              checked={isInitiatorDeclaration}
            />
          </div>
        </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
        <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{`${t("CR_RELATION")}`}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="relation"
                value={relation}
                onChange={setSelectrelation}
                placeholder={`${t("CR_RELATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RELATION") })}
              />
            </div>

            <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_AADHAAR")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="initiatorAadhar"
                value={initiatorAadhar}
                onChange={setSelectinitiatorAadhar}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_INITIATOR_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorNameEn"
                value={initiatorNameEn}
                onChange={setSelectinitiatorNameEn}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
              />
            </div>
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
                    placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                   //            disable={isCaretaker}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
                  />
                </div>
              </div>
            )}
 
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="initiatorMobile"
                value={initiatorMobile}
                onChange={setSelectinitiatorMobile}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
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
        <div className="col-md-6">
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
            </div>
        </div>
        </div>    
        {toast && (
          <Toast
            error={infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError}
            label={
              infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError
                ? infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : initiatorAadharError
                  ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                  : initiatorMobileError
                  ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
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
export default StillBirthInitiatorDetails;
