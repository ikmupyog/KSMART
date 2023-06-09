import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/SBRTimeline";
import { useTranslation } from "react-i18next";

const StillBirthInformarDetails = ({ config, onSelect, userType, formData, isEditStillBirth = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [isDeclarationInfo, setIsDeclarationInfo] = useState(formData?.StillBirthInformarDetails?.isDeclarationInfo ? formData?.StillBirthInformarDetails?.isDeclarationInfo : false);
  const [infomantFirstNameEn, setinfomantFirstNameEn] = useState(formData?.StillBirthInformarDetails?.infomantFirstNameEn ? formData?.StillBirthInformarDetails?.infomantFirstNameEn : "");

  const [infomantAadhar, setinfomantAadhar] = useState(formData?.StillBirthInformarDetails?.infomantAadhar ? formData?.StillBirthInformarDetails?.infomantAadhar : "");

  const [infomantMobile, setinfomantMobile] = useState(formData?.StillBirthInformarDetails?.infomantMobile ? formData?.StillBirthInformarDetails?.infomantMobile : "");
  const [informerDesi, setinformerDesi] = useState(formData?.StillBirthInformarDetails?.informerDesi ? formData?.StillBirthInformarDetails?.informerDesi : "");
  const [informerAddress, setinformerAddress] = useState(formData?.StillBirthInformarDetails?.informerAddress ? formData?.StillBirthInformarDetails?.informerAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.StillBirthInformarDetails?.infomantFirstNameEn ? false : false);
  const [infomantAadharError, setinfomantAadharError] = useState(formData?.StillBirthInformarDetails?.infomantAadhar ? false : false);
  const [infomantMobileError, setinfomantMobileError] = useState(formData?.StillBirthInformarDetails?.infomantMobile ? false : false);
  const [mobileLengthError, setMobileLengthError] = useState(formData?.StillBirthInformarDetails?.infomantMobile ? false : false);
  const [informerDesiError, setinformerDesiError] = useState(formData?.StillBirthInformarDetails?.informerDesi ? false : false);
  const [informerAddressError, setinformerAddressError] = useState(formData?.StillBirthInformarDetails?.informerAddress ? false : false);


  const onSkip = () => onSelect();



  useEffect(() => {
    if (isInitialRender) {
      if (formData?.StillBirthInformarDetails?.isDeclarationInfo != null) {
        setIsInitialRender(false);
        setIsDeclarationInfo(formData?.StillBirthInformarDetails?.isDeclarationInfo);
      }
    }


  }, [isInitialRender]);

  function setSelectinfomantFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinfomantFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinformerDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinformerDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinformerAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinformerAddress(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectinfomantAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinfomantAadhar(e.target.value.trim().length <= 12 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  // function setSelectinfomantAadhar(e) {
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 12) {
  //       return false;
  //     } else if (e.target.value.length < 12) {
  //       setinfomantAadhar(e.target.value);
  //       return false;
  //     } else {
  //       setinfomantAadhar(e.target.value);
  //     }
  //   } else {
  //     setinfomantAadhar(e.target.value);
  //   }
  // }

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
    if (e.target.checked == true) {
      setIsDeclarationInfo(e.target.checked);


      //   setFatherFirstNameMl("");

      //   setFatherNationality(null);


    } else {
      setIsDeclarationInfo(e.target.checked);
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
    if (infomantAadhar.trim() == null || infomantAadhar.trim() == '' || infomantAadhar.trim() == undefined) {
      setinfomantAadhar("");
    } else if (infomantAadhar != null && infomantAadhar != "") {
      let adharLength = infomantAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinfomantAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinfomantAadharError(false);
      }
    }

    // if (infomantAadhar == null || infomantAadhar == "" || infomantAadhar == undefined) {
    //   validFlag = false;
    //   setinfomantAadharError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setinfomantAadharError(false);
    // }
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


      sessionStorage.setItem("infomantFirstNameEn", infomantFirstNameEn ? infomantFirstNameEn : null);
      sessionStorage.setItem("infomantAadhar", infomantAadhar ? infomantAadhar : null);

      sessionStorage.setItem("infomantMobile", infomantMobile ? infomantMobile : null);
      sessionStorage.setItem("informerDesi", informerDesi ? informerDesi : null);
      sessionStorage.setItem("informerAddress", informerAddress ? informerAddress : null);
      sessionStorage.setItem("isDeclarationInfo", isDeclarationInfo ? isDeclarationInfo : null);

      onSelect(config.key, {
        infomantFirstNameEn, infomantAadhar, infomantMobile, informerDesi, informerAddress, isDeclarationInfo
      });
    }
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!isDeclarationInfo}>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span className="headingline">{`${t("CR_INFORMER_VERIFICATION")}`}</span> </h1>
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_INFORMER_DECLARATION_STATEMENT")} onChange={setDeclarationInfo} value={isDeclarationInfo} checked={isDeclarationInfo} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" >
            <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput t={t} isMandatory={true} type={"number"} optionKey="i18nKey" name="infomantAadhar" value={infomantAadhar} onChange={setSelectinfomantAadhar} disable={isEdit} onKeyPress={setCheckSpecialChar}
                placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
            </div>



            <div className="col-md-4" ><CardLabel>{`${t("CR_INFORMANT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput t={t} isMandatory={true} type={"text"} optionKey="i18nKey" name="infomantFirstNameEn"
                value={infomantFirstNameEn} onChange={setSelectinfomantFirstNameEn} disable={isEdit} placeholder={`${t("CR_INFORMANT_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_INFORMER_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
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
        </div>
        <div className="row">
          <div className="col-md-12" >
            {/* <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={true} type={"number"} optionKey="i18nKey" name="infomantMobile" value={infomantMobile} onChange={setSelectinfomantMobile} disable={isEdit} 
                            placeholder={`${t("CR_MOBILE_NO")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div> */}


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
export default StillBirthInformarDetails;