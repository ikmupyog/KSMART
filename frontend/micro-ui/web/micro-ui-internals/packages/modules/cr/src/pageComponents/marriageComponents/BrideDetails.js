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
import moment from "moment";
import { useTranslation } from "react-i18next";

const BrideDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  Menu;
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: maritalStatus = {}, isMaritalStatusLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "MaritalStatus"
  );

  const parentDetails = [
    { i18nKey: "CR_BRIDE_PARENTS", code: "PARENT" },
    { i18nKey: "CR_BRIDE_GUARDIAN", code: "GUARDIAN" },
  ];
  const brideParent = parentDetails.map((parent) => parent.code);
  let menu = [];
  let cmbMaritalStatus = [];
  Menu &&
    Menu.map((brideGenderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${brideGenderDetails.code}`, code: `${brideGenderDetails.code}`, value: `${brideGenderDetails.code}` });
    });
  maritalStatus &&
    maritalStatus["birth-death-service"] &&
    maritalStatus["birth-death-service"].MaritalStatus &&
    maritalStatus["birth-death-service"].MaritalStatus.map((ob) => {
      cmbMaritalStatus.push(ob);
    });
  const [isParent, setIsParent] = useState(formData?.BrideDetails?.isParent ? formData?.BrideDetails?.isParent : false);
  const [isGuardian, setIsGuardian] = useState(formData?.BrideDetails?.isGuardian ? formData?.BrideDetails?.isGuardian : false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  // const [isInitialRenderRadioButtons, setisInitialRenderRadioButtons] = useState(true);
  const [brideGender, selectBrideGender] = useState(formData?.BrideDetails?.brideGender);
  const [brideDOB, setBrideDOB] = useState(formData?.BrideDetails?.brideDOB ? formData?.BrideDetails?.brideDOB : "");
  const [brideFathernameEn, setBrideFathernameEn] = useState(
    formData?.BrideDetails?.brideFathernameEn ? formData?.BrideDetails?.brideFathernameEn : ""
  );
  const [brideGuardiannameEn, setBrideGuardiannameEn] = useState(
    formData?.BrideDetails?.brideGuardiannameEn ? formData?.BrideDetails?.brideGuardiannameEn : ""
  );
  const [brideGuardiannameMl, setBrideGuardiannameMl] = useState(
    formData?.BrideDetails?.brideGuardiannameMl ? formData?.BrideDetails?.brideGuardiannameMl : ""
  );
  const [brideFathernameMl, setBrideFathernameMal] = useState(
    formData?.BrideDetails?.brideFathernameMl ? formData?.BrideDetails?.brideFathernameMl : ""
  );
  const [brideMothernameEn, setBrideMothernameEn] = useState(
    formData?.BrideDetails?.brideMothernameEn ? formData?.BrideDetails?.brideMothernameEn : ""
  );
  const [brideMothernameMl, setBrideMothernameMal] = useState(
    formData?.BrideDetails?.brideMothernameMl ? formData?.BrideDetails?.brideMothernameMl : ""
  );
  const [bridePassportNo, setBridePassportNo] = useState(formData?.BrideDetails?.bridePassportNo ? formData?.BrideDetails?.bridePassportNo : "");
  const [brideAadharNo, setBrideAadharNo] = useState(formData?.BrideDetails?.brideAadharNo ? formData?.BrideDetails?.brideAadharNo : "");
  const [brideFatherAadharNo, setBrideFatherAadharNo] = useState(
    formData?.BrideDetails?.brideFatherAadharNo ? formData?.BrideDetails?.brideFatherAadharNo : ""
  );
  const [brideGuardianAadharNo, setBrideGuardianAadharNo] = useState(
    formData?.BrideDetails?.brideGuardianAadharNo ? formData?.BrideDetails?.brideGuardianAadharNo : ""
  );
  const [brideMotherAadharNo, setBrideMotherAadharNo] = useState(
    formData?.BrideDetails?.brideMotherAadharNo ? formData?.BrideDetails?.brideMotherAadharNo : ""
  );
  const [brideSocialSecurityNo, setBrideSocialSecurityNo] = useState(
    formData?.BrideDetails?.brideSocialSecurityNo ? formData?.BrideDetails?.brideSocialSecurityNo : ""
  );

  const [toast, setToast] = useState(false);
  const [DOBError, setDOBError] = useState(formData?.BrideDetails?.brideDOB ? false : false);

  const [brideIsSpouseLiving, setBrideIsSpouseLiving] = useState(
    formData?.BrideDetails?.brideIsSpouseLiving ? formData?.BrideDetails?.brideIsSpouseLiving : null
  );
  const [brideMaritalstatusID, setBrideMaritalstatusID] = useState(
    formData?.BrideDetails?.brideMaritalstatusID ? formData?.BrideDetails?.brideMaritalstatusID : null
  );
  const [brideMiddlenameEn, setBrideMiddlenameEn] = useState(
    formData?.BrideDetails?.brideMiddlenameEn ? formData?.BrideDetails?.brideMiddlenameEn : ""
  );
  const [brideLastnameEn, setBrideLastnameEn] = useState(formData?.BrideDetails?.brideLastnameEn ? formData?.BrideDetails?.brideLastnameEn : "");
  const [selectedOption, setSelectedOption] = useState(formData?.BrideDetails?.selectedOption ? formData?.BrideDetails?.selectedOption : "ILB");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [brideParentGuardian, setBrideParentGuardian] = useState(
    formData?.BrideDetails?.brideParentGuardian ? formData?.BrideDetails?.brideParentGuardian : "PARENT"
  );
  const [brideMobile, setBrideMobile] = useState(formData?.BrideDetails?.brideMobile ? formData?.BrideDetails?.brideMobile : "");
  const [brideFirstnameEn, setBrideFirstnameEn] = useState(formData?.BrideDetails?.brideFirstnameEn ? formData?.BrideDetails?.brideFirstnameEn : "");
  const [brideFirstnameMl, setBrideFirstnameMl] = useState(formData?.BrideDetails?.brideFirstnameMl ? formData?.BrideDetails?.brideFirstnameMl : "");
  const [brideMiddlenameMl, setBrideMiddlenameMl] = useState(
    formData?.BrideDetails?.brideMiddlenameMl ? formData?.BrideDetails?.brideMiddlenameMl : ""
  );
  const [brideLastnameMl, setBrideLastnameMal] = useState(formData?.BrideDetails?.brideLastnameMl ? formData?.BrideDetails?.brideLastnameMl : "");
  const [brideEmailid, setBrideEmailid] = useState(formData?.BrideDetails?.brideEmailid ? formData?.BrideDetails?.brideEmailid : "");
  const [brideAge, setBrideAge] = useState(formData?.BrideDetails?.brideAge ? formData?.BrideDetails?.brideAge : "");
  const [brideNoOfSpouse, setBrideNoOfSpouse] = useState(formData?.BrideDetails?.brideNoOfSpouse ? formData?.BrideDetails?.brideNoOfSpouse : "");
  const [brideResidentShip, setBrideResidentShip] = useState(
    formData?.BrideDetails?.brideResidentShip ? formData?.BrideDetails?.brideResidentShip : "INDIAN"
  );
  const [brideAadharError, setBrideAadharError] = useState(formData?.BrideDetails?.brideAadharNo ? false : false);
  const [brideFatherAadharError, setBrideFatherAadharError] = useState(formData?.BrideDetails?.brideFatherAadharNo ? false : false);
  const [brideMotherAadharError, setBrideMotherAadharError] = useState(formData?.BrideDetails?.brideMotherAadharNo ? false : false);
  const [brideGuardianAadharError, setBrideGuardianAadharError] = useState(formData?.BrideDetails?.brideGuardianAadharNo ? false : false);
  // const [valueRad, setValueRad] = useState(formData?.BrideDetails?.selectedValueRadio ? formData?.BrideDetails?.selectedValueRadio : "");
  const [access, setAccess] = React.useState(true);
  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);

  const onSkip = () => onSelect();
  useEffect(() => {
    if (isInitialRender) {
      if (formData?.BrideDetails?.isParent != null) {
        setIsInitialRender(false);
        setIsParent(formData?.BrideDetails?.isParent);
      }
    }
  }, [isInitialRender]);
  useEffect(() => {
    if (isInitialRender) {
      if (formData?.BrideDetails?.isGuardian != null) {
        setIsInitialRender(false);
        setIsGuardian(formData?.BrideDetails?.isGuardian);
      }
    }
  }, [isInitialRender]);

  const cmbSpouseLiving = [
    { i18nKey: "Yes", code: true },
    { i18nKey: "No", code: false },
  ];
  function selectbrideResidenship(event) {
    console.log(event.target.value, "e");
    setBrideResidentShip(event.target.value);
    // setValueRad(value.code);
    // setisInitialRenderRadioButtons(true);
  }
  // useEffect(() => {
  // if (isInitialRenderRadioButtons) {
  // setisInitialRenderRadioButtons(false);
  // if (selectedValueRadio) {
  // // setIsInitialRenderRadio(false);
  // setValueRad(selectedValueRadio.code);
  // }
  // }
  // }, [isInitialRenderRadioButtons]);
  const brideTypeRadio = [
    { i18nKey: "CR_RESIDENT_INDIAN", code: "INDIAN" },
    { i18nKey: "CR_NRI", code: "NRI" },
    { i18nKey: "CR_FOREIGN_NATIONAL", code: "FOREIGN" },
  ];
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
      // return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };
  //const [AdhaarDuplicationError, setAdhaarDuplicationError] = useState(false);
  const brideTypes = brideTypeRadio.map((type) => type.code);
  // const convertEpochToDate = (dateEpoch) => {
  // if (dateEpoch) {
  // const dateFromApi = new Date(dateEpoch);
  // console.log(dateFromApi);
  // let month = dateFromApi.getMonth() + 1;
  // console.log(month);
  // let day = dateFromApi.getDate();
  // console.log(day);
  // let year = dateFromApi.getFullYear();
  // console.log(year);
  // month = (month > 9 ? "" : "0") + month;
  // day = (day > 9 ? "" : "0") + day;
  // return `${year}-${month}-${day}`;
  // // return `${day}-${month}-${year}`;
  // } else {
  // return null;
  // }
  // };

  function setSelectBrideMaritalstatusID(value) {
    setBrideMaritalstatusID(value);
    setBrideIsSpouseLiving(null);
    setBrideNoOfSpouse("");
  }
  function setSelectBrideSpouseLiving(value) {
    setBrideIsSpouseLiving(value);
    setBrideNoOfSpouse("");
  }
  function setselectBrideGender(value) {
    selectBrideGender(value);
  }
  function setSelectBridePassportNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[A-Z0-9 ]*$") != null) {
      setBridePassportNo(e.target.value.length <= 8 ? e.target.value : e.target.value.substring(0, 8));
    }
    //setBridePassportNo(e.target.value.length<=8 ? e.target.value.replace('[A-PR-WY][1-9]\d\s?\d{4}[1-9]$', '') : (e.target.value.replace('[A-PR-WY][1-9]\d\s?\d{4}[1-9]$', '').substring(0, 8)))
  }
  function setSelectBrideSocialSecurityNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[A-Z-0-9 ]*$") != null) {
      setBrideSocialSecurityNo(e.target.value.length <= 12 ? e.target.value : e.target.value.substring(0, 12));
    }

    // if (e.target.value.length >= 12) {
    // return false;
    // // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    // setBrideSocialSecurityNo(e.target.value.replace(/[^A-Z0-9-]/gi, "").substring(0, 9));
    // }
  }
  function setSelectBrideMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setBrideMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10));
    }
  }
  function setSelectBrideEmailid(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setBrideEmailid(e.target.value);
    }
  }
  function setSelectBrideNoOfSpouse(e) {
    if (e.target.value.length === 2) {
      if (e.target.value > 3) {
        return false;
      }
    } else {
      setBrideNoOfSpouse(e.target.value.replace(/[^0-3]/gi, ""));
    }
    // if (e.target.value.length === 2 && e.target.value > 3) {
    // return false;
    // } else {
    // setBrideNoOfSpouse(e.target.value.replace(/[^0-3]/ig, ''));
    // }
    // if (e.target.value.trim().length >= 0) {
    // setBrideNoOfSpouse(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
    // }
  }
  function setSelectBrideAge(e) {
    if (e.target.value.trim().length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setBrideAge(e.target.value);
    }
    // if (e.target.value.trim().length >= 0) {
    // setBrideAge(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
    // }
  }

  function setselectBrideDOB(value) {
    setBrideDOB(value);
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
      // setBrideDOB(value);
      // const today = new Date();
      // const birthDate = new Date(value);
      // if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates

      const dob = new Date(value);
      const month_diff = Date.now() - dob.getTime();
      const age_dt = new Date(month_diff);
      const year = age_dt.getUTCFullYear();
      const age = Math.abs(year - 1970);

      setBrideAge(age);
      if (age < 21) {
        setAgeValidationMsg(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        setBrideAge("");
        setBrideDOB("");
      }
    } else {
      setBrideDOB(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function selectParentType(e) {
    setBrideParentGuardian(e.target.value);
  }
  function setParent(e) {
    if (e.target.checked === true) {
      setIsParent(e.target.checked);
    } else {
      setIsParent(e.target.checked);
      setBrideFathernameEn("");
      setBrideMothernameEn("");
      setBrideFatherAadharNo("");
      setBrideMotherAadharNo("");
      setBrideMothernameMal("");
      setBrideFathernameMal("");
    }
  }
  function setGuardian(e) {
    if (e.target.checked === true) {
      setIsGuardian(e.target.checked);
    } else {
      setIsGuardian(e.target.checked);
      setBrideFathernameEn("");
      setBrideMothernameEn("");
      setBrideFatherAadharNo("");
      setBrideMotherAadharNo("");
      setBrideMothernameMal("");
      setBrideFathernameMal("");
    }
  }
  function setSelectBrideFirstnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setBrideFirstnameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideLastnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setBrideLastnameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideMiddlenameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setBrideMiddlenameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideLastnameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setBrideLastnameMal("");
    } else {
      setBrideLastnameMal(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideMiddlenameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setBrideMiddlenameMl("");
    } else {
      setBrideMiddlenameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideFirstnameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setBrideFirstnameMl("");
    } else {
      setBrideFirstnameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectBrideFathernameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setBrideFathernameMal("");
    } else {
      setBrideFathernameMal(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideGuardiannameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setBrideGuardiannameMl("");
    } else {
      setBrideGuardiannameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectBrideFathernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setBrideFathernameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideGuardiannameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setBrideGuardiannameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideMothernameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setBrideMothernameMal("");
    } else {
      setBrideMothernameMal(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectBrideMothernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setBrideMothernameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectBrideAadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    // setBrideAadharNo(
    // e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    // );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue === brideFatherAadharNo || newValue === brideMotherAadharNo || newValue === brideGuardianAadharNo) {
      setBrideAadharNo("");
      //setAdhaarDuplicationError(true);
      setBrideAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setBrideAadharNo(newValue);
    }
  }
  function setSelectBrideFatherAdharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    // setBrideFatherAadharNo(
    // e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    // );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue === brideAadharNo || newValue === brideMotherAadharNo || newValue === brideGuardianAadharNo) {
      setBrideFatherAadharNo("");
      //setAdhaarDuplicationError(true);
      setBrideFatherAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setBrideFatherAadharNo(newValue);
    }
  }
  function setSelectBrideGardianAdhar(e) {
    // if (e.target.value.trim().length >= 0) {
    // setBrideGuardianAadharNo(
    // e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    // );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue === brideAadharNo || newValue === brideMotherAadharNo || newValue === brideFatherAadharNo) {
      setBrideGuardianAadharNo("");
      //setAdhaarDuplicationError(true);
      setBrideGuardianAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setBrideGuardianAadharNo(newValue);
    }
  }
  function setSelectBrideMotherAdharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    // setBrideMotherAadharNo(
    // e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    // );
    // }

    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue === brideAadharNo || newValue === brideGuardianAadharNo || newValue === brideFatherAadharNo) {
      setBrideMotherAadharNo("");
      //setAdhaarDuplicationError(true);
      setBrideMotherAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setBrideMotherAadharNo(newValue);
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
    if (brideAadharNo.trim() == null || brideAadharNo.trim() == "" || brideAadharNo.trim() == undefined) {
      setBrideAadharNo("");
    } else if (brideAadharNo != null && brideAadharNo != "") {
      let adharLength = brideAadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setBrideAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setBrideAadharError(false);
      }
    } else {
      setBrideAadharError(false);
    }

    if (brideFatherAadharNo.trim() == null || brideFatherAadharNo.trim() == "" || brideFatherAadharNo.trim() == undefined) {
      setBrideFatherAadharNo("");
    } else if (brideFatherAadharNo != null && brideFatherAadharNo != "") {
      let adharLength = brideFatherAadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setBrideFatherAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setBrideFatherAadharError(false);
      }
    } else {
      setBrideFatherAadharError(false);
    }
    if (brideMotherAadharNo.trim() == null || brideMotherAadharNo.trim() == "" || brideMotherAadharNo.trim() == undefined) {
      setBrideMotherAadharNo("");
    } else if (brideMotherAadharNo != null && brideMotherAadharNo != "") {
      let adharLength = brideMotherAadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setBrideMotherAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setBrideMotherAadharError(false);
      }
    } else {
      setBrideMotherAadharError(false);
    }
    if (brideGuardianAadharNo.trim() == null || brideGuardianAadharNo.trim() == "" || brideGuardianAadharNo.trim() == undefined) {
      setBrideGuardianAadharNo("");
    } else if (brideGuardianAadharNo != null && brideGuardianAadharNo != "") {
      let adharLength = brideGuardianAadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setBrideGuardianAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setBrideGuardianAadharError(false);
      }
    } else {
      setBrideGuardianAadharError(false);
    }
    if (validFlag == true) {
      // sessionStorage.setItem("brideDOB", brideDOB ? brideDOB : null);
      // sessionStorage.setItem("brideGender", brideGender ? brideGender.code : null);
      // sessionStorage.setItem("brideAdharNo", brideAdharNo ? brideAdharNo : null);
      // sessionStorage.setItem("bridePassportNo", bridePassportNo ? bridePassportNo : null);
      // sessionStorage.setItem("brideMotherAadharNo", brideMotherAadharNo ? brideMotherAadharNo : null);
      // sessionStorage.setItem("brideFatherAadharNo", brideFatherAadharNo ? brideFatherAadharNo : null);
      // sessionStorage.setItem("brideGuardianAadharNo", brideGuardianAadharNo ? brideGuardianAadharNo : null);
      // sessionStorage.setItem("brideFirstnameEn", brideFirstnameEn ? brideFirstnameEn : null);
      // sessionStorage.setItem("brideMiddlenameEn", brideMiddlenameEn ? brideMiddlenameEn : null);
      // sessionStorage.setItem("brideLastnameEn", brideLastnameEn ? brideLastnameEn : null);
      // sessionStorage.setItem("brideMobile", brideMobile ? brideMobile : null);
      // sessionStorage.setItem("brideEmailid", brideEmailid ? brideEmailid : null);
      // sessionStorage.setItem("brideFathernameEn", brideFathernameEn ? brideFathernameEn : null);
      // sessionStorage.setItem("brideGuardiannameEn", brideGuardiannameEn ? brideGuardiannameEn : null);
      // sessionStorage.setItem("brideFathernameMl", brideFathernameMl ? brideFathernameMl : null);
      // sessionStorage.setItem("brideGuardiannameMl", brideGuardiannameMl ? brideGuardiannameMl : null);
      // sessionStorage.setItem("brideMothernameEn", brideMothernameEn ? brideMothernameEn : null);
      // sessionStorage.setItem("brideMothernameMl", brideMothernameMl ? brideMothernameMl : null);
      // sessionStorage.setItem("brideSocialSecurityNo", brideSocialSecurityNo ? brideSocialSecurityNo : null);
      // sessionStorage.setItem("brideAge", brideAge ? brideAge : null);
      // sessionStorage.setItem("brideFirstnameMl", brideFirstnameMl ? brideFirstnameMl : null);
      // sessionStorage.setItem("brideMiddlenameMl", brideMiddlenameMl ? brideMiddlenameMl : null);
      // sessionStorage.setItem("brideLastnameMl", brideLastnameMl ? brideLastnameMl : null);
      // sessionStorage.setItem("brideNoOfSpouse", brideNoOfSpouse ? brideNoOfSpouse : null);
      // sessionStorage.setItem("brideIsSpouseLiving", brideIsSpouseLiving ? brideIsSpouseLiving : null);
      // sessionStorage.setItem("brideMaritalstatusID", brideMaritalstatusID ? brideMaritalstatusID : null);
      // sessionStorage.setItem("selectedOption", selectedOption ? selectedOption : "ILB");
      onSelect(config.key, {
        brideResidentShip,
        brideAadharNo,
        bridePassportNo,
        brideSocialSecurityNo,
        brideFirstnameEn,
        brideFirstnameMl,
        brideMiddlenameEn,
        brideMiddlenameMl,
        brideLastnameEn,
        brideLastnameMl,
        brideMobile,
        brideEmailid,
        brideGender,
        brideDOB,
        brideAge,
        brideParentGuardian,
        brideFathernameEn,
        brideFathernameMl,
        brideMothernameEn,
        brideMothernameMl,
        brideFatherAadharNo,
        brideMotherAadharNo,
        brideGuardiannameEn,
        brideGuardiannameMl,
        brideGuardianAadharNo,
        brideMaritalstatusID,
        brideNoOfSpouse,
        brideIsSpouseLiving,
      });
    }
  };

  console.log("Bride", formData);
  console.log({ brideDOB });

  if (isLoading || isMaritalStatusLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            !brideFirstnameEn ||
            !brideMobile ||
            !brideFirstnameMl ||
            !brideEmailid ||
            !brideGender ||
            !brideDOB ||
            !brideMaritalstatusID ||
            (brideResidentShip === "INDIAN" ? !brideAadharNo : false) ||
            (brideResidentShip === "NRI" ? !bridePassportNo || !brideSocialSecurityNo : false) ||
            (brideResidentShip === "FOREIGN" ? !brideSocialSecurityNo || !bridePassportNo : false) ||
            (brideParentGuardian === "PARENT"
              ? !brideFathernameEn || !brideFathernameMl || !brideMothernameEn || !brideMothernameMl || !brideFatherAadharNo || !brideMotherAadharNo
              : false) ||
            (brideParentGuardian === "GUARDIAN" ? !brideGuardiannameEn || !brideGuardiannameMl || !brideGuardianAadharNo : false)
          }
        >
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_NATIONALITY_AND_RESIDENTSHIP")}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="radios">
                {brideTypes.map((type, index) => (
                  <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                    <input
                      className="bride-residentship"
                      type="radio"
                      name="brideResidentship"
                      style={{ height: "20px", width: "20px" }}
                      onChange={selectbrideResidenship}
                      value={type}
                      checked={brideResidentShip === type}
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
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_AADHAR_AND_PASSPORT_NO")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            {brideResidentShip === "INDIAN" ? (
              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {`${t("CR_BRIDE_AADHAR_NO")}`}
                  {brideResidentShip === "INDIAN" && <span className="mandatorycss">*</span>}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideAadharNo"
                  value={brideAadharNo}
                  onChange={setSelectBrideAadharNo}
                  onKeyPress={setCheckSpecialChar}
                  placeholder={`${t("CR_BRIDE_AADHAR_NO")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(brideResidentShip === "INDIAN" && {
                    ...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") }),
                  })}
                />
              </div>
            ) : (
              <React.Fragment>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {`${t("CR_BRIDE_AADHAR_NO")}`}
                    {brideResidentShip === "INDIAN" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideAadharNo"
                    value={brideAadharNo}
                    onChange={setSelectBrideAadharNo}
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CR_BRIDE_AADHAR_NO")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(brideResidentShip === "INDIAN" && {
                      ...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") }),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_PASSPORT_NO")}
                    {(brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="bridePassportNo"
                    value={bridePassportNo}
                    onChange={setSelectBridePassportNo}
                    placeholder={`${t("CR_BRIDE_PASSPORT_NO")}`}
                    {...((brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && {
                      ...(validation = { pattern: "^[A-Z0-9]{8}$", type: "text", isRequired: true, title: t("CS_COMMON_INVALID_PASSPORT_NO") }),
                    })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>
                    {t("CR_BRIDE_SOCIAL_SECURITY_NO")}
                    {(brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideSocialSecurityNo"
                    value={brideSocialSecurityNo}
                    onChange={setSelectBrideSocialSecurityNo}
                    placeholder={`${t("CR_BRIDE_SOCIAL_SECURITY_NO")}`}
                    {...((brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && {
                      ...(validation = {
                        pattern: "^[A-Z0-9-]{12}$",
                        type: "text",
                        isRequired: true,
                        title: t("CR_INVALID_SOCIAL_SECURITY_NUMBER"),
                      }),
                    })}
                  />
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardLabel>
                {t("CR_BRIDE_FIRST_NAME_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideFirstnameEn"
                value={brideFirstnameEn}
                onChange={setSelectBrideFirstnameEn}
                placeholder={`${t("CR_BRIDE_FIRST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>{t("CR_BRIDE_MIDDLE_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideMiddlenameEn"
                value={brideMiddlenameEn}
                onChange={setSelectBrideMiddlenameEn}
                placeholder={`${t("CR_BRIDE_MIDDLE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_BRIDE_LAST_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideLastnameEn"
                value={brideLastnameEn}
                onChange={setSelectBrideLastnameEn}
                placeholder={`${t("CR_BRIDE_LAST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CR_BRIDE_MOBILE_NO")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideMobile"
                value={brideMobile}
                onChange={setSelectBrideMobile}
                placeholder={`${t("CR_BRIDE_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardLabel>
                {t("CR_BRIDE_FIRST_NAME_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideFirstnameMl"
                value={brideFirstnameMl}
                onChange={setSelectBrideFirstnameMal}
                placeholder={`${t("CR_BRIDE_FIRST_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_FIRST_NAME_ML"),
                })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_BRIDE_MIDDLE_NAME_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideMiddlenameMl"
                value={brideMiddlenameMl}
                onChange={setSelectBrideMiddlenameMal}
                placeholder={`${t("CR_BRIDE_MIDDLE_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_MIDDLE_NAME_ML"),
                })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_BRIDE_LAST_NAME_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideLastnameMl"
                value={brideLastnameMl}
                onChange={setSelectBrideLastnameMal}
                placeholder={`${t("CR_BRIDE_LAST_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_LAST_NAME_ML"),
                })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CR_BRIDE_EMAIL")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideEmailid"
                value={brideEmailid}
                onChange={setSelectBrideEmailid}
                placeholder={`${t("CR_BRIDE_EMAIL")}`}
                //pattern: "^[^\s@]+@[^\s@]+\.[^\s@]+$"
                {...(validation = { isRequired: true, title: t("CR_INVALID_EMAIL") })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_BRIDE_GENDER")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={true}
                option={menu}
                selected={brideGender}
                select={setselectBrideGender}
                placeholder={`${t("CR_BRIDE_GENDER")}`}
                {...(validation = { isRequired: true })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_BRIDE_DATE_OF_BIRTH_TIME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <DatePicker
                date={brideDOB}
                name="brideDOB"
                max={moment().subtract(21, "year").format("YYYY-MM-DD")}
                //max={convertEpochToDate(new Date())}
                onChange={setselectBrideDOB}
                placeholder={`${t("CR_BRIDE_DATE_OF_BIRTH")}`}
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
                {`${t("CR_BRIDE_AGE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideAge"
                value={brideAge}
                disable={true}
                onChange={setSelectBrideAge}
                placeholder={`${t("CR_BRIDE_AGE")}`}
                {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <CardLabel>
                {t("CR_BRIDE_MARITAL_STATUS")}
                <span className="mandatorycss">*</span>
              </CardLabel>{" "}
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbMaritalStatus}
                selected={brideMaritalstatusID}
                select={setSelectBrideMaritalstatusID}
                placeholder={`${t("CR_BRIDE_MARITAL_STATUS")}`}
                {...(validation = { isRequired: true })}
              />
            </div>
            {brideMaritalstatusID?.code === "MARRIED" && (
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
                  selected={brideIsSpouseLiving}
                  select={setSelectBrideSpouseLiving}
                  placeholder={`${t("CR_ANY_SPOUSE_LIVING")}`}
                  {...(validation = { isRequired: true })}
                />
              </div>
            )}
            {brideMaritalstatusID?.code === "MARRIED" && brideIsSpouseLiving?.code && (
              <div className="col-md-4">
                <CardLabel>{t("CR_NUMBER_OF_SPOUSE_LIVING")}</CardLabel>{" "}
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideNoOfSpouse"
                  value={brideNoOfSpouse}
                  onChange={setSelectBrideNoOfSpouse}
                  placeholder={`${t("CR_NUMBER_OF_SPOUSE_LIVING")}`}
                  {...(validation = { pattern: "^([0-3]){1}$", type: "text", isRequired: true, title: t("CR_INVALID_NO_OF_SPOUSE_LIVING") })}
                />
              </div>
            )}
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
                {brideParent.map((type) => (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", columnGap: "8px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="brideParent"
                      id="flexRadioDefault1"
                      style={{ height: "20px", width: "20px" }}
                      onChange={selectParentType}
                      value={type}
                      checked={brideParentGuardian === type}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {brideParentGuardian === "PARENT" && (
            <div>
              <div className="row">
                <div className="col-md-4">
                  <CardLabel>
                    {t("CR_BRIDE_FATHER_AADHAR_NO")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideFatherAadharNo"
                    value={brideFatherAadharNo}
                    onChange={setSelectBrideFatherAdharNo}
                    placeholder={`${t("CR_BRIDE_FATHER_AADHAR_NO")}`}
                    {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_FATHER_NAME_EN")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideFathernameEn"
                    value={brideFathernameEn}
                    onChange={setSelectBrideFathernameEn}
                    placeholder={`${t("CR_BRIDE_FATHER_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_FATHER_NAME_MAL")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideFathernameMl"
                    value={brideFathernameMl}
                    onChange={setSelectBrideFathernameMal}
                    placeholder={`${t("CR_BRIDE_FATHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_BRIDE_FATHER_NAME_MAL"),
                    })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_MOTHER_AADHAR_NO")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideMotherAadharNo"
                    value={brideMotherAadharNo}
                    onChange={setSelectBrideMotherAdharNo}
                    placeholder={`${t("CR_BRIDE_MOTHER_AADHAR_NO")}`}
                    {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_MOTHER_NAME_EN")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideMothernameEn"
                    value={brideMothernameEn}
                    onChange={setSelectBrideMothernameEn}
                    placeholder={`${t("CR_BRIDE_MOTHER_NAME_EN")}`}
                    {...(validation = { isRequired: true })}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_MOTHER_NAME_ML")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideMothernameMl"
                    value={brideMothernameMl}
                    onChange={setSelectBrideMothernameMal}
                    placeholder={`${t("CR_BRIDE_MOTHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_MOTHER_NAME_ML"),
                    })}
                  />
                </div>
              </div>
            </div>
          )}
          {brideParentGuardian === "GUARDIAN" && (
            <div>
              <div className="row">
                <div className="col-md-4">
                  <CardLabel>
                    {t("CR_BRIDE_GUARDIAN_AADHAR_NO")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideGuardianAadharNo"
                    value={brideGuardianAadharNo}
                    onChange={setSelectBrideGardianAdhar}
                    placeholder={`${t("CR_BRIDE_GUARDIAN_AADHAR_NO")}`}
                    {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_GUARDIAN_NAME_EN")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideGuardiannameEn"
                    value={brideGuardiannameEn}
                    onChange={setSelectBrideGuardiannameEn}
                    placeholder={`${t("CR_BRIDE_GUARDIAN_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_GUARDIAN_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_BRIDE_GUARDIAN_NAME_ML")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideGuardiannameMl"
                    value={brideGuardiannameMl}
                    onChange={setSelectBrideGuardiannameMal}
                    placeholder={`${t("CR_BRIDE_GUARDIAN_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_GUARDIAN_NAME_ML"),
                    })}
                  />
                </div>
              </div>
            </div>
          )}
          {toast && (
            <Toast
              error={
                brideAadharError || AgeValidationMsg || brideFatherAadharError || brideMotherAadharError || brideGuardianAadharError
                //AdhaarDuplicationError
              }
              label={
                brideAadharError || AgeValidationMsg || brideFatherAadharError || brideMotherAadharError || brideGuardianAadharError
                  ? brideAadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : AgeValidationMsg
                    ? t(`CR_INVALID_BRIDE_AGE`)
                    : brideFatherAadharError
                    ? t(`CS_INVALID_FATHER_AADHAR_NO`)
                    : brideMotherAadharError
                    ? t(`CS_INVALID_MOTHER_AADHAR_NO`)
                    : brideGuardianAadharError
                    ? t(`CS_INVALID_GUARDIAN_AADHAR_NO`)
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
export default BrideDetails;
