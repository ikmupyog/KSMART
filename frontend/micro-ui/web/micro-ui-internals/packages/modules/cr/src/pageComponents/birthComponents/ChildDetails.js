import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import { TimePicker } from '@material-ui/pickers';

const ChildDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const [ChildDOB, setChildDOB] = useState(formData?.ChildDetails?.ChildDOB ? formData?.ChildDetails?.ChildDOB : "");
  const [Gender, selectGender] = useState(formData?.ChildDetails?.Gender);
  const [ChildAadharNo, setChildAadharNo] = useState(formData?.ChildDetails?.ChildAadharNo ? formData?.ChildDetails?.ChildAadharNo : "");
  const [ChildFirstNameEn, setChildFirstNameEn] = useState(formData?.ChildDetails?.ChildFirstNameEn ? formData?.ChildDetails?.ChildFirstNameEn : "");
  const [ChildMiddleNameEn, setChildMiddleNameEn] = useState(
    formData?.ChildDetails?.ChildMiddleNameEn ? formData?.ChildDetails?.ChildMiddleNameEn : ""
  );
  const [ChildLastNameEn, setChildLastNameEn] = useState(formData?.ChildDetails?.ChildLastNameEn ? formData?.ChildDetails?.ChildLastNameEn : "");
  const [ChildFirstNameMl, setChildFirstNameMl] = useState(formData?.ChildDetails?.ChildFirstNameMl ? formData?.ChildDetails?.ChildFirstNameMl : "");
  const [ChildMiddleNameMl, setChildMiddleNameMl] = useState(
    formData?.ChildDetails?.ChildMiddleNameMl ? formData?.ChildDetails?.ChildMiddleNameMl : ""
  );
  const [ChildLastNameMl, setChildLastNameMl] = useState(formData?.ChildDetails?.ChildLastNameMl ? formData?.ChildDetails?.ChildLastNameMl : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [tripStartTime, setTripStartTime] = useState(formData?.ChildDetails?.tripStartTime ? formData?.ChildDetails?.tripStartTime : "");
  const [isChildName, setIsChildName] = useState(formData?.ChildDetails?.isChildName ? formData?.ChildDetails?.isChildName : false);
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.ChildDetails?.ChildAadharNo ? false : false);
  // const [isAdopted, setIsAdopted] = useState(formData?.ChildDetails?.isAdopted);
  // const [isMultipleBirth, setIsMultipleBirth] = useState(formData?.ChildDetails?.isMultipleBirth);
  // const [isBornOutSide, setIsBornOutSide] = useState(formData?.ChildDetails?.isBornOutSide);
  // const [ChildPassportNo, setChildPassportNo] = useState(formData?.ChildDetails?.ChildPassportNo);
  // const [ChildArrivalDate, setChildArrivalDate] = useState(formData?.ChildDetails?.ChildArrivalDate);

  // const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // disable future dates
  // const maxDate = new Date();
  // let currentDate = new Date().toJSON().slice(0, 10);
  const [access, setAccess] = React.useState(true);
  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.ChildDetails?.isChildName != null) {
        setIsInitialRender(false);
        setIsChildName(formData?.ChildDetails?.isChildName);
      }
    }
  }, [isInitialRender]);

  function setselectGender(value) {
    selectGender(value);
  }
  function setSelectChildAadharNo(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setAadharError(true);
        return false;
        // const limit = 12;
        // setChildAadharNo(e.target.value.slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.length < 12) {
        setAadharError(true);
        setChildAadharNo(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setChildAadharNo(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setChildAadharNo(e.target.value);
      return true;
    }
  }
  function setselectChildDOB(value) {
    setChildDOB(value);
  }
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameEn(e.target.value);
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameEn(e.target.value);
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameEn(e.target.value);
    }
  }
  function setSelectChildFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameMl(e.target.value);
    }
  }
  function setSelectChildMiddleNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameMl(e.target.value);
    }
  }
  function setSelectChildLastNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameMl(e.target.value);
    }
  }
  // function setAdopted(e) {
  //   if (e.target.checked == true) {
  //     setIsAdopted(true);
  //   } else {
  //     setIsAdopted(false);
  //   }
  // }
  // function setMultipleBirth(e) {
  //   if (e.target.checked == true) {
  //     setIsMultipleBirth(true);
  //   } else {
  //     setIsMultipleBirth(false);
  //   }
  // }

  // function setBornOutSide(e) {
  //   console.log(e.target.checked);
  //   if (e.target.checked === true) {

  //     setIsBornOutSide(true);
  //     console.log(isBornOutSide);

  //   } else {
  //     setIsBornOutSide(false);
  //   }

  // }
  // function setSelectPassportNo(e) {
  //   setChildPassportNo(e.target.value);
  // }
  // function setSelectArrivalDate(e) {
  //   setChildArrivalDate(e.target.value);
  // }
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      setTripStartTime(value);
    }
  };
  function setChildName(e) {
    if (e.target.checked === true) {
      setIsChildName(e.target.checked);
      
    } else {
      setIsChildName(e.target.checked);
      setChildFirstNameEn("");
      setChildMiddleNameEn("");
      setChildLastNameEn("");
      setChildFirstNameMl("");
      setChildMiddleNameMl("");
      setChildLastNameMl("");
    }
  }
  let validFlag = true;
  const goNext = () => {
    if (AadharError) {
      validFlag = false;
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      // return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAadharError(false);
    }
    if (validFlag == true) {
      sessionStorage.setItem("ChildDOB", ChildDOB ? ChildDOB : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);
      sessionStorage.setItem("Gender", Gender ? Gender.code : null);
      sessionStorage.setItem("ChildAadharNo", ChildAadharNo ? ChildAadharNo : null);
      sessionStorage.setItem("ChildFirstNameEn", ChildFirstNameEn ? ChildFirstNameEn : null);
      sessionStorage.setItem("ChildMiddleNameEn", ChildMiddleNameEn ? ChildMiddleNameEn : null);
      sessionStorage.setItem("ChildLastNameEn", ChildLastNameEn ? ChildLastNameEn : null);
      sessionStorage.setItem("ChildFirstNameMl", ChildFirstNameMl ? ChildFirstNameMl : null);
      sessionStorage.setItem("ChildMiddleNameMl", ChildMiddleNameMl ? ChildMiddleNameMl : null);
      sessionStorage.setItem("ChildLastNameMl", ChildLastNameMl ? ChildLastNameMl : null);
      sessionStorage.setItem("isChildName", isChildName);
      // sessionStorage.setItem("isMotherInfo", isMotherInfo);
      onSelect(config.key, {
        ChildDOB,
        tripStartTime,
        Gender,
        ChildAadharNo,
        ChildFirstNameEn,
        ChildMiddleNameEn,
        ChildLastNameEn,
        ChildFirstNameMl,
        ChildMiddleNameMl,
        ChildLastNameMl,
        isChildName,
      });
    }
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!ChildDOB || !Gender}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <CardLabel>
              {t("CR_DATE_OF_BIRTH_TIME")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <DatePicker
              date={ChildDOB}
              name="ChildDOB"
              onChange={setselectChildDOB}
              inputFormat="DD-MM-YYYY"
              placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
              maxDate={new Date() || undefined}
            />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
            <CustomTimePicker name="tripStartTime" onChange={(val) => handleTimeChange(val, setTripStartTime)} value={tripStartTime} />
          </div>
          <div className="col-md-4">
            {" "}
            <CardLabel>
              {`${t("CR_GENDER")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={true}
              option={menu}
              selected={Gender}
              select={setselectGender}
              placeholder={`${t("CR_GENDER")}`}
              {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
            />
          </div>
          <div className="col-md-4">
            {" "}
            <CardLabel>{`${t("CS_COMMON_CHILD_AADHAAR")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"number"}
              optionKey="i18nKey"
              name="ChildAadharNo"
              value={ChildAadharNo}
              onChange={setSelectChildAadharNo}
              placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
              inputProps={{
                maxLength: 12,
              }}
              {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CheckBox label={t("CR_WANT_TO_ENTER_CHILD_NAME")} onChange={setChildName} value={isChildName} checked={isChildName} />
          </div>
        </div>
        {isChildName === true && ( 
          <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_CHILD")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {" "}
            <CardLabel>
              {`${t("CR_FIRST_NAME_EN")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ChildFirstNameEn"
              value={ChildFirstNameEn}
              onChange={setSelectChildFirstNameEn}
              //  onChange={(e,v) => this.updateTextField(e,v)}
              // disable={isChildName}
              placeholder={`${t("CR_FIRST_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            {" "}
            <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ChildMiddleNameEn"
              value={ChildMiddleNameEn}
              onChange={setSelectChildMiddleNameEn}
              // disable={isChildName}
              placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            {" "}
            <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ChildLastNameEn"
              value={ChildLastNameEn}
              onChange={setSelectChildLastNameEn}
              // disable={isChildName}
              placeholder={`${t("CR_LAST_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {" "}
            <CardLabel>
              {`${t("CR_FIRST_NAME_ML")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ChildFirstNameMl"
              value={ChildFirstNameMl}
              onChange={setSelectChildFirstNameMl}
              // disable={isChildName}
              placeholder={`${t("CR_FIRST_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_FIRST_NAME_ML"),
              })}
            />
          </div>
          <div className="col-md-4">
            {" "}
            <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ChildMiddleNameMl"
              value={ChildMiddleNameMl}
              onChange={setSelectChildMiddleNameMl}
              // disable={isChildName}
              placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_MIDDLE_NAME_ML"),
              })}
            />
          </div>
          <div className="col-md-4">
            {" "}
            <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ChildLastNameMl"
              value={ChildLastNameMl}
              onChange={setSelectChildLastNameMl}
              // disable={isChildName}
              placeholder={`${t("CR_LAST_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_LAST_NAME_ML"),
              })}
            />
          </div>
        </div>
        </div>)}
        {/* <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("OTHER_DETAILS")}`}</span> </h1>
          </div>
        </div> */}
        {/* <div className="row">         
          <div className="col-md-6" >
          
            <CheckBox label={t("CR_MULTIPLE_BIRTH")} onChange={setMultipleBirth} value={isMultipleBirth} checked={isMultipleBirth} />
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <h1 className="">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span>{" "}
            </h1>
          </div>
        </div>

        {toast && (
          <Toast
            error={
              AadharError
              // || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
            }
            label={
              AadharError
                ? //  || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
                  // InstitutionError || SignedOfficerInstError || signedOfficerDesgInstError
                  AadharError
                  ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                  : // : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                    // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                    setToast(false)
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
};
export default ChildDetails;
