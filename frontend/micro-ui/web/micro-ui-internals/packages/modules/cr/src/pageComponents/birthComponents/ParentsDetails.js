import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";

const ParentsDetails = ({ config, onSelect, userType, formData, isEditBirth, isEditBirthPageComponents }) => {
  // console.log(JSON.stringify(formData));
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  let validation = {};
  const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
  const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
  const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: ReligionList = {}, isReligionListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(false);
  let cmbfilterNation = [];
  const cmbMaritalStatus = [
    { name: "Married", namelocal: "വിവാഹിത", code: "MARRIED" },
    { name: "UnMarried", namelocal: "അവിവാഹിത", code: "UNMARRIED" },
    { name: "Not Disclosed", namelocal: "വെളിപ്പെടുത്തിയിട്ടില്ല", code: "NOT_APPLICABLE" },
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
    formData?.ChildDetails?.ParentsDetails?.ismotherInfo ? formData?.ChildDetails?.ParentsDetails?.ismotherInfo : false);
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
  const [ageMariageStatusHide, setAgeMariageStatus] = useState(formData?.ParentsDetails?.motherMaritalStatus?.code ? formData?.ParentsDetails?.motherMaritalStatus.code : formData?.ChildDetails?.ParentsDetails?.motherMaritalStatus ?
    formData?.ChildDetails?.ParentsDetails?.motherMaritalStatus : "");

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
    formData?.ChildDetails?.ParentsDetails?.isfatherInfo ? formData?.ChildDetails?.ParentsDetails?.isfatherInfo : false);
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

  const [toast, setToast] = useState(false);
  const [MotherFirstNameError, setMotherFirstNameError] = useState(false);
  const [MotherFirstNameMLError, setMotherFirstNameMLError] = useState(false);
  const [FatherFirstNameError, setFatherFirstNameError] = useState(false);
  const [FatherFirstNameMLError, setFatherFirstNameMLError] = useState(false);
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
  const [AdhaarDuplicationError, setAdhaarDuplicationError] = useState(false);
  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);
  const [OrderofChildrenValidationMsg, setOrderofChildrenValidationMsg] = useState(false);


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
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMotherFirstNameEn(e.target.value.trim().length <= 100 ? e.target.value : (e.target.value).substring(0, 100));
    }
  }

  function setSelectMotherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern)) && e.target.value.trim() !== " ") {
      e.preventDefault();
      setMotherFirstNameMl('');
    }
    else {
      setMotherFirstNameMl(e.target.value.trim().length <= 100 ? e.target.value : (e.target.value).substring(0, 100));
    }
  }
  function setSelectMotherAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setMotherAadhar(e.target.value.trim().length <= 12 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }

  function setSelectFatherAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setFatherAadhar(e.target.value.trim().length <= 12 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }

  function setSelectFatherMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setFatherMobile(e.target.value.trim().length <= 10 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
  function setSelectFatherEmail(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherEmail(e.target.value.trim());
    }
  }

  // function setSelectMotherMarriageAge(e) {
  //   if (e.target.value.trim().length === 2) {
  //     setMotherMarriageAge(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  //   }
  // }

  function setSelectMotherMarriageAge(e) {
    setMotherMarriageAge(e.target.value.trim().length <= 2 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 2));
    if (e.target.value < 18) {
      setAgeValidationMsg(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAgeValidationMsg(false);
    }
  }


  function setSelectMotherMarriageBirth(e) {
    if (e.target.value.trim().length >= 0) {
      setMotherMarriageBirth(e.target.value.trim().length <= 2 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 2));
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

    if (e.target.value < 10) {
      if (e.target.value > 4) {
        setOrderofChildren(e.target.value.trim().length <= 2 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 2));
        setOrderofChildrenValidationMsg(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setOrderofChildrenValidationMsg(false);
        setOrderofChildren(e.target.value.trim().length <= 2 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 2));
      }
    }
    else {
      e.preventDefault();
    }

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
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.trim().match("^[a-zA-Z ]*$") != null)) {
      setFatherFirstNameEn(e.target.value.length <= 100 ? e.target.value : (e.target.value).substring(0, 100));
    }
  }
  function setSelectFatherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setFatherFirstNameMl('');
    }
    else {
      setFatherFirstNameMl(e.target.value.trim().length <= 100 ? e.target.value : (e.target.value).substring(0, 100));
    }
  }

  function setMotherInfo(e) {
    if (e.target.checked == true) {
      setIsMotherInfo(e.target.checked);
      setMotherFirstNameEn("");
      setMotherFirstNameMl("");
      setMotherAadhar(null);
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
      setFatherAadhar(null);
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
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setCheckSpecialCharSpace(e) {
    let pattern = /^[a-zA-Z-.`' ]*$/;
    if (!(e.key.match(pattern)) && e.code === 'Space') {
      e.preventDefault();
    }
  }
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
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
      if (motherFirstNameEn.trim() == null || motherFirstNameEn.trim() == '' || motherFirstNameEn.trim() == undefined) {
        validFlag = false;
        setMotherFirstNameEn("");
        setMotherFirstNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMotherFirstNameError(false);
      }
      if (motherFirstNameMl.trim() == null || motherFirstNameMl.trim() == '' || motherFirstNameMl.trim() == undefined) {
        validFlag = false;
        setMotherFirstNameMl("");
        setMotherFirstNameMLError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMotherFirstNameMLError(false);
      }
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
      if (motherAadhar.trim() == null || motherAadhar.trim() == '' || motherAadhar.trim() == undefined) {
        setMotherAadhar("");
      } else if (motherAadhar != null && motherAadhar != "") {
        let adharLength = motherAadhar;
        if (adharLength.length < 12 || adharLength.length > 12) {
          validFlag = false;
          setMotherAadharError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
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
      if (fatherFirstNameEn.trim() == null || fatherFirstNameEn.trim() == '' || fatherFirstNameEn.trim() == undefined) {
        validFlag = false;
        setFatherFirstNameEn("");
        setFatherFirstNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setFatherFirstNameError(false);
      }
      if (fatherFirstNameMl.trim() == null || fatherFirstNameMl.trim() == '' || fatherFirstNameMl.trim() == undefined) {
        validFlag = false;
        setFatherFirstNameMl("");
        setFatherFirstNameMLError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setFatherFirstNameMLError(false);
      }
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
      if (fatherAadhar.trim() == null || fatherAadhar.trim() == '' || fatherAadhar.trim() == undefined) {
        setFatherAadhar("");
      } else if (fatherAadhar != null && fatherAadhar != "") {
        let adharLength = fatherAadhar;
        if (adharLength.length < 12 || adharLength.length > 12) {
          validFlag = false;
          setFatherAadharError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setFatherAadharError(false);
        }
      }
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
    if (isFatherInfo === false && isMotherInfo === false) {
      if ((motherAadhar.trim() == null || motherAadhar.trim() == '') && (fatherAadhar.trim() != null || fatherAadhar.trim() == '')) {
        setMotherAadhar('');
        setFatherAadhar('');
      } else {
        if (motherAadhar.trim() != null && fatherAadhar.trim() != null) {
          if (motherAadhar === fatherAadhar) {
            validFlag = false;
            setAdhaarDuplicationError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setAdhaarDuplicationError(false);
          }
        }
      }
    }
    if (validFlag == true) {

      onSelect(config.key, {
        motherFirstNameEn: (motherFirstNameEn.toUpperCase()).trim(),
        motherFirstNameMl: motherFirstNameMl.trim(),
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
        fatherFirstNameEn: (fatherFirstNameEn.toUpperCase()).trim(),
        fatherFirstNameMl: fatherFirstNameMl.trim(),
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
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
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
              <CheckBox label={t("CR_MOTHER_INFORMATION_MISSING")} onChange={setMotherInfo} value={isMotherInfo} checked={isMotherInfo} disable={isDisableEdit} />
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
                      type={"text"}
                      optionKey="i18nKey"
                      name="motherAadhar"
                      value={motherAadhar}
                      onChange={setSelectMotherAadhar}
                      onKeyPress={setCheckSpecialChar}
                      disable={isDisableEdit}
                      placeholder={`${t("CS_COMMON_AADHAAR")}`}
                      {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                      onKeyPress={setCheckSpecialCharSpace}
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
                      onKeyPress={setCheckMalayalamInputField}
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
                      optionKey={locale === "en_IN" ? "nationalityname" : locale === "ml_IN" ? "nationalitynamelocal" : "nationalityname"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbNation ? cmbNation : [], "nationalityname", t)}
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
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbMaritalStatus ? cmbMaritalStatus : [], "code", t)}
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
                        type={"text"}
                        optionKey="i18nKey"
                        name="motherMarriageAge"
                        value={motherMarriageAge}
                        onChange={setSelectMotherMarriageAge}
                        disable={isDisableEdit}
                        placeholder={`${t("CR_MOTHER_AGE_MARRIAGE")}`}
                        {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_MARRIAGE") })}
                      />
                    </div>
                  )}

                  <div className="col-md-5">
                    <CardLabel>{`${t("CR_MOTHER_AGE_BIRTH")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="motherMarriageBirth"
                      value={motherMarriageBirth}
                      onChange={setSelectMotherMarriageBirth}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MOTHER_AGE_BIRTH")}`}
                      {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_BIRTH") })}
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
                      type={"text"}
                      optionKey="i18nKey"
                      name="orderofChildren"
                      value={orderofChildren}
                      onKeyPress={setCheckSpecialChar}
                      onChange={setSelectOrderofChildren}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_ORDER_CURRENT_DELIVERY")}`}
                      {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ORDER_CURRENT_DELIVERY") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbQualification ? cmbQualification : [], "name", t)}
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
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbProfession ? cmbProfession : [], "name", t)}
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
              <CheckBox label={t("CR_FATHER_INFORMATION_MISSING")} onChange={setFatherInfo} value={isFatherInfo} checked={isFatherInfo} disable={isDisableEdit} />
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
                      type={"text"}
                      optionKey="i18nKey"
                      name="fatherAadhar"
                      value={fatherAadhar}
                      onChange={setSelectFatherAadhar}
                      onKeyPress={setCheckSpecialChar}
                      disable={isDisableEdit}
                      placeholder={`${t("CS_COMMON_AADHAAR")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                      onKeyPress={setCheckMalayalamInputField}
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
                      optionKey={locale === "en_IN" ? "nationalityname" : locale === "ml_IN" ? "nationalitynamelocal" : "nationalityname"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbNation ? cmbNation : [], "nationalityname", t)}
                      selected={fatherNationality}
                      select={setSelectFatherNationality}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_NATIONALITY")}`}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_EDUCATION")}`} <span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbQualification ? cmbQualification : [], "name", t)}
                      selected={fatherEducation}
                      select={setSelectFatherEducation}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_EDUCATION")}`}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_PROFESSIONAL")}`} <span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbProfession ? cmbProfession : [], "name", t)}
                      selected={fatherProfession}
                      select={setSelectFatherProfession}
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
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  isMandatory={false}
                  option={sortDropdownNames(cmbReligion ? cmbReligion : [], "name", t)}
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
                  type={"text"}
                  optionKey="i18nKey"
                  name="fatherMobile"
                  value={fatherMobile}
                  onChange={setSelectFatherMobile}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_PARENTS_CONTACT_NO")}`}
                  {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_PARENTS_CONTACT_NO") })}
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
                MotherAadharError || MotherFirstNameError || MotherFirstNameMLError ||
                MotherMaritalStatusError ||
                MotherMarriageageError ||
                MotherEducationError ||
                MotherProfessionError ||
                MotherNationalityError ||
                FatherAadharError ||
                FatherFirstNmeEnError ||
                FatherEduError ||
                FatherProfError ||

                FatherMobileError || FatherFirstNameError || FatherFirstNameMLError ||
                ReligionError ||
                // || MotherMaritalStatusError || MotherCountryError || MotherStateError || MotherDistrictError || MotherLBNameError  || MotherTalukError || MotherPlaceTypeError
                OrderofChildrenError ||
                AdhaarDuplicationError ||
                AgeValidationMsg ||
                OrderofChildrenValidationMsg
              }
              label={
                MotherAadharError ||
                  MotherMaritalStatusError ||
                  MotherMarriageageError ||
                  MotherEducationError || MotherFirstNameError || MotherFirstNameMLError ||
                  MotherProfessionError ||
                  MotherNationalityError ||
                  FatherAadharError ||
                  FatherFirstNmeEnError ||
                  FatherEduError ||
                  FatherProfError ||

                  FatherMobileError || FatherFirstNameError || FatherFirstNameMLError ||
                  ReligionError ||
                  OrderofChildrenError ||
                  AdhaarDuplicationError ||
                  AgeValidationMsg || OrderofChildrenValidationMsg
                  ? MotherFirstNameError
                    ? t(`BIRTH_MOTHER_FIRST_NAME`)
                    : MotherFirstNameMLError
                      ? t(`BIRTH_MOTHER_FIRST_NAME_ML`)
                      : MotherAadharError
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
                                    : FatherFirstNameError
                                      ? t(`BIRTH_FATHER_FIRST_NAME`)
                                      : FatherFirstNameMLError
                                        ? t(`BIRTH_FATHER_FIRST_NAME_ML`)
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
                                                    : AdhaarDuplicationError
                                                      ? t(`CR_DUPLICATE_AADHAR_NO`)
                                                      : AgeValidationMsg
                                                        ? t(`CR_MOTHER_AGE_WARNING`)
                                                        : OrderofChildrenValidationMsg
                                                          ? t(`CR_ORDER_CHILDREN_WARNING`)
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