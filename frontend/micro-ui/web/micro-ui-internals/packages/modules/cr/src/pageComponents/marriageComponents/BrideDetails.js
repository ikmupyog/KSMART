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
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import { TimePicker } from '@material-ui/pickers';

const BrideDetails = ({ config, onSelect, userType, formData, isEditBride }) => {
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

  const cmbYesOrNo = [
    { i18nKey: "Yes", code: "YES" },
    { i18nKey: "No", code: "NO" },
  ];
  let menu = [];
  let cmbMaritalStatus = [];
  // let cmbProfession = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
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
  const [brideDOB, setbrideDOB] = useState(formData?.BrideDetails?.brideDOB ? formData?.BrideDetails?.brideDOB : "");
  const [DOBError, setDOBError] = useState(formData?.BrideDetails?.brideDOB ? false : false);
  const [brideAge, setbrideAge] = useState(formData?.BrideDetails?.brideAge ? formData?.BrideDetails?.brideAge : "");
  const [brideParentGuardian, setbrideParentGuardian] = useState(
    formData?.BrideDetails?.brideParentGuardian ? formData?.BrideDetails?.brideParentGuardian : ""
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
  const [valueRad, setValueRad] = useState(formData?.GroomDetails?.brideResidentShip ? formData?.GroomDetails?.brideResidentShip : "");
  const [access, setAccess] = React.useState(true);
  const [selectedOption, setSelectedOption] = useState(
    formData?.AddressOfDecesed?.selectedOption ? formData?.AddressOfDecesed?.selectedOption : "ILB"
  );
  const [AadharError, setAadharError] = useState(formData?.BrideDetails?.brideAadharNo ? false : false);
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
      setMotherFirstNameMl("");
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
    if (e.target.value.trim().length != 0) {
      setbrideMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10));
    }
  }
  function setSelectbrideGender(value) {
    // console.log("gender" + value);
    setbrideGender(value);
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
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      const dobFullYear = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - dobFullYear;
      setbrideAge(age);
      if (age < 21) {
        setAgeValidationMsg(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
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
      setbrideAge(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-zA-Z]/gi, ""));
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
      setMotherFirstNameMl("");
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
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue === brideAadharNo || newValue === brideMotherAadharNo || newValue === brideGuardianAadharNo) {
      setbrideFatherAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setbrideFatherAadharNo(newValue);
    }
  }

  function setSelectbrideAadharNo(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue === brideMotherAadharNo || newValue === brideGuardianAadharNo || newValue === brideFatherAadharNo) {
      setBrideAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setBrideAadharNo(newValue);
    }
  }
  function setSelectbrideMotherAadharNo(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue === brideAadharNo || newValue === brideGuardianAadharNo || newValue === brideFatherAadharNo) {
      setbrideMotherAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setbrideMotherAadharNo(newValue);
    }
  }
  function setSelectbrideGuardianAadharNo(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue === brideAadharNo || newValue === brideMotherAadharNo || newValue === brideFatherAadharNo) {
      setbrideGuardianAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setbrideGuardianAadharNo(newValue);
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
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideNoOfSpouse(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-zA-Z]/gi, ""));
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
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideSocialSecurityNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-z]/gi, ""));
    }
  }
  function setSelectbridePassportNo(e) {
    if (e.target.value.length === 21) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbridePassportNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-zA-Z]/gi, ""));
    }
  }
  function selectParentType(e) {
    setSelectedParent(e.target.value);
  }

  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      setTripStartTime(value);
    }
  };

  let validFlag = true;
  const goNext = () => {
    if (AadharError) {
      validFlag = false;
      // setAadharErroChildAadharNor(true);
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
        brideFirstnameEn,
        brideFirstnameMl,
        brideMiddlenameEn,
        brideLastnameEn,
        brideLastnameMl,
        brideMobile,
        brideGender,
        brideDOB,
        brideAge,
        brideMothernameEn,
        brideMothernameMl,
        brideGuardiannameMl,
        brideFathernameEn,
        brideFathernameMl,
        brideFatherAadharNo,
        brideMotherAadharNo,
        // brideProfessionEn,
        // brideProfessionMal,
        brideMaritalstatusID,
        brideIsSpouseLiving,
        brideNoOfSpouse,
        brideGuardiannameEn,
        brideGuardianAadharNo,
        brideEmailid,
        brideMiddlenameMl,
      });
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          {/* <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_REGISTRATION_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_NATIONALITY_AND_RESIDENTSHIP")}`}</span>{" "}
              </h1>
            </div>
          </div>
          {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_NATIONALITY_&RESIDENTSHIP")}

                <span className="mandatorycss">*</span>
              </CardLabel>
            </div>
          </div>
        </div> */}
          <div className="row">
            <div className="col-md-12">
              <div className="radios">
                {brideTypes.map((type, index) => (
                  <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="brideType"
                      style={{ height: "20px", width: "20px" }}
                      onChange={selectSetBrideResidentShip}
                      value={type}
                      defaultChecked={index === 0}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="col-md-4">
              <h2>Add Image:</h2>
              <input type="file" onChange={handleChange} />
              <img src={file} />
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_ADHAR_&_PASSPORT")}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {t("CR_ADHAR_NO")}
                  {brideResidentShip === "INDIAN" && <span className="mandatorycss">*</span>}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="brideAadharNo"
                  value={brideAadharNo}
                  onChange={setSelectbrideAadharNo}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_ADHAR_NO")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(brideResidentShip === "INDIAN" && {
                    ...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") }),
                  })}
                  // {...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {t("CR_PASSPORT_NO")}
                  {(brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && <span className="mandatorycss">*</span>}
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="bridePassportNo"
                  onChange={setSelectbridePassportNo}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_PASSPORT_NO")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...((brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && {
                    ...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: true, title: t("CS_COMMON_INVALID_PASSPORT_NO") }),
                  })}
                />
              </div>

              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {t("CR_SOCIAL_SECURITY_NO")}
                  {brideResidentShip === "FOREIGN" && <span className="mandatorycss">*</span>}
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideSocialSecurityNo"
                  disable={isDisableEdit}
                  onChange={setSelectbrideSocialSecurityNo}
                  placeholder={`${t("CR_SOCIAL_SECURITY_NO")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(brideResidentShip === "FOREIGN" && {
                    ...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: true, title: t("CR_INVALID_SOCIAL_SECURITY_NUMBER") }),
                  })}
                />
              </div>
            </div>
            {/* <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_NAME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
            </div> */}

            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DETAILS")}`}</span>{" "}
              </h1>
            </div>
            {/* <div className="row"> */}
            <div className="col-md-12">
              <div className="col-md-3">
                {" "}
                <CardLabel>
                  {`${t("CR_BRIDE_FIRST_NAME_EN")}`}
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
                  //  onChange={(e,v) => this.updateTextField(e,v)}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_FIRST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{`${t("CR_BRIDE_MIDDLE_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideMiddlenameEn"
                  value={brideMiddlenameEn}
                  onChange={setSelectbrideMiddlenameEn}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_MIDDLE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{`${t("CR_BRIDE_LAST_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideLastnameEn"
                  value={brideLastnameEn}
                  onChange={setSelectbrideLastnameEn}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_LAST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>
                  {`${t("CR_BRIDE_MOBILE_NO")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideMobile"
                  value={brideMobile}
                  onChange={setSelectbrideMobile}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_MOBILE_NO")}`}
                  {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
                />
              </div>
            </div>
            {/* </div> */}
            {/* <div className="row"> */}
            <div className="col-md-12">
              <div className="col-md-3">
                {" "}
                <CardLabel>
                  {`${t("CR_BRIDE_FIRST_NAME_ML")}`}
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
                  disable={isDisableEdit}
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
                {" "}
                <CardLabel>{`${t("CR_BRIDE_MIDDLE_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideMiddlenameMl"
                  value={brideMiddlenameMl}
                  onChange={setSelectbrideMiddlenameMl}
                  disable={isDisableEdit}
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
                {" "}
                <CardLabel>{`${t("CR_BRIDE_LAST_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideLastnameMl"
                  value={brideLastnameMl}
                  onChange={setSelectbrideLastnameMl}
                  disable={isDisableEdit}
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
                {" "}
                <CardLabel>
                  {`${t("CR_BRIDE_EMAIL")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideEmailid"
                  value={brideEmailid}
                  onChange={setSelectbrideEmailid}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_EMAIL")}`}
                  {...(validation = { title: t("CR_INVALID_EMAIL") })}
                />
              </div>
            </div>
            {/* </div> */}
            {/* <div className="row"> */}
            <div className="col-md-12">
              <div className="col-md-6"></div>
            </div>
            <div>
              <div className="col-md-12">
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {`${t("CR_GENDER")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="code"
                    isMandatory={false}
                    option={menu}
                    selected={brideGender}
                    select={setSelectbrideGender}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_GENDER")}`}
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
                    onChange={setSelectbrideDOB}
                    inputFormat="DD-MM-YYYY"
                    placeholder={`${t("CR_BRIDE_DATE_OF_BIRTH_TIME")}`}
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
                    {`${t("CR_AGE")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideAge"
                    value={brideAge}
                    onChange={setSelectbrideAge}
                    disable={true}
                    placeholder={`${t("CR_AGE")}`}
                    {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true })}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {t("CR_MARIATAL_STATUS'")} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="name"
                  option={cmbMaritalStatus}
                  selected={brideMaritalstatusID}
                  select={setSelectbrideMaritalstatusID}
                  disable={isDisableEdit}
                  placeholder={t("CR_MARIATAL_STATUS")}
                  {...(validation = { isRequired: true })}
                />
              </div>
              {(brideMaritalstatusID?.code === "MARRIED" ||
                brideMaritalstatusID?.code === "WIDOWED" ||
                brideMaritalstatusID?.code === "DIVORCED" ||
                brideMaritalstatusID?.code === "ANNULELD") && (
                <div className="col-md-4">
                  {" "}
                  <CardLabel>
                    {t("CR_ANY_SPOUSE_IN_LIVING")} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    option={cmbYesOrNo}
                    selected={brideIsSpouseLiving}
                    select={setSelectbrideIsSpouseLiving}
                    placeholder={t("CR_Y/N")}
                    {...(validation = { isRequired: true })}
                  />
                </div>
              )}
              {(brideMaritalstatusID?.code === "MARRIED" ||
                brideMaritalstatusID?.code === "WIDOWED" ||
                brideMaritalstatusID?.code === "DIVORCED" ||
                brideMaritalstatusID?.code === "ANNULELD") &&
                brideIsSpouseLiving?.code === "YES" && (
                  <div className="col-md-4">
                    {" "}
                    <CardLabel>
                      {t("CR_NO_OF_SPOUSE_LIVING")} <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="brideNoOfSpouse"
                      value={brideNoOfSpouse}
                      onChange={setSelectbrideNoOfSpouse}
                      disable={isDisableEdit}
                      placeholder={t("CR_INT1-3")}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_NO_OF_SPOUSE_LIVING") })}
                    />
                  </div>
                )}
            </div>

            {/* </div> */}
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_PARENT_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="radios" style={{ justifyContent: "center", columnGap: "40px" }}>
                  {brideParent.map((type, index) => (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", columnGap: "8px" }}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="groomParent"
                        id="flexRadioDefault1"
                        style={{ height: "20px", width: "20px" }}
                        onChange={selectParentType}
                        value={type}
                        defaultChecked={index === 0}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {selectedParent === "PARENT" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_BRIDE_FATHER_ADHAR_NO")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"number"}
                        optionKey="i18nKey"
                        name="brideFatherAadharNo"
                        value={brideFatherAadharNo}
                        onChange={setSelectbrideFatherAadharNo}
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_FATHER_ADHAR_NO")}`}
                        inputProps={{
                          maxLength: 12,
                        }}
                        {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                        // {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                      />
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_FATHER_NAME_EN")}`}
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
                        disable={isDisableEdit}
                        placeholder={`${t("CR_FATHER_NAME_EN")}`}
                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_FATHER_NAME_MAL")}`}
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
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_FATHER_NAME_MAL")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_FATHER_NAME_ML"),
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_MOTHER_ADHAR_NO")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"number"}
                        optionKey="i18nKey"
                        name="brideMotherAadharNo"
                        value={brideMotherAadharNo}
                        onChange={setSelectbrideMotherAadharNo}
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_MOTHER_ADHAR_NO")}`}
                        inputProps={{
                          maxLength: 12,
                        }}
                        {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                        // {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                      />
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_MOTHER_NAME_EN")}`}
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
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_MOTHER_NAME_EN")}`}
                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_MOTHER_NAME_MAL")}`}
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
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_MOTHER_NAME_MAL")}`}
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
              </div>
            )}

            {selectedParent === "GUARDIAN" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_GUARDIAN_ADHAR")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"number"}
                        optionKey="i18nKey"
                        name="brideGuardianAadharNo"
                        value={brideGuardianAadharNo}
                        onChange={setSelectbrideGuardianAadharNo}
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_GUARDIAN_ADHAR")}`}
                        inputProps={{
                          maxLength: 12,
                        }}
                        {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                      />
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_GUARDIAN_NAME_EN")}`}
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
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_GUARDIAN_NAME_EN")}`}
                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_GUARDIAN_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <CardLabel>
                        {`${t("CR_BRIDE_GUARDIAN_NAME_MAL")}`}
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
                        disable={isDisableEdit}
                        placeholder={`${t("CR_BRIDE_GUARDIAN_NAME_MAL")}`}
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
              </div>
            )}
            {/* <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_OTHER_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div> */}
            {/* <div className="col-md-4">
              <CardLabel>{t("CR_OCCUPATION_OR_PROFESSION'")}</CardLabel>
            </div>
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{t("CR_PROFESSION_EN'")}</CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={false}
                  optionKey="name"
                  option={cmbProfession}
                  name="brideProfessionEn"
                  value={brideProfessionEn}
                  select={setSelectbrideProfessionEn}
                  selected={brideProfessionEn}
                  placeholder={t("CR_PROFESSION_EN'")}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>{t("CR_PROFESSION_MAL'")}</CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={false}
                  optionKey="namelocal"
                  option={cmbProfession}
                  name="brideProfessionMal"
                  value={brideProfessionMal}
                  select={setSelectbrideProfessionMal}
                  selected={brideProfessionMal}
                  placeholder={t("CR_PROFESSION_MAL'")}
                />
              </div>
            </div> */}

            {toast && (
              <Toast
                error={AadharError || AgeValidationMsg}
                label={
                  AadharError || AgeValidationMsg
                    ? AadharError
                      ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                      : AgeValidationMsg
                      ? t(`CR_INVALID_BRIDE_AGE`)
                      : setToast(false)
                    : setToast(false)
                }
                onClose={() => setToast(false)}
              />
            )}
            <div className="row">
              <div className="col-md-12">
                <h1 className="">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
        </FormStep>
      </React.Fragment>
    );
};
export default BrideDetails;
