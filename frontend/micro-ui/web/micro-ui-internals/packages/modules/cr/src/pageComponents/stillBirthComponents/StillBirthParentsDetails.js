import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/SBRTimeline";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";

const StillBirthParentsDetails = ({ config, onSelect, userType, formData, isEditStillBirth, isEditStillBirthPageComponents }) => {
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
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  let cmbfilterNation = []; 

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
  const [isMotherInfo, setIsMotherInfo] = useState(formData?.StillBirthParentsDetails?.isMotherInfo ? formData?.StillBirthParentsDetails?.isMotherInfo :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.ismotherInfo ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.ismotherInfo : false);
  const [motherAadhar, setMotherAadhar] = useState(formData?.StillBirthParentsDetails?.motherAadhar ? formData?.StillBirthParentsDetails?.motherAadhar :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherAadhar ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherAadhar : "");
  const [motherFirstNameEn, setMotherFirstNameEn] = useState(formData?.StillBirthParentsDetails?.motherFirstNameEn ? formData?.StillBirthParentsDetails?.motherFirstNameEn :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherFirstNameEn ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherFirstNameEn : "");
  const [motherFirstNameMl, setMotherFirstNameMl] = useState(formData?.StillBirthParentsDetails?.motherFirstNameMl ? formData?.StillBirthParentsDetails?.motherFirstNameMl :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherFirstNameMl ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherFirstNameMl : "");
  const [motherNationality, setMotherNationality] = useState(formData?.StillBirthParentsDetails?.motherNationality?.code ? formData?.StillBirthParentsDetails?.motherNationality : formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherNationality ?
    (cmbNation.filter(cmbNation => cmbNation.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherNationality)[0]) : "");
  

 
  const [motherMarriageBirth, setMotherMarriageBirth] = useState(formData?.StillBirthParentsDetails?.motherMarriageBirth ? formData?.StillBirthParentsDetails?.motherMarriageBirth :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherMarriageBirth ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherMarriageBirth : "");
  // const [orderofChildren, setOrderofChildren] = useState(formData?.StillBirthParentsDetails?.orderofChildren ? formData?.StillBirthParentsDetails?.orderofChildren :
  //   formData?.StillBirthChildDetails?.StillBirthParentsDetails?.orderofChildren ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.orderofChildren : "");
  const [motherEducation, setMotherEducation] = useState(formData?.StillBirthParentsDetails?.motherEducation?.code ? formData?.StillBirthParentsDetails?.motherEducation : formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherEducation ?
    (cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherEducation)[0]) : "");
  const [motherProfession, setMotherProfession] = useState(formData?.StillBirthParentsDetails?.motherProfession?.code ? formData?.StillBirthParentsDetails?.motherProfession : formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherProfession ?
    (cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherProfession)[0]) : "");

  const [isFatherInfo, setIsFatherInfo] = useState(formData?.StillBirthParentsDetails?.isFatherInfo ? formData?.StillBirthParentsDetails?.isFatherInfo :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.isfatherInfo ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.isfatherInfo : false);
  const [fatherAadhar, setFatherAadhar] = useState(formData?.StillBirthParentsDetails?.fatherAadhar ? formData?.StillBirthParentsDetails?.fatherAadhar :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherAadhar ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherAadhar : "");
  const [fatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.StillBirthParentsDetails?.fatherFirstNameEn ? formData?.StillBirthParentsDetails?.fatherFirstNameEn :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherFirstNameEn ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherFirstNameEn : "");
  const [fatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.StillBirthParentsDetails?.fatherFirstNameMl ? formData?.StillBirthParentsDetails?.fatherFirstNameMl :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherFirstNameMl ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherFirstNameMl : "");
  const [fatherNationality, setFatherNationality] = useState(formData?.StillBirthParentsDetails?.fatherNationality?.code ? formData?.StillBirthParentsDetails?.fatherNationality : formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherNationality ?
    (cmbNation.filter(cmbNation => cmbNation.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherNationality)[0]) : "");
  const [fatherEducation, setFatherEducation] = useState(formData?.StillBirthParentsDetails?.fatherEducation?.code ? formData?.StillBirthParentsDetails?.fatherEducation : formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherEducation ?
    (cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherEducation)[0]) : "");
  const [fatherProfession, setFatherProfession] = useState(formData?.StillBirthParentsDetails?.fatherProfession?.code ? formData?.StillBirthParentsDetails?.fatherProfession : formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherProfession ?
    (cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherProfession)[0]) : "");
  const [Religion, setReligion] = useState(formData?.StillBirthParentsDetails?.Religion?.code ? formData?.StillBirthParentsDetails?.Religion : formData?.StillBirthChildDetails?.StillBirthParentsDetails?.Religion ?
    (cmbReligion.filter(cmbReligion => cmbReligion.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.Religion)[0]) : "");
  const [fatherEmail, setFatherEmail] = useState(formData?.StillBirthParentsDetails?.fatherEmail ? formData?.StillBirthParentsDetails?.fatherEmail :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherEmail ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherEmail : "");
  const [fatherMobile, setFatherMobile] = useState(formData?.StillBirthParentsDetails?.fatherMobile ? formData?.StillBirthParentsDetails?.fatherMobile :
    formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherMobile ? formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherMobile : "");

  const [toast, setToast] = useState(false);
  const [MotherAadharError, setMotherAadharError] = useState(formData?.StillBirthParentsDetails?.motherAadhar ? false : false);
  const [MotherBirthageError, setMotherBirthageError] = useState(formData?.StillBirthParentsDetails?.motherMarriageBirth ? false : false);
  const [MotherEducationError, setMotherEducationError] = useState(formData?.StillBirthParentsDetails?.motherEducation ? false : false);
  const [MotherProfessionError, setMotherProfessionError] = useState(formData?.StillBirthParentsDetails?.motherProfession ? false : false);
  const [MotherNationalityError, setMotherNationalityError] = useState(formData?.StillBirthParentsDetails?.motherNationality ? false : false);
  const [FatherAadharError, setFatherAadharError] = useState(formData?.StillBirthParentsDetails?.fatherAadhar ? false : false);
 // const [OrderofChildrenError, setOrderofChildrenError] = useState(formData?.StillBirthParentsDetails?.orderofChildren ? false : false);
  const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.StillBirthParentsDetails?.fatherFirstNameEn ? false : false);
  const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.StillBirthParentsDetails?.fatherFirstNameMl ? false : false);
  const [FatherMobileError, setFatherMobileError] = useState(formData?.StillBirthParentsDetails?.fatherMobile ? false : false);
  const [FatherEduError, setFatherEduError] = useState(formData?.StillBirthParentsDetails?.fatherEducation ? false : false);
  const [FatherProfError, setFatherProfError] = useState(formData?.StillBirthParentsDetails?.fatherProfession ? false : false);
  const [ReligionError, setReligionError] = useState(formData?.StillBirthParentsDetails?.Religion ? false : false);
  
  const [AdhaarDuplicationError, setAdhaarDuplicationError] = useState(false);
  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);
  //const [OrderofChildrenValidationMsg, setOrderofChildrenValidationMsg] = useState(false);
  const [MotherFirstNameError, setMotherFirstNameError] = useState(false);
  const [MotherFirstNameMLError, setMotherFirstNameMLError] = useState(false);
  const [FatherFirstNameError, setFatherFirstNameError] = useState(false);
  const [FatherFirstNameMLError, setFatherFirstNameMLError] = useState(false);


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
      if (formData?.StillBirthParentsDetails?.ismotherInfo != null) {
        setIsInitialRender(false);
        setIsMotherInfo(formData?.StillBirthParentsDetails?.ismotherInfo);
      }
    }

    if (formData?.StillBirthParentsDetails?.isfatherInfo != null) {
      setIsInitialRender(false);
      setIsfatherInfo(formData?.StillBirthParentsDetails?.isfatherInfo);
    }

  }, [isInitialRender]);


  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMotherFirstNameEn(e.target.value.length <= 100 ? e.target.value : (e.target.value).substring(0, 100));
    }
  }

  function setSelectMotherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMotherFirstNameMl('');
    }
    else {
      setMotherFirstNameMl(e.target.value.length <= 100 ? e.target.value : (e.target.value).substring(0, 100));
    }
  }
  function setSelectMotherAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setMotherAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }

  function setSelectFatherAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setFatherAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }

  function setSelectFatherMobile(e) {
    if (e.target.value.trim().length >= 0) {
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
  //   setMotherMarriageAge(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  //   if (e.target.value < 18) {
  //     setAgeValidationMsg(true);
  //     setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 2000);
  //   } else {
  //     setAgeValidationMsg(false);
  //   }
  // }


 
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
 
  // function setSelectOrderofChildren(e) {
  //   if (e.target.value < 10) {
  //     if (e.target.value > 4) {
  //       setOrderofChildren(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  //       setOrderofChildrenValidationMsg(true);
  //       setToast(true);
  //       setTimeout(() => {
  //         setToast(false);
  //       }, 2000);
  //     } else {
  //       setOrderofChildrenValidationMsg(false);
  //       setOrderofChildren(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  //     }
  //   }
  //   else {
  //     e.preventDefault();
  //   }
  //   if (e.target.value.trim().length === 3) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setOrderofChildren(e.target.value);
  //   }
  // }
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
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
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
      setFatherFirstNameMl(e.target.value.length <= 100 ? e.target.value : (e.target.value).substring(0, 100));
    }
  }

  function setMotherInfo(e) {
    if (e.target.checked == true) {
      setIsMotherInfo(e.target.checked);
      setMotherFirstNameEn("");
      setMotherFirstNameMl("");
      setMotherAadhar(null);
     
      setMotherMarriageBirth("");
      setMotherEducation(null);
      setMotherProfession(null);

      // setOrderofChildren("");
      
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
     
      setFatherEducation(null);
      setFatherProfession(null);
   
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
  if (isEditStillBirth) {

    if (formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherNationality != null) {
      if (cmbNation.length > 0 && (motherNationality === undefined || motherNationality === "")) {
        setMotherNationality(cmbNation.filter(cmbNation => cmbNation.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherNationality)[0]);
      }
    }
   
    if (formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherEducation != null) {
      if (cmbQualification.length > 0 && (motherEducation === undefined || motherEducation === "")) {
        setMotherEducation(cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherEducation)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherProfession != null) {
      if (cmbProfession.length > 0 && (motherProfession === undefined || motherProfession === "")) {
        setMotherProfession(cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.motherProfession)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherNationality != null) {
      if (cmbNation.length > 0 && (fatherNationality === undefined || fatherNationality === "")) {
        setFatherNationality(cmbNation.filter(cmbNation => cmbNation.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherNationality)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherEducation != null) {
      if (cmbQualification.length > 0 && (fatherEducation === undefined || fatherEducation === "")) {
        setFatherEducation(cmbQualification.filter(cmbQualification => cmbQualification.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherEducation)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherProfession != null) {
      if (cmbProfession.length > 0 && (fatherProfession === undefined || fatherProfession === "")) {
        setFatherProfession(cmbProfession.filter(cmbProfession => cmbProfession.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.fatherProfession)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.StillBirthParentsDetails?.Religion != null) {
      if (cmbReligion.length > 0 && (Religion === undefined || Religion === "")) {
        setReligion(cmbReligion.filter(cmbReligion => cmbReligion.code === formData?.StillBirthChildDetails?.StillBirthParentsDetails?.Religion)[0]);
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
      if (motherMarriageBirth == null || motherMarriageBirth == '' || motherMarriageBirth == undefined) {
        if (MotherBirthageError) {
          validFlag = false;
          setMotherBirthageError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setMotherBirthageError(false);
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
      // sessionStorage.setItem("motherFirstNameEn", motherFirstNameEn ? motherFirstNameEn : null);
      // sessionStorage.setItem("motherFirstNameMl", motherFirstNameMl ? motherFirstNameMl : null);
      // sessionStorage.setItem("motherAadhar", motherAadhar ? motherAadhar : null);
     
      // sessionStorage.setItem("motherMarriageBirth", motherMarriageBirth ? motherMarriageBirth : null);
      // sessionStorage.setItem("motherEducation", motherEducation ? motherEducation.code : null);
      // sessionStorage.setItem("motherProfession", motherProfession ? motherProfession.code : null);
      // sessionStorage.setItem("motherNationality", motherNationality ? motherNationality.code : null);     
   

      // sessionStorage.setItem("orderofChildren", orderofChildren ? orderofChildren : null);
      // sessionStorage.setItem("isMotherInfo", isMotherInfo ? isMotherInfo : null);
      // sessionStorage.setItem("isFatherInfo", isFatherInfo ? isFatherInfo : null);
      // sessionStorage.setItem("fatherAadhar", fatherAadhar ? fatherAadhar : null);
      // sessionStorage.setItem("fatherFirstNameEn", fatherFirstNameEn ? fatherFirstNameEn : null);
      // sessionStorage.setItem("fatherFirstNameMl", fatherFirstNameMl ? fatherFirstNameMl : null);
      // sessionStorage.setItem("fatherNationality", fatherNationality ? fatherNationality.code : null);
      // sessionStorage.setItem("fatherEducation", fatherEducation ? fatherEducation.code : null);
      // sessionStorage.setItem("fatherProfession", fatherProfession ? fatherProfession.code : null);
      // sessionStorage.setItem("Religion", Religion ? Religion.code : null);
      // sessionStorage.setItem("fatherEmail", fatherEmail ? fatherEmail : null);
      // sessionStorage.setItem("fatherMobile", fatherMobile ? fatherMobile : null);

      onSelect(config.key, {
        motherFirstNameEn,
        motherFirstNameMl,
        motherAadhar,
      
        motherMarriageBirth,
        motherEducation,
        motherProfession,
        motherNationality,
        // orderofChildren,
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
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}

        {/* isDisabled={!motherFirstNameEn} */}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}
          isDisabled={!fatherMobile ||
            (isMotherInfo === false ? (motherFirstNameEn === "" || motherFirstNameMl === "" || !motherNationality
              || motherMarriageBirth === "" ||  !motherEducation || !motherProfession) : false)
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
                  <div className="col-md-3">
                    <CardLabel>{`${t("CR_NATIONALITY")}`} <span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      // optionKey="nationalityname"
                      optionKey={locale === "en_IN" ? "nationalityname" : locale === "ml_IN" ? "nationalitynamelocal" : "nationalityname"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbNation ? cmbNation : [],"nationalityname",t)}
                      selected={motherNationality}
                      select={setSelectMotherNationality}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_NATIONALITY")}`}
                    />
                  </div>
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
                  {/* <div className="col-md-3">
                    <CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      // optionKey="name"
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbQualification ? cmbQualification : [],"name",t)}
                      selected={motherEducation}
                      select={setSelectMotherEducation}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_EDUCATION")}`}
                    />
                  </div> */}
                  {/* <div className="col-md-3">
                    <CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      // optionKey="name"
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbProfession ? cmbProfession : [],"name",t)}
                      selected={motherProfession}
                      select={setSelectMotherProfession}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_PROFESSIONAL")}`}
                    />
                  </div> */}
                </div>
              </div>
       
              <div className="row">
                <div className="col-md-12">
                  {/* <div className="col-md-4">
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
                  </div> */}
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbQualification ? cmbQualification : [],"name",t)}
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
                      option={sortDropdownNames(cmbProfession ? cmbProfession : [],"name",t)}
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
                      // optionKey="nationalityname"
                      optionKey={locale === "en_IN" ? "nationalityname" : locale === "ml_IN" ? "nationalitynamelocal" : "nationalityname"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbNation ? cmbNation : [],"nationalityname",t)}
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
                      // optionKey="name"
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbQualification ? cmbQualification : [],"name",t)}
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
                      // optionKey="name"
                      optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                      isMandatory={false}
                      option={sortDropdownNames(cmbProfession ? cmbProfession : [],"name",t)}
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
                  // optionKey="name"
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  isMandatory={false}
                  option={sortDropdownNames(cmbReligion ? cmbReligion : [],"name",t)}
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
                MotherAadharError ||
              
                MotherBirthageError ||
                MotherEducationError ||
                MotherProfessionError ||
                MotherNationalityError ||
                FatherAadharError ||
                FatherFirstNmeEnError ||
                FatherEduError ||
                FatherProfError ||

                FatherMobileError ||
                ReligionError ||
              
              
                AdhaarDuplicationError ||
                AgeValidationMsg 
              }
              label={
                MotherAadharError ||
                
                MotherBirthageError ||
                  MotherEducationError ||
                  MotherProfessionError ||
                  MotherNationalityError ||
                  FatherAadharError ||
                  FatherFirstNmeEnError ||
                  FatherEduError ||
                  FatherProfError ||

                  FatherMobileError ||
                  ReligionError ||
                 
                  AdhaarDuplicationError ||
                  AgeValidationMsg 

                  ? MotherAadharError
                    ? t(`CS_COMMON_INVALID_MOTHER_AADHAR_NO`)
                    : MotherBirthageError
                     ? t(`CR_INVALID_MOTHER_AGE_AT_BIRTH`)
                      
                        : MotherEducationError
                          ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                          : MotherProfessionError
                            ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`)
                            : MotherNationalityError
                              ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`)
                              // :OrderofChildrenError
                              //   ? t(`BIRTH_ERROR_ORDER_OF_CHILDREN`)
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
export default StillBirthParentsDetails;