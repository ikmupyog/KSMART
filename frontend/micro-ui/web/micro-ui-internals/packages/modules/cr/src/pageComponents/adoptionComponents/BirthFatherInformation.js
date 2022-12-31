import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BirthFatherInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
    const { data: Qualification = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
    const { data: Profession = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
    const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [BirthFatherFirstNameEn, setBirthFatherFirstNameEn] = useState(formData?.BirthFatherInfoDetails?.BirthFatherFirstNameEn);
    const [BirthFatherMiddleNameEn, setBirthFatherMiddleNameEn] = useState(formData?.BirthFatherInfoDetails?.BirthFatherMiddleNameEn);
    const [BirthFatherLastNameEn, setBirthFatherLastNameEn] = useState(formData?.BirthFatherInfoDetails?.BirthFatherLastNameEn);    
    const [BirthFatherAadhar, setBirthFatherAadhar] = useState(formData?.BirthFatherInfoDetails?.BirthFatherAadhar);
    const [BirthFatherPassportNo, setBirthFatherPassportNo] = useState(formData?.BirthFatherInfoDetails?.BirthFatherPassportNo);
    const [BirthFatherEmail, setBirthFatherEmail] = useState(formData?.BirthFatherInfoDetails?.BirthFatherEmail);
    const [BirthFatherMobile, setBirthFatherMobile] = useState(formData?.BirthFatherInfoDetails?.BirthFatherMobile);
    const [BirthFatherEducation, setBirthFatherEducation] = useState(formData?.BirthFatherInfoDetails?.BirthFatherEducation);
    const [BirthFatherEducationSubject, setBirthFatherEducationSubject] = useState(formData?.BirthFatherInfoDetails?.BirthFatherEducationSubject);
    const [BirthFatherProfession, setBirthFatherProfession] = useState(formData?.BirthFatherInfoDetails?.BirthFatherProfession);
    const [BirthFatherNationality, setBirthFatherNationality] = useState(formData?.BirthFatherInfoDetails?.BirthFatherNationality);

    let cmbPlace = [];
    place &&
        place["TradeLicense"] &&
        place["TradeLicense"].PlaceOfActivity.map((ob) => {
            cmbPlace.push(ob);
        });
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

    function setSelectBirthFatherFirstNameEn(e) {
        setBirthFatherFirstNameEn(e.target.value);
    }
    function setSelectBirthFatherMiddleNameEn(e) {
        setBirthFatherMiddleNameEn(e.target.value);
    }
    function setSelectBirthFatherLastNameEn(e) {
        setBirthFatherLastNameEn(e.target.value);
    }
    function setSelectBirthFatherFirstNameMl(e) {
        setBirthFatherFirstNameMl(e.target.value);
    }
    function setSelectBirthFatherMiddleNameMl(e) {
        setBirthFatherMiddleNameMl(e.target.value);
    }
    function setSelectBirthFatherLastNameMl(e) {
        setBirthFatherLastNameMl(e.target.value);
    }
    function setSelectBirthFatherAadhar(e) {
        setBirthFatherAadhar(e.target.value);
    }
    function setSelectBirthFatherPassportNo(e) {
        setBirthFatherPassportNo(e.target.value);
    }
    function setSelectBirthFatherEmail(e) {
        setBirthFatherEmail(e.target.value);
    }
    function setSelectBirthFatherMobile(e) {
        setBirthFatherMobile(e.target.value);
    }
    function setSelectBirthFatherEducation(value) {
        setBirthFatherEducation(value);
    }
    function setSelectBirthFatherEducationSubject(value) {
        setBirthFatherEducationSubject(value);
    }
    function setSelectBirthFatherProfession(value) {
        setBirthFatherProfession(value);
    }
    function setSelectBirthFatherNationality(value) {
        setBirthFatherNationality(value);
    }
    const goNext = () => {
        sessionStorage.setItem("BirthFatherFirstNameEn", BirthFatherFirstNameEn);
        sessionStorage.setItem("BirthFatherMiddleNameEn", BirthFatherMiddleNameEn);
        sessionStorage.setItem("BirthFatherLastNameEn", BirthFatherLastNameEn);
        sessionStorage.setItem("BirthFatherFirstNameMl", BirthFatherFirstNameMl);
        sessionStorage.setItem("BirthFatherMiddleNameMl", BirthFatherMiddleNameMl);
        sessionStorage.setItem("BirthFatherLastNameMl", BirthFatherLastNameMl);
        sessionStorage.setItem("BirthFatherAadhar", BirthFatherAadhar);
        sessionStorage.setItem("BirthFatherPassportNo", BirthFatherPassportNo.code);
        sessionStorage.setItem("BirthFatherEmail", BirthFatherEmail);
        sessionStorage.setItem("BirthFatherMobile", BirthFatherMobile);
        sessionStorage.setItem("BirthFatherEducation", BirthFatherEducation.code);
        sessionStorage.setItem("BirthFatherEducationSubject", BirthFatherEducationSubject.code);
        sessionStorage.setItem("BirthFatherProfession", BirthFatherProfession.code);
        sessionStorage.setItem("BirthFatherNationality", BirthFatherNationality.code);
        onSelect(config.key, {
            BirthFatherFirstNameEn, BirthFatherMiddleNameEn, BirthFatherLastNameEn,
            BirthFatherFirstNameMl, BirthFatherMiddleNameMl, BirthFatherLastNameMl, BirthFatherAadhar, BirthFatherPassportNo, BirthFatherEmail, BirthFatherMobile, BirthFatherEducation, BirthFatherEducationSubject, BirthFatherProfession, BirthFatherNationality
        });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthFatherFirstNameEn}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_MOTHER_INFORMATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthFatherFirstNameEn"
                                value={BirthFatherFirstNameEn} onChange={setSelectBirthFatherFirstNameEn} disable={isEdit}  placeholder={`${t("CR_FIRST_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthFatherMiddleNameEn" value={BirthFatherMiddleNameEn} onChange={setSelectBirthFatherMiddleNameEn} disable={isEdit}  placeholder={`${t("CR_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_LAST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthFatherLastNameEn" value={BirthFatherLastNameEn} onChange={setSelectBirthFatherLastNameEn} disable={isEdit}  placeholder={`${t("CR_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })} />
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
                                selected={BirthFatherNationality}
                                select={setSelectBirthFatherNationality}
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthFatherAadhar" value={BirthFatherAadhar} onChange={setSelectBirthFatherAadhar} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>

                        <div className="col-md-4" >  <CardLabel>{`${t("CR_PASSPORT_NO")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"
                                name="BirthFatherPassportNo"
                                value={BirthFatherPassportNo}
                                onChange={setSelectBirthFatherPassportNo}
                                disable={isEdit} placeholder={`${t("CR_PASSPORT_NO")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, title: t("CR_INVALID_PASSPORT_NO") })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >

                        <div className="col-md-6" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="BirthFatherEmail" value={BirthFatherEmail} onChange={setSelectBirthFatherEmail} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div>
                        <div className="col-md-6" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthFatherMobile" value={BirthFatherMobile} onChange={setSelectBirthFatherMobile} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualification} selected={BirthFatherEducation} select={setSelectBirthFatherEducation} disabled={isEdit} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_EDUCATION_SUBJECT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualificationSub} selected={BirthFatherEducationSubject} select={setSelectBirthFatherEducationSubject} disabled={isEdit} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={BirthFatherProfession} select={setSelectBirthFatherProfession} disabled={isEdit} />
                        </div>
                    </div>
                </div>
            </FormStep>
        </React.Fragment>
    );
};
export default  BirthFatherInformation;
