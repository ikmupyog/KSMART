import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../../utils";

const GroomAddressPresent = ({ config, onSelect, userType, formData, presentaddressCountry, setaddressCountry,
    presentaddressStateName, setaddressStateName, value, setValue, countryvalue, setCountryValue,
    permtaddressCountry, setpermtaddressCountry, permtaddressStateName, setpermtaddressStateName, isPrsentAddress,
    setIsPrsentAddress, Villagevalues, setLbsVillagevalue, isEditBirth = false, isEditDeath = false, isEditAdoption, isEditStillBirth = false, isEditBirthNAC = false,
    presentOutsideKeralaDistrict,
    setoutsideKeralaDistrict
}) => {
    console.log(formData);
    const stateId = Digit.ULBService.getStateId();
    let tenantId = "";
    tenantId = Digit.ULBService.getCurrentTenantId();
    if (tenantId === "kl") {
        tenantId = Digit.ULBService.getCitizenCurrentTenant();
    }
    const { t } = useTranslation();
    let validation = {};
    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
    // const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isDisableEdit, setisDisableEdit] = useState(false);

    let cmbLB = [];
    let cmbCountry = [];
    let cmbState = [];
    let cmbVillage = [];
    Country &&
        Country["common-masters"] && Country["common-masters"].Country &&
        Country["common-masters"].Country.map((ob) => {
            cmbCountry.push(ob);
        });
    State &&
        State["common-masters"] && State["common-masters"].State &&
        State["common-masters"].State.map((ob) => {
            cmbState.push(ob);
        });
    localbodies &&
        localbodies["tenant"] && localbodies["tenant"].tenants &&
        localbodies["tenant"].tenants.map((ob) => {
            cmbLB.push(ob);
        });
    // Village &&
    //     Village["common-masters"] && Village["common-masters"].Village &&
    //     Village["common-masters"].Village.map((ob) => {
    //         cmbVillage.push(ob);
    //     });
    let currentLB = [];
    let cmbFilterCountry = [];
    let cmbFilterState = [];
    let cmbFilterVillage = [];
    useEffect(() => {
        if (isInitialRender && countryvalue === "IND" && value === "kl" &&
            isEditBirth === false && isEditDeath === false && isEditAdoption === false && isEditBirthNAC === false && isEditStillBirth === false &&
            (formData?.GroomAddressDetails?.presentaddressStateName === null || formData?.GroomAddressDetails?.presentaddressStateName === "" ||
                formData?.GroomAddressDetails?.presentaddressStateName === undefined)) {
            if (cmbLB.length > 0 && cmbCountry.length > 0) {
                currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
                //console.log(currentLB);
                // setAdrsLBName(currentLB[0]);
                if (cmbCountry.length > 0 && currentLB.length > 0) {
                    cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
                    setaddressCountry(cmbFilterCountry[0]);
                    if (isPrsentAddress) {
                        setpermtaddressCountry(cmbFilterCountry[0]);
                    }
                    setCountryValue(cmbFilterCountry[0].countrycode);
                }
                if (cmbState.length > 0 && currentLB.length > 0) {
                    cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
                    setaddressStateName(cmbFilterState[0]);
                    if (isPrsentAddress) {
                        setpermtaddressStateName(cmbFilterState[0]);
                    }
                    setValue(cmbFilterState[0].code);
                }
                // if (cmbVillage.length > 0 && currentLB.length > 0) {
                //     cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
                //     setLbsVillagevalue(cmbFilterVillage);
                // }
                setIsInitialRender(false);
            }
        } else if (isInitialRender && countryvalue === "IND" && value === "kl" &&
            isEditBirth === false && isEditDeath === false && isEditAdoption === false && isEditBirthNAC === false && isEditStillBirth === false &&
            formData?.GroomAddressDetails?.presentaddressStateName != "" &&
            formData?.GroomAddressDetails?.presentaddressStateName != null &&
            formData?.GroomAddressDetails?.presentaddressStateName != undefined) {
            if (cmbLB.length > 0) {
                currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
                //console.log(currentLB);
                // setAdrsLBName(currentLB[0]);
                if (cmbCountry.length > 0) {
                    cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.GroomAddressDetails?.presentaddressCountry.code);
                    setaddressCountry(cmbFilterCountry[0]);
                    if (isPrsentAddress) {
                        setpermtaddressCountry(cmbFilterCountry[0]);
                    }
                    setCountryValue(cmbFilterCountry[0].countrycode);
                }
                if (cmbState.length > 0) {
                    cmbFilterState = cmbState.filter((cmbState) => cmbState.code === formData?.GroomAddressDetails?.presentaddressStateName.code);
                    setaddressStateName(cmbFilterState[0]);
                    if (isPrsentAddress) {
                        setpermtaddressStateName(cmbFilterState[0]);
                    }
                    setValue((cmbFilterState[0].code));
                }
                // if (cmbVillage.length > 0 && currentLB.length > 0) {
                //     cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
                //     setLbsVillagevalue(cmbFilterVillage);
                // }
                setIsInitialRender(false);
            }
        } else {
            setIsInitialRender(false);
        }
    }, [cmbLB.length, cmbCountry.length, isInitialRender]);

    if (isEditBirth) {
        if (formData?.ChildDetails?.AddressBirthDetails?.presentaddressCountry != null) {
            if (cmbCountry.length > 0 && (presentaddressCountry === undefined || presentaddressCountry === "")) {
                cmbFilterCountry = cmbCountry.filter(cmbCountry => cmbCountry.code === formData?.ChildDetails?.AddressBirthDetails?.presentaddressCountry);
                if (cmbFilterCountry.length > 0) {
                    setaddressCountry(cmbFilterCountry[0]);
                    setCountryValue(cmbFilterCountry[0].countrycode);
                }
            }
        }
        if (formData?.ChildDetails?.AddressBirthDetails?.presentaddressStateName != null) {
            if (cmbState.length > 0 && (presentaddressStateName === undefined || presentaddressStateName === "")) {
                setaddressStateName(cmbState.filter(cmbState => cmbState.code === formData?.ChildDetails?.AddressBirthDetails?.presentaddressStateName)[0]);
                setValue(formData?.ChildDetails?.AddressBirthDetails?.presentaddressStateName);
            }
        }
    } else if (isEditAdoption !== false) {
        if (formData?.AdoptionAddressBasePage?.presentaddressCountry != null) {
            if (cmbCountry.length > 0 && (presentaddressCountry === undefined || presentaddressCountry === "")) {
                cmbFilterCountry = cmbCountry.filter(cmbCountry => cmbCountry.code === formData?.AdoptionAddressBasePage?.presentaddressCountry);
                setaddressCountry(cmbFilterCountry[0]);
                setCountryValue(cmbFilterCountry[0].countrycode);
            }
        }
        if (formData?.AdoptionAddressBasePage?.presentaddressStateName != null) {
            if (cmbState.length > 0 && (presentaddressStateName === undefined || presentaddressStateName === "")) {
                setaddressStateName(cmbState.filter(cmbState => cmbState.code === formData?.AdoptionAddressBasePage?.presentaddressStateName)[0]);
                setValue(formData?.AdoptionAddressBasePage?.presentaddressStateName);
            }
        }
    } else if (isEditDeath) {
        if (formData?.GroomAddressDetails?.presentaddressCountry != null) {
            if (cmbCountry.length > 0 && (presentaddressCountry === undefined || presentaddressCountry === "")) {
                cmbFilterCountry = cmbCountry.filter(cmbCountry => cmbCountry.code === formData?.GroomAddressDetails?.presentaddressCountry);
                setaddressCountry(cmbFilterCountry[0]);
                setCountryValue(cmbFilterCountry[0].countrycode);
            }
        }
        if (formData?.GroomAddressDetails?.presentaddressStateName != null) {
            if (cmbState.length > 0 && (presentaddressStateName === undefined || presentaddressStateName === "")) {
                setaddressStateName(cmbState.filter(cmbState => cmbState.code === formData?.GroomAddressDetails?.presentaddressStateName)[0]);
                setValue(formData?.GroomAddressDetails?.presentaddressStateName);
            }
        }
    } else if (isEditStillBirth) {
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressCountry != null) {
            if (cmbCountry.length > 0 && (presentaddressCountry === undefined || presentaddressCountry === "")) {
                cmbFilterCountry = cmbCountry.filter(cmbCountry => cmbCountry.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressCountry);
                setaddressCountry(cmbFilterCountry[0]);
                setCountryValue(cmbFilterCountry[0].countrycode);
            }
        }
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressStateName != null) {
            if (cmbState.length > 0 && (presentaddressStateName === undefined || presentaddressStateName === "")) {
                setaddressStateName(cmbState.filter(cmbState => cmbState.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressStateName)[0]);
                setValue(formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressStateName);
            }
        }
    }
    const onSkip = () => onSelect();

    function setSelectaddressCountry(value) {
        setaddressCountry(value);
        setCountryValue(value.countrycode);
        if (isPrsentAddress) {
            setpermtaddressCountry(value);
        }
    }
    function setSelectaddressStateName(value) {
        setaddressStateName(value);
        setValue(value.code);
        // if (value.code != "kl") {
        //     setoutsideKeralaDistrict(null);
        //     sessionStorage.setItem("presentOutsideKeralaFlag", true);
        //     sessionStorage.setItem("presentOutsideKeralaStateCode", value.code);
        // } else {
        //     sessionStorage.setItem("presentOutsideKeralaFlag", false);
        //     sessionStorage.removeItem("presentOutsideKeralaStateCode");
        // }
        if (isPrsentAddress) {
            setpermtaddressStateName(value);
        }
    }

    const goNext = () => {

    };
    if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
        return <Loader></Loader>;
    } else
        return (
            <React.Fragment>
                {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentaddressCountry}> */}
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="headingh1">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS")}`}</span>{" "}
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <CardLabel>
                            {`${t("CS_COMMON_COUNTRY")}`}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="name"
                            isMandatory={false}
                            option={sortDropdownNames(cmbCountry ? cmbCountry : [], "code", t)}
                            selected={presentaddressCountry}
                            select={setSelectaddressCountry}
                            disable={isDisableEdit}
                        />
                    </div>
                    {countryvalue === "IND" && (
                        <div className="col-md-6">
                            <CardLabel>
                                {`${t("CS_COMMON_STATE")}`}
                                <span className="mandatorycss">*</span>
                            </CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                isMandatory={false}
                                option={sortDropdownNames(cmbState ? cmbState : [], "code", t)}
                                selected={presentaddressStateName}
                                select={setSelectaddressStateName}
                                disable={isDisableEdit}
                            />
                        </div>
                    )}
                </div>
                {/* </FormStep> */}
            </React.Fragment>
        );
};
export default GroomAddressPresent;