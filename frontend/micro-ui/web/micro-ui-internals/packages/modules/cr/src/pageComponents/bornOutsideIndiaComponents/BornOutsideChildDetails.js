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
// import FormStep from "../../../../../react-components/src/molecules/FormStep";

const BornOutsideChildDetails = ({ config, onSelect, userType, formData, isEditBornOutsideIndia = false }) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [DifferenceInDaysRounded, setDifferenceInDaysRounded] = useState();
  const [workFlowCode, setWorkFlowCode] = useState(formData?.BornOutsideChildDetails?.workFlowCode);
  const [isPayment, setIsPayment] = useState(formData?.BornOutsideChildDetails?.isPayment);
  const [Amount, setAmount] = useState(formData?.BornOutsideChildDetails?.Amount);
  const { t } = useTranslation();
  let validation = {};
  let Difference_In_DaysRounded = "";
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "WorkFlowBornOutside"
  );

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

  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let menu = [];
  let workFlowData = [];
  // let workFlowCode = "BIRTHHOSP21";
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] &&
    WorkFlowDetails["birth-death-service"].WorkFlowBornOutside &&
    WorkFlowDetails["birth-death-service"].WorkFlowBornOutside.map((ob) => {
      workFlowData.push(ob);
    });

  console.log({ workFlowData });

  const [isEditBornOutsidePageComponents, setIsEditBornOutsidePageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBornOutsideIndia ? isEditBornOutsideIndia : false);
  const [childDOB, setChildDOB] = useState(
    isEditBornOutsideIndia &&
      isEditBornOutsidePageComponents === false &&
      (formData?.BornOutsideChildDetails?.IsEditChangeScreen === false || formData?.BornOutsideChildDetails?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.BornOutsideChildDetails?.childDOB)
      : formData?.BornOutsideChildDetails?.childDOB
  );
  const [gender, selectGender] = useState(
    formData?.BornOutsideChildDetails?.gender?.code
      ? formData?.BornOutsideChildDetails?.gender
      : formData?.BornOutsideChildDetails?.gender
      ? menu.filter((menu) => menu.code === formData?.BornOutsideChildDetails?.gender)[0]
      : ""
  );

  const [childAadharNo, setChildAadharNo] = useState(
    formData?.BornOutsideChildDetails?.childAadharNo ? formData?.BornOutsideChildDetails?.childAadharNo : null
  );
  const [DifferenceInTime, setDifferenceInTime] = useState(formData?.BornOutsideChildDetails?.DifferenceInTime);
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
  const [birthPlace, setbirthPlace] = useState("OUTSIDE_COUNTRY");
  const [childPassportNo, setchildPassportNo] = useState(
    formData?.BornOutsideChildDetails?.childPassportNo ? formData?.BornOutsideChildDetails?.childPassportNo : ""
  );
  const [childArrivalDate, setchildArrivalDate] = useState(
    formData?.BornOutsideChildDetails?.childArrivalDate ? formData?.BornOutsideChildDetails?.childArrivalDate : ""
  );
  const [outsideBirthPlaceEn, setoutsideBirthPlaceEn] = useState(
    formData?.BornOutsideChildDetails?.outsideBirthPlaceEn ? formData?.BornOutsideChildDetails?.outsideBirthPlaceEn : ""
  );
  const [outsideBirthPlaceMl, setoutsideBirthPlaceMl] = useState(
    formData?.BornOutsideChildDetails?.outsideBirthPlaceMl ? formData?.BornOutsideChildDetails?.outsideBirthPlaceMl : ""
  );
  const [country, setcountry] = useState(formData?.BornOutsideChildDetails?.country ? formData?.BornOutsideChildDetails?.country : null);
  const [provinceEn, setprovinceEn] = useState(formData?.BornOutsideChildDetails?.provinceEn ? formData?.BornOutsideChildDetails?.provinceEn : "");
  const [provinceMl, setprovinceMl] = useState(formData?.BornOutsideChildDetails?.provinceMl ? formData?.BornOutsideChildDetails?.provinceMl : "");
  const [cityTownEn, setcityTownEn] = useState(formData?.BornOutsideChildDetails?.cityTownEn ? formData?.BornOutsideChildDetails?.cityTownEn : "");
  const [cityTownMl, setcityTownMl] = useState(formData?.BornOutsideChildDetails?.cityTownMl ? formData?.BornOutsideChildDetails?.cityTownMl : "");
  const [postCode, setpostCode] = useState(formData?.BornOutsideChildDetails?.postCode ? formData?.BornOutsideChildDetails?.postCode : "");
  const [toast, setToast] = useState(false);
  const [DateError, setDateError] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.BornOutsideChildDetails?.childAadharNo ? false : false);
  const [ChildPassportError, setChildPassportError] = useState(formData?.BornOutsideChildDetails?.childPassportNo ? false : false);
  const [childArrivalDateError, setchildArrivalDateError] = useState(formData?.BornOutsideChildDetails?.childArrivalDate ? false : false);
  const [ProvinceEnError, setProvinceEnError] = useState(formData?.BornOutsideChildDetails?.ProvinceEnError ? false : false);
  const [ProvinceMlError, setProvinceMlError] = useState(formData?.BornOutsideChildDetails?.ProvinceMlError ? false : false);
  const [cityTownEnError, setcityTownEnError] = useState(formData?.BornOutsideChildDetails?.cityTownEnError ? false : false);
  const [cityTownMlError, setcityTownMlError] = useState(formData?.BornOutsideChildDetails?.cityTownMlError ? false : false);
  const [checkbirthDateTime, setCheckbirthDateTime] = useState({ hh: null, mm: null, amPm: null });
  const [DateTimeError, setDateTimeError] = useState(false);
  const [DateTimeHourError, setDateTimeHourError] = useState(false);
  const [DateTimeMinuteError, setDateTimeMinuteError] = useState(false);
  const [DateTimeAMPMError, setDateTimeAMPMError] = useState(false);
  const [outsideBirthPlaceEnError, setoutsideBirthPlaceEnError] = useState(
    formData?.BornOutsideChildDetails?.outsideBirthPlaceEnError ? false : false
  );
  const [outsideBirthPlaceMlError, setoutsideBirthPlaceMlError] = useState(
    formData?.BornOutsideChildDetails?.outsideBirthPlaceMlError ? false : false
  );
  const [DOBError, setDOBError] = useState(formData?.BornOutsideChildDetails?.childDOB ? false : false);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [isChildName, setIsChildName] = useState(formData?.ChildDetails?.isChildName ? formData?.ChildDetails?.isChildName : false);

  const [access, setAccess] = React.useState(true);

  const filteredCountries = cmbCountry.filter((country) => country.name !== "India ");

  const onSkip = () => onSelect();

  function setselectGender(value) {
    selectGender(value);
  }
  function setSelectcountry(value) {
    setcountry(value);
  }
  function setSelectcityTownEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setcityTownEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectcityTownMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setcityTownMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
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
  useEffect(() => {
    //console.log("time while onchange", birthDateTime);
  }, [birthDateTime]);

  const handleTimeChange = (value, cb) => {
    if (value?.target?.name === "hour12") {
      setCheckbirthDateTime({ ...setCheckbirthDateTime, hh: value?.target?.value ? value?.target?.value : null });
    } else if (value?.target?.name === "minute") {
      setCheckbirthDateTime({ ...checkbirthDateTime, mm: value?.target?.value ? value?.target?.value : null });
    } else if (value?.target?.name === "amPm") {
      setCheckbirthDateTime({ ...checkbirthDateTime, amPm: value?.target?.value ? value?.target?.value : null });
    }
    if (typeof value === "string") {
      cb(value);
      // let hour = value;
      // let period = hour > 12 ? "PM" : "AM";
      // console.log(period);
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
      setpostCode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 6));
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
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
    }
  }

  useEffect(() => {
    if (DifferenceInTime != null) {
      let currentWorgFlow = workFlowData.filter(
        (workFlowData) => workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime
      );
      if (currentWorgFlow.length > 0) {
        setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
        setIsPayment(currentWorgFlow[0].payment);
        setAmount(currentWorgFlow[0].amount);
      }
    }
  }, [DifferenceInTime]);

  function setselectchildArrivalDate(value) {
    setchildArrivalDate(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const childArrivalDate = new Date(value);
    childArrivalDate.setHours(0, 0, 0, 0);

    if (childArrivalDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - childArrivalDate.getTime();

      setDifferenceInTime(today.getTime() - childArrivalDate.getTime());
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      
    }
  }
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setChildFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setChildMiddleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setChildLastNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  function setSelectChildFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setChildFirstNameMl("");
    } else {
      setChildFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setChildMiddleNameMl("");
    } else {
      setChildMiddleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setChildLastNameMl("");
    } else {
      setChildLastNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildAadharNo(e) {
    if (e.target.value.trim().length >= 0) {
      setChildAadharNo(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern) && e.code === "Space") {
      e.preventDefault();
    }
  }

  function setSelectPassportNo(e) {
    if (e.target.value.trim().length >= 0) {
      setchildPassportNo(
        e.target.value.length <= 8
          ? e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "")
          : e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "").substring(0, 8)
      );
    }
  }

  function setSelectprovinceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setprovinceEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  // function setSelectprovinceMl(e) {
  //   let pattern = "/^[\u0D00-\u0D7F\u200D\u200C0-9, \-]*$/";
  //   if (!(e.target.value.match(pattern))) {
  //     e.preventDefault();
  //     setprovinceMl('');
  //   }
  //   else {
  //     setprovinceMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));

  //   }
  // }

  function setSelectprovinceMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setprovinceMl("");
    } else {
      setprovinceMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectoutsideBirthPlaceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setoutsideBirthPlaceEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectoutsideBirthPlaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setoutsideBirthPlaceMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }

  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  let validFlag = true;
  const goNext = () => {
    if (checkbirthDateTime.hh === null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm != null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(true);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm === null && checkbirthDateTime.amPm != null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(false);
      setDateTimeMinuteError(true);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm === null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(false);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm === null && checkbirthDateTime.amPm === null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(false);
      setDateTimeMinuteError(true);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh === null && checkbirthDateTime.mm === null && checkbirthDateTime.amPm != null) {
      validFlag = false;
      //setbirthDateTime("");
      setDateTimeHourError(true);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh === null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm === null) {
      validFlag = false;
      //setbirthDateTime("");
      setDateTimeHourError(true);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm != null) {
      setDateTimeAMPMError(false);
      setDateTimeMinuteError(false);
      setDateTimeHourError(false);
      if (childDOB != null) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const childDateofBirth = new Date(childDOB);
        childDateofBirth.setHours(0, 0, 0, 0);
        if (childDateofBirth.getTime() < today.getTime()) {
          setDateTimeError(false);
        } else if (childDateofBirth.getTime() === today.getTime()) {
          let todayDate = new Date();
          let currenthours = todayDate.getHours();
          let currentMints = todayDate.getHours();
          currenthours = currenthours < 10 ? "0" + currenthours : currenthours;
          currentMints = currentMints < 10 ? "0" + currentMints : currentMints;
          let currentDatetime = currenthours + ":" + currentMints;
          if (birthDateTime > currentDatetime) {
            validFlag = false;
            setbirthDateTime("");
            setCheckbirthDateTime({ hh: "", mm: "", amPm: "" });
            setDateTimeError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setDateTimeError(false);
            // alert("Right Time");
          }
        }
      }
    }
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
    } else {
      setAadharError(false);
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
    if (childArrivalDate !== null && childDOB !== null) {
      if (new Date(childArrivalDate) < new Date(childDOB)) {
        validFlag = false;
        setDateError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDateError(false);
      }
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
    if (provinceMl == null || provinceMl == undefined || provinceMl == "") {
      setProvinceMlError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setProvinceMlError(false);
    }
    if (cityTownEn == null || cityTownEn == undefined || cityTownEn == "") {
      setcityTownEnError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setcityTownEnError(false);
    }
    if (cityTownMl == null || cityTownMl == undefined || cityTownMl == "") {
      setcityTownMlError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setcityTownMlError(false);
    }
    if (outsideBirthPlaceEn == null || outsideBirthPlaceEn == undefined || outsideBirthPlaceEn == "") {
      setoutsideBirthPlaceEnError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setoutsideBirthPlaceEnError(false);
    }
    if (outsideBirthPlaceMl == null || outsideBirthPlaceMl == undefined || outsideBirthPlaceMl == "") {
      setoutsideBirthPlaceMlError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setoutsideBirthPlaceMlError(false);
    }
    if (validFlag == true) {
      onSelect(config.key, {
        stateId,
        tenantId,
        workFlowCode,
        childDOB,
        birthDateTime,
        gender,
        childAadharNo,
        childPassportNo,
        childArrivalDate,
        birthPlace: birthPlace.trim(),
        childFirstNameEn: childFirstNameEn.trim(),
        childMiddleNameEn: childMiddleNameEn.trim(),
        childLastNameEn: childLastNameEn.trim(),
        childFirstNameMl: childFirstNameMl.trim(),
        childMiddleNameMl: childMiddleNameMl.trim(),
        childLastNameMl: childLastNameMl.trim(),
        provinceEn: provinceEn.trim(),
        provinceMl: provinceMl.trim(),
        cityTownEn: cityTownEn.trim(),
        cityTownMl: cityTownMl.trim(),
        postCode,
        outsideBirthPlaceEn: outsideBirthPlaceEn.trim(),
        outsideBirthPlaceMl: outsideBirthPlaceMl.trim(),
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

  if (isLoading || isCountryLoading || isWorkFlowDetailsLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!childPassportNo}>
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
                  onKeyPress={setCheckSpecialChar}
                  placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CheckBox label={t("CR_WANT_TO_ENTER_CHILD_NAME")} onChange={setChildName} value={isChildName} checked={isChildName} />
              </div>
            </div>
          </div>
          {isChildName === false && (
            <div>
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
                      disable={isDisableEdit}
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
                      disable={isDisableEdit}
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
                      disable={isDisableEdit}
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
                      disable={isDisableEdit}
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
                      disable={isDisableEdit}
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
            </div>
          )}

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
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_COUNTRY")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={filteredCountries}
                  selected={country}
                  select={setSelectcountry}
                  placeholder={`${t("CS_COMMON_COUNTRY")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_STATE_REGION_PROVINCE_EN")} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="provinceEn"
                  value={provinceEn}
                  onChange={setSelectprovinceEn}
                  placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_STATE_REGION_PROVINCE_ML")} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="provinceMl"
                  value={provinceMl}
                  onKeyPress={setCheckMalayalamInputField}
                  onChange={setSelectprovinceMl}
                  placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C ]*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_STATE_REGION_PROVINCE_ML"),
                  })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_CITY_TOWN_EN")} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="cityTownEn"
                  value={cityTownEn}
                  onChange={setSelectcityTownEn}
                  placeholder={`${t("CR_CITY_TOWN_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_CITY_TOWN_ML")} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="cityTownMl"
                  value={cityTownMl}
                  onChange={setSelectcityTownMl}
                  placeholder={`${t("CR_CITY_TOWN_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_CITY_TOWN_ML"),
                  })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_ZIP_CODE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
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
                    type: "text",
                    max: 6,
                    min: 6,
                    title: t("CR_INVALID_ZIP_CODE"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_OUTSIDE_BIRTH_PLACE_EN")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="outsideBirthPlaceEn"
                  value={outsideBirthPlaceEn}
                  onChange={setSelectoutsideBirthPlaceEn}
                  disable={isEdit}
                  //  onChange={(e,v) => this.updateTextField(e,v)}
                  // disable={isChildName}
                  placeholder={`${t("CR_OUTSIDE_BIRTH_PLACE_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OUTSIDE_BIRTH_PLACE_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_OUTSIDE_BIRTH_PLACE_ML")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="outsideBirthPlaceMl"
                  value={outsideBirthPlaceMl}
                  onChange={setSelectoutsideBirthPlaceMl}
                  disable={isEdit}
                  //  onChange={(e,v) => this.updateTextField(e,v)}
                  // disable={isChildName}
                  placeholder={`${t("CR_OUTSIDE_BIRTH_PLACE_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_OUTSIDE_BIRTH_PLACE_ML"),
                  })}
                />
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
             
            </div>
          </div> */}

          {toast && (
            <Toast
              error={
                DateError ||
                DOBError ||
                DateTimeError ||
                DateTimeHourError ||
                DateTimeMinuteError ||
                DateTimeAMPMError ||
                ChildPassportError ||
                AadharError ||
                childArrivalDateError ||
                ProvinceEnError ||
                ProvinceMlError ||
                cityTownEnError ||
                cityTownMlError ||
                outsideBirthPlaceEnError ||
                outsideBirthPlaceMlError
              }
              label={
                DateError ||
                DOBError ||
                DateTimeError ||
                DateTimeHourError ||
                DateTimeMinuteError ||
                DateTimeAMPMError ||
                ChildPassportError ||
                AadharError ||
                childArrivalDateError ||
                ProvinceEnError ||
                ProvinceMlError ||
                cityTownEnError ||
                cityTownMlError ||
                outsideBirthPlaceEnError ||
                outsideBirthPlaceMlError
                  ? DateTimeError
                    ? t(`CS_COMMON_DATE_TIME_ERROR`)
                    : DateTimeHourError
                    ? t(`CS_COMMON_DATE_HOUR_ERROR`)
                    : DateTimeMinuteError
                    ? t(`CS_COMMON_DATE_MINUTE_ERROR`)
                    : DateTimeAMPMError
                    ? t(`CS_COMMON_DATE_AMPM_ERROR`)
                    : DOBError
                    ? t(`BIRTH_ERROR_DOB_CHOOSE`)
                    : AadharError
                    ? t(`BIRTH_ERROR_AADHAAR_NO_CHOOSE`)
                    : ChildPassportError
                    ? t(`BIRTH_ERROR_PASSPORT_NO_CHOOSE`)
                    : childArrivalDateError
                    ? t(`BIRTH_ERROR_ARRIVAL_DATE_CHOOSE`)
                    : ProvinceEnError
                    ? t(`BIRTH_ERROR_OUTSIDE_STATE_PROV_EN_ERROR`)
                    : ProvinceMlError
                    ? t(`BIRTH_ERROR_OUTSIDE_STATE_PROV_ML_ERROR`)
                    : cityTownEnError
                    ? t(`BIRTH_ERROR_OUTSIDE_STATE_CITY_TOWN_EN_ERROR`)
                    : cityTownMlError
                    ? t(`BIRTH_ERROR_OUTSIDE_STATE_CITY_TOWN_ML_ERROR`)
                    : outsideBirthPlaceEnError
                    ? t(`BIRTH_ERROR_OUTSIDE_BIRTH_PLACE_EN_ERROR`)
                    : outsideBirthPlaceMlError
                    ? t(`BIRTH_ERROR_OUTSIDE_BIRTH_PLACE_ML_ERROR`)
                    : DateError
                    ? t(`DATE_ERROR`)
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
