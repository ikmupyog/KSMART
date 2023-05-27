import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/AdoptionTimeline";
import { useTranslation } from "react-i18next";

const AdoptionParentsDetails = ({ config, onSelect, userType, formData, isEditAdoption, isEditBirthPageComponents }) => {
  // console.log(JSON.stringify(formData)); isEditAdoption ? isEditAdoption :
  // console.log(formData);
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
  const [isDisableEdit, setisDisableEdit] = useState(false);
  let cmbfilterNation = [];
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "UnMarried", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT_APPLICABLE" },
  ];

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
  const [isMotherInfo, setIsMotherInfo] = useState(
    formData?.AdoptionParentsDetails?.isMotherInfo ? formData?.AdoptionParentsDetails?.isMotherInfo : false
  );
  const [motherAadhar, setMotherAadhar] = useState(
    formData?.AdoptionParentsDetails?.motherAadhar
      ? formData?.AdoptionParentsDetails?.motherAadhar
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherAadhar
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherAadhar
      : ""
  );
  const [motherFirstNameEn, setMotherFirstNameEn] = useState(
    formData?.AdoptionParentsDetails?.motherFirstNameEn
      ? formData?.AdoptionParentsDetails?.motherFirstNameEn
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherFirstNameEn
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherFirstNameEn
      : ""
  );
  const [motherFirstNameMl, setMotherFirstNameMl] = useState(
    formData?.AdoptionParentsDetails?.motherFirstNameMl
      ? formData?.AdoptionParentsDetails?.motherFirstNameMl
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherFirstNameMl
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherFirstNameMl
      : ""
  );
  const [motherNationality, setMotherNationality] = useState(
    formData?.AdoptionParentsDetails?.motherNationality?.code
      ? formData?.AdoptionParentsDetails?.motherNationality
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherNationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherNationality)[0]
      : ""
  );
  const [motherMaritalStatus, setMotherMaritalStatus] = useState(
    formData?.AdoptionParentsDetails?.motherMaritalStatus?.code
      ? formData?.AdoptionParentsDetails?.motherMaritalStatus
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMaritalStatus
      ? cmbMaritalStatus.filter(
          (cmbMaritalStatus) => cmbMaritalStatus.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMaritalStatus
        )[0]
      : ""
  );
  const [ageMariageStatusHide, setAgeMariageStatus] = useState(
    formData?.AdoptionParentsDetails?.motherMaritalStatus?.code
      ? formData?.AdoptionParentsDetails?.motherMaritalStatus.code
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMaritalStatus
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMaritalStatus
      : ""
  );

  const [motherMarriageAge, setMotherMarriageAge] = useState(
    formData?.AdoptionParentsDetails?.motherMarriageAge
      ? formData?.AdoptionParentsDetails?.motherMarriageAge
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMarriageAge
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMarriageAge
      : ""
  );
  const [motherMarriageBirth, setMotherMarriageBirth] = useState(
    formData?.AdoptionParentsDetails?.motherMarriageBirth
      ? formData?.AdoptionParentsDetails?.motherMarriageBirth
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMarriageBirth
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMarriageBirth
      : ""
  );
  const [orderofChildren, setOrderofChildren] = useState(
    formData?.AdoptionParentsDetails?.orderofChildren
      ? formData?.AdoptionParentsDetails?.orderofChildren
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.orderofChildren
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.orderofChildren
      : ""
  );
  const [motherEducation, setMotherEducation] = useState(
    formData?.AdoptionParentsDetails?.motherEducation?.code
      ? formData?.AdoptionParentsDetails?.motherEducation
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherEducation
      ? cmbQualification.filter(
          (cmbQualification) => cmbQualification.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherEducation
        )[0]
      : ""
  );
  const [motherProfession, setMotherProfession] = useState(
    formData?.AdoptionParentsDetails?.motherProfession?.code
      ? formData?.AdoptionParentsDetails?.motherProfession
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherProfession
      ? cmbProfession.filter((cmbProfession) => cmbProfession.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherProfession)[0]
      : ""
  );

  const [isFatherInfo, setIsFatherInfo] = useState(
    formData?.AdoptionParentsDetails?.isFatherInfo ? formData?.AdoptionParentsDetails?.isFatherInfo : false
  );
  const [fatherAadhar, setFatherAadhar] = useState(
    formData?.AdoptionParentsDetails?.fatherAadhar
      ? formData?.AdoptionParentsDetails?.fatherAadhar
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherAadhar
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherAadhar
      : ""
  );
  const [fatherFirstNameEn, setFatherFirstNameEn] = useState(
    formData?.AdoptionParentsDetails?.fatherFirstNameEn
      ? formData?.AdoptionParentsDetails?.fatherFirstNameEn
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherFirstNameEn
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherFirstNameEn
      : ""
  );
  const [fatherFirstNameMl, setFatherFirstNameMl] = useState(
    formData?.AdoptionParentsDetails?.fatherFirstNameMl
      ? formData?.AdoptionParentsDetails?.fatherFirstNameMl
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherFirstNameMl
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherFirstNameMl
      : ""
  );
  const [fatherNationality, setFatherNationality] = useState(
    formData?.AdoptionParentsDetails?.fatherNationality?.code
      ? formData?.AdoptionParentsDetails?.fatherNationality
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherNationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherNationality)[0]
      : ""
  );
  const [fatherEducation, setFatherEducation] = useState(
    formData?.AdoptionParentsDetails?.fatherEducation?.code
      ? formData?.AdoptionParentsDetails?.fatherEducation
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherEducation
      ? cmbQualification.filter(
          (cmbQualification) => cmbQualification.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherEducation
        )[0]
      : ""
  );
  const [fatherProfession, setFatherProfession] = useState(
    formData?.AdoptionParentsDetails?.fatherProfession?.code
      ? formData?.AdoptionParentsDetails?.fatherProfession
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherProfession
      ? cmbProfession.filter((cmbProfession) => cmbProfession.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherProfession)[0]
      : ""
  );
  const [Religion, setReligion] = useState(
    formData?.AdoptionParentsDetails?.Religion?.code
      ? formData?.AdoptionParentsDetails?.Religion
      : formData?.AdoptionParentsDetails?.Religion
      ? cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.Religion)[0]
      : ""
  );
  const [fatherEmail, setFatherEmail] = useState(
    formData?.AdoptionParentsDetails?.fatherEmail
      ? formData?.AdoptionParentsDetails?.fatherEmail
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherEmail
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherEmail
      : ""
  );
  const [fatherMobile, setFatherMobile] = useState(
    formData?.AdoptionParentsDetails?.fatherMobile
      ? formData?.AdoptionParentsDetails?.fatherMobile
      : formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherMobile
      ? formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherMobile
      : ""
  );

  const [toast, setToast] = useState(false);
  const [MotherAadharError, setMotherAadharError] = useState(formData?.AdoptionParentsDetails?.motherAadhar ? false : false);
  const [MotherMarriageageError, setMotherMarriageageError] = useState(formData?.AdoptionParentsDetails?.motherMarriageAge ? false : false);
  const [MotherEducationError, setMotherEducationError] = useState(formData?.AdoptionParentsDetails?.motherEducation ? false : false);
  const [MotherProfessionError, setMotherProfessionError] = useState(formData?.AdoptionParentsDetails?.motherProfession ? false : false);
  const [MotherNationalityError, setMotherNationalityError] = useState(formData?.AdoptionParentsDetails?.motherNationality ? false : false);
  const [FatherAadharError, setFatherAadharError] = useState(formData?.AdoptionParentsDetails?.fatherAadhar ? false : false);
  const [OrderofChildrenError, setOrderofChildrenError] = useState(formData?.AdoptionParentsDetails?.orderofChildren ? false : false);
  const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.AdoptionParentsDetails?.fatherFirstNameEn ? false : false);
  const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.AdoptionParentsDetails?.fatherFirstNameMl ? false : false);
  const [FatherMobileError, setFatherMobileError] = useState(formData?.AdoptionParentsDetails?.fatherAadhar ? false : false);
  const [FatherEduError, setFatherEduError] = useState(formData?.AdoptionParentsDetails?.fatherEducation ? false : false);
  const [FatherProfError, setFatherProfError] = useState(formData?.AdoptionParentsDetails?.fatherProfession ? false : false);
  const [ReligionError, setReligionError] = useState(formData?.AdoptionParentsDetails?.Religion ? false : false);
  const [MotherMaritalStatusError, setMotherMaritalStatusError] = useState(formData?.AdoptionParentsDetails?.motherMaritalStatus ? false : false);

  const onSkip = () => onSelect();

  useEffect(() => {
    if (stateId === "kl" && cmbNation.length > 0) {
      cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
      setFatherNationality(cmbfilterNation[0]);
      setMotherNationality(cmbfilterNation[0]);
    }
  }, [Nation]);
  useEffect(() => {
    if (isEditAdoption) {
      formData?.AdoptionParentsDetails?.Religion !== ""
        ? setReligion(cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.AdoptionParentsDetails?.Religion)[0])
        : "";
      formData?.AdoptionParentsDetails?.motherMaritalStatus !== ""
        ? setMotherMaritalStatus(
            cmbMaritalStatus.filter((cmbMaritalStatus) => cmbMaritalStatus.code === formData?.AdoptionParentsDetails?.motherMaritalStatus)[0]
          )
        : "";
      formData?.AdoptionParentsDetails?.motherEducation !== ""
        ? setMotherEducation(
            cmbQualification.filter((cmbQualification) => cmbQualification.code === formData?.AdoptionParentsDetails?.motherEducation)[0]
          )
        : "";
      formData?.AdoptionParentsDetails?.motherProfession !== ""
        ? setMotherProfession(cmbProfession.filter((cmbProfession) => cmbProfession.code === formData?.AdoptionParentsDetails?.motherProfession)[0])
        : "";
      formData?.AdoptionParentsDetails?.fatherEducation !== ""
        ? setFatherEducation(
            cmbQualification.filter((cmbQualification) => cmbQualification.code === formData?.AdoptionParentsDetails?.fatherEducation)[0]
          )
        : "";
      formData?.AdoptionParentsDetails?.fatherProfession !== ""
        ? setFatherProfession(cmbProfession.filter((cmbProfession) => cmbProfession.code === formData?.AdoptionParentsDetails?.fatherProfession)[0])
        : "";
    }
  }, [cmbReligion?.length > 0 || cmbQualification?.length > 0 || cmbProfession?.length > 0]);

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.AdoptionParentsDetails?.ismotherInfo != null) {
        setIsInitialRender(false);
        setIsMotherInfo(formData?.AdoptionParentsDetails?.ismotherInfo);
      }
    }

    if (formData?.AdoptionParentsDetails?.isfatherInfo != null) {
      setIsInitialRender(false);
      setIsFatherInfo(formData?.AdoptionParentsDetails?.isfatherInfo);
    }
  }, [isInitialRender]);

  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0) {
      setMotherFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectMotherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setMotherFirstNameMl("");
    } else {
      setMotherFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectMotherAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setMotherAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12));
    }
  }

  function setSelectFatherAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setFatherAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12));
    }
  }

  function setSelectFatherMobile(e) {
    if (e.target.value.trim().length != 0) {
      setFatherMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10));
    } else {
      setFatherMobile(e.target.value);
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
    // console.log(value);
    setMotherEducation(value);
  }

  function setSelectMotherProfession(value) {
    // console.log(value);
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
    if (e.target.value.trim().length >= 0) {
      setFatherFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectFatherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setFatherFirstNameMl("");
    } else {
      setFatherFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
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
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  if (isEditAdoption) {
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherNationality != null) {
      if (cmbNation.length > 0 && (motherNationality === undefined || motherNationality === "")) {
        setMotherNationality(
          cmbNation.filter((cmbNation) => cmbNation.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherNationality)[0]
        );
      }
    }
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMaritalStatus != null) {
      if (cmbMaritalStatus.length > 0 && (motherMaritalStatus === undefined || motherMaritalStatus === "")) {
        setMotherMaritalStatus(
          cmbMaritalStatus.filter(
            (cmbMaritalStatus) => cmbMaritalStatus.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherMaritalStatus
          )[0]
        );
      }
    }
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherEducation != null) {
      if (cmbQualification.length > 0 && (motherEducation === undefined || motherEducation === "")) {
        setMotherEducation(
          cmbQualification.filter(
            (cmbQualification) => cmbQualification.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherEducation
          )[0]
        );
      }
    }
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherProfession != null) {
      if (cmbProfession.length > 0 && (motherProfession === undefined || motherProfession === "")) {
        setMotherProfession(
          cmbProfession.filter(
            (cmbProfession) => cmbProfession.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.motherProfession
          )[0]
        );
      }
    }
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherNationality != null) {
      if (cmbNation.length > 0 && (fatherNationality === undefined || fatherNationality === "")) {
        setFatherNationality(
          cmbNation.filter((cmbNation) => cmbNation.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherNationality)[0]
        );
      }
    }
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherEducation != null) {
      if (cmbQualification.length > 0 && (fatherEducation === undefined || fatherEducation === "")) {
        setFatherEducation(
          cmbQualification.filter(
            (cmbQualification) => cmbQualification.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherEducation
          )[0]
        );
      }
    }
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherProfession != null) {
      if (cmbProfession.length > 0 && (fatherProfession === undefined || fatherProfession === "")) {
        setFatherProfession(
          cmbProfession.filter(
            (cmbProfession) => cmbProfession.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.fatherProfession
          )[0]
        );
      }
    }
    if (formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.Religion != null) {
      if (cmbReligion.length > 0 && (Religion === undefined || Religion === "")) {
        setReligion(cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.AdoptionParentsDetails?.AdoptionParentsDetails?.Religion)[0]);
      }
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
    // if (motherAadhar != null || motherAadhar != "" || motherAadhar != undefined) {
    //   let adharLength = motherAadhar;
    //   console.log(adharLength);
    //   if (adharLength.length < 12 || adharLength.length > 12) {
    //     validFlag = false;
    //     setMotherAadharError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setMotherAadharError(false);
    //   }
    // }
    if (motherMaritalStatus == null || motherMaritalStatus == "" || motherMaritalStatus == undefined) {
      validFlag = false;
      setMotherMaritalStatusError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMotherMaritalStatusError(false);
    }
    // if (motherMarriageAge == null || motherMarriageAge == '' || motherMarriageAge == undefined) {
    //   if (MotherMarriageageError) {
    //     validFlag = false;
    //     setMotherMarriageageError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setMotherMarriageageError(false);
    //   }
    // }
    if (isFatherInfo === false) {
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
      // if (fatherAadhar != null || fatherAadhar != "" || fatherAadhar != undefined) {
      //   let adharLength = fatherAadhar;
      //   console.log(adharLength);
      //   if (adharLength.length < 12 || adharLength.length > 12) {
      //     validFlag = false;
      //     setFatherAadharError(true);
      //     setToast(true);
      //     setTimeout(() => {
      //       setToast(false);
      //     }, 2000);
      //   } else {
      //     setFatherAadharError(false);
      //   }
      // }
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

  if (isReligionListLoading || isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isCountryLoading || isNationLoad) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}

        {/* isDisabled={!motherFirstNameEn} */}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            !fatherMobile ||
            motherFirstNameEn === "" ||
            motherFirstNameMl === "" ||
            !motherNationality ||
            !motherMaritalStatus ||
            !motherEducation ||
            !motherProfession ||
            (isFatherInfo === false
              ? fatherFirstNameEn === "" || fatherFirstNameMl === "" || !fatherNationality || !fatherEducation || !fatherProfession
              : false) ||
            !Religion ||
            fatherMobile === ""
          }
        >
          <div className="row">
            <div className="col-md-12">{/* <CardLabel>{`${t("Multiple Birth")}`}</CardLabel> */}</div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_MOTHER_INFORMATION")}`}</span>{" "}
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
                    disable={isDisableEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "test", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_MOTHER_NAME_EN")}`}
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
                    placeholder={`${t("CR_ADOPTION_MOTHER_NAME_EN")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.`' ]*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_ADOPTION_MOTHER_NAME_EN"),
                    })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_MOTHER_NAME_ML")}`}
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
                    placeholder={`${t("CR_ADOPTION_MOTHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_ADOPTION_MOTHER_NAME_ML"),
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
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
                    disable={isDisableEdit}
                    placeholder={`${t("CR_NATIONALITY")}`}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_MOTHER_MARITAL_STATUS")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="i18nKey"
                    isMandatory={false}
                    option={cmbMaritalStatus}
                    selected={motherMaritalStatus}
                    select={setSelectMotherMaritalStatus}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_ADOPTION_MOTHER_MARITAL_STATUS")}`}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_MOTHER_EDUCATION")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbQualification}
                    selected={motherEducation}
                    select={setSelectMotherEducation}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_ADOPTION_MOTHER_EDUCATION")}`}
                  />
                </div>
              </div>
            </div>
            {/* <div className="row">
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
              </div> */}
            <div className="row">
              <div className="col-md-12">
                {/* <div className="col-md-4">
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
                  </div> */}

                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_MOTHER_PROFESSIONAL")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbProfession}
                    selected={motherProfession}
                    select={setSelectMotherProfession}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_ADOPTION_MOTHER_PROFESSIONAL")}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_ADOPTION_FATHER_INFORMATION_MISSING")}
                onChange={setFatherInfo}
                value={isFatherInfo}
                checked={isFatherInfo}
                disable={isDisableEdit}
              />
            </div>
          </div>

          {isFatherInfo === false && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_FATHER_INFORMATION")}`}</span>{" "}
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
                      disable={isDisableEdit}
                      placeholder={`${t("CS_COMMON_AADHAAR")}`}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                    />
                  </div>

                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_ADOPTION_FATHER_NAME_EN")}`}
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
                      placeholder={`${t("CR_ADOPTION_FATHER_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })}
                    />
                  </div>

                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_ADOPTION_FATHER_NAME_ML")}`}
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
                      placeholder={`${t("CR_ADOPTION_FATHER_NAME_ML")}`}
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
                    <CardLabel>
                      {`${t("CR_NATIONALITY")}`} <span className="mandatorycss">*</span>
                    </CardLabel>
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
                    <CardLabel>
                      {`${t("CR_ADOPTION_FATHER_EDUCATION")}`} <span className="mandatorycss">*</span>
                    </CardLabel>
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
                    <CardLabel>
                      {`${t("CR_ADOPTION_FATHER_PROFESSIONAL")}`} <span className="mandatorycss">*</span>
                    </CardLabel>
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
                <CardLabel>
                  {`${t("CR_RELIGION_FAMILY")}`} <span className="mandatorycss">*</span>
                </CardLabel>
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
                  {`${t("CR_ADOPTIVE_PARENTS_CONTACT_NO")}`}
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
                  placeholder={`${t("CR_ADOPTIVE_PARENTS_CONTACT_NO")}`}
                  {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_PARENTS_CONTACT_NO") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_ADOPTIVE_PARENTS_EMAIL")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type="email"
                  optionKey="i18nKey"
                  name="fatherEmail"
                  value={fatherEmail}
                  onChange={setSelectFatherEmail}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_ADOPTIVE_PARENTS_EMAIL")}`}
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
                    : MotherMaritalStatusError
                    ? t(`BIRTH_ERROR_MOTHER_MARITIAL_CHOOSE`)
                    : MotherEducationError
                    ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                    : MotherProfessionError
                    ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`)
                    : MotherNationalityError
                    ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`)
                    : OrderofChildrenError
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
export default AdoptionParentsDetails;
