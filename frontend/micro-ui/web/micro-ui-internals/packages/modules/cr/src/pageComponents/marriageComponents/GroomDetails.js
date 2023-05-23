import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  CheckBox,
  DatePicker,
  BackButton,
  Loader,
  LabelFieldPair,
  RadioButtons,
  Toast,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { sortDropdownNames } from "../../utils";

const GroomDetails = ({ config, onSelect, userType, formData, isEditMarriage = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: maritalStatus = {}, isMaritalStatusLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "MaritalStatus"
  );

  const parentDetails = [
    { i18nKey: "CR_GROOM_PARENTS", code: "PARENT" },
    { i18nKey: "CR_GROOM_GUARDIAN", code: "GUARDIAN" },
  ];
  const groomParent = parentDetails.map((parent) => parent.code);
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      console.log(`{${year}-${month}-${day}}`);
      return `${year}-${month}-${day}`;

      //  return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };
  let gender = [];
  let cmbMaritalStatus = [];
  Menu &&
    Menu.map((groomGenderDetails) => {
      gender.push({
        i18nKey: `CR_COMMON_GENDER_${groomGenderDetails.code}`,
        code: `${groomGenderDetails.code}`,
        value: `${groomGenderDetails.code}`,
      });
    });
  maritalStatus &&
    maritalStatus["birth-death-service"] &&
    maritalStatus["birth-death-service"].MaritalStatus &&
    maritalStatus["birth-death-service"].MaritalStatus.map((ob) => {
      cmbMaritalStatus.push(ob);
    });

  const filteredGender = gender?.filter((gen) => gen.code === "MALE" || gen.code === "FEMALE");

  console.log({ gender });

  const [isParent, setIsParent] = useState(formData?.GroomDetails?.isParent ? formData?.GroomDetails?.isParent : false);
  const [isGuardian, setIsGuardian] = useState(formData?.GroomDetails?.isGuardian ? formData?.GroomDetails?.isGuardian : false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  // const [isInitialRenderRadioButtons, setisInitialRenderRadioButtons] = useState(true);
  const [groomGender, selectGroomGender] = useState(formData?.GroomDetails?.groomGender);
  const [groomDOB, setGroomDOB] = useState(isEditMarriage ? convertEpochToDate(formData?.GroomDetails?.groomDOB) : formData?.GroomDetails?.groomDOB);
  const [groomFathernameEn, setGroomFathernameEn] = useState(
    formData?.GroomDetails?.groomFathernameEn ? formData?.GroomDetails?.groomFathernameEn : ""
  );
  const [groomGuardiannameEn, setGroomGuardiannameEn] = useState(
    formData?.GroomDetails?.groomGuardiannameEn ? formData?.GroomDetails?.groomGuardiannameEn : ""
  );
  const [groomGuardiannameMl, setGroomGuardiannameMl] = useState(
    formData?.GroomDetails?.groomGuardiannameMl ? formData?.GroomDetails?.groomGuardiannameMl : ""
  );
  const [groomFathernameMl, setGroomFathernameMal] = useState(
    formData?.GroomDetails?.groomFathernameMl ? formData?.GroomDetails?.groomFathernameMl : ""
  );
  const [groomMothernameEn, setGroomMothernameEn] = useState(
    formData?.GroomDetails?.groomMothernameEn ? formData?.GroomDetails?.groomMothernameEn : ""
  );
  const [groomMothernameMl, setGroomMothernameMal] = useState(
    formData?.GroomDetails?.groomMothernameMl ? formData?.GroomDetails?.groomMothernameMl : ""
  );
  const [groomPassportNo, setGroomPassportNo] = useState(formData?.GroomDetails?.groomPassportNo ? formData?.GroomDetails?.groomPassportNo : "");
  const [groomAadharNo, setGroomAadharNo] = useState(formData?.GroomDetails?.groomAadharNo ? formData?.GroomDetails?.groomAadharNo : "");
  const [groomFatherAadharNo, setGroomFatherAadharNo] = useState(
    formData?.GroomDetails?.groomFatherAadharNo ? formData?.GroomDetails?.groomFatherAadharNo : ""
  );
  const [groomGuardianAadharNo, setGroomGuardianAadharNo] = useState(
    formData?.GroomDetails?.groomGuardianAadharNo ? formData?.GroomDetails?.groomGuardianAadharNo : ""
  );
  const [groomMotherAadharNo, setGroomMotherAadharNo] = useState(
    formData?.GroomDetails?.groomMotherAadharNo ? formData?.GroomDetails?.groomMotherAadharNo : ""
  );
  const [groomSocialSecurityNo, setGroomSocialSecurityNo] = useState(
    formData?.GroomDetails?.groomSocialSecurityNo ? formData?.GroomDetails?.groomSocialSecurityNo : ""
  );

  const [toast, setToast] = useState(false);
  const [DOBError, setDOBError] = useState(formData?.GroomDetails?.groomDOB ? false : false);

  const [groomIsSpouseLiving, setGroomIsSpouseLiving] = useState(
    formData?.GroomDetails?.groomIsSpouseLiving ? formData?.GroomDetails?.groomIsSpouseLiving : null
  );
  const [groomMaritalstatusID, setGroomMaritalstatusID] = useState(
    formData?.GroomDetails?.groomMaritalstatusID ? formData?.GroomDetails?.groomMaritalstatusID : null
  );
  const [groomMiddlenameEn, setGroomMiddlenameEn] = useState(
    formData?.GroomDetails?.groomMiddlenameEn ? formData?.GroomDetails?.groomMiddlenameEn : ""
  );
  const [groomLastnameEn, setGroomLastnameEn] = useState(formData?.GroomDetails?.groomLastnameEn ? formData?.GroomDetails?.groomLastnameEn : "");
  const [selectedOption, setSelectedOption] = useState(formData?.GroomDetails?.selectedOption ? formData?.GroomDetails?.selectedOption : "ILB");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [groomParentGuardian, setGroomParentGuardian] = useState(
    formData?.GroomDetails?.groomParentGuardian ? formData?.GroomDetails?.groomParentGuardian : "PARENT"
  );
  const [groomMobile, setGroomMobile] = useState(formData?.GroomDetails?.groomMobile ? formData?.GroomDetails?.groomMobile : "");
  const [groomFirstnameEn, setGroomFirstnameEn] = useState(formData?.GroomDetails?.groomFirstnameEn ? formData?.GroomDetails?.groomFirstnameEn : "");
  const [groomFirstnameMl, setGroomFirstnameMl] = useState(formData?.GroomDetails?.groomFirstnameMl ? formData?.GroomDetails?.groomFirstnameMl : "");
  const [groomMiddlenameMl, setGroomMiddlenameMl] = useState(
    formData?.GroomDetails?.groomMiddlenameMl ? formData?.GroomDetails?.groomMiddlenameMl : ""
  );
  const [groomLastnameMl, setGroomLastnameMal] = useState(formData?.GroomDetails?.groomLastnameMl ? formData?.GroomDetails?.groomLastnameMl : "");
  const [groomEmailid, setGroomEmailid] = useState(formData?.GroomDetails?.groomEmailid ? formData?.GroomDetails?.groomEmailid : "");
  const [groomAge, setGroomAge] = useState(formData?.GroomDetails?.groomAge ? formData?.GroomDetails?.groomAge : "");
  const [groomNoOfSpouse, setGroomNoOfSpouse] = useState(formData?.GroomDetails?.groomNoOfSpouse ? formData?.GroomDetails?.groomNoOfSpouse : "");
  const [groomResidentShip, setGroomResidentShip] = useState(
    formData?.GroomDetails?.groomResidentShip ? formData?.GroomDetails?.groomResidentShip : "INDIAN"
  );
  const [AadharError, setAadharError] = useState(false);
  const [AdhaarDuplicationError, setAdhaarDuplicationError] = useState(false);
  const [groomPassportNoError, setSelectGroomPassportNoError] = useState(false);
  const [groomSocialSecurityNoError, setGroomSocialSecurityNoError] = useState(false);
  const [groomFirstnameEnError, setGroomFirstnameEnError] = useState(false);
  const [groomFirstnameMlError, setGroomFirstnameMlError] = useState(false);
  const [groomMiddlenameEnError, setGroomMiddlenameEnError] = useState(false);
  const [groomMiddlenameMlError, setGroomMiddlenameMlError] = useState(false);
  const [groomLastnameEnError, setGroomLastnameEnError] = useState(false);
  const [groomLastnameMlError, setGroomLastnameMalError] = useState(false);
  const [groomFathernameEnError, setGroomFathernameEnError] = useState(false);
  const [groomFathernameMlError, setGroomFathernameMalError] = useState(false);
  const [groomMothernameEnError, setGroomMothernameEnError] = useState(false);
  const [groomMothernameMlError, setGroomMothernameMalError] = useState(false);
  const [groomGuardiannameEnError, setGroomGuardiannameEnError] = useState(false);
  const [groomGuardiannameMlError, setGroomGuardiannameMlError] = useState(false);
  const [groomMobileError, setGroomMobileError] = useState(false);
  const [groomGenderError, setselectGroomGenderError] = useState(false);
  const [groomMaritalstatusIDError, setGroomMaritalstatusIDError] = useState(false);
  const [groomEmailidError, setGroomEmailidError] = useState(false);
  // const [valueRad, setValueRad] = useState(formData?.GroomDetails?.selectedValueRadio ? formData?.GroomDetails?.selectedValueRadio : "");
  const [access, setAccess] = React.useState(true);
  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);

  const onSkip = () => onSelect();
  // useEffect(() => {
  //   if (isInitialRender) {
  //     if (formData?.GroomDetails?.isParent != null) {
  //       setIsInitialRender(false);
  //       setIsParent(formData?.GroomDetails?.isParent);
  //     }
  //   }
  // }, [isInitialRender]);
  // useEffect(() => {
  //   if (isInitialRender) {
  //     if (formData?.GroomDetails?.isGuardian != null) {
  //       setIsInitialRender(false);
  //       setIsGuardian(formData?.GroomDetails?.isGuardian);
  //     }
  //   }
  // }, [isInitialRender]);

  const cmbSpouseLiving = [
    { i18nKey: "Yes", code: true },
    { i18nKey: "No", code: false },
  ];
  function selectgroomResidenship(event) {
    setGroomResidentShip(event.target.value);
  }

  const groomTypeRadio = [
    { i18nKey: "CR_RESIDENT_INDIAN", code: "INDIAN" },
    { i18nKey: "CR_NRI", code: "NRI" },
    { i18nKey: "CR_FOREIGN_NATIONAL", code: "FOREIGN" },
  ];

  const groomTypes = groomTypeRadio.map((type) => type.code);

  function setSelectGroomMaritalstatusID(value) {
    setGroomMaritalstatusID(value);
    setGroomIsSpouseLiving(null);
    setGroomNoOfSpouse("");
  }
  function setSelectGroomSpouseLiving(value) {
    setGroomIsSpouseLiving(value);
    setGroomNoOfSpouse("");
  }
  function setselectGroomGender(value) {
    console.log({ value },"gender");
    if(groomGender === "FEMALE"){
      console.log({ value },"gender1");
      setselectGroomGenderError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }else{
    selectGroomGender(value);
    setselectGroomGenderError(false);
    }
  }
  function setSelectGroomPassportNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[A-Z0-9 ]*$") != null) {
      setGroomPassportNo(e.target.value.length <= 8 ? e.target.value : e.target.value.substring(0, 8));
    }
    //setGroomPassportNo(e.target.value.length<=8 ? e.target.value.replace('[A-PR-WY][1-9]\d\s?\d{4}[1-9]$', '') : (e.target.value.replace('[A-PR-WY][1-9]\d\s?\d{4}[1-9]$', '').substring(0, 8)))
  }
  function setSelectGroomSocialSecurityNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[A-Z-0-9 ]*$") != null) {
      setGroomSocialSecurityNo(e.target.value.length <= 12 ? e.target.value : e.target.value.substring(0, 12));
    }

    // if (e.target.value.length >= 12) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setGroomSocialSecurityNo(e.target.value.replace(/[^A-Z0-9-]/gi, "").substring(0, 9));
    // }
  }
  function setSelectGroomMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setGroomMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10));
    }
  }
  function setSelectGroomEmailid(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomEmailid(e.target.value);
    }
  }
  function setSelectGroomNoOfSpouse(e) {
    if (e.target.value.length === 2) {
      if (e.target.value > 3) {
        return false;
      }
    } else {
      setGroomNoOfSpouse(e.target.value.replace(/[^0-3]/gi, ""));
    }
    //   if (e.target.value.length === 2 && e.target.value > 3) {
    //     return false;
    // } else {
    //   setGroomNoOfSpouse(e.target.value.replace(/[^0-3]/ig, ''));
    // }
    // if (e.target.value.trim().length >= 0) {
    //   setGroomNoOfSpouse(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
    // }
  }
  function setSelectGroomAge(e) {
    if (e.target.value.trim().length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomAge(e.target.value);
    }
    // if (e.target.value.trim().length >= 0) {
    //   setGroomAge(e.target.  // const convertEpochToDate = (dateEpoch) => {
    //   if (dateEpoch) {
    //     const dateFromApi = new Date(dateEpoch);
    //     console.log(dateFromApi);
    //     let month = dateFromApi.getMonth() + 1;
    //     console.log(month);
    //     let day = dateFromApi.getDate();
    //     console.log(day);
    //     let year = dateFromApi.getFullYear();
    //     console.log(year);
    //     month = (month > 9 ? "" : "0") + month;
    //     day = (day > 9 ? "" : "0") + day;
    //     return `${year}-${month}-${day}`;
    //     //  return `${day}-${month}-${year}`;
    //   } else {
    //     return null;
    //   }
    // };value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
    // }
  }

  function setselectGroomDOB(value) {
    setGroomDOB(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birthDate = new Date(value);
    birthDate.setHours(0, 0, 0, 0);

    if (birthDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // let Difference_In_Time = today.getTime() - birthDate.getTime();
      // // console.log("Difference_In_Time" + Difference_In_Time);
      // setDifferenceInTime(today.getTime() - birthDate.getTime());
      // let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      // // console.log("Difference_In_Days" + Math.floor(Difference_In_Days));
      // setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      // setGroomDOB(value);
      // const today = new Date();
      // const birthDate = new Date(value);
      // if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates

      const dob = new Date(value);
      const month_diff = Date.now() - dob.getTime();
      const age_dt = new Date(month_diff);
      const year = age_dt.getUTCFullYear();
      const age = Math.abs(year - 1970);

      setGroomAge(age);
      if (age < 21) {
        setAgeValidationMsg(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        setGroomAge("");
        setGroomDOB("");
      }
    } else {
      setGroomDOB(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function selectParentType(e) {
    setGroomParentGuardian(e.target.value);
  }
  function setParent(e) {
    if (e.target.checked === true) {
      setIsParent(e.target.checked);
    } else {
      setIsParent(e.target.checked);
      setGroomFathernameEn("");
      setGroomMothernameEn("");
      setGroomFatherAadharNo("");
      setGroomMotherAadharNo("");
      setGroomMothernameMal("");
      setGroomFathernameMal("");
    }
  }
  function setGuardian(e) {
    if (e.target.checked === true) {
      setIsGuardian(e.target.checked);
    } else {
      setIsGuardian(e.target.checked);
      setGroomFathernameEn("");
      setGroomMothernameEn("");
      setGroomFatherAadharNo("");
      setGroomMotherAadharNo("");
      setGroomMothernameMal("");
      setGroomFathernameMal("");
    }
  }
  function setSelectGroomFirstnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setGroomFirstnameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomLastnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setGroomLastnameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomMiddlenameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setGroomMiddlenameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomLastnameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setGroomLastnameMal("");
    } else {
      setGroomLastnameMal(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomMiddlenameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setGroomMiddlenameMl("");
    } else {
      setGroomMiddlenameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomFirstnameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setGroomFirstnameMl("");
    } else {
      setGroomFirstnameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectGroomFathernameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setGroomFathernameMal("");
    } else {
      setGroomFathernameMal(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomGuardiannameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setGroomGuardiannameMl("");
    } else {
      setGroomGuardiannameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectGroomFathernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setGroomFathernameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomGuardiannameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setGroomGuardiannameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomMothernameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setGroomMothernameMal("");
    } else {
      setGroomMothernameMal(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectGroomMothernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setGroomMothernameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectGroomAadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setGroomAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue =
      e.target.value.trim().length <= 12
        ? e.target.value.trim().replace(/[^0-9]/gi, "")
        : e.target.value
            .trim()
            .replace(/[^0-9]/gi, "")
            .substring(0, 12);

    if (newValue != "" && (newValue === groomFatherAadharNo || newValue === groomMotherAadharNo || newValue === groomGuardianAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setGroomAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectGroomFatherAdharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setGroomFatherAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue =
      e.target.value.trim().length <= 12
        ? e.target.value.trim().replace(/[^0-9]/gi, "")
        : e.target.value
            .trim()
            .replace(/[^0-9]/gi, "")
            .substring(0, 12);

    if (newValue != "" && (newValue === groomAadharNo || newValue === groomMotherAadharNo || newValue === groomGuardianAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setGroomFatherAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectGroomGardianAdhar(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setGroomGuardianAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue =
      e.target.value.trim().length <= 12
        ? e.target.value.trim().replace(/[^0-9]/gi, "")
        : e.target.value
            .trim()
            .replace(/[^0-9]/gi, "")
            .substring(0, 12);

    if (newValue != "" && (newValue === groomAadharNo || newValue === groomMotherAadharNo || newValue === groomFatherAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setGroomGuardianAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectGroomMotherAdharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setGroomMotherAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }

    const newValue =
      e.target.value.trim().length <= 12
        ? e.target.value.trim().replace(/[^0-9]/gi, "")
        : e.target.value
            .trim()
            .replace(/[^0-9]/gi, "")
            .substring(0, 12);

    if (newValue != "" && (newValue === groomAadharNo || newValue === groomGuardianAadharNo || newValue === groomFatherAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setGroomMotherAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }

  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }

  
  console.log({ isEditMarriage });

  let validFlag = true;
  const goNext = () => {
    if (groomAadharNo != null && groomAadharNo != "") {
      if (groomAadharNo.trim() == null || groomAadharNo.trim() == "" || groomAadharNo.trim() == undefined) {
        setGroomAadharNo("");
      } else if (groomAadharNo != null && groomAadharNo != "") {
        let adharLength = groomAadharNo;
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
    }
    // if(groomPassportNo != null && groomPassportNo != ""){
    //   let pasportLength = groomPassportNo;
    //     if (pasportLength.length < 8 || pasportLength.length > 8) {
    //       validFlag = false;
    //       setSelectGroomPassportNoError(true);
    //       setToast(true);
    //       setTimeout(() => {
    //         setToast(false);
    //       }, 2000);
    //     } else {
    //       setSelectGroomPassportNoError(false);
    //     }
    // } else if (groomPassportNo.trim() == null || groomPassportNo.trim() == '' || groomPassportNo.trim() == undefined) {
    //     setGroomPassportNo("");
    // }else {
    //     setSelectGroomPassportNoError(false);
    // }
    if (groomPassportNo != null && groomPassportNo != "") {
      if (groomPassportNo.trim() == null || groomPassportNo.trim() == "" || groomPassportNo.trim() == undefined) {
        setGroomPassportNo("");
      } else if (groomPassportNo != null && groomPassportNo != "") {
        let pasportLength = groomPassportNo;
        if (pasportLength.length < 8 || pasportLength.length > 8) {
          validFlag = false;
          setSelectGroomPassportNoError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setSelectGroomPassportNoError(false);
        }
      } else {
        setSelectGroomPassportNoError(false);
      }
    }
    if (groomSocialSecurityNo != null && groomSocialSecurityNo != "") {
      if (groomSocialSecurityNo.trim() == null || groomSocialSecurityNo.trim() == "" || groomSocialSecurityNo.trim() == undefined) {
        setGroomSocialSecurityNo("");
        setGroomSocialSecurityNoError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomSocialSecurityNoError(false);
      }
    }
    if (groomFirstnameEn.trim() == null || groomFirstnameEn.trim() == "" || groomFirstnameEn.trim() == undefined) {
      console.log(groomFirstnameEn);
      validFlag = false;
      setGroomFirstnameEn("");
      setGroomFirstnameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setGroomFirstnameEnError(false);
    }
    if (groomFirstnameMl.trim() == null || groomFirstnameMl.trim() == "" || groomFirstnameMl.trim() == undefined) {
      validFlag = false;
      setGroomFirstnameMl("");
      setGroomFirstnameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setGroomFirstnameMlError(false);
    }
    if (groomMiddlenameEn.trim() == null || groomMiddlenameEn.trim() == "" || groomMiddlenameEn.trim() == undefined) {
      setGroomMiddlenameEn("");
    } else {
      if (groomMiddlenameMl.trim() == null || groomMiddlenameMl.trim() == "" || groomMiddlenameMl.trim() == undefined) {
        validFlag = false;
        setGroomMiddlenameMl("");
        setGroomMiddlenameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomMiddlenameMlError(false);
      }
    }
    if (groomMiddlenameMl.trim() == null || groomMiddlenameMl.trim() == "" || groomMiddlenameMl.trim() == undefined) {
      setGroomMiddlenameMl("");
      setGroomMiddlenameEnError(false);
    } else {
      if (groomMiddlenameEn.trim() == null || groomMiddlenameEn.trim() == "" || groomMiddlenameEn.trim() == undefined) {
        validFlag = false;
        setGroomMiddlenameEn("");
        setGroomMiddlenameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomMiddlenameEnError(false);
      }
    }
    if (groomLastnameEn.trim() == null || groomLastnameEn.trim() == "" || groomLastnameEn.trim() == undefined) {
      setGroomLastnameEn("");
    } else {
      if (groomLastnameMl.trim() == null || groomLastnameMl.trim() == "" || groomLastnameMl.trim() == undefined) {
        validFlag = false;
        setGroomLastnameMal("");
        setGroomLastnameMalError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomLastnameMalError(false);
      }
    }
    if (groomLastnameMl.trim() == null || groomLastnameMl.trim() == "" || groomLastnameMl.trim() == undefined) {
      setGroomLastnameMal("");
      setGroomLastnameEnError(false);
    } else {
      if (groomLastnameEn.trim() == null || groomLastnameEn.trim() == "" || groomLastnameEn.trim() == undefined) {
        validFlag = false;
        setGroomLastnameEn("");
        setGroomLastnameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomLastnameEnError(false);
      }
    }
    if (groomParentGuardian === "PARENT") {
      if (groomFatherAadharNo.trim() == null || groomFatherAadharNo.trim() == "" || groomFatherAadharNo.trim() == undefined) {
        setGroomFatherAadharNo("");
      } else if (groomFatherAadharNo != null && groomFatherAadharNo != "") {
        let adharLength = groomFatherAadharNo;
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

      if (groomMotherAadharNo.trim() == null || groomMotherAadharNo.trim() == "" || groomMotherAadharNo.trim() == undefined) {
        setGroomMotherAadharNo("");
      } else if (groomMotherAadharNo != null && groomMotherAadharNo != "") {
        let adharLength = groomMotherAadharNo;
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
      if (groomFathernameEn.trim() == null || groomFathernameEn.trim() == "" || groomFathernameEn.trim() == undefined) {
        validFlag = false;
        setGroomFathernameEn("");
        setGroomFathernameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomFathernameEnError(false);
      }
      if (groomFathernameMl.trim() == null || groomFathernameMl.trim() == "" || groomFathernameMl.trim() == undefined) {
        validFlag = false;
        setGroomFathernameMal("");
        setGroomFathernameMalError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomFathernameMalError(false);
      }
      if (groomMothernameEn.trim() == null || groomMothernameEn.trim() == "" || groomMothernameEn.trim() == undefined) {
        validFlag = false;
        setGroomMothernameEn("");
        setGroomMothernameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomMothernameEnError(false);
      }
      if (groomMothernameMl.trim() == null || groomMothernameMl.trim() == "" || groomMothernameMl.trim() == undefined) {
        validFlag = false;
        setGroomMothernameMal("");
        setGroomMothernameMalError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomMothernameMalError(false);
      }
    }
    if (groomParentGuardian === "GUARDIAN") {
      if (groomGuardianAadharNo.trim() == null || groomGuardianAadharNo.trim() == "" || groomGuardianAadharNo.trim() == undefined) {
        setGroomGuardianAadharNo("");
      } else if (groomGuardianAadharNo != null && groomGuardianAadharNo != "") {
        let adharLength = groomGuardianAadharNo;
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
      if (groomGuardiannameEn.trim() == null || groomGuardiannameEn.trim() == "" || groomGuardiannameEn.trim() == undefined) {
        validFlag = false;
        setGroomGuardiannameEn("");
        setGroomGuardiannameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomGuardiannameEnError(false);
      }
      if (groomGuardiannameMl.trim() == null || groomGuardiannameMl.trim() == "" || groomGuardiannameMl.trim() == undefined) {
        validFlag = false;
        setGroomGuardiannameMl("");
        setGroomGuardiannameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomGuardiannameMlError(false);
      }
    }
    if (groomMobile != null || groomMobile != "" || groomMobile != undefined) {
      let mobileLength = groomMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setGroomMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setGroomMobileError(false);
      }
    } else {
      validFlag = false;
      setGroomMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (groomGender != null || groomGender != "" || groomGender != undefined) {
      if (groomGenderError) {
        validFlag = false;
        setselectGroomGenderError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setselectGroomGenderError(false);
      }
    }
    if (groomMaritalstatusID != null || groomMaritalstatusID != "" || groomMaritalstatusID != undefined) {
      if (groomMaritalstatusIDError) {
        validFlag = false;
        setGroomMaritalstatusIDError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setGroomMaritalstatusIDError(false);
      }
    }
    if (groomEmailid.trim() == null || groomEmailid.trim() == "" || groomEmailid.trim() == undefined) {
      validFlag = false;
      setGroomEmailid("");
      setGroomEmailidError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setGroomEmailidError(false);
    }

    if (validFlag == true) {
      // sessionStorage.setItem("groomDOB", groomDOB ? groomDOB : null);
      // sessionStorage.setItem("groomGender", groomGender ? groomGender.code : null);
      // sessionStorage.setItem("groomAdharNo", groomAdharNo ? groomAdharNo : null);
      // sessionStorage.setItem("groomPassportNo", groomPassportNo ? groomPassportNo : null);
      // sessionStorage.setItem("groomMotherAadharNo", groomMotherAadharNo ? groomMotherAadharNo : null);
      // sessionStorage.setItem("groomFatherAadharNo", groomFatherAadharNo ? groomFatherAadharNo : null);
      // sessionStorage.setItem("groomGuardianAadharNo", groomGuardianAadharNo ? groomGuardianAadharNo : null);
      // sessionStorage.setItem("groomFirstnameEn", groomFirstnameEn ? groomFirstnameEn : null);
      // sessionStorage.setItem("groomMiddlenameEn", groomMiddlenameEn ? groomMiddlenameEn : null);
      // sessionStorage.setItem("groomLastnameEn", groomLastnameEn ? groomLastnameEn : null);
      // sessionStorage.setItem("groomMobile", groomMobile ? groomMobile : null);
      // sessionStorage.setItem("groomEmailid", groomEmailid ? groomEmailid : null);
      // sessionStorage.setItem("groomFathernameEn", groomFathernameEn ? groomFathernameEn : null);
      // sessionStorage.setItem("groomGuardiannameEn", groomGuardiannameEn ? groomGuardiannameEn : null);
      // sessionStorage.setItem("groomFathernameMl", groomFathernameMl ? groomFathernameMl : null);
      // sessionStorage.setItem("groomGuardiannameMl", groomGuardiannameMl ? groomGuardiannameMl : null);
      // sessionStorage.setItem("groomMothernameEn", groomMothernameEn ? groomMothernameEn : null);
      // sessionStorage.setItem("groomMothernameMl", groomMothernameMl ? groomMothernameMl : null);
      // sessionStorage.setItem("groomSocialSecurityNo", groomSocialSecurityNo ? groomSocialSecurityNo : null);
      // sessionStorage.setItem("groomAge", groomAge ? groomAge : null);
      // sessionStorage.setItem("groomFirstnameMl", groomFirstnameMl ? groomFirstnameMl : null);
      // sessionStorage.setItem("groomMiddlenameMl", groomMiddlenameMl ? groomMiddlenameMl : null);
      // sessionStorage.setItem("groomLastnameMl", groomLastnameMl ? groomLastnameMl : null);
      // sessionStorage.setItem("groomNoOfSpouse", groomNoOfSpouse ? groomNoOfSpouse : null);
      // sessionStorage.setItem("groomIsSpouseLiving", groomIsSpouseLiving ? groomIsSpouseLiving : null);
      // sessionStorage.setItem("groomMaritalstatusID", groomMaritalstatusID ? groomMaritalstatusID : null);
      // sessionStorage.setItem("selectedOption", selectedOption ? selectedOption : "ILB");
      onSelect(config.key, {
        groomResidentShip,
        groomAadharNo,
        groomPassportNo,
        groomSocialSecurityNo,
        groomFirstnameEn: groomFirstnameEn.trim(),
        groomFirstnameMl: groomFirstnameMl.trim(),
        groomMiddlenameEn: groomMiddlenameEn.trim(),
        groomMiddlenameMl: groomMiddlenameMl.trim(),
        groomLastnameEn: groomLastnameEn.trim(),
        groomLastnameMl: groomLastnameMl.trim(),
        groomMobile,
        groomEmailid: groomEmailid.trim(),
        groomGender,
        groomDOB,
        groomAge,
        groomParentGuardian,
        groomFathernameEn: groomFathernameEn.trim(),
        groomFathernameMl: groomFathernameMl.trim(),
        groomMothernameEn: groomMothernameEn.trim(),
        groomMothernameMl: groomMothernameMl.trim(),
        groomFatherAadharNo,
        groomMotherAadharNo,
        groomGuardiannameEn: groomGuardiannameEn.trim(),
        groomGuardiannameMl: groomGuardiannameMl.trim(),
        groomGuardianAadharNo,
        groomMaritalstatusID,
        groomNoOfSpouse,
        groomIsSpouseLiving,
      });
    }
  };


  useEffect(() => {
    if (!isEditMarriage) {
      if (gender.length > 0 && cmbMaritalStatus.length > 0) {
        const selectedGender = gender.filter((option) => option.code === "MALE");
        selectGroomGender(selectedGender[0]);
        const currentMarritalStatus = cmbMaritalStatus?.filter((status) => status.code === "UNMARRIED");
        setGroomMaritalstatusID(currentMarritalStatus[0]);
      }
    }
  }, [gender.length, cmbMaritalStatus.length]);


  useEffect(() => {
    if (isEditMarriage) {
      if (cmbMaritalStatus.length > 0 && gender.length > 0) {
        const currentMarritalStatus = cmbMaritalStatus?.filter((status) => status.code === formData?.GroomDetails?.groomMaritalstatusID);
        setGroomMaritalstatusID(currentMarritalStatus[0]);
        const currentGender = gender?.filter((gender) => gender.code === formData?.GroomDetails?.groomGender);
        selectGroomGender(currentGender[0]);
        const currentIsSpouseLiving = cmbSpouseLiving?.filter((value) => value.code === formData?.GroomDetails?.groomIsSpouseLiving);
        setGroomIsSpouseLiving(currentIsSpouseLiving[0]);
      }
    }
  }, [cmbMaritalStatus.length, gender.length]);

  console.log("Groom", formData);

  if (isLoading || isMaritalStatusLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            !groomFirstnameEn ||
            !groomMobile ||
            !groomFirstnameMl ||
            !groomGender ||
            !groomDOB ||
            !groomMaritalstatusID ||
            (groomResidentShip === "INDIAN" ? !groomAadharNo : false) ||
            (groomResidentShip === "NRI" ? !groomPassportNo || !groomSocialSecurityNo : false) ||
            (groomResidentShip === "FOREIGN" ? !groomSocialSecurityNo || !groomPassportNo : false) ||
            (groomParentGuardian === "PARENT" ? !groomFathernameEn || !groomFathernameMl || !groomMothernameEn || !groomMothernameMl : false) ||
            (groomParentGuardian === "GUARDIAN" ? !groomGuardiannameEn || !groomGuardiannameMl : false) ||
            (groomMaritalstatusID?.code === "MARRIED" ? !groomIsSpouseLiving : false)
          }
        >
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_NATIONALITY_AND_RESIDENTSHIP")}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="radios">
                {groomTypes.map((type, index) => (
                  <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                    <input
                      className="groom-residentship"
                      type="radio"
                      name="groomResidentship"
                      style={{ height: "20px", width: "20px" }}
                      onChange={selectgroomResidenship}
                      value={type}
                      checked={groomResidentShip === type}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_AADHAR_AND_PASSPORT_NO")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {groomResidentShip === "INDIAN" ? (
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {`${t("CR_GROOM_AADHAR_NO")}`}
                    {groomResidentShip === "INDIAN" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="groomAadharNo"
                    value={groomAadharNo}
                    onChange={setSelectGroomAadharNo}
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CR_GROOM_AADHAR_NO")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(groomResidentShip === "INDIAN" && {
                      ...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CR_AADHAR_NO_ERROR") }),
                    })}
                  />
                </div>
              ) : (
                <React.Fragment>
                  {groomResidentShip === "NRI" && (
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_GROOM_AADHAR_NO")}`}
                        {groomResidentShip === "INDIAN" && <span className="mandatorycss">*</span>}
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="groomAadharNo"
                        value={groomAadharNo}
                        onChange={setSelectGroomAadharNo}
                        onKeyPress={setCheckSpecialChar}
                        placeholder={`${t("CR_GROOM_AADHAR_NO")}`}
                        inputProps={{
                          maxLength: 12,
                        }}
                        {...(validation = {
                          pattern: "^([0-9]){12}$",
                          isRequired: groomResidentShip === "INDIAN" ? true : false,
                          type: "text",
                          title: t("CR_AADHAR_NO_ERROR"),
                        })}
                      />
                    </div>
                  )}
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_GROOM_PASSPORT_NO")}
                      {(groomResidentShip === "NRI" || groomResidentShip === "FOREIGN") && <span className="mandatorycss">*</span>}
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomPassportNo"
                      value={groomPassportNo}
                      onChange={setSelectGroomPassportNo}
                      placeholder={`${t("CR_GROOM_PASSPORT_NO")}`}
                      {...((groomResidentShip === "NRI" || groomResidentShip === "FOREIGN") && {
                        ...(validation = { pattern: "^[A-Z0-9]{8}$", type: "text", isRequired: true, title: t("CR_PASSPORT_NO_ERROR") }),
                      })}
                    />
                  </div>

                  <div className="col-md-4">
                    <CardLabel>
                      {t("CR_GROOM_SOCIAL_SECURITY_NO")}
                      {(groomResidentShip === "NRI" || groomResidentShip === "FOREIGN") && <span className="mandatorycss">*</span>}
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomSocialSecurityNo"
                      value={groomSocialSecurityNo}
                      onChange={setSelectGroomSocialSecurityNo}
                      placeholder={`${t("CR_GROOM_SOCIAL_SECURITY_NO")}`}
                      {...((groomResidentShip === "NRI" || groomResidentShip === "FOREIGN") && {
                        ...(validation = {
                          pattern: "^[A-Z0-9-]{8,12}$",
                          type: "text",
                          isRequired: true,
                          title: t("CR_SOCIAL_SECURITY_NO_ERROR"),
                        }),
                      })}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_GROOM_FIRST_NAME_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomFirstnameEn"
                  value={groomFirstnameEn}
                  onChange={setSelectGroomFirstnameEn}
                  placeholder={`${t("CR_GROOM_FIRST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_FIRST_NAME_EN_ERROR") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_MIDDLE_NAME_EN")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomMiddlenameEn"
                  value={groomMiddlenameEn}
                  onChange={setSelectGroomMiddlenameEn}
                  placeholder={`${t("CR_GROOM_MIDDLE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_MIDDLE_NAME_EN_ERROR") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_LAST_NAME_EN")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomLastnameEn"
                  value={groomLastnameEn}
                  onChange={setSelectGroomLastnameEn}
                  placeholder={`${t("CR_GROOM_LAST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_LAST_NAME_EN_ERROR") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_GROOM_MOBILE_NO")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomMobile"
                  value={groomMobile}
                  onChange={setSelectGroomMobile}
                  placeholder={`${t("CR_GROOM_MOBILE_NO")}`}
                  {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_MOBILE_NO_ERROR") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_GROOM_FIRST_NAME_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomFirstnameMl"
                  value={groomFirstnameMl}
                  onChange={setSelectGroomFirstnameMal}
                  placeholder={`${t("CR_GROOM_FIRST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_FIRST_NAME_ML_ERROR"),
                  })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_MIDDLE_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomMiddlenameMl"
                  value={groomMiddlenameMl}
                  onChange={setSelectGroomMiddlenameMal}
                  placeholder={`${t("CR_GROOM_MIDDLE_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_MIDDLE_NAME_ML_ERROR"),
                  })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_LAST_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomLastnameMl"
                  value={groomLastnameMl}
                  onChange={setSelectGroomLastnameMal}
                  placeholder={`${t("CR_GROOM_LAST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_LAST_NAME_ML_ERROR"),
                  })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_GROOM_EMAIL")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"email"}
                  optionKey="i18nKey"
                  name="groomEmailid"
                  value={groomEmailid}
                  onChange={setSelectGroomEmailid}
                  placeholder={`${t("CR_GROOM_EMAIL")}`}
                  //pattern: "^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  {...(validation = { isRequired: true, title: t("CR_EMAIL_ERROR") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_GROOM_GENDER")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={sortDropdownNames(filteredGender ? filteredGender : [], "code", t)}
                  selected={groomGender}
                  select={setselectGroomGender}
                  placeholder={`${t("CR_GROOM_GENDER")}`}
                  {...(validation = { isRequired: true })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_GROOM_DATE_OF_BIRTH")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={groomDOB}
                  name="groomDOB"
                  max={moment().subtract(21, "year").format("YYYY-MM-DD")}
                  //max={convertEpochToDate(new Date())}
                  onChange={setselectGroomDOB}
                  placeholder={`${t("CR_GROOM_DATE_OF_BIRTH")}`}
                  {...(validation = {
                    pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_DATE"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_GROOM_AGE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomAge"
                  value={groomAge}
                  disable={true}
                  onChange={setSelectGroomAge}
                  placeholder={`${t("CR_GROOM_AGE")}`}
                  {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_GROOM_MARITAL_STATUS")}
                  <span className="mandatorycss">*</span>
                </CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={sortDropdownNames(cmbMaritalStatus ? cmbMaritalStatus : [], "name", t)}
                  selected={groomMaritalstatusID}
                  select={setSelectGroomMaritalstatusID}
                  placeholder={`${t("CR_GROOM_MARITAL_STATUS")}`}
                  {...(validation = { isRequired: true })}
                />
              </div>
              {groomMaritalstatusID?.code === "MARRIED" && (
                <div className="col-md-4">
                  <CardLabel>
                    {t("CR_ANY_SPOUSE_LIVING")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>{" "}
                  <Dropdown
                    t={t}
                    optionKey="i18nKey"
                    isMandatory={false}
                    option={cmbSpouseLiving}
                    selected={groomIsSpouseLiving}
                    select={setSelectGroomSpouseLiving}
                    placeholder={`${t("CR_ANY_SPOUSE_LIVING")}`}
                    {...(validation = { isRequired: true })}
                  />
                </div>
              )}
              {groomMaritalstatusID?.code === "MARRIED" && groomIsSpouseLiving?.code && (
                <div className="col-md-4">
                  <CardLabel>{t("CR_NUMBER_OF_SPOUSE_LIVING")}</CardLabel>{" "}
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="groomNoOfSpouse"
                    value={groomNoOfSpouse}
                    onChange={setSelectGroomNoOfSpouse}
                    placeholder={`${t("CR_NUMBER_OF_SPOUSE_LIVING")}`}
                    {...(validation = { pattern: "^([0-3]){1}$", type: "text", isRequired: true, title: t("CR_INVALID_NO_OF_SPOUSE_LIVING") })}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_GUARDIAN_DETILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {/* <div className="col-md-6"> */}
              <div className="radios" style={{ justifyContent: "center", columnGap: "40px" }}>
                {groomParent.map((type) => (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", columnGap: "8px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="groomParent"
                      id="flexRadioDefault1"
                      style={{ height: "20px", width: "20px" }}
                      onChange={selectParentType}
                      value={type}
                      checked={groomParentGuardian === type}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {groomParentGuardian === "PARENT" && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{t("CR_GROOM_FATHER_AADHAR_NO")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomFatherAadharNo"
                      value={groomFatherAadharNo}
                      onChange={setSelectGroomFatherAdharNo}
                      onKeyPress={setCheckSpecialChar}
                      placeholder={`${t("CR_GROOM_FATHER_AADHAR_NO")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_AADHAR_NO_ERROR") })}
                    />
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_GROOM_FATHER_NAME_EN")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomFathernameEn"
                      value={groomFathernameEn}
                      onChange={setSelectGroomFathernameEn}
                      placeholder={`${t("CR_GROOM_FATHER_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_FATHER_NAME_EN_ERROR") })}
                    />
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_GROOM_FATHER_NAME_ML")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomFathernameMl"
                      value={groomFathernameMl}
                      onChange={setSelectGroomFathernameMal}
                      placeholder={`${t("CR_GROOM_FATHER_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: true,
                        type: "text",
                        title: t("CR_FATHER_NAME_ML_ERROR"),
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>{t("CR_GROOM_MOTHER_AADHAR_NO")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomMotherAadharNo"
                      value={groomMotherAadharNo}
                      onChange={setSelectGroomMotherAdharNo}
                      onKeyPress={setCheckSpecialChar}
                      placeholder={`${t("CR_GROOM_MOTHER_AADHAR_NO")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_AADHAR_NO_ERROR") })}
                    />
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_GROOM_MOTHER_NAME_EN")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomMothernameEn"
                      value={groomMothernameEn}
                      onChange={setSelectGroomMothernameEn}
                      placeholder={`${t("CR_GROOM_MOTHER_NAME_EN")}`}
                      {...(validation = { isRequired: true })}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_MOTHER_NAME_EN_ERROR") })}
                    />
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_GROOM_MOTHER_NAME_ML")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomMothernameMl"
                      value={groomMothernameMl}
                      onChange={setSelectGroomMothernameMal}
                      placeholder={`${t("CR_GROOM_MOTHER_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: true,
                        type: "text",
                        title: t("CR_MOTHER_NAME_ML_ERROR"),
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {groomParentGuardian === "GUARDIAN" && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{t("CR_GROOM_GUARDIAN_AADHAR_NO")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomGuardianAadharNo"
                      value={groomGuardianAadharNo}
                      onChange={setSelectGroomGardianAdhar}
                      onKeyPress={setCheckSpecialChar}
                      placeholder={`${t("CR_GROOM_GUARDIAN_AADHAR_NO")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_AADHAR_NO_ERROR") })}
                    />
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_GROOM_GUARDIAN_NAME_EN")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomGuardiannameEn"
                      value={groomGuardiannameEn}
                      onChange={setSelectGroomGuardiannameEn}
                      placeholder={`${t("CR_GROOM_GUARDIAN_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_GUARDIAN_NAME_EN_ERROR") })}
                    />
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_GROOM_GUARDIAN_NAME_ML")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="groomGuardiannameMl"
                      value={groomGuardiannameMl}
                      onChange={setSelectGroomGuardiannameMal}
                      placeholder={`${t("CR_GROOM_GUARDIAN_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: true,
                        type: "text",
                        title: t("CR_GUARDIAN_NAME_ML_ERROR"),
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {toast && (
            <Toast
              error={
                AadharError ||
                DOBError ||
                AgeValidationMsg ||
                AdhaarDuplicationError ||
                groomPassportNoError ||
                groomSocialSecurityNoError ||
                groomFirstnameEnError ||
                groomFirstnameMlError ||
                groomMiddlenameEnError ||
                groomMiddlenameMlError ||
                groomLastnameEnError ||
                groomLastnameMlError ||
                groomFathernameEnError ||
                groomFathernameMlError ||
                groomMothernameEnError ||
                groomMothernameMlError ||
                groomGuardiannameEnError ||
                groomGuardiannameMlError ||
                groomMobileError ||
                groomGenderError ||
                groomMaritalstatusIDError
              }
              label={
                AadharError ||
                DOBError ||
                AgeValidationMsg ||
                AdhaarDuplicationError ||
                groomPassportNoError ||
                groomSocialSecurityNoError ||
                groomFirstnameEnError ||
                groomFirstnameMlError ||
                groomMiddlenameEnError ||
                groomMiddlenameMlError ||
                groomLastnameEnError ||
                groomLastnameMlError ||
                groomFathernameEnError ||
                groomFathernameMlError ||
                groomMothernameEnError ||
                groomMothernameMlError ||
                groomGuardiannameEnError ||
                groomGuardiannameMlError ||
                groomMobileError ||
                groomGenderError ||
                groomMaritalstatusIDError
                  ? AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : DOBError
                    ? t(`CR_DOB_ERROR`)
                    : AgeValidationMsg
                    ? t(`CR_INVALID_GROOM_AGE`)
                    : AdhaarDuplicationError
                    ? t(`DUPLICATE_AADHAR_NO`)
                    : groomPassportNoError
                    ? t(`CR_PASSPORT_NO_ERROR`)
                    : groomSocialSecurityNoError
                    ? t(`CR_SOCIAL_SECURITY_NO_ERROR`)
                    : groomFirstnameEnError
                    ? t(`CR_FIRST_NAME_EN_ERROR`)
                    : groomFirstnameMlError
                    ? t(`CR_FIRST_NAME_ML_ERROR`)
                    : groomMiddlenameEnError
                    ? t(`CR_MIDDLE_NAME_EN_ERROR`)
                    : groomMiddlenameMlError
                    ? t(`CR_MIDDLE_NAME_ML_ERROR`)
                    : groomLastnameEnError
                    ? t(`CR_LAST_NAME_EN_ERROR`)
                    : groomLastnameMlError
                    ? t(`CR_LAST_NAME_ML_ERROR`)
                    : groomFathernameEnError
                    ? t(`CR_FATHER_NAME_EN_ERROR`)
                    : groomFathernameMlError
                    ? t(`CR_FATHER_NAME_ML_ERROR`)
                    : groomMothernameEnError
                    ? t(`CR_MOTHER_NAME_EN_ERROR`)
                    : groomMothernameMlError
                    ? t(`CR_MOTHER_NAME_ML_ERROR`)
                    : groomGuardiannameEnError
                    ? t(`CR_GUARDIAN_NAME_EN_ERROR`)
                    : groomGuardiannameMlError
                    ? t(`CR_GUARDIAN_NAME_ML_ERROR`)
                    : groomMobileError
                    ? t(`CR_MOBILE_NO_ERROR`)
                    : groomGenderError
                    ? t(`CR_INVALID_GENDER_CHOOSE`)
                    : groomMaritalstatusIDError
                    ? t(`CR_INVALID_MARITAL_STATUS_CHOOSE`)
                    : groomEmailidError
                    ? t(`CR_EMAIL_ERROR`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
        </FormStep>
      </React.Fragment>
    );
};
export default GroomDetails;
