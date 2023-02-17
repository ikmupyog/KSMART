import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const MotherInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
    const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
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
    const [MotherMiddleNameEn, setMotherMiddleNameEn] = useState(formData?.MotherInfoDetails?.MotherMiddleNameEn ? formData?.MotherInfoDetails?.MotherMiddleNameEn : "");
    const [MotherLastNameEn, setMotherLastNameEn] = useState(formData?.MotherInfoDetails?.MotherLastNameEn ? formData?.MotherInfoDetails?.MotherLastNameEn : "");
    const [MotherFirstNameMl, setMotherFirstNameMl] = useState(formData?.MotherInfoDetails?.MotherFirstNameMl ? formData?.MotherInfoDetails?.MotherFirstNameMl : "");
    const [MotherMiddleNameMl, setMotherMiddleNameMl] = useState(formData?.MotherInfoDetails?.MotherMiddleNameMl ? formData?.MotherInfoDetails?.MotherMiddleNameMl : "");
    const [MotherLastNameMl, setMotherLastNameMl] = useState(formData?.MotherInfoDetails?.MotherLastNameMl ? formData?.MotherInfoDetails?.MotherLastNameMl : "");
    const [MotherAadhar, setMotherAadhar] = useState(formData?.MotherInfoDetails?.MotherAadhar ? formData?.MotherInfoDetails?.MotherAadhar : "");
    const [MotherPassportNo, setMotherPassportNo] = useState(formData?.MotherInfoDetails?.MotherPassportNo ? formData?.MotherInfoDetails?.MotherPassportNo : "");
    const [MotherEmail, setMotherEmail] = useState(formData?.MotherInfoDetails?.MotherEmail ? formData?.MotherInfoDetails?.MotherEmail : "");
    const [MotherMobile, setMotherMobile] = useState(formData?.MotherInfoDetails?.MotherMobile ? formData?.MotherInfoDetails?.MotherMobile : "");
    const [MotherEducation, setMotherEducation] = useState(formData?.MotherInfoDetails?.MotherEducation ? formData?.MotherInfoDetails?.MotherEducation : null);
    const [MotherEducationSubject, setMotherEducationSubject] = useState(formData?.MotherInfoDetails?.MotherEducationSubject ? formData?.MotherInfoDetails?.MotherEducationSubject : null);
    const [MotherProfession, setMotherProfession] = useState(formData?.MotherInfoDetails?.MotherProfession ? formData?.MotherInfoDetails?.MotherProfession : null);
    const [LBTypeName, setLBTypeName] = useState(formData?.MotherInfoDetails?.LBTypeName ? formData?.MotherInfoDetails?.LBTypeName : null);
    const [StateName, setStateName] = useState(formData?.MotherInfoDetails?.StateName ? formData?.MotherInfoDetails?.StateName : null);
    const [MotherDistrict, setMotherDistrict] = useState(formData?.MotherInfoDetails?.MotherDistrict ? formData?.MotherInfoDetails?.MotherDistrict : null);
    const [MotherAgeDeleivery, setMotherAgeDeleivery] = useState(formData?.MotherInfoDetails?.MotherAgeDeleivery ? formData?.MotherInfoDetails?.MotherAgeDeleivery : null);
    const [MotherAgeMarriage, setMotherAgeMarriage] = useState(formData?.MotherInfoDetails?.MotherAgeMarriage ? formData?.MotherInfoDetails?.MotherAgeMarriage : "");
    const [MotherDOB, setMotherDOB] = useState(formData?.MotherInfoDetails?.MotherDOB ? formData?.MotherInfoDetails?.MotherDOB : "");
    const [MotherMaritalStatus, setMotherMaritalStatus] = useState(formData?.MotherInfoDetails?.MotherMaritalStatus ? formData?.MotherInfoDetails?.MotherMaritalStatus : null);
    // const [MotherNoOfBirths, setMotherNoOfBirths] = useState(formData?.MotherInfoDetails?.MotherNoOfBirths);
    const [OrderofChildren, setOrderofChildren] = useState(formData?.MotherInfoDetails?.OrderofChildren ? formData?.MotherInfoDetails?.OrderofChildren : "");
    const [MotherResPlace, setMotherResPlace] = useState(formData?.MotherInfoDetails?.MotherResPlace ? formData?.MotherInfoDetails?.MotherResPlace : "");
    const [MotherPlaceNameEn, setMotherPlaceNameEn] = useState(formData?.MotherInfoDetails?.MotherPlaceNameEn ? formData?.MotherInfoDetails?.MotherPlaceNameEn : "");
    const [MotherPlaceNameMl, setMotherPlaceNameMl] = useState(formData?.MotherInfoDetails?.MotherPlaceNameMl ? formData?.MotherInfoDetails?.MotherPlaceNameMl : "");
    const [MotherPlaceType, setMotherPlaceType] = useState(formData?.MotherInfoDetails?.MotherPlaceType ? formData?.MotherInfoDetails?.MotherPlaceType : null);
    const [MotherLBName, setMotherLBName] = useState(formData?.MotherInfoDetails?.MotherLBName ? formData?.MotherInfoDetails?.MotherLBName : null);
    const [MotherNationality, setMotherNationality] = useState(formData?.MotherInfoDetails?.MotherNationality ? formData?.MotherInfoDetails?.MotherNationality : null);
    const [MotherCountry, setMotherCountry] = useState(formData?.MotherInfoDetails?.MotherCountry ? formData?.MotherInfoDetails?.MotherCountry : null);
    const [MotherTaluk, setMotherTaluk] = useState(formData?.MotherInfoDetails?.MotherTaluk ? formData?.MotherInfoDetails?.MotherTaluk : null);
    const [isMotherInfo, setIsMotherInfo] = useState(formData?.MotherInfoDetails?.isMotherInfo ? formData?.MotherInfoDetails?.isMotherInfo : false);
    // const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [toast, setToast] = useState(false);
    const [MotherAadharError, setMotherAadharError] = useState(formData?.MotherInfoDetails?.MotherAadhar ? false : false);
    const [MotherMobileError, setMotherMobileError] = useState(formData?.MotherInfoDetails?.MotherMobile ? false : false);
    const [MotherEducationError, setMotherEducationError] = useState(formData?.MotherInfoDetails?.MotherEducation ? false : false);
    const [MotherProfessionError, setMotherProfessionError] = useState(formData?.MotherInfoDetails?.MotherProfession ? false : false);
    const [MotherNationalityError, setMotherNationalityError] = useState(formData?.MotherInfoDetails?.MotherNationality ? false : false);
    const [MotherMaritalStatusError, setMotherMaritalStatusError] = useState(formData?.MotherInfoDetails?.MotherMaritalStatus ? false : false);
    const [MotherCountryError, setMotherCountryError] = useState(formData?.MotherInfoDetails?.MotherCountry ? false : false);
    const [MotherStateError, setMotherStateError] = useState(formData?.MotherInfoDetails?.StateName ? false : false);
    const [MotherDistrictError, setMotherDistrictError] = useState(formData?.MotherInfoDetails?.MotherDistrict ? false : false);
    const [MotherLBNameError, setMotherLBNameError] = useState(formData?.MotherInfoDetails?.MotherLBName ? false : false);
    const [MotherTalukError, setMotherTalukError] = useState(formData?.MotherInfoDetails?.MotherTaluk ? false : false);
    const [MotherPlaceTypeError, setMotherPlaceTypeError] = useState(formData?.MotherInfoDetails?.MotherPlaceType ? false : false);
    const [MotherAgeMarriageError, setMotherAgeMarriageError] = useState(formData?.MotherInfoDetails?.MotherAgeMarriage ? false : false);
    const [OrderofChildrenError, setOrderofChildrenError] = useState(formData?.MotherInfoDetails?.OrderofChildren ? false : false);
    const [AgeMariageStatusHide, setAgeMariageStatus] = useState(formData?.MotherInfoDetails?.MotherMaritalStatus ? formData?.MotherInfoDetails?.MotherMaritalStatus : null);

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
    let cmbState = [];
    State &&
        State["common-masters"] &&
        State["common-masters"].State.map((ob) => {
            cmbState.push(ob);
        });
    let cmbDistrict = [];
    District &&
        District["common-masters"] &&
        District["common-masters"].District.map((ob) => {
            cmbDistrict.push(ob);
        });
    let cmbLBType = [];
    LBType &&
        LBType["common-masters"] &&
        LBType["common-masters"].LBType.map((ob) => {
            cmbLBType.push(ob);
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
    let cmbTaluk = [];
    Taluk &&
        Taluk["common-masters"] &&
        Taluk["common-masters"].Taluk.map((ob) => {
            cmbTaluk.push(ob);
        });
    let cmbLB = [];
    LocalBodies &&
        LocalBodies["tenant"] &&
        LocalBodies["tenant"].tenants.map((ob) => {
            cmbLB.push(ob);
        });
    const onSkip = () => onSelect();
    let cmbfilterNation = [];
    let cmbfilterCountry = [];
    let cmbfilterState = [];
    useEffect(() => {
        if (MotherNationality == null || MotherNationality == '') {
            if (stateId === "kl" && cmbNation.length > 0) {
                cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes('Indian'));
                setMotherNationality(cmbfilterNation[0]);
            }
        }
        if (MotherCountry == null || MotherCountry == '') {
            if (stateId === "kl" && cmbNation.length > 0) {
                cmbfilterCountry = cmbNation.filter((cmbNation) => cmbNation.name.includes('India'));
                setMotherCountry(cmbfilterCountry[0]);
            }
        }
        if (StateName == null || StateName == '') {
            if (stateId === "kl" && cmbState.length > 0) {
                cmbfilterState = cmbState.filter((cmbState) => cmbState.name.includes('Kerala'));
                setStateName(cmbfilterState[0]);
            }
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
    function setSelectMotherMiddleNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherMiddleNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectMotherLastNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
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
    function setSelectMotherMiddleNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherMiddleNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
        }
    }
    function setSelectMotherLastNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherLastNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
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
    function setSelectMotherEmail(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherEmail(e.target.value);
        }
    }
    function setSelectMotherMobile(e) {
        if (e.target.value.length != 0) {

            if (e.target.value.length > 10) {
                setMotherMobileError(true);
            } else if (e.target.value.length < 10) {
                setMotherMobileError(true);
                setMotherMobile(e.target.value);
                return false;
            }
            else {
                setMotherMobileError(false);
                setMotherMobile(e.target.value);
                return true;
            }
        } else {
            setMotherMobileError(false);
            setMotherMobile(e.target.value);
            return true;
        }
    }
    function setSelectMotherPassportNo(e) {
        if (e.target.value.length === 21) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setMotherPassportNo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
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
    function setSelectMotherAgeMarriage(e) {
        if (e.target.value != null || e.target.value != "") {

            if (e.target.value.length <= 3) {
                if (e.target.value < 12) {
                    setMotherAgeMarriage(e.target.value);
                    setMotherAgeMarriageError(true);
                    return false;
                }
                else {
                    setMotherAgeMarriage(e.target.value);
                    setMotherAgeMarriageError(false);
                }
            } else {
                console.log(e.target.value.length);
                setMotherAgeMarriageError(true);
                return false;

            }
        }
    }
    function setselectMotherDOB(value) {
        setMotherDOB(value);
        // const today = new Date();
        // const birthDate = new Date(value);
        // let age_in_ms = today - birthDate;
        // let age_in_years = age_in_ms / (1000 * 60 * 60 * 24 * 365);
        // setMotherAgeMarriage(Math.floor(age_in_years));
    }
    function setSelectMotherMaritalStatus(value) {
        setMotherMaritalStatus(value);
        setAgeMariageStatus(value.code);
    }
    // function setSelectMotherNoOfBirths(e) {
    //     setMotherNoOfBirths(e.target.value);
    // }
    function setSelectOrderofChildren(e) {
        if (e.target.value.length === 3) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setOrderofChildren(e.target.value);
        }

    }


    function setSelectMotherResPlace(e) {
        setMotherResPlace(e.target.value);
    }
    function setSelectMotherPlaceNameEn(e) {
        setMotherPlaceNameEn(e.target.value);
    }
    function setSelectMotherPlaceNameMl(e) {
        setMotherPlaceNameMl(e.target.value);
    }
    function setSelectMotherPlaceType(value) {
        setMotherPlaceType(value);
    }
    function setSelectMotherNationality(value) {
        setMotherNationality(value);
    }
    function setSelectMotherTaluk(value) {
        setMotherTaluk(value);
    }
    function setSelectMotherDistrict(value) {
        setIsInitialRender(true);
        setMotherDistrict(value);
        setMotherLBName(null);
        setLbs(null);
    }
    useEffect(() => {
        if (isInitialRender) {
            if (MotherDistrict) {
                setIsInitialRender(false);
                setLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === MotherDistrict.districtid));
            }
        }
    }, [lbs, isInitialRender]);
    function setSelectMotherLBName(value) {
        setMotherLBName(value);
    }
    function setSelectMotherCountry(value) {
        setMotherCountry(value);
    }
    function setMotherInfo(e) {
        if (e.target.checked == true) {
            setIsMotherInfo(true);
        } else {
            setIsMotherInfo(false);
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
            if (MotherMobile != null || MotherMobile != '' || MotherMobile != undefined) {
                if (MotherMobileError) {
                    validFlag = false;
                    setMotherMobileError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                    // return false;
                    // window.alert("Username shouldn't exceed 10 characters")
                } else {
                    setMotherMobileError(false);
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
            if (MotherMaritalStatus == null || MotherMaritalStatus == '' || MotherMaritalStatus == undefined) {
                validFlag = false;
                setMotherMaritalStatusError(true);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 2000);
            } else {
                setMotherMaritalStatusError(false);
            }
            // if (MotherCountry == null || MotherCountry == '' || MotherCountry == undefined) {
            //     validFlag = false;
            //     setMotherCountryError(true);
            //     setToast(true);
            //     setTimeout(() => {
            //         setToast(false);
            //     }, 2000);
            // } else {
            //     setMotherCountryError(false);
            // }
            // if (StateName == null || StateName == '' || StateName == undefined) {
            //     validFlag = false;
            //     setMotherStateError(true);
            //     setToast(true);
            //     setTimeout(() => {
            //         setToast(false);
            //     }, 2000);
            // } else {
            //     setMotherStateError(false);
            // }
            // if (MotherDistrict == null || MotherDistrict == '' || MotherDistrict == undefined) {
            //     validFlag = false;
            //     setMotherDistrictError(true);
            //     setToast(true);
            //     setTimeout(() => {
            //         setToast(false);
            //     }, 2000);
            // } else {
            //     setMotherDistrictError(false);
            // }
            // if (MotherLBName == null || MotherLBName == '' || MotherLBName == undefined) {
            //     validFlag = false;
            //     setMotherLBNameError(true);
            //     setToast(true);
            //     setTimeout(() => {
            //         setToast(false);
            //     }, 2000);
            // } else {
            //     setMotherLBNameError(false);
            // }
            // if (MotherTaluk == null || MotherTaluk == '' || MotherTaluk == undefined) {
            //     validFlag = false;
            //     setMotherTalukError(true);
            //     setToast(true);
            //     setTimeout(() => {
            //         setToast(false);
            //     }, 2000);
            // } else {
            //     setMotherTalukError(false);
            // }
            // console.log("MotherPlaceType" + MotherPlaceType);
            // if (MotherPlaceType == null || MotherPlaceType == '' || MotherPlaceType == undefined) {
            //     validFlag = false;
            //     setMotherPlaceTypeError(true);
            //     setToast(true);
            //     setTimeout(() => {
            //         setToast(false);
            //     }, 2000);
            // } else {
            //     setMotherPlaceTypeError(false);
            // }
            if (MotherAgeMarriage != null || MotherAgeMarriage != '' || MotherAgeMarriage != undefined) {
                if (MotherAgeMarriageError) {
                    validFlag = false;
                    setMotherAgeMarriageError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setMotherAgeMarriageError(false);
                }
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
        }

        if (validFlag == true) {
            sessionStorage.setItem("MotherFirstNameEn", MotherFirstNameEn ? MotherFirstNameEn : null);
            sessionStorage.setItem("MotherMiddleNameEn", MotherMiddleNameEn ? MotherMiddleNameEn : null);
            sessionStorage.setItem("MotherLastNameEn", MotherLastNameEn ? MotherLastNameEn : null);
            sessionStorage.setItem("MotherFirstNameMl", MotherFirstNameMl ? MotherFirstNameMl : null);
            sessionStorage.setItem("MotherMiddleNameMl", MotherMiddleNameMl ? MotherMiddleNameMl : null);
            sessionStorage.setItem("MotherLastNameMl", MotherLastNameMl ? MotherLastNameMl : null);
            sessionStorage.setItem("MotherAadhar", MotherAadhar ? MotherAadhar : null);
            sessionStorage.setItem("MotherPassportNo", MotherPassportNo ? MotherPassportNo : null);
            sessionStorage.setItem("MotherEmail", MotherEmail ? MotherEmail : null);
            sessionStorage.setItem("MotherMobile", MotherMobile ? MotherMobile : null);
            sessionStorage.setItem("MotherEducation", MotherEducation ? MotherEducation.code : null);
            sessionStorage.setItem("MotherEducationSubject", MotherEducationSubject ? MotherEducationSubject.code : null);
            sessionStorage.setItem("MotherProfession", MotherProfession ? MotherProfession.code : null);
            sessionStorage.setItem("MotherNationality", MotherNationality ? MotherNationality.code : null);
            // sessionStorage.setItem("MotherAgeDeleivery", MotherAgeDeleivery);
            sessionStorage.setItem("MotherAgeMarriage", MotherAgeMarriage ? MotherAgeMarriage : null);
            sessionStorage.setItem("MotherDOB", MotherDOB ? MotherDOB : null);
            sessionStorage.setItem("MotherMaritalStatus", MotherMaritalStatus ? MotherMaritalStatus : null);
            // sessionStorage.setItem("MotherNoOfBirths",MotherNoOfBirths ? MotherNoOfBirths : null);
            sessionStorage.setItem("OrderofChildren", OrderofChildren ? OrderofChildren : null);
            // sessionStorage.setItem("MotherResPlace", MotherResPlace ? MotherResPlace : null);
            // sessionStorage.setItem("MotherPlaceNameEn ", MotherPlaceNameEn ? MotherPlaceNameEn : null);
            // sessionStorage.setItem("MotherPlaceNameMl ", MotherPlaceNameMl);
            // sessionStorage.setItem("MotherPlaceType", MotherPlaceType ? MotherPlaceType.code : null);
            // sessionStorage.setItem("MotherLBName", MotherLBName ? MotherLBName.code : null);//MotherLBName.code
            // sessionStorage.setItem("LBTypeName", LBTypeName.code);
            // sessionStorage.setItem("MotherDistrict", MotherDistrict ? MotherDistrict.code : null);
            // sessionStorage.setItem("MotherTaluk", MotherTaluk ? MotherTaluk.code : null);
            // sessionStorage.setItem("StateName", StateName ? StateName.code : null);
            // sessionStorage.setItem("MotherCountry", MotherCountry ? MotherCountry.code : null);
            sessionStorage.setItem("isMotherInfo", isMotherInfo ? isMotherInfo : null);
            onSelect(config.key, {
                MotherFirstNameEn, MotherMiddleNameEn, MotherLastNameEn,
                MotherFirstNameMl, MotherMiddleNameMl, MotherLastNameMl, MotherAadhar, MotherPassportNo, MotherEmail, MotherMobile, MotherEducation, MotherProfession,
                MotherNationality, MotherAgeDeleivery, MotherDOB, OrderofChildren, MotherMaritalStatus,
                MotherAgeMarriage,
                isMotherInfo
            });
        }
    }
    if (isLoading || isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isStateLoading || isDistrictLoading || isLBTypeLoading || isCountryLoading || isTalukLoading || isNationLoad) {
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
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" >
                                <div className="col-md-4" >

                                    <CardLabel>{`${t("CR_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherFirstNameEn"
                                        value={MotherFirstNameEn}
                                        onChange={setSelectMotherFirstNameEn}
                                        disable={isMotherInfo} placeholder={`${t("CR_FIRST_NAME_EN")}`}
                                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherMiddleNameEn"
                                        value={MotherMiddleNameEn}
                                        onChange={setSelectMotherMiddleNameEn}
                                        disable={isMotherInfo} placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherLastNameEn"
                                        value={MotherLastNameEn}
                                        onChange={setSelectMotherLastNameEn}
                                        disable={isMotherInfo} placeholder={`${t("CR_LAST_NAME_EN")}`}
                                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" >
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherFirstNameMl"
                                        value={MotherFirstNameMl}
                                        onChange={setSelectMotherFirstNameMl}
                                        disable={isMotherInfo} placeholder={`${t("CR_FIRST_NAME_ML")}`}
                                        {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherMiddleNameMl"
                                        value={MotherMiddleNameMl}
                                        onChange={setSelectMotherMiddleNameMl}
                                        disable={isMotherInfo} placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                                        {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherLastNameMl"
                                        value={MotherLastNameMl}
                                        onChange={setSelectMotherLastNameMl}
                                        disable={isMotherInfo} placeholder={`${t("CR_LAST_NAME_ML")}`}
                                        {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" >
                                {/* <div className="col-md-3" >
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
                        </div> */}
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_PASSPORT_NO")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="MotherPassportNo"
                                        value={MotherPassportNo}
                                        onChange={setSelectMotherPassportNo}
                                        disable={isMotherInfo} placeholder={`${t("CR_PASSPORT_NO")}`}
                                        style={{ textTransform: "uppercase" }}
                                        {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, title: t("CR_INVALID_PASSPORT_NO") })}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type="email"
                                        optionKey="i18nKey"
                                        name="MotherEmail"
                                        value={MotherEmail}
                                        onChange={setSelectMotherEmail}
                                        disable={isMotherInfo} placeholder={`${t("CR_EMAIL")}`}
                                        {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <TextInput
                                        t={t}
                                        isMandatory={false}
                                        type={"number"}
                                        optionKey="i18nKey"
                                        name="MotherMobile"
                                        value={MotherMobile}
                                        onChange={setSelectMotherMobile}
                                        disable={isMotherInfo} placeholder={`${t("CR_MOBILE_NO")}`}
                                        {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" >
                                <div className="col-md-3" >
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
                                <div className="col-md-3" >
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
                                <div className="col-md-3" >
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
                                

                                <div className="col-md-3" >
                                    <CardLabel>{`${t("CR_MOTHER_MARITAL_STATUS")}`}<span className="mandatorycss">*</span></CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="i18nKey"
                                        isMandatory={false}
                                        option={cmbMaritalStatus}
                                        selected={MotherMaritalStatus}
                                        select={setSelectMotherMaritalStatus}
                                        disabled={isMotherInfo} placeholder={`${t("CR_MOTHER_MARITAL_STATUS")}`}
                                    />
                                </div>
                                {/* <div className="col-md-4" >
                            <CardLabel>{`${t("CR_EDUCATION_SUBJECT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbQualificationSub}
                                selected={MotherEducationSubject}
                                select={setSelectMotherEducationSubject}
                                disabled={isMotherInfo} placeholder={`${t("CR_EDUCATION_SUBJECT")}`}
                            />
                        </div> */}
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-md-12" >
                                <div className="col-md-4" ><CardLabel>{t("CR_DATE_OF_BIRTH_TIME")}<span className="mandatorycss">*</span></CardLabel>
                                    <DatePicker date={MotherDOB} name="MotherDOB" onChange={setselectMotherDOB} placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`} />

                                </div>
                                {AgeMariageStatusHide === "MARRIED" && (
                                    <div className="col-md-4" >
                                        <CardLabel>{`${t("CR_AGE_OF_MARRIAGE")}`}<span className="mandatorycss">*</span></CardLabel>
                                        <TextInput
                                            t={t}
                                            isMandatory={false}
                                            type={"number"}
                                            optionKey="i18nKey"
                                            name="MotherAgeMarriage"
                                            value={MotherAgeMarriage}
                                            onChange={setSelectMotherAgeMarriage}
                                            disable={isMotherInfo} placeholder={`${t("CR_AGE_OF_MARRIAGE")}`}
                                            {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CR_INVALID_AGE_OF_MARRIAGE") })}
                                        />
                                    </div>)}

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
                            </div>
                        </div>


                        {/* <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_USUALLY_LIVES")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbCountry}
                                selected={MotherCountry}
                                select={setSelectMotherCountry}
                                disable={isMotherInfo} placeholder={`${t("CS_COMMON_COUNTRY")}`}
                            />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbState}
                                selected={StateName}
                                select={setSelectStateName}
                                disable={isMotherInfo} placeholder={`${t("CS_COMMON_STATE")}`}
                            />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CS_COMMON_DISTRICT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbDistrict}
                                selected={MotherDistrict}
                                select={setSelectMotherDistrict}
                                disabled={isMotherInfo} placeholder={`${t("CS_COMMON_DISTRICT")}`}
                            />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CS_COMMON_LB_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={lbs}
                                selected={MotherLBName}
                                select={setSelectMotherLBName}
                                disable={isMotherInfo} placeholder={`${t("CS_COMMON_LB_NAME")}`}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CS_COMMON_TALUK")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={MotherTaluk} select={setSelectMotherTaluk}
                                disable={isMotherInfo} placeholder={`${t("CS_COMMON_TALUK")}`} />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CR_PLACE_TYPE_URBAN_PLACE_TYPE_RURAL")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="i18nKey"
                                isMandatory={false}
                                option={cmbUrbanRural}
                                selected={MotherPlaceType}
                                select={setSelectMotherPlaceType} placeholder={`${t("CR_PLACE_TYPE_URBAN_PLACE_TYPE_RURAL")}`}
                                disable={isMotherInfo}
                            />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CR_MOTHERS_RESIDENTIAL_PLACE_LONGER_YEAR")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"number"}
                                optionKey="i18nKey"
                                name="MotherResPlace"
                                value={MotherResPlace}
                                onChange={setSelectMotherResPlace}
                                disable={isMotherInfo} placeholder={`${t("CR_MOTHERS_RESIDENTIAL_PLACE_LONGER_YEAR")}`}
                                {...(validation = { pattern:  "^[.0-9`' ]*$", type: "number", isRequired: true, title: t("CR_INVALID_MOTHERS_RESIDENTIAL_PLACE_LONGER_YEAR") })}
                            />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CR_PLACE_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="MotherPlaceNameEn"
                                value={MotherPlaceNameEn}
                                onChange={setSelectMotherPlaceNameEn}
                                disable={isMotherInfo} placeholder={`${t("CR_PLACE_NAME_EN")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", type: "text", isRequired: true, title: t("CR_INVALID_PLACE_NAME_EN") })}
                            />
                        </div>
                    </div>
                </div> */}
                    </div>)}
                {toast && (
                    <Toast
                        error={
                            MotherAadharError || MotherMobileError || MotherEducationError || MotherProfessionError || MotherNationalityError || MotherMaritalStatusError
                            // || MotherMaritalStatusError || MotherCountryError || MotherStateError || MotherDistrictError || MotherLBNameError  || MotherTalukError || MotherPlaceTypeError
                            || MotherAgeMarriageError || OrderofChildrenError

                        }
                        label={
                            (MotherAadharError || MotherMobileError || MotherEducationError || MotherProfessionError || MotherNationalityError || MotherMaritalStatusError
                                // || MotherCountryError || MotherStateError || MotherDistrictError || MotherLBNameError || MotherTalukError || MotherPlaceTypeError 
                                || OrderofChildrenError || MotherAgeMarriageError
                                ?
                                (MotherAadharError ? t(`CS_COMMON_INVALID_AADHAR_NO`) : MotherMobileError ? t(`CR_INVALID_MOBILE_NO`) : MotherEducationError ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                                    : MotherProfessionError ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`) : MotherNationalityError ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`) : MotherMaritalStatusError ? t(`BIRTH_ERROR_MOTHER_MARITIAL_CHOOSE`)
                                        //   : MotherCountryError ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`) : MotherStateError ? t(`BIRTH_ERROR_STATE_CHOOSE`)
                                        //         : MotherDistrictError ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`) : MotherLBNameError ? t(`BIRTH_ERROR_LBNAME_CHOOSE`)  : MotherTalukError ? t(`BIRTH_ERROR_TALUK_CHOOSE`) : MotherPlaceTypeError ? t(`BIRTH_ERROR_URBAN_CHOOSE`)
                                        : MotherAgeMarriageError ? t(`BIRTH_ERROR_MOTHER_AGE`) : OrderofChildrenError ? t(`BIRTH_ERROR_ORDER_OF_CHILDREN`)
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
export default MotherInformation;
