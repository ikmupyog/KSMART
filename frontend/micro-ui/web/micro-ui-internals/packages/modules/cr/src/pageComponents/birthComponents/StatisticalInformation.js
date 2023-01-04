import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: ReligionList = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
    const { data: AttentionOfDelivery = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AttentionOfDelivery");
    const { data: MedicalAttentionType = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MedicalAttentionType");
    const { data: DeliveryMethodList = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeliveryMethod");
    const { data: ModeOfPregnancyList = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "ModeOfPregnancy");
    const [BirthWeight, setBirthWeight] = useState(formData?.StatisticalInfoDetails?.BirthWeight);
    const [BirthHeight, setBirthHeight] = useState(formData?.StatisticalInfoDetails?.BirthHeight);
    const [Religion, setReligion] = useState(formData?.StatisticalInfoDetails?.Religion);
    const [PregnancyDuration, setPregnancyDuration] = useState(formData?.StatisticalInfoDetails?.PregnancyDuration);
    const [MedicalAttension, setMedicalAttension] = useState(formData?.StatisticalInfoDetails?.MedicalAttension);
    const [MedicalAttensionSub, setMedicalAttensionSub] = useState(formData?.StatisticalInfoDetails?.MedicalAttensionSub);
    const [ModeOfPregnancy, setModeOfPregnancy] = useState(formData?.StatisticalInfoDetails?.ModeOfPregnancy);
    const [DeliveryMethod, setDeliveryMethod] = useState(formData?.StatisticalInfoDetails?.DeliveryMethod);
    const [DeliveryMethodSub, setDeliveryMethodSub] = useState(formData?.StatisticalInfoDetails?.DeliveryMethodSub);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    let cmbAttDelivery = [];
    let cmbAttDeliverySub = [];
    let cmbDeliveryMethod = [];
    let cmbReligion = [];
    let cmbModePregnancy = [];

    const cmbPregWeek = [
        { i18nKey: "30", code: "30" },
        { i18nKey: "31", code: "31" },
        { i18nKey: "32", code: "32" },
        { i18nKey: "33", code: "33" },
        { i18nKey: "34", code: "34" },
        { i18nKey: "35", code: "35" },
        { i18nKey: "36", code: "36" },
        { i18nKey: "37", code: "37" },
        { i18nKey: "38", code: "38" },
        { i18nKey: "39", code: "39" },
        { i18nKey: "40", code: "40" },
        { i18nKey: "41", code: "41" },
        { i18nKey: "42", code: "42" },
      ];
    console.log(ReligionList);
    ReligionList &&
    ReligionList["common-masters"] &&
    ReligionList["common-masters"].Religion.map((ob) => {
        cmbReligion.push(ob);
    });
    AttentionOfDelivery &&
        AttentionOfDelivery["birth-death-service"] &&
        AttentionOfDelivery["birth-death-service"].AttentionOfDelivery.map((ob) => {
            cmbAttDeliverySub.push(ob);
        });
    MedicalAttentionType &&
        MedicalAttentionType["birth-death-service"] &&
        MedicalAttentionType["birth-death-service"].MedicalAttentionType.map((ob) => {
            cmbAttDelivery.push(ob);
        });
    DeliveryMethodList &&
        DeliveryMethodList["birth-death-service"] &&
        DeliveryMethodList["birth-death-service"].DeliveryMethod.map((ob) => {
            cmbDeliveryMethod.push(ob);
        });
        ModeOfPregnancyList &&
        ModeOfPregnancyList["birth-death-service"] &&
        ModeOfPregnancyList["birth-death-service"].ModeOfPregnancy.map((ob) => {
            cmbModePregnancy.push(ob);
        });
    const onSkip = () => onSelect();

    function setSelectBirthWeight(e) {
        setBirthWeight(e.target.value);
    }
    function setSelectBirthHeight(e) {
        setBirthHeight(e.target.value);
    }
    function setSelectReligion(value) {
        setReligion(value);
    }
    function setSelectPregnancyDuration(value) {
        setPregnancyDuration(value);
    }
    function setSelectMedicalAttension(value) {
        setMedicalAttension(value);
    }
    function setSelectMedicalAttensionSub(value) {
        setMedicalAttensionSub(value);
    }
    function setSelectDeliveryMethod(value) {
        setDeliveryMethod(value);
    }
    function setSelectDeliveryMethodSub(value) {
        setDeliveryMethodSub(value);
    }
    function setSelectModeOfPregnancy(value) {
        setModeOfPregnancy(value);
    }
    const goNext = () => {
        sessionStorage.setItem("BirthWeight", BirthWeight);
        sessionStorage.setItem("BirthHeight", BirthHeight);
        sessionStorage.setItem("Religion", Religion.code);
        sessionStorage.setItem("PregnancyDuration", PregnancyDuration.code);
        sessionStorage.setItem("MedicalAttension", MedicalAttension.code);
        sessionStorage.setItem("MedicalAttensionSub", MedicalAttensionSub.code);
        sessionStorage.setItem("DeliveryMethod", DeliveryMethod.code);
        sessionStorage.setItem("ModeOfPregnancy", ModeOfPregnancy.code);
        onSelect(config.key, { BirthWeight, BirthHeight, Religion, PregnancyDuration, MedicalAttension, MedicalAttensionSub, DeliveryMethod, DeliveryMethodSub });
    }
    console.log(formData);
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthWeight}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_STATISTICAL_INFORMATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-3" ><CardLabel>{t("CR_BIRTH_WEIGHT")}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthWeight" value={BirthWeight} onChange={setSelectBirthWeight} disable={isEdit} {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BIRTH_WEIGHT") })} />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{t("CR_BIRTH_HEIGHT")}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthHeight" value={BirthHeight} onChange={setSelectBirthHeight} disable={isEdit} {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BIRTH_HEIGHT") })} />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CS_COMMON_RELIGION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbReligion} selected={Religion} select={setSelectReligion} disabled={isEdit} />
                        </div>
                        <div className="col-md-3" >
                            <CardLabel>{`${t("CR_PREGNANCY_DURATION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="i18nKey" isMandatory={false} option={cmbPregWeek} selected={PregnancyDuration} select={setSelectPregnancyDuration} disabled={isEdit} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbAttDelivery} selected={MedicalAttension} select={setSelectMedicalAttension} disabled={isEdit} />
                        </div>
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_NATURE_OF_MEDICAL_ATTENTION_SUB")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbAttDeliverySub} selected={MedicalAttensionSub} select={setSelectMedicalAttensionSub} disabled={isEdit} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_DELIVERY_METHORD")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbDeliveryMethod} selected={DeliveryMethod} select={setSelectDeliveryMethod} disabled={isEdit} />
                        </div>
                        {/* <div className="col-md-6" >
                            <CardLabel>{`${t("CR_DELIVERY_METHOD_SUB")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbDeliveryMethod} selected={DeliveryMethodSub} select={setSelectDeliveryMethodSub} disabled={isEdit} />
                        </div> */}
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_MODE_OF_PREGNANCY")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbModePregnancy} selected={ModeOfPregnancy} select={setSelectModeOfPregnancy} disabled={isEdit} />
                        </div>
                    </div>
                </div>

            </FormStep>
        </React.Fragment>
    );
};
export default StatisticalInformation;
