import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PlaceofBirth = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
    const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [TradeName, setTradeName] = useState(null);
    const [CommencementDate, setCommencementDate] = useState();
    let naturetypecmbvalue = null;
    let cmbPlace = [];
    place &&
        place["TradeLicense"] &&
        place["TradeLicense"].PlaceOfActivity.map((ob) => {
            cmbPlace.push(ob);
        });

    const onSkip = () => onSelect();

    function selectPlaceofactivity(value) {
        naturetypecmbvalue = value.code.substring(0, 4);
        setSelectedPlaceofActivity(value);
    }

    function setSelectTradeName(e) {
        setTradeName(e.target.value);
    }
    function selectCommencementDate(value) {
        setCommencementDate(value);
    }


    const goNext = () => {
        sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
        onSelect(config.key, { setPlaceofActivity });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline /> : null}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>

                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_BIRTH")}`}</span> </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CR_BUILDING_NO")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
                        />
                    </div>
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CR_RES_ASSOCIATION_NO")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO") })}
                        />
                    </div>
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CR_HOUSE_NO")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CR_HOUSE_NAME_EN")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                        />
                    </div>
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CR_HOUSE_NAME_ML")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <CardLabel>{`${t("CS_COMMON_LB_NAME_EN")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_LB_NAME_EN") })}
                        />
                    </div>
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CS_COMMON_LB_NAME_ML")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_LB_NAME_ML") })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CS_COMMON_WARD")}`}</CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="code"
                            isMandatory={false}
                            option={cmbPlace}
                            selected={setPlaceofActivity}
                            select={selectPlaceofactivity}
                            disabled={isEdit}
                        />
                    </div>
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CS_COMMON_VILLAGE")}`}</CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="code"
                            isMandatory={false}
                            option={cmbPlace}
                            selected={setPlaceofActivity}
                            select={selectPlaceofactivity}
                            disabled={isEdit}
                        />
                    </div>
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CS_COMMON_TALUK")}`}</CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="code"
                            isMandatory={false}
                            option={cmbPlace}
                            selected={setPlaceofActivity}
                            select={selectPlaceofactivity}
                            disabled={isEdit}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CR_CITY_EN")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_EN") })}
                        />
                    </div>
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CR_CITY_ML")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_ML") })}
                        />
                    </div>
                    <div className="col-md-4" >
                        <CardLabel>{`${t("CS_COMMON_DISTRICT")}`}</CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="code"
                            isMandatory={false}
                            option={cmbPlace}
                            selected={setPlaceofActivity}
                            select={selectPlaceofactivity}
                            disabled={isEdit}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CS_COMMON_POST_OFFICE")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_POST_OFFICE") })}
                        />
                    </div>
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CS_COMMON_PIN_CODE")}`}</CardLabel>
                        <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="TradeName"
                            value={TradeName}
                            onChange={setSelectTradeName}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_PIN_CODE") })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CS_COMMON_STATE")}`}</CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="code"
                            isMandatory={false}
                            option={cmbPlace}
                            selected={setPlaceofActivity}
                            select={selectPlaceofactivity}
                            disabled={isEdit}
                        />
                    </div>
                    <div className="col-md-6" >
                        <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}</CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="code"
                            isMandatory={false}
                            option={cmbPlace}
                            selected={setPlaceofActivity}
                            select={selectPlaceofactivity}
                            disabled={isEdit}
                        />
                    </div>
                </div>
            </FormStep>
        </React.Fragment>
    );
};
export default PlaceofBirth;
