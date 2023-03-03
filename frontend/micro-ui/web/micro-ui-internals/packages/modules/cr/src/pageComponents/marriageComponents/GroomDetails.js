
import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast,SubmitBar } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";


const GroomDetails = ({ config, onSelect, userType, formData, }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const [gender, selectGender] = useState(formData?.ChildDetails?.gender);
  const [ChildDOB, setChildDOB] = useState(formData?.ChildDetails?.ChildDOB ? formData?.ChildDetails?.ChildDOB : "");
  const [ChildAadharNo, setChildAadharNo] = useState(formData?.ChildDetails?.ChildAadharNo ? formData?.ChildDetails?.ChildAadharNo : "");
  const [ChildFirstNameEn, setChildFirstNameEn] = useState(formData?.ChildDetails?.ChildFirstNameEn ? formData?.ChildDetails?.ChildFirstNameEn : "");
  const [ChildMiddleNameEn, setChildMiddleNameEn] = useState(formData?.ChildDetails?.ChildMiddleNameEn ? formData?.ChildDetails?.ChildMiddleNameEn : ""
  );
  const [groomPassportNo, setGroomPassportNo] = useState(formData?.GroomDetails?.groomPassportNo ? formData?.GroomDetails?.groomPassportNo : ""
  );
  const [groomAdharNo, setGroomAadharNo] = useState(formData?.GroomDetails?.groomAdharNo ? formData?.GroomDetails?.groomAdharNo : "");
  const [groomFatherAdharNo, setGroomFatherAdharNo] = useState(formData?.GroomDetails?.groomFatherAdharNo ? formData?.GroomDetails?.groomFatherAdharNo : "");
  const [groomMotherAdharNo, setGroomMotherAdharNo] = useState(formData?.GroomDetails?.groomMotherAdharNo ? formData?.GroomDetails?.groomMotherAdharNo : "");
  const [ChildLastNameEn, setChildLastNameEn] = useState(formData?.ChildDetails?.ChildLastNameEn ? formData?.ChildDetails?.ChildLastNameEn : "");
  const [groomSocialSecurityNo, setGroomSocialSecurityNo] = useState(formData?.GroomDetails?.groomSocialSecurityNo ? formData?.GroomDetails?.groomSocialSecurityNo : "");
  const [ChildFirstNameMl, setChildFirstNameMl] = useState(formData?.ChildDetails?.ChildFirstNameMl ? formData?.ChildDetails?.ChildFirstNameMl : "");
  const [ChildMiddleNameMl, setChildMiddleNameMl] = useState(formData?.ChildDetails?.ChildMiddleNameMl ? formData?.ChildDetails?.ChildMiddleNameMl : ""
  );
  const [ChildLastNameMl, setChildLastNameMl] = useState(formData?.ChildDetails?.ChildLastNameMl ? formData?.ChildDetails?.ChildLastNameMl : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [tripStartTime, setTripStartTime] = useState(formData?.ChildDetails?.tripStartTime ? formData?.ChildDetails?.tripStartTime : "");
  const [isChildName, setIsChildName] = useState(formData?.ChildDetails?.isChildName ? formData?.ChildDetails?.isChildName : false);
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.ChildDetails?.ChildAadharNo ? false : false);
  const [ChildAadharHIde, setChildAadharHIde] = useState(formData?.ChildDetails?.ChildAadharNo ? true : false);
  const [DOBError, setDOBError] = useState(formData?.ChildDetails?.ChildDOB ? false : false);
  const [selectedOption, setSelectedOption] = useState(
    formData?.GroomDetails?.selectedOption ? formData?.GroomDetails?.selectedOption : "INDIAN_NATIONAL"
  );
  const [groomMiddlenameEn, setGroomMiddlenameEn] = useState(formData?.GroomDetails?.groomMiddlenameEn ? formData?.GroomDetails?.groomMiddlenameEn : "");
  const [groomLastnameEn, setGroomLastnameEn] = useState(formData?.GroomDetails?.groomLastnameEn ? formData?.GroomDetails?.groomLastnameEn : "");
  //const [PermanentCountry, setPermanentCountry] = useState(formData?.AddressDetails?.PermanentCountry ? formData?.AddressDetails?.PermanentCountry : null);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [groomMobile, setGroomMobile] = useState(formData?.GroomDetails?.groomMobile ? formData?.GroomDetails?.groomMobile : "");
  const [groomFirstnameEn, setGroomFirstnameEn] = useState(formData?.GroomDetails?.groomFirstnameEn ? formData?.GroomDetails?.groomFirstnameEn :"");
  const [ApplicantNameEn, setApplicantNameEn] = useState(formData?.ApplicantDetails?.ApplicantNameEn ? formData?.ApplicantDetails?.ApplicantNameEn :"");
  const [ApplicantNameMl, setApplicantNameMl] = useState(formData?.ApplicantDetails?.ApplicantNameMl ? formData?.ApplicantDetails?.ApplicantNameMl : "");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let naturetypecmbvalue = null;
  // let cmbCountry = [];
  // Country &&
  //   Country["common-masters"] &&
  //   Country["common-masters"].Country.map((ob) => {
  //     cmbCountry.push(ob);
  //   });
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
  function setSelectGroomFirstnameEn(e) {
    setGroomFirstnameEn(e.target.value);
  }
  function setSelectGroomLastnameEn(e) {
    setGroomLastnameEn(e.target.value);
  }
  function setSelectGroomPassportNo(e) {
    setGroomPassportNo(e.target.value);
  }
  function setSelectGroomSocialSecurityNo(e) {
    setGroomSocialSecurityNo(e.target.value);
  }
  function setSelectGroomMiddlenameEn(e) {
    setGroomMiddlenameEn(e.target.value);
  }
  function setSelectGroomLastnameEn(e) {
    setGroomLastnameEn(e.target.value);
  }
  function setSelectGroomLastnameEn(e) {
    setGroomLastnameEn(e.target.value);
  }
  function setSelectApplicantNameEn(e) {
    setApplicantNameEn(e.target.value);
  }
  function setSelectGroomMobile(e) {
    setGroomMobile(e.target.value);
  }
  function setSelectApplicantNameMl(e) {
    setApplicantNameMl(e.target.value);
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
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()){

      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = (Math.floor(Difference_In_Days));
      console.log(Difference_In_DaysRounded);
      if (Difference_In_DaysRounded >= 180) {
        setChildAadharHIde(true);
      } else {
        setChildAadharHIde(false);
        setChildAadharNo("");
      }
    } else {
      setChildDOB(null);
      setDOBError(true);      
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }

    // const today = new Date();
    // const birthDate = new Date(value);
    // let diffdate = birthDate.setMonth(birthDate.getMonth() - 6)
    // console.log(diffdate);
    // let age_in_ms = today - birthDate;
    // let age_in_years = age_in_ms / (1000 * 60 * 60 * 24 * 365);
    // setMotherAgeMarriage(Math.floor(age_in_years));
  }
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
    }
  }
  
  function setSelectChildLastNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
    }
  }
  function setSelectChildFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
    }
  }
  function setSelectChildLastNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
    }
  }
  function setSelectGroomAadharNo(e) {
    setGroomAadharNo(e.target.value);
  }
  function setSelectGroomFatherAdharNo(e) {
    setGroomFatherAdharNo(e.target.value);
  }
  function setSelectGroomMotherAdharNo(e) {
    setGroomMotherAdharNo(e.target.value);
  }
  
  function setselectGender(value) {
    selectGender(value);
  }
  // function setSelectPermanentCountry(value) {
  //   setPermanentCountry(value);
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
      sessionStorage.setItem("groomPassportNo", groomPassportNo ? groomPassportNo : null);
      sessionStorage.setItem("groomMotherAdharNo", groomMotherAdharNo ? groomMotherAdharNo : null);
      sessionStorage.setItem("groomFatherAdharNo", groomFatherAdharNo ? groomFatherAdharNo : null);
      sessionStorage.setItem("groomFirstnameEn", groomFirstnameEn ? groomFirstnameEn : null);
      sessionStorage.setItem("groomMiddlenameEn", groomMiddlenameEn ? groomMiddlenameEn : null);
      sessionStorage.setItem("groomLastnameEn", groomLastnameEn ? groomLastnameEn : null);
      sessionStorage.setItem("ChildLastNameEn", ChildLastNameEn ? ChildLastNameEn : null);
      sessionStorage.setItem("ChildFirstNameEn", ChildFirstNameEn ? ChildFirstNameEn : null);
      sessionStorage.setItem("ChildMiddleNameEn", ChildMiddleNameEn ? ChildMiddleNameEn : null);
      sessionStorage.setItem("groomSocialSecurityNo", groomSocialSecurityNo ? groomSocialSecurityNo : null);
      sessionStorage.setItem("ChildFirstNameMl", ChildFirstNameMl ? ChildFirstNameMl : null);
      sessionStorage.setItem("ChildMiddleNameMl", ChildMiddleNameMl ? ChildMiddleNameMl : null);
      sessionStorage.setItem("ChildLastNameMl", ChildLastNameMl ? ChildLastNameMl : null);
      sessionStorage.setItem("isChildName", isChildName);
     // sessionStorage.setItem("PermanentCountry", PermanentCountry ? PermanentCountry.code : null);
      // sessionStorage.setItem("isMotherInfo", isMotherInfo);
      onSelect(config.key, {
        ChildDOB,
        tripStartTime,
        Gender,
        ChildAadharNo,
        groomPassportNo,
        groomMotherAdharNo,
        groomFatherAdharNo,
        groomSocialSecurityNo,
        groomFirstnameEn,
        groomMiddlenameEn,
        groomLastnameEn,
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
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}      
      <FormStep t={t}  >

        <div className="row">
         <div className="col-md-12">
           <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_REGISTRATION_DETAILS")}`}</span>{" "}
           </h1>
            <CardLabel>
              {t("NATIONALITY_AND_RESIDENTSHIP")}
            </CardLabel> 
         </div>        
         <div className="col-md-4">
              <input type="radio" name="options" value="INDIAN_NATIONAL" checked={selectedOption === "INDIAN_NATIONAL"} onChange={handleOptionChange} />
              {t(" INDIAN_NATIONAL")}
         </div>
         <div className="col-md-4">
              <input type="radio" name="options" value="NRI" checked={selectedOption === "NRI"} onChange={handleOptionChange} />
              {t(" NRI")}
         </div>
         <div className="col-md-4">
              <input type="radio" name="options" value="FOREIN_NATIONAL" checked={selectedOption === "FOREIN_NATIONAL"} onChange={handleOptionChange} />
              {t(" FOREIN_NATIONAL")}
         </div>
        </div>
        <div className="row">
          <div className="col-md-12">
             <CardLabel>
                {t("AADHAR_AND_PASSPORT_NO")}
             </CardLabel> 
          </div> 
            
          <div className="col-md-4">
                {" "}
               
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="groomPassportNo"
                value={groomPassportNo}
                onChange={setSelectGroomPassportNo}
                disable={isEdit}
                placeholder={`${t("CR_PASSPORT_NO")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CR_INVALID_PASSPORT_NO") })}
              />
          </div>
          <div className="col-md-4">
                {" "}
               
                <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="groomAdharNo"
                value={groomAdharNo}
                onChange={setSelectGroomAadharNo}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
          </div>
          <div className="col-md-4">
                {" "}
                
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomSocialSecurityNo"
                  value={groomSocialSecurityNo}
                  onChange={setSelectGroomSocialSecurityNo}
                  // disable={isChildName}
                  placeholder={`${t("SOCIAL_SECURITY_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_SOCIAL_SECURITY_NO") })}
                />
          </div>
       </div>
       <div className="col-md-row">
            <div className="col-md-12">
              <CardLabel >
                 {t("CR_NAME")}
                 <span className="mandatorycss">*</span>
              </CardLabel>
            </div>
       </div>
       <div className="col-md-row">
            <div className="col-md-3">
             
             <CardLabel>
                 {t("CR_FIRST_NAME_EN")}
             </CardLabel>
             <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="groomFirstnameEn"
              value={groomFirstnameEn}
              onChange={setSelectGroomFirstnameEn}
              disable={isEdit}
              placeholder={`${t("CR_FIRST_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
              />
           </div>
      
           <div className="col-md-3">
                <CardLabel>
                     {t("CR_MIDDLE_NAME_EN")}
                </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="groomMiddlenameEn"
              value={groomMiddlenameEn}
              onChange={setSelectGroomMiddlenameEn}
              disable={isEdit}
              placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
            />
          </div>
          <div className="col-md-3">
             <CardLabel>
                   {t("CR_LAST_NAME_EN")}
             </CardLabel>
             <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="groomLastnameEn"
              value={groomLastnameEn}
              onChange={setSelectGroomLastnameEn}
              disable={isEdit}
              placeholder={`${t("CR_LAST_NAME_EN")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
             />
          </div>
          <div className="col-md-3">
             <CardLabel>
                  {t("CR_MOBILE_NO")}
             </CardLabel>
             <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="groomMobile"
              value={groomMobile}
              onChange={setSelectGroomMobile}
              disable={isEdit}
              placeholder={`${t("CR_MOBILE_NO")}`}
              {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
             />
          </div> 
          
          <div className="col-md-3">
            <CardLabel>
              {t("CR_FIRST_NAME")}
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameEn"
              value={ApplicantNameEn}
              onChange={setSelectApplicantNameEn}
              disable={isEdit}
              placeholder={`${t("CR_FIRST_NAME_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_MIDDLE_NAME")}
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameMl"
              value={ApplicantNameMl}
              onChange={setSelectApplicantNameMl}
              disable={isEdit}
              placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })}
            />
          </div>
          <div className="col-md-3">
             <CardLabel>
              {t("CR_LAST_NAME")}
             </CardLabel>
             <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameMl"
              value={ApplicantNameMl}
              onChange={setSelectApplicantNameMl}
              disable={isEdit}
              placeholder={`${t("CR_LAST_NAME_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })}
             />
          </div>
          <div className="col-md-3">
             <CardLabel>
                {t("CR_EMAIL")}
             </CardLabel>
             <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameMl"
              value={ApplicantNameMl}
              onChange={setSelectApplicantNameMl}
              disable={isEdit}
              placeholder={`${t("CR_EMAIL")}`}
              {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
             />
          </div>
        </div>
          
          
          <div className="col-md-row">
          <div className="col-md-12">

          <div className="col-md-4">
              <CardLabel>{`${t("CR_GENDER")}`}<span className="mandatorycss">*</span></CardLabel></div>
              <div className="col-md-4">
              <CardLabel>{`${t("CR_AGE_AND_DOB")}`}<span className="mandatorycss">*</span></CardLabel></div>    
          </div>
          </div>
          <div className="col-md-row">
          <div className="col-md-3">

              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={true}
                option={menu}
                selected={gender}
                select={setselectGender}
                placeholder={`${t("CR_GENDER")}`}
                {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
              />
              </div>
              <div className="col-md-3" >
              <DatePicker date={ChildDOB} name="ChildDOB" onChange={setselectChildDOB} placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`} />
              </div>
              <div className="col-md-3" >
              
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameMl"
              value={ApplicantNameMl}
              onChange={setSelectApplicantNameMl}
              disable={isEdit}
              placeholder={`${t("CR_AGE")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_AGE") })}
            />
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_PARENT_DETAILS")}`}</span>{" "}
            </h1>
            </div>
            <div className="col-md-3">
           <CardLabel>
              {t("CR_PARENTS_GUARDIAN_DETILS")}
            </CardLabel> 
         </div>        
            <div className="col-md-3">
              <input type="radio" name="options" value="CR_PARENTS" checked={selectedOption === "CR_PARENTS"} onChange={handleOptionChange} />
              {t(" CR_PARENTS")}
            </div>
            <div className="col-md-3">
              <input type="radio" name="options" value="CR_GUARDIAN" checked={selectedOption === "CR_GUARDIAN"} onChange={handleOptionChange} />
              {t(" CR_GUARDIAN")}
            </div>
            </div>
            
            <div className="col-md-row">
            <div className="col-md-12">
            <div className="col-md-3">
            <CardLabel>
              {t("CR_FATHER")}
            </CardLabel>
            </div>
            <div className="col-md-4">
            {" "}
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="groomFatherAdharNo"
                value={groomFatherAdharNo}
                onChange={setSelectGroomFatherAdharNo}
                disable={isEdit}
                placeholder={`${t("CS_FATHER_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_FATHER_INVALID_AADHAR_NO") })}
              />
              </div>
              <div className="col-md-4">
              {" "}
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="ChildMiddleNameEn"
                  value={ChildMiddleNameEn}
                  onChange={setSelectChildMiddleNameEn}
                  // disable={isChildName}
                  placeholder={`${t("CR_FATHER_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_PASSPORT_NO") })}
                />
              </div>
              </div>
              </div>
              <div className="col-md-row">
            <div className="col-md-12"> 
            <div className="col-md-3"> 
              <CardLabel>
              {t("CR_MOTHER")}
            </CardLabel>
            </div>
            <div className="col-md-4">
                {" "}
               
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="groomMotherAdharNo"
                value={groomMotherAdharNo}
                onChange={setSelectGroomMotherAdharNo}
                disable={isEdit}
                placeholder={`${t("CS_MOTHER_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_FATHER_INVALID_AADHAR_NO") })}
              />
              </div>
              <div className="col-md-4">
                {" "}
               
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="ChildMiddleNameEn"
                  value={ChildMiddleNameEn}
                  onChange={setSelectChildMiddleNameEn}
                  // disable={isChildName}
                  placeholder={`${t("CR_MOTHER_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_PASSPORT_NO") })}
                />
              </div>
              </div>
              </div>
        <div className="row">
        <div className="col-md-12">
        <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMENANT_ADDRESS_DETAILS")}`}</span>{" "}
        </h1>
        <CardLabel>
              {t("PERMANENT_ADDRESS")}
        </CardLabel> 
        </div>
        </div>
     
        {toast && (
          <Toast
            error={
              AadharError || DOBError
              // || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
            }
            label={
              AadharError || DOBError
                ? //  || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
                // InstitutionError || SignedOfficerInstError || signedOfficerDesgInstError
                AadharError
                  ? t(`CS_COMMON_INVALID_AADHAR_NO`) : DOBError ? t(`BIRTH_DOB_VALIDATION_MSG`)
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
export default GroomDetails;
