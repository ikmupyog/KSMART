import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const FatherInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const { t } = useTranslation();
    let validation = {};
    const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
    const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [FatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.FatherInfoDetails?.FatherFirstNameEn ? formData?.FatherInfoDetails?.FatherFirstNameEn : "");
    const [FatherMiddleNameEn, setFatherMiddleNameEn] = useState(formData?.FatherInfoDetails?.FatherMiddleNameEn ? formData?.FatherInfoDetails?.FatherMiddleNameEn : "");
    const [FatherLastNameEn, setFatherLastNameEn] = useState(formData?.FatherInfoDetails?.FatherLastNameEn ? formData?.FatherInfoDetails?.FatherLastNameEn : "");
    const [FatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.FatherInfoDetails?.FatherFirstNameMl ? formData?.FatherInfoDetails?.FatherFirstNameMl : "");
    const [FatherMiddleNameMl, setFatherMiddleNameMl] = useState(formData?.FatherInfoDetails?.FatherMiddleNameMl ? formData?.FatherInfoDetails?.FatherMiddleNameMl : "");
    const [FatherLastNameMl, setFatherLastNameMl] = useState(formData?.FatherInfoDetails?.FatherLastNameMl ? formData?.FatherInfoDetails?.FatherLastNameMl : "");
    const [FatherAadhar, setFatherAadhar] = useState(formData?.FatherInfoDetails?.FatherAadhar ? formData?.FatherInfoDetails?.FatherAadhar : "");
    const [FatherPassportNo, setFatherPassportNo] = useState(formData?.FatherInfoDetails?.FatherPassportNo ? formData?.FatherInfoDetails?.FatherPassportNo : "");
    const [FatherEmail, setFatherEmail] = useState(formData?.FatherInfoDetails?.FatherEmail ? formData?.FatherInfoDetails?.FatherEmail : "");
    const [FatherMobile, setFatherMobile] = useState(formData?.FatherInfoDetails?.FatherMobile ? formData?.FatherInfoDetails?.FatherMobile : "");
    const [FatherEducation, setFatherEducation] = useState(formData?.FatherInfoDetails?.FatherEducation ? formData?.FatherInfoDetails?.FatherEducation : null);
    const [FatherEducationSubject, setFatherEducationSubject] = useState(formData?.FatherInfoDetails?.FatherEducationSubject);
    const [FatherProfession, setFatherProfession] = useState(formData?.FatherInfoDetails?.FatherProfession ? formData?.FatherInfoDetails?.FatherProfession : null);
    const [FatherNationality, setFatherNationality] = useState(formData?.FatherInfoDetails?.FatherNationality ? formData?.FatherInfoDetails?.FatherNationality : null);
    const [isFatherInfo, setIsFatherInfo] = useState(formData?.FatherInfoDetails?.isFatherInfo ? formData?.FatherInfoDetails?.isFatherInfo : false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [toast, setToast] = useState(false);

    const [FatherAadharError, setFatherAadharError] = useState(formData?.FatherInfoDetails?.FatherAadhar ? false : false);
    const [FatherMobileError, setFatherMobileError] = useState(formData?.FatherInfoDetails?.FatherAadhar ? false : false);
    const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.FatherInfoDetails?.FatherFirstNameEn ? false : false);
    const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.FatherInfoDetails?.FatherFirstNameMl ? false : false);
    const [FatherEduError, setFatherEduError] = useState(formData?.FatherInfoDetails?.FatherEducation ? false : false);
    const [FatherProfError, setFatherProfError] = useState(formData?.FatherInfoDetails?.FatherProfession ? false : false);

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
    let cmbNation = [];
    Nation &&
        Nation["common-masters"] &&
        Nation["common-masters"].Country.map((ob) => {
            cmbNation.push(ob);
        });
    let cmbfilterNation = [];

    useEffect(() => {
        if (stateId === "kl" && cmbNation.length > 0) {
            cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes('Indian'));
            setFatherNationality(cmbfilterNation[0]);

        }
    }, [Nation])
    const onSkip = () => onSelect();

    function setSelectFatherFirstNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
        }
    }
    function setSelectFatherMiddleNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherMiddleNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
        }
    }
    function setSelectFatherLastNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
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
    function setSelectFatherMiddleNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherMiddleNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
        }
    }
    function setSelectFatherLastNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherLastNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
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
    function setSelectFatherPassportNo(e) {
        if (e.target.value.length === 21) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setFatherPassportNo(e.target.value);
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
    function setSelectFatherEducation(value) {
        setFatherEducation(value);
    }
    function setSelectFatherEducationSubject(value) {
        setFatherEducationSubject(value);
    }
    function setSelectFatherProfession(value) {
        setFatherProfession(value);
    }
    function setSelectFatherNationality(value) {
        setFatherNationality(value);
    }
    function setFatherInfo(e) {
        if (e.target.checked == true) {
            setIsFatherInfo(e.target.checked);
            setFatherAadhar("");
            setFatherFirstNameEn("");
            setFatherMiddleNameEn("");
            setFatherLastNameEn("");
            setFatherFirstNameMl("");
            setFatherMiddleNameMl("");
            setFatherLastNameMl("");
            setFatherNationality(null);
            setFatherPassportNo("");
            setFatherMobile("");
            setFatherEmail("");
            setFatherEducation(null);
            setFatherProfession(null);
        } else {
            setIsFatherInfo(e.target.checked);
        }
    }
    let validFlag = true;
    const goNext = () => {
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
            }
        }
        if (validFlag == true) {
            sessionStorage.setItem("FatherFirstNameEn", FatherFirstNameEn ? FatherFirstNameEn : null);
            sessionStorage.setItem("FatherMiddleNameEn", FatherMiddleNameEn ? FatherMiddleNameEn : null);
            sessionStorage.setItem("FatherLastNameEn", FatherLastNameEn ? FatherLastNameEn : null);
            sessionStorage.setItem("FatherFirstNameMl", FatherFirstNameMl ? FatherFirstNameMl : null);
            sessionStorage.setItem("FatherMiddleNameMl", FatherMiddleNameMl ? FatherMiddleNameMl : null);
            sessionStorage.setItem("FatherLastNameMl", FatherLastNameMl ? FatherLastNameMl : null);
            sessionStorage.setItem("FatherAadhar", FatherAadhar ? FatherAadhar : null);
            sessionStorage.setItem("FatherPassportNo", FatherPassportNo ? FatherPassportNo : null);
            sessionStorage.setItem("FatherEmail", FatherEmail ? FatherEmail : null);
            sessionStorage.setItem("FatherMobile", FatherMobile ? FatherMobile : null);
            sessionStorage.setItem("FatherEducation", FatherEducation ? FatherEducation.code : null);
            sessionStorage.setItem("FatherEducationSubject", FatherEducationSubject ? FatherEducationSubject.code : null);
            sessionStorage.setItem("FatherProfession", FatherProfession ? FatherProfession.code : null);
            sessionStorage.setItem("FatherNationality", FatherNationality ? FatherNationality.code : null);
            sessionStorage.setItem("isFatherInfo", isFatherInfo ? isFatherInfo : null);
            onSelect(config.key, {
                FatherFirstNameEn, FatherMiddleNameEn, FatherLastNameEn,
                FatherFirstNameMl, FatherMiddleNameMl, FatherLastNameMl, FatherAadhar, FatherPassportNo, FatherEmail,
                FatherMobile, FatherEducation, FatherEducationSubject, FatherProfession, FatherNationality, isFatherInfo
            });
        }
    }
    if (isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isNationLoad) {
        return <Loader></Loader>;
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            {/* isDisabled={!FatherFirstNameEn} */}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ></h1>
                    </div>
                </div>
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
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherFirstNameEn"
                                value={FatherFirstNameEn} onChange={setSelectFatherFirstNameEn} disable={isFatherInfo} placeholder={`${t("CR_FIRST_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherMiddleNameEn"
                                value={FatherMiddleNameEn} onChange={setSelectFatherMiddleNameEn} disable={isFatherInfo} placeholder={`${t("CR_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherLastNameEn" value={FatherLastNameEn}
                                onChange={setSelectFatherLastNameEn} disable={isFatherInfo} placeholder={`${t("CR_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_FIRST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherFirstNameMl" value={FatherFirstNameMl}
                                onChange={setSelectFatherFirstNameMl} disable={isFatherInfo} placeholder={`${t("CR_FIRST_NAME_ML")}`}  {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherMiddleNameMl" value={FatherMiddleNameMl}
                                onChange={setSelectFatherMiddleNameMl} disable={isFatherInfo} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })} />
                        </div>
                        <div className="col-md-4"><CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherLastNameMl" value={FatherLastNameMl}
                                onChange={setSelectFatherLastNameMl} disable={isFatherInfo} placeholder={`${t("CR_LAST_NAME_ML")}`} {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-3" >
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
                        <div className="col-md-3" >  <CardLabel>{`${t("CR_PASSPORT_NO")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"
                                name="FatherPassportNo"
                                value={FatherPassportNo}
                                onChange={setSelectFatherPassportNo}
                                disable={isFatherInfo} placeholder={`${t("CR_PASSPORT_NO")}`}
                                style={{ textTransform: "uppercase" }}
                                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, title: t("CR_INVALID_PASSPORT_NO") })}
                            />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="FatherEmail" value={FatherEmail}
                                onChange={setSelectFatherEmail} disable={isFatherInfo} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"number"} optionKey="i18nKey" name="FatherMobile" value={FatherMobile}
                                onChange={setSelectFatherMobile} disable={isFatherInfo} placeholder={`${t("CR_MOBILE_NO")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >


                        <div className="col-md-3" ><CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualification} selected={FatherEducation}
                                select={setSelectFatherEducation} disable={isFatherInfo} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={FatherProfession}
                                select={setSelectFatherProfession} disable={isFatherInfo} />
                        </div>
                    </div>
                </div>
                </div>)}
                {toast && (
                    <Toast
                        error={
                            FatherAadharError || FatherMobileError || FatherFirstNmeEnError || FatherEduError || FatherProfError
                            // || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||

                        }
                        label={
                            (FatherAadharError || FatherMobileError || FatherFirstNmeEnError || FatherEduError || FatherProfError
                                //  || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
                                // InstitutionError || SignedOfficerInstError || signedOfficerDesgInstError 
                                ?
                                (FatherAadharError ? t(`CS_COMMON_INVALID_AADHAR_NO`) : FatherMobileError ? t(`CR_INVALID_MOBILE_NO`) : FatherFirstNmeEnError ? t(`CR_INVALID_FIRST_NAME_EN`) : FatherEduError ? t(`BIRTH_ERROR_FATHER_EDUCATION_CHOOSE`) : FatherProfError ? t(`BIRTH_ERROR_FATHER_PROFESSION_CHOOSE`)
                                    // : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                                    // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                                    : setToast(false)
                                ) : setToast(false)
                            )
                        }

                        onClose={() => setToast(false)}
                    />
                )
                }{""}
                {/* <div className="row">
                    <div className="col-md-12" > */}

                {/* <div className="col-md-4" ><CardLabel>{`${t("CR_EDUCATION_SUBJECT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualificationSub} selected={FatherEducationSubject} 
                            select={setSelectFatherEducationSubject} disable={isFatherInfo} />
                        </div> */}

                {/* </div>
                </div> */}
            </FormStep>
        </React.Fragment>
    );
};
export default FatherInformation;
