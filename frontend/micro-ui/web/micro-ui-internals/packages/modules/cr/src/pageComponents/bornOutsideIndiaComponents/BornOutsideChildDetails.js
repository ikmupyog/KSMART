import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/BOBRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const BornOutsideChildDetails = ({ config, onSelect, userType, formData }) => {
  // console.log(JSON.stringify(formData));
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  let Difference_In_DaysRounded = "";
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  //const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "WorkFlowBirth");
  const convertEpochFormateToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${day}/${month}/${year}`;
    } else {
      return null;
    }
  };
  // WorkFlowDetails &&
  //   WorkFlowDetails["birth-death-service"] && WorkFlowDetails["birth-death-service"].WorkFlowBirth &&
  //   WorkFlowDetails["birth-death-service"].WorkFlowBirth.map((ob) => {
  //     workFlowData.push(ob);
  //     // console.log(workFlowData);
  //   });
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let menu = [];
  // let workFlowData = []
  // let workFlowCode = "BIRTHHOSP21";
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

    // const [workFlowCode, setWorkFlowCode] = useState(); 

  const [childDOB, setChildDOB] = useState(formData?.BornOutsideChildDetails?.childDOB ? formData?.BornOutsideChildDetails?.childDOB : "");
  const [gender, selectGender] = useState(formData?.BornOutsideChildDetails?.gender);

  
  const [childAadharNo, setChildAadharNo] = useState(
    formData?.BornOutsideChildDetails?.childAadharNo ? formData?.BornOutsideChildDetails?.childAadharNo : ""
  );
  const [childFirstNameEn, setChildFirstNameEn] = useState(
    formData?.BornOutsideChildDetails?.childFirstNameEn ? formData?.BornOutsideChildDetails?.childFirstNameEn : ""
  );
  const [childMiddleNameEn, setChildMiddleNameEn] = useState(
    formData?.BornOutsideChildDetails?.childMiddleNameEn ? formData?.BornOutsideChildDetails?.childMiddleNameEn : ""
  );
  const [childLastNameEn, setChildLastNameEn] = useState(
    formData?.BornOutsideChildDetails?.childLastNameEn ? formData?.BornOutsideChildDetails?.childLastNameEn : ""
  );
  const [childFirstNameMl, setChildFirstNameMl] = useState(
    formData?.BornOutsideChildDetails?.childFirstNameMl ? formData?.BornOutsideChildDetails?.childFirstNameMl : ""
  );
  const [childMiddleNameMl, setChildMiddleNameMl] = useState(
    formData?.BornOutsideChildDetails?.childMiddleNameMl ? formData?.BornOutsideChildDetails?.childMiddleNameMl : ""
  );
  const [childLastNameMl, setChildLastNameMl] = useState(
    formData?.BornOutsideChildDetails?.childLastNameMl ? formData?.BornOutsideChildDetails?.childLastNameMl : ""
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [birthDateTime, setbirthDateTime] = useState(
    formData?.BornOutsideChildDetails?.birthDateTime ? formData?.BornOutsideChildDetails?.birthDateTime : ""
  );
  const [childPassportNo, setchildPassportNo] = useState(
    formData?.BornOutsideChildDetails?.childPassportNo ? formData?.BornOutsideChildDetails?.childPassportNo : ""
  );
  const [childArrivalDate, setchildArrivalDate] = useState( formData?.BornOutsideChildDetails?.childArrivalDate ? formData?.BornOutsideChildDetails?.childArrivalDate : "" );
  const [outsideBirthPlace, setoutsideBirthPlace] = useState(
    formData?.BornOutsideChildDetails?.outsideBirthPlace ? formData?.BornOutsideChildDetails?.outsideBirthPlace : null
  );
  const [country, setcountry] = useState(formData?.BornOutsideChildDetails?.country ? formData?.BornOutsideChildDetails?.country  : null
    );
    const [provinceEn, setprovinceEn] = useState(formData?.BornOutsideChildDetails?.provinceEn ? formData?.BornOutsideChildDetails?.provinceEn  : "");
    const [cityTown, setcityTown] = useState(formData?.BornOutsideChildDetails?.cityTown ? formData?.BornOutsideChildDetails?.cityTown   : "" );
    const [postCode, setpostCode] = useState(formData?.BornOutsideChildDetails?.postCode ? formData?.BornOutsideChildDetails?.postCode   : "" );
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.BornOutsideChildDetails?.childAadharNo ? false : false);
  const [ChildPassportError, setChildPassportError] = useState(formData?.BornOutsideChildDetails?.childPassportNo ? false : false);
  const [childArrivalDateError, setchildArrivalDateError] = useState(formData?.BornOutsideChildDetails?.childArrivalDate ? false : false);
  const [ProvinceEnError, setProvinceEnError] = useState(formData?.BornOutsideChildDetails?.ProvinceEnError ? false : false);
  const [cityTownError, setcityTownError] = useState(formData?.BornOutsideChildDetails?.cityTownError ? false : false);
  const [outsideBirthPlaceError, setoutsideBirthPlaceError] = useState(formData?.BornOutsideChildDetails?.outsideBirthPlaceError ? false : false);
  const [DOBError, setDOBError] = useState(formData?.BornOutsideChildDetails?.childDOB ? false : false);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  function setselectGender(value) {
    selectGender(value);
  }
  function setSelectcountry(value) {
      setcountry(value);
     
    }
    function setSelectcityTown(e) {
      if (e.target.value.length === 51) {
        return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setcityTown(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      
      }
    }
    // function setSelectpostCode(e) {
    //   if (e.target.value.length != 0) {
    //     if (e.target.value.length > 6) {
    //       return false;
    //     } else if (e.target.value.length < 6) {
    //       setpostCode(e.target.value);
    //       return false;
    //     } else {
    //       setpostCode(e.target.value);
         
    //     }
    //   }
    // }
    const handleTimeChange = (value, cb) => {
      if (typeof value === "string") {
        cb(value);
        console.log(cb);
        console.log(value);
        let hour = value;
        let period = hour > 12 ? "PM" : "AM";
        console.log(period);
        setbirthDateTime(value);
      }
    };
  
      function setSelectPostCode(e) {
        // if (e.target.value.length != 0) {
        //   if (e.target.value.length > 6) {
        //     return false;
        //   } else if (e.target.value.length < 6) {
        //     setpostCode(e.target.value);
        //     return false;
        //   } else {
        //     setpostCode(e.target.value);
            
        //   }
        // }
        if (e.target.value.trim().length >= 0) {
          setpostCode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6));
        } 
      }
      function setselectChildDOB(value) {
        setChildDOB(value);
        const today = new Date();
        const birthDate = new Date(value);
        if (birthDate.getTime() <= today.getTime()) {
          setDOBError(false);
          // To calculate the time difference of two dates
          let Difference_In_Time = today.getTime() - birthDate.getTime();
          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          Difference_In_DaysRounded = (Math.floor(Difference_In_Days));
          // console.log(Difference_In_DaysRounded);
         
        }
      }
  // function setselectChildDOB(value) {
  //   setChildDOB(value);
  // }
  function setselectchildArrivalDate(value) {
    setchildArrivalDate(value);
  }
  
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildMiddleNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildLastNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));

  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setSelectChildFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildFirstNameMl('');
    }
    else {
      setChildFirstNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildMiddleNameMl('');
    }
    else {
      setChildMiddleNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildLastNameMl('');
    }
    else {
      setChildLastNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildAadharNo(e) {
    if (e.target.value.trim().length >= 0) {
      setChildAadharNo(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  // function setSelectChildAadharNo(e) {
  //   // setContactno(e.target.value.length<=10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 12) {
  //       // setChildAadharNo(e.target.value);
  //       setAadharError(true);
  //       return false;
  //     } else if (e.target.value.length < 12) {
  //       setAadharError(true);
  //       setChildAadharNo(e.target.value);
  //       return false;
  //     } else {
  //       setAadharError(false);
  //       setChildAadharNo(e.target.value);
  //       return true;
  //     }
  //   } else {
  //     setAadharError(false);
  //     setChildAadharNo(e.target.value);
  //     return true;
  //   }
  // }

  function setSelectPassportNo(e) {
    setchildPassportNo(e.target.value);
  }

  function setSelectprovinceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setprovinceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
     
    }
  }

  function setSelectoutsideBirthPlace(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setoutsideBirthPlace(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
     
    }
  }
  let validFlag = true;
  const goNext = () => {
    // if (AadharError) {
    //   validFlag = false;
    //   setAadharError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setAadharError(false);
    // }
    if (childAadharNo != null) {
      let adharLength = childAadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAadharError(false);
      }
    }
    if (ChildPassportError) {
      validFlag = false;
      setChildPassportError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setChildPassportError(false);
    }
    if (childArrivalDateError) {
      validFlag = false;
      setchildArrivalDateError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setchildArrivalDateError(false);
    }

    if (provinceEn == null || provinceEn == undefined || provinceEn == "") {
      setProvinceEnError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
          setToast(false);
      }, 2000);
  } else {
    setProvinceEnError(false);
  }
  if (cityTown == null || cityTown == undefined || cityTown == "") {
    setcityTownError(true);
    validFlag = false;
    setToast(true);
    setTimeout(() => {
        setToast(false);
    }, 2000);
} else {
  setcityTownError(false);
}
if (outsideBirthPlace == null || outsideBirthPlace == undefined || outsideBirthPlace == "") {
  setoutsideBirthPlaceError(true);
  validFlag = false;
  setToast(true);
  setTimeout(() => {
      setToast(false);
  }, 2000);
} else {
  setoutsideBirthPlaceError(false);
}

    if (validFlag == true) {
      sessionStorage.setItem("stateId", stateId ? stateId : null);
      sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      // sessionStorage.setItem("workFlowCode", workFlowCode);
      sessionStorage.setItem("childDOB", childDOB ? childDOB : null);
      sessionStorage.setItem("birthDateTime", birthDateTime ? birthDateTime : null);
      sessionStorage.setItem("gender", gender ? gender.code : null);
      sessionStorage.setItem("childAadharNo", childAadharNo ? childAadharNo : null);
      sessionStorage.setItem("childPassportNo", childPassportNo ? childPassportNo : null);
      sessionStorage.setItem("childArrivalDate", childArrivalDate ? childArrivalDate : null);
      sessionStorage.setItem("childFirstNameEn", childFirstNameEn ? childFirstNameEn : null);
      sessionStorage.setItem("childMiddleNameEn", childMiddleNameEn ? childMiddleNameEn : null);
      sessionStorage.setItem("childLastNameEn", childLastNameEn ? childLastNameEn : null);
      sessionStorage.setItem("childFirstNameMl", childFirstNameMl ? childFirstNameMl : null);
      sessionStorage.setItem("childMiddleNameMl", childMiddleNameMl ? childMiddleNameMl : null);
      sessionStorage.setItem("childLastNameMl", childLastNameMl ? childLastNameMl : null);
      sessionStorage.setItem("provinceEn", provinceEn ? provinceEn : null);
      sessionStorage.setItem("cityTown", cityTown ? cityTown : null);
      sessionStorage.setItem("postCode", postCode ? postCode : null);
      sessionStorage.setItem("outsideBirthPlace",  outsideBirthPlace ? outsideBirthPlace : null);
      sessionStorage.setItem("country", country  ?  country.code : null);

      onSelect(config.key, {
        stateId,
        tenantId,
        // workFlowCode,
        childDOB,
        birthDateTime,
        gender,
        childAadharNo,
        childPassportNo,
        childArrivalDate,
        childFirstNameEn, childMiddleNameEn, childLastNameEn, childFirstNameMl, childMiddleNameMl, childLastNameMl,provinceEn,
        cityTown,
        postCode,
        outsideBirthPlace,
        country,
      });
    }
  };
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
  
  if ( isLoading || isCountryLoading ){
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!childAadharNo}>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{`${t("CS_COMMON_CHILD_AADHAAR")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="childAadharNo"
                  value={childAadharNo}
                   disable={isEdit}
                  onChange={setSelectChildAadharNo}            
                  placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "test", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>

             

              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {`${t("CR_CHILD_PASSPORT_NO")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="childPassportNo"
                  value={childPassportNo}
                  onChange={setSelectPassportNo}
                  disable={isEdit}
                  placeholder={`${t("CR_CHILD_PASSPORT_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_PASSPORT_NO") })}
                />
              </div>
              
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_DATE_OF_ARRIVAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={childArrivalDate}
                  name="childArrivalDate"
                  max={convertEpochToDate(new Date())}
                  // min={childDOB ? childDOB : convertEpochToDate("1900-01-01")}
                  onChange={setselectchildArrivalDate}
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_ARRIVAL")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_DATE_OF_ARRIVAL") })}
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_FIRST_NAME_EN")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childFirstNameEn"
                      value={childFirstNameEn}
                      onChange={setSelectChildFirstNameEn}
                      disable={isEdit}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
                      placeholder={`${t("CR_FIRST_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childMiddleNameEn"
                      value={childMiddleNameEn}
                      onChange={setSelectChildMiddleNameEn}
                      disable={isEdit}
                      placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childLastNameEn"
                      value={childLastNameEn}
                      onChange={setSelectChildLastNameEn}
                      disable={isEdit}
                      placeholder={`${t("CR_LAST_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_FIRST_NAME_ML")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childFirstNameMl"
                      value={childFirstNameMl}
                      onChange={setSelectChildFirstNameMl}
                      disable={isEdit}
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
                    <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childMiddleNameMl"
                      value={childMiddleNameMl}
                      onChange={setSelectChildMiddleNameMl}
                      disable={isEdit}
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
                    <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childLastNameMl"
                      value={childLastNameMl}
                      onChange={setSelectChildLastNameMl}
                      disable={isEdit}
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
              </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={childDOB}
                  name="childDOB"
                  max={convertEpochToDate(new Date())}
                  // min={childDOB ? childDOB : convertEpochToDate("1900-01-01")}
                  onChange={setselectChildDOB}
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>


              
              <div className="col-md-2">
                <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
                <CustomTimePicker name="birthDateTime" onChange={(val) => handleTimeChange(val, setbirthDateTime)} value={birthDateTime} />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_GENDER")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
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
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_BIRTH")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
       
   <div className="row">
   <div className="col-md-12">
 <div className="col-md-3">
            <CardLabel>
              {`${t("CS_COMMON_COUNTRY")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbCountry}
              selected={country}
              select={setSelectcountry}
              placeholder={`${t("CS_COMMON_COUNTRY")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")} <span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="provinceEn"
              value={provinceEn}
              onChange={setSelectprovinceEn}
              placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_CITY_TOWN_EN")} <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="cityTown"
              value={cityTown}
              onChange={setSelectcityTown}
              placeholder={`${t("CR_CITY_TOWN_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_ZIP_CODE")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="postCode"
              value={postCode}
              onChange={setSelectPostCode}
              placeholder={`${t("CR_ZIP_CODE")}`}
               {...(validation = {
                pattern: "^[a-zA-Z-.0-9`' ]*$",
                isRequired: true,
                type: "number",
              
                title: t("CR_INVALID_ZIP_CODE"),
              })}
            />
          </div>
         
          </div>
        
          </div> 
          <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_OUTSIDE_BIRTH_PLACE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="outsideBirthPlace"
                      value={outsideBirthPlace}
                      onChange={setSelectoutsideBirthPlace}
                      disable={isEdit}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
                      placeholder={`${t("CR_OUTSIDE_BIRTH_PLACE")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OUTSIDE_BIRTH_PLACE") })}
                    />
                  </div> 
                  </div> 
                  </div> 

          {toast && (
            <Toast
              error={DOBError || ChildPassportError || AadharError || childArrivalDateError || ProvinceEnError ||  cityTownError || outsideBirthPlaceError}
              label={
                DOBError || ChildPassportError || AadharError || childArrivalDateError || ProvinceEnError ||  cityTownError || outsideBirthPlaceError
                  ? DOBError
                    ? t(`BIRTH_ERROR_DOB_CHOOSE`)
                    : AadharError
                    ? t(`BIRTH_ERROR_AADHAAR_NO_CHOOSE`)
                    : ChildPassportError
                    ? t(`BIRTH_ERROR_PASSPORT_NO_CHOOSE`)
                    : childArrivalDateError
                    ? t(`BIRTH_ERROR_ARRIVAL_DATE_CHOOSE`)
                    : ProvinceEnError
                    ? t(`BIRTH_ERROR_OUTSIDE_STATE_PROV_EN_ERROR`)
                    : cityTownError
                    ? t(`BIRTH_ERROR_OUTSIDE_STATE_CITY_TOWN_EN_ERROR`)
                    : outsideBirthPlaceError
                    ? t(`BIRTH_ERROR_OUTSIDE_BIRTH_PLACE_EN_ERROR`)
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
  }
};
export default BornOutsideChildDetails;
