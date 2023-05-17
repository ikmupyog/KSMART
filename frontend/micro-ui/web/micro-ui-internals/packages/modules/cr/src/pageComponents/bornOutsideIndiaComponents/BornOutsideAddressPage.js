import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/BOBRTimeline";
import { useTranslation } from "react-i18next";
import BornOutsidePresentOutsideIndia from "./BornOutsidePresentOutsideIndia";
import BornoutsidePermanentInsideKerala from "./BornoutsidePermanentInsideKerala";
import BornoutsideSameAsAbove from "./BornoutsideSameAsAbove";
// import BornOutsidePresent from "./BornOutsidePresent";
import BornOutsidePermanent from "./BornOutsidePermanent";


const BornOutsideAddressPage = ({ config, onSelect, userType, formData, isEditBornOutsideIndia = false }) => {
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

    // //################################# Present Inside Kerala #########################################################################################################
    const [countryvalue, setCountryValue] = useState(formData?.BornOutsideAddressBirthDetails?.presentaddressCountry?.code ? formData?.BornOutsideAddressBirthDetails?.presentaddressCountry.countrycode : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentaddressCountry ? "" : "")
    const [value, setValue] = useState(formData?.BornOutsideAddressBirthDetails?.presentaddressStateName?.code ? formData?.BornOutsideAddressBirthDetails?.presentaddressStateName.code : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentaddressStateName ? "" : "");
  
    const [Talukvalues, setLbsTalukvalue] = useState(null);
    const [Villagevalues, setLbsVillagevalue] = useState(null);
    const [PostOfficevalues, setPostOfficevalues] = useState(null);
   
    //############################################### Present Out Side India ###########################################################################################################

    const [presentOutSideIndiaAdressEn, setAdressEn] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn : "");
    const [presentOutSideIndiaAdressMl, setAdressMl] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl : "");
    const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB : "");
    const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB : "");
    const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn : "");
    const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceMl ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceMl : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceMl ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceMl : "");
    const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage?.code ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage ? "" : "");
    const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown : "");
    const [presentOutSideIndiaPostCode, setPostCode] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode ? formData?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode : "");
    const [presentOutSideCountry, setOutSideCountry] = useState(formData?.BornOutsideAddressBirthDetails?.presentOutSideCountry ? formData?.BornOutsideAddressBirthDetails?.presentOutSideCountry : null);

    //############################################### Same As Above ##################################################################################################

    // const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.BornOutsideAddressBirthDetails?.isPrsentAddress ? formData?.BornOutsideAddressBirthDetails?.isPrsentAddress : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.isPrsentAddress ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.isPrsentAddress : true);

    //################################################### Country State Permanent ###########################################################################

    const [permtaddressCountry, setpermtaddressCountry] = useState(formData?.BornOutsideAddressBirthDetails?.permtaddressCountry?.code ? formData?.BornOutsideAddressBirthDetails?.permtaddressCountry : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permtaddressCountry ? "" : "");
    const [permtaddressStateName, setpermtaddressStateName] = useState(formData?.BornOutsideAddressBirthDetails?.permtaddressStateName?.code ? formData?.BornOutsideAddressBirthDetails?.permtaddressStateName : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permtaddressStateName ? "" : "");
    const [countryValuePermanent, setCountryValuePermanent] = useState(formData?.BornOutsideAddressBirthDetails?.permtaddressCountry?.code ? formData?.BornOutsideAddressBirthDetails?.permtaddressCountry.countrycode : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permtaddressCountry ? "" : "");
    const [valuePermanent, setValuePermanent] = useState(formData?.BornOutsideAddressBirthDetails?.presentaddressStateName?.code ? formData?.BornOutsideAddressBirthDetails?.permtaddressStateName.code : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permtaddressStateName ? "" : "");

    //################################################# Permanent Inside Kerala ##########################################################################################

    const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrDistrict?.code ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrDistrict : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permtaddressCountry ? "" : "");
    const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLBName?.code ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLBName : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLBName ? "" : "");
    const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrTaluk ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrTaluk : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrTaluk ? "" : "");
    const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrVillage ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrVillage : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrVillage ? "" : "");
    const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPostOffice ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPostOffice : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPostOffice ? "" : "");
    const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode :
        formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode : "");
    const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn :
        formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn : "");
    const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameMl ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameMl :
        formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameMl ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameMl : "");
    const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] =  useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameEn ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameEn :
        formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameEn ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameEn : "");
    const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] =  useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameMl ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameMl :
        formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameMl ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameMl : "");

    const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] =  useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn :
        formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn : "");

    const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameMl :
        formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameMl ? formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameMl : "");

    const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(formData?.BornOutsideAddressBirthDetails?.permntInKeralaWardNo ? formData?.BornOutsideAddressBirthDetails?.permntInKeralaWardNo : formData?.BornOutsideChildDetails?.BornOutsideAddressBirthDetails?.permntInKeralaWardNo ? "" : "");

 
    //############################################################# Error Constants #####################################################################################

    const [PresentAddressCountryError, setPresentAddressCountryError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentAddressCountryError ? false : false);
    const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentAddressStateNameError ? false : false);
    const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaDistrictError ? false : false);
    const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaTalukError ? false : false);
    const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaVillageError ? false : false);
    const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaLBNameError ? false : false);
    const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaWardNoError ? false : false);
    const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaHouseNameEnError ? false : false);
    const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaHouseNameMlError ? false : false);
    const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaLocalityNameEnError ? false : false);
    const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaLocalityNameMlError ? false : false);
    
    const [PresentInsideKeralaStreetNameEnError, setPresentInsideKeralaStreetNameEnError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaStreetNameEnError ? false : false);
    const [PresentInsideKeralaStreetNameMlError, setPresentInsideKeralaStreetNameMlError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaStreetNameMlError ? false : false);
    
    const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaPostOfficeError ? false : false);
    const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentInsideKeralaPincodeError ? false : false);
    const [PresentCityVillageError, setCityVillageError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentCityVillageError ? false : false);
    const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentOutSideIndiaProvinceEnError ? false : false);
    const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentOutSideIndiaProvinceMlError ? false : false);
    const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentOutSideIndiaCityError ? false : false);
    const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentOutSideIndiaPostCodeError ? false : false);
    const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentOutSideIndiaLineOneEnError ? false : false);
    const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentOutSideIndiaLineOneMlError ? false : false);
    const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(formData?.BornOutsideAddressBirthDetails?.PresentOutSideIndiaLineTwoEnError ? false : false);
    const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(formData?.AddressBirBornOutsideAddressBirthDetailsthDetails?.PresentOutSideIndiaLineTwoMlError ? false : false);

    const onSkip = () => onSelect();
    let validFlag = true;
    const goNext = () => {
       
            
        
         

               
              
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

            
        
        if (validFlag === true) {
          

    
            //####################################### Present Outside India ##############################################################
        //     sessionStorage.setItem("presentOutSideIndiaAdressEn", presentOutSideIndiaAdressEn ? presentOutSideIndiaAdressEn : null);
        //     sessionStorage.setItem("presentOutSideIndiaAdressMl", presentOutSideIndiaAdressMl ? presentOutSideIndiaAdressMl : null);
        //     sessionStorage.setItem("presentOutSideIndiaAdressEnB", presentOutSideIndiaAdressEnB ? presentOutSideIndiaAdressEnB : null);
        //     sessionStorage.setItem("presentOutSideIndiaAdressMlB", presentOutSideIndiaAdressMlB ? presentOutSideIndiaAdressMlB : null);
        //     sessionStorage.setItem("presentOutSideIndiaProvinceEn", presentOutSideIndiaProvinceEn ? presentOutSideIndiaProvinceEn : null);
        //     sessionStorage.setItem("presentOutSideIndiaProvinceMl", presentOutSideIndiaProvinceMl ? presentOutSideIndiaProvinceMl : null);
        //     sessionStorage.setItem("presentOutSideIndiaadrsVillage", presentOutSideIndiaadrsVillage ? presentOutSideIndiaadrsVillage.code : null);
        //     sessionStorage.setItem("presentOutSideIndiaPostCode", presentOutSideIndiaPostCode ? presentOutSideIndiaPostCode : null);
        //    sessionStorage.setItem("presentOutSideCountry", presentOutSideCountry ? presentOutSideCountry.code : null);
        //     sessionStorage.setItem("presentOutSideIndiaadrsCityTown", presentOutSideIndiaadrsCityTown ? presentOutSideIndiaadrsCityTown : null);
        //     sessionStorage.setItem("isPrsentAddress", isPrsentAddress ? isPrsentAddress : true);

        //     sessionStorage.setItem("permtaddressCountry", permtaddressCountry ? permtaddressCountry.code : null);
        //     sessionStorage.setItem("permtaddressStateName", permtaddressStateName ? permtaddressStateName.code : null);
        //     sessionStorage.setItem("permntInKeralaAdrHouseNameEn", permntInKeralaAdrHouseNameEn ? permntInKeralaAdrHouseNameEn : "");
        //     sessionStorage.setItem("permntInKeralaAdrHouseNameMl", permntInKeralaAdrHouseNameMl ? permntInKeralaAdrHouseNameMl : "");
        //     sessionStorage.setItem("permntInKeralaAdrLocalityNameEn", permntInKeralaAdrLocalityNameEn ? permntInKeralaAdrLocalityNameEn : "");
        //     sessionStorage.setItem("permntInKeralaAdrLocalityNameMl", permntInKeralaAdrLocalityNameMl ? permntInKeralaAdrLocalityNameMl : "");
        //     sessionStorage.setItem("permntInKeralaAdrStreetNameEn", permntInKeralaAdrStreetNameEn ? permntInKeralaAdrStreetNameEn : "");
        //     sessionStorage.setItem("permntInKeralaAdrStreetNameMl", permntInKeralaAdrStreetNameMl ? permntInKeralaAdrStreetNameMl : "");
        //     sessionStorage.setItem("permntInKeralaAdrVillage", permntInKeralaAdrVillage ? permntInKeralaAdrVillage.code : null);
        //     sessionStorage.setItem("permntInKeralaAdrLBName", permntInKeralaAdrLBName ? permntInKeralaAdrLBName.code : null);
        //     sessionStorage.setItem("permntInKeralaAdrDistrict", permntInKeralaAdrDistrict ? permntInKeralaAdrDistrict.code : null);
        //     sessionStorage.setItem("permntInKeralaAdrTaluk", permntInKeralaAdrTaluk ? permntInKeralaAdrTaluk.code : null);
        //     sessionStorage.setItem("permntInKeralaAdrPostOffice", permntInKeralaAdrPostOffice ? permntInKeralaAdrPostOffice.code : null);
        //     sessionStorage.setItem("permntInKeralaAdrPincode", permntInKeralaAdrPincode ? permntInKeralaAdrPincode.code : null);
        //     sessionStorage.setItem("permntInKeralaWardNo", permntInKeralaWardNo ? permntInKeralaWardNo.code : null);
           
            onSelect(config.key, {
               
                presentOutSideIndiaAdressEn,
                presentOutSideIndiaAdressMl,
                presentOutSideIndiaAdressEnB,
                presentOutSideIndiaAdressMlB,
                presentOutSideIndiaAdressMlB,
                presentOutSideIndiaProvinceEn,
                presentOutSideIndiaProvinceMl,
                presentOutSideIndiaadrsVillage,
                presentOutSideIndiaadrsCityTown,
                presentOutSideIndiaPostCode,
                presentOutSideCountry,
                // isPrsentAddress,

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
                
            });
        }
    };
    if (isCountryLoading || isStateLoading || islocalbodiesLoading || isTalukLoading || isVillageLoading || isDistrictLoading || isPostOfficeLoading || isWardLoaded) {
        return <Loader></Loader>;
    } else
        return (
            <React.Fragment>
                {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
                {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null} */}
                {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null} */}
                {window.location.href.includes("/citizen/cr/cr-outsideindiabirth-creation/born-outside-address") ? <Timeline currentStep={3} /> : null }
                <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
                {/* <div className="accordion-wrapper">
                  

                    </div> */}
                    {/* {isPrsentAddress === false && ( */}
                        <div>
                            <BornOutsidePresentOutsideIndia
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
                                presentOutSideCountry={presentOutSideCountry}
                                 setOutSideCountry={setOutSideCountry}
                                // countryvalue={countryvalue}
                                // setCountryValue={setCountryValue}
                                // isPrsentAddress={isPrsentAddress}
                                // setIsPrsentAddress={setIsPrsentAddress}
                           
                                isEditBornOutsideIndia={isEditBornOutsideIndia}
                               
                                formData={formData}
                            />
                        </div>
                    {/* )} */}
                    {/* <div>
                        <BornoutsideSameAsAbove
                            isPrsentAddress={isPrsentAddress}
                            setIsPrsentAddress={setIsPrsentAddress}
                            isEditBornOutsideIndia={isEditBornOutsideIndia}
                         
                            formData={formData}
                        />
                    </div> */}
                    {/* {isPrsentAddress === false && ( */}
                        <div>
                            <BornOutsidePermanent
                                permtaddressCountry={permtaddressCountry}
                                setpermtaddressCountry={setpermtaddressCountry}
                                permtaddressStateName={permtaddressStateName}
                                setpermtaddressStateName={setpermtaddressStateName}
                                // isPrsentAddress={isPrsentAddress}
                                // setIsPrsentAddress={setIsPrsentAddress}
                                value={value}
                                setValue={setValue}
                                countryvalue={countryvalue}
                                setCountryValue={setCountryValue}
                                countryValuePermanent={countryValuePermanent}
                                setCountryValuePermanent={setCountryValuePermanent}
                                valuePermanent={valuePermanent}
                                setValuePermanent={setValuePermanent}
                                isEditBornOutsideIndia={isEditBornOutsideIndia}
                               
                                formData={formData}
                            />
                        </div>
                    {/* )} */}
                    {countryValuePermanent === "IND" && valuePermanent === "KL" &&  (
                        <div>
                            <BornoutsidePermanentInsideKerala
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
                                isEditBornOutsideIndia={isEditBornOutsideIndia}
                                value
                                countryvalue
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
export default BornOutsideAddressPage;