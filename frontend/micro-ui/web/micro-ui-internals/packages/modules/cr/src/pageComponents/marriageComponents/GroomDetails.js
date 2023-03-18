import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  BackButton,
  Loader,
  Toast,
  LabelFieldPair,
  RadioButtons,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const GroomDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");

  const radiomenu = [
    { i18nKey: "CR_GROOM_PARENTS", code: "PARENT" },
    { i18nKey: "CR_GROOM_GUARDIAN", code: "GUARDIAN" },
  ];
  let menu = [];
  Menu &&
    Menu.map((groomGenderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${groomGenderDetails.code}`, code: `${groomGenderDetails.code}`, value: `${groomGenderDetails.code}` });
    });
  let cmbProfession = [];
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbProfession.push(ob);
    });
  const [isInitialRenderRadioButtons, setisInitialRenderRadioButtons] = useState(true);
  const [groomProfessionEn, setGroomProfessionEn] = useState(
    formData?.GroomDetails?.groomProfessionEn ? formData?.GroomDetails?.groomProfessionEn : null
  );
  const [groomProfessionMal, setGroomProfessionMal] = useState(
    formData?.GroomDetails?.groomProfessionMal ? formData?.GroomDetails?.groomProfessionMal : null
  );
  const [groomGender, selectGroomGender] = useState(formData?.GroomDetails?.groomGender);
  const [groomDOB, setGroomDOB] = useState(formData?.GroomDetails?.groomDOB ? formData?.GroomDetails?.groomDOB : "");
  const [groomFathernameEn, setGroomFathernameEn] = useState(
    formData?.GroomDetails?.groomFathernameEn ? formData?.GroomDetails?.groomFathernameEn : ""
  );
  const [groomGuardiannameEn, setGroomGuardiannameEn] = useState(
    formData?.GroomDetails?.groomGuardiannameEn ? formData?.GroomDetails?.groomGuardiannameEn : ""
  );
  const [groomGuardiannameMal, setGroomGuardiannameMal] = useState(
    formData?.GroomDetails?.groomGuardiannameMal ? formData?.GroomDetails?.groomGuardiannameMal : ""
  );
  const [groomFathernameMal, setGroomFathernameMal] = useState(
    formData?.GroomDetails?.groomFathernameMal ? formData?.GroomDetails?.groomFathernameMal : ""
  );
  const [groomMothernameEn, setGroomMothernameEn] = useState(
    formData?.GroomDetails?.groomMothernameEn ? formData?.GroomDetails?.groomMothernameEn : ""
  );
  const [groomMothernameMal, setGroomMothernameMal] = useState(
    formData?.GroomDetails?.groomMothernameMal ? formData?.GroomDetails?.groomMothernameMal : ""
  );
  const [groomPassportNo, setGroomPassportNo] = useState(formData?.GroomDetails?.groomPassportNo ? formData?.GroomDetails?.groomPassportNo : "");
  const [groomAdharNo, setGroomAadharNo] = useState(formData?.GroomDetails?.groomAdharNo ? formData?.GroomDetails?.groomAdharNo : "");
  const [groomFatherAdharNo, setGroomFatherAdharNo] = useState(
    formData?.GroomDetails?.groomFatherAdharNo ? formData?.GroomDetails?.groomFatherAdharNo : ""
  );
  const [groomGardianAdhar, setGroomGardianAdhar] = useState(
    formData?.GroomDetails?.groomGardianAdhar ? formData?.GroomDetails?.groomGardianAdhar : ""
  );
  const [groomMotherAdharNo, setGroomMotherAdharNo] = useState(
    formData?.GroomDetails?.groomMotherAdharNo ? formData?.GroomDetails?.groomMotherAdharNo : ""
  );
  const [groomSocialSecurityNo, setGroomSocialSecurityNo] = useState(
    formData?.GroomDetails?.groomSocialSecurityNo ? formData?.GroomDetails?.groomSocialSecurityNo : ""
  );

  const [toast, setToast] = useState(false);
  const [DOBError, setDOBError] = useState(formData?.GroomDetails?.groomDOB ? false : false);

  const [groomSpouseLiving, setGroomSpouseLiving] = useState(
    formData?.GroomDetails?.groomSpouseLiving ? formData?.GroomDetails?.groomSpouseLiving : null
  );
  const [groomMaritalstatusID, setGroomMaritalstatusID] = useState(
    formData?.GroomDetails?.groomMaritalstatusID ? formData?.GroomDetails?.groomMaritalstatusID : null
  );
  const [groomMiddlenameEn, setGroomMiddlenameEn] = useState(
    formData?.GroomDetails?.groomMiddlenameEn ? formData?.GroomDetails?.groomMiddlenameEn : ""
  );
  const [groomLastnameEn, setGroomLastnameEn] = useState(formData?.GroomDetails?.groomLastnameEn ? formData?.GroomDetails?.groomLastnameEn : "");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [groomMobile, setGroomMobile] = useState(formData?.GroomDetails?.groomMobile ? formData?.GroomDetails?.groomMobile : "");
  const [groomFirstnameEn, setGroomFirstnameEn] = useState(formData?.GroomDetails?.groomFirstnameEn ? formData?.GroomDetails?.groomFirstnameEn : "");
  const [groomFirstnameMal, setGroomFirstnameMal] = useState(
    formData?.GroomDetails?.groomFirstnameMal ? formData?.GroomDetails?.groomFirstnameMal : ""
  );
  const [groomMiddlenameMal, setGroomMiddlenameMal] = useState(
    formData?.GroomDetails?.groomMiddlenameMal ? formData?.GroomDetails?.groomMiddlenameMal : ""
  );
  const [groomLastnameMal, setGroomLastnameMal] = useState(formData?.GroomDetails?.groomLastnameMal ? formData?.GroomDetails?.groomLastnameMal : "");
  const [groomEmailid, setGroomEmailid] = useState(formData?.GroomDetails?.groomEmailid ? formData?.GroomDetails?.groomEmailid : "");
  const [groomAge, setGroomAge] = useState(formData?.GroomDetails?.groomAge ? formData?.GroomDetails?.groomAge : "");
  const [groomNoOfSpouse, setGroomNoOfSpouse] = useState(formData?.GroomDetails?.groomNoOfSpouse ? formData?.GroomDetails?.groomNoOfSpouse : "");
  const [selectedValueRadio, setSelectedValue] = useState(
    formData?.GroomDetails?.selectedValueRadio ? formData?.GroomDetails?.selectedValueRadio : ""
  );
  const [valueRad, setValueRad] = useState(formData?.GroomDetails?.selectedValueRadio ? formData?.GroomDetails?.selectedValueRadio : "");
  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();
  const cmbMaritalStatus = [
    { i18nKey: "Unmarried", code: "UNMARRIED" },
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Widowed", code: "WIDOWED" },
    { i18nKey: "Divorced", code: "DIVORCED" },
    { i18nKey: "Annulled", code: "ANNULLED" },
  ];

  const cmbSpouseLiving = [
    { i18nKey: "Yes", code: "YES" },
    { i18nKey: "No", code: "NO" },
  ];
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

  function setSelectGroomProfessionEn(value) {
    setGroomProfessionEn(value);
  }
  function setSelectGroomProfessionMal(value) {
    setGroomProfessionMal(value);
  }
  function setSelectGroomMaritalstatusID(value) {
    setGroomMaritalstatusID(value);
  }
  function setSelectGroomSpouseLiving(value) {
    setGroomSpouseLiving(value);
  }
  function setselectGroomGender(value) {
    selectGroomGender(value);
  }
  function setSelectGroomPassportNo(e) {
    setGroomPassportNo(e.target.value);
  }
  function setSelectGroomSocialSecurityNo(e) {
    setGroomSocialSecurityNo(e.target.value);
  }
  function setSelectGroomMobile(e) {
    if (e.target.value.trim().length != 0) {
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
    setGroomNoOfSpouse(e.target.value);
  }
  function setSelectGroomAge(e) {
    setGroomAge(e.target.value);
  }

  function setselectGroomDOB(value) {
    setGroomDOB(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setGroomDOB(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectGroomFirstnameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomFirstnameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectGroomLastnameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomLastnameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectGroomMiddlenameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomMiddlenameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectGroomLastnameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomLastnameMal(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectGroomMiddlenameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomMiddlenameMal(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectGroomFirstnameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomFirstnameMal(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }

  function setSelectGroomFathernameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomFathernameMal(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectGroomGuardiannameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomGuardiannameMal(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }

  function setSelectGroomFathernameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomFathernameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectGroomGuardiannameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomGuardiannameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectGroomMothernameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomMothernameMal(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectGroomMothernameEn(e) {
    GroomMothernameMal;
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setGroomMothernameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }

  function setSelectGroomAadharNo(e) {
    if (e.target.value.trim().length != 0) {
      setGroomAadharNo(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function setSelectGroomFatherAdharNo(e) {
    if (e.target.value.trim().length != 0) {
      setGroomFatherAdharNo(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function setSelectGroomGardianAdhar(e) {
    if (e.target.value.trim().length != 0) {
      setGroomGardianAdhar(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function setSelectGroomMotherAdharNo(e) {
    if (e.target.value.trim().length != 0) {
      setGroomMotherAdharNo(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }

  let validFlag = true;
  const goNext = () => {
    if (validFlag == true) {
      sessionStorage.setItem("groomDOB", groomDOB ? groomDOB : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);
      sessionStorage.setItem("groomGender", groomGender ? groomGender.code : null);
      sessionStorage.setItem("groomAdharNo", groomAdharNo ? groomAdharNo : null);
      sessionStorage.setItem("groomPassportNo", groomPassportNo ? groomPassportNo : null);
      sessionStorage.setItem("groomMotherAdharNo", groomMotherAdharNo ? groomMotherAdharNo : null);
      sessionStorage.setItem("groomFatherAdharNo", groomFatherAdharNo ? groomFatherAdharNo : null);
      sessionStorage.setItem("groomGardianAdhar", groomGardianAdhar ? groomGardianAdhar : null);
      sessionStorage.setItem("groomFirstnameEn", groomFirstnameEn ? groomFirstnameEn : null);
      sessionStorage.setItem("groomMiddlenameEn", groomMiddlenameEn ? groomMiddlenameEn : null);
      sessionStorage.setItem("groomLastnameEn", groomLastnameEn ? groomLastnameEn : null);
      sessionStorage.setItem("groomMobile", groomMobile ? groomMobile : null);
      sessionStorage.setItem("groomEmailid", groomEmailid ? groomEmailid : null);
      sessionStorage.setItem("groomFathernameEn", groomFathernameEn ? groomFathernameEn : null);
      sessionStorage.setItem("groomGuardiannameEn", groomGuardiannameEn ? groomGuardiannameEn : null);
      sessionStorage.setItem("groomFathernameMal", groomFathernameMal ? groomFathernameMal : null);
      sessionStorage.setItem("groomGuardiannameMal", groomGuardiannameMal ? groomGuardiannameMal : null);
      sessionStorage.setItem("groomMothernameEn", groomMothernameEn ? groomMothernameEn : null);
      sessionStorage.setItem("groomMothernameMal", groomMothernameMal ? groomMothernameMal : null);
      sessionStorage.setItem("groomSocialSecurityNo", groomSocialSecurityNo ? groomSocialSecurityNo : null);
      sessionStorage.setItem("groomAge", groomAge ? groomAge : null);
      sessionStorage.setItem("groomFirstnameMal", groomFirstnameMal ? groomFirstnameMal : null);
      sessionStorage.setItem("groomMiddlenameMal", groomMiddlenameMal ? groomMiddlenameMal : null);
      sessionStorage.setItem("groomLastnameMal", groomLastnameMal ? groomLastnameMal : null);
      sessionStorage.setItem("groomNoOfSpouse", groomNoOfSpouse ? groomNoOfSpouse : null);
      sessionStorage.setItem("groomSpouseLiving", groomSpouseLiving ? groomSpouseLiving : null);
      sessionStorage.setItem("groomMaritalstatusID", groomMaritalstatusID ? groomMaritalstatusID : null);
      sessionStorage.setItem("groomProfessionEn", groomProfessionEn ? groomProfessionEn.code : null);
      sessionStorage.setItem("groomProfessionMal", groomProfessionMal ? groomProfessionMal.code : null);
      onSelect(config.key, {
        groomDOB,
        groomAdharNo,
        groomGender,
        groomPassportNo,
        groomMotherAdharNo,
        groomFatherAdharNo,
        groomSocialSecurityNo,
        groomFirstnameEn,
        groomMiddlenameEn,
        groomLastnameEn,
        groomFathernameEn,
        groomFathernameMal,
        groomMothernameEn,
        groomMothernameMal,
        groomMobile,
        groomEmailid,
        groomAge,
        groomFirstnameMal,
        groomMiddlenameMal,
        groomLastnameMal,
        groomNoOfSpouse,
        groomSpouseLiving,
        groomMaritalstatusID,
        groomProfessionEn,
        groomProfessionMal,
        groomGardianAdhar,
        groomGuardiannameEn,
        groomGuardiannameMal,
      });
    }
  };
  if (isLoading || isProfessionLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t}>
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
                <div className="radiobuttons">
                  <LabelFieldPair style={{ display: "flex" }}>
                    <RadioButtons
                      t={t}
                      optionsKey="i18nKey"
                      options={rbmenu}
                      selectedOption={selectedValueRadio}
                      onSelect={selectRadioButtons}
                      style={{ marginTop: "15px", paddingLeft: "5px", height: "20px", display: "flex" }}
                    />
                  </LabelFieldPair>
                </div>
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
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_AADHAR_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="groomAdharNo"
                  value={groomAdharNo}
                  onChange={setSelectGroomAadharNo}
                  placeholder={`${t("CR_GROOM_AADHAR_NO")}`}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_PASSPORT_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomPassportNo"
                  value={groomPassportNo}
                  onChange={setSelectGroomPassportNo}
                  placeholder={`${t("CR_GROOM_PASSPORT_NO")}`}
                />
              </div>

              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_SOCIAL_SECURITY_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomSocialSecurityNo"
                  value={groomSocialSecurityNo}
                  onChange={setSelectGroomSocialSecurityNo}
                  placeholder={`${t("CR_GROOM_SOCIAL_SECURITY_NO")}`}
                />
              </div>
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
                  {t("CR_GROOM_NAME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_FIRST_NAME_EN")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomFirstnameEn"
                  value={groomFirstnameEn}
                  onChange={setSelectGroomFirstnameEn}
                  placeholder={`${t("CR_GROOM_FIRST_NAME_EN")}`}
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
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_MOBILE_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="groomMobile"
                  value={groomMobile}
                  onChange={setSelectGroomMobile}
                  placeholder={`${t("CR_GROOM_MOBILE_NO")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_FIRST_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomFirstnameMal"
                  value={groomFirstnameMal}
                  onChange={setSelectGroomFirstnameMal}
                  placeholder={`${t("CR_GROOM_FIRST_NAME_ML")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_MIDDLE_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomMiddlenameMal"
                  value={groomMiddlenameMal}
                  onChange={setSelectGroomMiddlenameMal}
                  placeholder={`${t("CR_GROOM_MIDDLE_NAME_ML")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_LAST_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomLastnameMal"
                  value={groomLastnameMal}
                  onChange={setSelectGroomLastnameMal}
                  placeholder={`${t("CR_GROOM_LAST_NAME_ML")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_EMAIL")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomEmailid"
                  value={groomEmailid}
                  onChange={setSelectGroomEmailid}
                  placeholder={`${t("CR_GROOM_EMAIL")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_GROOM_GENDER")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={groomGender}
                  select={setselectGroomGender}
                  placeholder={`${t("CR_GROOM_GENDER")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_GROOM_DATE_OF_BIRTH")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker date={groomDOB} name="groomDOB" onChange={setselectGroomDOB} placeholder={`${t("CR_GROOM_DATE_OF_BIRTH")}`} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_GROOM_AGE")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="groomAge"
                  value={groomAge}
                  onChange={setSelectGroomAge}
                  placeholder={`${t("CR_GROOMN_AGE")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{`${t("CR_GROOM_PROFESSION_EN")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbProfession}
                  selected={groomProfessionEn}
                  select={setSelectGroomProfessionEn}
                  placeholder={`${t("CR_GROOM_PROFESSION_EN")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_GROOM_PROFESSION_ML")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="namelocal"
                  isMandatory={false}
                  option={cmbProfession}
                  selected={groomProfessionMal}
                  select={setSelectGroomProfessionMal}
                  placeholder={`${t("CR_GROOM_PROFESSION_ML")}`}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_MARITAL_STATUS")}</CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbMaritalStatus}
                  selected={groomMaritalstatusID}
                  select={setSelectGroomMaritalstatusID}
                  placeholder={`${t("CR_GROOM_MARITAL_STATUS")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_ANY_SPOUSE_LIVING")}</CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbSpouseLiving}
                  selected={groomSpouseLiving}
                  select={setSelectGroomSpouseLiving}
                  placeholder={`${t("CR_ANY_SPOUSE_LIVING")}`}
                />
              </div>
              <div className="col-md-3">
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
                  {...(validation = { pattern: "^[0-9]{2}$", type: "number", isRequired: true, title: t("CR_INVALID_NUMBER_OF_SPOUSE_LIVING") })}
                />
              </div>
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
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_FATHER_AADHAR_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="groomFatherAdharNo"
                  value={groomFatherAdharNo}
                  onChange={setSelectGroomFatherAdharNo}
                  placeholder={`${t("CR_GROOM_FATHER_AADHAR_NO")}`}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_FATHER_NAME_EN")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomFathernameEn"
                  value={groomFathernameEn}
                  onChange={setSelectGroomFathernameEn}
                  placeholder={`${t("CR_GROOM_FATHER_NAME_EN")}`}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_FATHER_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomFathernameMal"
                  value={groomFathernameMal}
                  onChange={setSelectGroomFathernameMal}
                  placeholder={`${t("CR_GROOM_FATHER_NAME_ML")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_MOTHER_AADHAR_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="groomMotherAdharNo"
                  value={groomMotherAdharNo}
                  onChange={setSelectGroomMotherAdharNo}
                  placeholder={`${t("CR_GROOM_MOTHER_AADHAR_NO")}`}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_MOTHER_NAME_EN")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomMothernameEn"
                  value={groomMothernameEn}
                  onChange={setSelectGroomMothernameEn}
                  placeholder={`${t("CR_GROOM_MOTHER_NAME_EN")}`}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_MOTHER_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomMothernameMal"
                  value={groomMothernameMal}
                  onChange={setSelectGroomMothernameMal}
                  placeholder={`${t("CR_GROOM_MOTHER_NAME_ML")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>{t("CR_GROOM_GUARDIAN_AADHAR_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="groomGardianAdhar"
                  value={groomGardianAdhar}
                  onChange={setSelectGroomGardianAdhar}
                  placeholder={`${t("CR_GROOM_GUARDIAN_AADHAR_NO")}`}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_GUARDIAN_NAME_EN")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomGuardiannameEn"
                  value={groomGuardiannameEn}
                  onChange={setSelectGroomGuardiannameEn}
                  placeholder={`${t("CR_GROOM_GUARDIAN_NAME_EN")}`}
                />
              </div>
              <div className="col-md-3">
                {" "}
                <CardLabel>{t("CR_GROOM_GUARDIAN_NAME_ML")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="groomGuardiannameMal"
                  value={groomGuardiannameMal}
                  onChange={setSelectGroomGuardiannameMal}
                  placeholder={`${t("CR_GROOM_GUARDIAN_NAME_ML")}`}
                />
              </div>
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

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
};
export default GroomDetails;
