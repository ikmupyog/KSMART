import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/NACTimeline";
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

const BirthNACAddressPage = ({ config, onSelect, userType, formData, isEditBirth = false, isEditDeath = false }) => {
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

    const [presentaddressCountry, setaddressCountry] = useState(formData?.BirthNACAddressPage?.presentaddressCountry?.code ? formData?. BirthNACAddressPage?.presentaddressCountry : formData?.BirthNACDetails?. BirthNACAddressPage?.presentaddressCountry ? "" : "");
    const [presentaddressStateName, setaddressStateName] = useState(formData?. BirthNACAddressPage?.presentaddressStateName?.code ? formData?. BirthNACAddressPage?.presentaddressStateName : formData?. BirthNACDetails?. BirthNACAddressPage?.presentaddressStateName ? "" : "");
    const [countryvalue, setCountryValue] = useState(formData?. BirthNACAddressPage?.presentaddressCountry?.code ? formData?. BirthNACAddressPage?.presentaddressCountry.countrycode : formData?. BirthNACDetails?. BirthNACAddressPage?.presentaddressCountry ? "" : "")
    const [value, setValue] = useState(formData?. BirthNACAddressPage?.presentaddressStateName?.code ? formData?. BirthNACAddressPage?.presentaddressStateName.code : formData?. BirthNACDetails?. BirthNACAddressPage?.presentaddressStateName ? "" : "");

    //################################# Present Inside Kerala #########################################################################################################

    const [presentWardNo, setPresentWardNo] = useState(formData. BirthNACAddressPage?.presentWardNo?.code ? formData. BirthNACAddressPage?.presentWardNo : formData?. BirthNACDetails?. BirthNACAddressPage?.presentWardNo ? "" : "");
    const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaDistrict?.code ? formData?. BirthNACAddressPage?.presentInsideKeralaDistrict : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaDistrict ? "" : "");
    const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaLBTypeName ? formData?. BirthNACAddressPage?.presentInsideKeralaLBTypeName : null);
    const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaLBName?.code ? formData?. BirthNACAddressPage?.presentInsideKeralaLBName : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaLBName ? "" : "");
    const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaTaluk?.code ? formData?. BirthNACAddressPage?.presentInsideKeralaTaluk : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaTaluk ? "" : "");
    const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaVillage?.code ? formData?. BirthNACAddressPage?.presentInsideKeralaVillage : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaVillage ? "" : "");
    const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaPostOffice?.code ? formData?. BirthNACAddressPage?.presentInsideKeralaPostOffice : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaPostOffice ? "" : "");
    const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaPincode ? formData?. BirthNACAddressPage?.presentInsideKeralaPincode : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaPincode ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaPincode : "");
    const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaHouseNameEn ? formData?. BirthNACAddressPage?.presentInsideKeralaHouseNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaHouseNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaHouseNameEn : "");
    const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaHouseNameMl ? formData?. BirthNACAddressPage?.presentInsideKeralaHouseNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaHouseNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaHouseNameMl : "");
    const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaLocalityNameEn ? formData?. BirthNACAddressPage?.presentInsideKeralaLocalityNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaLocalityNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaLocalityNameEn : "");
    const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaLocalityNameMl ? formData?. BirthNACAddressPage?.presentInsideKeralaLocalityNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaLocalityNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaLocalityNameMl : "");
    const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaStreetNameEn ? formData?. BirthNACAddressPage?.presentInsideKeralaStreetNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaStreetNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaStreetNameEn : "");
    const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(formData?. BirthNACAddressPage?.presentInsideKeralaStreetNameMl ? formData?. BirthNACAddressPage?.presentInsideKeralaStreetNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaStreetNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentInsideKeralaStreetNameMl : "");
    const [Talukvalues, setLbsTalukvalue] = useState(null);
    const [Villagevalues, setLbsVillagevalue] = useState(null);
    const [PostOfficevalues, setPostOfficevalues] = useState(null);
    //################################# Present Outside Kerala ##########################################################################################################
    const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaDistrict?.code ? formData?. BirthNACAddressPage?.presentOutsideKeralaDistrict : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaDistrict ? "" : "");
    const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaTaluk ? formData?. BirthNACAddressPage?.presentOutsideKeralaTaluk : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaTaluk ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaTaluk : "");
    // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaTaluk?.code ? formData?. BirthNACAddressPage?.presentOutsideKeralaTaluk : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaTaluk ? "" : "");
    const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaCityVilgeEn ? formData?. BirthNACAddressPage?.presentOutsideKeralaCityVilgeEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaCityVilgeEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaCityVilgeEn : "");
    const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaVillage?.code ? formData?. BirthNACAddressPage?.presentOutsideKeralaVillage : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaVillage ? "" : "");
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaPostOffice);
    const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaPincode ? formData?. BirthNACAddressPage?.presentOutsideKeralaPincode : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaPincode ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaPincode : "");
    const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaHouseNameEn ? formData?. BirthNACAddressPage?.presentOutsideKeralaHouseNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaHouseNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaHouseNameEn : "");
    const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaHouseNameMl ? formData?. BirthNACAddressPage?.presentOutsideKeralaHouseNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaHouseNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaHouseNameMl : "");
    const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameEn ? formData?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameEn : "");
    const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameMl ? formData?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaLocalityNameMl : "");
    const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaStreetNameEn ? formData?. BirthNACAddressPage?.presentOutsideKeralaStreetNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaStreetNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaStreetNameEn : "");
    const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaStreetNameMl ? formData?. BirthNACAddressPage?.presentOutsideKeralaStreetNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaStreetNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaStreetNameMl : "");
    const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeEn ? formData?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeEn : "");
    const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeMl ? formData?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutsideKeralaPostOfficeMl : "");

    //############################################### Present Out Side India ###########################################################################################################

    const [presentOutSideIndiaAdressEn, setAdressEn] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaAdressEn ? formData?. BirthNACAddressPage?.presentOutSideIndiaAdressEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressEn : "");
    const [presentOutSideIndiaAdressMl, setAdressMl] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaAdressMl ? formData?. BirthNACAddressPage?.presentOutSideIndiaAdressMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressMl : "");
    const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaAdressEnB ? formData?. BirthNACAddressPage?.presentOutSideIndiaAdressEnB : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressEnB ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressEnB : "");
    const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaAdressMlB ? formData?. BirthNACAddressPage?.presentOutSideIndiaAdressMlB : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressMlB ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaAdressMlB : "");
    const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaProvinceEn ? formData?. BirthNACAddressPage?.presentOutSideIndiaProvinceEn : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaProvinceEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaProvinceEn : "");
    const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaProvinceMl ? formData?. BirthNACAddressPage?.presentOutSideIndiaProvinceMl : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaProvinceMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaProvinceMl : "");
    const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaadrsVillage?.code ? formData?. BirthNACAddressPage?.presentOutSideIndiaadrsVillage : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaadrsVillage ? "" : "");
    const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaadrsCityTown ? formData?. BirthNACAddressPage?.presentOutSideIndiaadrsCityTown : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaadrsCityTown ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaadrsCityTown : "");
    const [presentOutSideIndiaPostCode, setPostCode] = useState(formData?. BirthNACAddressPage?.presentOutSideIndiaPostCode ? formData?. BirthNACAddressPage?.presentOutSideIndiaPostCode : formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaPostCode ? formData?. BirthNACDetails?. BirthNACAddressPage?.presentOutSideIndiaPostCode : "");
    //const [presentOutSideCountry, setOutSideCountry] = useState(formData?. BirthNACAddressPage?.presentOutSideCountry ? formData?. BirthNACAddressPage?.presentOutSideCountry : null);

    //############################################### Same As Above ##################################################################################################

    const [isPrsentAddress, setIsPrsentAddress] = useState(formData?. BirthNACAddressPage?.isPrsentAddress ? formData?. BirthNACAddressPage?.isPrsentAddress : formData?. BirthNACDetails?. BirthNACAddressPage?.isPrsentAddress ? formData?. BirthNACDetails?. BirthNACAddressPage?.isPrsentAddress : true);

    //################################################### Country State Permanent ###########################################################################

    const [permtaddressCountry, setpermtaddressCountry] = useState(formData?. BirthNACAddressPage?.permtaddressCountry?.code ? formData?. BirthNACAddressPage?.permtaddressCountry : formData?. BirthNACDetails?. BirthNACAddressPage?.permtaddressCountry ? "" : "");
    const [permtaddressStateName, setpermtaddressStateName] = useState(formData?. BirthNACAddressPage?.permtaddressStateName?.code ? formData?. BirthNACAddressPage?.permtaddressStateName : formData?. BirthNACDetails?. BirthNACAddressPage?.permtaddressStateName ? "" : "");
    const [countryValuePermanent, setCountryValuePermanent] = useState(formData?. BirthNACAddressPage?.permtaddressCountry?.code ? formData?. BirthNACAddressPage?.permtaddressCountry.countrycode : formData?. BirthNACDetails?. BirthNACAddressPage?.permtaddressCountry ? "" : "");
    const [valuePermanent, setValuePermanent] = useState(formData?. BirthNACAddressPage?.presentaddressStateName?.code ? formData?. BirthNACAddressPage?.permtaddressStateName.code : formData?. BirthNACDetails?. BirthNACAddressPage?.permtaddressStateName ? "" : "");

    //################################################# Permanent Inside Kerala ##########################################################################################

    const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrDistrict?.code ? formData?. BirthNACAddressPage?.permntInKeralaAdrDistrict : formData?. BirthNACDetails?. BirthNACAddressPage?.permtaddressCountry ? "" : "");
    // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrLBTypeName ? formData?. BirthNACAddressPage?.permntInKeralaAdrLBTypeName : null);
    const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrLBName?.code ? formData?. BirthNACAddressPage?.permntInKeralaAdrLBName : formData?. BirthNACDetails?. BirthNACAddressPage?.permntInKeralaAdrLBName ? "" : "");
    const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrTaluk ? formData?. BirthNACAddressPage?.permntInKeralaAdrTaluk : formData?. BirthNACDetails?. BirthNACAddressPage?.permntInKeralaAdrTaluk ? "" : "");
    const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrVillage ? formData?. BirthNACAddressPage?.permntInKeralaAdrVillage : formData?. BirthNACDetails?. BirthNACAddressPage?.permntInKeralaAdrVillage ? "" : "");
    const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrPostOffice ? formData?. BirthNACAddressPage?.permntInKeralaAdrPostOffice : formData?. BirthNACDetails?. BirthNACAddressPage?.permntInKeralaAdrPostOffice ? "" : "");
    const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrPincode ? formData?. BirthNACAddressPage?.permntInKeralaAdrPincode : "");
    const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrHouseNameEn ? formData?. BirthNACAddressPage?.permntInKeralaAdrHouseNameEn : "");
    const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrHouseNameMl ? formData?. BirthNACAddressPage?.permntInKeralaAdrHouseNameMl : "");
    const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrLocalityNameEn ? formData?. BirthNACAddressPage?.permntInKeralaAdrLocalityNameEn : "");
    const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrLocalityNameMl ? formData?. BirthNACAddressPage?.permntInKeralaAdrLocalityNameMl : "");
    const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrStreetNameEn ? formData?. BirthNACAddressPage?.permntInKeralaAdrStreetNameEn : "");
    const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(formData?. BirthNACAddressPage?.permntInKeralaAdrStreetNameMl ? formData?. BirthNACAddressPage?.permntInKeralaAdrStreetNameMl : "");
    const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(formData?. BirthNACAddressPage?.permntInKeralaWardNo ? formData?. BirthNACAddressPage?.permntInKeralaWardNo : formData?. BirthNACDetails?. BirthNACAddressPage?.permntInKeralaWardNo ? "" : "");

    //############################################################################### Permanent Outside Kerala ############################################################################

    const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaDistrict?.code ? formData?. BirthNACAddressPage?.permntOutsideKeralaDistrict : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaDistrict ? "" : "");
    const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaTaluk ? formData?. BirthNACAddressPage?.permntOutsideKeralaTaluk : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaTaluk ? "" : "");
    const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaCityVilgeEn ? formData?. BirthNACAddressPage?.permntOutsideKeralaCityVilgeEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaCityVilgeEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaCityVilgeEn : "");
    const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaVillage ? formData?. BirthNACAddressPage?.permntOutsideKeralaVillage : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaVillage ? "" : "");
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?. BirthNACAddressPage?.presentOutsideKeralaPostOffice);
    const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaPincode ? formData?. BirthNACAddressPage?.permntOutsideKeralaPincode : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaPincode ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaPincode : "");
    const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaHouseNameEn ? formData?. BirthNACAddressPage?.permntOutsideKeralaHouseNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaHouseNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaHouseNameEn : "");
    const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaHouseNameMl ? formData?. BirthNACAddressPage?.permntOutsideKeralaHouseNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaHouseNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaHouseNameMl : "");
    const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameEn ? formData?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameEn : "");
    const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameMl ? formData?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaLocalityNameMl : "");
    const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaStreetNameEn ? formData?. BirthNACAddressPage?.permntOutsideKeralaStreetNameEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaStreetNameEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaStreetNameEn : "");
    const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaStreetNameMl ? formData?. BirthNACAddressPage?.permntOutsideKeralaStreetNameMl : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaStreetNameMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaStreetNameMl : "");
    const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeEn ? formData?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeEn : "");
    const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(formData?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeMl ? formData?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeMl : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideKeralaPostOfficeMl : "");

    //######################################################################## Permanent Ouside Country #############################################################################################

    const [permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaLineoneEn ? formData?. BirthNACAddressPage?.permntOutsideIndiaLineoneEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLineoneEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLineoneEn : "");
    const [permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaLineoneMl ? formData?. BirthNACAddressPage?.permntOutsideIndiaLineoneMl : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLineoneMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLineoneMl : "");
    const [permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaLinetwoEn ? formData?. BirthNACAddressPage?.permntOutsideIndiaLinetwoEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLinetwoEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLinetwoEn : "");
    const [permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaLinetwoMl ? formData?. BirthNACAddressPage?.permntOutsideIndiaLinetwoMl : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLinetwoMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaLinetwoMl : "");
    const [permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaprovinceEn ? formData?. BirthNACAddressPage?.permntOutsideIndiaprovinceEn : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaprovinceEn ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaprovinceEn : "");
    const [permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaprovinceMl ? formData?. BirthNACAddressPage?.permntOutsideIndiaprovinceMl : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaprovinceMl ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaprovinceMl : "");
    const [permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaVillage?.code ? formData?. BirthNACAddressPage?.permntOutsideIndiaVillage : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaVillage ? "" : "");
    const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaCityTown ? formData?. BirthNACAddressPage?.permntOutsideIndiaCityTown : formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaCityTown ? formData?. BirthNACDetails?. BirthNACAddressPage?.permntOutsideIndiaCityTown : "");
    const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(formData?. BirthNACAddressPage?.permanentOutsideIndiaPostCode ? formData?. BirthNACAddressPage?.permanentOutsideIndiaPostCode : formData?. BirthNACDetails?. BirthNACAddressPage?.permanentOutsideIndiaPostCode ? formData?. BirthNACDetails?. BirthNACAddressPage?.permanentOutsideIndiaPostCode : "");
    //const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(formData?. BirthNACAddressPage?.permntOutsideIndiaCountry ? formData?. BirthNACAddressPage?.permntOutsideIndiaCountry : null);

    //############################################################# Error Constants #####################################################################################

    const [PresentAddressCountryError, setPresentAddressCountryError] = useState(formData?. BirthNACAddressPage?.PresentAddressCountryError ? false : false);
    const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(formData?. BirthNACAddressPage?.PresentAddressStateNameError ? false : false);
    const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaDistrictError ? false : false);
    const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaTalukError ? false : false);
    const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaVillageError ? false : false);
    const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaLBNameError ? false : false);
    const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaWardNoError ? false : false);
    const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaHouseNameEnError ? false : false);
    const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaHouseNameMlError ? false : false);
    const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaLocalityNameEnError ? false : false);
    const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaLocalityNameMlError ? false : false);

    const [PresentInsideKeralaStreetNameEnError, setPresentInsideKeralaStreetNameEnError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaStreetNameEnError ? false : false);
    const [PresentInsideKeralaStreetNameMlError, setPresentInsideKeralaStreetNameMlError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaStreetNameMlError ? false : false);

    const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaPostOfficeError ? false : false);
    const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(formData?. BirthNACAddressPage?.PresentInsideKeralaPincodeError ? false : false);
    const [PresentCityVillageError, setCityVillageError] = useState(formData?. BirthNACAddressPage?.PresentCityVillageError ? false : false);
    const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaProvinceEnError ? false : false);
    const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaProvinceMlError ? false : false);
    const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaCityError ? false : false);
    const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaPostCodeError ? false : false);
    const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaLineOneEnError ? false : false);
    const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaLineOneMlError ? false : false);
    const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaLineTwoEnError ? false : false);
    const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(formData?. BirthNACAddressPage?.PresentOutSideIndiaLineTwoMlError ? false : false);

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
                {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
                {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
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
export default BirthNACAddressPage;