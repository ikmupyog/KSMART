import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/AdoptionTimeline";
import DRTimeline from "../../components/DRTimeline";
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

const AdoptionAddressBasePage = ({ config, onSelect, userType, formData, isEditBirth = false, isEditDeath = false }) => {
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
    const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
    const [isInitialRender, setIsInitialRender] = useState(true);

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

    const [presentaddressCountry, setaddressCountry] = useState(formData?.AdoptionAddressBasePage?.presentaddressCountry?.code ? formData?.AdoptionAddressBasePage?.presentaddressCountry : formData?.ChildDetails?.AdoptionAddressBasePage?.presentaddressCountry ? "" : "");
    const [presentaddressStateName, setaddressStateName] = useState(formData?.AdoptionAddressBasePage?.presentaddressStateName?.code ? formData?.AdoptionAddressBasePage?.presentaddressStateName : formData?.ChildDetails?.AdoptionAddressBasePage?.presentaddressStateName ? "" : "");
    const [countryvalue, setCountryValue] = useState(formData?.AdoptionAddressBasePage?.presentaddressCountry?.code ? formData?.AdoptionAddressBasePage?.presentaddressCountry.countrycode : formData?.ChildDetails?.AdoptionAddressBasePage?.presentaddressCountry ? "" : "")
    const [value, setValue] = useState(formData?.AdoptionAddressBasePage?.presentaddressStateName?.code ? formData?.AdoptionAddressBasePage?.presentaddressStateName.statecode : formData?.ChildDetails?.AdoptionAddressBasePage?.presentaddressStateName ? "" : "");

    //################################# Present Inside Kerala #########################################################################################################

    const [presentWardNo, setPresentWardNo] = useState(formData.AdoptionAddressBasePage?.presentWardNo?.code ? formData.AdoptionAddressBasePage?.presentWardNo : formData?.ChildDetails?.AdoptionAddressBasePage?.presentWardNo ? "" : "");
    const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaDistrict?.code ? formData?.AdoptionAddressBasePage?.presentInsideKeralaDistrict : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaDistrict ? "" : "");
    const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaLBTypeName ? formData?.AdoptionAddressBasePage?.presentInsideKeralaLBTypeName : null);
    const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaLBName?.code ? formData?.AdoptionAddressBasePage?.presentInsideKeralaLBName : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaLBName ? "" : "");
    const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaTaluk?.code ? formData?.AdoptionAddressBasePage?.presentInsideKeralaTaluk : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaTaluk ? "" : "");
    const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaVillage?.code ? formData?.AdoptionAddressBasePage?.presentInsideKeralaVillage : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaVillage ? "" : "");
    const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice?.code ? formData?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice ? "" : "");
    const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaPincode ? formData?.AdoptionAddressBasePage?.presentInsideKeralaPincode : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaPincode ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaPincode : "");
    const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameEn ? formData?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameEn : "");
    const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameMl ? formData?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameMl : "");
    const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameEn ? formData?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameEn : "");
    const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameMl ? formData?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameMl : "");
    const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameEn ? formData?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameEn : "");
    const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(formData?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameMl ? formData?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameMl : "");
    const [Talukvalues, setLbsTalukvalue] = useState(null);
    const [Villagevalues, setLbsVillagevalue] = useState(null);
    const [PostOfficevalues, setPostOfficevalues] = useState(null);
    //################################# Present Outside Kerala ##########################################################################################################

    const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaDistrict?.code ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaDistrict : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaDistrict ? "" : "");
    const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaTaluk?.code ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaTaluk : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaTaluk ? "" : "");
    const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaCityVilgeEn ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaCityVilgeEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaCityVilgeEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaCityVilgeEn : "");
    const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaVillage?.code ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaVillage : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaVillage ? "" : "");
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaPostOffice);
    const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaPincode ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaPincode : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPincode ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPincode : "");
    const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameEn ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameEn : "");
    const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameMl ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameMl : "");
    const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameEn ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameEn : "");
    const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameMl ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameMl : "");
    const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameEn ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameEn : "");
    const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameMl ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameMl : "");
    const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeEn ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeEn ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeEn : "");
    const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");

    //############################################### Present Out Side India ###########################################################################################################

    const [presentOutSideIndiaAdressEn, setAdressEn] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressEn ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");
    const [presentOutSideIndiaAdressMl, setAdressMl] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressMl ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");
    const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressEnB ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressEnB : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");
    const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressMlB ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaAdressMlB : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");
    const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaProvinceEn ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaProvinceEn : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");
    const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaProvinceMl ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaProvinceMl : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");
    const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaadrsVillage ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaadrsVillage : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeMl : "");
    const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaadrsCityTown ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaadrsCityTown : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutSideIndiaadrsCityTown ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutSideIndiaadrsCityTown : "");
    const [presentOutSideIndiaPostCode, setPostCode] = useState(formData?.AdoptionAddressBasePage?.presentOutSideIndiaPostCode ? formData?.AdoptionAddressBasePage?.presentOutSideIndiaPostCode : formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutSideIndiaPostCode ? formData?.ChildDetails?.AdoptionAddressBasePage?.presentOutSideIndiaPostCode : "");
    //const [presentOutSideCountry, setOutSideCountry] = useState(formData?.AdoptionAddressBasePage?.presentOutSideCountry ? formData?.AdoptionAddressBasePage?.presentOutSideCountry : null);

    //############################################### Same As Above ##################################################################################################

    const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AdoptionAddressBasePage?.isPrsentAddress ? formData?.AdoptionAddressBasePage?.isPrsentAddress : formData?.ChildDetails?.AdoptionAddressBasePage?.isPrsentAddress ? formData?.ChildDetails?.AdoptionAddressBasePage?.isPrsentAddress : true);

    //################################################### Country State Permanent ###########################################################################

    const [permtaddressCountry, setpermtaddressCountry] = useState(formData?.AdoptionAddressBasePage?.permtaddressCountry?.code ? formData?.AdoptionAddressBasePage?.permtaddressCountry : formData?.ChildDetails?.AdoptionAddressBasePage?.permtaddressCountry ? "" : "");
    const [permtaddressStateName, setpermtaddressStateName] = useState(formData?.AdoptionAddressBasePage?.permtaddressStateName);
    const [countryValuePermanent, setCountryValuePermanent] = useState(formData?.AdoptionAddressBasePage?.presentaddressCountry ? formData?.AdoptionAddressBasePage?.presentaddressCountry.countrycode : null);
    const [valuePermanent, setValuePermanent] = useState(formData?.AdoptionAddressBasePage?.presentaddressStateName ? formData?.AdoptionAddressBasePage?.presentaddressStateName.statecode : null);
    //################################################# Permanent Inside Kerala ##########################################################################################

    const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrDistrict ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrDistrict : null);
    // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBTypeName ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBTypeName : null);
    const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName : null);
    const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrTaluk ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrTaluk : null);
    const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrVillage ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrVillage : null);
    const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice : null);
    const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrPincode ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrPincode : "");
    const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrHouseNameEn ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrHouseNameEn : "");
    const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrHouseNameMl ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrHouseNameMl : "");
    const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameEn ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameEn : "");
    const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameMl ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameMl : "");
    const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrStreetNameEn ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrStreetNameEn : "");
    const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaAdrStreetNameMl ? formData?.AdoptionAddressBasePage?.permntInKeralaAdrStreetNameMl : "");
    const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(formData?.AdoptionAddressBasePage?.permntInKeralaWardNo ? formData?.AdoptionAddressBasePage?.permntInKeralaWardNo : null);

    //############################################################################### Permanent Outside Kerala ############################################################################

    const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaDistrict ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaDistrict : null);
    const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaTaluk ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaTaluk : null);
    const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaCityVilgeEn ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaCityVilgeEn : null);
    const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaVillage ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaVillage : null);
    // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AdoptionAddressBasePage?.presentOutsideKeralaPostOffice);
    const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaPincode ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaPincode : "");
    const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaHouseNameEn ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaHouseNameEn : "");
    const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaHouseNameMl ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaHouseNameMl : "");
    const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaLocalityNameEn ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaLocalityNameEn : "");
    const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaLocalityNameMl ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaLocalityNameMl : "");
    const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaStreetNameEn ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaStreetNameEn : "");
    const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaStreetNameMl ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaStreetNameMl : "");
    const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaPostOfficeEn ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaPostOfficeEn : "");
    const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(formData?.AdoptionAddressBasePage?.permntOutsideKeralaPostOfficeMl ? formData?.AdoptionAddressBasePage?.permntOutsideKeralaPostOfficeMl : "");

    //######################################################################## Permanent Ouside Country #############################################################################################

    const [permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideIndiaLineoneEn ? formData?.AdoptionAddressBasePage?.permntOutsideIndiaLineoneEn : "");
    const [permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(formData?.AdoptionAddressBasePage?.permntOutsideIndiaLineoneMl ? formData?.AdoptionAddressBasePage?.permntOutsideIndiaLineoneMl : "");
    const [permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideIndiaLinetwoEn ? formData?.AdoptionAddressBasePage?.permntOutsideIndiaLinetwoEn : "");
    const [permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(formData?.AdoptionAddressBasePage?.permntOutsideIndiaLinetwoMl ? formData?.AdoptionAddressBasePage?.permntOutsideIndiaLinetwoMl : "");
    const [permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(formData?.AdoptionAddressBasePage?.permntOutsideIndiaprovinceEn ? formData?.AdoptionAddressBasePage?.permntOutsideIndiaprovinceEn : "");
    const [permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl] = useState(formData?.AdoptionAddressBasePage?.permntOutsideIndiaprovinceMl ? formData?.AdoptionAddressBasePage?.permntOutsideIndiaprovinceMl : "");

    const [permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(formData?.AddressBrOutsideIndiaDetails?.permntOutsideIndiaVillage ? formData?.AddressBrOutsideIndiaDetails?.permntOutsideIndiaVillage : null);
    const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(formData?.AddressBrOutsideIndiaDetails?.permntOutsideIndiaCityTown ? formData?.AddressBrOutsideIndiaDetails?.permntOutsideIndiaCityTown : null);
    const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(formData?.AdoptionAddressBasePage?.permanentOutsideIndiaPostCode ? formData?.AdoptionAddressBasePage?.permanentOutsideIndiaPostCode : null);
    //const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(formData?.AdoptionAddressBasePage?.permntOutsideIndiaCountry ? formData?.AdoptionAddressBasePage?.permntOutsideIndiaCountry : null);

    //############################################################# Error Constants #####################################################################################

    const [PresentAddressCountryError, setPresentAddressCountryError] = useState(formData?.AdoptionAddressBasePage?.PresentAddressCountryError ? false : false);
    const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(formData?.AdoptionAddressBasePage?.PresentAddressStateNameError ? false : false);
    const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaDistrictError ? false : false);
    const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaTalukError ? false : false);
    const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaVillageError ? false : false);
    const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaLBNameError ? false : false);
    const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaWardNoError ? false : false);
    const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaHouseNameEnError ? false : false);
    const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaHouseNameMlError ? false : false);
    const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaLocalityNameEnError ? false : false);
    const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaLocalityNameMlError ? false : false);
    const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaPostOfficeError ? false : false);
    const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(formData?.AdoptionAddressBasePage?.PresentInsideKeralaPincodeError ? false : false);
    const [PresentCityVillageError, setCityVillageError] = useState(formData?.AdoptionAddressBasePage?.PresentCityVillageError ? false : false);
    const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaProvinceEnError ? false : false);
    const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaProvinceMlError ? false : false);
    const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaCityError ? false : false);
    const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaPostCodeError ? false : false);
    const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaLineOneEnError ? false : false);
    const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaLineOneMlError ? false : false);
    const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaLineTwoEnError ? false : false);
    const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(formData?.AdoptionAddressBasePage?.PresentOutSideIndiaLineTwoMlError ? false : false);

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
                if (presentOutsideKeralaTaluk == null || presentOutsideKeralaTaluk == undefined) {
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
            sessionStorage.setItem("presentOutsideKeralaTaluk", presentOutsideKeralaTaluk ? presentOutsideKeralaTaluk.code : null);
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
                {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null} */}
                {/* {window.location.href.includes("/citizen/cr/cr-birth-creation/address-birth") ? <Timeline currentStep={3} /> : null || window.location.href.includes("employee/cr/cr-flow") ? <Timeline currentStep={3} /> : null}
                {window.location.href.includes("/citizen/cr/cr-death-creation/address-death") ? <DRTimeline currentStep={2} /> : null || window.location.href.includes("employee/cr/death-flow") ? <DRTimeline currentStep={2} /> : null} */}
                <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >

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
                                || PresentOutSideIndiaLineTwoEnError || PresentOutSideIndiaLineTwoMlError
                            }
                            label={

                                PresentAddressCountryError || PresentAddressStateNameError || PresentInsideKeralaDistrictError ||
                                    PresentInsideKeralaTalukError || PresentInsideKeralaVillageError || PresentInsideKeralaLBNameError ||
                                    PresentInsideKeralaWardNoError || PresentInsideKeralaHouseNameEnError || PresentInsideKeralaHouseNameMlError ||
                                    PresentInsideKeralaLocalityNameEnError || PresentInsideKeralaLocalityNameMlError || PresentInsideKeralaPostOfficeError ||
                                    PresentInsideKeralaPincodeError || PresentCityVillageError || PresentOutSideIndiaProvinceEnError || PresentOutSideIndiaProvinceMlError
                                    || PresentOutSideIndiaCityError || PresentOutSideIndiaPostCodeError || PresentOutSideIndiaLineOneEnError || PresentOutSideIndiaLineOneMlError
                                    || PresentOutSideIndiaLineTwoEnError || PresentOutSideIndiaLineTwoMlError
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
                                                                                                                            ? t(`BIRTH_ERROR_ADDRESS_LINE_TWO_ML`)
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
export default AdoptionAddressBasePage;