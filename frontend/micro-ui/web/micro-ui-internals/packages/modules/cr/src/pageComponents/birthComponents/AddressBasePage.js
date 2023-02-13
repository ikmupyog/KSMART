import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import AddressPresent from "./AddressPresent";
import AddressPresentInsideKerala from "./AddressPresentInsideKerala";

const AddressBasePage = ({ config, onSelect, userType, formData }) => {
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
    const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "boundary-data");
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [lbs, setLbs] = useState(0);
    //################################### Present Country State ################################################
    const [addressCountry, setaddressCountry] = useState(formData?.AddressBirthDetails?.addressCountry);
    const [addressStateName, setaddressStateName] = useState(formData?.AddressBirthDetails?.addressStateName);    
    const [value, setValue] = useState();
    //################################# Inside Kerala ###########################################################
    const [presentWardNo, setPresentWardNo] = useState(formData.AddressBirthDetails?.presentWardNo);
    const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(formData?.AddressBirthDetails?.presentInsideKeralaDistrict);
    const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(formData?.AddressBirthDetails?.presentInsideKeralaLBTypeName);
    const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(formData?.AddressBirthDetails?.presentInsideKeralaLBName);
    const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(formData?.AddressBirthDetails?.presentInsideKeralaTaluk);
    const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(formData?.AddressBirthDetails?.presentInsideKeralaVillage);
    const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentInsideKeralaPostOffice);
    const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(formData?.AddressBirthDetails?.presentInsideKeralaPincode);
    const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(formData?.AddressBirthDetails?.presentInsideKeralaHouseNameEn);
    const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(formData?.AddressBirthDetails?.presentInsideKeralaHouseNameMl);
    const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(formData?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn);
    const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(formData?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl);
    const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(formData?.AddressBirthDetails?.presentInsideKeralaStreetNameEn);
    const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(formData?.AddressBirthDetails?.presentInsideKeralaStreetNameMl);
    const [Talukvalues, setLbsTalukvalue] = useState(null);
    const [Villagevalues, setLbsVillagevalue] = useState(null);

    let cmbLB = [];
    let cmbCountry = [];
    let cmbState = [];
    let cmbDistrict = [];
    let cmbTaluk = [];
    let cmbVillage = [];

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
    District &&
        District["common-masters"] &&
        District["common-masters"].District.map((ob) => {
            cmbDistrict.push(ob);
        });
    Taluk &&
        Taluk["common-masters"] &&
        Taluk["common-masters"].Taluk.map((ob) => {
            cmbTaluk.push(ob);
        });
    Village &&
        Village["common-masters"] &&
        Village["common-masters"].Village.map((ob) => {
            cmbVillage.push(ob);
        });
    let currentLB = [];
    let cmbFilterCountry = [];
    let cmbFilterState = [];
    let cmbFilterDistrict = [];
    let cmbFilterLBtype = [];
    let cmbFilterTaluk = [];
    let cmbFilterVillage = [];

    // useEffect(() => {

    //     if (isInitialRender) {
    //         if (cmbLB.length > 0) {
    //             console.log(cmbLB);
    //             currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
    //             console.log(currentLB);
    //             setinsideKeralaLBName(currentLB[0]);
    //             cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
    //             setaddressCountry(cmbFilterCountry[0]);
    //             cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
    //             setaddressStateName(cmbFilterState[0]);
    //             setValue(cmbFilterState[0].statecode);
    //             cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.code === currentLB[0].city.distCodeStr);
    //             setinsideKeralaDistrict(cmbFilterDistrict[0]);
    //             console.log(cmbFilterDistrict[0]);
    //             // cmbFilterLBtype = cmbLBType.filter((cmbLBType) => cmbLBType.code === currentLB[0].city.lbtypecode);
    //             // setAdrsLBTypeName(cmbFilterLBtype[0]);
    //             cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
    //             setinsideKeralaTaluk(cmbFilterTaluk);
    //             cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
    //             console.log(cmbFilterVillage);
    //             setinsideKeralaVillage(cmbFilterVillage);
    //             setIsInitialRender(false);
    //         }
    //     }
    // }, [Country, State, District, LBType, localbodies, presentInsideKeralaTaluk, presentInsideKeralaVillage, lbs, isInitialRender]);

    const onSkip = () => onSelect();


    const goNext = () => {
        sessionStorage.setItem("addressCountry", addressCountry.code);
        sessionStorage.setItem("addressStateName", addressStateName.code);
        sessionStorage.setItem("presentInsideKeralaHouseNameEn", presentInsideKeralaHouseNameEn ? presentInsideKeralaHouseNameEn : null);
        sessionStorage.setItem("presentInsideKeralaHouseNameMl", presentInsideKeralaHouseNameMl ? presentInsideKeralaHouseNameMl : null);
        sessionStorage.setItem("presentInsideKeralaLocalityNameEn", presentInsideKeralaLocalityNameEn ? presentInsideKeralaLocalityNameEn : null);
        sessionStorage.setItem("presentInsideKeralaLocalityNameMl", presentInsideKeralaLocalityNameMl ? presentInsideKeralaLocalityNameMl : null);
        sessionStorage.setItem("presentInsideKeralaStreetNameEn", presentInsideKeralaStreetNameEn ? presentInsideKeralaStreetNameEn : null);
        sessionStorage.setItem("presentInsideKeralaStreetNameMl", presentInsideKeralaStreetNameMl ? presentInsideKeralaStreetNameMl : null);
        sessionStorage.setItem("presentInsideKeralaVillage", presentInsideKeralaVillage ? presentInsideKeralaVillage.code : null);
        sessionStorage.setItem("presentInsideKeralaLBName", presentInsideKeralaLBName ? presentInsideKeralaLBName : null);
        sessionStorage.setItem("presentInsideKeralaDistrict", presentInsideKeralaDistrict ? presentInsideKeralaDistrict.code : null);
        sessionStorage.setItem("presentInsideKeralaTaluk", presentInsideKeralaTaluk ? presentInsideKeralaTaluk.code : null);
        sessionStorage.setItem("presentInsideKeralaPostOffice", presentInsideKeralaPostOffice ? presentInsideKeralaPostOffice.code : null);
        sessionStorage.setItem("presentInsideKeralaPincode", presentInsideKeralaPincode ? presentInsideKeralaPincode.code : null);
        sessionStorage.setItem("presentWardNo", presentWardNo ? presentWardNo.code : null);

        onSelect(config.key, {
            addressCountry,
            addressStateName,
            presentInsideKeralaLBName,
            presentInsideKeralaDistrict,
            presentInsideKeralaTaluk,
            presentInsideKeralaVillage,
            presentInsideKeralaLocalityNameEn,
            presentInsideKeralaStreetNameEn,
            presentInsideKeralaHouseNameEn,
            presentInsideKeralaLocalityNameMl,
            presentInsideKeralaStreetNameMl,
            presentInsideKeralaHouseNameMl,
            presentInsideKeralaPincode,
            presentInsideKeralaPostOffice,
            presentWardNo,
        });
    };
    if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
        return <Loader></Loader>;
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton>{t("CS_COMMON_BACK")}</BackButton>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!addressCountry}>

                <div>
                    <AddressPresent
                        addressCountry={addressCountry}
                        setaddressCountry={setaddressCountry}
                        addressStateName={addressStateName}
                        setaddressStateName={setaddressStateName}
                        value={value}
                        setValue={setValue}
                    />
                </div>
                {value === "KL" && (
                    <div>
                        <AddressPresentInsideKerala
                            presentWardNo={presentWardNo}
                            setPresentWardNo={setPresentWardNo}
                            presentInsideKeralaDistrict={presentInsideKeralaDistrict}
                            setinsideKeralaDistrict={setinsideKeralaDistrict}
                            presentInsideKeralaLBTypeName={presentInsideKeralaLBTypeName}
                            setinsideKeralaLBTypeName={setinsideKeralaLBTypeName}
                            presentInsideKeralaLBName={presentInsideKeralaLBName}
                            setinsideKeralaLBName={setinsideKeralaLBName}
                            presentInsideKeralaTaluk={presentInsideKeralaTaluk}
                            setinsideKeralaTaluk={setinsideKeralaTaluk}
                            presentInsideKeralaVillage={presentInsideKeralaVillage}
                            setinsideKeralaVillage={setinsideKeralaVillage}
                            presentInsideKeralaPostOffice={presentInsideKeralaPostOffice}
                            setinsideKeralaPostOffice={setinsideKeralaPostOffice}
                            presentInsideKeralaPincode={presentInsideKeralaPincode}
                            setinsideKeralaPincode={setinsideKeralaPincode}
                            presentInsideKeralaHouseNameEn={presentInsideKeralaHouseNameEn}
                            setinsideKeralaHouseNameEn={setinsideKeralaHouseNameEn}
                            presentInsideKeralaHouseNameMl={presentInsideKeralaHouseNameMl}
                            setinsideKeralaHouseNameMl={setinsideKeralaHouseNameMl}
                            presentInsideKeralaLocalityNameEn={presentInsideKeralaLocalityNameEn}
                            setinsideKeralaLocalityNameEn={setinsideKeralaLocalityNameEn}
                            presentInsideKeralaLocalityNameMl={presentInsideKeralaLocalityNameMl}
                            setinsideKeralaLocalityNameMl={setinsideKeralaLocalityNameMl}
                            setinsideKeralaStreetNameEn={setinsideKeralaStreetNameEn}
                            presentInsideKeralaStreetNameMl={presentInsideKeralaStreetNameMl}
                            setinsideKeralaStreetNameMl={setinsideKeralaStreetNameMl}
                            lbs={lbs}
                            setLbs={setLbs}
                            Talukvalues={Talukvalues}
                            setLbsTalukvalue={setLbsTalukvalue}
                            Villagevalues={Villagevalues}
                            setLbsVillagevalue={setLbsVillagevalue}
                        />
                    </div>
                )}
            </FormStep>
        </React.Fragment>
    );
};
export default AddressBasePage;