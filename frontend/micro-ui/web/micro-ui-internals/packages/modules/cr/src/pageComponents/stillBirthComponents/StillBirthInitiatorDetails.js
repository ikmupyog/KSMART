import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Timeline from "../../components/SBRTimeline";
import { sortDropdownNames } from "../../utils";

const StillBirthInitiatorDetails = ({ config, onSelect, userType, formData, isEditStillBirth = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // console.log(Digit.UserService.getUser().info);
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const { name: name } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const { mobileNumber: mobileNumber } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const cmbRelation = [
    { i18nKey: "Father", code: "FATHER" },
    { i18nKey: "Mother", code: "MOTHER" },
    { i18nKey: "Others", code: "OTHERS" },
  ];
 
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(
    formData?.StillBirthInitiatorDetails?.isInitiatorDeclaration
      ? formData?.StillBirthInitiatorDetails?.isInitiatorDeclaration
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.isInitiatorDeclaration
      ? formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.isInitiatorDeclaration
      : false
  );
  const [isCaretaker, setIsCaretaker] = useState(
    formData?.StillBirthInitiatorDetails?.isCaretaker
      ? formData?.StillBirthInitiatorDetails?.isCaretaker
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.isCaretaker
      ? formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.isCaretaker
      : false
  );
   
  const [relation, setrelation] = useState(
    formData?.StillBirthInitiatorDetails?.relation.code
      ? formData?.StillBirthInitiatorDetails?.relation
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.relation
      ? cmbRelation.filter((cmbRelation) => cmbRelation.code === formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.relation[0])
      : ""
  );
  const [initiatorNameEn, setinitiatorNameEn] = useState(
    formData?.StillBirthInitiatorDetails?.initiatorNameEn
      ? formData?.StillBirthInitiatorDetails?.initiatorNameEn
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorNameEn
      ? formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorNameEn
      : name
  );
  const [initiatorAadhar, setinitiatorAadhar] = useState(
    formData?.StillBirthInitiatorDetails?.initiatorAadhar
      ? formData?.StillBirthInitiatorDetails?.initiatorAadhar
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorAadhar
      ? formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorAadhar
      : ""
  );
  const [initiatorMobile, setinitiatorMobile] = useState(
    formData?.StillBirthInitiatorDetails?.initiatorMobile
      ? formData?.StillBirthInitiatorDetails?.initiatorMobile
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorMobile
      ? formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorMobile
      : mobileNumber
  );
  const [initiatorDesi, setinitiatorDesi] = useState(
    formData?.StillBirthInitiatorDetails?.initiatorDesi
      ? formData?.StillBirthInitiatorDetails?.initiatorDesi
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorDesi
      ? formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorDesi
      : ""
  );
  const [initiatorAddress, setinitiatorAddress] = useState(
    formData?.StillBirthInitiatorDetails?.initiatorAddress
      ? formData?.StillBirthInitiatorDetails?.initiatorAddress
      : formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorAddress
      ? formData?.StillBirthChildDetails?.StillBirthInitiatorDetails?.initiatorAddress
      : ""
  );
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

  function setSelectrelation(value) {
    setrelation(value);
  }

  // function setSelectrelation(e) {
  //   if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
  //     setrelation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
  //   }
  // }

  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setinitiatorDesi(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectinitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9, ]*$")  != null) {
      setinitiatorAddress(e.target.value.length <= 250 ? e.target.value : e.target.value.substring(0, 250));
    }
  }

 
  function setSelectinitiatorAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorAadhar(e.target.value.trim().length <= 12 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorMobile(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
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
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
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
    // if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
    //   let adharLength = initiatorAadhar;
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
    if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
      let adharLength = initiatorAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinitiatorAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorAadharError(false);
      }
    } else {
      validFlag = false;
      setinitiatorAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

    // if (initiatorAadhar.trim() == null || initiatorAadhar.trim() == '' || initiatorAadhar.trim() == undefined) {
    //   setinitiatorAadhar("");
    // } else if (initiatorAadhar != null && initiatorAadhar != "") {
    //   let adharLength = initiatorAadhar;
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
    // }
    if (initiatorMobile != null || initiatorMobile != "" || initiatorMobile != undefined) {
      let mobileLength = initiatorMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setinitiatorMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorMobileError(false);
      }
    } else {
      validFlag = false;
      setinitiatorMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (validFlag == true) {

      onSelect(config.key, {
        relation,
        initiatorNameEn : initiatorNameEn.trim(),
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi : initiatorDesi.trim(),
        initiatorAddress: initiatorAddress.trim(),
        isInitiatorDeclaration,
        isCaretaker,
      });
    }
  };
  return (
    <React.Fragment>
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}

      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} 
      isDisabled={!initiatorNameEn || !initiatorAadhar || !initiatorMobile 
        || (isCaretaker === true ? (initiatorDesi === "" || initiatorAddress === "") : false)
      }>      
        
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
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
                    disable={isDisableEdit}
                    placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                    //            disable={isCaretaker}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
                  />
                </div>
              </div>
            )}
            {isCaretaker === false && (
              <div className="col-md-3">
                {/* <CardLabel>{`${t("CR_RELATION")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="relation"
                  value={relation}
                  onChange={setSelectrelation}
                  placeholder={`${t("CR_RELATION")}`}
                  disable={isDisableEdit}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RELATION") })}
                /> */}
                <CardLabel>{`${t("CR_RELATION")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={sortDropdownNames(cmbRelation ? cmbRelation : [],"code",t)}
                  selected={relation}
                  select={setSelectrelation}
                  disable={isDisableEdit}
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
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAadhar"
                value={initiatorAadhar}
                onChange={setSelectinitiatorAadhar}
                disable={isDisableEdit}
                onKeyPress={setCheckSpecialChar}
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
                name="initiatorNameEn"
                value={initiatorNameEn}
                onChange={setSelectinitiatorNameEn}
                disable={isDisableEdit}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
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
                name="initiatorMobile"
                value={initiatorMobile}
                onChange={setSelectinitiatorMobile}
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
                name="initiatorAddress"
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-0-9, ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
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
