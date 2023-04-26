import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/NACDRTimeline";
import { useTranslation } from "react-i18next";
import AddressPresent from "../birthComponents/AddressPresent";
import AddressPresentInsideKerala from "../birthComponents/AddressPresentInsideKerala";
import AddressPresentOutsideKerala from "../birthComponents/AddressPresentOutsideKerala";
import AddressPresentOutsideIndia from "../birthComponents/AddressPresentOutsideIndia";
import AddressSameAsAbove from "../birthComponents/AddressSameAsAbove";
import AddressPermanent from "../birthComponents/AddressPermanent";
import AddressPermanentInsideKerala from "../birthComponents/AddressPermanentInsideKerala";
import AddressPermanentOutsideKerala from "../birthComponents/AddressPermanentOutsideKerala";
import AddressPermanentOutsideIndia from "../birthComponents/AddressPermanentOutsideIndia";

const DeathNACAddressPage = ({ config, onSelect, userType, formData, isEditBirth = false, isEditDeath = false, isEditBirthNAC = false }) => {
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
    const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
    const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");

    const [lbs, setLbs] = useState(0);
    const [toast, setToast] = useState(false);

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

    //################################### Present Country State ############################################################################################

    const [presentaddressCountry, setaddressCountry] = useState(formData?.DeathNACAddressPage?.presentaddressCountry?.code ? formData?.DeathNACAddressPage?.presentaddressCountry : formData?.ChildDetails?.DeathNACAddressPage?.presentaddressCountry ? "" : "");
    const [presentaddressStateName, setaddressStateName] = useState(formData?.DeathNACAddressPage?.presentaddressStateName?.code ? formData?.DeathNACAddressPage?.presentaddressStateName : formData?.ChildDetails?.DeathNACAddressPage?.presentaddressStateName ? "" : "");
    const [countryvalue, setCountryValue] = useState(formData?.DeathNACAddressPage?.presentaddressCountry?.code ? formData?.DeathNACAddressPage?.presentaddressCountry.countrycode : formData?.ChildDetails?.DeathNACAddressPage?.presentaddressCountry ? "" : "")
    const [value, setValue] = useState(formData?.DeathNACAddressPage?.presentaddressStateName?.code ? formData?.DeathNACAddressPage?.presentaddressStateName.code : formData?.ChildDetails?.DeathNACAddressPage?.presentaddressStateName ? "" : "");

    //################################# Present Inside Kerala #########################################################################################################

    const [presentWardNo, setPresentWardNo] = useState(formData.DeathNACAddressPage?.presentWardNo?.code ? formData.DeathNACAddressPage?.presentWardNo : formData?.ChildDetails?.DeathNACAddressPage?.presentWardNo ? "" : "");
    const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaDistrict?.code ? formData?.DeathNACAddressPage?.presentInsideKeralaDistrict : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaDistrict ? "" : "");
    const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaLBTypeName ? formData?.DeathNACAddressPage?.presentInsideKeralaLBTypeName : null);
    const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaLBName?.code ? formData?.DeathNACAddressPage?.presentInsideKeralaLBName : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaLBName ? "" : "");
    const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaTaluk?.code ? formData?.DeathNACAddressPage?.presentInsideKeralaTaluk : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaTaluk ? "" : "");
    const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaVillage?.code ? formData?.DeathNACAddressPage?.presentInsideKeralaVillage : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaVillage ? "" : "");
    const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaPostOffice?.code ? formData?.DeathNACAddressPage?.presentInsideKeralaPostOffice : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaPostOffice ? "" : "");
    const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaPincode ? formData?.DeathNACAddressPage?.presentInsideKeralaPincode : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaPincode ? formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaPincode : "");
    const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaHouseNameEn ? formData?.DeathNACAddressPage?.presentInsideKeralaHouseNameEn : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaHouseNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaHouseNameEn : "");
    const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaHouseNameMl ? formData?.DeathNACAddressPage?.presentInsideKeralaHouseNameMl : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaHouseNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaHouseNameMl : "");
    const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaLocalityNameEn ? formData?.DeathNACAddressPage?.presentInsideKeralaLocalityNameEn : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaLocalityNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaLocalityNameEn : "");
    const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaLocalityNameMl ? formData?.DeathNACAddressPage?.presentInsideKeralaLocalityNameMl : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaLocalityNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaLocalityNameMl : "");
    const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaStreetNameEn ? formData?.DeathNACAddressPage?.presentInsideKeralaStreetNameEn : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaStreetNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaStreetNameEn : "");
    const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(formData?.DeathNACAddressPage?.presentInsideKeralaStreetNameMl ? formData?.DeathNACAddressPage?.presentInsideKeralaStreetNameMl : formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaStreetNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentInsideKeralaStreetNameMl : "");
    const [Talukvalues, setLbsTalukvalue] = useState(null);
    const [Districtvalues, setDistrictvalue] = useState(null);
    const [Villagevalues, setLbsVillagevalue] = useState(null);
    const [PostOfficevalues, setPostOfficevalues] = useState(null);
    //################################# Present Outside Kerala ##########################################################################################################
    const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaDistrict?.code ? formData?.DeathNACAddressPage?.presentOutsideKeralaDistrict : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaDistrict ? "" : "");
    const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaTaluk ? formData?.DeathNACAddressPage?.presentOutsideKeralaTaluk : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaTaluk ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaTaluk : "");
    // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaTaluk?.code ? formData?.DeathNACAddressPage?.presentOutsideKeralaTaluk : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaTaluk ? "" : "");
    const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaCityVilgeEn ? formData?.DeathNACAddressPage?.presentOutsideKeralaCityVilgeEn : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaCityVilgeEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaCityVilgeEn : "");
    const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaVillage?.code ? formData?.DeathNACAddressPage?.presentOutsideKeralaVillage : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaVillage ? "" : "");
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaPostOffice);
    const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaPincode ? formData?.DeathNACAddressPage?.presentOutsideKeralaPincode : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaPincode ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaPincode : "");
    const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaHouseNameEn ? formData?.DeathNACAddressPage?.presentOutsideKeralaHouseNameEn : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaHouseNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaHouseNameEn : "");
    const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaHouseNameMl ? formData?.DeathNACAddressPage?.presentOutsideKeralaHouseNameMl : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaHouseNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaHouseNameMl : "");
    const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameEn ? formData?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameEn : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameEn : "");
    const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameMl ? formData?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameMl : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaLocalityNameMl : "");
    const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaStreetNameEn ? formData?.DeathNACAddressPage?.presentOutsideKeralaStreetNameEn : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaStreetNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaStreetNameEn : "");
    const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaStreetNameMl ? formData?.DeathNACAddressPage?.presentOutsideKeralaStreetNameMl : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaStreetNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaStreetNameMl : "");
    const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeEn ? formData?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeEn : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeEn : "");
    const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeMl ? formData?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeMl : formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutsideKeralaPostOfficeMl : "");

    //############################################### Present Out Side India ###########################################################################################################

    const [presentOutSideIndiaAdressEn, setAdressEn] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaAdressEn ? formData?.DeathNACAddressPage?.presentOutSideIndiaAdressEn : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressEn : "");
    const [presentOutSideIndiaAdressMl, setAdressMl] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaAdressMl ? formData?.DeathNACAddressPage?.presentOutSideIndiaAdressMl : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressMl : "");
    const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaAdressEnB ? formData?.DeathNACAddressPage?.presentOutSideIndiaAdressEnB : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressEnB ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressEnB : "");
    const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaAdressMlB ? formData?.DeathNACAddressPage?.presentOutSideIndiaAdressMlB : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressMlB ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaAdressMlB : "");
    const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaProvinceEn ? formData?.DeathNACAddressPage?.presentOutSideIndiaProvinceEn : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaProvinceEn ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaProvinceEn : "");
    const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaProvinceMl ? formData?.DeathNACAddressPage?.presentOutSideIndiaProvinceMl : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaProvinceMl ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaProvinceMl : "");
    const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaadrsVillage?.code ? formData?.DeathNACAddressPage?.presentOutSideIndiaadrsVillage : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaadrsVillage ? "" : "");
    const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaadrsCityTown ? formData?.DeathNACAddressPage?.presentOutSideIndiaadrsCityTown : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaadrsCityTown ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaadrsCityTown : "");
    const [presentOutSideIndiaPostCode, setPostCode] = useState(formData?.DeathNACAddressPage?.presentOutSideIndiaPostCode ? formData?.DeathNACAddressPage?.presentOutSideIndiaPostCode : formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaPostCode ? formData?.ChildDetails?.DeathNACAddressPage?.presentOutSideIndiaPostCode : "");
    //const [presentOutSideCountry, setOutSideCountry] = useState(formData?.DeathNACAddressPage?.presentOutSideCountry ? formData?.DeathNACAddressPage?.presentOutSideCountry : null);

    //############################################### Same As Above ##################################################################################################

    const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.DeathNACAddressPage?.isPrsentAddress ? formData?.DeathNACAddressPage?.isPrsentAddress : formData?.ChildDetails?.DeathNACAddressPage?.isPrsentAddress ? formData?.ChildDetails?.DeathNACAddressPage?.isPrsentAddress : true);

    //################################################### Country State Permanent ###########################################################################

    const [permtaddressCountry, setpermtaddressCountry] = useState(formData?.DeathNACAddressPage?.permtaddressCountry?.code ? formData?.DeathNACAddressPage?.permtaddressCountry : formData?.ChildDetails?.DeathNACAddressPage?.permtaddressCountry ? "" : "");
    const [permtaddressStateName, setpermtaddressStateName] = useState(formData?.DeathNACAddressPage?.permtaddressStateName?.code ? formData?.DeathNACAddressPage?.permtaddressStateName : formData?.ChildDetails?.DeathNACAddressPage?.permtaddressStateName ? "" : "");
    const [countryValuePermanent, setCountryValuePermanent] = useState(formData?.DeathNACAddressPage?.permtaddressCountry?.code ? formData?.DeathNACAddressPage?.permtaddressCountry.countrycode : formData?.ChildDetails?.DeathNACAddressPage?.permtaddressCountry ? "" : "");
    const [valuePermanent, setValuePermanent] = useState(formData?.DeathNACAddressPage?.presentaddressStateName?.code ? formData?.DeathNACAddressPage?.permtaddressStateName.code : formData?.ChildDetails?.DeathNACAddressPage?.permtaddressStateName ? "" : "");

    //################################################# Permanent Inside Kerala ##########################################################################################

    const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrDistrict?.code ? formData?.DeathNACAddressPage?.permntInKeralaAdrDistrict : formData?.ChildDetails?.DeathNACAddressPage?.permtaddressCountry ? "" : "");
    // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrLBTypeName ? formData?.DeathNACAddressPage?.permntInKeralaAdrLBTypeName : null);
    const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrLBName?.code ? formData?.DeathNACAddressPage?.permntInKeralaAdrLBName : formData?.ChildDetails?.DeathNACAddressPage?.permntInKeralaAdrLBName ? "" : "");
    const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrTaluk ? formData?.DeathNACAddressPage?.permntInKeralaAdrTaluk : formData?.ChildDetails?.DeathNACAddressPage?.permntInKeralaAdrTaluk ? "" : "");
    const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrVillage ? formData?.DeathNACAddressPage?.permntInKeralaAdrVillage : formData?.ChildDetails?.DeathNACAddressPage?.permntInKeralaAdrVillage ? "" : "");
    const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrPostOffice ? formData?.DeathNACAddressPage?.permntInKeralaAdrPostOffice : formData?.ChildDetails?.DeathNACAddressPage?.permntInKeralaAdrPostOffice ? "" : "");
    const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrPincode ? formData?.DeathNACAddressPage?.permntInKeralaAdrPincode : "");
    const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrHouseNameEn ? formData?.DeathNACAddressPage?.permntInKeralaAdrHouseNameEn : "");
    const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrHouseNameMl ? formData?.DeathNACAddressPage?.permntInKeralaAdrHouseNameMl : "");
    const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrLocalityNameEn ? formData?.DeathNACAddressPage?.permntInKeralaAdrLocalityNameEn : "");
    const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrLocalityNameMl ? formData?.DeathNACAddressPage?.permntInKeralaAdrLocalityNameMl : "");
    const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrStreetNameEn ? formData?.DeathNACAddressPage?.permntInKeralaAdrStreetNameEn : "");
    const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(formData?.DeathNACAddressPage?.permntInKeralaAdrStreetNameMl ? formData?.DeathNACAddressPage?.permntInKeralaAdrStreetNameMl : "");
    const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(formData?.DeathNACAddressPage?.permntInKeralaWardNo ? formData?.DeathNACAddressPage?.permntInKeralaWardNo : formData?.ChildDetails?.DeathNACAddressPage?.permntInKeralaWardNo ? "" : "");

    //############################################################################### Permanent Outside Kerala ############################################################################

    const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaDistrict?.code ? formData?.DeathNACAddressPage?.permntOutsideKeralaDistrict : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaDistrict ? "" : "");
    const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaTaluk ? formData?.DeathNACAddressPage?.permntOutsideKeralaTaluk : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaTaluk ? "" : "");
    const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaCityVilgeEn ? formData?.DeathNACAddressPage?.permntOutsideKeralaCityVilgeEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaCityVilgeEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaCityVilgeEn : "");
    const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaVillage ? formData?.DeathNACAddressPage?.permntOutsideKeralaVillage : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaVillage ? "" : "");
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.DeathNACAddressPage?.presentOutsideKeralaPostOffice);
    const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaPincode ? formData?.DeathNACAddressPage?.permntOutsideKeralaPincode : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaPincode ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaPincode : "");
    const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaHouseNameEn ? formData?.DeathNACAddressPage?.permntOutsideKeralaHouseNameEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaHouseNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaHouseNameEn : "");
    const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaHouseNameMl ? formData?.DeathNACAddressPage?.permntOutsideKeralaHouseNameMl : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaHouseNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaHouseNameMl : "");
    const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameEn ? formData?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameEn : "");
    const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameMl ? formData?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameMl : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaLocalityNameMl : "");
    const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaStreetNameEn ? formData?.DeathNACAddressPage?.permntOutsideKeralaStreetNameEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaStreetNameEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaStreetNameEn : "");
    const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaStreetNameMl ? formData?.DeathNACAddressPage?.permntOutsideKeralaStreetNameMl : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaStreetNameMl ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaStreetNameMl : "");
    const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeEn ? formData?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeEn : "");
    const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(formData?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeMl ? formData?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeMl : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideKeralaPostOfficeMl : "");

    //######################################################################## Permanent Ouside Country #############################################################################################

    const [permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaLineoneEn ? formData?.DeathNACAddressPage?.permntOutsideIndiaLineoneEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLineoneEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLineoneEn : "");
    const [permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaLineoneMl ? formData?.DeathNACAddressPage?.permntOutsideIndiaLineoneMl : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLineoneMl ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLineoneMl : "");
    const [permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaLinetwoEn ? formData?.DeathNACAddressPage?.permntOutsideIndiaLinetwoEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLinetwoEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLinetwoEn : "");
    const [permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaLinetwoMl ? formData?.DeathNACAddressPage?.permntOutsideIndiaLinetwoMl : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLinetwoMl ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaLinetwoMl : "");
    const [permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaprovinceEn ? formData?.DeathNACAddressPage?.permntOutsideIndiaprovinceEn : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaprovinceEn ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaprovinceEn : "");
    const [permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaprovinceMl ? formData?.DeathNACAddressPage?.permntOutsideIndiaprovinceMl : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaprovinceMl ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaprovinceMl : "");
    const [permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaVillage?.code ? formData?.DeathNACAddressPage?.permntOutsideIndiaVillage : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaVillage ? "" : "");
    const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaCityTown ? formData?.DeathNACAddressPage?.permntOutsideIndiaCityTown : formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaCityTown ? formData?.ChildDetails?.DeathNACAddressPage?.permntOutsideIndiaCityTown : "");
    const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(formData?.DeathNACAddressPage?.permanentOutsideIndiaPostCode ? formData?.DeathNACAddressPage?.permanentOutsideIndiaPostCode : formData?.ChildDetails?.DeathNACAddressPage?.permanentOutsideIndiaPostCode ? formData?.ChildDetails?.DeathNACAddressPage?.permanentOutsideIndiaPostCode : "");
    //const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(formData?.DeathNACAddressPage?.permntOutsideIndiaCountry ? formData?.DeathNACAddressPage?.permntOutsideIndiaCountry : null);

    //############################################################# Error Constants #####################################################################################

    const [PresentAddressCountryError, setPresentAddressCountryError] = useState(formData?.DeathNACAddressPage?.PresentAddressCountryError ? false : false);
    const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(formData?.DeathNACAddressPage?.PresentAddressStateNameError ? false : false);
    const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaDistrictError ? false : false);
    const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaTalukError ? false : false);
    const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaVillageError ? false : false);
    const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaLBNameError ? false : false);
    const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaWardNoError ? false : false);
    const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaHouseNameEnError ? false : false);
    const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaHouseNameMlError ? false : false);
    const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaLocalityNameEnError ? false : false);
    const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaLocalityNameMlError ? false : false);

    const [PresentInsideKeralaStreetNameEnError, setPresentInsideKeralaStreetNameEnError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaStreetNameEnError ? false : false);
    const [PresentInsideKeralaStreetNameMlError, setPresentInsideKeralaStreetNameMlError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaStreetNameMlError ? false : false);

    const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaPostOfficeError ? false : false);
    const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(formData?.DeathNACAddressPage?.PresentInsideKeralaPincodeError ? false : false);
    const [PresentCityVillageError, setCityVillageError] = useState(formData?.DeathNACAddressPage?.PresentCityVillageError ? false : false);
    const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaProvinceEnError ? false : false);
    const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaProvinceMlError ? false : false);
    const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaCityError ? false : false);
    const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaPostCodeError ? false : false);
    const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaLineOneEnError ? false : false);
    const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaLineOneMlError ? false : false);
    const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaLineTwoEnError ? false : false);
    const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(formData?.DeathNACAddressPage?.PresentOutSideIndiaLineTwoMlError ? false : false);

    const onSkip = () => onSelect();
    let validFlag = true;
    const goNext = () => {
        if (isPrsentAddress === true || isPrsentAddress === false) {
            if (countryvalue === "IND" && value === "KL") {
                if (presentaddressCountry == null || presentaddressCountry == undefined) {
                    setPresentAddressCountryError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentAddressCountryError(false);
                }
                if (presentaddressStateName == null || presentaddressStateName == undefined) {
                    setPresentAddressStateNameError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentAddressStateNameError(false);
                }
                if (presentInsideKeralaDistrict == null || presentInsideKeralaDistrict == undefined) {
                    setPresentInsideKeralaDistrictError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaDistrictError(false);
                }
                if (presentInsideKeralaTaluk == null || presentInsideKeralaTaluk == undefined) {
                    setPresentInsideKeralaTalukError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaTalukError(false);
                }
                if (presentInsideKeralaVillage == null || presentInsideKeralaVillage == undefined) {
                    setPresentInsideKeralaVillageError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaVillageError(false);
                }
                if (presentInsideKeralaLBName == null || presentInsideKeralaLBName == undefined) {
                    setPresentInsideKeralaLBNameError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaLBNameError(false);
                }
                if (presentWardNo == null || presentWardNo == undefined) {
                    setPresentInsideKeralaWardNoError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaWardNoError(false);
                }
                if (presentInsideKeralaHouseNameEn == null || presentInsideKeralaHouseNameEn == undefined || presentInsideKeralaHouseNameEn == "") {
                    setPresentInsideKeralaHouseNameEnError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaHouseNameEnError(false);
                }
                if (presentInsideKeralaHouseNameMl == null || presentInsideKeralaHouseNameMl == undefined || presentInsideKeralaHouseNameMl == "") {
                    setPresentInsideKeralaHouseNameMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaHouseNameMlError(false);
                }
                if (presentInsideKeralaLocalityNameEn == null || presentInsideKeralaLocalityNameEn == undefined || presentInsideKeralaLocalityNameEn == "") {
                    setPresentInsideKeralaLocalityNameEnError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaLocalityNameEnError(false);
                }
                if (presentInsideKeralaLocalityNameMl == null || presentInsideKeralaLocalityNameMl == undefined || presentInsideKeralaLocalityNameMl == "") {
                    setPresentInsideKeralaLocalityNameMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaLocalityNameMlError(false);
                }
                if (presentInsideKeralaPostOffice == null || presentInsideKeralaPostOffice == undefined) {
                    setPresentInsideKeralaPostOfficeError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaPostOfficeError(false);
                }
                if (presentInsideKeralaPincode == null || presentInsideKeralaPincode == undefined || presentInsideKeralaPincode == "") {
                    setPresentInsideKeralaPincodeError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaPincodeError(false);
                }
            }
            if (countryvalue === "IND" && value != "KL") {
                if (presentaddressCountry == null || presentaddressCountry == undefined) {
                    setPresentAddressCountryError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentAddressCountryError(false);
                }
                if (presentaddressStateName == null || presentaddressStateName == undefined) {
                    setPresentAddressStateNameError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentAddressStateNameError(false);
                }
                if (presentOutsideKeralaDistrict == null || presentOutsideKeralaDistrict == undefined) {
                    setPresentInsideKeralaDistrictError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaDistrictError(false);
                }
                if (presentOutsideKeralaTaluk == null || presentOutsideKeralaTaluk == undefined || presentOutsideKeralaTaluk == "") {
                    setPresentInsideKeralaTalukError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaTalukError(false);
                }
                if (presentOutsideKeralaVillage == null || presentOutsideKeralaVillage == undefined) {
                    setPresentInsideKeralaVillageError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaVillageError(false);
                }
                if (presentOutsideKeralaCityVilgeEn == null || presentOutsideKeralaCityVilgeEn == undefined || presentOutsideKeralaCityVilgeEn == "") {
                    setCityVillageError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setCityVillageError(false);
                }
                if (presentOutsideKeralaPincode == null || presentOutsideKeralaPincode == undefined || presentOutsideKeralaPincode == "") {
                    setPresentInsideKeralaPincodeError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaPincodeError(false);
                }
                if (presentOutsideKeralaPostOfficeEn == null || presentOutsideKeralaPostOfficeEn == undefined || presentOutsideKeralaPostOfficeEn == "") {
                    setPresentInsideKeralaPostOfficeError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaPostOfficeError(false);
                }
                if (presentOutsideKeralaPostOfficeMl == null || presentOutsideKeralaPostOfficeMl == undefined || presentOutsideKeralaPostOfficeMl == "") {
                    setPresentInsideKeralaPostOfficeError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaPostOfficeError(false);
                }
                if (presentOutsideKeralaLocalityNameEn == null || presentOutsideKeralaLocalityNameEn == undefined || presentOutsideKeralaLocalityNameEn == "") {
                    setPresentInsideKeralaLocalityNameEnError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaLocalityNameEnError(false);
                }
                if (presentOutsideKeralaLocalityNameMl == null || presentOutsideKeralaLocalityNameMl == undefined || presentOutsideKeralaLocalityNameMl == "") {
                    setPresentInsideKeralaLocalityNameMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaLocalityNameMlError(false);
                }
                if (presentInsideKeralaStreetNameEn != null || presentInsideKeralaStreetNameEn != undefined || presentInsideKeralaStreetNameEn != "") {
                    if (presentInsideKeralaStreetNameMl == null || presentInsideKeralaStreetNameMl == undefined || presentInsideKeralaStreetNameMl == "") {
                        setPresentInsideKeralaStreetNameMlError(true);
                        validFlag = false;
                        setToast(true);
                        setTimeout(() => {
                            setToast(false);
                        }, 2000);
                    } else {
                        setPresentInsideKeralaStreetNameMlError(false);
                    }
                } else {
                    setPresentInsideKeralaStreetNameMlError(false);
                }
                if (presentInsideKeralaStreetNameMl != null || presentInsideKeralaStreetNameMl != undefined || presentInsideKeralaStreetNameMl != "") {
                    if (presentInsideKeralaStreetNameEn == null || presentInsideKeralaStreetNameEn == undefined || presentInsideKeralaStreetNameEn == "") {
                        setPresentInsideKeralaStreetNameEnError(true);
                        validFlag = false;
                        setToast(true);
                        setTimeout(() => {
                            setToast(false);
                        }, 2000);
                    } else {
                        setPresentInsideKeralaStreetNameEnError(false);
                    }
                } else {
                    setPresentInsideKeralaStreetNameEnError(false);
                }
                if (presentOutsideKeralaHouseNameEn == null || presentOutsideKeralaHouseNameEn == undefined || presentOutsideKeralaHouseNameEn == "") {
                    setPresentInsideKeralaHouseNameEnError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaHouseNameEnError(false);
                }
                if (presentOutsideKeralaHouseNameMl == null || presentOutsideKeralaHouseNameMl == undefined || presentOutsideKeralaHouseNameMl == "") {
                    setPresentInsideKeralaHouseNameMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaHouseNameMlError(false);
                }
            }
            if (countryvalue != "IND") {

                if (presentaddressCountry == null || presentaddressCountry == undefined) {
                    setPresentAddressCountryError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentAddressCountryError(false);
                }
                // if (presentOutSideCountry == null || presentOutSideCountry == undefined) {
                //     setPresentAddressCountryError(true);
                //     validFlag = false;
                //     setToast(true);
                //     setTimeout(() => {
                //         setToast(false);
                //     }, 2000);
                // } else {
                //     setPresentAddressCountryError(false);
                // }
                if (presentOutSideIndiaProvinceEn == null || presentOutSideIndiaProvinceEn == undefined || presentOutSideIndiaProvinceEn == "") {
                    setPresentOutSideIndiaProvinceEnError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaProvinceEnError(false);
                }
                if (presentOutSideIndiaProvinceMl == null || presentOutSideIndiaProvinceMl == undefined || presentOutSideIndiaProvinceMl == "") {
                    setPresentOutSideIndiaProvinceMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaProvinceMlError(false);
                }
                if (presentOutSideIndiaadrsVillage == null || presentOutSideIndiaadrsVillage == undefined) {
                    setPresentInsideKeralaVillageError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentInsideKeralaVillageError(false);
                }
                if (presentOutSideIndiaadrsCityTown == null || presentOutSideIndiaadrsCityTown == undefined || presentOutSideIndiaadrsCityTown == "") {
                    setPresentOutSideIndiaCityError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaCityError(false);
                }
                if (presentOutSideIndiaPostCode == null || presentOutSideIndiaPostCode == undefined || presentOutSideIndiaPostCode == "") {
                    setPresentOutSideIndiaPostCodeError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaPostCodeError(false);
                }
                if (presentOutSideIndiaAdressEn == null || presentOutSideIndiaAdressEn == undefined || presentOutSideIndiaAdressEn == "") {
                    setPresentOutSideIndiaLineOneEnError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaLineOneEnError(false);
                }
                if (presentOutSideIndiaAdressMl == null || presentOutSideIndiaAdressMl == undefined || presentOutSideIndiaAdressMl == "") {
                    setPresentOutSideIndiaLineOneMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaLineOneMlError(false);
                }
                if (presentOutSideIndiaAdressMl == null || presentOutSideIndiaAdressMl == undefined || presentOutSideIndiaAdressMl == "") {
                    setPresentOutSideIndiaLineOneMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaLineOneMlError(false);
                }
                if (presentOutSideIndiaAdressEnB == null || presentOutSideIndiaAdressEnB == undefined || presentOutSideIndiaAdressEnB == "") {
                    setPresentOutSideIndiaLineTwoEnError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaLineTwoEnError(false);
                }
                if (presentOutSideIndiaAdressMlB == null || presentOutSideIndiaAdressMlB == undefined || presentOutSideIndiaAdressMlB == "") {
                    setPresentOutSideIndiaLineTwoMlError(true);
                    validFlag = false;
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setPresentOutSideIndiaLineTwoMlError(false);
                }

            }
        }
        if (validFlag === true) {
            //################################# Present Inside Kerala ############################################################################

            sessionStorage.setItem("presentaddressCountry", presentaddressCountry.code);
            sessionStorage.setItem("presentaddressStateName", presentaddressStateName.code);
            sessionStorage.setItem("presentInsideKeralaDistrict", presentInsideKeralaDistrict ? presentInsideKeralaDistrict.code : null);
            sessionStorage.setItem("presentInsideKeralaTaluk", presentInsideKeralaTaluk ? presentInsideKeralaTaluk.code : null);
            sessionStorage.setItem("presentInsideKeralaVillage", presentInsideKeralaVillage ? presentInsideKeralaVillage.code : null);
            sessionStorage.setItem("presentInsideKeralaLBName", presentInsideKeralaLBName ? presentInsideKeralaLBName : null);
            sessionStorage.setItem("presentWardNo", presentWardNo ? presentWardNo.code : null);
            sessionStorage.setItem("presentInsideKeralaHouseNameEn", presentInsideKeralaHouseNameEn ? presentInsideKeralaHouseNameEn : null);
            sessionStorage.setItem("presentInsideKeralaHouseNameMl", presentInsideKeralaHouseNameMl ? presentInsideKeralaHouseNameMl : null);
            sessionStorage.setItem("presentInsideKeralaLocalityNameEn", presentInsideKeralaLocalityNameEn ? presentInsideKeralaLocalityNameEn : null);
            sessionStorage.setItem("presentInsideKeralaLocalityNameMl", presentInsideKeralaLocalityNameMl ? presentInsideKeralaLocalityNameMl : null);
            sessionStorage.setItem("presentInsideKeralaStreetNameEn", presentInsideKeralaStreetNameEn ? presentInsideKeralaStreetNameEn : null);
            sessionStorage.setItem("presentInsideKeralaStreetNameMl", presentInsideKeralaStreetNameMl ? presentInsideKeralaStreetNameMl : null);
            sessionStorage.setItem("presentInsideKeralaPostOffice", presentInsideKeralaPostOffice ? presentInsideKeralaPostOffice.code : null);
            sessionStorage.setItem("presentInsideKeralaPincode", presentInsideKeralaPincode ? presentInsideKeralaPincode.code : null);

            //################################# Present Outside Kerala ############################################################################

            sessionStorage.setItem("presentOutsideKeralaDistrict", presentOutsideKeralaDistrict ? presentOutsideKeralaDistrict.code : null);
            sessionStorage.setItem("presentOutsideKeralaCityVilgeEn", presentOutsideKeralaCityVilgeEn ? presentOutsideKeralaCityVilgeEn : null);
            sessionStorage.setItem("presentOutsideKeralaVillage", presentOutsideKeralaVillage ? presentOutsideKeralaVillage.code : null);
            sessionStorage.setItem("presentOutsideKeralaTaluk", presentOutsideKeralaTaluk ? presentOutsideKeralaTaluk : null);
            sessionStorage.setItem("presentOutsideKeralaPostOfficeEn", presentOutsideKeralaPostOfficeEn ? presentOutsideKeralaPostOfficeEn : null);
            sessionStorage.setItem("presentOutsideKeralaPostOfficeMl", presentOutsideKeralaPostOfficeMl ? presentOutsideKeralaPostOfficeMl : null);
            sessionStorage.setItem("presentOutsideKeralaPincode", presentOutsideKeralaPincode ? presentOutsideKeralaPincode : null);
            sessionStorage.setItem("presentOutsideKeralaHouseNameEn", presentOutsideKeralaHouseNameEn ? presentOutsideKeralaHouseNameEn : null);
            sessionStorage.setItem("presentOutsideKeralaHouseNameMl", presentOutsideKeralaHouseNameMl ? presentOutsideKeralaHouseNameMl : null);
            sessionStorage.setItem("presentOutsideKeralaLocalityNameEn", presentOutsideKeralaLocalityNameEn ? presentOutsideKeralaLocalityNameEn : null);
            sessionStorage.setItem("presentOutsideKeralaLocalityNameMl", presentOutsideKeralaLocalityNameMl ? presentOutsideKeralaLocalityNameMl : null);
            sessionStorage.setItem("presentOutsideKeralaStreetNameEn", presentOutsideKeralaStreetNameEn ? presentOutsideKeralaStreetNameEn : null);
            sessionStorage.setItem("presentOutsideKeralaStreetNameMl", presentOutsideKeralaStreetNameMl ? presentOutsideKeralaStreetNameMl : null);

            //####################################### Present Outside India ##############################################################
            sessionStorage.setItem("presentOutSideIndiaAdressEn", presentOutSideIndiaAdressEn ? presentOutSideIndiaAdressEn : null);
            sessionStorage.setItem("presentOutSideIndiaAdressMl", presentOutSideIndiaAdressMl ? presentOutSideIndiaAdressMl : null);
            sessionStorage.setItem("presentOutSideIndiaAdressEnB", presentOutSideIndiaAdressEnB ? presentOutSideIndiaAdressEnB : null);
            sessionStorage.setItem("presentOutSideIndiaAdressMlB", presentOutSideIndiaAdressMlB ? presentOutSideIndiaAdressMlB : null);
            sessionStorage.setItem("presentOutSideIndiaProvinceEn", presentOutSideIndiaProvinceEn ? presentOutSideIndiaProvinceEn : null);
            sessionStorage.setItem("presentOutSideIndiaProvinceMl", presentOutSideIndiaProvinceMl ? presentOutSideIndiaProvinceMl : null);
            sessionStorage.setItem("presentOutSideIndiaadrsVillage", presentOutSideIndiaadrsVillage ? presentOutSideIndiaadrsVillage.code : null);
            sessionStorage.setItem("presentOutSideIndiaPostCode", presentOutSideIndiaPostCode ? presentOutSideIndiaPostCode : null);
            // sessionStorage.setItem("presentOutSideCountry", presentOutSideCountry ? presentOutSideCountry.code : null);
            sessionStorage.setItem("presentOutSideIndiaadrsCityTown", presentOutSideIndiaadrsCityTown ? presentOutSideIndiaadrsCityTown : null);
            sessionStorage.setItem("isPrsentAddress", isPrsentAddress ? isPrsentAddress : true);

            sessionStorage.setItem("permtaddressCountry", permtaddressCountry ? permtaddressCountry.code : null);
            sessionStorage.setItem("permtaddressStateName", permtaddressStateName ? permtaddressStateName.code : null);
            sessionStorage.setItem("permntInKeralaAdrHouseNameEn", permntInKeralaAdrHouseNameEn ? permntInKeralaAdrHouseNameEn : "");
            sessionStorage.setItem("permntInKeralaAdrHouseNameMl", permntInKeralaAdrHouseNameMl ? permntInKeralaAdrHouseNameMl : "");
            sessionStorage.setItem("permntInKeralaAdrLocalityNameEn", permntInKeralaAdrLocalityNameEn ? permntInKeralaAdrLocalityNameEn : "");
            sessionStorage.setItem("permntInKeralaAdrLocalityNameMl", permntInKeralaAdrLocalityNameMl ? permntInKeralaAdrLocalityNameMl : "");
            sessionStorage.setItem("permntInKeralaAdrStreetNameEn", permntInKeralaAdrStreetNameEn ? permntInKeralaAdrStreetNameEn : "");
            sessionStorage.setItem("permntInKeralaAdrStreetNameMl", permntInKeralaAdrStreetNameMl ? permntInKeralaAdrStreetNameMl : "");
            sessionStorage.setItem("permntInKeralaAdrVillage", permntInKeralaAdrVillage ? permntInKeralaAdrVillage.code : null);
            sessionStorage.setItem("permntInKeralaAdrLBName", permntInKeralaAdrLBName ? permntInKeralaAdrLBName.code : null);
            sessionStorage.setItem("permntInKeralaAdrDistrict", permntInKeralaAdrDistrict ? permntInKeralaAdrDistrict.code : null);
            sessionStorage.setItem("permntInKeralaAdrTaluk", permntInKeralaAdrTaluk ? permntInKeralaAdrTaluk.code : null);
            sessionStorage.setItem("permntInKeralaAdrPostOffice", permntInKeralaAdrPostOffice ? permntInKeralaAdrPostOffice.code : null);
            sessionStorage.setItem("permntInKeralaAdrPincode", permntInKeralaAdrPincode ? permntInKeralaAdrPincode.code : null);
            sessionStorage.setItem("permntInKeralaWardNo", permntInKeralaWardNo ? permntInKeralaWardNo.code : null);
            sessionStorage.setItem("permntOutsideKeralaDistrict", permntOutsideKeralaDistrict ? permntOutsideKeralaDistrict.code : null);
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
            sessionStorage.setItem("permntOutsideIndiaLineoneEn", permntOutsideIndiaLineoneEn ? permntOutsideIndiaLineoneEn : null);
            sessionStorage.setItem("permntOutsideIndiaLineoneMl", permntOutsideIndiaLineoneMl ? permntOutsideIndiaLineoneMl : null);
            sessionStorage.setItem("permntOutsideIndiaLinetwoEn", permntOutsideIndiaLinetwoEn ? permntOutsideIndiaLinetwoEn : null);
            sessionStorage.setItem("permntOutsideIndiaLinetwoMl", permntOutsideIndiaLinetwoMl ? permntOutsideIndiaLinetwoMl : null);
            sessionStorage.setItem("permntOutsideIndiaprovinceEn", permntOutsideIndiaprovinceEn ? permntOutsideIndiaprovinceEn : null);
            sessionStorage.setItem("permntOutsideIndiaVillage", permntOutsideIndiaVillage ? permntOutsideIndiaVillage.code : null);
            sessionStorage.setItem("permntOutsideIndiaCityTown", permntOutsideIndiaCityTown ? permntOutsideIndiaCityTown : null);
            sessionStorage.setItem("permanentOutsideIndiaPostCode", permanentOutsideIndiaPostCode ? permanentOutsideIndiaPostCode : null);
            // sessionStorage.setItem("permntOutsideIndiaCountry", permntOutsideIndiaCountry ? permntOutsideIndiaCountry.code : null);

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
                presentOutsideKeralaPostOfficeEn,
                presentOutsideKeralaPostOfficeMl,
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
                presentOutSideIndiaProvinceEn,
                // presentOutSideCountry,
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
                permntOutsideKeralaPostOfficeMl,
                permntOutsideIndiaLineoneEn,
                permntOutsideIndiaLineoneMl,
                permntOutsideIndiaLinetwoEn,
                permntOutsideIndiaLinetwoMl,
                permntOutsideIndiaprovinceEn,
                permntOutsideIndiaVillage,
                permntOutsideIndiaCityTown,
                permanentOutsideIndiaPostCode,
                // permntOutsideIndiaCountry
            });
        }
    };
    if (isCountryLoading || isStateLoading || islocalbodiesLoading || isTalukLoading || isVillageLoading || isDistrictLoading || isPostOfficeLoading || isWardLoaded) {
        return <Loader></Loader>;
    } else
        return (
            <React.Fragment>
                <BackButton>{t("CS_COMMON_BACK")}</BackButton>
                {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
                {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
                {/* {window.location.href.includes("/citizen/cr/cr-birth-creation/address-birth") ? <Timeline currentStep={3} /> : null || window.location.href.includes("employee/cr/cr-flow") ? <Timeline currentStep={3} /> : null}
                {window.location.href.includes("/citizen/cr/cr-death-creation/address-death") ? <DRTimeline currentStep={2} /> : null || window.location.href.includes("employee/cr/death-flow") ? <DRTimeline currentStep={2} /> : null} */}
                <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >

                    <div className="accordion-wrapper">
                        <AddressPresent
                            presentaddressCountry={presentaddressCountry}
                            setaddressCountry={setaddressCountry}
                            presentaddressStateName={presentaddressStateName}
                            setaddressStateName={setaddressStateName}
                            presentOutsideKeralaDistrict={presentOutsideKeralaDistrict}
                            setoutsideKeralaDistrict={setoutsideKeralaDistrict}
                            value={value}
                            setValue={setValue}
                            countryvalue={countryvalue}
                            setCountryValue={setCountryValue}
                            Villagevalues={Villagevalues}
                            setLbsVillagevalue={setLbsVillagevalue}
                            permtaddressCountry={permtaddressCountry}
                            setpermtaddressCountry={setpermtaddressCountry}
                            permtaddressStateName={permtaddressStateName}
                            setpermtaddressStateName={setpermtaddressStateName}
                            isPrsentAddress={isPrsentAddress}
                            setIsPrsentAddress={setIsPrsentAddress}
                            isEditBirth={isEditBirth}
                            isEditDeath={isEditDeath}
                            isEditBirthNAC={isEditBirthNAC}
                            formData={formData}
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
                                presentInsideKeralaStreetNameEn={presentInsideKeralaStreetNameEn}
                                setinsideKeralaStreetNameEn={setinsideKeralaStreetNameEn}
                                presentInsideKeralaStreetNameMl={presentInsideKeralaStreetNameMl}
                                setinsideKeralaStreetNameMl={setinsideKeralaStreetNameMl}
                                lbs={lbs}
                                setLbs={setLbs}
                                Talukvalues={Talukvalues}
                                Districtvalues={Districtvalues}
                                setDistrictvalue={setDistrictvalue}
                                setLbsTalukvalue={setLbsTalukvalue}
                                Villagevalues={Villagevalues}
                                setLbsVillagevalue={setLbsVillagevalue}
                                PostOfficevalues={PostOfficevalues}
                                setPostOfficevalues={setPostOfficevalues}
                                isPrsentAddress={isPrsentAddress}
                                setIsPrsentAddress={setIsPrsentAddress}
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
                                isEditBirth={isEditBirth}
                                isEditDeath={isEditDeath}
                                isEditBirthNAC={isEditBirthNAC}
                                formData={formData}
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
                                isPrsentAddress={isPrsentAddress}
                                setIsPrsentAddress={setIsPrsentAddress}
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
                                isEditBirth={isEditBirth}
                                isEditDeath={isEditDeath}
                                isEditBirthNAC={isEditBirthNAC}
                                formData={formData}
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
                                presentOutSideIndiaProvinceEn={presentOutSideIndiaProvinceEn}
                                setProvinceEn={setProvinceEn}
                                presentOutSideIndiaProvinceMl={presentOutSideIndiaProvinceMl}
                                setProvinceMl={setProvinceMl}
                                presentOutSideIndiaadrsVillage={presentOutSideIndiaadrsVillage}
                                setadrsVillage={setadrsVillage}
                                presentOutSideIndiaadrsCityTown={presentOutSideIndiaadrsCityTown}
                                setadrsCityTown={setadrsCityTown}
                                presentOutSideIndiaPostCode={presentOutSideIndiaPostCode}
                                setPostCode={setPostCode}
                                // presentOutSideCountry={presentOutSideCountry}
                                // setOutSideCountry={setOutSideCountry}
                                countryvalue={countryvalue}
                                setCountryValue={setCountryValue}
                                isPrsentAddress={isPrsentAddress}
                                setIsPrsentAddress={setIsPrsentAddress}
                                permntOutsideIndiaLineoneEn={permntOutsideIndiaLineoneEn}
                                setadrsPermntOutsideIndiaLineoneEn={setadrsPermntOutsideIndiaLineoneEn}
                                permntOutsideIndiaLineoneMl={permntOutsideIndiaLineoneMl}
                                setadrsPermntOutsideIndiaLineoneMl={setadrsPermntOutsideIndiaLineoneMl}
                                permntOutsideIndiaLinetwoEn={permntOutsideIndiaLinetwoEn}
                                setadrsPermntOutsideIndiaLinetwoEn={setadrsPermntOutsideIndiaLinetwoEn}
                                permntOutsideIndiaLinetwoMl={permntOutsideIndiaLinetwoMl}
                                setadrsPermntOutsideIndiaLinetwoMl={setadrsPermntOutsideIndiaLinetwoMl}
                                permntOutsideIndiaprovinceEn={permntOutsideIndiaprovinceEn}
                                setPermntOutsideIndiaprovinceEn={setPermntOutsideIndiaprovinceEn}
                                permntOutsideIndiaprovinceMl={permntOutsideIndiaprovinceMl}
                                setPermntOutsideIndiaprovinceMl={setPermntOutsideIndiaprovinceMl}
                                permntOutsideIndiaVillage={permntOutsideIndiaVillage}
                                setadrsPermntOutsideIndiaVillage={setadrsPermntOutsideIndiaVillage}
                                permntOutsideIndiaCityTown={permntOutsideIndiaCityTown}
                                setadrsPermntOutsideIndiaCityTown={setadrsPermntOutsideIndiaCityTown}
                                permanentOutsideIndiaPostCode={permanentOutsideIndiaPostCode}
                                setPermantpostCode={setPermantpostCode}
                                // permntOutsideIndiaCountry={permntOutsideIndiaCountry}
                                // setPermntOutsideIndiaCountry={setPermntOutsideIndiaCountry}
                                isEditBirth={isEditBirth}
                                isEditDeath={isEditDeath}
                                isEditBirthNAC={isEditBirthNAC}
                                formData={formData}
                            />
                        </div>
                    )}
                    <div>
                        <AddressSameAsAbove
                            isPrsentAddress={isPrsentAddress}
                            setIsPrsentAddress={setIsPrsentAddress}
                            isEditBirth={isEditBirth}
                            isEditDeath={isEditDeath}
                            isEditBirthNAC={isEditBirthNAC}
                            formData={formData}
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
                                countryValuePermanent={countryValuePermanent}
                                setCountryValuePermanent={setCountryValuePermanent}
                                valuePermanent={valuePermanent}
                                setValuePermanent={setValuePermanent}
                                isEditBirth={isEditBirth}
                                isEditDeath={isEditDeath}
                                isEditBirthNAC={isEditBirthNAC}
                                formData={formData}
                            />
                        </div>
                    )}
                    {countryValuePermanent === "IND" && valuePermanent === "KL" && isPrsentAddress === false && (
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
                                PostOfficevalues={PostOfficevalues}
                                setPostOfficevalues={setPostOfficevalues}
                                isEditBirth={isEditBirth}
                                isEditDeath={isEditDeath}
                                isEditBirthNAC={isEditBirthNAC}
                                formData={formData}
                            />
                        </div>
                    )}
                    {countryValuePermanent === "IND" && valuePermanent !== "KL" && isPrsentAddress === false && (
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
                                isEditBirth={isEditBirth}
                                isEditDeath={isEditDeath}
                                isEditBirthNAC={isEditBirthNAC}
                                formData={formData}
                            />
                        </div>
                    )}
                    {countryValuePermanent != "IND" && isPrsentAddress === false && (
                        <div>
                            <AddressPermanentOutsideIndia
                                permntOutsideIndiaLineoneEn={permntOutsideIndiaLineoneEn}
                                setadrsPermntOutsideIndiaLineoneEn={setadrsPermntOutsideIndiaLineoneEn}
                                permntOutsideIndiaLineoneMl={permntOutsideIndiaLineoneMl}
                                setadrsPermntOutsideIndiaLineoneMl={setadrsPermntOutsideIndiaLineoneMl}
                                permntOutsideIndiaLinetwoEn={permntOutsideIndiaLinetwoEn}
                                setadrsPermntOutsideIndiaLinetwoEn={setadrsPermntOutsideIndiaLinetwoEn}
                                permntOutsideIndiaLinetwoMl={permntOutsideIndiaLinetwoMl}
                                setadrsPermntOutsideIndiaLinetwoMl={setadrsPermntOutsideIndiaLinetwoMl}
                                permntOutsideIndiaprovinceEn={permntOutsideIndiaprovinceEn}
                                setPermntOutsideIndiaprovinceEn={setPermntOutsideIndiaprovinceEn}
                                permntOutsideIndiaVillage={permntOutsideIndiaVillage}
                                setadrsPermntOutsideIndiaVillage={setadrsPermntOutsideIndiaVillage}
                                permntOutsideIndiaCityTown={permntOutsideIndiaCityTown}
                                setadrsPermntOutsideIndiaCityTown={setadrsPermntOutsideIndiaCityTown}
                                permanentOutsideIndiaPostCode={permanentOutsideIndiaPostCode}
                                setPermantpostCode={setPermantpostCode}
                                permntOutsideIndiaprovinceMl={permntOutsideIndiaprovinceMl}
                                setPermntOutsideIndiaprovinceMl={setPermntOutsideIndiaprovinceMl}
                                // permntOutsideIndiaCountry={permntOutsideIndiaCountry}
                                // setPermntOutsideIndiaCountry={setPermntOutsideIndiaCountry}
                                countryvalue={countryvalue}
                                setCountryValue={setCountryValue}
                                isEditBirth={isEditBirth}
                                isEditDeath={isEditDeath}
                                isEditBirthNAC={isEditBirthNAC}
                                formData={formData}
                            />
                        </div>
                    )}
                    {toast && (
                        <Toast
                            error={
                                PresentAddressCountryError || PresentAddressStateNameError || PresentInsideKeralaDistrictError ||
                                PresentInsideKeralaTalukError || PresentInsideKeralaVillageError || PresentInsideKeralaLBNameError ||
                                PresentInsideKeralaWardNoError || PresentInsideKeralaHouseNameEnError || PresentInsideKeralaHouseNameMlError ||
                                PresentInsideKeralaLocalityNameEnError || PresentInsideKeralaLocalityNameMlError || PresentInsideKeralaPostOfficeError ||
                                PresentInsideKeralaPincodeError || PresentCityVillageError || PresentOutSideIndiaProvinceEnError || PresentOutSideIndiaProvinceMlError
                                || PresentOutSideIndiaCityError || PresentOutSideIndiaPostCodeError || PresentOutSideIndiaLineOneEnError || PresentOutSideIndiaLineOneMlError
                                || PresentOutSideIndiaLineTwoEnError || PresentOutSideIndiaLineTwoMlError || PresentInsideKeralaStreetNameEnError || PresentInsideKeralaStreetNameMlError
                            }
                            label={

                                PresentAddressCountryError || PresentAddressStateNameError || PresentInsideKeralaDistrictError ||
                                    PresentInsideKeralaTalukError || PresentInsideKeralaVillageError || PresentInsideKeralaLBNameError ||
                                    PresentInsideKeralaWardNoError || PresentInsideKeralaHouseNameEnError || PresentInsideKeralaHouseNameMlError ||
                                    PresentInsideKeralaLocalityNameEnError || PresentInsideKeralaLocalityNameMlError || PresentInsideKeralaPostOfficeError ||
                                    PresentInsideKeralaPincodeError || PresentCityVillageError || PresentOutSideIndiaProvinceEnError || PresentOutSideIndiaProvinceMlError
                                    || PresentOutSideIndiaCityError || PresentOutSideIndiaPostCodeError || PresentOutSideIndiaLineOneEnError || PresentOutSideIndiaLineOneMlError
                                    || PresentOutSideIndiaLineTwoEnError || PresentOutSideIndiaLineTwoMlError || PresentInsideKeralaStreetNameEnError || PresentInsideKeralaStreetNameMlError
                                    ? PresentAddressCountryError
                                        ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`) : PresentAddressStateNameError
                                            ? t(`BIRTH_ERROR_STATE_CHOOSE`) : PresentInsideKeralaDistrictError
                                                ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`) : PresentInsideKeralaTalukError
                                                    ? t(`BIRTH_ERROR_TALUK_CHOOSE`) : PresentInsideKeralaVillageError
                                                        ? t(`BIRTH_ERROR_VILLAGE_CHOOSE`) : PresentInsideKeralaLBNameError
                                                            ? t(`BIRTH_ERROR_LBNAME_CHOOSE`) : PresentInsideKeralaWardNoError
                                                                ? t(`BIRTH_ERROR_WARD_CHOOSE`) : PresentInsideKeralaHouseNameEnError
                                                                    ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`) : PresentInsideKeralaHouseNameMlError
                                                                        ? t(`BIRTH_ERROR_HOUSE_NAME_ML_CHOOSE`) : PresentInsideKeralaLocalityNameEnError
                                                                            ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`) : PresentInsideKeralaLocalityNameMlError
                                                                                ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`) : PresentInsideKeralaPostOfficeError
                                                                                    ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`) : PresentInsideKeralaPincodeError
                                                                                        ? t(`BIRTH_ERROR_PINCODE_CHOOSE`) : PresentCityVillageError
                                                                                            ? t(`BIRTH_ERROR_CITY_CHOOSE`) : PresentOutSideIndiaProvinceEnError
                                                                                                ? t(`BIRTH_ERROR_STATE_PROVINCE_EN`) : PresentOutSideIndiaProvinceMlError
                                                                                                    ? t(`BIRTH_ERROR_STATE_PROVINCE_ML`) : PresentOutSideIndiaCityError
                                                                                                        ? t(`BIRTH_ERROR_CITY_TOWN`) : PresentOutSideIndiaPostCodeError
                                                                                                            ? t(`BIRTH_ERROR_ZIP_CODE`) : PresentOutSideIndiaLineOneEnError
                                                                                                                ? t(`BIRTH_ERROR_ADDRESS_LINE_ONE_EN`) : PresentOutSideIndiaLineOneMlError
                                                                                                                    ? t(`BIRTH_ERROR_ADDRESS_LINE_ONE_ML`) : PresentOutSideIndiaLineTwoEnError
                                                                                                                        ? t(`BIRTH_ERROR_ADDRESS_LINE_TWO_ML`) : PresentOutSideIndiaLineTwoMlError
                                                                                                                            ? t(`BIRTH_ERROR_ADDRESS_LINE_TWO_ML`) : PresentInsideKeralaStreetNameEnError
                                                                                                                                ? t(`BIRTH_ERROR_ADDRESS_PRESENT_STREET_EN`) : PresentInsideKeralaStreetNameMlError
                                                                                                                                    ? t(`BIRTH_ERROR_ADDRESS_PRESENT_STREET_ML`)
                                                                                                                                    : setToast(false)
                                    : setToast(false)
                            }
                            onClose={() => setToast(false)}
                        />
                    )}
                    {""}

                </FormStep>
            </React.Fragment>
        );
};
export default DeathNACAddressPage;