import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  LabelFieldPair,
  RadioButtons,
  Loader,
  Toast,
  SubmitBar,
  PopUp,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import { TimePicker } from '@material-ui/pickers';
import moment from "moment";
import { sortDropdownNames } from "../../utils";

const BrideDetails = ({ config, onSelect, userType, formData, isEditBride, isEditMarriage = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: maritalStatus = {}, isMaritalStatusLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "MaritalStatus"
  );
  // const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");

  const cmbSpouseLiving = [
    { i18nKey: "Yes", code: true },
    { i18nKey: "No", code: false },
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
      console.log(`{${year}-${month}-${day}}`);
      return `${year}-${month}-${day}`;

      //  return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };
  let gender = [];
  let cmbMaritalStatus = [];
  // let cmbProfession = [];
  Menu &&
    Menu.map((genderDetails) => {
      gender.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  maritalStatus &&
    maritalStatus["birth-death-service"] &&
    maritalStatus["birth-death-service"].MaritalStatus &&
    maritalStatus["birth-death-service"].MaritalStatus.map((ob) => {
      cmbMaritalStatus.push(ob);
    });

  // Profession &&
  //   Profession["birth-death-service"] &&
  //   Profession["birth-death-service"].Profession &&
  //   Profession["birth-death-service"].Profession.map((ob) => {
  //     cmbProfession.push(ob);
  //   });

  const filteredGender = gender?.filter((gen) => gen.code === "MALE" || gen.code === "FEMALE");

  const [isInitialRenderRadioButtons, setisInitialRenderRadioButtons] = useState(true);
  const [brideResidentShip, setBrideResidentShip] = useState(
    formData?.BrideDetails?.brideResidentShip ? formData?.BrideDetails?.brideResidentShip : "INDIAN"
  );
  const [brideAadharNo, setBrideAadharNo] = useState(formData?.BrideDetails?.brideAadharNo ? formData?.BrideDetails?.brideAadharNo : "");

  const [bridePassportNo, setbridePassportNo] = useState(formData?.BrideDetails?.bridePassportNo ? formData?.BrideDetails?.bridePassportNo : "");
  const [brideSocialSecurityNo, setbrideSocialSecurityNo] = useState(
    formData?.BrideDetails?.brideSocialSecurityNo ? formData?.BrideDetails?.brideSocialSecurityNo : ""
  );
  const [brideFirstnameEn, setbrideFirstnameEn] = useState(formData?.BrideDetails?.brideFirstnameEn ? formData?.BrideDetails?.brideFirstnameEn : "");
  const [brideFirstnameMl, setBrideFirstnameMl] = useState(formData?.BrideDetails?.brideFirstnameMl ? formData?.BrideDetails?.brideFirstnameMl : "");
  const [brideMiddlenameEn, setbrideMiddlenameEn] = useState(
    formData?.BrideDetails?.brideMiddlenameEn ? formData?.BrideDetails?.brideMiddlenameEn : ""
  );
  const [brideMiddlenameMl, setbrideMiddlenameMl] = useState(
    formData?.BrideDetails?.brideMiddlenameMl ? formData?.BrideDetails?.brideMiddlenameMl : ""
  );
  const [brideLastnameEn, setbrideLastnameEn] = useState(formData?.BrideDetails?.brideLastnameEn ? formData?.BrideDetails?.brideLastnameEn : "");
  const [brideLastnameMl, setbrideLastnameMl] = useState(formData?.BrideDetails?.brideLastnameMl ? formData?.BrideDetails?.brideLastnameMl : "");
  const [brideMobile, setbrideMobile] = useState(formData?.BrideDetails?.brideMobile ? formData?.BrideDetails?.brideMobile : "");
  const [brideEmailid, setbrideEmailid] = useState(formData?.BrideDetails?.brideEmailid ? formData?.BrideDetails?.brideEmailid : "");
  const [brideGender, setbrideGender] = useState(formData?.BrideDetails?.brideGender ? formData?.BrideDetails?.brideGender : "");
  // const [brideProfessionEn, setbrideProfessionEn] = useState(
  //   formData?.BrideDetails?.brideProfessionEn ? formData?.BrideDetails?.brideProfessionEn : ""
  // );
  // const [brideProfessionMal, setbrideProfessionMal] = useState(
  //   formData?.BrideDetails?.brideProfessionMal ? formData?.BrideDetails?.brideProfessionMal : ""
  // );
  const [toast, setToast] = useState(false);
  const [brideDOB, setbrideDOB] = useState(isEditMarriage ? convertEpochToDate(formData?.BrideDetails?.brideDOB) : formData?.BrideDetails?.brideDOB);
  const [DOBError, setDOBError] = useState(formData?.BrideDetails?.brideDOB ? false : false);
  const [brideAge, setbrideAge] = useState(formData?.BrideDetails?.brideAge ? formData?.BrideDetails?.brideAge : "");
  const [brideParentGuardian, setBrideParentGuardian] = useState(
    formData?.BrideDetails?.brideParentGuardian ? formData?.BrideDetails?.brideParentGuardian : "PARENT"
  );
  const [brideFathernameEn, setbrideFathernameEn] = useState(
    formData?.BrideDetails?.brideFathernameEn ? formData?.BrideDetails?.brideFathernameEn : ""
  );
  const [brideMothernameEn, setbrideMothernameEn] = useState(
    formData?.BrideDetails?.brideMothernameEn ? formData?.BrideDetails?.brideMothernameEn : ""
  );
  const [brideMothernameMl, setbrideMothernameMl] = useState(
    formData?.BrideDetails?.brideMothernameEn ? formData?.BrideDetails?.brideMothernameMl : ""
  );
  const [brideGuardiannameMl, setbrideGuardiannameMl] = useState(
    formData?.BrideDetails?.brideGuardiannameMl ? formData?.BrideDetails?.brideGuardiannameMl : ""
  );
  const [brideFathernameMl, setbrideFathernameMl] = useState(
    formData?.BrideDetails?.brideFathernameMl ? formData?.BrideDetails?.brideFathernameMl : ""
  );
  const [brideFatherAadharNo, setbrideFatherAadharNo] = useState(
    formData?.BrideDetails?.brideFatherAadharNo ? formData?.BrideDetails?.brideFatherAadharNo : ""
  );
  const [brideMotherAadharNo, setbrideMotherAadharNo] = useState(
    formData?.BrideDetails?.brideMotherAadharNo ? formData?.BrideDetails?.brideMotherAadharNo : ""
  );
  const [brideGuardiannameEn, setbrideGuardiannameEn] = useState(
    formData?.BrideDetails?.brideGuardiannameEn ? formData?.BrideDetails?.brideGuardiannameEn : ""
  );
  const [brideGuardianAadharNo, setbrideGuardianAadharNo] = useState(
    formData?.BrideDetails?.brideGuardianAadharNo ? formData?.BrideDetails?.brideGuardianAadharNo : ""
  );

  const [brideMaritalstatusID, setbrideMaritalstatusID] = useState(
    formData?.BrideDetails?.brideMaritalstatusID ? formData?.BrideDetails?.brideMaritalstatusID : null
  );
  const [brideIsSpouseLiving, setbrideIsSpouseLiving] = useState(
    formData?.BrideDetails?.brideIsSpouseLiving ? formData?.BrideDetails?.brideIsSpouseLiving : ""
  );
  const [brideNoOfSpouse, setbrideNoOfSpouse] = useState(formData?.BrideDetails?.brideNoOfSpouse ? formData?.BrideDetails?.brideNoOfSpouse : "");
  const [valueRad, setValueRad] = useState(formData?.BrideDetails?.brideResidentShip ? formData?.BrideDetails?.brideResidentShip : "");
  const [access, setAccess] = React.useState(true);
  const [selectedOption, setSelectedOption] = useState(
    formData?.AddressOfDecesed?.selectedOption ? formData?.AddressOfDecesed?.selectedOption : "ILB"
  );
  const [isPopup, setIsPopup] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const [AadharError, setAadharError] = useState(false);
  const [AdhaarDuplicationError, setAdhaarDuplicationError] = useState(false);
  const [brideFirstnameEnError, setbrideFirstnameEnError] = useState(false);
  const [brideFirstnameMlError, setBrideFirstnameMlError] = useState(false);
  const [brideMiddlenameEnError, setbrideMiddlenameEnError] = useState(false);
  const [brideMiddlenameMlError, setbrideMiddlenameMlError] = useState(false);
  const [brideLastnameEnError, setbrideLastnameEnError] = useState(false);
  const [brideLastnameMlError, setbrideLastnameMlError] = useState(false);
  const [bridePassportNoError, setbridePassportNoError] = useState(false);
  const [brideSocialSecurityNoError, setbrideSocialSecurityNoError] = useState(false);
  const [brideFathernameEnError, setbrideFathernameEnError] = useState(false);
  const [brideFathernameMlError, setbrideFathernameMlError] = useState(false);
  const [brideMothernameEnError, setbrideMothernameEnError] = useState(false);
  const [brideMothernameMlError, setbrideMothernameMlError] = useState(false);
  const [brideGuardiannameEnError, setbrideGuardiannameEnError] = useState(false);
  const [brideGuardiannameMlError, setbrideGuardiannameMlError] = useState(false);
  const [brideMobileError, setbrideMobileError] = useState(false);
  // const [brideFatherAadharError, setBrideFatherAadharError] = useState(formData?.BrideDetails?.brideFatherAadharNo ? false : false);
  // const [brideMotherAadharError, setBrideMotherAadharError] = useState(formData?.BrideDetails?.brideMotherAadharNo ? false : false);
  // const [brideGuardianAadharError, setBrideGuardianAadharError] = useState(formData?.BrideDetails?.brideGuardianAadharNo ? false : false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBride ? isEditBride : false);
  const [file, setFile] = useState();
  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);
  const [selectedParent, setSelectedParent] = useState("PARENT");

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSkip = () => onSelect();
  function selectSetBrideResidentShip(event) {
    setBrideResidentShip(event.target.value);
    // setValueRad(value.code);
    setisInitialRenderRadioButtons(true);
  }
  // useEffect(() => {
  //   if (isInitialRenderRadioButtons) {
  //     setisInitialRenderRadioButtons(false);
  //     if (brideResidentShip) {
  //       //setIsInitialRenderRadio(false);
  //       setValueRad(brideResidentShip.code);
  //     }
  //   }
  // }, [isInitialRenderRadioButtons]);
  const brideTypeRadio = [
    { i18nKey: "CR_RESIDENT_INDIAN", code: "INDIAN" },
    { i18nKey: "CR_NRI", code: "NRI" },
    { i18nKey: "CR_FOREIGN_NATIONAL", code: "FOREIGN" },
  ];

  const brideTypes = brideTypeRadio.map((type) => type.code);

  const parentDetails = [
    { i18nKey: "CR_BRIDE_PARENTS", code: "PARENT" },
    { i18nKey: "CR_BRIDE_GUARDIAN", code: "GUARDIAN" },
  ];

  const brideParent = parentDetails.map((parent) => parent.code);

  function setSelectbrideFirstnameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setBrideFirstnameMl("");
    } else {
      setBrideFirstnameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }

    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setBrideFirstnameMl(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideFirstnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setbrideFirstnameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideFirstnameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    // }
  }
  function setSelectbrideMiddlenameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setbrideMiddlenameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // if (e.target.value.length === 51) {

    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideMiddlenameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    // }
  }
  function setSelectbrideMiddlenameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setbrideMiddlenameMl("");
    } else {
      setbrideMiddlenameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideMiddlenameMl(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideLastnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setbrideLastnameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideLastnameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    // }
  }
  function setSelectbrideLastnameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setbrideLastnameMl("");
    } else {
      setbrideLastnameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectbrideMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setbrideMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10));
    }
  }
  function setSelectbrideGender(value) {
    setGenderValue(value);
    if (value?.code === "MALE") {
      setIsPopup(true);
    } else {
      setbrideGender(value);
    }
  }

  // let cmbProfession = [];
  //   brideprofession &&
  //   brideprofession.map((brideProfessionEnglish) => {
  //   cmbProfession.push({ i18nKey: `CR_PROFESSION_EN_'${brideProfessionEnglish.code}`, code: `${brideProfessionEnglish.code}`, value: `${brideProfessionEnglish.code}` });
  //     });

  // function setSelectbrideProfessionEn(value) {
  //   setbrideProfessionEn(value);
  //   console.log("Profession" + cmbProfession);
  // }
  // function setSelectbrideProfessionMal(value) {
  //   setbrideProfessionMal(value);
  //   console.log("Profession" + cmbProfession);
  // }
  // function setSelectbrideProfessionEn(value) {
  //   setbrideProfessionEn(value);
  // }
  // function setSelectbrideGender(value) {
  //   if (value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setbrideGender(value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
  //   }
  // }
  function setSelectbrideDOB(value) {
    setbrideDOB(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birthDate = new Date(value);
    birthDate.setHours(0, 0, 0, 0);

    if (birthDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // setbrideDOB(value);
      // const today = new Date();
      // const birthDate = new Date(value);
      // if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      const dob = new Date(value);
      const month_diff = Date.now() - dob.getTime();
      const age_dt = new Date(month_diff);
      const year = age_dt.getUTCFullYear();
      const age = Math.abs(year - 1970);
      setbrideAge(age);
      if (age < 18) {
        setAgeValidationMsg(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        setbrideAge("");
        setbrideDOB("");
      }
    } else {
      setbrideDOB(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectbrideAge(e) {
    if (e.target.value.length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideAge(e.target.value);
    }
  }
  function setSelectbrideParentGuardian(e) {
    if (e.target.value.trim().length >= 0) {
      setbrideParentGuardian(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function setSelectbrideFathernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setbrideFathernameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectbrideMothernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setbrideMothernameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectbrideMothernameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setbrideMothernameMl("");
    } else {
      setbrideMothernameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectbrideGuardiannameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setbrideGuardiannameMl("");
    } else {
      setbrideGuardiannameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectbrideFathernameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setbrideFathernameMl("");
    } else {
      setbrideFathernameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectbrideFatherAadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setbrideFatherAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    console.log();
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue != "" && (newValue === brideAadharNo || newValue === brideMotherAadharNo || newValue === brideGuardianAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.GroomDetails?.groomAadharNo ||
        newValue === formData?.GroomDetails?.groomFatherAadharNo ||
        newValue === formData?.GroomDetails?.groomMotherAadharNo ||
        newValue === formData?.GroomDetails?.groomGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setbrideFatherAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }

  function setSelectbrideAadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setBrideAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue != "" && (newValue === brideMotherAadharNo || newValue === brideGuardianAadharNo || newValue === brideFatherAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.GroomDetails?.groomAadharNo ||
        newValue === formData?.GroomDetails?.groomFatherAadharNo ||
        newValue === formData?.GroomDetails?.groomMotherAadharNo ||
        newValue === formData?.GroomDetails?.groomGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setBrideAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectbrideMotherAadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setbrideMotherAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue != "" && (newValue === brideAadharNo || newValue === brideGuardianAadharNo || newValue === brideFatherAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.GroomDetails?.groomAadharNo ||
        newValue === formData?.GroomDetails?.groomFatherAadharNo ||
        newValue === formData?.GroomDetails?.groomMotherAadharNo ||
        newValue === formData?.GroomDetails?.groomGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setbrideMotherAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectbrideGuardianAadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setbrideGuardianAadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue != "" && (newValue === brideAadharNo || newValue === brideMotherAadharNo || newValue === brideFatherAadharNo)) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.GroomDetails?.groomAadharNo ||
        newValue === formData?.GroomDetails?.groomFatherAadharNo ||
        newValue === formData?.GroomDetails?.groomMotherAadharNo ||
        newValue === formData?.GroomDetails?.groomGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setbrideGuardianAadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectbrideGuardiannameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setbrideGuardiannameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectbrideMaritalstatusID(value) {
    setbrideMaritalstatusID(value);
    setbrideIsSpouseLiving(null);
    setbrideNoOfSpouse("");
    // setAgeMariageStatus(value.code);
  }

  function setSelectbrideIsSpouseLiving(value) {
    setbrideIsSpouseLiving(value);
    setbrideNoOfSpouse("");
  }
  function setSelectbrideNoOfSpouse(e) {
    if (e.target.value.length === 2) {
      if (e.target.value > 3) {
        return false;
      }
    } else {
      setbrideNoOfSpouse(e.target.value.replace(/[^0-3]/gi, ""));
    }
  }
  function setSelectbrideEmailid(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideEmailid(e.target.value);
    }
  }
  function setSelectbrideSocialSecurityNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[A-Z-0-9 ]*$") != null) {
      setbrideSocialSecurityNo(e.target.value.length <= 12 ? e.target.value : e.target.value.substring(0, 12));
    }
    // let value = e.target.value;
    // console.log({ value });
    // // setbrideSocialSecurityNo(value);
    // let pattern = /[A-Z1-9-]$/g;
    //   if (value.length <= 12) {
    //     if (pattern.test(value)) {
    //       setbrideSocialSecurityNo(value);
    //     }
    //   }
  }
  function setSelectbridePassportNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[A-Z0-9 ]*$") != null) {
      setbridePassportNo(e.target.value.length <= 8 ? e.target.value : e.target.value.substring(0, 8));
    }
    // setbridePassportNo(
    //   e.target.value.length <= 8
    //     ? e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "")
    //     : e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "").substring(0, 8)
    // );
  }
  function selectParentType(e) {
    setBrideParentGuardian(e.target.value);
  }

  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      setTripStartTime(value);
    }
  };
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (!isEditMarriage) {
      if (gender.length > 0 && cmbMaritalStatus.length > 0) {
        const selectedGender = gender.filter((option) => option.code === "FEMALE");
        setbrideGender(selectedGender[0]);
        const currentMarritalStatus = cmbMaritalStatus?.filter((status) => status.code === "UNMARRIED");
        setbrideMaritalstatusID(currentMarritalStatus[0]);
      }
    }
  }, [gender.length, cmbMaritalStatus.length]);

  useEffect(() => {
    if (isEditMarriage) {
      if (cmbMaritalStatus.length > 0 && gender.length > 0) {
        const currentMarritalStatus = cmbMaritalStatus?.filter((status) => status.code === formData?.BrideDetails?.brideMaritalstatusID);
        setbrideMaritalstatusID(currentMarritalStatus[0]);
        console.log({ currentMarritalStatus });
        const currentGender = gender?.filter((gender) => gender.code === formData?.BrideDetails?.brideGender);
        setbrideGender(currentGender[0]);
        console.log({ currentGender });
        const currentIsSpouseLiving = cmbSpouseLiving?.filter((value) => value.code === formData?.BrideDetails?.brideIsSpouseLiving);
        setbrideIsSpouseLiving(currentIsSpouseLiving[0]);
        console.log({ currentIsSpouseLiving });
      }
    }
  }, [cmbMaritalStatus.length, gender.length]);

  let validFlag = true;
  const goNext = () => {
    if (brideAadharNo.trim() == null || brideAadharNo.trim() == "" || brideAadharNo.trim() == undefined) {
      setBrideAadharNo("");
    } else if (brideAadharNo != null && brideAadharNo != "") {
      let adharLength = brideAadharNo;
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
    if (brideFatherAadharNo.trim() == null || brideFatherAadharNo.trim() == "" || brideFatherAadharNo.trim() == undefined) {
      setbrideFatherAadharNo("");
    } else if (brideFatherAadharNo != null && brideFatherAadharNo != "") {
      let adharLength = brideFatherAadharNo;
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
    if (brideMotherAadharNo.trim() == null || brideMotherAadharNo.trim() == "" || brideMotherAadharNo.trim() == undefined) {
      setbrideMotherAadharNo("");
    } else if (brideMotherAadharNo != null && brideMotherAadharNo != "") {
      let adharLength = brideMotherAadharNo;
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
    if (brideGuardianAadharNo.trim() == null || brideGuardianAadharNo.trim() == "" || brideGuardianAadharNo.trim() == undefined) {
      setbrideGuardianAadharNo("");
    } else if (brideMotherAadharNo != null && brideMotherAadharNo != "") {
      let adharLength = brideMotherAadharNo;
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
    if (bridePassportNo.trim() == null || bridePassportNo.trim() == "" || bridePassportNo.trim() == undefined) {
      setbridePassportNo("");
    } else if (bridePassportNo != null && bridePassportNo != "") {
      let pasportLength = bridePassportNo;
      if (pasportLength.length < 8 || pasportLength.length > 8) {
        validFlag = false;
        setbridePassportNoError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbridePassportNoError(false);
      }
    } else {
      setbridePassportNoError(false);
    }
    if (brideSocialSecurityNo.trim() == null || brideSocialSecurityNo.trim() == "" || brideSocialSecurityNo.trim() == undefined) {
      setbrideSocialSecurityNo("");
      setbrideSocialSecurityNoError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setbrideSocialSecurityNoError(false);
    }

    if (brideFirstnameEn.trim() == null || brideFirstnameEn.trim() == "" || brideFirstnameEn.trim() == undefined) {
      validFlag = false;
      setbrideFirstnameEn("");
      setbrideFirstnameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setbrideFirstnameEnError(false);
    }
    if (brideFirstnameMl.trim() == null || brideFirstnameMl.trim() == "" || brideFirstnameMl.trim() == undefined) {
      validFlag = false;
      setBrideFirstnameMl("");
      setBrideFirstnameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setBrideFirstnameMlError(false);
    }
    if (brideMiddlenameEn.trim() == null || brideMiddlenameEn.trim() == "" || brideMiddlenameEn.trim() == undefined) {
      setbrideMiddlenameEn("");
    } else {
      if (brideMiddlenameMl.trim() == null || brideMiddlenameMl.trim() == "" || brideMiddlenameMl.trim() == undefined) {
        validFlag = false;
        setbrideMiddlenameMl("");
        setbrideMiddlenameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideMiddlenameMlError(false);
      }
    }
    if (brideMiddlenameMl.trim() == null || brideMiddlenameMl.trim() == "" || brideMiddlenameMl.trim() == undefined) {
      setbrideMiddlenameMl("");
      setbrideMiddlenameEnError(false);
    } else {
      if (brideMiddlenameEn.trim() == null || brideMiddlenameEn.trim() == "" || brideMiddlenameEn.trim() == undefined) {
        validFlag = false;
        setbrideMiddlenameEn("");
        setbrideMiddlenameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideMiddlenameEnError(false);
      }
    }
    if (brideLastnameEn.trim() == null || brideLastnameEn.trim() == "" || brideLastnameEn.trim() == undefined) {
      setbrideLastnameEn("");
    } else {
      if (brideLastnameMl.trim() == null || brideLastnameMl.trim() == "" || brideLastnameMl.trim() == undefined) {
        validFlag = false;
        setbrideLastnameMl("");
        setbrideLastnameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideLastnameMlError(false);
      }
    }
    if (brideLastnameMl.trim() == null || brideLastnameMl.trim() == "" || brideLastnameMl.trim() == undefined) {
      setbrideLastnameMl("");
      setbrideLastnameEnError(false);
    } else {
      if (brideLastnameEn.trim() == null || brideLastnameEn.trim() == "" || brideLastnameEn.trim() == undefined) {
        validFlag = false;
        setbrideLastnameEn("");
        setbrideLastnameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideLastnameEnError(false);
      }
    }
    if (brideParentGuardian === "PARENT") {
      if (brideFathernameEn.trim() == null || brideFathernameEn.trim() == "" || brideFathernameEn.trim() == undefined) {
        validFlag = false;
        setbrideFathernameEn("");
        setbrideFathernameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideFathernameEnError(false);
      }
      if (brideFathernameMl.trim() == null || brideFathernameMl.trim() == "" || brideFathernameMl.trim() == undefined) {
        validFlag = false;
        setbrideFathernameMl("");
        setbrideFathernameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideFathernameMlError(false);
      }
      if (brideMothernameEn.trim() == null || brideMothernameEn.trim() == "" || brideMothernameEn.trim() == undefined) {
        validFlag = false;
        setbrideMothernameEn("");
        setbrideMothernameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideMothernameEnError(false);
      }
      if (brideMothernameMl.trim() == null || brideMothernameMl.trim() == "" || brideMothernameMl.trim() == undefined) {
        validFlag = false;
        setbrideMothernameMl("");
        setbrideMothernameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideMothernameMlError(false);
      }
    }
    if (brideParentGuardian === "GUARDIAN") {
      if (brideGuardiannameEn.trim() == null || brideGuardiannameEn.trim() == "" || brideGuardiannameEn.trim() == undefined) {
        validFlag = false;
        setbrideGuardiannameEn("");
        setbrideGuardiannameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideGuardiannameEnError(false);
      }
      if (brideGuardiannameMl.trim() == null || brideGuardiannameMl.trim() == "" || brideGuardiannameMl.trim() == undefined) {
        validFlag = false;
        setbrideGuardiannameMl("");
        setbrideGuardiannameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideGuardiannameMlError(false);
      }
    }

    if (brideMobile != null || brideMobile != "" || brideMobile != undefined) {
      let mobileLength = brideMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setbrideMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setbrideMobileError(false);
      }
    } else {
      validFlag = false;
      setbrideMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

    if (validFlag == true) {
      // sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);

      // sessionStorage.setItem("brideAadharNo", brideAadharNo ? brideAadharNo : null);
      // sessionStorage.setItem("ChildFirstNameEn", ChildFirstNameEn ? ChildFirstNameEn : null);
      // sessionStorage.setItem("ChildMiddleNameEn", ChildMiddleNameEn ? ChildMiddleNameEn : null);
      // sessionStorage.setItem("bridePassportNo", bridePassportNo ? bridePassportNo : null);
      // sessionStorage.setItem("brideSocialSecurityNo", brideSocialSecurityNo ? brideSocialSecurityNo : null);
      // sessionStorage.setItem("brideFirstnameEn", brideFirstnameEn ? brideFirstnameEn : null);
      // sessionStorage.setItem("brideFirstnameMl", brideFirstnameMl ? brideFirstnameMl : null);
      // sessionStorage.setItem("brideMiddlenameEn", brideMiddlenameEn ? brideMiddlenameEn : null);
      // sessionStorage.setItem("brideMiddlenameMl", brideMiddlenameMl ? brideMiddlenameMl : null);
      // sessionStorage.setItem("brideLastnameEn", brideLastnameEn ? brideLastnameEn : null);
      // sessionStorage.setItem("brideLastnameMl", brideLastnameMl ? brideLastnameMl : null);
      // sessionStorage.setItem("brideMobile", brideMobile ? brideMobile : null);
      // sessionStorage.setItem("brideEmailid", brideEmailid ? brideEmailid : null);
      // sessionStorage.setItem("brideGender", brideGender ? brideGender : null);
      // sessionStorage.setItem("brideDOB", brideDOB ? brideDOB : null);
      // sessionStorage.setItem("brideAge", brideAge ? brideAge : null);
      // sessionStorage.setItem("brideParentGuardian", brideParentGuardian ? brideParentGuardian : null);
      // sessionStorage.setItem("brideFathernameEn", brideFathernameEn ? brideFathernameEn : null);
      // sessionStorage.setItem("brideFathernameMl", brideFathernameMl ? brideFathernameMl : null);
      // sessionStorage.setItem("brideMothernameEn", brideMothernameEn ? brideMothernameEn : null);
      // sessionStorage.setItem("brideMothernameMl", brideMothernameMl ? brideMothernameMl : null);
      // sessionStorage.setItem("brideGuardiannameMl", brideGuardiannameMl ? brideGuardiannameMl : null);

      // sessionStorage.setItem("brideFatherAadharNo", brideFatherAadharNo ? brideFatherAadharNo : null);
      // sessionStorage.setItem("brideMotherAadharNo", brideMotherAadharNo ? brideMotherAadharNo : null);

      // sessionStorage.setItem("brideGuardiannameEn", brideGuardiannameEn ? brideGuardiannameEn : null);
      // sessionStorage.setItem("brideProfessionEn", brideProfessionEn ? brideProfessionEn : null);
      // sessionStorage.setItem("brideProfessionMal", brideProfessionMal ? brideProfessionMal : null);
      // sessionStorage.setItem("brideMaritalstatusID", brideMaritalstatusID ? brideMaritalstatusID : null);
      // sessionStorage.setItem("brideNoOfSpouse", brideNoOfSpouse ? brideNoOfSpouse : null);
      // sessionStorage.setItem("brideGuardianAadharNo", brideGuardianAadharNo ? brideGuardianAadharNo : null);
      // sessionStorage.setItem("brideIsSpouseLiving", brideIsSpouseLiving ? brideIsSpouseLiving : null);
      // sessionStorage.setItem("ChildLastNameEn", ChildLastNameEn ? ChildLastNameEn : null);
      // sessionStorage.setItem("ChildFirstNameMl", ChildFirstNameMl ? ChildFirstNameMl : null);
      // sessionStorage.setItem("ChildMiddleNameMl", ChildMiddleNameMl ? ChildMiddleNameMl : null);
      // sessionStorage.setItem("ChildLastNameMl", ChildLastNameMl ? ChildLastNameMl : null);
      // // sessionStorage.setItem("isChildName", isChildName);
      // sessionStorage.setItem("selectedOption", selectedOption ? selectedOption : "ILB");
      // // sessionStorage.setItem("isMotherInfo", isMotherInfo);
      onSelect(config.key, {
        brideResidentShip,
        selectedOption,
        brideAadharNo,
        bridePassportNo,
        brideSocialSecurityNo,
        brideFirstnameEn: brideFirstnameEn.trim(),
        brideFirstnameMl: brideFirstnameMl.trim(),
        brideMiddlenameEn: brideMiddlenameEn.trim(),
        brideLastnameEn: brideLastnameEn.trim(),
        brideLastnameMl: brideLastnameMl.trim(),
        brideMobile,
        brideGender,
        brideDOB,
        brideAge,
        brideMothernameEn: brideMothernameEn.trim(),
        brideMothernameMl: brideMothernameMl.trim(),
        brideGuardiannameMl: brideGuardiannameMl.trim(),
        brideFathernameEn: brideFathernameEn.trim(),
        brideFathernameMl: brideFathernameMl.trim(),
        brideFatherAadharNo,
        brideMotherAadharNo,
        brideMaritalstatusID,
        brideIsSpouseLiving,
        brideNoOfSpouse,
        brideParentGuardian,
        brideGuardiannameEn: brideGuardiannameEn.trim(),
        brideGuardianAadharNo,
        brideEmailid,
        brideMiddlenameMl: brideMiddlenameMl.trim(),
      });
    }
  };
  console.log({ brideGender });
  console.log("Bride", formData);
  if (isLoading || isMaritalStatusLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            !brideFirstnameEn ||
            !brideMobile ||
            !brideFirstnameMl ||
            !brideGender ||
            !brideDOB ||
            !brideMaritalstatusID ||
            (brideResidentShip === "INDIAN" ? !brideAadharNo : false) ||
            (brideResidentShip === "NRI" ? !bridePassportNo || !brideSocialSecurityNo : false) ||
            (brideResidentShip === "FOREIGN" ? !brideSocialSecurityNo || !bridePassportNo : false) ||
            (brideParentGuardian === "PARENT" ? !brideFathernameEn || !brideFathernameMl || !brideMothernameEn || !brideMothernameMl : false) ||
            (brideParentGuardian === "GUARDIAN" ? !brideGuardiannameEn || !brideGuardiannameMl : false) ||
            (brideMaritalstatusID?.code === "MARRIED" ? !brideIsSpouseLiving : false)
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
                      onChange={selectSetBrideResidentShip}
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
            <div className="col-md-12">
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
                    onChange={setSelectbrideAadharNo}
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CR_BRIDE_AADHAR_NO")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(brideResidentShip === "INDIAN" && {
                      ...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CR_AADHAR_NO_ERROR") }),
                    })}
                  />
                </div>
              ) : (
                <React.Fragment>
                  {brideResidentShip === "NRI" && (
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
                        onChange={setSelectbrideAadharNo}
                        onKeyPress={setCheckSpecialChar}
                        placeholder={`${t("CR_BRIDE_AADHAR_NO")}`}
                        inputProps={{
                          maxLength: 12,
                        }}
                        {...(brideResidentShip === "INDIAN" && {
                          ...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CR_AADHAR_NO_ERROR") }),
                        })}
                      />
                    </div>
                  )}

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
                      onChange={setSelectbridePassportNo}
                      placeholder={`${t("CR_BRIDE_PASSPORT_NO")}`}
                      {...((brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && {
                        ...(validation = { pattern: "^[A-Z0-9]{8}$", type: "text", isRequired: true, title: t("CR_PASSPORT_NO_ERROR") }),
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
                      onChange={setSelectbrideSocialSecurityNo}
                      placeholder={`${t("CR_BRIDE_SOCIAL_SECURITY_NO")}`}
                      {...((brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && {
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
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
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
                  onChange={setSelectbrideFirstnameEn}
                  placeholder={`${t("CR_BRIDE_FIRST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_FIRST_NAME_EN_ERROR") })}
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
                  onChange={setSelectbrideMiddlenameEn}
                  placeholder={`${t("CR_BRIDE_MIDDLE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_MIDDLE_NAME_EN_ERROR") })}
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
                  onChange={setSelectbrideLastnameEn}
                  placeholder={`${t("CR_BRIDE_LAST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_LAST_NAME_EN_ERROR") })}
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
                  onChange={setSelectbrideMobile}
                  placeholder={`${t("CR_BRIDE_MOBILE_NO")}`}
                  {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_MOBILE_NO_ERROR") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
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
                  onChange={setSelectbrideFirstnameMl}
                  placeholder={`${t("CR_BRIDE_FIRST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_FIRST_NAME_ML_ERROR"),
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
                  onChange={setSelectbrideMiddlenameMl}
                  placeholder={`${t("CR_BRIDE_MIDDLE_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_MIDDLE_NAME_ML_ERROR"),
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
                  onChange={setSelectbrideLastnameMl}
                  placeholder={`${t("CR_BRIDE_LAST_NAME_ML")}`}
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
                  {t("CR_BRIDE_EMAIL")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"email"}
                  optionKey="i18nKey"
                  name="brideEmailid"
                  value={brideEmailid}
                  onChange={setSelectbrideEmailid}
                  placeholder={`${t("CR_BRIDE_EMAIL")}`}
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
                  {`${t("CR_BRIDE_GENDER")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={sortDropdownNames(filteredGender ? filteredGender : [], "code", t)}
                  selected={brideGender}
                  select={setSelectbrideGender}
                  placeholder={`${t("CR_BRIDE_GENDER")}`}
                  {...(validation = { isRequired: true })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_BRIDE_DATE_OF_BIRTH")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={brideDOB}
                  name="brideDOB"
                  max={moment().subtract(18, "year").format("YYYY-MM-DD")}
                  //max={convertEpochToDate(new Date())}
                  onChange={setSelectbrideDOB}
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
                  onChange={setSelectbrideAge}
                  placeholder={`${t("CR_BRIDE_AGE")}`}
                  {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_BRIDE_MARITAL_STATUS")}
                  <span className="mandatorycss">*</span>
                </CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={sortDropdownNames(cmbMaritalStatus ? cmbMaritalStatus : [], "name", t)}
                  selected={brideMaritalstatusID}
                  select={setSelectbrideMaritalstatusID}
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
                    select={setSelectbrideIsSpouseLiving}
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
                    onChange={setSelectbrideNoOfSpouse}
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
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{t("CR_BRIDE_FATHER_AADHAR_NO")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="brideFatherAadharNo"
                      value={brideFatherAadharNo}
                      onChange={setSelectbrideFatherAadharNo}
                      onKeyPress={setCheckSpecialChar}
                      placeholder={`${t("CR_BRIDE_FATHER_AADHAR_NO")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_AADHAR_NO_ERROR") })}
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
                      onChange={setSelectbrideFathernameEn}
                      placeholder={`${t("CR_BRIDE_FATHER_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_FATHER_NAME_EN_ERROR") })}
                    />
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_BRIDE_FATHER_NAME_ML")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="brideFathernameMl"
                      value={brideFathernameMl}
                      onChange={setSelectbrideFathernameMl}
                      placeholder={`${t("CR_BRIDE_FATHER_NAME_ML")}`}
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
                    <CardLabel>{t("CR_BRIDE_MOTHER_AADHAR_NO")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="brideMotherAadharNo"
                      value={brideMotherAadharNo}
                      onChange={setSelectbrideMotherAadharNo}
                      onKeyPress={setCheckSpecialChar}
                      placeholder={`${t("CR_BRIDE_MOTHER_AADHAR_NO")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_AADHAR_NO_ERROR") })}
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
                      onChange={setSelectbrideMothernameEn}
                      placeholder={`${t("CR_BRIDE_MOTHER_NAME_EN")}`}
                      {...(validation = { isRequired: true })}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_MOTHER_NAME_EN_ERROR") })}
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
                      onChange={setSelectbrideMothernameMl}
                      placeholder={`${t("CR_BRIDE_MOTHER_NAME_ML")}`}
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
          {brideParentGuardian === "GUARDIAN" && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{t("CR_BRIDE_GUARDIAN_AADHAR_NO")}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="brideGuardianAadharNo"
                      value={brideGuardianAadharNo}
                      onChange={setSelectbrideGuardianAadharNo}
                      onKeyPress={setCheckSpecialChar}
                      placeholder={`${t("CR_BRIDE_GUARDIAN_AADHAR_NO")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_AADHAR_NO_ERROR") })}
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
                      onChange={setSelectbrideGuardiannameEn}
                      placeholder={`${t("CR_BRIDE_GUARDIAN_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_GUARDIAN_NAME_EN_ERROR") })}
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
                      onChange={setSelectbrideGuardiannameMl}
                      placeholder={`${t("CR_BRIDE_GUARDIAN_NAME_ML")}`}
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
          {isPopup && (
            <PopUp>
              <div className="popup-module" style={{ borderRadius: "8px" }}>
                <div style={{ margin: "20px", padding: "20px", border: "1px solid grey", borderRadius: "8px" }}>
                  <div style={{ fontSize: "18px", margin: "10px" }}>You selected gender as 'Male', Do you want to continue?</div>
                  <div style={{ display: "flex", justifyContent: "flex-end", columnGap: "8px" }}>
                    <button
                      style={{
                        backgroundColor: "orange",
                        padding: "4px 16px",
                        color: "white",
                        borderRadius: "8px",
                      }}
                      onClick={() => {
                        setbrideGender(genderValue);
                        setIsPopup(false);
                        setGenderValue("");
                      }}
                    >
                      Yes
                    </button>
                    <button
                      style={{ border: "1px solid grey", padding: "4px 16px", borderRadius: "8px" }}
                      onClick={() => {
                        setIsPopup(false);
                        const selectedGender = gender.filter((option) => option.code === "FEMALE");
                        setbrideGender(selectedGender[0]);
                        setGenderValue("");
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </PopUp>
          )}

          {toast && (
            <Toast
              error={
                AadharError ||
                AgeValidationMsg ||
                AdhaarDuplicationError ||
                brideFirstnameEnError ||
                brideFirstnameMlError ||
                brideMiddlenameEnError ||
                brideMiddlenameMlError ||
                brideLastnameEnError ||
                brideLastnameMlError ||
                bridePassportNoError ||
                brideSocialSecurityNoError ||
                brideFathernameEnError ||
                brideFathernameMlError ||
                brideMothernameEnError ||
                brideMothernameMlError ||
                brideGuardiannameEnError ||
                brideGuardiannameMlError ||
                brideMobileError
              }
              label={
                AadharError ||
                AgeValidationMsg ||
                AdhaarDuplicationError ||
                brideFirstnameEnError ||
                brideFirstnameMlError ||
                brideMiddlenameEnError ||
                brideMiddlenameMlError ||
                brideLastnameEnError ||
                brideLastnameMlError ||
                bridePassportNoError ||
                bridePassportNoError ||
                brideFathernameEnError ||
                brideFathernameMlError ||
                brideMothernameEnError ||
                brideMothernameMlError ||
                brideGuardiannameEnError ||
                brideGuardiannameMlError ||
                brideMobileError
                  ? AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : AgeValidationMsg
                    ? t(`CR_INVALID_BRIDE_AGE`)
                    : AdhaarDuplicationError
                    ? t("DUPLICATE_AADHAR_NO")
                    : brideFirstnameEnError
                    ? t(`CR_FIRST_NAME_EN_ERROR`)
                    : brideFirstnameMlError
                    ? t(`CR_FIRST_NAME_ML_ERROR`)
                    : brideMiddlenameEnError
                    ? t(`CR_MIDDLE_NAME_EN_ERROR`)
                    : brideMiddlenameMlError
                    ? t(`CR_MIDDLE_NAME_ML_ERROR`)
                    : brideLastnameEnError
                    ? t(`CR_LAST_NAME_EN_ERROR`)
                    : brideLastnameMlError
                    ? t(`CR_LAST_NAME_ML_ERROR`)
                    : bridePassportNoError
                    ? t(`CR_PASSPORT_NO_ERROR`)
                    : bridePassportNoError
                    ? t(`CR_SOCIAL_SECURITY_NO_ERROR`)
                    : brideFathernameEnError
                    ? t(`CR_FATHER_NAME_EN_ERROR`)
                    : brideFathernameMlError
                    ? t(`CR_FATHER_NAME_ML_ERROR`)
                    : brideMothernameEnError
                    ? t(`CR_MOTHER_NAME_EN_ERROR`)
                    : brideMothernameMlError
                    ? t(`CR_MOTHER_NAME_ML_ERROR`)
                    : brideGuardiannameEnError
                    ? t(`CR_GUARDIAN_NAME_EN_ERROR`)
                    : brideGuardiannameMlError
                    ? t(`CR_GUARDIAN_NAME_ML_ERROR`)
                    : brideMobileError
                    ? t(`CR_MOBILE_NO_ERROR`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {/* <div className="row">
            <div className="col-md-12">
              <h1 className="">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span>{" "}
              </h1>
            </div>
          </div> */}
        </FormStep>
      </React.Fragment>
    );
};
export default BrideDetails;
