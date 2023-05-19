import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/BOBRTimeline";
import { useTranslation } from "react-i18next";

const BornOutsideParentsDetails = ({ config, onSelect, userType, formData, isEditBornOutsideIndia = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "Qualification"
  );
  const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "QualificationSub"
  );
  const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: ReligionList = {}, isReligionListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const [isInitialRender, setIsInitialRender] = useState(true);

  let cmbfilterNation = [];
  

  let cmbQualification = [];
  Qualification &&
    Qualification["birth-death-service"] &&
    Qualification["birth-death-service"].Qualification &&
    Qualification["birth-death-service"].Qualification.map((ob) => {
      cmbQualification.push(ob);
    });
  let cmbQualificationSub = [];
  QualificationSub &&
    QualificationSub["birth-death-service"] &&
    QualificationSub["birth-death-service"].QualificationSub &&
    QualificationSub["birth-death-service"].QualificationSub.map((ob) => {
      cmbQualificationSub.push(ob);
    });
  let cmbProfession = [];
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbProfession.push(ob);
    });

  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });

  let cmbReligion = [];
  ReligionList &&
    ReligionList["common-masters"] &&
    ReligionList["common-masters"].Religion &&
    ReligionList["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  const [motherFirstNameEn, setMotherFirstNameEn] = useState(
    formData?.BornOutsideParentsDetails?.motherFirstNameEn ? formData?.BornOutsideParentsDetails?.motherFirstNameEn : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherFirstNameEn ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherFirstNameEn : "");

  const [motherFirstNameMl, setMotherFirstNameMl] = useState(
    formData?.BornOutsideParentsDetails?.motherFirstNameMl ? formData?.BornOutsideParentsDetails?.motherFirstNameMl : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherFirstNameMl ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherFirstNameMl : "");

  const [motherPassportNo, setmotherPassportNo] = useState(
    formData?.BornOutsideParentsDetails?.motherPassportNo ? formData?.BornOutsideParentsDetails?.motherPassportNo : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherPassportNo ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherPassportNo : "");
  
  const [motherMarriageAge, setMotherMarriageAge] = useState(
    formData?.BornOutsideParentsDetails?.motherMarriageAge ? formData?.BornOutsideParentsDetails?.motherMarriageAge : ""
  );
  // const [motherEmail, setMotherEmail] = useState(
  //   formData?.BornOutsideParentsDetails?.motherEmail ? formData?.BornOutsideParentsDetails?.motherEmail : ""
  // );
  const [motherMarriageBirth, setMotherMarriageBirth] = useState(formData?.BornOutsideParentsDetails?.motherMarriageBirth ? formData?.BornOutsideParentsDetails?.motherMarriageBirth :
    formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherMarriageBirth ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherMarriageBirth : "");

  const [motherEducation, setMotherEducation] = useState(formData?.BornOutsideParentsDetails?.motherEducation?.code ? formData?.BornOutsideParentsDetails?.motherEducation : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherEducation ?
    (cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherEducation)[0]) : "");

  const [motherProfession, setMotherProfession] =  useState(formData?.BornOutsideParentsDetails?.motherProfession?.code ? formData?.BornOutsideParentsDetails?.motherProfession : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherProfession ?
    (cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherProfession)[0]) : "");

  const [motherNationality, setMotherNationality] = useState(formData?.BornOutsideParentsDetails?.motherNationality?.code ? formData?.BornOutsideParentsDetails?.motherNationality : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherNationality ?
    (cmbNation.filter(cmbNation => cmbNation.code === formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.motherNationality)[0]) : "");

  const [ismotherInfo, setIsmotherInfo] = useState(false);

  const [isfatherInfo, setIsfatherInfo] = useState(false);
  
  const [toast, setToast] = useState(false);

  const [MotherMarriageageError, setMotherMarriageageError] = useState(formData?.BornOutsideParentsDetails?.motherMarriageAge ? false : false);
  const [MotherEducationError, setMotherEducationError] = useState(formData?.BornOutsideParentsDetails?.motherEducation ? false : false);
  const [MotherProfessionError, setMotherProfessionError] = useState(formData?.BornOutsideParentsDetails?.motherProfession ? false : false);
  const [MotherNationalityError, setMotherNationalityError] = useState(formData?.BornOutsideParentsDetails?.motherNationality ? false : false);

  const [fatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.BornOutsideParentsDetails?.fatherFirstNameEn ? formData?.BornOutsideParentsDetails?.fatherFirstNameEn :
    formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherFirstNameEn ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherFirstNameEn : "");

  const [fatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.BornOutsideParentsDetails?.fatherFirstNameMl ? formData?.BornOutsideParentsDetails?.fatherFirstNameMl :
    formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherFirstNameMl ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherFirstNameMl : "");

  const [fatherNationality, setFatherNationality] = useState(formData?.BornOutsideParentsDetails?.fatherNationality?.code ? formData?.BornOutsideParentsDetails?.fatherNationality : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherNationality ?
    (cmbNation.filter(cmbNation => cmbNation.code === formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherNationality)[0]) : "");

  const [fatherPassportNo, setfatherPassportNo] = useState(
    formData?.BornOutsideParentsDetails?.fatherPassportNo ? formData?.BornOutsideParentsDetails?.fatherPassportNo : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherPassportNo ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherPassportNo : "");

  const [fatherEducation, setFatherEducation] = useState(formData?.BornOutsideParentsDetails?.fatherEducation?.code ? formData?.BornOutsideParentsDetails?.fatherEducation : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherEducation ?
    (cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherEducation)[0]) : "");

  const [fatherProfession, setFatherProfession] = useState(formData?.BornOutsideParentsDetails?.fatherProfession?.code ? formData?.BornOutsideParentsDetails?.fatherProfession : 
    formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherProfession ?
    (cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherProfession)[0]) : "");

  const [Religion, setReligion] = useState(formData?.BornOutsideParentsDetails?.Religion?.code ? formData?.BornOutsideParentsDetails?.Religion : formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.Religion ?
    (cmbReligion.filter(cmbReligion => cmbReligion.code === formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.Religion)[0]) : "");

  const [fatherEmail, setFatherEmail] = useState(formData?.BornOutsideParentsDetails?.fatherEmail ? formData?.BornOutsideParentsDetails?.fatherEmail :
    formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherEmail ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherEmail : "");

  const [fatherMobile, setFatherMobile] = useState(formData?.BornOutsideParentsDetails?.fatherMobile ? formData?.BornOutsideParentsDetails?.fatherMobile :
    formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherMobile ? formData?.BornOutsideChildDetails?.BornOutsideParentsDetails?.fatherMobile : "");

  const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.BornOutsideParentsDetails?.fatherFirstNameEn ? false : false);
  const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.BornOutsideParentsDetails?.fatherFirstNameMl ? false : false);
  const [FatherMobileError, setFatherMobileError] = useState(formData?.BornOutsideParentsDetails?.fatherAadhar ? false : false);
  const [FatherEduError, setFatherEduError] = useState(formData?.BornOutsideParentsDetails?.fatherEducation ? false : false);
  const [FatherProfError, setFatherProfError] = useState(formData?.BornOutsideParentsDetails?.fatherProfession ? false : false);
  const [ReligionError, setReligionError] = useState(formData?.BornOutsideParentsDetails?.Religion ? false : false);
  

  const onSkip = () => onSelect();

  useEffect(() => {
    if (stateId === "kl" && cmbNation.length > 0) {
      cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
      setFatherNationality(cmbfilterNation[0]);
      setMotherNationality(cmbfilterNation[0]);
    }
  }, [Nation]);

  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMotherFirstNameEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectMotherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern)) && e.target.value.trim() !== " ") {
      e.preventDefault();
      setMotherFirstNameMl('');
    }
    else {
      setMotherFirstNameMl(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setCheckSpecialCharSpace(e) {
    let pattern = /^[a-zA-Z-.`' ]*$/;
    if (!(e.key.match(pattern)) && e.code === 'Space') {
      e.preventDefault();
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setSelectPassportNo(e) {
    if (e.target.value.trim().length >= 0) {
      setmotherPassportNo(
        e.target.value.length <= 8
          ? e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "")
          : e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "").substring(0, 8)
      );
    }
  }
  function setSelectfatherPassportNo(e) {
    if (e.target.value.trim().length >= 0) {
      setfatherPassportNo(
        e.target.value.length <= 8
          ? e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "")
          : e.target.value.replace("[A-PR-WY][1-9]ds?d{4}[1-9]$", "").substring(0, 8)
      );
    }
  }

  function setSelectFatherMobile(e) {
    if (e.target.value != null || e.target.value != "") {
    if (e.target.value.trim().length != 0) {
      setFatherMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
  }
  function setSelectFatherEmail(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherEmail(e.target.value);
    }
  }

  function setSelectMotherMarriageAge(e) {
    if (e.target.value.trim().length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherMarriageAge(e.target.value);
    }
  }

  function setSelectMotherMarriageBirth(e) {
    if (e.target.value.trim().length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherMarriageBirth(e.target.value);
    }
  }
  function setSelectMotherEducation(value) {
    setMotherEducation(value);
  }

  function setSelectMotherProfession(value) {
    setMotherProfession(value);
  }
  function setSelectLBType(value) {
    setLBTypeName(value);
  }
  function setSelectStateName(value) {
    setStateName(value);
  }
  

  function setSelectMotherNationality(value) {
    setMotherNationality(value);
  }

  function setSelectReligion(value) {
    setReligion(value);
  }

  function setSelectFatherNationality(value) {
    setFatherNationality(value);
  }
  function setSelectFatherEducation(value) {
    setFatherEducation(value);
  }

  function setSelectFatherProfession(value) {
    setFatherProfession(value);
  }

  function setSelectFatherFirstNameEn(e) {
    if (e.target.value.trim().length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherFirstNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectFatherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setFatherFirstNameMl('');
    }
    else {
      setFatherFirstNameMl(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  
  let validFlag = true;
  const goNext = () => {
    if (motherEducation == null || motherEducation == "" || motherEducation == undefined) {
      validFlag = false;
      setMotherEducationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMotherEducationError(false);
    }
    if (motherProfession == null || motherProfession == "" || motherProfession == undefined) {
      validFlag = false;
      setMotherProfessionError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMotherProfessionError(false);
    }

    if (motherMarriageAge == null || motherMarriageAge == "" || motherMarriageAge == undefined) {
      if (MotherMarriageageError) {
        validFlag = false;
        setMotherMarriageageError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMotherMarriageageError(false);
      }
    }

    if (fatherEducation == null || fatherEducation == "" || fatherEducation == undefined) {
      validFlag = false;
      setFatherEduError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setFatherEduError(false);
    }
    if (fatherProfession == null || fatherProfession == "" || fatherProfession == undefined) {
      validFlag = false;
      setFatherProfError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setFatherProfError(false);
    }

    if (fatherMobile != null || fatherMobile != "" || fatherMobile != undefined) {
      let mobileLength = fatherMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setFatherMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setFatherMobileError(false);
      }
    } else {
      validFlag = false;
      setFatherMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (Religion != null || Religion != "" || Religion != undefined) {
      if (ReligionError) {
        validFlag = false;
        setReligionError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setReligionError(false);
      }
    }

    if (validFlag == true) {
      // sessionStorage.setItem("motherFirstNameEn", motherFirstNameEn ? motherFirstNameEn : null);
      // sessionStorage.setItem("motherFirstNameMl", motherFirstNameMl ? motherFirstNameMl : null);
      // sessionStorage.setItem("motherPassportNo", motherPassportNo ? motherPassportNo : null);
      // sessionStorage.setItem("motherMarriageAge", motherMarriageAge ? motherMarriageAge : null);
      // sessionStorage.setItem("motherMarriageBirth", motherMarriageBirth ? motherMarriageBirth : null);
      // sessionStorage.setItem("motherEducation", motherEducation ? motherEducation.code : null);
      // sessionStorage.setItem("motherProfession", motherProfession ? motherProfession.code : null);
      // sessionStorage.setItem("motherNationality", motherNationality ? motherNationality.code : null);

      // sessionStorage.setItem("fatherFirstNameEn", fatherFirstNameEn ? fatherFirstNameEn : null);
      // sessionStorage.setItem("fatherFirstNameMl", fatherFirstNameMl ? fatherFirstNameMl : null);
      // sessionStorage.setItem("fatherPassportNo", fatherPassportNo ? fatherPassportNo : null);
      // sessionStorage.setItem("fatherNationality", fatherNationality ? fatherNationality.code : null);
      // sessionStorage.setItem("fatherEducation", fatherEducation ? fatherEducation.code : null);
      // sessionStorage.setItem("fatherProfession", fatherProfession ? fatherProfession.code : null);
      // sessionStorage.setItem("Religion", Religion ? Religion.code : null);
      // sessionStorage.setItem("fatherEmail", fatherEmail ? fatherEmail : null);
      // sessionStorage.setItem("fatherMobile", fatherMobile ? fatherMobile : null);

      onSelect(config.key, {
        motherFirstNameEn : motherFirstNameEn.trim(),
        motherFirstNameMl: motherFirstNameMl.trim(),
        motherPassportNo,

        motherMarriageAge,
        motherMarriageBirth,
        motherEducation,
        motherProfession,
        motherNationality,
        ismotherInfo,

        fatherFirstNameEn: fatherFirstNameEn.trim(),
        fatherFirstNameMl: fatherFirstNameMl.trim(),

        fatherNationality,
        fatherPassportNo,
        fatherEducation,
        fatherProfession,
        isfatherInfo,
        Religion,
        fatherMobile,
        fatherEmail,
      });
    }
  };

  if (isReligionListLoading || isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isCountryLoading || isNationLoad) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}

        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_MOTHER_NAME_EN")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="motherFirstNameEn"
                    value={motherFirstNameEn}
                    onChange={setSelectMotherFirstNameEn}
                    onKeyPress={setCheckSpecialCharSpace}
                    // disable={isMotherInfo}
                    placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })}
                  />
                </div>

                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_MOTHER_NAME_ML")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="motherFirstNameMl"
                    value={motherFirstNameMl}
                    onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectMotherFirstNameMl}
                    // disable={isMotherInfo}
                    placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_MOTHER_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  {" "}
                  <CardLabel>{`${t("CR_PASSPORT_NO")}`}
                  <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="motherPassportNo"
                    value={motherPassportNo}
                    onChange={setSelectPassportNo}
                    //disable={isFatherInfo}
                    placeholder={`${t("CR_PASSPORT_NO")}`}
                    style={{ textTransform: "uppercase" }}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_PASSPORT_NO") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_NATIONALITY")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="nationalityname"
                    isMandatory={false}
                    option={cmbNation}
                    selected={motherNationality}
                    select={setSelectMotherNationality}
                    // disabled={isMotherInfo}
                    placeholder={`${t("CR_NATIONALITY")}`}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_FATHER_NAME_EN")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="fatherFirstNameEn"
                    value={fatherFirstNameEn}
                    onChange={setSelectFatherFirstNameEn}
                    // disable={isFatherInfo}
                    placeholder={`${t("CR_FATHER_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })}
                  />
                </div>

                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_FATHER_NAME_ML")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="fatherFirstNameMl"
                    value={fatherFirstNameMl}
                    onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectFatherFirstNameMl}
                    // disable={isFatherInfo}
                    placeholder={`${t("CR_FATHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_FATHER_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  {" "}
                  <CardLabel>{`${t("CR_PASSPORT_NO")}`}
                  <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="fatherPassportNo"
                    value={fatherPassportNo}
                    onChange={setSelectfatherPassportNo}
                    // disable={isFatherInfo}
                    placeholder={`${t("CR_PASSPORT_NO")}`}
                    style={{ textTransform: "uppercase" }}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_PASSPORT_NO") })}
                  />
                </div>
                <div className="col-md-3">
                  {/* <span className="mandatorycss">*</span> */}
                  <CardLabel>
                    {`${t("CR_NATIONALITY")}`} 
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="nationalityname"
                    isMandatory={false}
                    option={cmbNation}
                    selected={fatherNationality}
                    select={setSelectFatherNationality}
                    // disable={isFatherInfo}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <div className="col-md-8">
                  <CardLabel>
                    {`${t("CR_MOTHER_AGE_MARRIAGE")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="motherMarriageAge"
                    value={motherMarriageAge}
                    onChange={setSelectMotherMarriageAge}
                    // disable={isMotherInfo}
                    placeholder={`${t("CR_MOTHER_AGE_MARRIAGE")}`}
                    {...(validation = { pattern: "^[0-9]{3}$", type: "number", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_MARRIAGE") })}
                  />
                </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                <div className="col-md-8">
                  <CardLabel>
                    {`${t("CR_MOTHER_AGE_BIRTH")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="motherMarriageBirth"
                    value={motherMarriageBirth}
                    onChange={setSelectMotherMarriageBirth}
                    // disable={isMotherInfo}
                    placeholder={`${t("CR_MOTHER_AGE_BIRTH")}`}
                    {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_BIRTH") })}
                  />
                </div>
                </div>
              </div>

            <div className="row">
              <div className="col-md-12">
              <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_MOTHER_EDUCATION")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbQualification}
                    selected={motherEducation}
                    select={setSelectMotherEducation}
                    // disabled={isMotherInfo}
                    placeholder={`${t("CR_MOTHER_EDUCATION")}`}
                  />
                  </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_MOTHER_PROFESSIONAL")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbProfession}
                    selected={motherProfession}
                    select={setSelectMotherProfession}
                    // disabled={isMotherInfo}
                    placeholder={`${t("CR_MOTHER_PROFESSIONAL")}`}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_FATHER_EDUCATION")}`} 
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbQualification}
                    selected={fatherEducation}
                    select={setSelectFatherEducation}
                    // disable={isFatherInfo}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_FATHER_PROFESSIONAL")}`} 
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbProfession}
                    selected={fatherProfession}
                    select={setSelectFatherProfession}
                    // disable={isFatherInfo}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CS_COMMON_RELIGION")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbReligion}
                    selected={Religion}
                    select={setSelectReligion}
                    placeholder={`${t("CS_COMMON_RELIGION")}`}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_PARENTS_CONTACT_NO")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="fatherMobile"
                    value={fatherMobile}
                    onChange={setSelectFatherMobile}
                    // disable={isFatherInfo}
                    placeholder={`${t("CR_PARENTS_CONTACT_NO")}`}
                    {...(validation = { pattern: "^[0-9 ]*$", type: "text", isRequired: true, title: t("CR_INVALID_PARENTS_CONTACT_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_PARENTS_EMAIL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="email"
                    optionKey="i18nKey"
                    name="fatherEmail"
                    value={fatherEmail}
                    onChange={setSelectFatherEmail}
                    // disable={isFatherInfo}
                    placeholder={`${t("CR_PARENTS_EMAIL")}`}
                    {...(validation = { isRequired: false, title: t("CR_INVALID_PARENTS_EMAIL") })}
                  />
                </div>
              </div>
            </div>
          </div>

          {toast && (
            <Toast
              error={
                MotherMarriageageError ||
                MotherEducationError ||
                MotherProfessionError ||
                MotherNationalityError ||
                FatherFirstNmeEnError ||
                FatherEduError ||
                FatherProfError ||
                FatherMobileError ||
                ReligionError
              }
              label={
                MotherMarriageageError ||
                MotherEducationError ||
                MotherProfessionError ||
                MotherNationalityError ||
                FatherFirstNmeEnError ||
                FatherEduError ||
                FatherProfError ||
                FatherMobileError ||
                ReligionError
                  ? MotherMarriageageError
                    ? t(`CR_INVALID_MOTHER_AGE_AT_MARRIAGE`)
                    : MotherEducationError
                    ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                    : MotherProfessionError
                    ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`)
                    : MotherNationalityError
                    ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`)
                    : FatherFirstNmeEnError
                    ? t(`CR_INVALID_FATHER_NAME_EN`)
                    : FatherEduError
                    ? t(`BIRTH_ERROR_FATHER_EDUCATION_CHOOSE`)
                    : FatherProfError
                    ? t(`BIRTH_ERROR_FATHER_PROFESSION_CHOOSE`)
                    : ReligionError
                    ? t(`BIRTH_ERROR_RELIGION_CHOOSE`)
                    : FatherMobileError
                    ? t(`CR_INVALID_MOBILE_NO`)
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
};
export default BornOutsideParentsDetails;
