import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  NewRadioButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import { TimePicker } from '@material-ui/pickers';

const BrideDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
 
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
  const [brideDOB, setbrideDOB] = useState(formData?.BrideDetails?.brideDOB ? formData?.BrideDetails?.brideDOB : "");
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
  const [brideFatherAdharNo, setbrideFatherAdharNo] = useState(
    formData?.BrideDetails?.brideFatherAdharNo ? formData?.BrideDetails?.brideFatherAdharNo : ""
  );
  const [brideMotherAdharNo, setbrideMotherAdharNo] = useState(
    formData?.BrideDetails?.brideMotherAdharNo ? formData?.BrideDetails?.brideMotherAdharNo : ""
  );
  const [brideGuardiannameEn, setbrideGuardiannameEn] = useState(
    formData?.BrideDetails?.brideGuardiannameEn ? formData?.BrideDetails?.brideGuardiannameEn : ""
  );
  const [brideGardianAdhar, setbrideGardianAdhar] = useState(
    formData?.BrideDetails?.brideGardianAdhar ? formData?.BrideDetails?.brideGardianAdhar : ""
  );
  const [brideProfessionEn, setbrideProfessionEn] = useState(
    formData?.BrideDetails?.brideProfessionEn ? formData?.BrideDetails?.brideProfessionEn : ""
  );
  const [brideProfessionMal, setbrideProfessionMal] = useState(
    formData?.BrideDetails?.brideProfessionMal ? formData?.BrideDetails?.brideProfessionMal : ""
  );
  const [brideMaritalstatusID, setbrideMaritalstatusID] = useState(
    formData?.BrideDetails?.brideMaritalstatusID ? formData?.BrideDetails?.brideMaritalstatusID : ""
  );
  const [brideSpouseLiving, setbrideSpouseLiving] = useState(
    formData?.BrideDetails?.brideSpouseLiving ? formData?.BrideDetails?.brideSpouseLiving : ""
  );
  const [brideNoOfSpouse, setbrideNoOfSpouse] = useState(
    formData?.BrideDetails?.brideNoOfSpouse ? formData?.BrideDetails?.brideNoOfSpouse : ""
  );
 
  const [access, setAccess] = React.useState(true);
  const [selectedOption, setSelectedOption] = useState(
    formData?.AddressOfDecesed?.selectedOption ? formData?.AddressOfDecesed?.selectedOption : "ILB"
  );
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  const onSkip = () => onSelect();

  

  function setselectGender(value) {
    selectGender(value);
  }
  
  function setSelectbrideFirstnameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideFirstnameMal(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectbrideFirstnameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideFirstnameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectbrideMiddlenameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideMiddlenameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectbrideMiddlenameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideMiddlenameMal(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectbrideLastnameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideLastnameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectbrideLastnameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideLastnameMal(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectbrideMobile(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideMobile(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideGender(value) {
    // console.log("gender" + value);
    setbrideGender(value);
  }
  // function setSelectbrideGender(value) {
  //   if (value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setbrideGender(value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
  //   }
  // }
  function setSelectbrideDOB(e) {
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
      // setDOBError(true);
      // setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectbrideAge(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideAge(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideParentGuardian(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideParentGuardian(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideFathernameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideFathernameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideMothernameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideMothernameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideFatherAdharNo(e) {
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
        setbrideFatherAdharNo(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setbrideFatherAdharNo(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setbrideFatherAdharNo(e.target.value);
      return true;
    }
  }
  function setSelectbrideMotherAdharNo(e) {
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
        setbrideMotherAdharNo(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setbrideMotherAdharNo(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setbrideMotherAdharNo(e.target.value);
      return true;
    }
  }
  function setSelectbrideGardianAdhar(e) {
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
        setbrideGardianAdhar(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setbrideGardianAdhar(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setbrideGardianAdhar(e.target.value);
      return true;
    }
  }
  function setSelectbrideGuardiannameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideGuardiannameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideProfessionEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideProfessionEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideProfessionMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideProfessionMal(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideMaritalstatusID(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideMaritalstatusID(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideSpouseLiving(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideSpouseLiving(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideNoOfSpouse(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideNoOfSpouse(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideEmailid(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideEmailid(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' A-Z]/gi, ""));
    }
  }
  function setSelectbrideSocialSecurityNo(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbrideSocialSecurityNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectbridePassportNo(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setbridePassportNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectChildFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectChildLastNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  
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
      sessionStorage.setItem("ChildDOB", ChildDOB ? ChildDOB : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);
      // sessionStorage.setItem("Gender", Gender ? Gender.code : null);
      sessionStorage.setItem("ChildAadharNo", ChildAadharNo ? ChildAadharNo : null);
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
      sessionStorage.setItem("brideFatherAdharNo", brideFatherAdharNo ? brideFatherAdharNo : null);
      sessionStorage.setItem("brideMotherAdharNo", brideMotherAdharNo ? brideMotherAdharNo : null);
      
      
      sessionStorage.setItem("brideGuardiannameEn", brideGuardiannameEn ? brideGuardiannameEn : null);
      sessionStorage.setItem("brideProfessionEn", brideProfessionEn ? brideProfessionEn : null);
      sessionStorage.setItem("brideProfessionMal", brideProfessionMal ? brideProfessionMal : null);
      sessionStorage.setItem("brideMaritalstatusID", brideMaritalstatusID ? brideMaritalstatusID : null);
      sessionStorage.setItem("brideNoOfSpouse", brideNoOfSpouse ? brideNoOfSpouse : null);
      sessionStorage.setItem("brideGardianAdhar", brideGardianAdhar ? brideGardianAdhar : null);
      sessionStorage.setItem("brideSpouseLiving", brideSpouseLiving ? brideSpouseLiving : null);
      sessionStorage.setItem("ChildLastNameEn", ChildLastNameEn ? ChildLastNameEn : null);
      sessionStorage.setItem("ChildFirstNameMl", ChildFirstNameMl ? ChildFirstNameMl : null);
      sessionStorage.setItem("ChildMiddleNameMl", ChildMiddleNameMl ? ChildMiddleNameMl : null);
      sessionStorage.setItem("ChildLastNameMl", ChildLastNameMl ? ChildLastNameMl : null);
      sessionStorage.setItem("isChildName", isChildName);
      sessionStorage.setItem("selectedOption", selectedOption ? selectedOption : "ILB");
      // sessionStorage.setItem("isMotherInfo", isMotherInfo);
      onSelect(config.key, {
        ChildDOB,
        tripStartTime,
        selectedOption,
        Gender,
        ChildAadharNo,
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
        brideFathernameEn,
        brideFatherAdharNo,
        brideMotherAdharNo,
        brideProfessionEn,
        brideProfessionMal,
        brideMaritalstatusID,
        brideSpouseLiving,
        brideNoOfSpouse,
        brideGuardiannameEn,
        brideGardianAdhar,
        brideEmailid,
        brideMiddlenameMal,
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
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <FormStep t={t}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_REGISTRATION_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_NATIONALITY_&RESIDENTSHIP")}

                <span className="mandatorycss">*</span>
              </CardLabel>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-8">
              <input type="radio" name="options" value="ILB" checked={selectedOption === "ILB"} onChange={handleOptionChange} />
              {t(" RESIDENT_INDIAN_NATIONAL  ")}

              <input type="radio" name="options" value="IK" checked={selectedOption === "IK"} onChange={handleOptionChange} />
              {t(" NRI  ")}
              <input type="radio" name="options" value="IIN" checked={selectedOption === "IIN"} onChange={handleOptionChange} />
              {t(" FOREIN_NATIONAL  ")}
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
            <div className="col-md-6">
              <CardLabel>
                {t("CR_ADHAR_AND_PASSPORT_NO")}
                <span className="mandatorycss">*</span>
              </CardLabel>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="ChildMiddleNameEn1"
                // disable={isChildName}
                placeholder={`${t("CR_ADHAR_NO")}`}
                // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>
            <div className="col-md-4">
              {" "}
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="bridePassportNo"
                // disable={isChildName}
                onChange={setSelectbridePassportNo}
                placeholder={`${t("CR_PASSPORT_NO")}`}
                // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>

            <div className="col-md-4">
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="brideSocialSecurityNo"
                // disable={isChildName}
                onChange={setSelectbrideSocialSecurityNo}
                placeholder={`${t("CR_SOCIAL_SECURITY_NO")}`}
                // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
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
                name="brideFirstnameEn"
                value={brideFirstnameEn}
                onChange={setSelectbrideFirstnameEn}
                //  onChange={(e,v) => this.updateTextField(e,v)}
                // disable={isChildName}
                placeholder={`${t("CR_FIRST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
              />
            </div>
            <div className="col-md-3">
              {" "}
              <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideMiddlenameEn"
                value={brideMiddlenameEn}
                onChange={setSelectbrideMiddlenameEn}
                // disable={isChildName}
                placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>
            <div className="col-md-3">
              {" "}
              <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideLastnameEn"
                value={brideLastnameEn}
                onChange={setSelectbrideLastnameEn}
                // disable={isChildName}
                placeholder={`${t("CR_LAST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
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
                // disable={isChildName}
                placeholder={`${t("CR_BRIDE_MOBILE_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
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
                  name="brideFirstnameMal"
                  value={brideFirstnameMal}
                  onChange={setSelectbrideFirstnameMal}
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
              <div className="col-md-3">
                {" "}
                <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideMiddlenameMal"
                  value={brideMiddlenameMal}
                  onChange={setSelectbrideMiddlenameMal}
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
              <div className="col-md-3">
                {" "}
                <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="brideLastnameMal"
                  value={brideLastnameMal}
                  onChange={setSelectbrideLastnameMal}
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
                  // disable={isChildName}
                  placeholder={`${t("CR_BRIDE_EMAIL")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_INVALID_EMAIL"),
                  })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-2">
                <CardLabel>
                  {`${t("CR_GENDER")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_AGE_&DOB")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
            </div>
            <div>
              <div className="col-md-12">
                <div className="col-md-2">
                  <Dropdown
                    t={t}
                    optionKey="code"
                    isMandatory={true}
                    option={menu}
                    selected={brideGender}
                    select={setSelectbrideGender}
                    placeholder={`${t("CR_GENDER")}`}
                    {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                  />
                </div>

                <div className="col-md-2">
                  <DatePicker
                    date={brideDOB}
                    name="brideDOB"
                    onChange={setSelectbrideDOB}
                    inputFormat="DD-MM-YYYY"
                    placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                    {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                  />
                </div>
                <div className="col-md-2">
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="brideAge"
                    value={brideAge}
                    onChange={setSelectbrideAge}
                    // disable={isChildName}
                    placeholder={`${t("CR_AGE")}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENT_DETAILS")}`}</span>{" "}
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
              <div className="col-md-6">
                <input type="radio" checked={selectedOption === "IK"} onChange={handleOptionChange} />
                {t("PARENTS  ")}

                {/* <span  className="col-md-2"></span> */}
                <input type="radio" name="options" value="IIN" checked={selectedOption === "IIN"} onChange={handleOptionChange} />
                {t("GUARDIAN")}
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="col-md-2">
              <CardLabel>{t("CR_FATHER'")}</CardLabel>
            </div>
            <div className="col-md-2">
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="brideFatherAdharNo"
                value={brideFatherAdharNo}
                onChange={setSelectbrideFatherAdharNo}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                inputProps={{
                  maxLength: 12,
                }}
                {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-2">
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideFathernameEn"
                value={brideFathernameEn}
                onChange={setSelectbrideFathernameEn}
                placeholder={`${t("CR_NAME")}`}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="col-md-2">
              <CardLabel>{t("CR_MOTHER'")}</CardLabel>
            </div>
            <div className="col-md-2">
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="brideMotherAdharNo"
                value={brideMotherAdharNo}
                onChange={setSelectbrideMotherAdharNo}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                inputProps={{
                  maxLength: 12,
                }}
                {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-2">
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideMothernameEn"
                value={brideMothernameEn}
                onChange={setSelectbrideMothernameEn}
                placeholder={`${t("CR_NAME")}`}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="col-md-2">
              <CardLabel>{t("CR_GUARDIAN'")}</CardLabel>
            </div>
            <div className="col-md-2">
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="brideGardianAdhar"
                value={brideGardianAdhar}
                onChange={setSelectbrideGardianAdhar}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                inputProps={{
                  maxLength: 12,
                }}
                {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-2">
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideGuardiannameEn"
                value={brideGuardiannameEn}
                onChange={setSelectbrideGuardiannameEn}
                placeholder={`${t("CR_NAME")}`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_OTHER_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_OCCUPATION_OR_PROFESSION'")}</CardLabel>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <Dropdown
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideProfessionEn"
                value={brideProfessionEn}
                onChange={setSelectbrideProfessionEn}
                placeholder={t("CR_PROFESSION_EN'")}
              />
            </div>
            <div className="col-md-6">
            <Dropdown
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideProfessionMal"
                value={brideProfessionMal}
                onChange={setSelectbrideProfessionMal}
                 placeholder={t("CR_PROFESSION_MAL'")} />
            </div>
          </div>

          <div className="col-md-4">
            <CardLabel>{t("CR_MARIATAL_STATUS'")}</CardLabel>
          </div>

          <div className="col-md-12">
            <div className="col-md-4">
            
            <Dropdown
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideMaritalstatusID"
                value={brideMaritalstatusID}
                onChange={setSelectbrideMaritalstatusID}
                placeholder={t("CR_MARIATAL_STATUS-UNMARRIED/MARRIED/WIDOWED/DIVORCED/ANNULLED")} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{t("CR_ANY_SPOUSE_IN_LIVING?(IF_NOT_UNMARRIED)'")}</CardLabel>
            </div>
            <div className="col-md-2">
            <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideSpouseLiving"
                value={brideSpouseLiving}
                onChange={setSelectbrideSpouseLiving}
                 placeholder={t("CR_Y/N")} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{t("CR_NO_OF_SPOUSE_LIVING?(IF_YES))'")}</CardLabel>
            </div>
            <div className="col-md-2">
            <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="brideNoOfSpouse"
                value={brideNoOfSpouse}
                onChange={setSelectbrideNoOfSpouse}
                 placeholder={t("CR_INT1-3")} />
            </div>
          </div>


          <div className="row">
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
          </div>
          
          
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
