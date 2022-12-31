import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BirthMotherInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
    const { data: Qualification = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
    const { data: Profession = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
    const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [BirthMotherFirstNameEn, setBirthMotherFirstNameEn] = useState(formData?.BirthMotherInfoDetails?.BirthMotherFirstNameEn);
    const [BirthMotherMiddleNameEn, setBirthMotherMiddleNameEn] = useState(formData?.BirthMotherInfoDetails?.BirthMotherMiddleNameEn);
    const [BirthMotherLastNameEn, setBirthMotherLastNameEn] = useState(formData?.BirthMotherInfoDetails?.BirthMotherLastNameEn);
    const [BirthMotherFirstNameMl, setBirthMotherFirstNameMl] = useState(formData?.BirthMotherInfoDetails?.BirthMotherFirstNameMl);
    const [BirthMotherMiddleNameMl, setBirthMotherMiddleNameMl] = useState(formData?.BirthMotherInfoDetails?.BirthMotherMiddleNameMl);
    const [BirthMotherLastNameMl, setBirthMotherLastNameMl] = useState(formData?.BirthMotherInfoDetails?.BirthMotherLastNameMl);
    const [BirthMotherAadhar, setBirthMotherAadhar] = useState(formData?.BirthMotherInfoDetails?.BirthMotherAadhar);
    const [BirthMotherPassportNo, setBirthMotherPassportNo] = useState(formData?.BirthMotherInfoDetails?.BirthMotherPassportNo);
    const [BirthMotherEmail, setBirthMotherEmail] = useState(formData?.BirthMotherInfoDetails?.BirthMotherEmail);
    const [BirthMotherMobile, setBirthMotherMobile] = useState(formData?.BirthMotherInfoDetails?.BirthMotherMobile);
    const [BirthMotherEducation, setBirthMotherEducation] = useState(formData?.BirthMotherInfoDetails?.BirthMotherEducation);
    const [BirthMotherEducationSubject, setBirthMotherEducationSubject] = useState(formData?.BirthMotherInfoDetails?.BirthMotherEducationSubject);
    const [BirthMotherProfession, setBirthMotherProfession] = useState(formData?.BirthMotherInfoDetails?.BirthMotherProfession);
    const [BirthMotherNationality, setBirthMotherNationality] = useState(formData?.BirthMotherInfoDetails?.BirthMotherNationality);

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

    function setSelectBirthMotherFirstNameEn(e) {
        setBirthMotherFirstNameEn(e.target.value);
    }
    function setSelectBirthMotherMiddleNameEn(e) {
        setBirthMotherMiddleNameEn(e.target.value);
    }
    function setSelectBirthMotherLastNameEn(e) {
        setBirthMotherLastNameEn(e.target.value);
    }
    function setSelectBirthMotherFirstNameMl(e) {
        setBirthMotherFirstNameMl(e.target.value);
    }
    function setSelectBirthMotherMiddleNameMl(e) {
        setBirthMotherMiddleNameMl(e.target.value);
    }
    function setSelectBirthMotherLastNameMl(e) {
        setBirthMotherLastNameMl(e.target.value);
    }
    function setSelectBirthMotherAadhar(e) {
        setBirthMotherAadhar(e.target.value);
    }
    function setSelectBirthMotherPassportNo(e) {
        setBirthMotherPassportNo(e.target.value);
    }
    function setSelectBirthMotherEmail(e) {
        setBirthMotherEmail(e.target.value);
    }
    function setSelectBirthMotherMobile(e) {
        setBirthMotherMobile(e.target.value);
    }
    function setSelectBirthMotherEducation(value) {
        setBirthMotherEducation(value);
    }
    function setSelectBirthMotherEducationSubject(value) {
        setBirthMotherEducationSubject(value);
    }
    function setSelectBirthMotherProfession(value) {
        setBirthMotherProfession(value);
    }
    function setSelectBirthMotherNationality(value) {
        setBirthMotherNationality(value);
    }
    const goNext = () => {
        sessionStorage.setItem("BirthMotherFirstNameEn", BirthMotherFirstNameEn);
        sessionStorage.setItem("BirthMotherMiddleNameEn", BirthMotherMiddleNameEn);
        sessionStorage.setItem("BirthMotherLastNameEn", BirthMotherLastNameEn);
        sessionStorage.setItem("BirthMotherFirstNameMl", BirthMotherFirstNameMl);
        sessionStorage.setItem("BirthMotherMiddleNameMl", BirthMotherMiddleNameMl);
        sessionStorage.setItem("BirthMotherLastNameMl", BirthMotherLastNameMl);
        sessionStorage.setItem("BirthMotherAadhar", BirthMotherAadhar);
        sessionStorage.setItem("BirthMotherPassportNo", BirthMotherPassportNo.code);
        sessionStorage.setItem("BirthMotherEmail", BirthMotherEmail);
        sessionStorage.setItem("BirthMotherMobile", BirthMotherMobile);
        sessionStorage.setItem("BirthMotherEducation", BirthMotherEducation.code);
        sessionStorage.setItem("BirthMotherEducationSubject", BirthMotherEducationSubject.code);
        sessionStorage.setItem("BirthMotherProfession", BirthMotherProfession.code);
        sessionStorage.setItem("BirthMotherNationality", BirthMotherNationality.code);
        onSelect(config.key, {
            BirthMotherFirstNameEn, BirthMotherMiddleNameEn, BirthMotherLastNameEn,
            BirthMotherFirstNameMl, BirthMotherMiddleNameMl, BirthMotherLastNameMl, BirthMotherAadhar, BirthMotherPassportNo, BirthMotherEmail, BirthMotherMobile, BirthMotherEducation, BirthMotherEducationSubject, BirthMotherProfession, BirthMotherNationality
        });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthMotherFirstNameEn}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_MOTHER_INFORMATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherFirstNameEn"
                                value={BirthMotherFirstNameEn} onChange={setSelectBirthMotherFirstNameEn} disable={isEdit}  placeholder={`${t("CR_FIRST_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherMiddleNameEn" value={BirthMotherMiddleNameEn} onChange={setSelectBirthMotherMiddleNameEn} disable={isEdit}  placeholder={`${t("CR_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_LAST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherLastNameEn" value={BirthMotherLastNameEn} onChange={setSelectBirthMotherLastNameEn} disable={isEdit}  placeholder={`${t("CR_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })} />
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
                                selected={BirthMotherNationality}
                                select={setSelectBirthMotherNationality}
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherAadhar" value={BirthMotherAadhar} onChange={setSelectBirthMotherAadhar} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>

                        <div className="col-md-4" >  <CardLabel>{`${t("CR_PASSPORT_NO")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"
                                name="BirthMotherPassportNo"
                                value={BirthMotherPassportNo}
                                onChange={setSelectBirthMotherPassportNo}
                                disable={isEdit} placeholder={`${t("CR_PASSPORT_NO")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, title: t("CR_INVALID_PASSPORT_NO") })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >

                        <div className="col-md-6" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="BirthMotherEmail" value={BirthMotherEmail} onChange={setSelectBirthMotherEmail} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div>
                        <div className="col-md-6" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthMotherMobile" value={BirthMotherMobile} onChange={setSelectBirthMotherMobile} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualification} selected={BirthMotherEducation} select={setSelectBirthMotherEducation} disabled={isEdit} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_EDUCATION_SUBJECT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualificationSub} selected={BirthMotherEducationSubject} select={setSelectBirthMotherEducationSubject} disabled={isEdit} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={BirthMotherProfession} select={setSelectBirthMotherProfession} disabled={isEdit} />
                        </div>
                    </div>
                </div>
            </FormStep>
        </React.Fragment>
    );
};
export default  BirthMotherInformation;
