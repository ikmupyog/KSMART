import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const AddressPresent = ({ config, onSelect, userType, formData, presentaddressCountry, setaddressCountry,
    presentaddressStateName, setaddressStateName, value, setValue, countryvalue, setCountryValue
}) => {
    const stateId = Digit.ULBService.getStateId();
    const tenantId = Digit.ULBService.getCitizenCurrentTenant();
    const { t } = useTranslation();
    let validation = {};
    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
    const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
    const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
    //  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
    const [isInitialRender, setIsInitialRender] = useState(true);
    // const [lbs, setLbs] = useState(0);
    // const [presentaddressCountry, setaddressCountry] = useState(formData?.AddressBirthDetails?.presentaddressCountry);
    // const [presentaddressStateName, setaddressStateName] = useState(formData?.AddressBirthDetails?.presentaddressStateName);
    // const [Talukvalues, setLbsTalukvalue] = useState(null);
    // const [Villagevalues, setLbsVillagevalue] = useState(null);
    // const [value, setValue] = useState();


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
    let cmbFilterDistrict = [];
    let cmbFilterLBtype = [];
    let cmbFilterTaluk = [];
    let cmbFilterVillage = [];

    useEffect(() => {

        if (isInitialRender) {
            if (cmbLB.length > 0) {
                currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
                // setAdrsLBName(currentLB[0]);
                cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
                setaddressCountry(cmbFilterCountry[0]);
                setCountryValue(cmbFilterCountry[0].countrycode)
                cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
                setaddressStateName(cmbFilterState[0]);
                setValue(cmbFilterState[0].statecode);
                setIsInitialRender(false);
            }
        }
    }, [Country, State, District, LBType, localbodies, isInitialRender]);

    const onSkip = () => onSelect();

    function setSelectaddressCountry(value) {
        setaddressCountry(value);
        setCountryValue(value.countrycode);
    }
    function setSelectaddressStateName(value) {
        setaddressStateName(value);
        setValue(value.statecode);
    }

    const goNext = () => {
        // sessionStorage.setItem("presentaddressCountry", presentaddressCountry.code);
        // sessionStorage.setItem("presentaddressStateName", presentaddressStateName.code);

        // onSelect(config.key, {
        //     presentaddressCountry,
        //     presentaddressStateName,
        // });
    };
    if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
        return <Loader></Loader>;
    }
    return (
        <React.Fragment>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentaddressCountry}>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="headingh1">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>{" "}
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
                            option={cmbCountry}
                            selected={presentaddressCountry}
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
                                selected={presentaddressStateName}
                                select={setSelectaddressStateName}
                            />
                        </div>
                    )}
                </div>
            </FormStep>
        </React.Fragment>
    );
};
export default AddressPresent;