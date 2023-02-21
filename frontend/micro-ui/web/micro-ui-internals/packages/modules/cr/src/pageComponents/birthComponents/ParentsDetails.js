import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const ParentsDetails = ({ config, onSelect, userType, formData }) => {
  // console.log(JSON.stringify(formData));
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

  let cmbfilterNation = [];
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];

  let cmbQualification = [];
  Qualification &&
    Qualification["birth-death-service"] &&
    Qualification["birth-death-service"].Qualification.map((ob) => {
      cmbQualification.push(ob);
    });
  let cmbQualificationSub = [];
  QualificationSub &&
    QualificationSub["birth-death-service"] &&
    QualificationSub["birth-death-service"].QualificationSub.map((ob) => {
      cmbQualificationSub.push(ob);
    });
  let cmbProfession = [];
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbProfession.push(ob);
    });

  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });

  let cmbReligion = [];
  ReligionList &&
    ReligionList["common-masters"] &&
    ReligionList["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  const [motherFirstNameEn, setMotherFirstNameEn] = useState(formData?.ParentsDetails?.motherFirstNameEn ? formData?.ParentsDetails?.motherFirstNameEn : "");
  const [motherFirstNameMl, setMotherFirstNameMl] = useState(formData?.ParentsDetails?.motherFirstNameMl ? formData?.ParentsDetails?.motherFirstNameMl : "");
  const [motherAadhar, setMotherAadhar] = useState(formData?.ParentsDetails?.motherAadhar ? formData?.ParentsDetails?.motherAadhar : "");
  const [motherMarriageAge, setMotherMarriageAge] = useState(formData?.ParentsDetails?.motherMarriageAge ? formData?.ParentsDetails?.motherMarriageAge : "");
  const [motherEmail, setMotherEmail] = useState(formData?.ParentsDetails?.motherEmail ? formData?.ParentsDetails?.motherEmail : "");
  const [motherMarriageBirth, setMotherMarriageBirth] = useState(formData?.ParentsDetails?.motherMarriageBirth ? formData?.ParentsDetails?.motherMarriageBirth : "");
  const [motherEducation, setMotherEducation] = useState(formData?.ParentsDetails?.motherEducation ? formData?.ParentsDetails?.motherEducation : null);
  const [motherProfession, setMotherProfession] = useState(formData?.ParentsDetails?.motherProfession ? formData?.ParentsDetails?.motherProfession : null);
  // const [MotherAgeMarriage, setMotherAgeMarriage] = useState(formData?.ParentsDetails?.MotherAgeMarriage ? formData?.ParentsDetails?.MotherAgeMarriage : "");
  const [orderofChildren, setOrderofChildren] = useState(formData?.ParentsDetails?.orderofChildren ? formData?.ParentsDetails?.orderofChildren : "");
  const [motherNationality, setMotherNationality] = useState(formData?.ParentsDetails?.motherNationality ? formData?.ParentsDetails?.motherNationality : null);
  const [motherMaritalStatus, setMotherMaritalStatus] = useState(formData?.ParentsDetails?.motherMaritalStatus ? formData?.ParentsDetails?.motherMaritalStatus : null);
  const [isMotherInfo, setIsMotherInfo] = useState(formData?.ParentsDetails?.isMotherInfo ? formData?.ParentsDetails?.isMotherInfo : false);

  const [fatherAadhar, setFatherAadhar] = useState(formData?.ParentsDetails?.fatherAadhar ? formData?.ParentsDetails?.fatherAadhar : "");
  const [toast, setToast] = useState(false);
  const [MotherAadharError, setMotherAadharError] = useState(formData?.ParentsDetails?.motherAadhar ? false : false);
  const [MotherMarriageageError, setMotherMarriageageError] = useState(formData?.ParentsDetails?.motherMarriageAge ? false : false);
  const [MotherEducationError, setMotherEducationError] = useState(formData?.ParentsDetails?.motherEducation ? false : false);
  const [MotherProfessionError, setMotherProfessionError] = useState(formData?.ParentsDetails?.motherProfession ? false : false);
  const [MotherNationalityError, setMotherNationalityError] = useState(formData?.ParentsDetails?.motherNationality ? false : false);

  const [FatherAadharError, setFatherAadharError] = useState(formData?.ParentsDetails?.fatherAadhar ? false : false);
  const [isFatherInfo, setIsFatherInfo] = useState(formData?.ParentsDetails?.isFatherInfo ? formData?.ParentsDetails?.isFatherInfo : false);
  const [fatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.ParentsDetails?.fatherFirstNameEn ? formData?.ParentsDetails?.fatherFirstNameEn : "");
  const [fatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.ParentsDetails?.fatherFirstNameMl ? formData?.ParentsDetails?.fatherFirstNameMl : "");
  const [fatherNationality, setFatherNationality] = useState(formData?.ParentsDetails?.fatherNationality ? formData?.ParentsDetails?.fatherNationality : null);
  const [fatherEducation, setFatherEducation] = useState(formData?.ParentsDetails?.fatherEducation ? formData?.ParentsDetails?.fatherEducation : null);
  const [fatherProfession, setFatherProfession] = useState(formData?.ParentsDetails?.fatherProfession ? formData?.ParentsDetails?.fatherProfession : null);
  const [Religion, setReligion] = useState(formData?.ParentsDetails?.Religion ? formData?.ParentsDetails?.Religion : null);
  const [fatherEmail, setFatherEmail] = useState(formData?.ParentsDetails?.fatherEmail ? formData?.ParentsDetails?.fatherEmail : "");
  const [fatherMobile, setFatherMobile] = useState(formData?.ParentsDetails?.fatherMobile ? formData?.ParentsDetails?.fatherMobile : "");

  const [OrderofChildrenError, setOrderofChildrenError] = useState(formData?.ParentsDetails?.orderofChildren ? false : false);
  const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.ParentsDetails?.fatherFirstNameEn ? false : false);
  const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.ParentsDetails?.fatherFirstNameMl ? false : false);
  const [FatherMobileError, setFatherMobileError] = useState(formData?.ParentsDetails?.fatherAadhar ? false : false);
  const [FatherEduError, setFatherEduError] = useState(formData?.ParentsDetails?.fatherEducation ? false : false);
  const [FatherProfError, setFatherProfError] = useState(formData?.ParentsDetails?.fatherProfession ? false : false);
  const [ReligionError, setReligionError] = useState(formData?.ParentsDetails?.Religion ? false : false);
  const [MotherMaritalStatusError, setMotherMaritalStatusError] = useState(formData?.ParentsDetails?.motherMaritalStatus ? false : false);
  const [ageMariageStatusHide, setAgeMariageStatus] = useState(formData?.ParentsDetails?.motherMaritalStatus ? formData?.ParentsDetails?.motherMaritalStatus : null);

