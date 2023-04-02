import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import Timeline from "../../components/CRTimeline";
import Timeline from "../../components/CRABTimeline";

const AbandonedBirthInformarDetails = ({ config, onSelect, userType, formData,isEditBirth=false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // console.log(Digit.UserService.getUser().info);
  // const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : true);
  const {name:name,} =Digit.UserService.getUser().info ; // window.localStorage.getItem("user-info");
 
  const [institutionName, setinstitutionName] = useState(formData?.AbandonedBirthInformarDetails?.institutionName ? formData?.AbandonedBirthInformarDetails?.institutionName : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.institutionName ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.institutionName : "");
  const [caretakerName, setcaretakerName] = useState(formData?.AbandonedBirthInformarDetails?.caretakerName ? formData?.AbandonedBirthInformarDetails?.caretakerName : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerName ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerName : "");
  const [caretakerDesignation, setcaretakerDesignation] = useState(formData?.AbandonedBirthInformarDetails?.caretakerDesignation ? formData?.AbandonedBirthInformarDetails?.caretakerDesignation : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerDesignation ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerDesignation : "");
  const [caretakerMobile, setcaretakerMobile] = useState(formData?.AbandonedBirthInformarDetails?.caretakerMobile ? formData?.AbandonedBirthInformarDetails?.caretakerMobile : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerMobile ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerMobile : "");
  const [caretakerAddress, setcaretakerAddress] = useState(formData?.AbandonedBirthInformarDetails?.caretakerAddress ? formData?.AbandonedBirthInformarDetails?.caretakerAddress : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerAddress ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerAddress : "");
  const [infomantinstitution, setinfomantinstitution] = useState(formData?.AbandonedBirthInformarDetails?.infomantinstitution ? formData?.AbandonedBirthInformarDetails?.infomantinstitution : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantinstitution ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantinstitution : "");
  const [informerDesi, setinformerDesi] = useState(formData?.AbandonedBirthInformarDetails?.informerDesi ? formData?.AbandonedBirthInformarDetails?.informerDesi : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerDesi ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerDesi : "");
  const [infomantAadhar, setinfomantAadhar] = useState(formData?.AbandonedBirthInformarDetails?.infomantAadhar ? formData?.AbandonedBirthInformarDetails?.infomantAadhar : formData?.ChildDetails?.AbandonedBirthInformarDetails?.infomantAadhar ? formData?.ChildDetails?.AbandonedBirthInformarDetails?.infomantAadhar : "");
  const [infomantFirstNameEn, setinfomantFirstNameEn] = useState(formData?.AbandonedBirthInformarDetails?.infomantFirstNameEn ? formData?.AbandonedBirthInformarDetails?.infomantFirstNameEn : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantFirstNameEn ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantFirstNameEn : "");
  const [infomantMobile, setinfomantMobile] = useState(formData?.AbandonedBirthInformarDetails?.infomantMobile ? formData?.AbandonedBirthInformarDetails?.infomantMobile : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantMobile ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantMobile : "");
  const [informerAddress, setinformerAddress] = useState(formData?.AbandonedBirthInformarDetails?.informerAddress ? formData?.AbandonedBirthInformarDetails?.informerAddress : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerAddress ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerAddress : "");
  const [documentType, setdocumentType] = useState(formData?.AbandonedBirthInformarDetails?.documentType ? formData?.AbandonedBirthInformarDetails?.documentType : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.documentType ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.documentType : "");
  const [documentName, setdocumentName] = useState(formData?.AbandonedBirthInformarDetails?.documentName ? formData?.AbandonedBirthInformarDetails?.documentName : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.documentName ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.documentName : "");

  const [toast, setToast] = useState(false);
  // const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? false : false);
  // const [initiatorAadharError, setinitiatorAadharError] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? false : false);
  // const [initiatorMobileError, setinitiatorMobileError] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? false : false);
  // const [initiatorDesiError, setinitiatorDesiError] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? false : false);

  const onSkip = () => onSelect();

  // useEffect(() => {
  //   if (isInitialRender) {
  //     if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
  //       setIsInitialRender(false);
  //       setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
  //     }
  //     if (formData?.InitiatorinfoDetails?.isCaretaker != null) {
  //       setIsInitialRender(false);
  //       setIsCaretaker(formData?.InitiatorinfoDetails?.isCaretaker);
  //     }
  //   }
  // }, [isInitialRender]);

  useEffect(() => {    
    }
   );

  function setSelectinstitutionName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setinstitutionName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectcaretakerName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setcaretakerName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectcaretakerDesignation(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setcaretakerDesignation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }    
  function setSelectcaretakerMobile(e) {
    if (e.target.value.trim().length != 0) {
      setcaretakerMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }  
  function setSelectcaretakerAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setcaretakerAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }   
  function setSelectinfomantinstitution(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setinfomantinstitution(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinformerDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setinformerDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }  
  function setSelectinfomantAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinfomantAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }   
  }
  function setSelectinfomantFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setinfomantFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  } 
  function setSelectinfomantMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinfomantMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }   
  function setSelectinformerAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinformerAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  } 
  function setSelectdocumentName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setdocumentName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }  function setSelectdocumentType(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setdocumentType(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
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
    // if (initiatorNameEn == null || initiatorNameEn == "" || initiatorNameEn == undefined) {
    //   validFlag = false;
    //   setinfomantFirstNmeEnError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setinfomantFirstNmeEnError(false);
    // }
    // if (isCaretaker === true) {


    //   if (initiatorDesi == null || initiatorDesi == "" || initiatorDesi == undefined) {
    //     validFlag = false;
    //     setinitiatorDesiError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setinitiatorDesiError(false);
    //   }
    // }
    // if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
    //   let adharLength = initiatorAadhar;
    //   console.log(adharLength);
    //   if (adharLength.length < 12 || adharLength.length > 12) {
    //     validFlag = false;
    //     setinitiatorAadharError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setinitiatorAadharError(false);
    //   }
    // } else {
    //   validFlag = false;
    //   setinitiatorAadharError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // }
    // if (initiatorMobile != null || initiatorMobile != "" || initiatorMobile != undefined) {
    //   let mobileLength = initiatorMobile;
    //   if (mobileLength.length < 10 || mobileLength.length > 10) {
    //     validFlag = false;
    //     setinitiatorMobileError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setinitiatorMobileError(false);
    //   }
    // } else {
    //   validFlag = false;
    //   setinitiatorMobileError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // }
    if (validFlag == true) {      
      sessionStorage.setItem("institutionName", institutionName ? institutionName : null);
      sessionStorage.setItem("caretakerName", caretakerName ? caretakerName : null);
      sessionStorage.setItem("caretakerDesignation", caretakerDesignation ? caretakerDesignation : null);
      sessionStorage.setItem("caretakerMobile", caretakerMobile ? caretakerMobile : null);
      sessionStorage.setItem("caretakerAddress", caretakerAddress ? caretakerAddress : null);
      sessionStorage.setItem("infomantinstitution", infomantinstitution ? infomantinstitution : null);
      sessionStorage.setItem("informerDesi", informerDesi ? informerDesi : null);      
      sessionStorage.setItem("infomantAadhar", infomantAadhar ? infomantAadhar : null);
      sessionStorage.setItem("infomantFirstNameEn", infomantFirstNameEn ? infomantFirstNameEn : null);
      sessionStorage.setItem("infomantMobile", infomantMobile ? infomantMobile : null);
      sessionStorage.setItem("informerAddress", informerAddress ? informerAddress : null);    
      sessionStorage.setItem("documentType", documentType ? documentType : null);
      sessionStorage.setItem("documentName", documentName ? documentName : null);


      onSelect(config.key, {

        institutionName,
        caretakerName,
        caretakerDesignation,
        caretakerMobile,
        caretakerAddress,
        infomantinstitution,
        informerDesi,
        infomantAadhar, 
        infomantFirstNameEn, 
        infomantMobile,  
        informerAddress,  
        documentName,
        documentType,  

        
      });
    }
  };
  // console.log(formData);
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>

      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div> */}

        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_CARETAKER")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12"> 
          <div className="col-md-4">
              <CardLabel>
                {`${t("CR_INSTITUTION_NAME_EN")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="institutionName"
                value={institutionName}
                onChange={setSelectinstitutionName}
                // disable={isDisableEdit}
                placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_ERROR_INSTITUTION_NAME_CHOOSE") })}
              />
            </div>           
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_CARE_TAKER_NAME_EN")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="caretakerName"
                value={caretakerName}
                onChange={setSelectcaretakerName}
                // disable={isDisableEdit}
                placeholder={`${t("CR_CARE_TAKER_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_ERROR_CARE_TAKER_NAME") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_CARE_TAKER_DESIGNATION")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="caretakerDesignation"
                value={caretakerDesignation}
                onChange={setSelectcaretakerDesignation}
                // disable={isDisableEdit}
                placeholder={`${t("CR_CARE_TAKER_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_ERROR_CARE_TAKER_DESIGNATION") })}
              />
            </div>    
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="caretakerMobile"
                value={caretakerMobile}
                onChange={setSelectcaretakerMobile}
                // disable={isDisableEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: false, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
         
            <div className="col-md-6">
              <CardLabel>{`${t("CR_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="caretakerAddress"
                value={caretakerAddress}
                onChange={setSelectcaretakerAddress}
                // disable={isDisableEdit}
                placeholder={`${t("CR_CARE_TAKER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>            
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OFFICAL_INFORMANT")}`}</span>{" "}
            </h1>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-12"> 
          <div className="col-md-4">
              <CardLabel>
                {`${t("CR_OFFICE_INSTITUTION")}`}               
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="infomantinstitution"
                value={infomantinstitution}
                onChange={setSelectinfomantinstitution}
                // disable={isDisableEdit}
                placeholder={`${t("CR_OFFICE_INSTITUTION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OFFICE_INSTITUTION_NAME") })}
              />
            </div>  
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_INFORMANT_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}                
                type={"text"}
                optionKey="i18nKey"
                name="informerDesi"
                value={informerDesi}
                onChange={setSelectinformerDesi}
                // disable={isDisableEdit}
                placeholder={`${t("CR_INFORMANT_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
              />
            </div>        
                 
          <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_AADHAAR")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="infomantAadhar"
                value={infomantAadhar}
                onChange={setSelectinfomantAadhar}
                // disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12"> 
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_INFORMANT_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput 
              t={t} 
              isMandatory={true} 
              type={"text"} 
              optionKey="i18nKey" 
              name="infomantFirstNameEn"              
              value={infomantFirstNameEn} 
              onChange={setSelectinfomantFirstNameEn}  placeholder={`${t("CR_INFORMANT_NAME_EN")}`}
             {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })} />
            </div>
          

            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="infomantMobile"
                value={infomantMobile}
                onChange={setSelectinfomantMobile }
                // disable={isDisableEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="informerAddress"
                value={informerAddress}
                onChange={setSelectinformerAddress}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SUPPORTING_DOC")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
            <div className="col-md-12"> 
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_DOC_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput 
              t={t} 
              isMandatory={true} 
              type={"text"} 
              optionKey="i18nKey" 
              name="documentType"              
              value={documentType} 
              onChange={setSelectdocumentType}  placeholder={`${t("CR_DOC_TYPE")}`}
             {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOC_TYPE") })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_DOC_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput 
              t={t} 
              isMandatory={true} 
              type={"text"} 
              optionKey="i18nKey" 
              name="documentName"              
              value={documentName} 
              onChange={setSelectdocumentName}  placeholder={`${t("CR_DOC_NAME")}`}
             {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOC_NAME") })} />
            </div>
            <div className="col-md-4">            
            </div>
          </div>
          
        </div> 

        {/* <div className="row">
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
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div> */}
        {/* {toast && (
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
        {""} */}
      </FormStep>
    </React.Fragment>
  );
};
export default AbandonedBirthInformarDetails;
