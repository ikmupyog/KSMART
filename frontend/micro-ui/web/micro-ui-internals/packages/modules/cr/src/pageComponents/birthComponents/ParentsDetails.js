import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const ParentsDetails = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
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
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [lbs, setLbs] = useState(0);
    const [MotherFirstNameEn, setMotherFirstNameEn] = useState(formData?.MotherInfoDetails?.MotherFirstNameEn ? formData?.MotherInfoDetails?.MotherFirstNameEn : "");
    
    const [MotherFirstNameMl, setMotherFirstNameMl] = useState(formData?.MotherInfoDetails?.MotherFirstNameMl ? formData?.MotherInfoDetails?.MotherFirstNameMl : "");
    const [MotherAadhar, setMotherAadhar] = useState(formData?.MotherInfoDetails?.MotherAadhar ? formData?.MotherInfoDetails?.MotherAadhar : "");
    const [MotherMarriageAge, setMotherMarriageAge] = useState(formData?.MotherInfoDetails?.MotherMarriageAge ? formData?.MotherInfoDetails?.MotherMarriageAge : "");
    const [MotherEmail, setMotherEmail] = useState(formData?.MotherInfoDetails?.MotherEmail ? formData?.MotherInfoDetails?.MotherEmail : "");
    const [MotherMarriageBirth, setMotherMarriageBirth] = useState(formData?.MotherInfoDetails?.MotherMarriageBirth ? formData?.MotherInfoDetails?.MotherMarriageBirth : "");
    const [MotherEducation, setMotherEducation] = useState(formData?.MotherInfoDetails?.MotherEducation ? formData?.MotherInfoDetails?.MotherEducation : null);  
    const [MotherProfession, setMotherProfession] = useState(formData?.MotherInfoDetails?.MotherProfession ? formData?.MotherInfoDetails?.MotherProfession : null);    
    const [MotherAgeDeleivery, setMotherAgeDeleivery] = useState(formData?.MotherInfoDetails?.MotherAgeDeleivery ? formData?.MotherInfoDetails?.MotherAgeDeleivery : null);
    // const [MotherAgeMarriage, setMotherAgeMarriage] = useState(formData?.MotherInfoDetails?.MotherAgeMarriage ? formData?.MotherInfoDetails?.MotherAgeMarriage : ""); 
    const [OrderofChildren, setOrderofChildren] = useState(formData?.MotherInfoDetails?.OrderofChildren ? formData?.MotherInfoDetails?.OrderofChildren : "");
  
    const [MotherNationality, setMotherNationality] = useState(formData?.MotherInfoDetails?.MotherNationality ? formData?.MotherInfoDetails?.MotherNationality : null);
   
    const [isMotherInfo, setIsMotherInfo] = useState(formData?.MotherInfoDetails?.isMotherInfo ? formData?.MotherInfoDetails?.isMotherInfo : false);
 

    const [FatherAadhar, setFatherAadhar] = useState(formData?.FatherInfoDetails?.FatherAadhar ? formData?.FatherInfoDetails?.FatherAadhar : "");
    const [toast, setToast] = useState(false);
    const [MotherAadharError, setMotherAadharError] = useState(formData?.MotherInfoDetails?.MotherAadhar ? false : false);
    const [MotherMarriageBirthError, setMotherMarriageBirthError] = useState(formData?.MotherInfoDetails?.MotherMarriageBirth ? false : false);
    const [MotherEducationError, setMotherEducationError] = useState(formData?.MotherInfoDetails?.MotherEducation ? false : false);
    const [MotherProfessionError, setMotherProfessionError] = useState(formData?.MotherInfoDetails?.MotherProfession ? false : false);
    const [MotherNationalityError, setMotherNationalityError] = useState(formData?.MotherInfoDetails?.MotherNationality ? false : false);
    
    const [FatherAadharError, setFatherAadharError] = useState(formData?.FatherInfoDetails?.FatherAadhar ? false : false);
    const [isFatherInfo, setIsFatherInfo] = useState(formData?.FatherInfoDetails?.isFatherInfo ? formData?.FatherInfoDetails?.isFatherInfo : false);
    const [FatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.FatherInfoDetails?.FatherFirstNameEn ? formData?.FatherInfoDetails?.FatherFirstNameEn : "");
    const [FatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.FatherInfoDetails?.FatherFirstNameMl ? formData?.FatherInfoDetails?.FatherFirstNameMl : "");
    const [FatherNationality, setFatherNationality] = useState(formData?.FatherInfoDetails?.FatherNationality ? formData?.FatherInfoDetails?.FatherNationality : null);
    const [FatherEducation, setFatherEducation] = useState(formData?.FatherInfoDetails?.FatherEducation ? formData?.FatherInfoDetails?.FatherEducation : null);  
    const [FatherProfession, setFatherProfession] = useState(formData?.FatherInfoDetails?.FatherProfession ? formData?.FatherInfoDetails?.FatherProfession : null);


    const [Religion, setReligion] = useState(formData?.StatisticalInfoDetails?.Religion ? formData?.StatisticalInfoDetails?.Religion : null);
    const [FatherEmail, setFatherEmail] = useState(formData?.FatherInfoDetails?.FatherEmail ? formData?.FatherInfoDetails?.FatherEmail : "");
    const [FatherMobile, setFatherMobile] = useState(formData?.FatherInfoDetails?.FatherMobile ? formData?.FatherInfoDetails?.FatherMobile : "");
    const [OrderofChildrenError, setOrderofChildrenError] = useState(formData?.MotherInfoDetails?.OrderofChildren ? false : false);
    const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.FatherInfoDetails?.FatherFirstNameEn ? false : false);
    const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.FatherInfoDetails?.FatherFirstNameMl ? false : false);


    const [FatherMobileError, setFatherMobileError] = useState(formData?.FatherInfoDetails?.FatherAadhar ? false : false);
    const [FatherEduError, setFatherEduError] = useState(formData?.FatherInfoDetails?.FatherEducation ? false : false);
    const [FatherProfError, setFatherProfError] = useState(formData?.FatherInfoDetails?.FatherProfession ? false : false);
    const [ReligionStError, setReligionStError] = useState(formData?.StatisticalInfoDetails?.Religion ? false : false);


    const cmbUrbanRural = [
        { i18nKey: "Urban", code: "URBAN" },
        { i18nKey: "Rural", code: "RURAL" },
    ];
    const cmbMaritalStatus = [
        { i18nKey: "Single", code: "SINGLE" },
        { i18nKey: "Married", code: "MARRIED" },
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
    //     if (MotherNationality == null || MotherNationality == '') {
    //         if (stateId === "kl" && cmbNation.length > 0) {
    //             cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes('Indian'));
    //             setMotherNationality(cmbfilterNation[0]);
    //         }
    //     }      

    // }, [Nation])
    useEffect(() => {
        if (stateId === "kl" && cmbNation.length > 0) {
            cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes('Indian'));
            setFatherNationality(cmbfilterNation[0]);
            setMotherNationality(cmbfilterNation[0]);

        }
    }, [Nation])
    function setSelectMotherFirstNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }

    }
   
    function setSelectMotherFirstNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
        }
    }
   
    function setSelectMotherAadhar(e) {
        if (e.target.value.length != 0) {

            if (e.target.value.length > 12) {
                // setMotherAadhar(e.target.value);
                setMotherAadharError(true);
                return false;
            } else if (e.target.value.length < 12) {
                setMotherAadharError(true);
                setMotherAadhar(e.target.value);
                return false;
            }
            else {
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
        if (e.target.value.length != 0) {

            if (e.target.value.length > 12) {
                // setChildAadharNo(e.target.value);
                setFatherAadharError(true);
                // const limit = 12;
                // setFatherAadhar(e.target.value.slice(0, limit));
                // window.alert("Username shouldn't exceed 10 characters")
            } else if (e.target.value.length < 12) {
                setFatherAadharError(true);
                setFatherAadhar(e.target.value);
                return false;
            }
            else {
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
        if (e.target.value.length != 0) {

            if (e.target.value.length > 10) {
                // setChildAadharNo(e.target.value);
                setFatherMobileError(true);
                // const limit = 12;
                // setFatherAadhar(e.target.value.slice(0, limit));
                // window.alert("Username shouldn't exceed 10 characters")
            } else if (e.target.value.length < 10) {
                setFatherMobileError(true);
                setFatherMobile(e.target.value);
                return false;
            }
            else {
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
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherEmail(e.target.value);
        }
    }
   
    function setSelectMotherMarriageAge(e) {
        if (e.target.value.length === 3) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherMarriageAge(e.target.value);
        }
    }
    function setSelectMotherMarriageBirth(e) {
        if (e.target.value.length === 3) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherMarriageBirth(e.target.value);
        }
    }
    function setSelectMotherEducation(value) {
        setMotherEducation(value);
    }
    function setSelectMotherEducationSubject(value) {
        setMotherEducationSubject(value);
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
    function setSelectMotherAgeDeleivery(e) {
        setMotherAgeDeleivery(e.target.value);
    }
    
   
    function setSelectOrderofChildren(e) {
        if (e.target.value.length === 3) {
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
    function setMotherInfo(e) {
        if (e.target.checked == true) {
            setIsMotherInfo(true);
        } else {
            setIsMotherInfo(false);
        }
    }
    function setSelectFatherFirstNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
        }
    }
    function setSelectFatherFirstNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
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
            setFatherMobile("");
            setFatherEmail("");
        } else {
            setIsFatherInfo(e.target.checked);
        }
    }


    let validFlag = true;
    const goNext = () => {
        if (isMotherInfo === false) {
            if (MotherAadhar != null || MotherAadhar != '' || MotherAadhar != undefined) {
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

            if (isFatherInfo === false) {
                if (FatherAadhar != null || FatherAadhar != '' || FatherAadhar != undefined) {
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


                if (FatherEducation == null || FatherEducation == '' || FatherEducation == undefined) {
                    validFlag = false;
                    setFatherEduError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);

                } else {
                    setFatherEduError(false);
                }
                if (FatherProfession == null || FatherProfession == '' || FatherProfession == undefined) {
                    validFlag = false;
                    setFatherProfError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setFatherProfError(false);
                }
            }

            if (MotherMarriageBirth != null || MotherMarriageBirth != '' || MotherMarriageBirth != undefined) {
                if (MotherMarriageBirthError) {
                    validFlag = false;
                    setMotherMarriageBirthError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                    // return false;
                    // window.alert("Username shouldn't exceed 10 characters")
                } else {
                    setMotherMarriageBirthError(false);
                }
            }
            if (MotherEducation == null || MotherEducation == '' || MotherEducation == undefined) {
                validFlag = false;
                setMotherEducationError(true);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 2000);

            } else {
                setMotherEducationError(false);
            }
            if (MotherProfession == null || MotherProfession == '' || MotherProfession == undefined) {
                validFlag = false;
                setMotherProfessionError(true);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 2000);
            } else {
                setMotherProfessionError(false);
            }
            if (MotherNationality == null || MotherNationality == '' || MotherNationality == undefined) {
                validFlag = false;
                setMotherNationalityError(true);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 2000);
            } else {
                setMotherNationalityError(false);
            }
            if (Religion == null || Religion == "" || Religion == undefined) {
                validFlag = false;
                setReligionStError(true);
                setToast(true);
                setTimeout(() => {
                  setToast(false);
                }, 2000);
              } else {
                setReligionStError(false);
              }
          
           
            if (OrderofChildren != null || OrderofChildren != '' || OrderofChildren != undefined) {
                if (OrderofChildrenError) {
                    validFlag = false;
                    setOrderofChildrenError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setOrderofChildrenError(false);
                }
            }
            if (FatherMobile != null || FatherMobile != '' || FatherMobile != undefined) {
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
            if (FatherFirstNameEn != null || FatherFirstNameEn != '' || FatherFirstNameEn != undefined) {
                if (FatherFirstNmeEnError) {
                    validFlag = false;
                    setFatherFirstNmeEnError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                    // return false;
                    // window.alert("Username shouldn't exceed 10 characters")
                } else {
                    setFatherFirstNmeEnError(false);
                }
            }

        }

        if (validFlag == true) {
            sessionStorage.setItem("MotherFirstNameEn", MotherFirstNameEn ? MotherFirstNameEn : null);           
            sessionStorage.setItem("MotherFirstNameMl", MotherFirstNameMl ? MotherFirstNameMl : null);       
            sessionStorage.setItem("MotherAadhar", MotherAadhar ? MotherAadhar : null);
            sessionStorage.setItem("MotherMarriageAge", MotherMarriageAge ? MotherMarriageAge : null);    
            sessionStorage.setItem("MotherMarriageBirth", MotherMarriageBirth ? MotherMarriageBirth : null);
            sessionStorage.setItem("MotherEducation", MotherEducation ? MotherEducation.code : null);            
            sessionStorage.setItem("MotherProfession", MotherProfession ? MotherProfession.code : null);
            sessionStorage.setItem("MotherNationality", MotherNationality ? MotherNationality.code : null);           
            // sessionStorage.setItem("MotherAgeMarriage", MotherAgeMarriage ? MotherAgeMarriage : null);       
            
            sessionStorage.setItem("OrderofChildren", OrderofChildren ? OrderofChildren : null);            
            sessionStorage.setItem("isMotherInfo", isMotherInfo ? isMotherInfo : null);
            sessionStorage.setItem("isFatherInfo", isFatherInfo ? isFatherInfo : null);
            sessionStorage.setItem("FatherAadhar", FatherAadhar ? FatherAadhar : null);
            sessionStorage.setItem("FatherFirstNameEn", FatherFirstNameEn ? FatherFirstNameEn : null);
            sessionStorage.setItem("FatherFirstNameMl", FatherFirstNameMl ? FatherFirstNameMl : null);
            sessionStorage.setItem("FatherNationality", FatherNationality ? FatherNationality.code : null);
            sessionStorage.setItem("FatherEducation", FatherEducation ? FatherEducation.code : null);          
            sessionStorage.setItem("FatherProfession", FatherProfession ? FatherProfession.code : null);
            sessionStorage.setItem("Religion", Religion ? Religion.code : null);
            sessionStorage.setItem("FatherEmail", FatherEmail ? FatherEmail : null);
            sessionStorage.setItem("FatherMobile", FatherMobile ? FatherMobile : null);

            onSelect(config.key, {
                MotherFirstNameEn,  MotherFirstNameMl,   MotherAadhar, MotherMarriageAge,  MotherMarriageBirth, MotherEducation, MotherProfession,
                MotherNationality,   OrderofChildren, FatherAadhar,              
                isMotherInfo,isFatherInfo,FatherFirstNameEn,FatherFirstNameMl,FatherNationality,FatherEducation,FatherProfession,Religion,FatherMobile,FatherEmail,
            });
        }
    }
    if (isReligionListLoading ||isLoading || isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isStateLoading || isDistrictLoading || isLBTypeLoading || isCountryLoading || isTalukLoading || isNationLoad) {
        return <Loader></Loader>;
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            {/* isDisabled={!MotherFirstNameEn} */}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        {/* <CardLabel>{`${t("Multiple Birth")}`}</CardLabel> */}
                        <CheckBox label={t("Mother Information Missing")} onChange={setMotherInfo} value={isMotherInfo} checked={isMotherInfo} />
                    </div>
                </div>
                {isMotherInfo === false && (
                    <div>
                        <div className="row">
                            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span> </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" >
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"number"}
                                        optionKey="i18nKey"
                                        name="MotherAadhar"
                                        value={MotherAadhar}
                                        onChange={setSelectMotherAadhar}
                                        disable={isMotherInfo} placeholder={`${t("CS_COMMON_AADHAAR")}`}
                                        {...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                                    />
                                </div>
                      
                                <div className="col-md-4" >

                                    <CardLabel>{`${t("CR_MOTHER_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherFirstNameEn"
                                        value={MotherFirstNameEn}
                                        onChange={setSelectMotherFirstNameEn}
                                        disable={isMotherInfo} placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })}
                                    />
                                </div>
                               
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_MOTHER_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherFirstNameMl"
                                        value={MotherFirstNameMl}
                                        onChange={setSelectMotherFirstNameMl}
                                        disable={isMotherInfo} placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                                        {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_ML") })}
                                    />
                                </div>
                            </div>
                        </div>
                      
                        <div className="row">
                            <div className="col-md-12" >
                            <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_NATIONALITY")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="nationalityname"
                                        isMandatory={false}
                                        option={cmbNation}
                                        selected={MotherNationality}
                                        select={setSelectMotherNationality}
                                        disabled={isMotherInfo} placeholder={`${t("CR_NATIONALITY")}`}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_MOTHER_AGE_MARRIAGE")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"number"}
                                        optionKey="i18nKey"
                                        name="MotherMarriageAge"
                                        value={MotherMarriageAge}
                                        onChange={setSelectMotherMarriageAge}
                                        disable={isMotherInfo} placeholder={`${t("CR_MOTHER_AGE_MARRIAGE")}`}
                                        style={{ textTransform: "uppercase" }}
                                        {...(validation = { pattern: "^[0-9]{3}$", type: "number",isRequired: false, title: t("CR_INVALID_MOTHER_AGE_MARRIAGE") })}
                                    />
                                </div>
                                
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_MOTHER_AGE_BIRTH")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"number"}
                                        optionKey="i18nKey"
                                        name="MotherMarriageBirth"
                                        value={MotherMarriageBirth}
                                        onChange={setSelectMotherMarriageBirth}
                                        disable={isMotherInfo} placeholder={`${t("CR_MOTHER_AGE_BIRTH")}`}
                                        {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOTHER_AGE_BIRTH") })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" >
                            <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_ORDER_CURRENT_DELIVERY")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"number"}
                                        optionKey="i18nKey"
                                        name="OrderofChildren"
                                        value={OrderofChildren}
                                        onChange={setSelectOrderofChildren}
                                        disable={isMotherInfo} placeholder={`${t("CR_ORDER_CURRENT_DELIVERY")}`}
                                        {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CR_INVALID_ORDER_CURRENT_DELIVERY") })}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="name"
                                        isMandatory={false}
                                        option={cmbQualification}
                                        selected={MotherEducation}
                                        select={setSelectMotherEducation}
                                        disabled={isMotherInfo} placeholder={`${t("CR_EDUCATION")}`}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="name"
                                        isMandatory={false}
                                        option={cmbProfession}
                                        selected={MotherProfession}
                                        select={setSelectMotherProfession}
                                        disabled={isMotherInfo} placeholder={`${t("CR_PROFESSIONAL")}`}
                                    />
                                </div>                          

                               
                               
                            </div>
                        </div>
                        </div>)}
                        
                        <div className="row">
                    <div className="col-md-12" >
                        <CheckBox label={t("Father Information Missing")} onChange={setFatherInfo} value={isFatherInfo} checked={isFatherInfo} />
                    </div>
                </div>
               

                {isFatherInfo === false && ( 
                <div>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_INFORMATION")}`}</span> </h1>
                    </div>
                </div>



                        <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"number"} optionKey="i18nKey" name="FatherAadhar" value={FatherAadhar}
                                onChange={setSelectFatherAadhar} disable={isFatherInfo} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>

                        <div className="col-md-4" ><CardLabel>{`${t("CR_FATHER_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherFirstNameEn"
                                value={FatherFirstNameEn} onChange={setSelectFatherFirstNameEn} disable={isFatherInfo} placeholder={`${t("CR_FATHER_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })} />
                        </div>

                        <div className="col-md-4" ><CardLabel>{`${t("CR_FATHER_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherFirstNameMl" value={FatherFirstNameMl}
                                onChange={setSelectFatherFirstNameMl} disable={isFatherInfo} placeholder={`${t("CR_FATHER_NAME_ML")}`}  {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_ML") })} />
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" >
                            {/* <span className="mandatorycss">*</span> */}
                            <CardLabel>{`${t("CR_NATIONALITY")}`}</CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="nationalityname"
                                isMandatory={false}
                                option={cmbNation}
                                selected={FatherNationality}
                                select={setSelectFatherNationality}
                                disable={isFatherInfo}
                            />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualification} selected={FatherEducation}
                                select={setSelectFatherEducation} disable={isFatherInfo} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={FatherProfession}
                                select={setSelectFatherProfession} disable={isFatherInfo} />
                        </div>
                        </div>

                        </div>


                        <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_FAMILY_INFORMATION")}`}</span> </h1>
                    </div>
                </div>

 
                <div className="row">
                    <div className="col-md-12" >
                <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_RELIGION")}`}
                <span className="mandatorycss">*</span>
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
            <div className="col-md-4" ><CardLabel>{`${t("CR_PARENTS_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="FatherEmail" value={FatherEmail}
                                onChange={setSelectFatherEmail} disable={isFatherInfo} placeholder={`${t("CR_PARENTS_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_PARENTS_EMAIL") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_PARENTS_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"number"} optionKey="i18nKey" name="FatherMobile" value={FatherMobile}
                                onChange={setSelectFatherMobile} disable={isFatherInfo} placeholder={`${t("CR_PARENTS_CONTACT_NO")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_PARENTS_CONTACT_NO") })} />
                        </div>
          </div>
        </div>

                        

                       
                    </div>)}
                {toast && (
                    <Toast
                        error={
                            MotherAadharError || MotherMarriageBirthError || MotherEducationError || MotherProfessionError || MotherNationalityError   || FatherFirstNmeEnError || FatherEduError || FatherProfError  ||  ReligionStError || FatherMobileError
                            // || MotherMaritalStatusError || MotherCountryError || MotherStateError || MotherDistrictError || MotherLBNameError  || MotherTalukError || MotherPlaceTypeError
                           || OrderofChildrenError

                        }
                        label={
                            (MotherAadharError || MotherMarriageBirthError || MotherEducationError || MotherProfessionError || MotherNationalityError   || FatherFirstNmeEnError || FatherEduError || FatherProfError  ||  ReligionStError || FatherMobileError
                                // || MotherCountryError || MotherStateError || MotherDistrictError || MotherLBNameError || MotherTalukError || MotherPlaceTypeError 
                                || OrderofChildrenError
                                ?
                                (MotherAadharError ? t(`CS_COMMON_INVALID_AADHAR_NO`) : MotherMarriageBirthError ? t(`CR_INVALID_MOBILE_NO`) : MotherEducationError ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                                    : MotherProfessionError ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`) : MotherNationalityError ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`) 
                                        //   : MotherCountryError ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`) : MotherStateError ? t(`BIRTH_ERROR_STATE_CHOOSE`)
                                        //         : MotherDistrictError ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`) : MotherLBNameError ? t(`BIRTH_ERROR_LBNAME_CHOOSE`)  : MotherTalukError ? t(`BIRTH_ERROR_TALUK_CHOOSE`) : MotherPlaceTypeError ? t(`BIRTH_ERROR_URBAN_CHOOSE`)
                                        : OrderofChildrenError ? t(`BIRTH_ERROR_ORDER_OF_CHILDREN`)  : FatherFirstNmeEnError ? t(`CR_INVALID_FIRST_NAME_EN`) 
                                        : FatherEduError ? t(`BIRTH_ERROR_FATHER_EDUCATION_CHOOSE`) : FatherProfError ? t(`BIRTH_ERROR_FATHER_PROFESSION_CHOOSE`) : ReligionStError  ? t(`BIRTH_ERROR_RELIGION_CHOOSE`) : FatherMobileError ? t(`CR_INVALID_MOBILE_NO`)
                                            //  : || MotherProfessionError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                                            // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                                            : setToast(false)
                                ) : setToast(false)
                            )
                        }

                        onClose={() => setToast(false)}
                    />
                )
                }{""}

            </FormStep>
        </React.Fragment>
    );
};
export default ParentsDetails;
