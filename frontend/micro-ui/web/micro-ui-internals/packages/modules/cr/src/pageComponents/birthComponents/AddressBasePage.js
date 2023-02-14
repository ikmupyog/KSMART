import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import AddressPresent from "./AddressPresent";
import AddressPresentInsideKerala from "./AddressPresentInsideKerala";
import AddressPresentOutsideKerala from "./AddressPresentOutsideKerala";
import AddressPresentOutsideIndia from "./AddressPresentOutsideIndia";
import AddressSameAsAbove from "./AddressSameAsAbove";
import AddressPermanent from "./AddressPermanent";
import AddressPermanentInsideKerala from "./AddressPermanentInsideKerala";
import AddressPermanentOutsideKerala from "./AddressPermanentInsideKerala";

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

    //################################### Present Country State ############################################################################################

    const [presentaddressCountry, setaddressCountry] = useState(formData?.AddressBirthDetails?.presentaddressCountry);
    const [presentaddressStateName, setaddressStateName] = useState(formData?.AddressBirthDetails?.presentaddressStateName);
    const [countryvalue, setCountryValue] = useState(formData?.AddressBirthDetails?.presentaddressCountry ? formData?.AddressBirthDetails?.presentaddressCountry.countrycode : null);
    const [value, setValue] = useState(formData?.AddressBirthDetails?.presentaddressStateName ? formData?.AddressBirthDetails?.presentaddressStateName.statecode : null);

    //################################# Inside Kerala #########################################################################################################

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

    //################################# Outside Kerala ##########################################################################################################

    const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaDistrict ? formData?.AddressBirthDetails?.presentOutsideKeralaDistrict : null);
    const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaTaluk ? formData?.AddressBirthDetails?.presentOutsideKeralaTaluk : null);
    const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn ? formData?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn : null);
    const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaVillage ? formData?.AddressBirthDetails?.presentOutsideKeralaVillage : null);
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
    const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPincode ? formData?.AddressBirthDetails?.presentOutsideKeralaPincode : "");
    const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn ? formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn : "");
    const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl ? formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl : "");
    const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn ? formData?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn : "");
    const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl);
    const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn ? formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn : "");
    const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl ? formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl : "");
    const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn ? formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn : "");
    const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl ? formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl : "");

    //############################################### Out Side India ###########################################################################################################

    const [presentOutSideIndiaAdressEn, setAdressEn] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaAdressEn ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressEn : "");
    const [presentOutSideIndiaAdressMl, setAdressMl] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaAdressMl ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressMl : "");
    const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaAdressEnB ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressEnB : "");
    const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaAdressMlB ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressMlB : "");
    const [presentOutSideIndiaLocalityEn, setLocalityEn] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaLocalityEn ? formData?.AddressBirthDetails?.presentOutSideIndiaLocalityEn : "");
    const [presentOutSideIndiaLocalityMl, setLocalityMl] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaLocalityMl ? formData?.AddressBirthDetails?.presentOutSideIndiaLocalityMl : "");
    const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaProvinceEn ? formData?.AddressBirthDetails?.presentOutSideIndiaProvinceEn : "");
    const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaProvinceMl ? formData?.AddressBirthDetails?.presentOutSideIndiaProvinceMl : "");
    const [presentOutSideIndiaPostCode, setPostCode] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaPostCode ? formData?.AddressBirthDetails?.presentOutSideIndiaPostCode : "");
    const [presentOutSideCountry, setOutSideCountry] = useState(formData?.AddressBirthDetails?.presentOutSideCountry ? formData?.AddressBirthDetails?.presentOutSideCountry : null);
    const [presentOutSideIndiaResNoEn, setResNoEn] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaResNoEn ? formData?.AddressBirthDetails?.presentOutSideIndiaResNoEn : "");
    const [presentOutSideIndiaResNoMl, setResNoMl] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaResNoMl ? formData?.AddressBirthDetails?.presentOutSideIndiaResNoMl : "");
    const [presentOutSideIndiaHouseNameEn, setHouseNameEn] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaHouseNameEn ? formData?.AddressBirthDetails?.presentOutSideIndiaHouseNameEn : "");
    const [presentOutSideIndiaHouseNameMl, setHouseNameMl] = useState(formData?.AddressBirthDetails?.presentOutSideIndiaHouseNameMl ? formData?.AddressBirthDetails?.presentOutSideIndiaHouseNameMl : "");

    //############################################### Same As Above ##################################################################################################

    const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressBirthDetails?.isPrsentAddress ? formData?.AddressBirthDetails?.isPrsentAddress : true);

    //################################################### Country State Permanent ###########################################################################

    const [permtaddressCountry, setpermtaddressCountry] = useState(formData?.AddressBirthDetails?.permtaddressCountry);
    const [permtaddressStateName, setpermtaddressStateName] = useState(formData?.AddressBirthDetails?.permtaddressStateName);

    //################################################# Permanent Inside Kerala ##########################################################################################

    const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrDistrict ? ormData?.AddressBirthDetails?.permntInKeralaAdrDistrict : null);
    // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName ? formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName : null);
    const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrLBName ? formData?.AddressBirthDetails?.permntInKeralaAdrLBName : null);
    const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrTaluk ? formData?.AddressBirthDetails?.permntInKeralaAdrTaluk : null);
    const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrVillage ? formData?.AddressBirthDetails?.permntInKeralaAdrVillage : null);
    const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice ? formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice : null);
    const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrPincode ? formData?.AddressBirthDetails?.permntInKeralaAdrPincode : "");
    const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn ? formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn : "");
    const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl ? formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl : "");
    const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn ? formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn : "");
    const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl ? formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl : "");
    const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn ? formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn : "");
    const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl ? formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl : "");
    const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(formData?.AddressBirthDetails?.permntInKeralaWardNo ? formData?.AddressBirthDetails?.permntInKeralaWardNo : null);

    //############################################################################### Permanent Outside Kerala ############################################################################
    const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaDistrict ? formData?.AddressBirthDetails?.permntOutsideKeralaDistrict : null);
    const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaTaluk ? formData?.AddressBirthDetails?.permntOutsideKeralaTaluk : null);
    const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn ? formData?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn : null);
    const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaVillage ? formData?.AddressBirthDetails?.permntOutsideKeralaVillage : null);
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
    const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaPincode ? formData?.AddressBirthDetails?.permntOutsideKeralaPincode : "");
    const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn ? formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn : "");
    const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl ? formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl : "");
    const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn ? formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn : "");
    const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl ? formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl : "");
    const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn ? formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn : "");
    const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl ? formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl : "");
    const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn ? formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn : "");
    const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl ? formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl : "");

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
        sessionStorage.setItem("presentaddressCountry", presentaddressCountry.code);
        sessionStorage.setItem("presentaddressStateName", presentaddressStateName.code);
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
        sessionStorage.setItem("presentOutsideKeralaDistrict", presentOutsideKeralaDistrict.code ? presentOutsideKeralaDistrict.code : null);
        sessionStorage.setItem("presentOutsideKeralaCityVilgeEn", presentOutsideKeralaCityVilgeEn ? presentOutsideKeralaCityVilgeEn : null);
        sessionStorage.setItem("presentOutsideKeralaVillage", presentOutsideKeralaVillage ? presentOutsideKeralaVillage.code : null);
        sessionStorage.setItem("presentOutsideKeralaTaluk", presentOutsideKeralaTaluk ? presentOutsideKeralaTaluk.code : null);
        sessionStorage.setItem("presentOutsideKeralaPostOffice", presentOutsideKeralaPostOffice ? presentOutsideKeralaPostOffice.code : null);
        sessionStorage.setItem("presentOutsideKeralaPincode", presentOutsideKeralaPincode ? presentOutsideKeralaPincode : null);
        sessionStorage.setItem("presentOutsideKeralaHouseNameEn", presentOutsideKeralaHouseNameEn ? presentOutsideKeralaHouseNameEn : null);
        sessionStorage.setItem("presentOutsideKeralaHouseNameMl", presentOutsideKeralaHouseNameMl ? presentOutsideKeralaHouseNameMl : null);
        sessionStorage.setItem("presentOutsideKeralaLocalityNameEn", presentOutsideKeralaLocalityNameEn ? presentOutsideKeralaLocalityNameEn : null);
        sessionStorage.setItem("presentOutsideKeralaLocalityNameMl", presentOutsideKeralaLocalityNameMl ? presentOutsideKeralaLocalityNameMl : null);
        sessionStorage.setItem("presentOutsideKeralaStreetNameEn", presentOutsideKeralaStreetNameEn ? presentOutsideKeralaStreetNameEn : null);
        sessionStorage.setItem("presentOutsideKeralaStreetNameMl", presentOutsideKeralaStreetNameMl ? presentOutsideKeralaStreetNameMl : null);
        sessionStorage.setItem("presentOutSideIndiaAdressEn", presentOutSideIndiaAdressEn ? presentOutSideIndiaAdressEn : null);
        sessionStorage.setItem("presentOutSideIndiaAdressMl", presentOutSideIndiaAdressMl ? presentOutSideIndiaAdressMl : null);
        sessionStorage.setItem("presentOutSideIndiaAdressEnB", presentOutSideIndiaAdressEnB ? presentOutSideIndiaAdressEnB : null);
        sessionStorage.setItem("presentOutSideIndiaAdressMlB", presentOutSideIndiaAdressMlB ? presentOutSideIndiaAdressMlB : null);
        sessionStorage.setItem("presentOutSideIndiaAdressMlB", presentOutSideIndiaAdressMlB ? presentOutSideIndiaAdressMlB : null);
        sessionStorage.setItem("presentOutSideIndiaLocalityMl", presentOutSideIndiaLocalityMl ? presentOutSideIndiaLocalityMl : null);
        sessionStorage.setItem("presentOutSideIndiaProvinceEn", presentOutSideIndiaProvinceEn ? presentOutSideIndiaProvinceEn : null);
        sessionStorage.setItem("presentOutSideIndiaProvinceMl", presentOutSideIndiaProvinceMl ? presentOutSideIndiaProvinceMl : null);
        sessionStorage.setItem("presentOutSideIndiaPostCode", presentOutSideIndiaPostCode ? presentOutSideIndiaPostCode : null);
        sessionStorage.setItem("presentOutSideCountry", presentOutSideCountry ? presentOutSideCountry.code : null);
        sessionStorage.setItem("presentOutSideCountry", presentOutSideCountry ? presentOutSideCountry : null);
        sessionStorage.setItem("presentOutSideIndiaResNoMl", presentOutSideIndiaResNoMl ? presentOutSideIndiaResNoMl : null);
        sessionStorage.setItem("presentOutSideIndiaHouseNameEn", presentOutSideIndiaHouseNameEn ? presentOutSideIndiaHouseNameEn : null);
        sessionStorage.setItem("presentOutSideIndiaHouseNameMl", presentOutSideIndiaHouseNameMl ? presentOutSideIndiaHouseNameMl : null);
        sessionStorage.setItem("isPrsentAddress", isPrsentAddress ? isPrsentAddress : true);

        sessionStorage.setItem("permtaddressCountry", permtaddressCountry.code);
        sessionStorage.setItem("permtaddressStateName", permtaddressStateName.code);
        sessionStorage.setItem("permntInKeralaAdrHouseNameEn", permntInKeralaAdrHouseNameEn ? permntInKeralaAdrHouseNameEn : null);
        sessionStorage.setItem("permntInKeralaAdrHouseNameMl", permntInKeralaAdrHouseNameMl ? permntInKeralaAdrHouseNameMl : null);
        sessionStorage.setItem("permntInKeralaAdrLocalityNameEn", permntInKeralaAdrLocalityNameEn ? permntInKeralaAdrLocalityNameEn : null);
        sessionStorage.setItem("permntInKeralaAdrLocalityNameMl", permntInKeralaAdrLocalityNameMl ? permntInKeralaAdrLocalityNameMl : null);
        sessionStorage.setItem("permntInKeralaAdrStreetNameEn", permntInKeralaAdrStreetNameEn ? permntInKeralaAdrStreetNameEn : null);
        sessionStorage.setItem("permntInKeralaAdrStreetNameMl", permntInKeralaAdrStreetNameMl ? permntInKeralaAdrStreetNameMl : null);
        sessionStorage.setItem("permntInKeralaAdrVillage", permntInKeralaAdrVillage ? permntInKeralaAdrVillage.code : null);
        sessionStorage.setItem("permntInKeralaAdrLBName", permntInKeralaAdrLBName ? permntInKeralaAdrLBName : null);
        sessionStorage.setItem("permntInKeralaAdrDistrict", permntInKeralaAdrDistrict ? permntInKeralaAdrDistrict.code : null);
        sessionStorage.setItem("permntInKeralaAdrTaluk", permntInKeralaAdrTaluk ? permntInKeralaAdrTaluk.code : null);
        sessionStorage.setItem("permntInKeralaAdrPostOffice", permntInKeralaAdrPostOffice ? permntInKeralaAdrPostOffice.code : null);
        sessionStorage.setItem("permntInKeralaAdrPincode", permntInKeralaAdrPincode ? permntInKeralaAdrPincode.code : null);
        sessionStorage.setItem("permntInKeralaWardNo", permntInKeralaWardNo ? permntInKeralaWardNo.code : null);
        sessionStorage.setItem("permntOutsideKeralaDistrict", permntOutsideKeralaDistrict.code ? permntOutsideKeralaDistrict.code : null);
        sessionStorage.setItem("permntOutsideKeralaCityVilgeEn", permntOutsideKeralaCityVilgeEn ? permntOutsideKeralaCityVilgeEn : null);
        sessionStorage.setItem("permntOutsideKeralaVillage", permntOutsideKeralaVillage ? permntOutsideKeralaVillage.code : null);
        sessionStorage.setItem("permntOutsideKeralaTaluk", permntOutsideKeralaTaluk ? permntOutsideKeralaTaluk.code : null);
        sessionStorage.setItem("permntOutsideKeralaPincode", permntOutsideKeralaPincode ? permntOutsideKeralaPincode : null);
        sessionStorage.setItem("permntOutsideKeralaHouseNameEn", permntOutsideKeralaHouseNameEn ? permntOutsideKeralaHouseNameEn : null);
        sessionStorage.setItem("permntOutsideKeralaHouseNameMl", permntOutsideKeralaHouseNameMl ? permntOutsideKeralaHouseNameMl : null);
        sessionStorage.setItem("permntOutsideKeralaLocalityNameEn", permntOutsideKeralaLocalityNameEn ? permntOutsideKeralaLocalityNameEn : null);
        sessionStorage.setItem("permntOutsideKeralaLocalityNameMl", permntOutsideKeralaLocalityNameMl ? permntOutsideKeralaLocalityNameMl : null);
        sessionStorage.setItem("permntOutsideKeralaStreetNameEn", permntOutsideKeralaStreetNameEn ? permntOutsideKeralaStreetNameEn : null);
        sessionStorage.setItem("permntOutsideKeralaStreetNameMl", permntOutsideKeralaStreetNameMl ? permntOutsideKeralaStreetNameMl : null);
        sessionStorage.setItem("permntOutsideKeralaPostOfficeEn", permntOutsideKeralaPostOfficeEn ? permntOutsideKeralaPostOfficeEn : null);
        sessionStorage.setItem("permntOutsideKeralaPostOfficeMl", permntOutsideKeralaPostOfficeMl ? permntOutsideKeralaPostOfficeMl : null);

        onSelect(config.key, {
            presentaddressCountry,
            presentaddressStateName,
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
            presentOutsideKeralaDistrict,
            presentOutsideKeralaTaluk,
            presentOutsideKeralaVillage,
            presentOutsideKeralaCityVilgeEn,
            presentOutsideKeralaPincode,
            presentOutsideKeralaPostOffice,
            presentOutsideKeralaLocalityNameEn,
            presentOutsideKeralaStreetNameEn,
            presentOutsideKeralaHouseNameEn,
            presentOutsideKeralaLocalityNameMl,
            presentOutsideKeralaStreetNameMl,
            presentOutsideKeralaHouseNameMl,
            presentOutSideIndiaAdressEn,
            presentOutSideIndiaAdressMl,
            presentOutSideIndiaAdressEnB,
            presentOutSideIndiaAdressMlB,
            presentOutSideIndiaAdressMlB,
            presentOutSideIndiaLocalityMl,
            presentOutSideIndiaProvinceEn,
            presentOutSideIndiaProvinceMl,
            presentOutSideCountry,
            isPrsentAddress,

            permtaddressCountry,
            permtaddressStateName,
            permntInKeralaAdrLBName,
            permntInKeralaAdrDistrict,
            permntInKeralaAdrTaluk,
            permntInKeralaAdrVillage,
            permntInKeralaAdrLocalityNameEn,
            permntInKeralaAdrStreetNameEn,
            permntInKeralaAdrHouseNameEn,
            permntInKeralaAdrLocalityNameMl,
            permntInKeralaAdrStreetNameMl,
            permntInKeralaAdrHouseNameMl,
            permntInKeralaAdrPincode,
            permntInKeralaAdrPostOffice,
            permntInKeralaWardNo,
            permntOutsideKeralaDistrict,
            permntOutsideKeralaTaluk,
            permntOutsideKeralaVillage,
            permntOutsideKeralaCityVilgeEn,
            permntOutsideKeralaPincode,
            permntOutsideKeralaLocalityNameEn,
            permntOutsideKeralaStreetNameEn,
            permntOutsideKeralaHouseNameEn,
            permntOutsideKeralaLocalityNameMl,
            permntOutsideKeralaStreetNameMl,
            permntOutsideKeralaHouseNameMl,
            permntOutsideKeralaPostOfficeEn,
            permntOutsideKeralaPostOfficeMl
        });
    };
    if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
        return <Loader></Loader>;
    }
    console.log("isPrsentAddress" + isPrsentAddress);
    return (
        <React.Fragment>
            <BackButton>{t("CS_COMMON_BACK")}</BackButton>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentaddressCountry}>

                <div className="accordion-wrapper">
                    <AddressPresent
                        presentaddressCountry={presentaddressCountry}
                        setaddressCountry={setaddressCountry}
                        presentaddressStateName={presentaddressStateName}
                        setaddressStateName={setaddressStateName}
                        value={value}
                        setValue={setValue}
                        countryvalue={countryvalue}
                        setCountryValue={setCountryValue}
                    />
                </div>
                {countryvalue === "IND" && value === "KL" && (
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
                {countryvalue === "IND" && value != "KL" && (
                    <div>
                        <AddressPresentOutsideKerala
                            value={value}
                            setValue={setValue}
                            presentOutsideKeralaDistrict={presentOutsideKeralaDistrict}
                            setoutsideKeralaDistrict={setoutsideKeralaDistrict}
                            presentOutsideKeralaTaluk={presentOutsideKeralaTaluk}
                            setoutsideKeralaTaluk={setoutsideKeralaTaluk}
                            presentOutsideKeralaCityVilgeEn={presentOutsideKeralaCityVilgeEn}
                            setoutsideKeralaCityVilgeEn={setoutsideKeralaCityVilgeEn}
                            presentOutsideKeralaVillage={presentOutsideKeralaVillage}
                            setoutsideKeralaVillage={setoutsideKeralaVillage}
                            presentOutsideKeralaPincode={presentOutsideKeralaPincode}
                            setoutsideKeralaPincode={setoutsideKeralaPincode}
                            presentOutsideKeralaHouseNameEn={presentOutsideKeralaHouseNameEn}
                            setoutsideKeralaHouseNameEn={setoutsideKeralaHouseNameEn}
                            presentOutsideKeralaHouseNameMl={presentOutsideKeralaHouseNameMl}
                            setoutsideKeralaHouseNameMl={setoutsideKeralaHouseNameMl}
                            presentOutsideKeralaLocalityNameEn={presentOutsideKeralaLocalityNameEn}
                            setoutsideKeralaLocalityNameEn={setoutsideKeralaLocalityNameEn}
                            presentOutsideKeralaLocalityNameMl={presentOutsideKeralaLocalityNameMl}
                            setoutsideKeralaLocalityNameMl={setoutsideKeralaLocalityNameMl}
                            presentOutsideKeralaStreetNameEn={presentOutsideKeralaStreetNameEn}
                            setoutsideKeralaStreetNameEn={setoutsideKeralaStreetNameEn}
                            presentOutsideKeralaStreetNameMl={presentOutsideKeralaStreetNameMl}
                            setoutsideKeralaStreetNameMl={setoutsideKeralaStreetNameMl}
                            presentOutsideKeralaPostOfficeEn={presentOutsideKeralaPostOfficeEn}
                            setoutsideKeralaPostOfficeEn={setoutsideKeralaPostOfficeEn}
                            presentOutsideKeralaPostOfficeMl={presentOutsideKeralaPostOfficeMl}
                            setoutsideKeralaPostOfficeMl={setoutsideKeralaPostOfficeMl}
                        />
                    </div>
                )}
                {countryvalue != "IND" && (
                    <div>
                        <AddressPresentOutsideIndia
                            presentOutSideIndiaAdressEn={presentOutSideIndiaAdressEn}
                            setAdressEn={setAdressEn}
                            presentOutSideIndiaAdressMl={presentOutSideIndiaAdressMl}
                            setAdressMl={setAdressMl}
                            presentOutSideIndiaAdressEnB={presentOutSideIndiaAdressEnB}
                            setAdressEnB={setAdressEnB}
                            presentOutSideIndiaAdressMlB={presentOutSideIndiaAdressMlB}
                            setAdressMlB={setAdressMlB}
                            presentOutSideIndiaLocalityEn={presentOutSideIndiaLocalityEn}
                            setLocalityEn={setLocalityEn}
                            presentOutSideIndiaLocalityMl={presentOutSideIndiaLocalityMl}
                            setLocalityMl={setLocalityMl}
                            presentOutSideIndiaProvinceEn={presentOutSideIndiaProvinceEn}
                            setProvinceEn={setProvinceEn}
                            presentOutSideIndiaProvinceMl={presentOutSideIndiaProvinceMl}
                            setProvinceMl={setProvinceMl}
                            presentOutSideIndiaPostCode={presentOutSideIndiaPostCode}
                            setPostCode={setPostCode}
                            presentOutSideCountry={presentOutSideCountry}
                            setOutSideCountry={setOutSideCountry}
                            presentOutSideIndiaResNoEn={presentOutSideIndiaResNoEn}
                            setResNoEn={setResNoEn}
                            presentOutSideIndiaResNoMl={presentOutSideIndiaResNoMl}
                            setResNoMl={setResNoMl}
                            presentOutSideIndiaHouseNameEn={presentOutSideIndiaHouseNameEn}
                            setHouseNameEn={setHouseNameEn}
                            presentOutSideIndiaHouseNameMl={presentOutSideIndiaHouseNameMl}
                            setHouseNameMl={setHouseNameMl}
                            countryvalue={countryvalue}
                            setCountryValue={setCountryValue}
                        />
                    </div>
                )}
                <div>
                    <AddressSameAsAbove
                        isPrsentAddress={isPrsentAddress}
                        setIsPrsentAddress={setIsPrsentAddress}
                    />
                </div>
                {isPrsentAddress === false && (
                    <div>
                        <AddressPermanent
                            permtaddressCountry={permtaddressCountry}
                            setpermtaddressCountry={setpermtaddressCountry}
                            permtaddressStateName={permtaddressStateName}
                            setpermtaddressStateName={setpermtaddressStateName}
                            isPrsentAddress={isPrsentAddress}
                            setIsPrsentAddress={setIsPrsentAddress}
                            value={value}
                            setValue={setValue}
                            countryvalue={countryvalue}
                            setCountryValue={setCountryValue}
                        />
                    </div>
                )}
                {countryvalue === "IND" && value === "KL" && isPrsentAddress === false && (
                    <div>
                        <AddressPermanentInsideKerala
                            permntInKeralaAdrDistrict={permntInKeralaAdrDistrict}
                            setpermntInKeralaAdrDistrict={setpermntInKeralaAdrDistrict}
                            permntInKeralaAdrLBName={permntInKeralaAdrLBName}
                            setpermntInKeralaAdrLBName={setpermntInKeralaAdrLBName}
                            permntInKeralaAdrTaluk={permntInKeralaAdrTaluk}
                            setpermntInKeralaAdrTaluk={setpermntInKeralaAdrTaluk}
                            permntInKeralaAdrVillage={permntInKeralaAdrVillage}
                            setpermntInKeralaAdrVillage={setpermntInKeralaAdrVillage}
                            permntInKeralaAdrPostOffice={permntInKeralaAdrPostOffice}
                            setpermntInKeralaAdrPostOffice={setpermntInKeralaAdrPostOffice}
                            permntInKeralaAdrPincode={permntInKeralaAdrPincode}
                            setpermntInKeralaAdrPincode={setpermntInKeralaAdrPincode}
                            permntInKeralaAdrHouseNameEn={permntInKeralaAdrHouseNameEn}
                            setpermntInKeralaAdrHouseNameEn={setpermntInKeralaAdrHouseNameEn}
                            permntInKeralaAdrHouseNameMl={permntInKeralaAdrHouseNameMl}
                            setpermntInKeralaAdrHouseNameMl={setpermntInKeralaAdrHouseNameMl}
                            permntInKeralaAdrLocalityNameEn={permntInKeralaAdrLocalityNameEn}
                            setpermntInKeralaAdrLocalityNameEn={setpermntInKeralaAdrLocalityNameEn}
                            permntInKeralaAdrLocalityNameMl={permntInKeralaAdrLocalityNameMl}
                            setpermntInKeralaAdrLocalityNameMl={setpermntInKeralaAdrLocalityNameMl}
                            permntInKeralaAdrStreetNameEn={permntInKeralaAdrStreetNameEn}
                            setpermntInKeralaAdrStreetNameEn={setpermntInKeralaAdrStreetNameEn}
                            permntInKeralaAdrStreetNameMl={permntInKeralaAdrStreetNameMl}
                            setpermntInKeralaAdrStreetNameMl={setpermntInKeralaAdrStreetNameMl}
                            permntInKeralaWardNo={permntInKeralaWardNo}
                            setpermntInKeralaWardNo={setpermntInKeralaWardNo}
                            lbs={lbs}
                            setLbs={setLbs}
                            Talukvalues={Talukvalues}
                            setLbsTalukvalue={setLbsTalukvalue}
                            Villagevalues={Villagevalues}
                            setLbsVillagevalue={setLbsVillagevalue}

                        />
                    </div>
                )}
                {countryvalue === "IND" && value != "KL" && isPrsentAddress === false && (
                    <div>
                        <AddressPermanentOutsideKerala
                            permntOutsideKeralaDistrict={permntOutsideKeralaDistrict}
                            setpermntOutsideKeralaDistrict={setpermntOutsideKeralaDistrict}
                            permntOutsideKeralaTaluk={permntOutsideKeralaTaluk}
                            setpermntOutsideKeralaTaluk={setpermntOutsideKeralaTaluk}
                            permntOutsideKeralaCityVilgeEn={permntOutsideKeralaCityVilgeEn}
                            setpermntOutsideKeralaCityVilgeEn={setpermntOutsideKeralaCityVilgeEn}
                            permntOutsideKeralaVillage={permntOutsideKeralaVillage}
                            setpermntOutsideKeralaVillage={setpermntOutsideKeralaVillage}
                            permntOutsideKeralaPincode={permntOutsideKeralaPincode}
                            setpermntOutsideKeralaPincode={setpermntOutsideKeralaPincode}
                            permntOutsideKeralaHouseNameEn={permntOutsideKeralaHouseNameEn}
                            setpermntOutsideKeralaHouseNameEn={setpermntOutsideKeralaHouseNameEn}
                            permntOutsideKeralaHouseNameMl={permntOutsideKeralaHouseNameMl}
                            setpermntOutsideKeralaHouseNameMl={setpermntOutsideKeralaHouseNameMl}
                            permntOutsideKeralaLocalityNameEn={permntOutsideKeralaLocalityNameEn}
                            setpermntOutsideKeralaLocalityNameEn={setpermntOutsideKeralaLocalityNameEn}
                            permntOutsideKeralaLocalityNameMl={permntOutsideKeralaLocalityNameMl}
                            setpermntOutsideKeralaLocalityNameMl={setpermntOutsideKeralaLocalityNameMl}
                            permntOutsideKeralaStreetNameEn={permntOutsideKeralaStreetNameEn}
                            setpermntOutsideKeralaStreetNameEn={setpermntOutsideKeralaStreetNameEn}
                            permntOutsideKeralaStreetNameMl={permntOutsideKeralaStreetNameMl}
                            setpermntOutsideKeralaStreetNameMl={setpermntOutsideKeralaStreetNameMl}
                            permntOutsideKeralaPostOfficeEn={permntOutsideKeralaPostOfficeEn}
                            setpermntoutsideKeralaPostOfficeEn={setpermntoutsideKeralaPostOfficeEn}
                            permntOutsideKeralaPostOfficeMl={permntOutsideKeralaPostOfficeMl}
                            setpermntoutsideKeralaPostOfficeMl={setpermntoutsideKeralaPostOfficeMl}
                            value={value}
                            setValue={setValue}
                        />
                    </div>
                )}

            </FormStep>
        </React.Fragment>
    );
};
export default AddressBasePage;