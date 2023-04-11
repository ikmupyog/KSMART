import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../components/CRTimeline";
import DRTimeline from "../../../components/DRTimeline";
import AdoptionTimeline from "../../../components/AdoptionTimeline";
import { useTranslation } from "react-i18next";
import GroomAddressPresent from "./GroomAddressPresent";
import GroomAddressPresentInsideKerala from "./GroomAddressPresentInsideKerala";
import GroomAddressPresentOutsideKerala from "./GroomAddressPresentOutsideKerala";
import GroomAddressPresentOutsideIndia from "./GroomAddressPresentOutsideIndia";
import GroomAddressSameAsAbove from "./GroomAddressSameAsAbove";
import GroomAddressPermanent from "./GroomAddressPermanent";
import GroomAddressPermanentInsideKerala from "./GroomAddressPermanentInsideKerala";
import GroomAddressPermanentOutsideKerala from "./GroomAddressPermanentOutsideKerala";
import GroomAddressPermanentOutsideIndia from "./GroomAddressPermanentOutsideIndia";

const GroomAddressBasePage = ({
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
    formData?.GroomAddressDetails?.presentaddressCountry ? formData?.GroomAddressDetails?.presentaddressCountry : ""
  );
  const [presentaddressStateName, setaddressStateName] = useState(
    formData?.GroomAddressDetails?.presentaddressStateName ? formData?.GroomAddressDetails?.presentaddressStateName : ""
  );
  const [countryvalue, setCountryValue] = useState(formData?.GroomAddressDetails?.countryvalue ? formData?.GroomAddressDetails?.countryvalue : "");
  const [value, setValue] = useState(
    formData?.GroomAddressDetails?.presentaddressStateName?.code ? formData?.GroomAddressDetails?.presentaddressStateName?.code : ""
  );

  //################################# Present Inside Kerala #########################################################################################################

  const [presentWardNo, setPresentWardNo] = useState(
    formData?.GroomAddressDetails?.presentWardNo?.code ? formData?.GroomAddressDetails?.presentWardNo : ""
  );

  const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaDistrict?.code ? formData?.GroomAddressDetails?.presentInsideKeralaDistrict : ""
  );
  const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaLBTypeName ? formData?.GroomAddressDetails?.presentInsideKeralaLBTypeName : ""
  );
  const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaLBName?.code ? formData?.GroomAddressDetails?.presentInsideKeralaLBName : ""
  );
  const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaTaluk ? formData?.GroomAddressDetails?.presentInsideKeralaTaluk : ""
  );
  const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaVillage?.code ? formData?.GroomAddressDetails?.presentInsideKeralaVillage : ""
  );
  const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaPostOffice?.code ? formData?.GroomAddressDetails?.presentInsideKeralaPostOffice : ""
  );
  const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaPincode ? formData?.GroomAddressDetails?.presentInsideKeralaPincode : ""
  );
  const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaHouseNameEn ? formData?.GroomAddressDetails?.presentInsideKeralaHouseNameEn : ""
  );
  const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaHouseNameMl ? formData?.GroomAddressDetails?.presentInsideKeralaHouseNameMl : ""
  );
  const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn ? formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn : ""
  );
  const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl ? formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl : ""
  );
  const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaStreetNameEn ? formData?.GroomAddressDetails?.presentInsideKeralaStreetNameEn : ""
  );
  const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaStreetNameMl ? formData?.GroomAddressDetails?.presentInsideKeralaStreetNameMl : ""
  );
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  //################################# Present Outside Kerala ##########################################################################################################
  const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaDistrict?.code ? formData?.GroomAddressDetails?.presentOutsideKeralaDistrict : ""
  );
  const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaTaluk ? formData?.GroomAddressDetails?.presentOutsideKeralaTaluk : ""
  );
  // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.GroomAddressDetails?.presentOutsideKeralaTaluk?.code ? formData?.GroomAddressDetails?.presentOutsideKeralaTaluk : formData?.ChildDetails?.GroomAddressDetails?.presentOutsideKeralaTaluk ? "" : "");
  const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn ? formData?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn : ""
  );
  const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaVillage?.code ? formData?.GroomAddressDetails?.presentOutsideKeralaVillage : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.GroomAddressDetails?.presentOutsideKeralaPostOffice);
  const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaPincode ? formData?.GroomAddressDetails?.presentOutsideKeralaPincode : ""
  );
  const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn ? formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn : ""
  );
  const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl ? formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl : ""
  );
  const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn ? formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn : ""
  );
  const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl ? formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl : ""
  );
  const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn ? formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn : ""
  );
  const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl ? formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl : ""
  );
  const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn ? formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn : ""
  );
  const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl ? formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl : ""
  );

  //############################################### Present Out Side India ###########################################################################################################

  const [presentOutSideIndiaAdressEn, setAdressEn] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaAdressEn ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressEn : ""
  );
  const [presentOutSideIndiaAdressMl, setAdressMl] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaAdressMl ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressMl : ""
  );
  const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaAdressEnB ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressEnB : ""
  );
  const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaAdressMlB ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressMlB : ""
  );
  const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaProvinceEn ? formData?.GroomAddressDetails?.presentOutSideIndiaProvinceEn : ""
  );
  const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaProvinceMl ? formData?.GroomAddressDetails?.presentOutSideIndiaProvinceMl : ""
  );
  const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaadrsVillage ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsVillage : ""
  );
  const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown : ""
  );
  const [presentOutSideIndiaPostCode, setPostCode] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaPostCode ? formData?.GroomAddressDetails?.presentOutSideIndiaPostCode : ""
  );
  const [presentOutSideCountry, setOutSideCountry] = useState(
    formData?.GroomAddressDetails?.presentOutSideCountry ? formData?.GroomAddressDetails?.presentOutSideCountry : ""
  );

  //############################################### Same As Above ##################################################################################################

  const [isPrsentAddress, setIsPrsentAddress] = useState(
    formData?.GroomAddressDetails?.isPrsentAddress ? formData?.GroomAddressDetails?.isPrsentAddress : true
  );

  //################################################### Country State Permanent ###########################################################################

  const [permtaddressCountry, setpermtaddressCountry] = useState(
    formData?.GroomAddressDetails?.permtaddressCountry ? formData?.GroomAddressDetails?.permtaddressCountry : ""
  );
  const [permtaddressStateName, setpermtaddressStateName] = useState(
    formData?.GroomAddressDetails?.permtaddressStateName?.code ? formData?.GroomAddressDetails?.permtaddressStateName : ""
  );
  const [countryValuePermanent, setCountryValuePermanent] = useState(
    formData?.GroomAddressDetails?.countryValuePermanent?.code ? formData?.GroomAddressDetails?.countryValuePermanent : ""
  );
  const [valuePermanent, setValuePermanent] = useState(
    formData?.GroomAddressDetails?.presentaddressStateName?.code ? formData?.GroomAddressDetails?.presentaddressStateName : ""
  );

  //################################################# Permanent Inside Kerala ##########################################################################################

  const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrDistrict?.code ? formData?.GroomAddressDetails?.permntInKeralaAdrDistrict : ""
  );
  // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.GroomAddressDetails?.permntInKeralaAdrLBTypeName ? formData?.GroomAddressDetails?.permntInKeralaAdrLBTypeName : null);
  const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrLBName?.code ? formData?.GroomAddressDetails?.permntInKeralaAdrLBName : ""
  );
  const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrTaluk ? formData?.GroomAddressDetails?.permntInKeralaAdrTaluk : ""
  );
  const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrVillage ? formData?.GroomAddressDetails?.permntInKeralaAdrVillage : ""
  );
  const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrPostOffice ? formData?.GroomAddressDetails?.permntInKeralaAdrPostOffice : ""
  );
  const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrPincode ? formData?.GroomAddressDetails?.permntInKeralaAdrPincode : ""
  );
  const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn ? formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn : ""
  );
  const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl ? formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl : ""
  );
  const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn ? formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn : ""
  );
  const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl ? formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl : ""
  );
  const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn ? formData?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn : ""
  );
  const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl ? formData?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl : ""
  );
  const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(
    formData?.GroomAddressDetails?.permntInKeralaWardNo ? formData?.GroomAddressDetails?.permntInKeralaWardNo : ""
  );

  //############################################################################### Permanent Outside Kerala ############################################################################

  const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaDistrict?.code ? formData?.GroomAddressDetails?.permntOutsideKeralaDistrict : ""
  );
  const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaTaluk ? formData?.GroomAddressDetails?.permntOutsideKeralaTaluk : ""
  );
  const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn ? formData?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn : ""
  );
  const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaVillage ? formData?.GroomAddressDetails?.permntOutsideKeralaVillage : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.GroomAddressDetails?.presentOutsideKeralaPostOffice);
  const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaPincode ? formData?.GroomAddressDetails?.permntOutsideKeralaPincode : ""
  );
  const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn ? formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn : ""
  );
  const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl ? formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl : ""
  );
  const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn ? formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn : ""
  );
  const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl ? formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl : ""
  );
  const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn ? formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn : ""
  );
  const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl ? formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl : ""
  );
  const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn ? formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn : ""
  );
  const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(
    formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl ? formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl : ""
  );

  //######################################################################## Permanent Ouside Country #############################################################################################

  const [permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaLineoneEn ? formData?.GroomAddressDetails?.permntOutsideIndiaLineoneEn : ""
  );
  const [permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaLineoneMl ? formData?.GroomAddressDetails?.permntOutsideIndiaLineoneMl : ""
  );
  const [permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn ? formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn : ""
  );
  const [permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl ? formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl : ""
  );
  const [permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaprovinceEn ? formData?.GroomAddressDetails?.permntOutsideIndiaprovinceEn : ""
  );
  const [permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaprovinceMl ? formData?.GroomAddressDetails?.permntOutsideIndiaprovinceMl : ""
  );
  const [permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaVillage ? formData?.GroomAddressDetails?.permntOutsideIndiaVillage : ""
  );
  const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaCityTown ? formData?.GroomAddressDetails?.permntOutsideIndiaCityTown : ""
  );
  const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(
    formData?.GroomAddressDetails?.permanentOutsideIndiaPostCode ? formData?.GroomAddressDetails?.permanentOutsideIndiaPostCode : ""
  );
  const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaCountry ? formData?.GroomAddressDetails?.permntOutsideIndiaCountry : ""
  );

  //############################################################# Error Constants #####################################################################################

  const [PresentAddressCountryError, setPresentAddressCountryError] = useState(
    formData?.GroomAddressDetails?.PresentAddressCountryError ? false : false
  );
  const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(
    formData?.GroomAddressDetails?.PresentAddressStateNameError ? false : false
  );
  const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaDistrictError ? false : false
  );
  const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaTalukError ? false : false
  );
  const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaVillageError ? false : false
  );
  const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaLBNameError ? false : false
  );
  const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaWardNoError ? false : false
  );
  const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaHouseNameEnError ? false : false
  );
  const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaHouseNameMlError ? false : false
  );
  const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaLocalityNameEnError ? false : false
  );
  const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaLocalityNameMlError ? false : false
  );

  const [PresentInsideKeralaStreetNameEnError, setPresentInsideKeralaStreetNameEnError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaStreetNameEnError ? false : false
  );
  const [PresentInsideKeralaStreetNameMlError, setPresentInsideKeralaStreetNameMlError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaStreetNameMlError ? false : false
  );

  const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaPostOfficeError ? false : false
  );
  const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(
    formData?.GroomAddressDetails?.PresentInsideKeralaPincodeError ? false : false
  );
  const [PresentCityVillageError, setCityVillageError] = useState(formData?.GroomAddressDetails?.PresentCityVillageError ? false : false);
  const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaProvinceEnError ? false : false
  );
  const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaProvinceMlError ? false : false
  );
  const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaCityError ? false : false
  );
  const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaPostCodeError ? false : false
  );
  const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaLineOneEnError ? false : false
  );
  const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaLineOneMlError ? false : false
  );
  const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaLineTwoEnError ? false : false
  );
  const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(
    formData?.GroomAddressDetails?.PresentOutSideIndiaLineTwoMlError ? false : false
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
            <GroomAddressPresent
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
              <GroomAddressPresentInsideKerala
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
              <GroomAddressPresentOutsideKerala
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
              <GroomAddressPresentOutsideIndia
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
            <GroomAddressSameAsAbove
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
              <GroomAddressPermanent
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
              <GroomAddressPermanentInsideKerala
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
              <GroomAddressPermanentOutsideKerala
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
              <GroomAddressPermanentOutsideIndia
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
export default GroomAddressBasePage;
