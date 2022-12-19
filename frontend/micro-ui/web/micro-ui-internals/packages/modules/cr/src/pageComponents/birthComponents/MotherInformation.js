import React, { useState,useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const MotherInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
    const { data: Qualification = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
    const { data: Profession = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
    const { data: State = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "mstate");
    const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
    const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [lbs, setLbs] = useState(0);
    const [MotherFirstNameEn, setMotherFirstNameEn] = useState(formData?.MotherInfoDetails?.MotherFirstNameEn);
    const [MotherMiddleNameEn, setMotherMiddleNameEn] = useState(formData?.MotherInfoDetails?.MotherMiddleNameEn);
    const [MotherLastNameEn, setMotherLastNameEn] = useState(formData?.MotherInfoDetails?.MotherLastNameEn);
    const [MotherFirstNameMl, setMotherFirstNameMl] = useState(formData?.MotherInfoDetails?.MotherFirstNameMl);
    const [MotherMiddleNameMl, setMotherMiddleNameMl] = useState(formData?.MotherInfoDetails?.MotherMiddleNameMl);
    const [MotherLastNameMl, setMotherLastNameMl] = useState(formData?.MotherInfoDetails?.MotherLastNameMl);
    const [MotherAadhar, setMotherAadhar] = useState(formData?.MotherInfoDetails?.MotherAadhar);
    const [MotherPassportNo, setMotherPassportNo] = useState(formData?.MotherInfoDetails?.MotherPassportNo);
    const [MotherEmail, setMotherEmail] = useState(formData?.MotherInfoDetails?.MotherEmail);
    const [MotherMobile, setMotherMobile] = useState(formData?.MotherInfoDetails?.MotherMobile);
    const [MotherEducation, setMotherEducation] = useState(formData?.MotherInfoDetails?.MotherEducation);
    const [MotherEducationSubject, setMotherEducationSubject] = useState(formData?.MotherInfoDetails?.MotherEducationSubject);
    const [MotherProfession, setMotherProfession] = useState(formData?.MotherInfoDetails?.MotherProfession);
    const [LBTypeName, setLBTypeName] = useState(formData?.MotherInfoDetails?.LBTypeName);
    const [StateName, setStateName] = useState(formData?.MotherInfoDetails?.StateName);
    const [MotherDistrict, setMotherDistrict] = useState(formData?.MotherInfoDetails?.MotherDistrict);
    const [MotherAgeDeleivery, setMotherAgeDeleivery] = useState(formData?.MotherInfoDetails?.MotherAgeDeleivery);
    const [MotherNoOfBirths, setMotherNoOfBirths] = useState(formData?.MotherInfoDetails?.MotherNoOfBirths);
    const [MotherPlaceType, setMotherPlaceType] = useState(formData?.MotherInfoDetails?.MotherPlaceType);
    const [MotherLBName, setMotherLBName] = useState(formData?.MotherInfoDetails?.MotherLBName);
    const [MotherNationality, setMotherNationality] = useState(formData?.MotherInfoDetails?.MotherNationality);
    const [MotherCountry, setMotherCountry] = useState(formData?.MotherInfoDetails?.MotherCountry);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const cmbUrbanRural = [
        { i18nKey: "Urban", code: "URBAN" },
        { i18nKey: "Rural", code: "RURAL" },
      ];
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
    let cmbState = [];
    State &&
        State["common-masters"] &&
        State["common-masters"].mstate.map((ob) => {
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
    const onSkip = () => onSelect();

    function setSelectMotherFirstNameEn(e) {
        setMotherFirstNameEn(e.target.value);
    }
    function setSelectMotherMiddleNameEn(e) {
        setMotherMiddleNameEn(e.target.value);
    }
    function setSelectMotherLastNameEn(e) {
        setMotherLastNameEn(e.target.value);
    }
    function setSelectMotherFirstNameMl(e) {
        setMotherFirstNameMl(e.target.value);
    }
    function setSelectMotherMiddleNameMl(e) {
        setMotherMiddleNameMl(e.target.value);
    }
    function setSelectMotherLastNameMl(e) {
        setMotherLastNameMl(e.target.value);
    }
    function setSelectMotherAadhar(e) {
        setMotherAadhar(e.target.value);
    }
    function setSelectMotherEmail(e) {
        setMotherEmail(e.target.value);
    }
    function setSelectMotherMobile(e) {
        setMotherMobile(e.target.value);
    }
    function setSelectMotherPassportNo(e) {
        setMotherPassportNo(e.target.value);
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
    function setSelectMotherNoOfBirths(e) {
        setMotherNoOfBirths(e.target.value);
    }
    function setSelectMotherPlaceType(value) {
        setMotherPlaceType(value);
    }
    function setSelectMotherNationality(value) {
        setMotherNationality(value);
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
                setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === MotherDistrict.districtid));
              }
            }
          }, [lbs, isInitialRender]);
    function setSelectMotherLBName(value) {
        setMotherLBName(value);
    }
    function setSelectMotherCountry(value) {
        setMotherCountry(value);
    }
    const goNext = () => {
        sessionStorage.setItem("MotherFirstNameEn", MotherFirstNameEn);
        sessionStorage.setItem("MotherMiddleNameEn", MotherMiddleNameEn);
        sessionStorage.setItem("MotherLastNameEn", MotherLastNameEn);
        sessionStorage.setItem("MotherFirstNameMl", MotherFirstNameMl);
        sessionStorage.setItem("MotherMiddleNameMl", MotherMiddleNameMl);
        sessionStorage.setItem("MotherLastNameMl", MotherLastNameMl);
        sessionStorage.setItem("MotherAadhar", MotherAadhar);
        sessionStorage.setItem("MotherPassportNo", MotherPassportNo);
        sessionStorage.setItem("MotherEmail", MotherEmail);
        sessionStorage.setItem("MotherMobile", MotherMobile);
        sessionStorage.setItem("MotherEducation", MotherEducation.code);
        sessionStorage.setItem("MotherEducationSubject", MotherEducationSubject.code);
        sessionStorage.setItem("MotherProfession", MotherProfession.code);
        sessionStorage.setItem("MotherNationality", MotherNationality.code);
        sessionStorage.setItem("MotherAgeDeleivery", MotherAgeDeleivery);
        sessionStorage.setItem("MotherNoOfBirths", MotherNoOfBirths);
        sessionStorage.setItem("MotherPlaceType", MotherPlaceType.code);
        sessionStorage.setItem("MotherLBName", null);//MotherLBName.code
        sessionStorage.setItem("LBTypeName", LBTypeName.code);
        sessionStorage.setItem("MotherDistrict", MotherDistrict.code);
        sessionStorage.setItem("StateName", StateName.code);
        sessionStorage.setItem("MotherCountry", MotherCountry.code);
        onSelect(config.key, {
            MotherFirstNameEn, MotherMiddleNameEn, MotherLastNameEn,
            MotherFirstNameMl, MotherMiddleNameMl, MotherLastNameMl, MotherAadhar, MotherPassportNo, MotherEmail, MotherMobile, MotherEducation, MotherEducationSubject, MotherProfession,
            MotherNationality, MotherAgeDeleivery, MotherNoOfBirths, MotherPlaceType, MotherLBName, LBTypeName, MotherDistrict, StateName, MotherCountry
        });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!MotherFirstNameEn}>

                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span> </h1>
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
                                disable={isEdit}
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
                                disable={isEdit}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_LAST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="MotherLastNameEn"
                                value={MotherLastNameEn}
                                onChange={setSelectMotherLastNameEn}
                                disable={isEdit}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
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
                                disable={isEdit}
                                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
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
                                disable={isEdit}
                                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_LAST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="MotherLastNameMl"
                                value={MotherLastNameMl}
                                onChange={setSelectMotherLastNameMl}
                                disable={isEdit}
                                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="MotherAadhar"
                                value={MotherAadhar}
                                onChange={setSelectMotherAadhar}
                                disable={isEdit}
                                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                            />
                        </div>
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
                                disable={isEdit}
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
                                disable={isEdit}
                                {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="MotherMobile"
                                value={MotherMobile}
                                onChange={setSelectMotherMobile}
                                disable={isEdit}
                                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
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
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_EDUCATION_SUBJECT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbQualificationSub}
                                selected={MotherEducationSubject}
                                select={setSelectMotherEducationSubject}
                                disabled={isEdit}
                            />
                        </div>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-md-12" >
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbProfession}
                                selected={MotherProfession}
                                select={setSelectMotherProfession}
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_NATIONALITY")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="code"
                                isMandatory={false}
                                option={cmbPlace}
                                selected={MotherNationality}
                                select={setSelectMotherNationality}
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_AGE_OF_DELIVERY")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="MotherAgeDeleivery"
                                value={MotherAgeDeleivery}
                                onChange={setSelectMotherAgeDeleivery}
                                disable={isEdit}
                                {...(validation = { pattern: "^[0-9]{2}$", isRequired: true, type: "text", title: t("CR_INVALID_AGE_OF_DELIVERY") })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_NO_OF_BIRTH_GIVEN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="MotherNoOfBirths"
                                value={MotherNoOfBirths}
                                onChange={setSelectMotherNoOfBirths}
                                disable={isEdit}
                                {...(validation = { pattern: "^[0-9]$", type: "text", isRequired: true, title: t("CR_INVALID_NO_OF_BIRTH_GIVEN") })}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_PLACE_TYPE_URBAN_PLACE_TYPE_RURAL")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="i18nKey"
                                isMandatory={false}
                                option={cmbUrbanRural}
                                selected={MotherPlaceType}
                                select={setSelectMotherPlaceType}
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CS_COMMON_DISTRICT")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbDistrict}
                                selected={MotherDistrict}
                                select={setSelectMotherDistrict}
                                disabled={isEdit}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbLBType}
                                selected={LBTypeName}
                                select={setSelectLBType}
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CS_COMMON_LB_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={lbs}
                                selected={MotherLBName}
                                select={setSelectMotherLBName}
                                disabled={isEdit}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbState}
                                selected={StateName}
                                select={setSelectStateName}
                                disabled={isEdit}
                            />
                        </div>
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={cmbCountry}
                                selected={MotherCountry}
                                select={setSelectMotherCountry}
                                disabled={isEdit}
                            />
                        </div>
                    </div>
                </div>
            </FormStep>
        </React.Fragment>
    );
};
export default MotherInformation;
