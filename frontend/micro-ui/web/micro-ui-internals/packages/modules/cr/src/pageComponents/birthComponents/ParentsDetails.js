import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const ParentsDetails = ({ config, onSelect, userType, formData }) => {
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
  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: LocalBodies = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  // Digit.Hooks.useTenants();
  // Digit.Hooks.cr.useCivilRegistrationMDMS("kl", "tenant", "tenants");
  //
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [lbs, setLbs] = useState(0);
  const [motherFirstNameEn, setmotherFirstNameEn] = useState(
    formData?.ParentsDetails?.motherFirstNameEn ? formData?.ParentsDetails?.motherFirstNameEn : ""
  );

  const [motherFirstNameMl, setmotherFirstNameMl] = useState(
    formData?.ParentsDetails?.motherFirstNameMl ? formData?.ParentsDetails?.motherFirstNameMl : ""
  );
  const [motherAadhar, setmotherAadhar] = useState(formData?.ParentsDetails?.motherAadhar ? formData?.ParentsDetails?.motherAadhar : "");
  const [motherMarriageAge, setmotherMarriageAge] = useState(
    formData?.ParentsDetails?.motherMarriageAge ? formData?.ParentsDetails?.motherMarriageAge : ""
  );
  const [motherEmail, setmotherEmail] = useState(formData?.ParentsDetails?.motherEmail ? formData?.ParentsDetails?.motherEmail : "");
  const [motherMarriageBirth, setmotherMarriageBirth] = useState(
    formData?.ParentsDetails?.motherMarriageBirth ? formData?.ParentsDetails?.motherMarriageBirth : ""
  );
  const [motherEducation, setmotherEducation] = useState(
    formData?.ParentsDetails?.motherEducation ? formData?.ParentsDetails?.motherEducation : null
  );
  const [motherProfession, setmotherProfession] = useState(
    formData?.ParentsDetails?.motherProfession ? formData?.ParentsDetails?.motherProfession : null
  );
  const [motherAgeDeleivery, setmotherAgeDeleivery] = useState(
    formData?.ParentsDetails?.motherAgeDeleivery ? formData?.ParentsDetails?.motherAgeDeleivery : null
  );
  // const [motherAgeMarriage, setmotherAgeMarriage] = useState(formData?.ParentsDetails?.motherAgeMarriage ? formData?.ParentsDetails?.motherAgeMarriage : "");
  const [orderofChildren, setorderofChildren] = useState(
    formData?.ParentsDetails?.orderofChildren ? formData?.ParentsDetails?.orderofChildren : ""
  );

  const [motherNationality, setmotherNationality] = useState(
    formData?.ParentsDetails?.motherNationality ? formData?.ParentsDetails?.motherNationality : null
  );

  const [ismotherInfo, setIsmotherInfo] = useState(formData?.ParentsDetails?.ismotherInfo ? formData?.ParentsDetails?.ismotherInfo : false);

  const [fatherAadhar, setfatherAadhar] = useState(formData?.ParentsDetails?.fatherAadhar ? formData?.ParentsDetails?.fatherAadhar : "");
  const [toast, setToast] = useState(false);
  const [motherAadharError, setmotherAadharError] = useState(formData?.ParentsDetails?.motherAadhar ? false : false);
  const [motherMarriageBirthError, setmotherMarriageBirthError] = useState(formData?.ParentsDetails?.motherMarriageBirth ? false : false);
  const [motherEducationError, setmotherEducationError] = useState(formData?.ParentsDetails?.motherEducation ? false : false);
  const [motherProfessionError, setmotherProfessionError] = useState(formData?.ParentsDetails?.motherProfession ? false : false);
  const [motherNationalityError, setmotherNationalityError] = useState(formData?.ParentsDetails?.motherNationality ? false : false);

  const [fatherAadharError, setfatherAadharError] = useState(formData?.ParentsDetails?.fatherAadhar ? false : false);
  const [isfatherInfo, setIsfatherInfo] = useState(formData?.ParentsDetails?.isfatherInfo ? formData?.ParentsDetails?.isfatherInfo : false);
  const [fatherFirstNameEn, setfatherFirstNameEn] = useState(
    formData?.ParentsDetails?.fatherFirstNameEn ? formData?.ParentsDetails?.fatherFirstNameEn : ""
  );
  const [fatherFirstNameMl, setfatherFirstNameMl] = useState(
    formData?.ParentsDetails?.fatherFirstNameMl ? formData?.ParentsDetails?.fatherFirstNameMl : ""
  );
  const [fatherNationality, setfatherNationality] = useState(
    formData?.ParentsDetails?.fatherNationality ? formData?.ParentsDetails?.fatherNationality : null
  );
  const [fatherEducation, setfatherEducation] = useState(
    formData?.ParentsDetails?.fatherEducation ? formData?.ParentsDetails?.fatherEducation : null
  );
  const [fatherProfession, setfatherProfession] = useState(
    formData?.ParentsDetails?.fatherProfession ? formData?.ParentsDetails?.fatherProfession : null
  );

  const [Religion, setReligion] = useState(formData?.ParentsDetails?.Religion ? formData?.ParentsDetails?.Religion : null);
  const [fatherEmail, setfatherEmail] = useState(formData?.ParentsDetails?.fatherEmail ? formData?.ParentsDetails?.fatherEmail : "");
  const [fatherMobile, setfatherMobile] = useState(formData?.ParentsDetails?.fatherMobile ? formData?.ParentsDetails?.fatherMobile : "");
  const [orderofChildrenError, setorderofChildrenError] = useState(formData?.ParentsDetails?.orderofChildren ? false : false);
  const [fatherFirstNmeEnError, setfatherFirstNmeEnError] = useState(formData?.ParentsDetails?.fatherFirstNameEn ? false : false);
  const [fatherFirstNmeMlError, setfatherFirstNmeMlError] = useState(formData?.ParentsDetails?.fatherFirstNameMl ? false : false);

  const [fatherMobileError, setfatherMobileError] = useState(formData?.ParentsDetails?.fatherAadhar ? false : false);
  const [fatherEduError, setfatherEduError] = useState(formData?.ParentsDetails?.fatherEducation ? false : false);
  const [fatherProfError, setfatherProfError] = useState(formData?.ParentsDetails?.fatherProfession ? false : false);
  const [ReligionStError, setReligionStError] = useState(formData?.ParentsDetails?.Religion ? false : false);

 
  
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

  console.log(ReligionList);
  ReligionList &&
    ReligionList["common-masters"] &&
    ReligionList["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  const onSkip = () => onSelect();
  let cmbfilterNation = [];
  let cmbfilterCountry = [];
  let cmbfilterState = [];
  // useEffect(() => {
  //     if (motherNationality == null || motherNationality == '') {
  //         if (stateId === "kl" && cmbNation.length > 0) {
  //             cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes('Indian'));
  //             setmotherNationality(cmbfilterNation[0]);
  //         }
  //     }

  // }, [Nation])
  useEffect(() => {
    if (stateId === "kl" && cmbNation.length > 0) {
      cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
      setfatherNationality(cmbfilterNation[0]);
      setmotherNationality(cmbfilterNation[0]);
    }
  }, [Nation]);
  function setSelectmotherFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setmotherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectmotherFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setmotherFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectmotherAadhar(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setmotherAadhar(e.target.value);
        setmotherAadharError(true);
        return false;
      } else if (e.target.value.length < 12) {
        setmotherAadharError(true);
        setmotherAadhar(e.target.value);
        return false;
      } else {
        setmotherAadharError(false);
        setmotherAadhar(e.target.value);
        return true;
      }
    } else {
      setmotherAadharError(false);
      setmotherAadhar(e.target.value);
      return true;
    }
  }
  function setSelectfatherAadhar(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setfatherAadharError(true);
        // const limit = 12;
        // setfatherAadhar(e.target.value.slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.length < 12) {
        setfatherAadharError(true);
        setfatherAadhar(e.target.value);
        return false;
      } else {
        setfatherAadharError(false);
        setfatherAadhar(e.target.value);
        return true;
      }
    } else {
      setfatherAadharError(false);
      setfatherAadhar(e.target.value);
      return true;
    }
  }
  function setSelectfatherMobile(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        // setChildAadharNo(e.target.value);
        setfatherMobileError(true);
        // const limit = 12;
        // setfatherAadhar(e.target.value.slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.length < 10) {
        setfatherMobileError(true);
        setfatherMobile(e.target.value);
        return false;
      } else {
        setfatherMobileError(false);
        setfatherMobile(e.target.value);
        return true;
      }
    } else {
      setfatherMobileError(false);
      setfatherMobile(e.target.value);
      return true;
    }
  }
  function setSelectfatherEmail(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setfatherEmail(e.target.value);
    }
  }

  function setSelectmotherMarriageAge(e) {
    if (e.target.value.length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setmotherMarriageAge(e.target.value);
    }
  }
  function setSelectmotherMarriageBirth(e) {
    if (e.target.value.length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setmotherMarriageBirth(e.target.value);
    }
  }
  function setSelectmotherEducation(value) {
    setmotherEducation(value);
  }
  
  function setSelectmotherProfession(value) {
    setmotherProfession(value);
  }
  function setSelectLBType(value) {
    setLBTypeName(value);
  }
  function setSelectStateName(value) {
    setStateName(value);
  }
  function setSelectmotherAgeDeleivery(e) {
    setmotherAgeDeleivery(e.target.value);
  }

  function setSelectorderofChildren(e) {
    if (e.target.value.length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setorderofChildren(e.target.value);
    }
  }
  function setSelectmotherNationality(value) {
    setmotherNationality(value);
  }

  function setSelectReligion(value) {
    setReligion(value);
  }

  function setSelectfatherNationality(value) {
    setfatherNationality(value);
  }
  function setSelectfatherEducation(value) {
    setfatherEducation(value);
  }

  function setSelectfatherProfession(value) {
    setfatherProfession(value);
  }
  function setmotherInfo(e) {
    if (e.target.checked == true) {
      setIsmotherInfo(true);
    } else {
      setIsmotherInfo(false);
    }
  }
  function setSelectfatherFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setfatherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectfatherFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setfatherFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setfatherInfo(e) {
    if (e.target.checked == true) {
      setIsfatherInfo(e.target.checked);
      setfatherAadhar("");
      setfatherFirstNameEn("");

      setfatherFirstNameMl("");

      setfatherNationality(null);

      setfatherEducation(null);
      setfatherProfession(null);
      // setfatherMobile("");
      // setfatherEmail("");
    } else {
      setIsfatherInfo(e.target.checked);
    }
  }

  let validFlag = true;
  const goNext = () => {
    if (ismotherInfo === false) {
      if (motherAadhar != null || motherAadhar != "" || motherAadhar != undefined) {
        if (motherAadharError) {
          validFlag = false;
          setmotherAadharError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          // return false;
          // window.alert("Username shouldn't exceed 10 characters")
        } else {
          setmotherAadharError(false);
        }
      }

      if (isfatherInfo === false) {
        if (fatherAadhar != null || fatherAadhar != "" || fatherAadhar != undefined) {
          if (fatherAadharError) {
            validFlag = false;
            setfatherAadharError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            // return false;
            // window.alert("Username shouldn't exceed 10 characters")
          } else {
            setfatherAadharError(false);
          }
        }

        // if (fatherEducation == null || fatherEducation == '' || fatherEducation == undefined) {
        //     validFlag = false;
        //     setfatherEduError(true);
        //     setToast(true);
        //     setTimeout(() => {
        //         setToast(false);
        //     }, 2000);

        // } else {
        //     setfatherEduError(false);
        // }
        // if (fatherProfession == null || fatherProfession == '' || fatherProfession == undefined) {
        //     validFlag = false;
        //     setfatherProfError(true);
        //     setToast(true);
        //     setTimeout(() => {
        //         setToast(false);
        //     }, 2000);
        // } else {
        //     setfatherProfError(false);
        // }
      }

      // if (motherMarriageBirth != null || motherMarriageBirth != '' || motherMarriageBirth != undefined) {
      //     if (motherMarriageBirthError) {
      //         validFlag = false;
      //         setmotherMarriageBirthError(true);
      //         setToast(true);
      //         setTimeout(() => {
      //             setToast(false);
      //         }, 2000);
      //         // return false;
      //         // window.alert("Username shouldn't exceed 10 characters")
      //     } else {
      //         setmotherMarriageBirthError(false);
      //     }
      // }
      // if (motherEducation == null || motherEducation == '' || motherEducation == undefined) {
      //     validFlag = false;
      //     setmotherEducationError(true);
      //     setToast(true);
      //     setTimeout(() => {
      //         setToast(false);
      //     }, 2000);

      // } else {
      //     setmotherEducationError(false);
      // }
      // if (motherProfession == null || motherProfession == '' || motherProfession == undefined) {
      //     validFlag = false;
      //     setmotherProfessionError(true);
      //     setToast(true);
      //     setTimeout(() => {
      //         setToast(false);
      //     }, 2000);
      // } else {
      //     setmotherProfessionError(false);
      // }
      // if (motherNationality == null || motherNationality == '' || motherNationality == undefined) {
      //     validFlag = false;
      //     setmotherNationalityError(true);
      //     setToast(true);
      //     setTimeout(() => {
      //         setToast(false);
      //     }, 2000);
      // } else {
      //     setmotherNationalityError(false);
      // }
      // if (Religion == null || Religion == "" || Religion == undefined) {
      //     validFlag = false;
      //     setReligionStError(true);
      //     setToast(true);
      //     setTimeout(() => {
      //       setToast(false);
      //     }, 2000);
      //   } else {
      //     setReligionStError(false);
      //   }

      // if (orderofChildren != null || orderofChildren != '' || orderofChildren != undefined) {
      //     if (orderofChildrenError) {
      //         validFlag = false;
      //         setorderofChildrenError(true);
      //         setToast(true);
      //         setTimeout(() => {
      //             setToast(false);
      //         }, 2000);
      //     } else {
      //         setorderofChildrenError(false);
      //     }
      // }
      if (fatherMobile != null || fatherMobile != "" || fatherMobile != undefined) {
        if (fatherMobileError) {
          validFlag = false;
          setfatherMobileError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          // return false;
          // window.alert("Username shouldn't exceed 10 characters")
        } else {
          setfatherMobileError(false);
        }
      }
      if (fatherFirstNameEn != null || fatherFirstNameEn != "" || fatherFirstNameEn != undefined) {
        if (fatherFirstNmeEnError) {
          validFlag = false;
          setfatherFirstNmeEnError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          // return false;
          // window.alert("Username shouldn't exceed 10 characters")
        } else {
          setfatherFirstNmeEnError(false);
        }
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
      // sessionStorage.setItem("motherAgeMarriage", motherAgeMarriage ? motherAgeMarriage : null);

      sessionStorage.setItem("orderofChildren", orderofChildren ? orderofChildren : null);
      sessionStorage.setItem("ismotherInfo", ismotherInfo ? ismotherInfo : null);
      sessionStorage.setItem("isfatherInfo", isfatherInfo ? isfatherInfo : null);
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
        motherMarriageAge,
        motherMarriageBirth,
        motherEducation,
        motherProfession,
        motherNationality,
        orderofChildren,
        fatherAadhar,
        ismotherInfo,
        isfatherInfo,
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
    isReligionListLoading ||
    isLoading ||
    isQualificationLoading ||
    isQualificationSubLoading ||
    isProfessionLoading ||
    isStateLoading ||
    isDistrictLoading ||
    isLBTypeLoading ||
    isCountryLoading ||
    isTalukLoading ||
    isNationLoad
  ) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {/* isDisabled={!motherFirstNameEn} */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
      <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* <CardLabel>{`${t("Multiple Birth")}`}</CardLabel> */}
            <CheckBox label={t("CR_MOTHER_INFORMATION_MISSING")} onChange={setmotherInfo} value={ismotherInfo} checked={ismotherInfo} />
          </div>
        </div>
        {ismotherInfo === false && (
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
                    onChange={setSelectmotherAadhar}
                    disable={ismotherInfo}
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
                    onChange={setSelectmotherFirstNameEn}
                    disable={ismotherInfo}
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
                    onChange={setSelectmotherFirstNameMl}
                    disable={ismotherInfo}
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
                  <CardLabel>{`${t("CR_NATIONALITY")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="nationalityname"
                    isMandatory={false}
                    option={cmbNation}
                    selected={motherNationality}
                    select={setSelectmotherNationality}
                    disabled={ismotherInfo}
                    placeholder={`${t("CR_NATIONALITY")}`}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOTHER_AGE_MARRIAGE")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="motherMarriageAge"
                    value={motherMarriageAge}
                    onChange={setSelectmotherMarriageAge}
                    disable={ismotherInfo}
                    placeholder={`${t("CR_MOTHER_AGE_MARRIAGE")}`}
                    style={{ textTransform: "uppercase" }}
                    {...(validation = { pattern: "^[0-9]{3}$", type: "number", isRequired: false, title: t("CR_INVALID_MOTHER_AGE_MARRIAGE") })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOTHER_AGE_BIRTH")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="motherMarriageBirth"
                    value={motherMarriageBirth}
                    onChange={setSelectmotherMarriageBirth}
                    disable={ismotherInfo}
                    placeholder={`${t("CR_MOTHER_AGE_BIRTH")}`}
                    {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: false, title: t("CR_INVALID_MOTHER_AGE_BIRTH") })}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_ORDER_CURRENT_DELIVERY")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="orderofChildren"
                    value={orderofChildren}
                    onChange={setSelectorderofChildren}
                    disable={ismotherInfo}
                    placeholder={`${t("CR_ORDER_CURRENT_DELIVERY")}`}
                    {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: false, type: "number", title: t("CR_INVALID_ORDER_CURRENT_DELIVERY") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_EDUCATION")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbQualification}
                    selected={motherEducation}
                    select={setSelectmotherEducation}
                    disabled={ismotherInfo}
                    placeholder={`${t("CR_EDUCATION")}`}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_PROFESSIONAL")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbProfession}
                    selected={motherProfession}
                    select={setSelectmotherProfession}
                    disabled={ismotherInfo}
                    placeholder={`${t("CR_PROFESSIONAL")}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_FATHER_INFORMATION_MISSING")} onChange={setfatherInfo} value={isfatherInfo} checked={isfatherInfo} />
          </div>
        </div>

        {isfatherInfo === false && (
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
                    onChange={setSelectfatherAadhar}
                    disable={isfatherInfo}
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
                    onChange={setSelectfatherFirstNameEn}
                    disable={isfatherInfo}
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
                    onChange={setSelectfatherFirstNameMl}
                    disable={isfatherInfo}
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
                  <CardLabel>{`${t("CR_NATIONALITY")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="nationalityname"
                    isMandatory={false}
                    option={cmbNation}
                    selected={fatherNationality}
                    select={setSelectfatherNationality}
                    disable={isfatherInfo}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_EDUCATION")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbQualification}
                    selected={fatherEducation}
                    select={setSelectfatherEducation}
                    disable={isfatherInfo}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_PROFESSIONAL")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbProfession}
                    selected={fatherProfession}
                    select={setSelectfatherProfession}
                    disable={isfatherInfo}
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
                  <CardLabel>{`${t("CS_COMMON_RELIGION")}`}</CardLabel>
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
                    onChange={setSelectfatherMobile}
                    disabled={isEdit}
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
                    onChange={setSelectfatherEmail}
                    disabled={isEdit}
                    placeholder={`${t("CR_PARENTS_EMAIL")}`}
                    {...(validation = { isRequired: false, title: t("CR_INVALID_PARENTS_EMAIL") })}
                  />
                </div>
              </div>
            </div>
     
        {toast && (
          <Toast
            error={
              motherAadharError ||
              motherMarriageBirthError ||
              motherEducationError ||
              motherProfessionError ||
              motherNationalityError ||
              fatherFirstNmeEnError ||
              fatherEduError ||
              fatherProfError ||
              ReligionStError ||
              fatherMobileError ||
              // || motherMaritalStatusError || motherCountryError || motherStateError || motherDistrictError || motherLBNameError  || motherTalukError || motherPlaceTypeError
              orderofChildrenError
            }
            label={
              motherAadharError ||
              motherMarriageBirthError ||
              motherEducationError ||
              motherProfessionError ||
              motherNationalityError ||
              fatherFirstNmeEnError ||
              fatherEduError ||
              fatherProfError ||
              ReligionStError ||
              fatherMobileError ||
              // || motherCountryError || motherStateError || motherDistrictError || motherLBNameError || motherTalukError || motherPlaceTypeError
              orderofChildrenError
                ? motherAadharError
                  ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                  : motherMarriageBirthError
                  ? t(`CR_INVALID_MOBILE_NO`)
                  : motherEducationError
                  ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                  : motherProfessionError
                  ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`)
                  : motherNationalityError
                  ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`)
                  : //   : motherCountryError ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`) : motherStateError ? t(`BIRTH_ERROR_STATE_CHOOSE`)
                  //         : motherDistrictError ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`) : motherLBNameError ? t(`BIRTH_ERROR_LBNAME_CHOOSE`)  : motherTalukError ? t(`BIRTH_ERROR_TALUK_CHOOSE`) : motherPlaceTypeError ? t(`BIRTH_ERROR_URBAN_CHOOSE`)
                  orderofChildrenError
                  ? t(`BIRTH_ERROR_ORDER_OF_CHILDREN`)
                  : fatherFirstNmeEnError
                  ? t(`CR_INVALID_FATHER_NAME_EN`)
                  : fatherEduError
                  ? t(`BIRTH_ERROR_FATHER_EDUCATION_CHOOSE`)
                  : fatherProfError
                  ? t(`BIRTH_ERROR_FATHER_PROFESSION_CHOOSE`)
                  : ReligionStError
                  ? t(`BIRTH_ERROR_RELIGION_CHOOSE`)
                  : fatherMobileError
                  ? t(`CR_INVALID_MOBILE_NO`)
                  : //  : || motherProfessionError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                    // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

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