console.log(formData);
console.log(formData?.ParentsDetails);

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
        setIsmotherInfo(formData?.ParentsDetails?.ismotherInfo);
      }
    }

    if (formData?.ParentsDetails?.isfatherInfo != null) {
      setIsInitialRender(false);
      setIsfatherInfo(formData?.ParentsDetails?.isfatherInfo);
    }

  }, [isInitialRender]);


  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectMotherFirstNameMl(e) {
    if (e.target.value.trim().length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectMotherAadhar(e) {
    if (e.target.value.trim().length != 0) {
      if (e.target.value.trim().length > 12) {
        // setMotherAadhar(e.target.value.trim());
        setMotherAadharError(true);
        return false;
      } else if (e.target.value.trim().length < 12) {
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
    if (e.target.value.trim().length != 0) {
      if (e.target.value.trim().length > 12) {
        // setChildAadharNo(e.target.value.trim());
        setFatherAadharError(true);
        // const limit = 12;
        // setFatherAadhar(e.target.value.trim().slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.trim().length < 12) {
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
      if (e.target.value.trim().length > 10) {
        // setChildAadharNo(e.target.value.trim());
        setFatherMobileError(true);
        // const limit = 12;
        // setFatherAadhar(e.target.value.trim().slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.trim().length < 10) {
        setFatherMobileError(true);
        setFatherMobile(e.target.value);
        return false;
      } else {
        setFatherMobileError(false);
        setFatherMobile(e.target.value);
        return true;
      }
    } else {
      setFatherMobileError(false);
      setFatherMobile(e.target.value);
      return true;
    }
  }
  function setSelectFatherEmail(e) {
    if (e.target.value.trim().length === 51) {
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
  //   function setSelectMotherMarriageAge(e) {
  //     if (e.target.value != null || e.target.value != "") {

  //         if (e.target.value.length <= 3) {
  //             if (e.target.value < 12) {
  //               setMotherMarriageAge(e.target.value);
  //               MotherMarriageageError(true);
  //                 return false;
  //             }
  //             else {
  //               setMotherMarriageAge(e.target.value);
  //                 MotherMarriageageError(false);
  //             }
  //         } else {
  //             console.log(e.target.value.length);
  //             MotherMarriageageError(true);
  //             return false;

  //         }
  //     }
  // }

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
      setFatherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectFatherFirstNameMl(e) {
    if (e.target.value.trim().length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
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
      setMotherNationality(null);
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

      setFatherNationality(null);

      setFatherEducation(null);
      setFatherProfession(null);
      // setFatherMobile("");
      // setFatherEmail("");
    } else {
      setIsFatherInfo(e.target.checked);
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
      if (FatherMobileError) {
        validFlag = false;
        setFatherMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setFatherMobileError(false);
      }
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
    isReligionListLoading || isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isCountryLoading ||  isNationLoad) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}

        {/* isDisabled={!motherFirstNameEn} */}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1"></h1>
          </div>
        </div> */}
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
                      // disable={isMotherInfo}
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
                      // disable={isMotherInfo}
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
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel>{`${t("CR_NATIONALITY")}`} <span className="mandatorycss">*</span></CardLabel>
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
                  <div className="col-md-3" >
                    <CardLabel>{`${t("CR_MOTHER_MARITAL_STATUS")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="i18nKey"
                      isMandatory={false}
                      option={cmbMaritalStatus}
                      selected={motherMaritalStatus}
                      select={setSelectMotherMaritalStatus}
                      //  disabled={isMotherInfo} 
                      placeholder={`${t("CR_MOTHER_MARITAL_STATUS")}`}
                    />
                  </div>


                  {ageMariageStatusHide === "MARRIED" && (

                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_MOTHER_AGE_MARRIAGE")}`} <span className="mandatorycss">*</span></CardLabel>
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
                        style={{ textTransform: "uppercase" }}
                        {...(validation = { pattern: "^[0-9]{3}$", type: "number", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_MARRIAGE") })}
                      />
                    </div>
                  )}

                  <div className="col-md-3">
                    <CardLabel>{`${t("CR_MOTHER_AGE_BIRTH")}`}<span className="mandatorycss">*</span></CardLabel>
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
                      // disable={isMotherInfo}
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
                      // disabled={isMotherInfo}
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
                      // disabled={isMotherInfo}
                      placeholder={`${t("CR_PROFESSIONAL")}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <CheckBox label={t("CR_FATHER_INFORMATION_MISSING")} onChange={setFatherInfo} value={isFatherInfo} checked={isFatherInfo} />
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
                      // disable={isFatherInfo}
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
                      // disable={isFatherInfo}
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
                    // disable={isFatherInfo}
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
                    // disable={isFatherInfo}
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
                    // disable={isFatherInfo}
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
                  // disable={isFatherInfo}
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
                ReligionError  ||
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
                  ReligionError  ||
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
                                        :  ReligionError
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