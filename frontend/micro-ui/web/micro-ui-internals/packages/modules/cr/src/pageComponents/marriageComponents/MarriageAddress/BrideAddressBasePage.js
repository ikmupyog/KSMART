import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../components/CRTimeline";
import DRTimeline from "../../../components/DRTimeline";
import AdoptionTimeline from "../../../components/AdoptionTimeline";
import { useTranslation } from "react-i18next";
import BrideAddressPresent from "./BrideAddressPresent";
import BrideAddressPresentInsideKerala from "./BrideAddressPresentInsideKerala";
import BrideAddressPresentOutsideKerala from "./BrideAddressPresentOutsideKerala";
import BrideAddressPresentOutsideIndia from "./BrideAddressPresentOutsideIndia";
import BrideAddressSameAsAbove from "./BrideAddressSameAsAbove";
import BrideAddressPermanent from "./BrideAddressPermanent";
import BrideAddressPermanentInsideKerala from "./BrideAddressPermanentInsideKerala";
import BrideAddressPermanentOutsideKerala from "./BrideAddressPermanentOutsideKerala";
import BrideAddressPermanentOutsideIndia from "./BrideAddressPermanentOutsideIndia";

const BrideAddressBasePage = ({
  config,
  onSelect,
  userType,
  formData,
  isEditBirth = false,
  isEditDeath = false,
  isEditStillBirth = false,
  isEditAdoption = false,
  isEditBirthNAC = false,
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
    Country["common-masters"].Country &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  State &&
    State["common-masters"] &&
    State["common-masters"].State &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });

  //################################### Present Country State ############################################################################################

  const [presentaddressCountry, setaddressCountry] = useState(
    formData?.BrideAddressDetails?.presentaddressCountry ? formData?.BrideAddressDetails?.presentaddressCountry : ""
  );
  const [presentaddressStateName, setaddressStateName] = useState(
    formData?.BrideAddressDetails?.presentaddressStateName ? formData?.BrideAddressDetails?.presentaddressStateName : ""
  );
  const [countryvalue, setCountryValue] = useState(formData?.BrideAddressDetails?.countryvalue ? formData?.BrideAddressDetails?.countryvalue : "");
  const [value, setValue] = useState(
    formData?.BrideAddressDetails?.presentaddressStateName?.code ? formData?.BrideAddressDetails?.presentaddressStateName?.code : ""
  );

  //################################# Present Inside Kerala #########################################################################################################

  const [presentWardNo, setPresentWardNo] = useState(
    formData?.BrideAddressDetails?.presentWardNo?.code ? formData?.BrideAddressDetails?.presentWardNo : ""
  );

  const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaDistrict?.code ? formData?.BrideAddressDetails?.presentInsideKeralaDistrict : ""
  );
  const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaLBTypeName ? formData?.BrideAddressDetails?.presentInsideKeralaLBTypeName : ""
  );
  const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaLBName?.code ? formData?.BrideAddressDetails?.presentInsideKeralaLBName : ""
  );
  const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaTaluk ? formData?.BrideAddressDetails?.presentInsideKeralaTaluk : ""
  );
  const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaVillage?.code ? formData?.BrideAddressDetails?.presentInsideKeralaVillage : ""
  );
  const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaPostOffice?.code ? formData?.BrideAddressDetails?.presentInsideKeralaPostOffice : ""
  );
  const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaPincode ? formData?.BrideAddressDetails?.presentInsideKeralaPincode : ""
  );
  const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaHouseNameEn ? formData?.BrideAddressDetails?.presentInsideKeralaHouseNameEn : ""
  );
  const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaHouseNameMl ? formData?.BrideAddressDetails?.presentInsideKeralaHouseNameMl : ""
  );
  const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn ? formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn : ""
  );
  const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl ? formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl : ""
  );
  const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaStreetNameEn ? formData?.BrideAddressDetails?.presentInsideKeralaStreetNameEn : ""
  );
  const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(
    formData?.BrideAddressDetails?.presentInsideKeralaStreetNameMl ? formData?.BrideAddressDetails?.presentInsideKeralaStreetNameMl : ""
  );
  const [Districtvalues, setDistrictvalue] = useState(null);
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  //################################# Present Outside Kerala ##########################################################################################################
  const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaDistrict?.code ? formData?.BrideAddressDetails?.presentOutsideKeralaDistrict : ""
  );
  const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaTaluk ? formData?.BrideAddressDetails?.presentOutsideKeralaTaluk : ""
  );
  // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.BrideAddressDetails?.presentOutsideKeralaTaluk?.code ? formData?.BrideAddressDetails?.presentOutsideKeralaTaluk : formData?.ChildDetails?.BrideAddressDetails?.presentOutsideKeralaTaluk ? "" : "");
  const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn ? formData?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn : ""
  );
  const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaVillage?.code ? formData?.BrideAddressDetails?.presentOutsideKeralaVillage : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.BrideAddressDetails?.presentOutsideKeralaPostOffice);
  const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaPincode ? formData?.BrideAddressDetails?.presentOutsideKeralaPincode : ""
  );
  const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn ? formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn : ""
  );
  const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl ? formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl : ""
  );
  const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn ? formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn : ""
  );
  const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl ? formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl : ""
  );
  const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn ? formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn : ""
  );
  const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl ? formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl : ""
  );
  const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn ? formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn : ""
  );
  const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(
    formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl ? formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl : ""
  );

  //############################################### Present Out Side India ###########################################################################################################

  const [presentOutSideIndiaAdressEn, setAdressEn] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaAdressEn ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressEn : ""
  );
  const [presentOutSideIndiaAdressMl, setAdressMl] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaAdressMl ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressMl : ""
  );
  const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaAdressEnB ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressEnB : ""
  );
  const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaAdressMlB ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressMlB : ""
  );
  const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaProvinceEn ? formData?.BrideAddressDetails?.presentOutSideIndiaProvinceEn : ""
  );
  const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaProvinceMl ? formData?.BrideAddressDetails?.presentOutSideIndiaProvinceMl : ""
  );
  const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaadrsVillage ? formData?.BrideAddressDetails?.presentOutSideIndiaadrsVillage : ""
  );
  const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown ? formData?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown : ""
  );
  const [presentOutSideIndiaPostCode, setPostCode] = useState(
    formData?.BrideAddressDetails?.presentOutSideIndiaPostCode ? formData?.BrideAddressDetails?.presentOutSideIndiaPostCode : ""
  );
  const [presentOutSideCountry, setOutSideCountry] = useState(
    formData?.BrideAddressDetails?.presentOutSideCountry ? formData?.BrideAddressDetails?.presentOutSideCountry : ""
  );

  //############################################### Same As Above ##################################################################################################

  const [isPrsentAddress, setIsPrsentAddress] = useState(
    formData?.BrideAddressDetails?.isPrsentAddress ? formData?.BrideAddressDetails?.isPrsentAddress : true
  );

  //################################################### Country State Permanent ###########################################################################

  const [permtaddressCountry, setpermtaddressCountry] = useState(
    formData?.BrideAddressDetails?.permtaddressCountry ? formData?.BrideAddressDetails?.permtaddressCountry : ""
  );
  const [permtaddressStateName, setpermtaddressStateName] = useState(
    formData?.BrideAddressDetails?.permtaddressStateName?.code ? formData?.BrideAddressDetails?.permtaddressStateName : ""
  );
  const [countryValuePermanent, setCountryValuePermanent] = useState(
    formData?.BrideAddressDetails?.countryValuePermanent?.code ? formData?.BrideAddressDetails?.countryValuePermanent : ""
  );
  const [valuePermanent, setValuePermanent] = useState(
    formData?.BrideAddressDetails?.presentaddressStateName?.code ? formData?.BrideAddressDetails?.presentaddressStateName : ""
  );

  //################################################# Permanent Inside Kerala ##########################################################################################

  const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrDistrict?.code ? formData?.BrideAddressDetails?.permntInKeralaAdrDistrict : ""
  );
  // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.BrideAddressDetails?.permntInKeralaAdrLBTypeName ? formData?.BrideAddressDetails?.permntInKeralaAdrLBTypeName : null);
  const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrLBName?.code ? formData?.BrideAddressDetails?.permntInKeralaAdrLBName : ""
  );
  const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrTaluk ? formData?.BrideAddressDetails?.permntInKeralaAdrTaluk : ""
  );
  const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrVillage ? formData?.BrideAddressDetails?.permntInKeralaAdrVillage : ""
  );
  const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrPostOffice ? formData?.BrideAddressDetails?.permntInKeralaAdrPostOffice : ""
  );
  const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrPincode ? formData?.BrideAddressDetails?.permntInKeralaAdrPincode : ""
  );
  const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn ? formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn : ""
  );
  const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl ? formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl : ""
  );
  const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn ? formData?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn : ""
  );
  const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl ? formData?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl : ""
  );
  const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn ? formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn : ""
  );
  const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(
    formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl ? formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl : ""
  );
  const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(
    formData?.BrideAddressDetails?.permntInKeralaWardNo ? formData?.BrideAddressDetails?.permntInKeralaWardNo : ""
  );

  //############################################################################### Permanent Outside Kerala ############################################################################

  const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaDistrict?.code ? formData?.BrideAddressDetails?.permntOutsideKeralaDistrict : ""
  );
  const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaTaluk ? formData?.BrideAddressDetails?.permntOutsideKeralaTaluk : ""
  );
  const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn ? formData?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn : ""
  );
  const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaVillage ? formData?.BrideAddressDetails?.permntOutsideKeralaVillage : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.BrideAddressDetails?.presentOutsideKeralaPostOffice);
  const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaPincode ? formData?.BrideAddressDetails?.permntOutsideKeralaPincode : ""
  );
  const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn ? formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn : ""
  );
  const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl ? formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl : ""
  );
  const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn ? formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn : ""
  );
  const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl ? formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl : ""
  );
  const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn ? formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn : ""
  );
  const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl ? formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl : ""
  );
  const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn ? formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn : ""
  );
  const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(
    formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl ? formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl : ""
  );

  //######################################################################## Permanent Ouside Country #############################################################################################

  const [permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaLineoneEn ? formData?.BrideAddressDetails?.permntOutsideIndiaLineoneEn : ""
  );
  const [permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaLineoneMl ? formData?.BrideAddressDetails?.permntOutsideIndiaLineoneMl : ""
  );
  const [permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn ? formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn : ""
  );
  const [permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl ? formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl : ""
  );
  const [permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaprovinceEn ? formData?.BrideAddressDetails?.permntOutsideIndiaprovinceEn : ""
  );
  const [permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaprovinceMl ? formData?.BrideAddressDetails?.permntOutsideIndiaprovinceMl : ""
  );
  const [permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaVillage ? formData?.BrideAddressDetails?.permntOutsideIndiaVillage : ""
  );
  const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaCityTown ? formData?.BrideAddressDetails?.permntOutsideIndiaCityTown : ""
  );
  const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(
    formData?.BrideAddressDetails?.permanentOutsideIndiaPostCode ? formData?.BrideAddressDetails?.permanentOutsideIndiaPostCode : ""
  );
  const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(
    formData?.BrideAddressDetails?.permntOutsideIndiaCountry ? formData?.BrideAddressDetails?.permntOutsideIndiaCountry : ""
  );

  //############################################################# Error Constants #####################################################################################

  const [PresentAddressCountryError, setPresentAddressCountryError] = useState(
    formData?.BrideAddressDetails?.PresentAddressCountryError ? false : false
  );
  const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(
    formData?.BrideAddressDetails?.PresentAddressStateNameError ? false : false
  );
  const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaDistrictError ? false : false
  );
  const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaTalukError ? false : false
  );
  const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaVillageError ? false : false
  );
  const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaLBNameError ? false : false
  );
  const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaWardNoError ? false : false
  );
  const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaHouseNameEnError ? false : false
  );
  const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaHouseNameMlError ? false : false
  );
  const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaLocalityNameEnError ? false : false
  );
  const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaLocalityNameMlError ? false : false
  );

  const [PresentInsideKeralaStreetNameEnError, setPresentInsideKeralaStreetNameEnError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaStreetNameEnError ? false : false
  );
  const [PresentInsideKeralaStreetNameMlError, setPresentInsideKeralaStreetNameMlError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaStreetNameMlError ? false : false
  );

  const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaPostOfficeError ? false : false
  );
  const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(
    formData?.BrideAddressDetails?.PresentInsideKeralaPincodeError ? false : false
  );
  const [PresentCityVillageError, setCityVillageError] = useState(formData?.BrideAddressDetails?.PresentCityVillageError ? false : false);
  const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaProvinceEnError ? false : false
  );
  const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaProvinceMlError ? false : false
  );
  const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaCityError ? false : false
  );
  const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaPostCodeError ? false : false
  );
  const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaLineOneEnError ? false : false
  );
  const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaLineOneMlError ? false : false
  );
  const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaLineTwoEnError ? false : false
  );
  const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(
    formData?.BrideAddressDetails?.PresentOutSideIndiaLineTwoMlError ? false : false
  );

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
        if (presentInsideKeralaTaluk == null || presentInsideKeralaTaluk == undefined || presentInsideKeralaTaluk == "") {
          setPresentInsideKeralaTalukError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaTalukError(false);
        }
        if (presentInsideKeralaVillage == null || presentInsideKeralaVillage == undefined || presentInsideKeralaVillage == "") {
          setPresentInsideKeralaVillageError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaVillageError(false);
        }
        if (presentInsideKeralaLBName == null || presentInsideKeralaLBName == undefined || presentInsideKeralaLBName == "") {
          setPresentInsideKeralaLBNameError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaLBNameError(false);
        }
        if (presentWardNo == null || presentWardNo == undefined || presentWardNo == "") {
          setPresentInsideKeralaWardNoError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaWardNoError(false);
        }
        if (presentInsideKeralaPostOffice === null || presentInsideKeralaPostOffice === undefined || presentInsideKeralaPostOffice === "") {
          setPresentInsideKeralaPostOfficeError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaPostOfficeError(false);
        }
        if (presentInsideKeralaPincode === null || presentInsideKeralaPincode === undefined || presentInsideKeralaPincode === "") {
          setPresentInsideKeralaPincodeError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaPincodeError(false);
        }
        if (
          presentInsideKeralaLocalityNameEn.trim() == null ||
          presentInsideKeralaLocalityNameEn.trim() == "" ||
          presentInsideKeralaLocalityNameEn.trim() == undefined
        ) {
          validFlag = false;
          setinsideKeralaLocalityNameEn("");
          setPresentInsideKeralaLocalityNameEnError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaLocalityNameEnError(false);
        }
        // if (presentInsideKeralaLocalityNameEn === null) {
        //     setPresentInsideKeralaLocalityNameEnError(true);
        //     validFlag = false;
        //     setToast(true);
        //     setTimeout(() => {
        //         setToast(false);
        //     }, 2000);
        // } else {
        //     setPresentInsideKeralaLocalityNameEnError(false);
        // }
        if (
          presentInsideKeralaLocalityNameMl.trim() == null ||
          presentInsideKeralaLocalityNameMl.trim() == "" ||
          presentInsideKeralaLocalityNameMl.trim() == undefined
        ) {
          setinsideKeralaLocalityNameMl("");
          setPresentInsideKeralaLocalityNameMlError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaLocalityNameMlError(false);
        }
        if (
          presentInsideKeralaHouseNameEn.trim() == null ||
          presentInsideKeralaHouseNameEn.trim() == "" ||
          presentInsideKeralaHouseNameEn.trim() == undefined
        ) {
          setinsideKeralaHouseNameEn("");
          setPresentInsideKeralaHouseNameEnError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaHouseNameEnError(false);
        }
        if (
          presentInsideKeralaHouseNameMl.trim() == null ||
          presentInsideKeralaHouseNameMl.trim() == "" ||
          presentInsideKeralaHouseNameMl.trim() == undefined
        ) {
          setinsideKeralaHouseNameMl("");
          setPresentInsideKeralaHouseNameMlError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaHouseNameMlError(false);
        }
        // if (presentInsideKeralaStreetNameEn.trim() == null || presentInsideKeralaStreetNameEn.trim() == '' || presentInsideKeralaStreetNameEn.trim() == undefined) {
        //     setinsideKeralaStreetNameEn("");
        //     //setPresentInsideKeralaStreetNameEnError(false);
        // }
        // if (presentInsideKeralaStreetNameMl.trim() == null || presentInsideKeralaStreetNameMl.trim() == '' || presentInsideKeralaStreetNameMl.trim() == undefined) {
        //     setinsideKeralaStreetNameMl("");
        //     //setPresentInsideKeralaStreetNameMlError(false);
        // }
        if (
          presentInsideKeralaStreetNameEn === null ||
          presentInsideKeralaStreetNameEn.trim() == "" ||
          presentInsideKeralaStreetNameEn.trim() == undefined
        ) {
          setinsideKeralaStreetNameEn("");
        } else if (
          presentInsideKeralaStreetNameEn != null &&
          (presentInsideKeralaStreetNameMl.trim() == null ||
            presentInsideKeralaStreetNameMl.trim() == "" ||
            presentInsideKeralaStreetNameMl.trim() == undefined)
        ) {
          setPresentInsideKeralaStreetNameMlError(true);
          setinsideKeralaStreetNameMl("");
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaStreetNameMlError(false);
        }
        if (
          presentInsideKeralaStreetNameMl === null ||
          presentInsideKeralaStreetNameMl.trim() == "" ||
          presentInsideKeralaStreetNameMl.trim() == undefined
        ) {
          setinsideKeralaStreetNameMl("");
        } else if (
          presentInsideKeralaStreetNameMl != null &&
          (presentInsideKeralaStreetNameEn.trim() == null ||
            presentInsideKeralaStreetNameEn.trim() == "" ||
            presentInsideKeralaStreetNameEn.trim() == undefined)
        ) {
          setPresentInsideKeralaStreetNameEnError(true);
          setinsideKeralaStreetNameEn("");
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaStreetNameEnError(false);
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
        if (
          presentOutsideKeralaLocalityNameEn == null ||
          presentOutsideKeralaLocalityNameEn == undefined ||
          presentOutsideKeralaLocalityNameEn == ""
        ) {
          setPresentInsideKeralaLocalityNameEnError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaLocalityNameEnError(false);
        }
        if (
          presentOutsideKeralaLocalityNameMl == null ||
          presentOutsideKeralaLocalityNameMl == undefined ||
          presentOutsideKeralaLocalityNameMl == ""
        ) {
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

      // sessionStorage.setItem("presentaddressCountry", presentaddressCountry.code);
      // sessionStorage.setItem("presentaddressStateName", presentaddressStateName.code);
      // sessionStorage.setItem("presentInsideKeralaDistrict", presentInsideKeralaDistrict ? presentInsideKeralaDistrict.code : null);
      // sessionStorage.setItem("presentInsideKeralaTaluk", presentInsideKeralaTaluk ? presentInsideKeralaTaluk.code : null);
      // sessionStorage.setItem("presentInsideKeralaVillage", presentInsideKeralaVillage ? presentInsideKeralaVillage.code : null);
      // sessionStorage.setItem("presentInsideKeralaLBName", presentInsideKeralaLBName ? presentInsideKeralaLBName : null);
      // sessionStorage.setItem("presentWardNo", presentWardNo ? presentWardNo.code : null);
      // sessionStorage.setItem("presentInsideKeralaHouseNameEn", presentInsideKeralaHouseNameEn ? presentInsideKeralaHouseNameEn : null);
      // sessionStorage.setItem("presentInsideKeralaHouseNameMl", presentInsideKeralaHouseNameMl ? presentInsideKeralaHouseNameMl : null);
      // sessionStorage.setItem("presentInsideKeralaLocalityNameEn", presentInsideKeralaLocalityNameEn ? presentInsideKeralaLocalityNameEn : null);
      // sessionStorage.setItem("presentInsideKeralaLocalityNameMl", presentInsideKeralaLocalityNameMl ? presentInsideKeralaLocalityNameMl : null);
      // sessionStorage.setItem("presentInsideKeralaStreetNameEn", presentInsideKeralaStreetNameEn ? presentInsideKeralaStreetNameEn : null);
      // sessionStorage.setItem("presentInsideKeralaStreetNameMl", presentInsideKeralaStreetNameMl ? presentInsideKeralaStreetNameMl : null);
      // sessionStorage.setItem("presentInsideKeralaPostOffice", presentInsideKeralaPostOffice ? presentInsideKeralaPostOffice.code : null);
      // sessionStorage.setItem("presentInsideKeralaPincode", presentInsideKeralaPincode ? presentInsideKeralaPincode.code : null);

      //################################# Present Outside Kerala ############################################################################

      // sessionStorage.setItem("presentOutsideKeralaDistrict", presentOutsideKeralaDistrict ? presentOutsideKeralaDistrict.code : null);
      // sessionStorage.setItem("presentOutsideKeralaCityVilgeEn", presentOutsideKeralaCityVilgeEn ? presentOutsideKeralaCityVilgeEn : null);
      // sessionStorage.setItem("presentOutsideKeralaVillage", presentOutsideKeralaVillage ? presentOutsideKeralaVillage.code : null);
      // sessionStorage.setItem("presentOutsideKeralaTaluk", presentOutsideKeralaTaluk ? presentOutsideKeralaTaluk : null);
      // sessionStorage.setItem("presentOutsideKeralaPostOfficeEn", presentOutsideKeralaPostOfficeEn ? presentOutsideKeralaPostOfficeEn : null);
      // sessionStorage.setItem("presentOutsideKeralaPostOfficeMl", presentOutsideKeralaPostOfficeMl ? presentOutsideKeralaPostOfficeMl : null);
      // sessionStorage.setItem("presentOutsideKeralaPincode", presentOutsideKeralaPincode ? presentOutsideKeralaPincode : null);
      // sessionStorage.setItem("presentOutsideKeralaHouseNameEn", presentOutsideKeralaHouseNameEn ? presentOutsideKeralaHouseNameEn : null);
      // sessionStorage.setItem("presentOutsideKeralaHouseNameMl", presentOutsideKeralaHouseNameMl ? presentOutsideKeralaHouseNameMl : null);
      // sessionStorage.setItem("presentOutsideKeralaLocalityNameEn", presentOutsideKeralaLocalityNameEn ? presentOutsideKeralaLocalityNameEn : null);
      // sessionStorage.setItem("presentOutsideKeralaLocalityNameMl", presentOutsideKeralaLocalityNameMl ? presentOutsideKeralaLocalityNameMl : null);
      // sessionStorage.setItem("presentOutsideKeralaStreetNameEn", presentOutsideKeralaStreetNameEn ? presentOutsideKeralaStreetNameEn : null);
      // sessionStorage.setItem("presentOutsideKeralaStreetNameMl", presentOutsideKeralaStreetNameMl ? presentOutsideKeralaStreetNameMl : null);

      //####################################### Present Outside India ##############################################################
      // sessionStorage.setItem("presentOutSideIndiaAdressEn", presentOutSideIndiaAdressEn ? presentOutSideIndiaAdressEn : null);
      // sessionStorage.setItem("presentOutSideIndiaAdressMl", presentOutSideIndiaAdressMl ? presentOutSideIndiaAdressMl : null);
      // sessionStorage.setItem("presentOutSideIndiaAdressEnB", presentOutSideIndiaAdressEnB ? presentOutSideIndiaAdressEnB : null);
      // sessionStorage.setItem("presentOutSideIndiaAdressMlB", presentOutSideIndiaAdressMlB ? presentOutSideIndiaAdressMlB : null);
      // sessionStorage.setItem("presentOutSideIndiaProvinceEn", presentOutSideIndiaProvinceEn ? presentOutSideIndiaProvinceEn : null);
      // sessionStorage.setItem("presentOutSideIndiaProvinceMl", presentOutSideIndiaProvinceMl ? presentOutSideIndiaProvinceMl : null);
      // sessionStorage.setItem("presentOutSideIndiaadrsVillage", presentOutSideIndiaadrsVillage ? presentOutSideIndiaadrsVillage.code : null);
      // sessionStorage.setItem("presentOutSideIndiaPostCode", presentOutSideIndiaPostCode ? presentOutSideIndiaPostCode : null);
      // // sessionStorage.setItem("presentOutSideCountry", presentOutSideCountry ? presentOutSideCountry.code : null);
      // sessionStorage.setItem("presentOutSideIndiaadrsCityTown", presentOutSideIndiaadrsCityTown ? presentOutSideIndiaadrsCityTown : null);
      // sessionStorage.setItem("isPrsentAddress", isPrsentAddress ? isPrsentAddress : true);

      // sessionStorage.setItem("permtaddressCountry", permtaddressCountry ? permtaddressCountry.code : null);
      // sessionStorage.setItem("permtaddressStateName", permtaddressStateName ? permtaddressStateName.code : null);
      // sessionStorage.setItem("permntInKeralaAdrHouseNameEn", permntInKeralaAdrHouseNameEn ? permntInKeralaAdrHouseNameEn : "");
      // sessionStorage.setItem("permntInKeralaAdrHouseNameMl", permntInKeralaAdrHouseNameMl ? permntInKeralaAdrHouseNameMl : "");
      // sessionStorage.setItem("permntInKeralaAdrLocalityNameEn", permntInKeralaAdrLocalityNameEn ? permntInKeralaAdrLocalityNameEn : "");
      // sessionStorage.setItem("permntInKeralaAdrLocalityNameMl", permntInKeralaAdrLocalityNameMl ? permntInKeralaAdrLocalityNameMl : "");
      // sessionStorage.setItem("permntInKeralaAdrStreetNameEn", permntInKeralaAdrStreetNameEn ? permntInKeralaAdrStreetNameEn : "");
      // sessionStorage.setItem("permntInKeralaAdrStreetNameMl", permntInKeralaAdrStreetNameMl ? permntInKeralaAdrStreetNameMl : "");
      // sessionStorage.setItem("permntInKeralaAdrVillage", permntInKeralaAdrVillage ? permntInKeralaAdrVillage.code : null);
      // sessionStorage.setItem("permntInKeralaAdrLBName", permntInKeralaAdrLBName ? permntInKeralaAdrLBName.code : null);
      // sessionStorage.setItem("permntInKeralaAdrDistrict", permntInKeralaAdrDistrict ? permntInKeralaAdrDistrict.code : null);
      // sessionStorage.setItem("permntInKeralaAdrTaluk", permntInKeralaAdrTaluk ? permntInKeralaAdrTaluk.code : null);
      // sessionStorage.setItem("permntInKeralaAdrPostOffice", permntInKeralaAdrPostOffice ? permntInKeralaAdrPostOffice.code : null);
      // sessionStorage.setItem("permntInKeralaAdrPincode", permntInKeralaAdrPincode ? permntInKeralaAdrPincode.code : null);
      // sessionStorage.setItem("permntInKeralaWardNo", permntInKeralaWardNo ? permntInKeralaWardNo.code : null);
      // sessionStorage.setItem("permntOutsideKeralaDistrict", permntOutsideKeralaDistrict ? permntOutsideKeralaDistrict.code : null);
      // sessionStorage.setItem("permntOutsideKeralaCityVilgeEn", permntOutsideKeralaCityVilgeEn ? permntOutsideKeralaCityVilgeEn : null);
      // sessionStorage.setItem("permntOutsideKeralaVillage", permntOutsideKeralaVillage ? permntOutsideKeralaVillage.code : null);
      // sessionStorage.setItem("permntOutsideKeralaTaluk", permntOutsideKeralaTaluk ? permntOutsideKeralaTaluk.code : null);
      // sessionStorage.setItem("permntOutsideKeralaPincode", permntOutsideKeralaPincode ? permntOutsideKeralaPincode : null);
      // sessionStorage.setItem("permntOutsideKeralaHouseNameEn", permntOutsideKeralaHouseNameEn ? permntOutsideKeralaHouseNameEn : null);
      // sessionStorage.setItem("permntOutsideKeralaHouseNameMl", permntOutsideKeralaHouseNameMl ? permntOutsideKeralaHouseNameMl : null);
      // sessionStorage.setItem("permntOutsideKeralaLocalityNameEn", permntOutsideKeralaLocalityNameEn ? permntOutsideKeralaLocalityNameEn : null);
      // sessionStorage.setItem("permntOutsideKeralaLocalityNameMl", permntOutsideKeralaLocalityNameMl ? permntOutsideKeralaLocalityNameMl : null);
      // sessionStorage.setItem("permntOutsideKeralaStreetNameEn", permntOutsideKeralaStreetNameEn ? permntOutsideKeralaStreetNameEn : null);
      // sessionStorage.setItem("permntOutsideKeralaStreetNameMl", permntOutsideKeralaStreetNameMl ? permntOutsideKeralaStreetNameMl : null);
      // sessionStorage.setItem("permntOutsideKeralaPostOfficeEn", permntOutsideKeralaPostOfficeEn ? permntOutsideKeralaPostOfficeEn : null);
      // sessionStorage.setItem("permntOutsideKeralaPostOfficeMl", permntOutsideKeralaPostOfficeMl ? permntOutsideKeralaPostOfficeMl : null);
      // sessionStorage.setItem("permntOutsideIndiaLineoneEn", permntOutsideIndiaLineoneEn ? permntOutsideIndiaLineoneEn : null);
      // sessionStorage.setItem("permntOutsideIndiaLineoneMl", permntOutsideIndiaLineoneMl ? permntOutsideIndiaLineoneMl : null);
      // sessionStorage.setItem("permntOutsideIndiaLinetwoEn", permntOutsideIndiaLinetwoEn ? permntOutsideIndiaLinetwoEn : null);
      // sessionStorage.setItem("permntOutsideIndiaLinetwoMl", permntOutsideIndiaLinetwoMl ? permntOutsideIndiaLinetwoMl : null);
      // sessionStorage.setItem("permntOutsideIndiaprovinceEn", permntOutsideIndiaprovinceEn ? permntOutsideIndiaprovinceEn : null);
      // sessionStorage.setItem("permntOutsideIndiaVillage", permntOutsideIndiaVillage ? permntOutsideIndiaVillage.code : null);
      // sessionStorage.setItem("permntOutsideIndiaCityTown", permntOutsideIndiaCityTown ? permntOutsideIndiaCityTown : null);
      // sessionStorage.setItem("permanentOutsideIndiaPostCode", permanentOutsideIndiaPostCode ? permanentOutsideIndiaPostCode : null);
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

  console.log("Adress Groom", formData);

  if (
    isCountryLoading ||
    isStateLoading ||
    islocalbodiesLoading ||
    isTalukLoading ||
    isVillageLoading ||
    isDistrictLoading ||
    isPostOfficeLoading ||
    isWardLoaded
  ) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen/cr/cr-birth-creation/address-birth") ? (
          <Timeline currentStep={3} />
        ) : null || window.location.href.includes("employee/cr/cr-flow") ? (
          <Timeline currentStep={3} />
        ) : null}
        {window.location.href.includes("/citizen/cr-adoptionflow/adoption-address-birth") ? (
          <AdoptionTimeline currentStep={3} />
        ) : null || window.location.href.includes("employee/cr/cr-adoptionflow") ? (
          <AdoptionTimeline currentStep={3} />
        ) : null}
        {window.location.href.includes("/citizen/cr/cr-death-creation/address-death") ? (
          <DRTimeline currentStep={2} />
        ) : null || window.location.href.includes("employee/cr/death-flow") ? (
          <DRTimeline currentStep={2} />
        ) : null}
        {window.location.href.includes("/citizen/cr/cr-stillbirth-creation/stillbirth-address") ? (
          <Timeline currentStep={3} />
        ) : null || window.location.href.includes("employee/cr/cr-flow") ? (
          <Timeline currentStep={3} />
        ) : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          <div className="accordion-wrapper">
            <BrideAddressPresent
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
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
              isEditBirthNAC={isEditBirthNAC}
              formData={formData}
              Districtvalues={Districtvalues}
              setDistrictvalue={setDistrictvalue}
            />
          </div>
          {countryvalue === "IND" && value === "KL" && (
            <div>
              <BrideAddressPresentInsideKerala
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
                Districtvalues={Districtvalues}
                setDistrictvalue={setDistrictvalue}
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
                isEditStillBirth={isEditStillBirth}
                isEditAdoption={isEditAdoption}
                isEditBirthNAC={isEditBirthNAC}
                formData={formData}
                value={value}
                setValue={setValue}
              />
            </div>
          )}
          {countryvalue === "IND" && value != "KL" && (
            <div>
              <BrideAddressPresentOutsideKerala
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
                isEditStillBirth={isEditStillBirth}
                isEditAdoption={isEditAdoption}
                isEditBirthNAC={isEditBirthNAC}
                formData={formData}
              />
            </div>
          )}
          {countryvalue != "IND" && (
            <div>
              <BrideAddressPresentOutsideIndia
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
                isEditStillBirth={isEditStillBirth}
                isEditAdoption={isEditAdoption}
                isEditBirthNAC={isEditBirthNAC}
                formData={formData}
              />
            </div>
          )}
          <div>
            <BrideAddressSameAsAbove
              isPrsentAddress={isPrsentAddress}
              setIsPrsentAddress={setIsPrsentAddress}
              isEditBirth={isEditBirth}
              isEditDeath={isEditDeath}
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
              isEditBirthNAC={isEditBirthNAC}
              formData={formData}
            />
          </div>
          {isPrsentAddress === false && (
            <div>
              <BrideAddressPermanent
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
                isEditStillBirth={isEditStillBirth}
                isEditAdoption={isEditAdoption}
                isEditBirthNAC={isEditBirthNAC}
                formData={formData}
              />
            </div>
          )}
          {countryValuePermanent === "IND" && valuePermanent === "KL" && isPrsentAddress === false && (
            <div>
              <BrideAddressPermanentInsideKerala
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
                Districtvalues={Districtvalues}
                setDistrictvalue={setDistrictvalue}
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
                isEditStillBirth={isEditStillBirth}
                isEditAdoption={isEditAdoption}
                isEditBirthNAC={isEditBirthNAC}
                formData={formData}
              />
            </div>
          )}
          {countryValuePermanent === "IND" && valuePermanent !== "KL" && isPrsentAddress === false && (
            <div>
              <BrideAddressPermanentOutsideKerala
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
                isEditStillBirth={isEditStillBirth}
                isEditAdoption={isEditAdoption}
                isEditBirthNAC={isEditBirthNAC}
                formData={formData}
              />
            </div>
          )}
          {countryValuePermanent != "IND" && isPrsentAddress === false && (
            <div>
              <BrideAddressPermanentOutsideIndia
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
                isEditStillBirth={isEditStillBirth}
                isEditAdoption={isEditAdoption}
                isEditBirthNAC={isEditBirthNAC}
                formData={formData}
              />
            </div>
          )}
          {toast && (
            <Toast
              error={
                PresentAddressCountryError ||
                PresentAddressStateNameError ||
                PresentInsideKeralaDistrictError ||
                PresentInsideKeralaTalukError ||
                PresentInsideKeralaVillageError ||
                PresentInsideKeralaLBNameError ||
                PresentInsideKeralaWardNoError ||
                PresentInsideKeralaHouseNameEnError ||
                PresentInsideKeralaHouseNameMlError ||
                PresentInsideKeralaLocalityNameEnError ||
                PresentInsideKeralaLocalityNameMlError ||
                PresentInsideKeralaPostOfficeError ||
                PresentInsideKeralaPincodeError ||
                PresentCityVillageError ||
                PresentOutSideIndiaProvinceEnError ||
                PresentOutSideIndiaProvinceMlError ||
                PresentOutSideIndiaCityError ||
                PresentOutSideIndiaPostCodeError ||
                PresentOutSideIndiaLineOneEnError ||
                PresentOutSideIndiaLineOneMlError ||
                PresentOutSideIndiaLineTwoEnError ||
                PresentOutSideIndiaLineTwoMlError ||
                PresentInsideKeralaStreetNameEnError ||
                PresentInsideKeralaStreetNameMlError
              }
              label={
                PresentAddressCountryError ||
                PresentAddressStateNameError ||
                PresentInsideKeralaDistrictError ||
                PresentInsideKeralaTalukError ||
                PresentInsideKeralaVillageError ||
                PresentInsideKeralaLBNameError ||
                PresentInsideKeralaWardNoError ||
                PresentInsideKeralaHouseNameEnError ||
                PresentInsideKeralaHouseNameMlError ||
                PresentInsideKeralaLocalityNameEnError ||
                PresentInsideKeralaLocalityNameMlError ||
                PresentInsideKeralaPostOfficeError ||
                PresentInsideKeralaPincodeError ||
                PresentCityVillageError ||
                PresentOutSideIndiaProvinceEnError ||
                PresentOutSideIndiaProvinceMlError ||
                PresentOutSideIndiaCityError ||
                PresentOutSideIndiaPostCodeError ||
                PresentOutSideIndiaLineOneEnError ||
                PresentOutSideIndiaLineOneMlError ||
                PresentOutSideIndiaLineTwoEnError ||
                PresentOutSideIndiaLineTwoMlError ||
                PresentInsideKeralaStreetNameEnError ||
                PresentInsideKeralaStreetNameMlError
                  ? PresentAddressCountryError
                    ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`)
                    : PresentAddressStateNameError
                    ? t(`BIRTH_ERROR_STATE_CHOOSE`)
                    : PresentInsideKeralaDistrictError
                    ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`)
                    : PresentInsideKeralaTalukError
                    ? t(`BIRTH_ERROR_TALUK_CHOOSE`)
                    : PresentInsideKeralaVillageError
                    ? t(`BIRTH_ERROR_VILLAGE_CHOOSE`)
                    : PresentInsideKeralaLBNameError
                    ? t(`BIRTH_ERROR_LBNAME_CHOOSE`)
                    : PresentInsideKeralaWardNoError
                    ? t(`BIRTH_ERROR_WARD_CHOOSE`)
                    : PresentInsideKeralaHouseNameEnError
                    ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`)
                    : PresentInsideKeralaHouseNameMlError
                    ? t(`BIRTH_ERROR_HOUSE_NAME_ML_CHOOSE`)
                    : PresentInsideKeralaLocalityNameEnError
                    ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                    : PresentInsideKeralaLocalityNameMlError
                    ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                    : PresentInsideKeralaPostOfficeError
                    ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`)
                    : PresentInsideKeralaPincodeError
                    ? t(`BIRTH_ERROR_PINCODE_CHOOSE`)
                    : PresentCityVillageError
                    ? t(`BIRTH_ERROR_CITY_CHOOSE`)
                    : PresentOutSideIndiaProvinceEnError
                    ? t(`BIRTH_ERROR_STATE_PROVINCE_EN`)
                    : PresentOutSideIndiaProvinceMlError
                    ? t(`BIRTH_ERROR_STATE_PROVINCE_ML`)
                    : PresentOutSideIndiaCityError
                    ? t(`BIRTH_ERROR_CITY_TOWN`)
                    : PresentOutSideIndiaPostCodeError
                    ? t(`BIRTH_ERROR_ZIP_CODE`)
                    : PresentOutSideIndiaLineOneEnError
                    ? t(`BIRTH_ERROR_ADDRESS_LINE_ONE_EN`)
                    : PresentOutSideIndiaLineOneMlError
                    ? t(`BIRTH_ERROR_ADDRESS_LINE_ONE_ML`)
                    : PresentOutSideIndiaLineTwoEnError
                    ? t(`BIRTH_ERROR_ADDRESS_LINE_TWO_ML`)
                    : PresentOutSideIndiaLineTwoMlError
                    ? t(`BIRTH_ERROR_ADDRESS_LINE_TWO_ML`)
                    : PresentInsideKeralaStreetNameEnError
                    ? t(`BIRTH_ERROR_ADDRESS_PRESENT_STREET_EN`)
                    : PresentInsideKeralaStreetNameMlError
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
export default BrideAddressBasePage;
