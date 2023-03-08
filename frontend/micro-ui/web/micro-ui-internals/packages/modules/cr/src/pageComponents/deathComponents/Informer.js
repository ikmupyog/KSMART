import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const Informer = ({ config, onSelect, userType, formData,iseditDeath }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [IsDeclarationInformer, setIsDeclarationInformer] = useState(
    formData?.InformantDetails?.IsDeclarationInformer ? formData?.InformantDetails?.IsDeclarationInformer : false
  );
  // const [isDeclarationInfotwo, setIsDeclarationInfotwo] = useState(
  //   formData?.InformantDetails?.isDeclarationInfotwo ? formData?.InformantDetails?.isDeclarationInfotwo : false
  // );
  const [InformantAadharNo, setInformantAadharNo] = useState(
    formData?.InformantDetails?.InformantAadharNo ? formData?.InformantDetails?.InformantAadharNo : ""
  );  
  const [InformantNameEn, setInformantNameEn] = useState(
    formData?.InformantDetails?.InformantNameEn ? formData?.InformantDetails?.InformantNameEn : ""
  );
  const [InformantMobileNo, setInformantMobileNo] = useState(
    formData?.InformantDetails?.InformantMobileNo ? formData?.InformantDetails?.InformantMobileNo : ""
  );
  const [DeathSignedOfficerDesignation, setDeathSignedOfficerDesignation] = useState(
    formData?.InformantDetails?.DeathSignedOfficerDesignation ? formData?.InformantDetails?.DeathSignedOfficerDesignation : ""
  );  
  const [InformantAddress, setInformantAddress] = useState(
    formData?.InformantDetails?.InformantAddress ? formData?.InformantDetails?.InformantAddress : ""
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);
  const [infomantNameError, setinfomantNameError] = useState(formData?.InformantDetails?.InformantNameEn ? false : false);
  const [infomantAadharError, setinfomantAadharError] = useState(formData?.InformantDetails?.infomantAadhar ? false : false);
  const [infomantMobileError, setinfomantMobileError] = useState(formData?.InformantDetails?.InformantMobileNo ? false : false);
  const [informerDesiError, setinformerDesiError] = useState(formData?.InformantDetails?.DeathSignedOfficerDesignation ? false : false);
  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.Informer?.IsDeclarationInformer != null) {
        setIsInitialRender(false);
        se(formData?.Informer?.IsDeclarationInformer);
      }
      // if (formData?.Informer?.isDeclarationInfotwo != null) {
      //   setIsInitialRender(false);
      //   setIsDeclarationInfotwo(formData?.Informer?.isDeclarationInfotwo);
      // }
    }
  }, [isInitialRender]);
 
  function setDeclarationInfo(e) {
    if (e.target.checked == true) {
      setIsDeclarationInformer(e.target.checked);
    } else {
      setIsDeclarationInformer(e.target.checked);
    }
  }
  // function setDeclarationInfotwo(e) {
  //   if (e.target.checked == true) {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   } else {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   }
  // }
  function setSelectInformantAadharNo(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        return false;
      } else if (e.target.value.length < 12) {
        setInformantAadharNo(e.target.value);
        return false;
      } else {
        setInformantAadharNo(e.target.value);
      }
    } else {
      setInformantAadharNo(e.target.value);
    }
  }
  function setSelectInformantNameEn(e) {
    if (e.target.value.length === 51) {
      return false;      
    } else {
      setInformantNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
    
  }
 
  function setSelectInformantMobileNo(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        setInformantMobileNo(e.target.value);
        return false;
      } else {
        setInformantMobileNo(e.target.value);
      }
    } else {
      setInformantMobileNo(e.target.value);
    }
  }
  function setSelectDeathSignedOfficerDesignation(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeathSignedOfficerDesignation(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }    
  } 
  function setSelectInformantAddress(e) {
    if (e.target.value.length === 251) {
      return false;      
    } else {
      setInformantAddress(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }  

  let validFlag = true;
  const goNext = () => {
    if (InformantNameEn == null || InformantNameEn == "" || InformantNameEn == undefined) {
      validFlag = false;
      setinfomantNameError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantNameError(false);
    }
    if (DeathSignedOfficerDesignation == null || DeathSignedOfficerDesignation == "" || DeathSignedOfficerDesignation == undefined) {
      validFlag = false;
      setinformerDesiError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinformerDesiError(false);
    }

    if (InformantAadharNo == null || InformantAadharNo == "" || InformantAadharNo == undefined) {
      validFlag = false;
      setinfomantAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantAadharError(false);
    }
    if (InformantMobileNo == null || InformantMobileNo == "" || InformantMobileNo == undefined) {
      validFlag = false;
      setinfomantMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantMobileError(false);
    }

    if (validFlag == true) {
      sessionStorage.setItem("IsDeclarationInformer", IsDeclarationInformer ? IsDeclarationInformer : null);
      // sessionStorage.setItem("isDeclarationInfotwo", isDeclarationInfotwo ? isDeclarationInfotwo : null);
      sessionStorage.setItem("InformantNameEn", InformantNameEn ? InformantNameEn : null);
      sessionStorage.setItem("InformantAadharNo", InformantAadharNo ? InformantAadharNo : null);

      sessionStorage.setItem("InformantMobileNo", InformantMobileNo ? InformantMobileNo : null);
      sessionStorage.setItem("DeathSignedOfficerDesignation", DeathSignedOfficerDesignation ? DeathSignedOfficerDesignation : null);
      sessionStorage.setItem("InformantAddress", InformantAddress ? InformantAddress : null);   
      onSelect(config.key, {
        IsDeclarationInformer,
        // isDeclarationInfotwo,
        InformantNameEn,
        InformantAadharNo,
        InformantMobileNo,
        DeathSignedOfficerDesignation,
        InformantAddress,       
      });
    }
  };
  return (
    <React.Fragment>
      <BackButton >{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!IsDeclarationInformer}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMANT_DETAILS")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_INFORMER_DECLARATION_STATEMENT")} onChange={setDeclarationInfo} value={IsDeclarationInformer} checked={IsDeclarationInformer} />
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
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(" CR_INFORMANT_DETAILS")}`}</span>
            </h1>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
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
                name="InformantAadharNo"
                value={InformantAadharNo}
                onChange={setSelectInformantAadharNo}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INFORMANT_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantNameEn"
                value={InformantNameEn}
                onChange={setSelectInformantNameEn}
                disable={isEdit}
                placeholder={`${t("CR_INFORMANT_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
              />
            </div>
             
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INFORMER_DESIGNATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathSignedOfficerDesignation"
                value={DeathSignedOfficerDesignation}
                onChange={setSelectDeathSignedOfficerDesignation}
                disable={isEdit}
                placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
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
                name="InformantMobileNo"
                value={InformantMobileNo}
                onChange={setSelectInformantMobileNo}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
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
                name="InformantAddress"
                value={InformantAddress}
                onChange={setSelectInformantAddress}
                disable={isEdit}
                placeholder={`${t("CR_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>
          </div>
        </div> 

        {toast && (
          <Toast
            error={infomantNameError || infomantAadharError || infomantMobileError || informerDesiError}
            label={
              infomantNameError || infomantAadharError || infomantMobileError || informerDesiError
                ? infomantNameError
                  ? t(`CR_ERROR_INFORMANT_NAME_CHOOSE`)
                  : infomantAadharError
                  ? t(`CR_ERROR_INFORMANT_AADHAR_CHOOSE`)
                  : infomantMobileError
                  ? t(`CR_ERROR_INFORMANT_MOBILE_CHOOSE`)
                  : informerDesiError
                  ? t(`CR_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
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
export default Informer;
