import React, { useState ,useEffect} from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton,CheckBox, TextArea,Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InitiatorDetails = ({ config, onSelect, userType, formData,
}) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};

    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    
    const [isDeclarationInfo, setIsDeclarationInfo] = useState(formData?.InitiatorinfoDetails?.isDeclarationInfo ? formData?.InitiatorinfoDetails?.isDeclarationInfo : false);
    const [isCaretaker, setIsCaretaker] = useState(formData?.InitiatorinfoDetails?.isCaretaker ? formData?.InitiatorinfoDetails?.isCaretaker : false);
    const [relation, setrelation] = useState(formData?.InitiatorinfoDetails?.relation  ? formData?.InitiatorinfoDetails?.relation : "");
    const [infomantFirstNameEn, setinfomantFirstNameEn] = useState(formData?.InitiatorinfoDetails?.infomantFirstNameEn  ? formData?.InitiatorinfoDetails?.infomantFirstNameEn : "");
    const [infomantAadhar, setinfomantAadhar] = useState(formData?.InitiatorinfoDetails?.infomantAadhar ? formData?.InitiatorinfoDetails?.infomantAadhar : "");
    
    const [infomantMobile, setinfomantMobile] = useState(formData?.InitiatorinfoDetails?.infomantMobile  ? formData?.InitiatorinfoDetails?.infomantMobile : "");
    const [informerDesi, setinformerDesi] = useState(formData?.InitiatorinfoDetails?.informerDesi  ? formData?.InitiatorinfoDetails?.informerDesi : "");
    const [informerAddress, setinformerAddress] = useState(formData?.InitiatorinfoDetails?.informerAddress  ? formData?.InitiatorinfoDetails?.informerAddress : "");
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [toast, setToast] = useState(false);
    const [relationnError, setrelationnError] = useState(formData?.InitiatorinfoDetails?.relation ? false : false);
    const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.InitiatorinfoDetails?.infomantFirstNameEn ? false : false);
    const [infomantAadharError, setinfomantAadharError] = useState(formData?.InitiatorinfoDetails?.infomantAadhar ? false : false);
    const [infomantMobileError, setinfomantMobileError] = useState(formData?.InitiatorinfoDetails?.infomantMobile  ? false : false);
    const [mobileLengthError, setMobileLengthError] = useState(formData?.InitiatorinfoDetails?.infomantMobile ? false : false);
    const [informerDesiError, setinformerDesiError] = useState(formData?.InitiatorinfoDetails?.informerDesi  ? false : false);
    const [informerAddressError, setinformerAddressError] = useState(formData?.InitiatorinfoDetails?.informerAddress ? false : false);


    const onSkip = () => onSelect();



    useEffect(() => {
        if (isInitialRender) {
          if (formData?.InitiatorinfoDetails?.isDeclarationInfo != null) {
            setIsInitialRender(false);
            setIsDeclarationInfo(formData?.InitiatorinfoDetails?.isDeclarationInfo);
          }
          if (formData?.InitiatorinfoDetails?.isCaretaker != null) {
            setIsInitialRender(false);
            setIsCaretaker(formData?.InitiatorinfoDetails?.isCaretaker);
          }
        }    
         
        
      }, [isInitialRender]);
      function setSelectrelation(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setrelation(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }

    function setSelectinfomantFirstNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinfomantFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectinformerDesi(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinformerDesi(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectinformerAddress(e) {
        if (e.target.value.length === 251) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinformerAddress(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectinfomantAadhar(e) {
        if (e.target.value.length != 0) {
            if (e.target.value.length > 12) {
                return false;
            } else if (e.target.value.length < 12) {
                setinfomantAadhar(e.target.value);
                return false;
            } else {
                setinfomantAadhar(e.target.value);
            }
        } else {
            setinfomantAadhar(e.target.value);
        }
    }
    
    function setSelectinfomantMobile(e) {
        if (e.target.value.length != 0) {
            if (e.target.value.length > 10) {
                return false;
            } else if (e.target.value.length < 10) {
                setinfomantMobile(e.target.value);
                return false;
            } else {
                setinfomantMobile(e.target.value);
            }
        } else {
            setinfomantMobile(e.target.value);
        }
    }

   
    function setDeclarationInfo(e) {
        if (e.target.checked == false) {
            setIsDeclarationInfo(e.target.checked);
      
    
        //   setFatherFirstNameMl("");
    
        //   setFatherNationality(null);
    
       
        } else {
            setIsDeclarationInfo(e.target.checked);
        }
      }

      function setCaretaker(e) {
        if (e.target.checked == true) {
            setIsCaretaker(e.target.checked);
      
            setinformerDesi("");
        //   setFatherFirstNameMl("");
    
        //   setFatherNationality(null);
    
       
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
        if (infomantFirstNameEn == null || infomantFirstNameEn == "" || infomantFirstNameEn == undefined) {
            validFlag = false;
            setinfomantFirstNmeEnError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setinfomantFirstNmeEnError(false);
          }
          if (informerDesi == null || informerDesi == "" || informerDesi == undefined) {
            validFlag = false;
            setinformerDesiError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setinformerDesiError(false);
          }

          if (infomantAadhar == null || infomantAadhar == "" || infomantAadhar == undefined) {
            validFlag = false;
            setinfomantAadharError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setinfomantAadharError(false);
          }
          if (infomantMobile == null || infomantMobile == "" || infomantMobile == undefined) {
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
      
        sessionStorage.setItem("relation", relation  ? relation : null);       
        sessionStorage.setItem("infomantFirstNameEn", infomantFirstNameEn  ? infomantFirstNameEn : null);          
        sessionStorage.setItem("infomantAadhar", infomantAadhar  ? infomantAadhar : null);     
    
        sessionStorage.setItem("infomantMobile", infomantMobile  ? infomantMobile : null);   
        sessionStorage.setItem("informerDesi", informerDesi  ? informerDesi : null);    
        sessionStorage.setItem("informerAddress", informerAddress  ? informerAddress : null);    
        sessionStorage.setItem("isDeclarationInfo", isDeclarationInfo ? isDeclarationInfo : null);
        sessionStorage.setItem("isCaretaker", isCaretaker ? isCaretaker : null);


        onSelect(config.key, {
          relation , infomantFirstNameEn,  infomantAadhar,   infomantMobile ,informerDesi,  informerAddress,isDeclarationInfo ,isCaretaker });
        }
      };
    return (
        <React.Fragment>
            {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton> */}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!isDeclarationInfo}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span> </h1>
                    </div>
                </div>


                <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("Declared that I/My ____ Delivered Male child/ Female child Born ./ഞാൻ/എന്റെ _____ പ്രസവിച്ച ആൺ കുട്ടി/ പെൺ കുട്ടി ജനിച്ചതായി പ്രഖ്യാപിച്ചു.")} onChange={setDeclarationInfo} value={isDeclarationInfo} checked={isDeclarationInfo} />
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
                    <div className="col-md-12" >

                    <div className="col-md-4" ><CardLabel>{`${t("CR_RELATION")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="relation"
                                value={relation} onChange={setSelectrelation} disable={isEdit} placeholder={`${t("CR_RELATION")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RELATION") })} />
                        </div>

                    <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={true} type={"number"} optionKey="i18nKey" name="infomantAadhar" value={infomantAadhar} onChange={setSelectinfomantAadhar} disable={isEdit} 
                            placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>


                       
                        <div className="col-md-4" ><CardLabel>{`${t("CR_INFORMANT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={true} type={"text"} optionKey="i18nKey" name="infomantFirstNameEn"
                                value={infomantFirstNameEn} onChange={setSelectinfomantFirstNameEn} disable={isEdit} placeholder={`${t("CR_INFORMANT_NAME")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })} />
                        </div>


                        
                       
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                    
                    <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_INITIATOR_IS_CARETAKER")} onChange={setCaretaker} value={isCaretaker} checked={isCaretaker} />
          </div>
        </div>
        {isCaretaker === true && (
          <div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CR_INSTITUTION_NAME_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={true}
                                type={"text"}
                                optionKey="i18nKey"
                                name="informerDesi"
                                value={informerDesi}
                                onChange={setSelectinformerDesi}
                                disable={isEdit}
                                placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
                            />
                        </div>
                        </div>
        )}

                        <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={true} type={"number"} optionKey="i18nKey" name="infomantMobile" value={infomantMobile} onChange={setSelectinfomantMobile} disable={isEdit} 
                            placeholder={`${t("CR_MOBILE_NO")}`} {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
                            <TextArea
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="informerAddress"
                                value={informerAddress}
                                onChange={setSelectinformerAddress}
                                disable={isEdit}
                                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
                            />
                        </div>
                    </div>
                </div>


                {toast && (
          <Toast
            error={
                infomantFirstNmeEnError ||
              infomantAadharError ||
              infomantMobileError ||
              informerDesiError 
              
             
            }
            label={
                infomantFirstNmeEnError ||
              infomantAadharError ||
              infomantMobileError ||
              informerDesiError 
            
                ? 
                  infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : infomantAadharError
                  ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
           
                  : infomantMobileError
                  ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                  : informerDesiError 
                  ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
                 
                  
                  :
                    setToast(false)
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
export default InitiatorDetails;