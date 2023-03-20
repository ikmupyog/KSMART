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

const BrideDetails = ({config, onSelect, userType, formData, isEditBride}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  // const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];
  const cmbYesOrNo = [
    { i18nKey: "Yes", code: "YES" },
    { i18nKey: "No", code: "NO" },
  ];
  let menu = [];
  // let cmbProfession = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  // Profession &&
  //   Profession["birth-death-service"] &&
  //   Profession["birth-death-service"].Profession &&
  //   Profession["birth-death-service"].Profession.map((ob) => {
  //     cmbProfession.push(ob);
  //   });
    
    const [isInitialRenderRadioButtons, setisInitialRenderRadioButtons] = useState(true);
    const [selectedValueRadio, setSelectedValue] = useState(formData?.BrideDetails?.selectedValueRadio ? formData?.BrideDetails?.selectedValueRadio : ""
    );
  const [brideAdharNo, setbrideAdharNo] = useState(formData?.BrideDetails?.brideAdharNo ? formData?.BrideDetails?.brideAdharNo : "");

  const [bridePassportNo, setbridePassportNo] = useState(formData?.BrideDetails?.bridePassportNo ? formData?.BrideDetails?.bridePassportNo : "");
  const [brideSocialSecurityNo, setbrideSocialSecurityNo] = useState(
    formData?.BrideDetails?.brideSocialSecurityNo ? formData?.BrideDetails?.brideSocialSecurityNo : ""
  );
  const [brideFirstnameEn, setbrideFirstnameEn] = useState(formData?.BrideDetails?.brideFirstnameEn ? formData?.BrideDetails?.brideFirstnameEn : "");
  const [brideFirstnameMal, setbrideFirstnameMal] = useState(
    formData?.BrideDetails?.brideFirstnameMal ? formData?.BrideDetails?.brideFirstnameMal : ""
  );
  const [brideMiddlenameEn, setbrideMiddlenameEn] = useState(
    formData?.BrideDetails?.brideMiddlenameEn ? formData?.BrideDetails?.brideMiddlenameEn : ""
  );
  const [brideMiddlenameMal, setbrideMiddlenameMal] = useState(
    formData?.BrideDetails?.brideMiddlenameMal ? formData?.BrideDetails?.brideMiddlenameMal : ""
  );
  const [brideLastnameEn, setbrideLastnameEn] = useState(formData?.BrideDetails?.brideLastnameEn ? formData?.BrideDetails?.brideLastnameEn : "");
  const [brideLastnameMal, setbrideLastnameMal] = useState(formData?.BrideDetails?.brideLastnameMal ? formData?.BrideDetails?.brideLastnameMal : "");
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
  const [brideMothernameMal, setbrideMothernameMal] = useState(
    formData?.BrideDetails?.brideMothernameEn ? formData?.BrideDetails?.brideMothernameMal : ""
  );
  const [brideGuardiannameMal, setbrideGuardiannameMal] = useState(
    formData?.BrideDetails?.brideGuardiannameMal ? formData?.BrideDetails?.brideGuardiannameMal : ""
  );
  const [brideFathernameMal, setbrideFathernameMal] = useState(
    formData?.BrideDetails?.brideFathernameMal ? formData?.BrideDetails?.brideFathernameMal : ""
  );
  const [brideFatherAdharNo, setbrideFatherAdharNo] = useState(
    formData?.BrideDetails?.brideFatherAdharNo ? formData?.BrideDetails?.brideFatherAdharNo : ""
  );
  const [brideMotherAdharNo, setbrideMotherAdharNo] = useState(
    formData?.BrideDetails?.brideMotherAdharNo ? formData?.BrideDetails?.brideMotherAdharNo : ""
  );
  const [brideGuardiannameEn, setbrideGuardiannameEn] = useState(
    formData?.BrideDetails?.brideGuardiannameEn ? formData?.BrideDetails?.brideGuardiannameEn : ""
  );
  const [brideGuardianAdhar, setbrideGuardianAdhar] = useState(
    formData?.BrideDetails?.brideGuardianAdhar ? formData?.BrideDetails?.brideGuardianAdhar : ""
  );

  const [brideMaritalstatusID, setbrideMaritalstatusID] = useState(
    formData?.BrideDetails?.brideMaritalstatusID ? formData?.BrideDetails?.brideMaritalstatusID : ""
  );
  const [brideSpouseLiving, setbrideSpouseLiving] = useState(
    formData?.BrideDetails?.brideSpouseLiving ? formData?.BrideDetails?.brideSpouseLiving : ""
  );
  const [brideNoOfSpouse, setbrideNoOfSpouse] = useState(formData?.BrideDetails?.brideNoOfSpouse ? formData?.BrideDetails?.brideNoOfSpouse : "");
  const [valueRad, setValueRad] = useState(formData?.GroomDetails?.selectedValueRadio ? formData?.GroomDetails?.selectedValueRadio : "");
  const [access, setAccess] = React.useState(true);
  const [selectedOption, setSelectedOption] = useState(
    formData?.AddressOfDecesed?.selectedOption ? formData?.AddressOfDecesed?.selectedOption : "ILB"
  );
  const [AadharError, setAadharError] = useState(formData?.BrideDetails?.brideAadharNo ? false : false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBride ? isEditBride : false);
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSkip = () => onSelect();
  function selectRadioButtons(value) {
    console.log(value);
    setSelectedValue(value);
    setValueRad(value.code);
    setisInitialRenderRadioButtons(true);
  }
  useEffect(() => {
    if (isInitialRenderRadioButtons) {
      setisInitialRenderRadioButtons(false);
      if (selectedValueRadio) {
        //setIsInitialRenderRadio(false);
        setValueRad(selectedValueRadio.code);
      }
    }
  }, [isInitialRenderRadioButtons]);
  const rbmenu = [
    { i18nKey: "CR_RESIDENT_INDIAN", code: "INDIAN" },
    { i18nKey: "CR_NRI", code: "NRI" },
    { i18nKey: "CR_FOREIGN_NATIONAL", code: "FOREIGN" },
  ];
  const radiomenu = [
    { i18nKey: "CR_BRIDE_PARENTS", code: "PARENT" },
    { i18nKey: "CR_BRIDE_GUARDIAN", code: "GUARDIAN" },
  ];
  function setSelectbrideFirstnameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setbrideFirstnameMal('');
    }
    else {
      setbrideFirstnameMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
 
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideFirstnameMal(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideFirstnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setbrideFirstnameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideFirstnameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    // }
  }
  function setSelectbrideMiddlenameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setbrideMiddlenameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {

    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideMiddlenameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    // }
  }
  function setSelectbrideMiddlenameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMotherFirstNameMl('');
    }
    else {
      setbrideMiddlenameMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideMiddlenameMal(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideLastnameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setbrideLastnameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideLastnameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    // }
  }
  function setSelectbrideLastnameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setbrideLastnameMal('');
    }
    else {
      setbrideLastnameMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideLastnameMal(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideMobile(e) {
    if (e.target.value.trim().length != 0) {
      setbrideMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
    // if (e.target.value.length === 11) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideMobile(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C a-zA-Z]/gi, ""));
    // }
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
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
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
      setbrideParentGuardian(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideParentGuardian(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    // }
  }
  function setSelectbrideFathernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setbrideFathernameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideFathernameEn(
    //     e.target.value.replace(
    //       /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
    //       ""
    //     )
    //   );
    // }
  }
  function setSelectbrideMothernameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setbrideMothernameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideMothernameEn(
    //     e.target.value.replace(
    //       /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
    //       ""
    //     )
    //   );
    // }
  }
  function setSelectbrideMothernameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setbrideMothernameMal('');
    }
    else {
      setbrideMothernameMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideMothernameMal(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideGuardiannameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMotherFirstNameMl('');
    }
    else {
      setbrideGuardiannameMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideGuardiannameMal(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideFathernameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setbrideFathernameMal('');
    }
    else {
      setbrideFathernameMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideFathernameMal(
    //     e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
    //   );
    // }
  }
  function setSelectbrideFatherAdharNo(e) {
    
    if (e.target.value.trim().length >= 0) {
      setbrideFatherAdharNo(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
    // if (e.target.value.length != 0) {
    //   if (e.target.value.length > 12) {
    //     // setChildAadharNo(e.target.value);
    //     setAadharError(true);
    //     return false;
    //     // const limit = 12;
    //     // setChildAadharNo(e.target.value.slice(0, limit));
    //     // window.alert("Username shouldn't exceed 10 characters")
    //   } else if (e.target.value.length < 12) {
    //     setAadharError(true);
    //     setbrideFatherAdharNo(e.target.value);
    //     return false;
    //   } else {
    //     setAadharError(false);
    //     setbrideFatherAdharNo(e.target.value);
    //     return true;
    //   }
    // } else {
    //   setAadharError(false);
    //   setbrideFatherAdharNo(e.target.value);
    //   return true;
    // }
  }
  function setSelectbrideAdharNo(e) {
    if (e.target.value.trim().length >= 0) {
      setbrideAdharNo(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
    // if (e.target.value.length != 0) {
    //   if (e.target.value.length > 12) {
    //     // setChildAadharNo(e.target.value);
    //     setAadharError(true);
    //     return false;
    //     // const limit = 12;
    //     // setChildAadharNo(e.target.value.slice(0, limit));
    //     // window.alert("Username shouldn't exceed 10 characters")
    //   } else if (e.target.value.length < 12) {
    //     setAadharError(true);
    //     setbrideAdharNo(e.target.value);
    //     return false;
    //   } else {
    //     setAadharError(false);
    //     setbrideAdharNo(e.target.value);
    //     return true;
    //   }
    // } else {
    //   setAadharError(false);
    //   setbrideAdharNo(e.target.value);
    //   return true;
    // }
  }
  function setSelectbrideMotherAdharNo(e) {
    if (e.target.value.trim().length >= 0) {
      setbrideMotherAdharNo(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
    // if (e.target.value.length != 0) {
    //   if (e.target.value.length > 12) {
    //     // setChildAadharNo(e.target.value);
    //     setAadharError(true);
    //     return false;
    //     // const limit = 12;
    //     // setChildAadharNo(e.target.value.slice(0, limit));
    //     // window.alert("Username shouldn't exceed 10 characters")
    //   } else if (e.target.value.length < 12) {
    //     setAadharError(true);
    //     setbrideMotherAdharNo(e.target.value);
    //     return false;
    //   } else {
    //     setAadharError(false);
    //     setbrideMotherAdharNo(e.target.value);
    //     return true;
    //   }
    // } else {
    //   setAadharError(false);
    //   setbrideMotherAdharNo(e.target.value);
    //   return true;
    // }
  }
  function setSelectbrideGuardianAdhar(e) {
    if (e.target.value.trim().length >= 0) {
      setbrideGuardianAdhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
    // if (e.target.value.length != 0) {
    //   if (e.target.value.length > 12) {
    //     // setChildAadharNo(e.target.value);
    //     setAadharError(true);
    //     return false;
    //     // const limit = 12;
    //     // setChildAadharNo(e.target.value.slice(0, limit));
    //     // window.alert("Username shouldn't exceed 10 characters")
    //   } else if (e.target.value.length < 12) {
    //     setAadharError(true);
    //     setbrideGuardianAdhar(e.target.value);
    //     return false;
    //   } else {
    //     setAadharError(false);
    //     setbrideGuardianAdhar(e.target.value);
    //     return true;
    //   }
    // } else {
    //   setAadharError(false);
    //   setbrideGuardianAdhar(e.target.value);
    //   return true;
    // }
  }
  function setSelectbrideGuardiannameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setbrideGuardiannameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setbrideGuardiannameEn(
    //     e.target.value.replace(
    //       /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
    //       ""
    //     )
    //   );
    // }
  }

  function setSelectbrideMaritalstatusID(value) {
    setbrideMaritalstatusID(value);
    // setAgeMariageStatus(value.code);
  }

  function setSelectbrideSpouseLiving(value) {
    setbrideSpouseLiving(value);
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
    if (e.target.value.length === 12) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbridePassportNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-zA-Z]/gi, ""));
    }
  }
  // function setSelectChildLastNameEn(e) {
  //   if (e.target.value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
  //   }
  // }
  // function setSelectChildFirstNameMl(e) {
  //   if (e.target.value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setChildFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  //   }
  // }
  // function setSelectChildMiddleNameMl(e) {
  //   if (e.target.value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setChildMiddleNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  //   }
  // }
  // function setSelectChildLastNameMl(e) {
  //   if (e.target.value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setChildLastNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  //   }
  // }

  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      setTripStartTime(value);
    }
  };
  // function setChildName(e) {
  //   if (e.target.checked === true) {
  //     setIsChildName(e.target.checked);
  //   } else {
  //     setIsChildName(e.target.checked);
  //     setChildFirstNameEn("");
  //     setChildMiddleNameEn("");
  //     setChildLastNameEn("");
  //     setChildFirstNameMl("");
  //     setChildMiddleNameMl("");
  //     setChildLastNameMl("");
  //   }
  // }
  let validFlag = true;
  const goNext = () => {
    if (AadharError) {
      validFlag = false;
      setAadharErroChildAadharNor(true);
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
      // sessionStorage.setItem("ChildDOB", ChildDOB ? ChildDOB : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);
      // sessionStorage.setItem("Gender", Gender ? Gender.code : null);
      sessionStorage.setItem("brideAadharNo", brideAadharNo ? brideAadharNo : null);
      sessionStorage.setItem("ChildFirstNameEn", ChildFirstNameEn ? ChildFirstNameEn : null);
      sessionStorage.setItem("ChildMiddleNameEn", ChildMiddleNameEn ? ChildMiddleNameEn : null);
      sessionStorage.setItem("bridePassportNo", bridePassportNo ? bridePassportNo : null);
      sessionStorage.setItem("brideSocialSecurityNo", brideSocialSecurityNo ? brideSocialSecurityNo : null);
      sessionStorage.setItem("brideFirstnameEn", brideFirstnameEn ? brideFirstnameEn : null);
      sessionStorage.setItem("brideFirstnameMal", brideFirstnameMal ? brideFirstnameMal : null);
      sessionStorage.setItem("brideMiddlenameEn", brideMiddlenameEn ? brideMiddlenameEn : null);
      sessionStorage.setItem("brideMiddlenameMal", brideMiddlenameMal ? brideMiddlenameMal : null);
      sessionStorage.setItem("brideLastnameEn", brideLastnameEn ? brideLastnameEn : null);
      sessionStorage.setItem("brideLastnameMal", brideLastnameMal ? brideLastnameMal : null);
      sessionStorage.setItem("brideMobile", brideMobile ? brideMobile : null);
      sessionStorage.setItem("brideEmailid", brideEmailid ? brideEmailid : null);
      sessionStorage.setItem("brideGender", brideGender ? brideGender : null);
      sessionStorage.setItem("brideDOB", brideDOB ? brideDOB : null);
      sessionStorage.setItem("brideAge", brideAge ? brideAge : null);
      sessionStorage.setItem("brideParentGuardian", brideParentGuardian ? brideParentGuardian : null);
      sessionStorage.setItem("brideFathernameEn", brideFathernameEn ? brideFathernameEn : null);
      sessionStorage.setItem("brideFathernameMal", brideFathernameMal ? brideFathernameMal : null);
      sessionStorage.setItem("brideMothernameEn", brideMothernameEn ? brideMothernameEn : null);
      sessionStorage.setItem("brideMothernameMal", brideMothernameMal ? brideMothernameMal : null);
      sessionStorage.setItem("brideGuardiannameMal", brideGuardiannameMal ? brideGuardiannameMal : null);

      sessionStorage.setItem("brideFatherAdharNo", brideFatherAdharNo ? brideFatherAdharNo : null);
      sessionStorage.setItem("brideMotherAdharNo", brideMotherAdharNo ? brideMotherAdharNo : null);

      sessionStorage.setItem("brideGuardiannameEn", brideGuardiannameEn ? brideGuardiannameEn : null);
      // sessionStorage.setItem("brideProfessionEn", brideProfessionEn ? brideProfessionEn : null);
      // sessionStorage.setItem("brideProfessionMal", brideProfessionMal ? brideProfessionMal : null);
      sessionStorage.setItem("brideMaritalstatusID", brideMaritalstatusID ? brideMaritalstatusID : null);
      sessionStorage.setItem("brideNoOfSpouse", brideNoOfSpouse ? brideNoOfSpouse : null);
      sessionStorage.setItem("brideGuardianAdhar", brideGuardianAdhar ? brideGuardianAdhar : null);
      sessionStorage.setItem("brideSpouseLiving", brideSpouseLiving ? brideSpouseLiving : null);
      sessionStorage.setItem("ChildLastNameEn", ChildLastNameEn ? ChildLastNameEn : null);
      sessionStorage.setItem("ChildFirstNameMl", ChildFirstNameMl ? ChildFirstNameMl : null);
      sessionStorage.setItem("ChildMiddleNameMl", ChildMiddleNameMl ? ChildMiddleNameMl : null);
      sessionStorage.setItem("ChildLastNameMl", ChildLastNameMl ? ChildLastNameMl : null);
      sessionStorage.setItem("isChildName", isChildName);
      sessionStorage.setItem("selectedOption", selectedOption ? selectedOption : "ILB");
      // sessionStorage.setItem("isMotherInfo", isMotherInfo);
      onSelect(config.key, {
        // ChildDOB,
        tripStartTime,
        selectedOption,
        Gender,
        brideAadharNo,
        ChildFirstNameEn,
        ChildMiddleNameEn,
        bridePassportNo,
        brideSocialSecurityNo,
        brideFirstnameEn,
        brideFirstnameMal,
        brideMiddlenameEn,
        brideLastnameEn,
        brideLastnameMal,
        brideMobile,
        brideGender,
        brideDOB,
        brideMothernameEn,
        brideMothernameMal,
        brideGuardiannameMal,
        brideFathernameEn,
        brideFathernameMal,
        brideFatherAdharNo,
        brideMotherAdharNo,
        // brideProfessionEn,
        // brideProfessionMal,
        brideMaritalstatusID,
        brideSpouseLiving,
        brideNoOfSpouse,
        brideGuardiannameEn,
        brideGuardianAdhar,
        brideEmailid,
        brideMiddlenameMal,
      });
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
        <FormStep t={t} onSelect={goNext}  onSkip={onSkip}  isDisabled={!brideDOB }>
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
          <div className="col-md-12">
            <div className="radios">
              <div className="radiobuttons">
                <LabelFieldPair style={{ display: "flex" }}>
                  <RadioButtons t={t} optionsKey="i18nKey" options={rbmenu} selectedOption={selectedValueRadio} onSelect={selectRadioButtons} style={{ marginTop: "15px", paddingLeft: "5px", height: "20px", display: "flex" }} />
                </LabelFieldPair>
              </div>
            </div>
            </div>
              {/* <div className="col-md-4">
              <h2>Add Image:</h2>
              <input type="file" onChange={handleChange} />
              <img src={file} />
            </div> */}
            </div>
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
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideAadharNo"
                  onChange={setSelectbrideAdharNo}
                  disable={isDisableEdit}
                  // disable={isChildName}
                  placeholder={`${t("CR_ADHAR_NO")}`}
                  {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  // {...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {t("CR_PASSPORT_NO")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="bridePassportNo"
                  // disable={isChildName}
                  onChange={setSelectbridePassportNo}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_PASSPORT_NO")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: false, title: t("CS_COMMON_INVALID_PASSPORT_NO") })}
                />
              </div>

              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {t("CR_SOCIAL_SECURITY_NO")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideSocialSecurityNo"
                  disable={isDisableEdit}
                  onChange={setSelectbrideSocialSecurityNo}
                  placeholder={`${t("CR_SOCIAL_SECURITY_NO")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: false, title: t("CR_INVALID_SOCIAL_SECURITY_NUMBER") })}
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
                <CardLabel>{`${t("CR_BRIDE_MOBILE_NO")}`}</CardLabel>
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
                  {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
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
                  name="brideFirstnameMal"
                  value={brideFirstnameMal}
                  onChange={setSelectbrideFirstnameMal}
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
                  name="brideMiddlenameMal"
                  value={brideMiddlenameMal}
                  onChange={setSelectbrideMiddlenameMal}
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
                  name="brideLastnameMal"
                  value={brideLastnameMal}
                  onChange={setSelectbrideLastnameMal}
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
                <CardLabel>{`${t("CR_BRIDE_EMAIL")}`}</CardLabel>
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
                  {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
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
                <div className="col-md-2">
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
                    selected={brideGender}
                    select={setSelectbrideGender}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_GENDER")}`}
                    {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                  />
                </div>

                <div className="col-md-2">
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
                    {...(validation = { isRequired: true, title: t("CR_INVALID_BRIDE_DATE_OF_BIRTH") })}
                  />
                </div>
                <div className="col-md-2">
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
                    disable={isDisableEdit}
                    placeholder={`${t("CR_AGE")}`}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-4">
                {" "}
                <CardLabel>{t("CR_MARIATAL_STATUS'")}</CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  option={cmbMaritalStatus}
                  selected={brideMaritalstatusID}
                  select={setSelectbrideMaritalstatusID}
                  disable={isDisableEdit}
                  placeholder={t("CR_MARIATAL_STATUS")}
                />
              </div>
              <div className="col-md-4">
                {" "}
                <CardLabel>{t("CR_ANY_SPOUSE_IN_LIVING")}</CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  option={cmbYesOrNo}
                  selected={brideSpouseLiving}
                  select={setSelectbrideSpouseLiving}
                  placeholder={t("CR_Y/N")}
                />
              </div>

              <div className="col-md-4">
                {" "}
                <CardLabel>{t("CR_NO_OF_SPOUSE_LIVING")}</CardLabel>
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
                />
              </div>
            </div>

            {/* </div> */}
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_PARENT_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
            {/* <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_PAREENTS/_GUARDIAN'")} */}
            {/* <span className="mandatorycss">*</span> */}
            {/* </CardLabel>
              </div>
            </div>
          </div> */}
            <div className="row">
            <div className="col-md-12">
              <div className="radios">
                <div className="radiobuttons">
                  <LabelFieldPair style={{ display: "flex" }}>
                    <RadioButtons
                      t={t}
                      optionsKey="i18nKey"
                      options={radiomenu}
                      selectedOption={selectedValueRadio}
                      onSelect={selectRadioButtons}
                      style={{ marginTop: "10px", paddingLeft: "5px", height: "20px", display: "flex" }}
                    />
                  </LabelFieldPair>
                </div>
              </div>
            </div>
          </div>

            <div className="col-md-12">
              {/* <div className="col-md-2">
                <CardLabel>{t("CR_BRIDE_FATHER'")}</CardLabel>
              </div> */}
              <div className="col-md-4">
                {" "}
                <CardLabel>
                  {`${t("CR_BRIDE_FATHER_ADHAR_NO")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="brideFatherAdharNo"
                  value={brideFatherAdharNo}
                  onChange={setSelectbrideFatherAdharNo}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_FATHER_ADHAR_NO")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                  name="brideFathernameMal"
                  value={brideFathernameMal}
                  onChange={setSelectbrideFathernameMal}
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

            <div className="col-md-12">
              {/* <div className="col-md-2">
                <CardLabel>{t("CR_BRIDE_MOTHER'")}</CardLabel>
              </div> */}
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
                  name="brideMotherAdharNo"
                  value={brideMotherAdharNo}
                  onChange={setSelectbrideMotherAdharNo}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_MOTHER_ADHAR_NO")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                  name="brideMothernameMal"
                  value={brideMothernameMal}
                  onChange={setSelectbrideMothernameMal}
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

            <div className="col-md-12">
              {/* <div className="col-md-2">
                <CardLabel>{t("CR_GUARDIAN'")}</CardLabel>
              </div> */}
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
                  name="brideGuardianAdhar"
                  value={brideGuardianAdhar}
                  onChange={setSelectbrideGuardianAdhar}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BRIDE_GUARDIAN_ADHAR")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  // {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                  name="brideGuardiannameMal"
                  value={brideGuardiannameMal}
                  onChange={setSelectbrideGuardiannameMal}
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

            
            {/* <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{t("CR_PERMANENT_ADDRESS'")}</CardLabel>
              </div>
            </div>

            <div className="col-md-12">
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_COUNTRY'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_STATE'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_DISTRICT'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_SUBDISTRICT'")} />
              </div>
              <div className="col-md-4">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_CITY_TOWN_VILLAGE'")} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_LOCALITY'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_STREAT'")} />
              </div>
              <div className="col-md-4">
                <TextInput t={t} optionKey="i18nKey" placeholder={t("CR_HOUSE_NAME_AND_NO'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_PIN'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_PO'")} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{t("CR_PRESENNT_ADDRESS'")}</CardLabel>
              </div>
              <div className="col-md-2">
                <input type="radio" checked={selectedOption === "IK"} onChange={handleOptionChange} />
                {t("CR_SAME_AS _ABOVE  ")}
              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_COUNTRY'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_STATE'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_DISTRICT'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_SUBDISTRICT'")} />
              </div>
              <div className="col-md-4">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_CITY_TOWN_VILLAGE'")} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_LOCALITY'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_STREAT'")} />
              </div>
              <div className="col-md-4">
                <TextInput t={t} optionKey="i18nKey" placeholder={t("CR_HOUSE_NAME_AND_NO'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_PIN'")} />
              </div>
              <div className="col-md-2">
                <Dropdown t={t} optionKey="i18nKey" placeholder={t("CR_PO'")} />
              </div>
            </div> */}
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
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : DOBError
                    ? t(`BIRTH_DOB_VALIDATION_MSG`)
                    : // : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                      // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                      setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}
            <div className="row">
              <div className="col-md-12">
                <h1 className="">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span>{" "}
                </h1>
              </div>
            </div>

            {""}
          </div>
          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
};
export default BrideDetails;
