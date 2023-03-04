import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const AddressPermanent = ({ config, onSelect, userType, formData, permtaddressCountry, setpermtaddressCountry,
    permtaddressStateName, setpermtaddressStateName, value, setValue, countryvalue, setCountryValue,
    isPrsentAddress, setIsPrsentAddress
}) => {
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
    const [isInitialRender, setIsInitialRender] = useState(true);

    let cmbLB = [];
    let cmbCountry = [];
    let cmbState = [];

    Country &&
        Country["common-masters"] &&
        Country["common-masters"].Country.map((ob) => {
            cmbCountry.push(ob);
        });
    State &&
        State["common-masters"] &&
        State["common-masters"].State.map((ob) => {
            cmbState.push(ob);
        });
    localbodies &&
        localbodies["tenant"] &&
        localbodies["tenant"].tenants.map((ob) => {
            cmbLB.push(ob);
        });
    let currentLB = [];
    let cmbFilterCountry = [];
    let cmbFilterState = [];
    useEffect(() => {

        if (isInitialRender) {
            if (cmbLB.length > 0) {
                currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
                // setAdrsLBName(currentLB[0]);
                cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
                setpermtaddressCountry(cmbFilterCountry[0]);
                setCountryValue(cmbFilterCountry[0].countrycode)
                cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
                setpermtaddressStateName(cmbFilterState[0]);
                setValue(cmbFilterState[0].statecode);
                setIsInitialRender(false);
            }
        }
    }, [Country, State, localbodies, isInitialRender]);

    const onSkip = () => onSelect();

    function setSelectaddressCountry(value) {
        setpermtaddressCountry(value);
        setCountryValue(value.countrycode);
    }
    function setSelectaddressStateName(value) {
        setpermtaddressStateName(value);
        setValue(value.statecode);
    }

    const goNext = () => {
        // sessionStorage.setItem("permtaddressCountry", permtaddressCountry.code);
        // sessionStorage.setItem("permtaddressStateName", permtaddressStateName.code);

        // onSelect(config.key, {
        //     permtaddressCountry,
        //     permtaddressStateName,
        // });
    };
    if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
        return <Loader></Loader>;
    }
    return (
        <React.Fragment>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
                
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
                            option={cmbCountry}
                            selected={permtaddressCountry}
                            select={setSelectaddressCountry}
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
                                option={cmbState}
                                selected={permtaddressStateName}
                                select={setSelectaddressStateName}
                            />
                        </div>
                    )}
                </div>
            </FormStep>
        </React.Fragment>
    );
};
export default AddressPermanent;