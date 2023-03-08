import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";

import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const Initiater = ({ config, onSelect, userType, formData,iseditDeath }) => {
  const stateId = Digit.ULBService.getStateId();
  console.log(iseditDeath);
  console.log(formData);

  const { t } = useTranslation();
  let validation = {};

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [IsDeclarationInitiator, setIsDeclarationInitiator] = useState(
    formData?.Initiator?.IsDeclarationInitiator ? formData?.Initiator?.IsDeclarationInitiator : false
  );
  // const [isDeclarationInfotwo, setIsDeclarationInfotwo] = useState(
  //   formData?.Initiator?.isDeclarationInfotwo ? formData?.Initiator?.isDeclarationInfotwo : false
  // );
  const [InitiatorAadhaar, setInitiatorAadhaar] = useState(formData?.Initiator?.InitiatorAadhaar ? formData?.Initiator?.InitiatorAadhaar : "");  
  const [InitiatorName, setInitiatorName] = useState(formData?.Initiator?.InitiatorName ? formData?.Initiator?.InitiatorName : "" );
  const [InitiatorRelation, setInitiatorRelation] = useState(formData?.Initiator?.InitiatorRelation ? formData?.Initiator?.InitiatorRelation : "");
  const [InitiatorMobile, setInitiatorMobile] = useState(formData?.Initiator?.InitiatorMobile ? formData?.Initiator?.InitiatorMobile : "");
  const [InitiatorAddress, setInitiatorAddress] = useState(formData?.Initiator?.InitiatorAddress ? formData?.Initiator?.InitiatorAddress : ""  );  
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
      // if (formData?.Initiator?.isDeclarationInfotwo != null) {
      //   setIsInitialRender(false);
      //   setIsDeclarationInfotwo(formData?.Initiator?.isDeclarationInfotwo);
      // }
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
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        return false;
      } else if (e.target.value.length < 12) {
        setInitiatorAadhaar(e.target.value);
        return false;
      } else {
        setInitiatorAadhaar(e.target.value);
      }
    } else {
      setInitiatorAadhaar(e.target.value);
    }
  }
  function setSelectInitiatorName(e) {
    if (e.target.value.length === 51) {
      return false;      
    } else {
      setInitiatorName(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectInitiatorRelation(e) {
    if (e.target.value.length === 51) {
      return false;      
    } else {
      setInitiatorRelation(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }

  function setSelectInitiatorMobile(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        setInitiatorMobile(e.target.value);
        return false;
      } else {
        setInitiatorMobile(e.target.value);
      }
    } else {
      setInitiatorMobile(e.target.value);
    }
  }
  function setSelectInitiatorAddress(e) {
    if (e.target.value.length === 251) {
      return false;      
    } else {
      setInitiatorAddress(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));

    }
  }  

  let validFlag = true;
  const goNext = () => {
    if (InitiatorRelation == null || InitiatorRelation == "" || InitiatorRelation == undefined) {
      validFlag = false;
      setInitiaterRelationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiaterRelationError(false);
    }
   
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


    if (InitiatorAadhaar == null || InitiatorAadhaar == "" || InitiatorAadhaar == undefined) {
      validFlag = false;
      setInitiaterAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiaterAadharError(false);
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
      
      sessionStorage.setItem("IsDeclarationInitiator", IsDeclarationInitiator ? IsDeclarationInitiator : null);
      // sessionStorage.setItem("isDeclarationInfotwo", isDeclarationInfotwo ? isDeclarationInfotwo : null);      
      sessionStorage.setItem("InitiatorRelation", InitiatorRelation ? InitiatorRelation : null);
      sessionStorage.setItem("InitiatorName", InitiatorName ? InitiatorName : null);
      sessionStorage.setItem("InitiatorAadhaar", InitiatorAadhaar ? InitiatorAadhaar : null);
      sessionStorage.setItem("InitiatorMobile", InitiatorMobile ? InitiatorMobile : null); 
      sessionStorage.setItem("InitiatorAddress", InitiatorAddress ? InitiatorAddress : null);       
       
      onSelect(config.key, {
        IsDeclarationInitiator,
        // isDeclarationInfotwo,
        InitiatorName,
        InitiatorRelation,
        InitiatorAadhaar,
        InitiatorMobile,       
        InitiatorAddress,        
      });
    }
  };
  return (
    <React.Fragment>
      <BackButton >{t("CS_COMMON_BACK")}</BackButton> 
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
       <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!IsDeclarationInitiator}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_DETAILS")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            
            <CheckBox label={t("CR_INITIATOR_DECLARATION_STATEMENT")} onChange={setselectIsDeclarationInitiator} value={IsDeclarationInitiator} checked={IsDeclarationInitiator} />
            {/* <CheckBox label={t("TestDescription")} onChange={setDeclarationInfotwo} value={isDeclarationInfotwo} checked={isDeclarationInfotwo} /> */}
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENTS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("TestDocuments")} onChange={setDeclarationInfoone} value={isDeclarationInfoone} checked={isDeclarationInfoone} />
          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(" CR_INITIATOR_DETAILS")}`}</span>
            </h1>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
          <div className="col-md-3">
              <CardLabel>
                {`${t("CR_RELATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorRelation"
                value={InitiatorRelation}
                onChange={setSelectInitiatorRelation}
                disable={isEdit}
                placeholder={`${t("CR_RELATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_RELATION") })}
              />
            </div>
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
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                disable={isEdit}
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
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "number", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-6">
              <CardLabel>{`${t("CR_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InitiatorAddress"
                value={InitiatorAddress}
                onChange={setSelectInitiatorAddress}
                disable={isEdit}
                placeholder={`${t("CR_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>
          </div>
        </div> 
        {toast && (
          <Toast
            error={InitiaterNameError || InitiaterAadharError || InitiaterMobileError || InitiaterRelationError }
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
