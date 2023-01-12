import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton,CheckBox  } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const FatherInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
    const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
    const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [FatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.FatherInfoDetails?.FatherFirstNameEn);
    const [FatherMiddleNameEn, setFatherMiddleNameEn] = useState(formData?.FatherInfoDetails?.FatherMiddleNameEn);
    const [FatherLastNameEn, setFatherLastNameEn] = useState(formData?.FatherInfoDetails?.FatherLastNameEn);
    const [FatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.FatherInfoDetails?.FatherFirstNameMl);
    const [FatherMiddleNameMl, setFatherMiddleNameMl] = useState(formData?.FatherInfoDetails?.FatherMiddleNameMl);
    const [FatherLastNameMl, setFatherLastNameMl] = useState(formData?.FatherInfoDetails?.FatherLastNameMl);
    const [FatherAadhar, setFatherAadhar] = useState(formData?.FatherInfoDetails?.FatherAadhar);
    const [FatherPassportNo, setFatherPassportNo] = useState(formData?.FatherInfoDetails?.FatherPassportNo);
    const [FatherEmail, setFatherEmail] = useState(formData?.FatherInfoDetails?.FatherEmail);
    const [FatherMobile, setFatherMobile] = useState(formData?.FatherInfoDetails?.FatherMobile);
    const [FatherEducation, setFatherEducation] = useState(formData?.FatherInfoDetails?.FatherEducation);
    const [FatherEducationSubject, setFatherEducationSubject] = useState(formData?.FatherInfoDetails?.FatherEducationSubject);
    const [FatherProfession, setFatherProfession] = useState(formData?.FatherInfoDetails?.FatherProfession);
    const [FatherNationality, setFatherNationality] = useState(formData?.FatherInfoDetails?.FatherNationality);
    const [isFatherInfo, setIsFatherInfo] = useState(formData?.FatherInfoDetails?.isFatherInfo);
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
    const onSkip = () => onSelect();

    function setSelectFatherFirstNameEn(e) {
        setFatherFirstNameEn(e.target.value);
    }
    function setSelectFatherMiddleNameEn(e) {
        setFatherMiddleNameEn(e.target.value);
    }
    function setSelectFatherLastNameEn(e) {
        setFatherLastNameEn(e.target.value);
    }
    function setSelectFatherFirstNameMl(e) {
        setFatherFirstNameMl(e.target.value);
    }
    function setSelectFatherMiddleNameMl(e) {
        setFatherMiddleNameMl(e.target.value);
    }
    function setSelectFatherLastNameMl(e) {
        setFatherLastNameMl(e.target.value);
    }
    function setSelectFatherAadhar(e) {
        setFatherAadhar(e.target.value);
    }
    function setSelectFatherPassportNo(e) {
        setFatherPassportNo(e.target.value);
    }
    function setSelectFatherEmail(e) {
        setFatherEmail(e.target.value);
    }
    function setSelectFatherMobile(e) {
        setFatherMobile(e.target.value);
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
          setIsFatherInfo(true);
        } else {
          setIsFatherInfo(false);
        }
      }
    const goNext = () => {
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
        sessionStorage.setItem("isFatherInfo",isFatherInfo ? isFatherInfo : null);
        onSelect(config.key, {
            FatherFirstNameEn, FatherMiddleNameEn, FatherLastNameEn,
            FatherFirstNameMl, FatherMiddleNameMl, FatherLastNameMl, FatherAadhar, FatherPassportNo, FatherEmail, 
            FatherMobile, FatherEducation, FatherEducationSubject, FatherProfession, FatherNationality,isFatherInfo
        });
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
                    <div className="col-md-6" >                      
                        <CheckBox label={t("Father Information Missing")} onChange={setFatherInfo} value={isFatherInfo} checked={isFatherInfo} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_INFORMATION")}`}</span> </h1>
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
                        <div className="col-md-4" ><CardLabel>{`${t("CR_LAST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherLastNameEn" value={FatherLastNameEn} 
                            onChange={setSelectFatherLastNameEn} disable={isFatherInfo} placeholder={`${t("CR_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_FIRST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherFirstNameMl" value={FatherFirstNameMl} 
                            onChange={setSelectFatherFirstNameMl} disable={isFatherInfo} placeholder={`${t("CR_FIRST_NAME_ML")}`}  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherMiddleNameMl" value={FatherMiddleNameMl} 
                            onChange={setSelectFatherMiddleNameMl} disable={isFatherInfo} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })} />
                        </div>
                        <div className="col-md-4"><CardLabel>{`${t("CR_LAST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherLastNameMl" value={FatherLastNameMl} 
                            onChange={setSelectFatherLastNameMl} disable={isFatherInfo} placeholder={`${t("CR_LAST_NAME_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })} />
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
                                selected={FatherNationality}
                                select={setSelectFatherNationality}
                                disable={isFatherInfo}
                            />
                        </div>
                        <div className="col-md-2" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherAadhar" value={FatherAadhar}
                             onChange={setSelectFatherAadhar} disable={isFatherInfo} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>

                        <div className="col-md-2" >  <CardLabel>{`${t("CR_PASSPORT_NO")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"
                                name="FatherPassportNo"
                                value={FatherPassportNo}
                                onChange={setSelectFatherPassportNo}
                                disable={isFatherInfo} placeholder={`${t("CR_PASSPORT_NO")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, title: t("CR_INVALID_PASSPORT_NO") })}
                            />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="FatherEmail" value={FatherEmail} 
                            onChange={setSelectFatherEmail} disable={isFatherInfo} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                       
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherMobile" value={FatherMobile} 
                            onChange={setSelectFatherMobile} disable={isFatherInfo} placeholder={`${t("CR_EMAIL")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
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
