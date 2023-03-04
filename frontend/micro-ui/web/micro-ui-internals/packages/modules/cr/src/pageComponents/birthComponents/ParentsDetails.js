import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const ParentsDetails = ({ config, onSelect, userType, formData, isEditBirth, isEditBirthPageComponents }) => {
  // console.log(JSON.stringify(formData));
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
  const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
  const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: ReligionList = {}, isReligionListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : false);
  let cmbfilterNation = [];
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];

  let cmbQualification = [];
  Qualification &&
    Qualification["birth-death-service"] && Qualification["birth-death-service"].Qualification &&
    Qualification["birth-death-service"].Qualification.map((ob) => {
      cmbQualification.push(ob);
    });
  let cmbQualificationSub = [];
  QualificationSub &&
    QualificationSub["birth-death-service"] && QualificationSub["birth-death-service"].QualificationSub &&
    QualificationSub["birth-death-service"].QualificationSub.map((ob) => {
      cmbQualificationSub.push(ob);
    });
  let cmbProfession = [];
  Profession &&
    Profession["birth-death-service"] && Profession["birth-death-service"].Profession &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbProfession.push(ob);
    });

  let cmbCountry = [];
  Country &&
    Country["common-masters"] && Country["common-masters"].Country &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] && Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });

  let cmbReligion = [];
  ReligionList &&
    ReligionList["common-masters"] && ReligionList["common-masters"].Religion &&
    ReligionList["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  const [isMotherInfo, setIsMotherInfo] = useState(formData?.ParentsDetails?.isMotherInfo ? formData?.ParentsDetails?.isMotherInfo :
    formData?.ChildDetails?.ParentsDetails?.isMotherInfo ? formData?.ChildDetails?.ParentsDetails?.isMotherInfo : false);
  const [motherAadhar, setMotherAadhar] = useState(formData?.ParentsDetails?.motherAadhar ? formData?.ParentsDetails?.motherAadhar :
    formData?.ChildDetails?.ParentsDetails?.motherAadhar ? formData?.ChildDetails?.ParentsDetails?.motherAadhar : "");
  const [motherFirstNameEn, setMotherFirstNameEn] = useState(formData?.ParentsDetails?.motherFirstNameEn ? formData?.ParentsDetails?.motherFirstNameEn :
    formData?.ChildDetails?.ParentsDetails?.motherFirstNameEn ? formData?.ChildDetails?.ParentsDetails?.motherFirstNameEn : "");
  const [motherFirstNameMl, setMotherFirstNameMl] = useState(formData?.ParentsDetails?.motherFirstNameMl ? formData?.ParentsDetails?.motherFirstNameMl :
    formData?.ChildDetails?.ParentsDetails?.motherFirstNameMl ? formData?.ChildDetails?.ParentsDetails?.motherFirstNameMl : "");
  const [motherNationality, setMotherNationality] = useState(formData?.ParentsDetails?.motherNationality?.code ? formData?.ParentsDetails?.motherNationality : formData?.ChildDetails?.ParentsDetails?.motherNationality ?
    (cmbNation.filter(cmbNation => cmbNation.code === formData?.ChildDetails?.ParentsDetails?.motherNationality)[0]) : "");
  const [motherMaritalStatus, setMotherMaritalStatus] = useState(formData?.ParentsDetails?.motherMaritalStatus?.code ? formData?.ParentsDetails?.motherMaritalStatus : formData?.ChildDetails?.ParentsDetails?.motherMaritalStatus ?
    (cmbMaritalStatus.filter(cmbMaritalStatus => cmbMaritalStatus.code === formData?.ChildDetails?.ParentsDetails?.motherMaritalStatus)[0]) : "");
  const [motherMarriageAge, setMotherMarriageAge] = useState(formData?.ParentsDetails?.motherMarriageAge ? formData?.ParentsDetails?.motherMarriageAge :
    formData?.ChildDetails?.ParentsDetails?.motherMarriageAge ? formData?.ChildDetails?.ParentsDetails?.motherMarriageAge : "");
  const [motherMarriageBirth, setMotherMarriageBirth] = useState(formData?.ParentsDetails?.motherMarriageBirth ? formData?.ParentsDetails?.motherMarriageBirth :
    formData?.ChildDetails?.ParentsDetails?.motherMarriageBirth ? formData?.ChildDetails?.ParentsDetails?.motherMarriageBirth : "");
  const [orderofChildren, setOrderofChildren] = useState(formData?.ParentsDetails?.orderofChildren ? formData?.ParentsDetails?.orderofChildren :
    formData?.ChildDetails?.ParentsDetails?.orderofChildren ? formData?.ChildDetails?.ParentsDetails?.orderofChildren : "");
  const [motherEducation, setMotherEducation] = useState(formData?.ParentsDetails?.motherEducation?.code ? formData?.ParentsDetails?.motherEducation : formData?.ChildDetails?.ParentsDetails?.motherEducation ?
    (cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.ChildDetails?.ParentsDetails?.motherEducation)[0]) : "");
  const [motherProfession, setMotherProfession] = useState(formData?.ParentsDetails?.motherProfession?.code ? formData?.ParentsDetails?.motherProfession : formData?.ChildDetails?.ParentsDetails?.motherProfession ?
    (cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.ChildDetails?.ParentsDetails?.motherProfession)[0]) : "");

  const [isFatherInfo, setIsFatherInfo] = useState(formData?.ParentsDetails?.isFatherInfo ? formData?.ParentsDetails?.isFatherInfo :
    formData?.ChildDetails?.ParentsDetails?.isFatherInfo ? formData?.ChildDetails?.ParentsDetails?.isFatherInfo : false);
  const [fatherAadhar, setFatherAadhar] = useState(formData?.ParentsDetails?.fatherAadhar ? formData?.ParentsDetails?.fatherAadhar :
    formData?.ChildDetails?.ParentsDetails?.fatherAadhar ? formData?.ChildDetails?.ParentsDetails?.fatherAadhar : "");
  const [fatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.ParentsDetails?.fatherFirstNameEn ? formData?.ParentsDetails?.fatherFirstNameEn :
    formData?.ChildDetails?.ParentsDetails?.fatherFirstNameEn ? formData?.ChildDetails?.ParentsDetails?.fatherFirstNameEn : "");
  const [fatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.ParentsDetails?.fatherFirstNameMl ? formData?.ParentsDetails?.fatherFirstNameMl :
    formData?.ChildDetails?.ParentsDetails?.fatherFirstNameMl ? formData?.ChildDetails?.ParentsDetails?.fatherFirstNameMl : "");
  const [fatherNationality, setFatherNationality] = useState(formData?.ParentsDetails?.fatherNationality?.code ? formData?.ParentsDetails?.fatherNationality : formData?.ChildDetails?.ParentsDetails?.fatherNationality ?
    (cmbNation.filter(cmbNation => cmbNation.code === formData?.ChildDetails?.ParentsDetails?.fatherNationality)[0]) : "");
  const [fatherEducation, setFatherEducation] = useState(formData?.ParentsDetails?.fatherEducation?.code ? formData?.ParentsDetails?.fatherEducation : formData?.ChildDetails?.ParentsDetails?.fatherEducation ?
    (cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.ChildDetails?.ParentsDetails?.fatherEducation)[0]) : "");
  const [fatherProfession, setFatherProfession] = useState(formData?.ParentsDetails?.fatherProfession?.code ? formData?.ParentsDetails?.fatherProfession : formData?.ChildDetails?.ParentsDetails?.fatherProfession ?
    (cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.ChildDetails?.ParentsDetails?.fatherProfession)[0]) : "");
  const [Religion, setReligion] = useState(formData?.ParentsDetails?.Religion?.code ? formData?.ParentsDetails?.Religion : formData?.ChildDetails?.ParentsDetails?.Religion ?
    (cmbReligion.filter(cmbReligion => cmbReligion.code === formData?.ChildDetails?.ParentsDetails?.Religion)[0]) : "");
  const [fatherEmail, setFatherEmail] = useState(formData?.ParentsDetails?.fatherEmail ? formData?.ParentsDetails?.fatherEmail :
    formData?.ChildDetails?.ParentsDetails?.fatherEmail ? formData?.ChildDetails?.ParentsDetails?.fatherEmail : "");
  const [fatherMobile, setFatherMobile] = useState(formData?.ParentsDetails?.fatherMobile ? formData?.ParentsDetails?.fatherMobile :
    formData?.ChildDetails?.ParentsDetails?.fatherMobile ? formData?.ChildDetails?.ParentsDetails?.fatherMobile : "");
  // const [motherFirstNameEn, setMotherFirstNameEn] = useState(isEditBirth ? formData?.ChildDetails?.ParentsDetails?.motherFirstNameEn ? formData?.ParentsDetails?.motherFirstNameEn : "");
  // const [motherFirstNameMl, setMotherFirstNameMl] = useState(formData?.ParentsDetails?.motherFirstNameMl ? formData?.ParentsDetails?.motherFirstNameMl : "");
  // const [motherAadhar, setMotherAadhar] = useState(formData?.ParentsDetails?.motherAadhar ? formData?.ParentsDetails?.motherAadhar : "");
  // const [motherMarriageAge, setMotherMarriageAge] = useState(formData?.ParentsDetails?.motherMarriageAge ? formData?.ParentsDetails?.motherMarriageAge : "");
  // const [motherEmail, setMotherEmail] = useState(formData?.ParentsDetails?.motherEmail ? formData?.ParentsDetails?.motherEmail : "");
  // const [motherMarriageBirth, setMotherMarriageBirth] = useState(formData?.ParentsDetails?.motherMarriageBirth ? formData?.ParentsDetails?.motherMarriageBirth : "");
  // const [motherEducation, setMotherEducation] = useState(formData?.ParentsDetails?.motherEducation ? formData?.ParentsDetails?.motherEducation : null);
  // const [motherProfession, setMotherProfession] = useState(formData?.ParentsDetails?.motherProfession ? formData?.ParentsDetails?.motherProfession : null);
  // const [MotherAgeMarriage, setMotherAgeMarriage] = useState(formData?.ParentsDetails?.MotherAgeMarriage ? formData?.ParentsDetails?.MotherAgeMarriage : "");
  // const [orderofChildren, setOrderofChildren] = useState(formData?.ParentsDetails?.orderofChildren ? formData?.ParentsDetails?.orderofChildren : "");
  // const [motherNationality, setMotherNationality] = useState(formData?.ParentsDetails?.motherNationality ? formData?.ParentsDetails?.motherNationality : null);
  // const [motherMaritalStatus, setMotherMaritalStatus] = useState(formData?.ParentsDetails?.motherMaritalStatus ? formData?.ParentsDetails?.motherMaritalStatus : null);

  // const [isFatherInfo, setIsFatherInfo] = useState(formData?.ParentsDetails?.isFatherInfo ? formData?.ParentsDetails?.isFatherInfo : false);
  // const [fatherAadhar, setFatherAadhar] = useState(formData?.ParentsDetails?.fatherAadhar ? formData?.ParentsDetails?.fatherAadhar : "");
  // const [fatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.ParentsDetails?.fatherFirstNameEn ? formData?.ParentsDetails?.fatherFirstNameEn : "");
  // const [fatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.ParentsDetails?.fatherFirstNameMl ? formData?.ParentsDetails?.fatherFirstNameMl : "");
  // const [fatherNationality, setFatherNationality] = useState(formData?.ParentsDetails?.fatherNationality ? formData?.ParentsDetails?.fatherNationality : null);
  // const [fatherEducation, setFatherEducation] = useState(formData?.ParentsDetails?.fatherEducation ? formData?.ParentsDetails?.fatherEducation : null);
  // const [fatherProfession, setFatherProfession] = useState(formData?.ParentsDetails?.fatherProfession ? formData?.ParentsDetails?.fatherProfession : null);

  // const [Religion, setReligion] = useState(formData?.ParentsDetails?.Religion ? formData?.ParentsDetails?.Religion : null);
  // const [fatherEmail, setFatherEmail] = useState(formData?.ParentsDetails?.fatherEmail ? formData?.ParentsDetails?.fatherEmail : "");
  // const [fatherMobile, setFatherMobile] = useState(formData?.ParentsDetails?.fatherMobile ? formData?.ParentsDetails?.fatherMobile : "");

  const [toast, setToast] = useState(false);
  const [MotherAadharError, setMotherAadharError] = useState(formData?.ParentsDetails?.motherAadhar ? false : false);
  const [MotherMarriageageError, setMotherMarriageageError] = useState(formData?.ParentsDetails?.motherMarriageAge ? false : false);
  const [MotherEducationError, setMotherEducationError] = useState(formData?.ParentsDetails?.motherEducation ? false : false);
  const [MotherProfessionError, setMotherProfessionError] = useState(formData?.ParentsDetails?.motherProfession ? false : false);
  const [MotherNationalityError, setMotherNationalityError] = useState(formData?.ParentsDetails?.motherNationality ? false : false);
  const [FatherAadharError, setFatherAadharError] = useState(formData?.ParentsDetails?.fatherAadhar ? false : false);
  const [OrderofChildrenError, setOrderofChildrenError] = useState(formData?.ParentsDetails?.orderofChildren ? false : false);
  const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.ParentsDetails?.fatherFirstNameEn ? false : false);
  const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.ParentsDetails?.fatherFirstNameMl ? false : false);
  const [FatherMobileError, setFatherMobileError] = useState(formData?.ParentsDetails?.fatherAadhar ? false : false);
  const [FatherEduError, setFatherEduError] = useState(formData?.ParentsDetails?.fatherEducation ? false : false);
  const [FatherProfError, setFatherProfError] = useState(formData?.ParentsDetails?.fatherProfession ? false : false);
  const [ReligionError, setReligionError] = useState(formData?.ParentsDetails?.Religion ? false : false);
  const [MotherMaritalStatusError, setMotherMaritalStatusError] = useState(formData?.ParentsDetails?.motherMaritalStatus ? false : false);
  const [ageMariageStatusHide, setAgeMariageStatus] = useState(formData?.ParentsDetails?.motherMaritalStatus ? formData?.ParentsDetails?.motherMaritalStatus : null);


  const onSkip = () => onSelect();

  useEffect(() => {
    if (stateId === "kl" && cmbNation.length > 0) {
      cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
      setFatherNationality(cmbfilterNation[0]);
      setMotherNationality(cmbfilterNation[0]);
    }
  }, [Nation]);


  useEffect(() => {
    if (isInitialRender) {
      if (formData?.ParentsDetails?.ismotherInfo != null) {
        setIsInitialRender(false);
        setIsMotherInfo(formData?.ParentsDetails?.ismotherInfo);
      }
    }

    if (formData?.ParentsDetails?.isfatherInfo != null) {
      setIsInitialRender(false);
      setIsfatherInfo(formData?.ParentsDetails?.isfatherInfo);
    }

  }, [isInitialRender]);


  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''['  0-9]/gi, ""));
    }
  }

  function setSelectMotherFirstNameMl(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherFirstNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectMotherAadhar(e) {
    setMotherAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setMotherAadharError(true);
        return false;
      } else if (e.target.value.length < 12) {
        setMotherAadharError(true);
        setMotherAadhar(e.target.value);
        return false;
      } else {
        setMotherAadharError(false);
        setMotherAadhar(e.target.value);
        return true;
      }
    } else {
      setMotherAadharError(false);
      setMotherAadhar(e.target.value);
      return true;
    }
  }


  function setSelectFatherAadhar(e) {
    setFatherAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setFatherAadharError(true);
        return false;
      } else if (e.target.value.length < 12) {
        setFatherAadharError(true);
        setFatherAadhar(e.target.value);
        return false;
      } else {
        setFatherAadharError(false);
        setFatherAadhar(e.target.value);
        return true;
      }
    } else {
      setFatherAadharError(false);
      setFatherAadhar(e.target.value);
      return true;
    }
  }


  function setSelectFatherMobile(e) {
    if (e.target.value.trim().length != 0) {
      setFatherMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
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

  // function setSelectMotherMarriageAge(e) {
  //   if (e.target.value.trim().length === 2) {
  //     setMotherMarriageAge(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  //   }
  // }

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
  function setSelectMotherMaritalStatus(value) {
    setMotherMaritalStatus(value);
    setAgeMariageStatus(value.code);

  }
  function setSelectOrderofChildren(e) {
    if (e.target.value.trim().length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setOrderofChildren(e.target.value);
    }
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
      setFatherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectFatherFirstNameMl(e) {
    if (e.target.value.trim().length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherFirstNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }

  function setMotherInfo(e) {
    if (e.target.checked == true) {
      setIsMotherInfo(e.target.checked);
      setMotherFirstNameEn("");
      setMotherFirstNameMl("");
      setMotherAadhar("");
      setMotherMaritalStatus(null);
      setMotherMarriageAge("");
      setMotherMarriageBirth("");
      setMotherEducation(null);
      setMotherProfession(null);

      setOrderofChildren("");
      // setMotherNationality(null);
    } else {

      setIsMotherInfo(e.target.checked);
    }
  }
  function setFatherInfo(e) {
    if (e.target.checked == true) {
      setIsFatherInfo(e.target.checked);
      setFatherAadhar("");
      setFatherFirstNameEn("");

      setFatherFirstNameMl("");

      // setFatherNationality(null);

      setFatherEducation(null);
      setFatherProfession(null);
      // setFatherMobile("");
      // setFatherEmail("");
    } else {
      setIsFatherInfo(e.target.checked);
    }
  }

  if (isEditBirth) {

    if (formData?.ChildDetails?.ParentsDetails?.motherNationality != null) {
      if (cmbNation.length > 0 && (motherNationality === undefined || motherNationality === "")) {
        setMotherNationality(cmbNation.filter(cmbNation => cmbNation.code === formData?.ChildDetails?.ParentsDetails?.motherNationality)[0]);
      }
    }
    if (formData?.ChildDetails?.ParentsDetails?.motherMaritalStatus != null) {
      if (cmbMaritalStatus.length > 0 && (motherMaritalStatus === undefined || motherMaritalStatus === "")) {
        setMotherMaritalStatus(cmbMaritalStatus.filter(cmbMaritalStatus => cmbMaritalStatus.code === formData?.ChildDetails?.ParentsDetails?.motherMaritalStatus)[0]);
      }
    }
    if (formData?.ChildDetails?.ParentsDetails?.motherEducation != null) {
      if (cmbQualification.length > 0 && (motherEducation === undefined || motherEducation === "")) {
        setMotherEducation(cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.ChildDetails?.ParentsDetails?.motherEducation)[0]);
      }
    }
    if (formData?.ChildDetails?.ParentsDetails?.motherProfession != null) {
      if (cmbProfession.length > 0 && (motherProfession === undefined || motherProfession === "")) {
        setMotherProfession(cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.ChildDetails?.ParentsDetails?.motherProfession)[0]);
      }
    }
    if (formData?.ChildDetails?.ParentsDetails?.fatherNationality != null) {
      if (cmbNation.length > 0 && (fatherNationality === undefined || fatherNationality === "")) {
        setFatherNationality(cmbNation.filter(cmbNation => cmbNation.code === formData?.ChildDetails?.ParentsDetails?.fatherNationality)[0]);
      }
    }
    if (formData?.ChildDetails?.ParentsDetails?.fatherEducation != null) {
      if (cmbQualification.length > 0 && (fatherEducation === undefined || fatherEducation === "")) {
        setFatherEducation(cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.ChildDetails?.ParentsDetails?.fatherEducation)[0]);
      }
    }
    if (formData?.ChildDetails?.ParentsDetails?.fatherProfession != null) {
      if (cmbProfession.length > 0 && (fatherProfession === undefined || fatherProfession === "")) {
        setFatherProfession(cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.ChildDetails?.ParentsDetails?.fatherProfession)[0]);
      }
    }
    if (formData?.ChildDetails?.ParentsDetails?.Religion != null) {
      if (cmbReligion.length > 0 && (Religion === undefined || Religion === "")) {
        setReligion(cmbReligion.filter(cmbReligion => cmbReligion.code === formData?.ChildDetails?.ParentsDetails?.Religion)[0]);
      }
    }
  }

  let validFlag = true;
  const goNext = () => {
    if (isMotherInfo === false) {
      if (motherEducation == null || motherEducation == '' || motherEducation == undefined) {
        validFlag = false;
        setMotherEducationError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);

      } else {
        setMotherEducationError(false);
      }
      if (motherProfession == null || motherProfession == '' || motherProfession == undefined) {
        validFlag = false;
        setMotherProfessionError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMotherProfessionError(false);
      }
      if (motherAadhar != null || motherAadhar != "" || motherAadhar != undefined) {
        if (MotherAadharError) {
          validFlag = false;
          setMotherAadharError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          // return false;
          // window.alert("Username shouldn't exceed 10 characters")
        } else {
          setMotherAadharError(false);
        }
      }
      if (motherMaritalStatus == null || motherMaritalStatus == '' || motherMaritalStatus == undefined) {
        validFlag = false;
        setMotherMaritalStatusError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMotherMaritalStatusError(false);
      }
      if (motherMarriageAge == null || motherMarriageAge == '' || motherMarriageAge == undefined) {
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

    }
    if (isFatherInfo === false) {
      if (fatherEducation == null || fatherEducation == '' || fatherEducation == undefined) {
        validFlag = false;
        setFatherEduError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);

      } else {
        setFatherEduError(false);
      }
      if (fatherProfession == null || fatherProfession == '' || fatherProfession == undefined) {
        validFlag = false;
        setFatherProfError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setFatherProfError(false);
      }
      if (fatherAadhar != null || fatherAadhar != "" || fatherAadhar != undefined) {
        if (FatherAadharError) {
          validFlag = false;
          setFatherAadharError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          // return false;
          // window.alert("Username shouldn't exceed 10 characters")
        } else {
          setFatherAadharError(false);
        }
      }

    }

    // if (fatherFirstNameEn != null || fatherFirstNameEn != "" || fatherFirstNameEn != undefined) {
    //   if (FatherFirstNmeEnError) {
    //     validFlag = false;
    //     setFatherFirstNmeEnError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //     // return false;
    //     // window.alert("Username shouldn't exceed 10 characters")
    //   } else {
    //     setFatherFirstNmeEnError(false);
    //   }
    // }

    if (fatherMobile != null || fatherMobile != "" || fatherMobile != undefined) {
      let mobileLength = fatherMobile;
      console.log(mobileLength);
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
      sessionStorage.setItem("motherFirstNameEn", motherFirstNameEn ? motherFirstNameEn : null);
      sessionStorage.setItem("motherFirstNameMl", motherFirstNameMl ? motherFirstNameMl : null);
      sessionStorage.setItem("motherAadhar", motherAadhar ? motherAadhar : null);
      sessionStorage.setItem("motherMarriageAge", motherMarriageAge ? motherMarriageAge : null);
      sessionStorage.setItem("motherMarriageBirth", motherMarriageBirth ? motherMarriageBirth : null);
      sessionStorage.setItem("motherEducation", motherEducation ? motherEducation.code : null);
      sessionStorage.setItem("motherProfession", motherProfession ? motherProfession.code : null);
      sessionStorage.setItem("motherNationality", motherNationality ? motherNationality.code : null);
      sessionStorage.setItem("motherMaritalStatus", motherMaritalStatus ? motherMaritalStatus : null);
      // sessionStorage.setItem("MotherAgeMarriage", MotherAgeMarriage ? MotherAgeMarriage : null);

      sessionStorage.setItem("orderofChildren", orderofChildren ? orderofChildren : null);
      sessionStorage.setItem("isMotherInfo", isMotherInfo ? isMotherInfo : null);
      sessionStorage.setItem("isFatherInfo", isFatherInfo ? isFatherInfo : null);
      sessionStorage.setItem("fatherAadhar", fatherAadhar ? fatherAadhar : null);
      sessionStorage.setItem("fatherFirstNameEn", fatherFirstNameEn ? fatherFirstNameEn : null);
      sessionStorage.setItem("fatherFirstNameMl", fatherFirstNameMl ? fatherFirstNameMl : null);
      sessionStorage.setItem("fatherNationality", fatherNationality ? fatherNationality.code : null);
      sessionStorage.setItem("fatherEducation", fatherEducation ? fatherEducation.code : null);
      sessionStorage.setItem("fatherProfession", fatherProfession ? fatherProfession.code : null);
      sessionStorage.setItem("Religion", Religion ? Religion.code : null);
      sessionStorage.setItem("fatherEmail", fatherEmail ? fatherEmail : null);
      sessionStorage.setItem("fatherMobile", fatherMobile ? fatherMobile : null);

      onSelect(config.key, {
        motherFirstNameEn,
        motherFirstNameMl,
        motherAadhar,
        motherMaritalStatus,
        motherMarriageAge,
        motherMarriageBirth,
        motherEducation,
        motherProfession,
        motherNationality,
        orderofChildren,
        fatherAadhar,
        isMotherInfo,
        isFatherInfo,
        fatherFirstNameEn,
        fatherFirstNameMl,
        fatherNationality,
        fatherEducation,
        fatherProfession,
        Religion,
        fatherMobile,
        fatherEmail,
      });
    }
  };

  if (
    isReligionListLoading || isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isCountryLoading || isNationLoad) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}

        {/* isDisabled={!motherFirstNameEn} */}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}
          isDisabled={!fatherMobile ||
            (isMotherInfo === false ? (motherFirstNameEn === "" || motherFirstNameMl === "" || !motherNationality
              || !motherMaritalStatus || motherMarriageBirth === "" || orderofChildren === ""
              || !motherEducation || !motherProfession) : false)
            || (isFatherInfo === false ? (fatherFirstNameEn === "" || fatherFirstNameMl === "" || !fatherNationality || !fatherEducation || !fatherProfession
            ) : false)
            || !Religion || fatherMobile === ""
          }>

          <div className="row">
            <div className="col-md-12">
              {/* <CardLabel>{`${t("Multiple Birth")}`}</CardLabel> */}
              <CheckBox label={t("CR_MOTHER_INFORMATION_MISSING")} onChange={setMotherInfo} value={isMotherInfo} checked={isMotherInfo} />
            </div>
          </div>
          {isMotherInfo === false && (
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
                  <div className="col-md-4">
                    <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"number"}
                      optionKey="i18nKey"
                      name="motherAadhar"
                      value={motherAadhar}
                      onChange={setSelectMotherAadhar}
                      disable={isDisableEdit}
                      placeholder={`${t("CS_COMMON_AADHAAR")}`}
                      {...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                    />
                  </div>

                  <div className="col-md-4">
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
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })}
                    />
                  </div>

                  <div className="col-md-4">
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
                      onChange={setSelectMotherFirstNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MOTHER_NAME_ML")}`}
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

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_NATIONALITY")}`} <span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="nationalityname"
                      isMandatory={false}
                      option={cmbNation}
                      selected={motherNationality}
                      select={setSelectMotherNationality}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_NATIONALITY")}`}
                    />
                  </div>
                  <div className="col-md-4" >
                    <CardLabel>{`${t("CR_MOTHER_MARITAL_STATUS")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="i18nKey"
                      isMandatory={false}
                      option={cmbMaritalStatus}
                      selected={motherMaritalStatus}
                      select={setSelectMotherMaritalStatus}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MOTHER_MARITAL_STATUS")}`}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {ageMariageStatusHide === "MARRIED" && (

                    <div className="col-md-8">
                      <CardLabel>{`${t("CR_MOTHER_AGE_MARRIAGE")}`} <span className="mandatorycss">*</span></CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"number"}
                        optionKey="i18nKey"
                        name="motherMarriageAge"
                        value={motherMarriageAge}
                        onChange={setSelectMotherMarriageAge}
                        disable={isDisableEdit}
                        placeholder={`${t("CR_MOTHER_AGE_MARRIAGE")}`}
                        {...(validation = { pattern: "^[0-9]{3}$", type: "number", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_MARRIAGE") })}
                      />
                    </div>
                  )}

                  <div className="col-md-5">
                    <CardLabel>{`${t("CR_MOTHER_AGE_BIRTH")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"number"}
                      optionKey="i18nKey"
                      name="motherMarriageBirth"
                      value={motherMarriageBirth}
                      onChange={setSelectMotherMarriageBirth}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MOTHER_AGE_BIRTH")}`}
                      {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_BIRTH") })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_ORDER_CURRENT_DELIVERY")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"number"}
                      optionKey="i18nKey"
                      name="orderofChildren"
                      value={orderofChildren}
                      onChange={setSelectOrderofChildren}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_ORDER_CURRENT_DELIVERY")}`}
                      {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CR_INVALID_ORDER_CURRENT_DELIVERY") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbQualification}
                      selected={motherEducation}
                      select={setSelectMotherEducation}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_EDUCATION")}`}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbProfession}
                      selected={motherProfession}
                      select={setSelectMotherProfession}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_PROFESSIONAL")}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <CheckBox label={t("CR_FATHER_INFORMATION_MISSING")} onChange={setFatherInfo} value={isFatherInfo} checked={isFatherInfo} disable={isDisableEdit}/>
            </div>
          </div>

          {isFatherInfo === false && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"number"}
                      optionKey="i18nKey"
                      name="fatherAadhar"
                      value={fatherAadhar}
                      onChange={setSelectFatherAadhar}
                      disable={isDisableEdit}
                      placeholder={`${t("CS_COMMON_AADHAAR")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                    />
                  </div>

                  <div className="col-md-4">
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
                      disable={isDisableEdit}
                      placeholder={`${t("CR_FATHER_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })}
                    />
                  </div>

                  <div className="col-md-4">
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
                      onChange={setSelectFatherFirstNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_FATHER_NAME_ML")}`}
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
                    {/* <span className="mandatorycss">*</span> */}
                    <CardLabel>{`${t("CR_NATIONALITY")}`} <span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="nationalityname"
                      isMandatory={false}
                      option={cmbNation}
                      selected={fatherNationality}
                      select={setSelectFatherNationality}
                      disable={isDisableEdit}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_EDUCATION")}`} <span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbQualification}
                      selected={fatherEducation}
                      select={setSelectFatherEducation}
                      disable={isDisableEdit}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_PROFESSIONAL")}`} <span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={false}
                      option={cmbProfession}
                      selected={fatherProfession}
                      select={setSelectFatherProfession}
                      disable={isDisableEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_FAMILY_INFORMATION")}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{`${t("CS_COMMON_RELIGION")}`} <span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbReligion}
                  selected={Religion}
                  select={setSelectReligion}
                  disable={isDisableEdit}
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
                  disable={isDisableEdit}
                  placeholder={`${t("CR_PARENTS_CONTACT_NO")}`}
                  {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_PARENTS_CONTACT_NO") })}
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
                  disable={isDisableEdit}
                  placeholder={`${t("CR_PARENTS_EMAIL")}`}
                  {...(validation = { isRequired: false, title: t("CR_INVALID_PARENTS_EMAIL") })}
                />
              </div>
            </div>
          </div>

          {toast && (
            <Toast
              error={
                MotherAadharError ||
                MotherMaritalStatusError ||
                MotherMarriageageError ||
                MotherEducationError ||
                MotherProfessionError ||
                MotherNationalityError ||
                FatherAadharError ||
                FatherFirstNmeEnError ||
                FatherEduError ||
                FatherProfError ||

                FatherMobileError ||
                ReligionError ||
                // || MotherMaritalStatusError || MotherCountryError || MotherStateError || MotherDistrictError || MotherLBNameError  || MotherTalukError || MotherPlaceTypeError
                OrderofChildrenError
              }
              label={
                MotherAadharError ||
                  MotherMaritalStatusError ||
                  MotherMarriageageError ||
                  MotherEducationError ||
                  MotherProfessionError ||
                  MotherNationalityError ||
                  FatherAadharError ||
                  FatherFirstNmeEnError ||
                  FatherEduError ||
                  FatherProfError ||

                  FatherMobileError ||
                  ReligionError ||
                  OrderofChildrenError
                  ? MotherAadharError
                    ? t(`CS_COMMON_INVALID_MOTHER_AADHAR_NO`)
                    : MotherMarriageageError
                      ? t(`CR_INVALID_MOTHER_AGE_AT_MARRIAGE`)
                      : MotherMaritalStatusError ? t(`BIRTH_ERROR_MOTHER_MARITIAL_CHOOSE`)
                        : MotherEducationError
                          ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                          : MotherProfessionError
                            ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`)
                            : MotherNationalityError
                              ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`)
                              :
                              OrderofChildrenError
                                ? t(`BIRTH_ERROR_ORDER_OF_CHILDREN`)
                                : FatherAadharError
                                  ? t(`CS_COMMON_INVALID_FATHER_AADHAR_NO`)
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
                                            :

                                            setToast(false)
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
export default ParentsDetails;