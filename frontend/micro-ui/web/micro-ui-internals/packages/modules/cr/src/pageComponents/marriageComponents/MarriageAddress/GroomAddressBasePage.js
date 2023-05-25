import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../components/MARRIAGETimeline";
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
  isEditMarriage = false,
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
  //const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  //const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  //const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  //const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  //const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  //const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  //const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  // const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");

  const [lbs, setLbs] = useState(0);
  const [permlbs, setPermLbs] = useState(0);
  const [toast, setToast] = useState(false);

  let cmbLB = [];
  let cmbCountry = [];
  let cmbState = [];
  let cmbDistrict = [];
  let cmbTaluk = [];
  let cmbVillage = [];

  // Country &&
  //     Country["common-masters"] && Country["common-masters"].Country &&
  //     Country["common-masters"].Country.map((ob) => {
  //         cmbCountry.push(ob);
  //     });
  // State &&
  //     State["common-masters"] && State["common-masters"].State &&
  //     State["common-masters"].State.map((ob) => {
  //         cmbState.push(ob);
  //     });
  // localbodies &&
  //     localbodies["tenant"] && localbodies["tenant"].tenants &&
  //     localbodies["tenant"].tenants.map((ob) => {
  //         cmbLB.push(ob);
  //     });
  // District &&
  //     District["common-masters"] && District["common-masters"].District &&
  //     District["common-masters"].District.map((ob) => {
  //         cmbDistrict.push(ob);
  //     });
  // Taluk &&
  //     Taluk["common-masters"] && Taluk["common-masters"].Taluk &&
  //     Taluk["common-masters"].Taluk.map((ob) => {
  //         cmbTaluk.push(ob);
  //     });
  // Village &&
  //     Village["common-masters"] && Village["common-masters"].Village &&
  //     Village["common-masters"].Village.map((ob) => {
  //         cmbVillage.push(ob);
  //     });

  //################################### Present Country State ############################################################################################

  const [presentaddressCountry, setaddressCountry] = useState(
    formData?.GroomAddressDetails?.presentaddressCountry?.code ? formData?.GroomAddressDetails?.presentaddressCountry : ""
  );
  const [presentaddressStateName, setaddressStateName] = useState(
    formData?.GroomAddressDetails?.presentaddressStateName?.code ? formData?.GroomAddressDetails?.presentaddressStateName : ""
  );
  let countrycode = "";
  if (formData?.GroomAddressDetails?.presentaddressCountry === "COUNTRY_INDIA") {
    countrycode = "IND";
  } else {
    countrycode = formData?.GroomAddressDetails?.presentaddressCountry;
  }
  const [countryvalue, setCountryValue] = useState(
    formData?.GroomAddressDetails?.presentaddressCountry?.code ? formData?.GroomAddressDetails?.presentaddressCountry.countrycode : "IND"
  );
  const [value, setValue] = useState(
    formData?.GroomAddressDetails?.presentaddressStateName?.code ? formData?.GroomAddressDetails?.presentaddressStateName.code : "kl"
  );

  //################################# Present Inside Kerala #########################################################################################################

  const [presentWardNo, setPresentWardNo] = useState(
    formData.GroomAddressDetails?.presentWardNo?.code ? formData.GroomAddressDetails?.presentWardNo : ""
  );
  const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaDistrict?.code ? formData?.GroomAddressDetails?.presentInsideKeralaDistrict : ""
  );
  const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaLBTypeName ? formData?.GroomAddressDetails?.presentInsideKeralaLBTypeName : null
  );
  const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaLBName?.code ? formData?.GroomAddressDetails?.presentInsideKeralaLBName : ""
  );
  const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaTaluk?.code ? formData?.GroomAddressDetails?.presentInsideKeralaTaluk : ""
  );
  const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaVillage?.code ? formData?.GroomAddressDetails?.presentInsideKeralaVillage : ""
  );
  const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaPostOffice?.code ? formData?.GroomAddressDetails?.presentInsideKeralaPostOffice : ""
  );
  const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(
    formData?.GroomAddressDetails?.presentInsideKeralaPincode ? formData?.GroomAddressDetails?.presentInsideKeralaPincode : null
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

  const [Districtvalues, setDistrictvalue] = useState(null);
  const [TalukDropDownvalues, setLbTalukDropDownvalues] = useState(null);
  const [VillageDropDownvalues, setLbsVillageDropDownvalues] = useState(null);
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
  const [PostOfficeDropDownvalues, setPostOfficeDropDownvalues] = useState(null);
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [DistrictPermvalues, setDistrictPermvalue] = useState(null);
  const [TalukPermDropDownvalues, setLbTalukPermDropDownvalues] = useState(null);
  const [VillagePermDropDownvalues, setLbsVillagePermDropDownvalues] = useState(null);
  const [TalukPermvalues, setLbsTalukPermvalue] = useState(null);
  const [VillagePermvalues, setLbsVillagePermvalue] = useState(null);
  const [PostOfficePermDropDownvalues, setPostOfficePermDropDownvalues] = useState(null);
  const [PostOfficePermvalues, setPostOfficePermvalues] = useState(null);

  //################################# Present Outside Kerala ##########################################################################################################
  const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaDistrict?.code ? formData?.GroomAddressDetails?.presentOutsideKeralaDistrict : ""
  );
  const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaTaluk ? formData?.GroomAddressDetails?.presentOutsideKeralaTaluk : ""
  );
  // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaTaluk?.code ? formData?.AddressBirthDetails?.presentOutsideKeralaTaluk : formData?.GroomAddressDetails?.presentOutsideKeralaTaluk ? "" : "");
  const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn ? formData?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn : ""
  );
  const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaVillage?.code ? formData?.GroomAddressDetails?.presentOutsideKeralaVillage : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
  const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(
    formData?.GroomAddressDetails?.presentOutsideKeralaPincode ? formData?.GroomAddressDetails?.presentOutsideKeralaPincode : null
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
    formData?.GroomAddressDetails?.presentOutSideIndiaadrsVillage?.code ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsVillage : ""
  );
  const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown : ""
  );
  const [presentOutSideIndiaPostCode, setPostCode] = useState(
    formData?.GroomAddressDetails?.presentOutSideIndiaPostCode ? formData?.GroomAddressDetails?.presentOutSideIndiaPostCode : ""
  );

  //const [presentOutSideCountry, setOutSideCountry] = useState(formData?.AddressBirthDetails?.presentOutSideCountry ? formData?.AddressBirthDetails?.presentOutSideCountry : null);

  //############################################### Same As Above ##################################################################################################

  const [isPrsentAddress, setIsPrsentAddress] = useState(
    formData?.GroomAddressDetails?.isPrsentAddress ? formData?.GroomAddressDetails?.isPrsentAddress : false
  );

  //################################################### Country State Permanent ###########################################################################

  const [permtaddressCountry, setpermtaddressCountry] = useState(
    formData?.GroomAddressDetails?.permtaddressCountry?.code ? formData?.GroomAddressDetails?.permtaddressCountry : ""
  );
  const [permtaddressStateName, setpermtaddressStateName] = useState(
    formData?.GroomAddressDetails?.permtaddressStateName?.code ? formData?.GroomAddressDetails?.permtaddressStateName : ""
  );
  let countryPermcode = "";
  if (formData?.ChildDetails?.GroomAddressDetails?.permtaddressCountry === "COUNTRY_INDIA") {
    countryPermcode = "IND";
  } else {
    countryPermcode = formData?.ChildDetails?.GroomAddressDetails?.permtaddressCountry;
  }
  const [countryValuePermanent, setCountryValuePermanent] = useState(
    formData?.GroomAddressDetails?.permtaddressCountry?.code ? formData?.GroomAddressDetails?.permtaddressCountry.countrycode : "IND"
  );
  const [valuePermanent, setValuePermanent] = useState(
    formData?.GroomAddressDetails?.permtaddressStateName?.code ? formData?.GroomAddressDetails?.permtaddressStateName.code : "kl"
  );

  //################################################# Permanent Inside Kerala ##########################################################################################

  const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrDistrict?.code ? formData?.GroomAddressDetails?.permntInKeralaAdrDistrict : ""
  );
  // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName ? formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName : null);
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
  console.log(formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn, "PIKLNE");
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
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
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
    formData?.GroomAddressDetails?.permntOutsideIndiaVillage?.code ? formData?.GroomAddressDetails?.permntOutsideIndiaVillage : ""
  );
  const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(
    formData?.GroomAddressDetails?.permntOutsideIndiaCityTown ? formData?.GroomAddressDetails?.permntOutsideIndiaCityTown : ""
  );
  const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(
    formData?.GroomAddressDetails?.permanentOutsideIndiaPostCode ? formData?.GroomAddressDetails?.permanentOutsideIndiaPostCode : ""
  );

  //const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(formData?.AddressBirthDetails?.permntOutsideIndiaCountry ? formData?.AddressBirthDetails?.permntOutsideIndiaCountry : null);

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

  // Error Constants Permanent
  const [PermanentAddressCountryError, setPermanentAddressCountryError] = useState(false);
  const [PermanentAddressStateNameError, setPermanentAddressStateNameError] = useState(false);
  const [PermanentInsideKeralaDistrictError, setPermanentInsideKeralaDistrictError] = useState(false);
  const [PermanentInsideKeralaTalukError, setPermanentInsideKeralaTalukError] = useState(false);
  const [PermanentInsideKeralaVillageError, setPermanentInsideKeralaVillageError] = useState(false);
  const [PermanentInsideKeralaLBNameError, setPermanentInsideKeralaLBNameError] = useState(false);
  const [PermanentInsideKeralaWardNoError, setPermanentInsideKeralaWardNoError] = useState(false);
  const [PermanentInsideKeralaHouseNameEnError, setPermanentInsideKeralaHouseNameEnError] = useState(false);
  const [PermanentInsideKeralaHouseNameMlError, setPermanentInsideKeralaHouseNameMlError] = useState(false);
  const [PermanentInsideKeralaLocalityNameEnError, setPermanentInsideKeralaLocalityNameEnError] = useState(false);
  const [PermanentInsideKeralaLocalityNameMlError, setPermanentInsideKeralaLocalityNameMlError] = useState(false);
  const [PermanentInsideKeralaStreetNameEnError, setPermanentInsideKeralaStreetNameEnError] = useState(false);
  const [PermanentInsideKeralaStreetNameMlError, setPermanentInsideKeralaStreetNameMlError] = useState(false);

  const [PermanentInsideKeralaPostOfficeError, setPermanentInsideKeralaPostOfficeError] = useState(false);
  const [PermanentInsideKeralaPincodeError, setPermanentInsideKeralaPincodeError] = useState(false);
  const [PermanentCityVillageError, setPermanentCityVillageError] = useState(false);
  const [PermanentOutSideIndiaProvinceEnError, setPermanentOutSideIndiaProvinceEnError] = useState(false);
  const [PermanentOutSideIndiaProvinceMlError, setPermanentOutSideIndiaProvinceMlError] = useState(false);
  const [PermanentOutSideIndiaCityError, setPermanentOutSideIndiaCityError] = useState(false);
  const [PermanentOutSideIndiaPostCodeError, setPermanentOutSideIndiaPostCodeError] = useState(false);
  const [PermanentOutSideIndiaLineOneEnError, setPermanentOutSideIndiaLineOneEnError] = useState(false);
  const [PermanentOutSideIndiaLineOneMlError, setPermanentOutSideIndiaLineOneMlError] = useState(false);
  const [PermanentOutSideIndiaLineTwoEnError, setPermanentOutSideIndiaLineTwoEnError] = useState(false);
  const [PermanentOutSideIndiaLineTwoMlError, setPermanentOutSideIndiaLineTwoMlError] = useState(false);

  console.log({ presentOutSideIndiaadrsCityTown });

  const onSkip = () => onSelect();
  function setSameAsPresent(e) {
    setIsPrsentAddress(e.target.checked);
    if (e.target.checked == true) {
      setpermtaddressCountry(presentaddressCountry);
      setpermtaddressStateName(presentaddressStateName);
      setCountryValuePermanent(countryValuePermanent);
      setValuePermanent(valuePermanent);
      setpermntInKeralaAdrDistrict(presentInsideKeralaDistrict);
      setpermntInKeralaAdrLBName(presentInsideKeralaLBName);
      setpermntInKeralaAdrTaluk(presentInsideKeralaTaluk);
      setpermntInKeralaAdrVillage(presentInsideKeralaVillage);
      setpermntInKeralaAdrPostOffice(presentInsideKeralaPostOffice);
      setpermntInKeralaAdrPincode(presentInsideKeralaPincode);
      setpermntInKeralaAdrHouseNameEn(presentInsideKeralaHouseNameEn);
      setpermntInKeralaAdrHouseNameMl(presentInsideKeralaHouseNameMl);
      setpermntInKeralaAdrLocalityNameEn(presentInsideKeralaLocalityNameEn);
      setpermntInKeralaAdrLocalityNameMl(presentInsideKeralaLocalityNameMl);
      setpermntInKeralaAdrStreetNameEn(presentInsideKeralaStreetNameEn);
      setpermntInKeralaAdrStreetNameMl(presentInsideKeralaStreetNameMl);
      setpermntInKeralaWardNo(presentWardNo);
      setpermntOutsideKeralaDistrict(presentOutsideKeralaDistrict);
      setpermntOutsideKeralaTaluk(presentOutsideKeralaTaluk);
      setpermntOutsideKeralaCityVilgeEn(presentOutsideKeralaCityVilgeEn);
      setpermntOutsideKeralaVillage(presentOutsideKeralaVillage);
      setpermntOutsideKeralaPincode(presentOutsideKeralaPincode);
      setpermntOutsideKeralaHouseNameEn(presentOutsideKeralaHouseNameEn);
      setpermntOutsideKeralaHouseNameMl(presentOutsideKeralaHouseNameMl);
      setpermntOutsideKeralaLocalityNameEn(presentOutsideKeralaLocalityNameEn);
      setpermntOutsideKeralaLocalityNameMl(presentOutsideKeralaLocalityNameMl);
      setpermntOutsideKeralaStreetNameEn(presentOutsideKeralaStreetNameEn);
      setpermntOutsideKeralaStreetNameMl(presentOutsideKeralaStreetNameMl);
      setpermntoutsideKeralaPostOfficeEn(presentOutsideKeralaPostOfficeEn);
      setpermntoutsideKeralaPostOfficeMl(presentOutsideKeralaPostOfficeMl);
      setadrsPermntOutsideIndiaLineoneEn(presentOutSideIndiaAdressEn);
      setadrsPermntOutsideIndiaLineoneMl(presentOutSideIndiaAdressMl);
      setadrsPermntOutsideIndiaLinetwoEn(presentOutSideIndiaAdressEnB);
      setadrsPermntOutsideIndiaLinetwoMl(presentOutSideIndiaAdressMlB);
      setPermntOutsideIndiaprovinceEn(presentOutSideIndiaProvinceEn);
      setPermntOutsideIndiaprovinceMl(presentOutSideIndiaProvinceMl);
      setadrsPermntOutsideIndiaVillage(presentOutSideIndiaadrsVillage);
      setadrsPermntOutsideIndiaCityTown(presentOutSideIndiaadrsCityTown);
      setPermantpostCode(presentOutSideIndiaPostCode);
    } else {
      // setpermtaddressCountry(presentaddressCountry);
      // setpermtaddressStateName(presentaddressStateName);
      // setCountryValuePermanent(countryvalue);
      // setValuePermanent(value);
      setpermntInKeralaAdrDistrict("");
      setpermntInKeralaAdrLBName("");
      setpermntInKeralaAdrTaluk("");
      setpermntInKeralaAdrVillage("");
      setpermntInKeralaAdrPostOffice("");
      setpermntInKeralaAdrPincode("");
      setpermntInKeralaAdrHouseNameEn("");
      setpermntInKeralaAdrHouseNameMl("");
      setpermntInKeralaAdrLocalityNameEn("");
      setpermntInKeralaAdrLocalityNameMl("");
      setpermntInKeralaAdrStreetNameEn("");
      setpermntInKeralaAdrStreetNameMl("");
      setpermntInKeralaWardNo("");
      setpermntOutsideKeralaDistrict("");
      setpermntOutsideKeralaTaluk("");
      setpermntOutsideKeralaCityVilgeEn("");
      setpermntOutsideKeralaVillage("");
      setpermntOutsideKeralaPincode("");
      setpermntOutsideKeralaHouseNameEn("");
      setpermntOutsideKeralaHouseNameMl("");
      setpermntOutsideKeralaLocalityNameEn("");
      setpermntOutsideKeralaLocalityNameMl("");
      setpermntOutsideKeralaStreetNameEn("");
      setpermntOutsideKeralaStreetNameMl("");
      setpermntoutsideKeralaPostOfficeEn("");
      setpermntoutsideKeralaPostOfficeMl("");
      setadrsPermntOutsideIndiaLineoneEn("");
      setadrsPermntOutsideIndiaLineoneMl("");
      setadrsPermntOutsideIndiaLinetwoEn("");
      setadrsPermntOutsideIndiaLinetwoMl("");
      setPermntOutsideIndiaprovinceEn("");
      setPermntOutsideIndiaprovinceMl("");
      setadrsPermntOutsideIndiaVillage("");
      setadrsPermntOutsideIndiaCityTown("");
      setPermantpostCode("");
    }
  }
  let validFlag = true;
  const goNext = () => {
    if (isPrsentAddress === true || isPrsentAddress === false) {
      if (countryvalue === "IND" && value === "kl") {
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
      if (countryvalue === "IND" && value != "kl") {
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
        if (
          presentOutsideKeralaCityVilgeEn === null ||
          presentOutsideKeralaCityVilgeEn.trim() == "" ||
          presentOutsideKeralaCityVilgeEn.trim() == undefined
        ) {
          setoutsideKeralaCityVilgeEn("");
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
        if (
          presentOutsideKeralaPostOfficeEn === null ||
          presentOutsideKeralaPostOfficeEn.trim() == "" ||
          presentOutsideKeralaPostOfficeEn.trim() == undefined
        ) {
          setoutsideKeralaPostOfficeEn("");
          setPresentInsideKeralaPostOfficeError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentInsideKeralaPostOfficeError(false);
        }
        // if (presentOutsideKeralaPostOfficeMl === null || presentOutsideKeralaPostOfficeMl.trim() == '' || presentOutsideKeralaPostOfficeMl.trim() == undefined) {
        //     setoutsideKeralaPostOfficeMl("");
        //     setPresentInsideKeralaPostOfficeError(true);
        //     validFlag = false;
        //     setToast(true);
        //     setTimeout(() => {
        //         setToast(false);
        //     }, 2000);
        // } else {
        //     setPresentInsideKeralaPostOfficeError(false);
        // }
        if (
          presentOutsideKeralaLocalityNameEn === null ||
          presentOutsideKeralaLocalityNameEn.trim() == "" ||
          presentOutsideKeralaLocalityNameEn.trim() == undefined
        ) {
          setoutsideKeralaLocalityNameEn("");
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
          presentOutsideKeralaLocalityNameMl === null ||
          presentOutsideKeralaLocalityNameMl.trim() == "" ||
          presentOutsideKeralaLocalityNameMl.trim() == undefined
        ) {
          setoutsideKeralaLocalityNameMl("");
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
          presentOutsideKeralaHouseNameEn === null ||
          presentOutsideKeralaHouseNameEn.trim() == "" ||
          presentOutsideKeralaHouseNameEn.trim() == undefined
        ) {
          setoutsideKeralaHouseNameEn("");
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
          presentOutsideKeralaHouseNameMl === null ||
          presentOutsideKeralaHouseNameMl.trim() == "" ||
          presentOutsideKeralaHouseNameMl.trim() == undefined
        ) {
          setoutsideKeralaHouseNameMl("");
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
        if (
          presentOutSideIndiaProvinceEn === null ||
          presentOutSideIndiaProvinceEn.trim() == "" ||
          presentOutSideIndiaProvinceEn.trim() == undefined
        ) {
          setProvinceEn("");
          setPresentOutSideIndiaProvinceEnError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentOutSideIndiaProvinceEnError(false);
        }
        if (
          presentOutSideIndiaProvinceMl === null ||
          presentOutSideIndiaProvinceMl.trim() == "" ||
          presentOutSideIndiaProvinceMl.trim() == undefined
        ) {
          setProvinceMl("");
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
        if (presentOutSideIndiaAdressEn === null || presentOutSideIndiaAdressEn.trim() == "" || presentOutSideIndiaAdressEn.trim() == undefined) {
          setAdressEn("");
          setPresentOutSideIndiaLineOneEnError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentOutSideIndiaLineOneEnError(false);
        }
        if (presentOutSideIndiaAdressMl === null || presentOutSideIndiaAdressMl.trim() == "" || presentOutSideIndiaAdressMl.trim() == undefined) {
          setAdressMl("");
          setPresentOutSideIndiaLineOneMlError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentOutSideIndiaLineOneMlError(false);
        }
        if (presentOutSideIndiaAdressEnB === null || presentOutSideIndiaAdressEnB.trim() == "" || presentOutSideIndiaAdressEnB.trim() == undefined) {
          setAdressEnB("");
          setPresentOutSideIndiaLineTwoEnError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setPresentOutSideIndiaLineTwoEnError(false);
        }
        if (presentOutSideIndiaAdressMlB === null || presentOutSideIndiaAdressMlB.trim() == "" || presentOutSideIndiaAdressMlB.trim() == undefined) {
          setAdressMlB("");
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

      //Jetheesh

      if (isPrsentAddress === false) {
        if (countryValuePermanent === "IND" && valuePermanent === "kl") {
          if (permtaddressCountry == null || permtaddressCountry == undefined) {
            setPermanentAddressCountryError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentAddressCountryError(false);
          }
          if (permtaddressStateName == null || permtaddressStateName == undefined) {
            setPermanentAddressStateNameError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentAddressStateNameError(false);
          }
          if (permntInKeralaAdrDistrict == null || permntInKeralaAdrDistrict == undefined) {
            setPermanentInsideKeralaDistrictError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaDistrictError(false);
          }
          if (permntInKeralaAdrTaluk == null || permntInKeralaAdrTaluk == undefined || permntInKeralaAdrTaluk == "") {
            setPermanentInsideKeralaTalukError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaTalukError(false);
          }
          if (permntInKeralaAdrVillage == null || permntInKeralaAdrVillage == undefined || permntInKeralaAdrVillage == "") {
            setPermanentInsideKeralaVillageError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaVillageError(false);
          }
          if (permntInKeralaAdrLBName == null || permntInKeralaAdrLBName == undefined || permntInKeralaAdrLBName == "") {
            setPermanentInsideKeralaLBNameError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaLBNameError(false);
          }
          if (permntInKeralaWardNo == null || permntInKeralaWardNo == undefined || permntInKeralaWardNo == "") {
            setPermanentInsideKeralaWardNoError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaWardNoError(false);
          }
          if (permntInKeralaAdrPostOffice === null || permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "") {
            setPermanentInsideKeralaPostOfficeError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaPostOfficeError(false);
          }
          if (permntInKeralaAdrPincode === null || permntInKeralaAdrPincode === undefined || permntInKeralaAdrPincode === "") {
            setPermanentInsideKeralaPincodeError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaPincodeError(false);
          }
          if (
            permntInKeralaAdrLocalityNameEn.trim() == null ||
            permntInKeralaAdrLocalityNameEn.trim() == "" ||
            permntInKeralaAdrLocalityNameEn.trim() == undefined
          ) {
            validFlag = false;
            setinsideKeralaLocalityNameEn("");
            setPermanentInsideKeralaLocalityNameEnError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaLocalityNameEnError(false);
          }
          if (
            permntInKeralaAdrLocalityNameMl.trim() == null ||
            permntInKeralaAdrLocalityNameMl.trim() == "" ||
            permntInKeralaAdrLocalityNameMl.trim() == undefined
          ) {
            setinsideKeralaLocalityNameMl("");
            setPermanentInsideKeralaLocalityNameMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaLocalityNameMlError(false);
          }
          if (
            permntInKeralaAdrHouseNameEn.trim() == null ||
            permntInKeralaAdrHouseNameEn.trim() == "" ||
            permntInKeralaAdrHouseNameEn.trim() == undefined
          ) {
            setinsideKeralaHouseNameEn("");
            setPermanentInsideKeralaHouseNameEnError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaHouseNameEnError(false);
          }
          if (
            permntInKeralaAdrHouseNameMl.trim() == null ||
            permntInKeralaAdrHouseNameMl.trim() == "" ||
            permntInKeralaAdrHouseNameMl.trim() == undefined
          ) {
            setinsideKeralaHouseNameMl("");
            setPermanentInsideKeralaHouseNameMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaHouseNameMlError(false);
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
            permntInKeralaAdrStreetNameEn === null ||
            permntInKeralaAdrStreetNameEn.trim() == "" ||
            permntInKeralaAdrStreetNameEn.trim() == undefined
          ) {
            setinsideKeralaStreetNameEn("");
          } else if (
            permntInKeralaAdrStreetNameEn != null &&
            (permntInKeralaAdrStreetNameMl.trim() == null ||
              permntInKeralaAdrStreetNameMl.trim() == "" ||
              permntInKeralaAdrStreetNameMl.trim() == undefined)
          ) {
            setPermanentInsideKeralaStreetNameEnError(true);
            setinsideKeralaStreetNameMl("");
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaStreetNameEnError(false);
          }
          if (
            permntInKeralaAdrStreetNameMl === null ||
            permntInKeralaAdrStreetNameMl.trim() == "" ||
            permntInKeralaAdrStreetNameMl.trim() == undefined
          ) {
            setinsideKeralaStreetNameMl("");
          } else if (
            permntInKeralaAdrStreetNameMl != null &&
            (permntInKeralaAdrStreetNameEn.trim() == null ||
              permntInKeralaAdrStreetNameEn.trim() == "" ||
              presentInsideKeralaStreetNameEn.trim() == undefined)
          ) {
            setPermanentInsideKeralaStreetNameMlError(true);
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
        if (countryValuePermanent === "IND" && valuePermanent != "kl") {
          if (permtaddressCountry == null || permtaddressCountry == undefined) {
            setPermanentAddressCountryError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentAddressCountryError(false);
          }
          if (permtaddressStateName == null || permtaddressStateName == undefined) {
            setPermanentAddressStateNameError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentAddressStateNameError(false);
          }
          if (permntOutsideKeralaDistrict == null || permntOutsideKeralaDistrict == undefined) {
            setPermanentInsideKeralaDistrictError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaDistrictError(false);
          }
          if (permntOutsideKeralaTaluk == null || permntOutsideKeralaTaluk == undefined || permntOutsideKeralaTaluk == "") {
            setPermanentInsideKeralaTalukError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaTalukError(false);
          }
          if (permntOutsideKeralaVillage == null || permntOutsideKeralaVillage == undefined) {
            setPermanentInsideKeralaVillageError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaVillageError(false);
          }
          if (
            permntOutsideKeralaCityVilgeEn === null ||
            permntOutsideKeralaCityVilgeEn.trim() == "" ||
            permntOutsideKeralaCityVilgeEn.trim() == undefined
          ) {
            setoutsideKeralaCityVilgeEn("");
            setPermanentCityVillageError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentCityVillageError(false);
          }
          if (permntOutsideKeralaPincode == null || permntOutsideKeralaPincode == undefined || permntOutsideKeralaPincode == "") {
            setPermanentInsideKeralaPincodeError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaPincodeError(false);
          }
          if (
            permntOutsideKeralaPostOfficeEn === null ||
            permntOutsideKeralaPostOfficeEn.trim() == "" ||
            permntOutsideKeralaPostOfficeEn.trim() == undefined
          ) {
            setoutsideKeralaPostOfficeEn("");
            setPermanentInsideKeralaPostOfficeError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaPostOfficeError(false);
          }
          // if (permntOutsideKeralaPostOfficeMl === null || permntOutsideKeralaPostOfficeMl.trim() == '' || permntOutsideKeralaPostOfficeMl.trim() == undefined) {
          //     setoutsideKeralaPostOfficeMl("");
          //     setPermanentInsideKeralaPostOfficeError(true);
          //     validFlag = false;
          //     setToast(true);
          //     setTimeout(() => {
          //         setToast(false);
          //     }, 2000);
          // } else {
          //     setPermanentInsideKeralaPostOfficeError(false);
          // }
          if (
            permntOutsideKeralaLocalityNameEn === null ||
            permntOutsideKeralaLocalityNameEn.trim() == "" ||
            permntOutsideKeralaLocalityNameEn.trim() == undefined
          ) {
            setoutsideKeralaLocalityNameEn("");
            setPermanentInsideKeralaLocalityNameEnError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaLocalityNameEnError(false);
          }
          if (
            permntOutsideKeralaLocalityNameMl === null ||
            permntOutsideKeralaLocalityNameMl.trim() == "" ||
            permntOutsideKeralaLocalityNameMl.trim() == undefined
          ) {
            setoutsideKeralaLocalityNameMl("");
            setPermanentInsideKeralaLocalityNameMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaLocalityNameMlError(false);
          }
          if (
            permntOutsideKeralaHouseNameEn === null ||
            permntOutsideKeralaHouseNameEn.trim() == "" ||
            permntOutsideKeralaHouseNameEn.trim() == undefined
          ) {
            setoutsideKeralaHouseNameEn("");
            setPermanentInsideKeralaHouseNameEnError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaHouseNameEnError(false);
          }
          if (
            permntOutsideKeralaHouseNameMl === null ||
            permntOutsideKeralaHouseNameMl.trim() == "" ||
            permntOutsideKeralaHouseNameMl.trim() == undefined
          ) {
            setoutsideKeralaHouseNameMl("");
            setPermanentInsideKeralaHouseNameMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaHouseNameMlError(false);
          }
        }
        if (countryValuePermanent != "IND") {
          if (permtaddressCountry == null || permtaddressCountry == undefined) {
            setPermanentAddressCountryError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentAddressCountryError(false);
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
          if (
            permntOutsideIndiaprovinceEn === null ||
            permntOutsideIndiaprovinceEn.trim() == "" ||
            permntOutsideIndiaprovinceEn.trim() == undefined
          ) {
            setProvinceEn("");
            setPermanentOutSideIndiaProvinceEnError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaProvinceEnError(false);
          }
          if (
            permntOutsideIndiaprovinceMl === null ||
            permntOutsideIndiaprovinceMl.trim() == "" ||
            permntOutsideIndiaprovinceMl.trim() == undefined
          ) {
            setProvinceMl("");
            setPermanentOutSideIndiaProvinceMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaProvinceMlError(false);
          }
          if (permntOutsideIndiaVillage == null || permntOutsideIndiaVillage == undefined) {
            setPermanentInsideKeralaVillageError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaVillageError(false);
          }
          if (permntOutsideIndiaCityTown == null || permntOutsideIndiaCityTown == undefined || permntOutsideIndiaCityTown == "") {
            setPermanentOutSideIndiaCityError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaCityError(false);
          }
          if (permanentOutsideIndiaPostCode == null || permanentOutsideIndiaPostCode == undefined || permanentOutsideIndiaPostCode == "") {
            setPermanentInsideKeralaPostOfficeError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentInsideKeralaPostOfficeError(false);
          }
          if (permntOutsideIndiaLineoneEn === null || permntOutsideIndiaLineoneEn.trim() == "" || permntOutsideIndiaLineoneEn.trim() == undefined) {
            setAdressEn("");
            setPermanentOutSideIndiaLineOneEnError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaLineOneEnError(false);
          }
          if (permntOutsideIndiaLineoneMl === null || permntOutsideIndiaLineoneMl.trim() == "" || permntOutsideIndiaLineoneMl.trim() == undefined) {
            setAdressMl("");
            setPermanentOutSideIndiaLineOneMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaLineOneMlError(false);
          }
          if (permntOutsideIndiaLinetwoEn === null || permntOutsideIndiaLinetwoEn.trim() == "" || permntOutsideIndiaLinetwoEn.trim() == undefined) {
            setAdressEnB("");
            setPermanentOutSideIndiaLineTwoEnError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaLineTwoEnError(false);
          }
          if (permntOutsideIndiaLinetwoMl === null || permntOutsideIndiaLinetwoMl.trim() == "" || permntOutsideIndiaLinetwoMl.trim() == undefined) {
            setAdressMlB("");
            setPermanentOutSideIndiaLineTwoMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaLineTwoMlError(false);
          }
        }
      }
    }
    if (validFlag === true) {
      onSelect(config.key, {
        presentaddressCountry,
        presentaddressStateName,
        presentInsideKeralaLBName,
        presentInsideKeralaDistrict,
        presentInsideKeralaTaluk,
        presentInsideKeralaVillage,
        presentInsideKeralaLocalityNameEn: presentInsideKeralaLocalityNameEn.trim(),
        presentInsideKeralaStreetNameEn: presentInsideKeralaStreetNameEn.trim(),
        presentInsideKeralaHouseNameEn: presentInsideKeralaHouseNameEn.trim(),
        presentInsideKeralaLocalityNameMl: presentInsideKeralaLocalityNameMl.trim(),
        presentInsideKeralaStreetNameMl: presentInsideKeralaStreetNameMl.trim(),
        presentInsideKeralaHouseNameMl: presentInsideKeralaHouseNameMl.trim(),
        presentInsideKeralaPincode,
        presentInsideKeralaPostOffice,
        presentWardNo,
        presentOutsideKeralaDistrict,
        presentOutsideKeralaTaluk,
        presentOutsideKeralaVillage,
        presentOutsideKeralaCityVilgeEn,
        presentOutsideKeralaPincode,
        presentOutsideKeralaPostOfficeEn: presentOutsideKeralaPostOfficeEn.trim(),
        presentOutsideKeralaPostOfficeMl: presentOutsideKeralaPostOfficeMl.trim(),
        presentOutsideKeralaLocalityNameEn: presentOutsideKeralaLocalityNameEn.trim(),
        presentOutsideKeralaStreetNameEn: presentOutsideKeralaStreetNameEn.trim(),
        presentOutsideKeralaHouseNameEn: presentOutsideKeralaHouseNameEn.trim(),
        presentOutsideKeralaLocalityNameMl: presentOutsideKeralaLocalityNameMl.trim(),
        presentOutsideKeralaStreetNameMl: presentOutsideKeralaStreetNameMl.trim(),
        presentOutsideKeralaHouseNameMl: presentOutsideKeralaHouseNameMl.trim(),
        presentOutSideIndiaProvinceEn: presentOutSideIndiaProvinceEn.trim(),
        presentOutSideIndiaProvinceMl: presentOutSideIndiaProvinceMl.trim(),
        presentOutSideIndiaadrsVillage,
        presentOutSideIndiaadrsCityTown,
        presentOutSideIndiaPostCode,
        presentOutSideIndiaAdressEn: presentOutSideIndiaAdressEn.trim(),
        presentOutSideIndiaAdressEnB: presentOutSideIndiaAdressEnB.trim(),
        presentOutSideIndiaAdressMl: presentOutSideIndiaAdressMl.trim(),
        presentOutSideIndiaAdressMlB: presentOutSideIndiaAdressMlB.trim(),
        isPrsentAddress,

        permtaddressCountry,
        permtaddressStateName,
        permntInKeralaAdrLBName,
        permntInKeralaAdrDistrict,
        permntInKeralaAdrTaluk,
        permntInKeralaAdrVillage,
        permntInKeralaAdrLocalityNameEn: permntInKeralaAdrLocalityNameEn.trim(),
        permntInKeralaAdrStreetNameEn: permntInKeralaAdrStreetNameEn.trim(),
        permntInKeralaAdrHouseNameEn: permntInKeralaAdrHouseNameEn.trim(),
        permntInKeralaAdrLocalityNameMl: permntInKeralaAdrLocalityNameMl.trim(),
        permntInKeralaAdrStreetNameMl: permntInKeralaAdrStreetNameMl.trim(),
        permntInKeralaAdrHouseNameMl: permntInKeralaAdrHouseNameMl.trim(),
        permntInKeralaAdrPincode,
        permntInKeralaAdrPostOffice,
        permntInKeralaWardNo,
        permntOutsideKeralaDistrict,
        permntOutsideKeralaTaluk,
        permntOutsideKeralaVillage,
        permntOutsideKeralaCityVilgeEn: permntOutsideKeralaCityVilgeEn.trim(),
        permntOutsideKeralaPincode,
        permntOutsideKeralaLocalityNameEn: permntOutsideKeralaLocalityNameEn.trim(),
        permntOutsideKeralaStreetNameEn: permntOutsideKeralaStreetNameEn.trim(),
        permntOutsideKeralaHouseNameEn: permntOutsideKeralaHouseNameEn.trim(),
        permntOutsideKeralaLocalityNameMl: permntOutsideKeralaLocalityNameMl.trim(),
        permntOutsideKeralaStreetNameMl: permntOutsideKeralaStreetNameMl.trim(),
        permntOutsideKeralaHouseNameMl: permntOutsideKeralaHouseNameMl.trim(),
        permntOutsideKeralaPostOfficeEn: permntOutsideKeralaPostOfficeEn.trim(),
        permntOutsideKeralaPostOfficeMl: permntOutsideKeralaPostOfficeMl.trim(),
        permntOutsideIndiaLineoneEn: permntOutsideIndiaLineoneEn.trim(),
        permntOutsideIndiaLineoneMl: permntOutsideIndiaLineoneMl.trim(),
        permntOutsideIndiaLinetwoEn: permntOutsideIndiaLinetwoEn.trim(),
        permntOutsideIndiaLinetwoMl: permntOutsideIndiaLinetwoMl.trim(),
        permntOutsideIndiaprovinceEn: permntOutsideIndiaprovinceEn.trim(),
        permntOutsideIndiaprovinceMl: permntOutsideIndiaprovinceMl.trim(),
        permntOutsideIndiaVillage,
        permntOutsideIndiaCityTown,
        permanentOutsideIndiaPostCode,
        // permntOutsideIndiaCountry
      });
    }
  };
  // if (isCountryLoading || isStateLoading || islocalbodiesLoading  || isDistrictLoading  ) {
  //     return <Loader></Loader>;
  // } else
  return (
    <React.Fragment>
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
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
            isEditMarriage={isEditMarriage}
            isEditDeath={isEditDeath}
            isEditStillBirth={isEditStillBirth}
            isEditAdoption={isEditAdoption}
            isEditBirthNAC={isEditBirthNAC}
            formData={formData}
            Districtvalues={Districtvalues}
            setDistrictvalue={setDistrictvalue}
          />
        </div>
        {countryvalue === "IND" && value === "kl" && (
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
              value={value}
              setValue={setValue}
              countryvalue={countryvalue}
              setCountryValue={setCountryValue}
              Districtvalues={Districtvalues}
              setDistrictvalue={setDistrictvalue}
              lbs={lbs}
              setLbs={setLbs}
              TalukDropDownvalues={TalukDropDownvalues}
              setLbTalukDropDownvalues={setLbTalukDropDownvalues}
              VillageDropDownvalues={VillageDropDownvalues}
              setLbsVillageDropDownvalues={setLbsVillageDropDownvalues}
              Talukvalues={Talukvalues}
              setLbsTalukvalue={setLbsTalukvalue}
              Villagevalues={Villagevalues}
              setLbsVillagevalue={setLbsVillagevalue}
              PostOfficeDropDownvalues={PostOfficeDropDownvalues}
              setPostOfficeDropDownvalues={setPostOfficeDropDownvalues} 
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
              isEditMarriage={isEditMarriage}
              isEditDeath={isEditDeath}
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
              isEditBirthNAC={isEditBirthNAC}
              formData={formData}
            />
          </div>
        )}
        {countryvalue === "IND" && value != "kl" && (
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
              setinsideKeralaLBName={setinsideKeralaLBName}
              setinsideKeralaDistrict={setinsideKeralaDistrict}
              isEditMarriage={isEditMarriage}
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
              presentInsideKeralaDistrict={presentInsideKeralaDistrict}
              setinsideKeralaDistrict={setinsideKeralaDistrict}
              setinsideKeralaLBName={setinsideKeralaLBName}
              setaddressStateName={setaddressStateName}
              // permntOutsideIndiaCountry={permntOutsideIndiaCountry}
              // setPermntOutsideIndiaCountry={setPermntOutsideIndiaCountry}
              isEditMarriage={isEditMarriage}
              isEditDeath={isEditDeath}
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
              isEditBirthNAC={isEditBirthNAC}
              formData={formData}
            />
          </div>
        )}
        {/* <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
                            </h1>
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-12" >
                                <div className="col-md-12" >
                                    <CheckBox label={t("CR_SAME_AS_ABOVE")} onChange={setSameAsPresent} value={isPrsentAddress}
                                        checked={isPrsentAddress}
                                    // disable={isDisableEdit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
        <div>
          <GroomAddressSameAsAbove
            isPrsentAddress={isPrsentAddress}
            setIsPrsentAddress={setIsPrsentAddress}
            isEditMarriage={isEditMarriage}
            isEditDeath={isEditDeath}
            isEditStillBirth={isEditStillBirth}
            isEditAdoption={isEditAdoption}
            isEditBirthNAC={isEditBirthNAC}
            formData={formData}

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
            countryValuePermanent={countryValuePermanent}
            setCountryValuePermanent={setCountryValuePermanent}
            valuePermanent={valuePermanent}
            setValuePermanent={setValuePermanent}
            permtaddressCountry={permtaddressCountry}
            setpermtaddressCountry={setpermtaddressCountry}
            permtaddressStateName={permtaddressStateName}
            setpermtaddressStateName={setpermtaddressStateName}
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
              isEditMarriage={isEditMarriage}
              isEditDeath={isEditDeath}
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
              isEditBirthNAC={isEditBirthNAC}
              formData={formData}
            />
          </div>
        )}
        {countryValuePermanent === "IND" && valuePermanent === "kl" && isPrsentAddress === false && (
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
              permlbs={permlbs}
              setPermLbs={setPermLbs}
              Talukvalues={Talukvalues}
              setLbsTalukvalue={setLbsTalukvalue}
              Villagevalues={Villagevalues}
              setLbsVillagevalue={setLbsVillagevalue}
              PostOfficevalues={PostOfficevalues}
              setPostOfficevalues={setPostOfficevalues}
              DistrictPermvalues={DistrictPermvalues}
              setDistrictPermvalue={setDistrictPermvalue}
              TalukPermDropDownvalues={TalukPermDropDownvalues}
              setLbTalukPermDropDownvalues={setLbTalukPermDropDownvalues}
              VillagePermDropDownvalues={VillagePermDropDownvalues}
              setLbsVillagePermDropDownvalues={setLbsVillagePermDropDownvalues}
              TalukPermvalues={TalukPermvalues}
              setLbsTalukPermvalue={setLbsTalukPermvalue}
              VillagePermvalues={VillagePermvalues}
              setLbsVillagePermvalue={setLbsVillagePermvalue}
              PostOfficePermDropDownvalues={PostOfficePermDropDownvalues}
              setPostOfficePermDropDownvalues={setPostOfficePermDropDownvalues}
              PostOfficePermvalues={PostOfficePermvalues}
              setPostOfficePermvalues={setPostOfficePermvalues}
              isEditMarriage={isEditMarriage}
              isEditDeath={isEditDeath}
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
              isEditBirthNAC={isEditBirthNAC}
              formData={formData}
              countryValuePermanent={countryValuePermanent}
              setCountryValuePermanent={setCountryValuePermanent}
              valuePermanent={valuePermanent}
              setValuePermanent={setValuePermanent}
              isPrsentAddress={isPrsentAddress}
              setIsPrsentAddress={setIsPrsentAddress}
            />
          </div>
        )}
        {countryValuePermanent === "IND" && valuePermanent !== "kl" && isPrsentAddress === false && (
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
               setpermntInKeralaAdrDistrict={setpermntInKeralaAdrDistrict}
               setpermntInKeralaAdrLBName={setpermntInKeralaAdrLBName}
               isEditMarriage={isEditMarriage}
               isEditDeath={isEditDeath}
               isEditStillBirth={isEditStillBirth}
               isEditAdoption={isEditAdoption}
               isEditBirthNAC={isEditBirthNAC}
               formData={formData}
               countryValuePermanent={countryValuePermanent}
               setCountryValuePermanent={setCountryValuePermanent}
               valuePermanent={valuePermanent}
               setValuePermanent={setValuePermanent}
               isPrsentAddress={isPrsentAddress}
               setIsPrsentAddress={setIsPrsentAddress}
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
             setpermntInKeralaAdrDistrict={setpermntInKeralaAdrDistrict}
             setpermntInKeralaAdrLBName={setpermntInKeralaAdrLBName}
             setpermtaddressStateName={setpermtaddressStateName}
             // permntOutsideIndiaCountry={permntOutsideIndiaCountry}
             // setPermntOutsideIndiaCountry={setPermntOutsideIndiaCountry}
             countryvalue={countryvalue}
             setCountryValue={setCountryValue}
             isEditMarriage={isEditMarriage}
             isEditDeath={isEditDeath}
             isEditStillBirth={isEditStillBirth}
             isEditAdoption={isEditAdoption}
             isEditBirthNAC={isEditBirthNAC}
             formData={formData}
             countryValuePermanent={countryValuePermanent}
             setCountryValuePermanent={setCountryValuePermanent}
             valuePermanent={valuePermanent}
             setValuePermanent={setValuePermanent}
             isPrsentAddress={isPrsentAddress}
             setIsPrsentAddress={setIsPrsentAddress}
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
              PresentInsideKeralaStreetNameMlError ||
              PermanentAddressCountryError ||
              PermanentAddressStateNameError ||
              PermanentInsideKeralaDistrictError ||
              PermanentInsideKeralaTalukError ||
              PermanentInsideKeralaVillageError ||
              PermanentInsideKeralaLBNameError ||
              PermanentInsideKeralaWardNoError ||
              PermanentInsideKeralaHouseNameEnError ||
              PermanentInsideKeralaHouseNameMlError ||
              PermanentInsideKeralaLocalityNameEnError ||
              PermanentInsideKeralaLocalityNameMlError ||
              PermanentInsideKeralaPostOfficeError ||
              PermanentInsideKeralaPincodeError ||
              PermanentCityVillageError ||
              PermanentOutSideIndiaProvinceEnError ||
              PermanentOutSideIndiaProvinceMlError ||
              PermanentOutSideIndiaCityError ||
              PermanentOutSideIndiaPostCodeError ||
              PermanentOutSideIndiaLineOneEnError ||
              PermanentOutSideIndiaLineOneMlError ||
              PermanentOutSideIndiaLineTwoEnError ||
              PermanentOutSideIndiaLineTwoMlError ||
              PermanentInsideKeralaStreetNameEnError ||
              PermanentInsideKeralaStreetNameMlError
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
              PresentInsideKeralaStreetNameMlError ||
              PermanentAddressCountryError ||
              PermanentAddressStateNameError ||
              PermanentInsideKeralaDistrictError ||
              PermanentInsideKeralaTalukError ||
              PermanentInsideKeralaVillageError ||
              PermanentInsideKeralaLBNameError ||
              PermanentInsideKeralaWardNoError ||
              PermanentInsideKeralaHouseNameEnError ||
              PermanentInsideKeralaHouseNameMlError ||
              PermanentInsideKeralaLocalityNameEnError ||
              PermanentInsideKeralaLocalityNameMlError ||
              PermanentInsideKeralaPostOfficeError ||
              PermanentInsideKeralaPincodeError ||
              PermanentCityVillageError ||
              PermanentOutSideIndiaProvinceEnError ||
              PermanentOutSideIndiaProvinceMlError ||
              PermanentOutSideIndiaCityError ||
              PermanentOutSideIndiaPostCodeError ||
              PermanentOutSideIndiaLineOneEnError ||
              PermanentOutSideIndiaLineOneMlError ||
              PermanentOutSideIndiaLineTwoEnError ||
              PermanentOutSideIndiaLineTwoMlError ||
              PermanentInsideKeralaStreetNameEnError ||
              PermanentInsideKeralaStreetNameMlError
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
                  ? t(`BIRTH_ERROR_ADDRESS_LINE_TWO_EN`)
                  : PresentOutSideIndiaLineTwoMlError
                  ? t(`BIRTH_ERROR_ADDRESS_LINE_TWO_ML`)
                  : PresentInsideKeralaStreetNameEnError
                  ? t(`BIRTH_ERROR_ADDRESS_PRESENT_STREET_EN`)
                  : PresentInsideKeralaStreetNameMlError
                  ? t(`BIRTH_ERROR_ADDRESS_PRESENT_STREET_ML`)
                  : PermanentAddressCountryError
                  ? t(`BIRTH_ERROR_PER_COUNTRY_CHOOSE`)
                  : PermanentAddressStateNameError
                  ? t(`BIRTH_ERROR_PER_STATE_CHOOSE`)
                  : PermanentInsideKeralaDistrictError
                  ? t(`BIRTH_ERROR_PER_DISTRICT_CHOOSE`)
                  : PermanentInsideKeralaTalukError
                  ? t(`BIRTH_ERROR_PER_TALUK_CHOOSE`)
                  : PermanentInsideKeralaVillageError
                  ? t(`BIRTH_ERROR_PER_VILLAGE_CHOOSE`)
                  : PermanentInsideKeralaLBNameError
                  ? t(`BIRTH_ERROR_PER_LBNAME_CHOOSE`)
                  : PermanentInsideKeralaWardNoError
                  ? t(`BIRTH_ERROR_PER_WARD_CHOOSE`)
                  : PermanentInsideKeralaHouseNameEnError
                  ? t(`BIRTH_ERROR_PER_HOUSE_NAME_EN_CHOOSE`)
                  : PermanentInsideKeralaHouseNameMlError
                  ? t(`BIRTH_ERROR_PER_HOUSE_NAME_ML_CHOOSE`)
                  : PermanentInsideKeralaLocalityNameEnError
                  ? t(`BIRTH_ERROR_PER_LOCALITY_EN_CHOOSE`)
                  : PermanentInsideKeralaLocalityNameMlError
                  ? t(`BIRTH_ERROR_PER_LOCALITY_ML_CHOOSE`)
                  : PermanentInsideKeralaPostOfficeError
                  ? t(`BIRTH_ERROR_PER_POSTOFFICE_CHOOSE`)
                  : PermanentInsideKeralaPincodeError
                  ? t(`BIRTH_ERROR_PER_PINCODE_CHOOSE`)
                  : PermanentCityVillageError
                  ? t(`BIRTH_ERROR_PER_CITY_CHOOSE`)
                  : PermanentOutSideIndiaProvinceEnError
                  ? t(`BIRTH_ERROR_PER_STATE_PROVINCE_EN`)
                  : PermanentOutSideIndiaProvinceMlError
                  ? t(`BIRTH_ERROR_PER_STATE_PROVINCE_ML`)
                  : PermanentOutSideIndiaCityError
                  ? t(`BIRTH_ERROR_PER_CITY_TOWN`)
                  : PermanentOutSideIndiaPostCodeError
                  ? t(`BIRTH_ERROR_PER_ZIP_CODE`)
                  : PermanentOutSideIndiaLineOneEnError
                  ? t(`BIRTH_ERROR_PER_ADDRESS_LINE_ONE_EN`)
                  : PermanentOutSideIndiaLineOneMlError
                  ? t(`BIRTH_ERROR_PER_ADDRESS_LINE_ONE_ML`)
                  : PermanentOutSideIndiaLineTwoEnError
                  ? t(`BIRTH_ERROR_PER_ADDRESS_LINE_TWO_EN`)
                  : PermanentOutSideIndiaLineTwoMlError
                  ? t(`BIRTH_ERROR_PER_ADDRESS_LINE_TWO_ML`)
                  : PermanentInsideKeralaStreetNameEnError
                  ? t(`BIRTH_ERROR_PER_ADDRESS_Permanent_STREET_EN`)
                  : PermanentInsideKeralaStreetNameMlError
                  ? t(`BIRTH_ERROR_PER_ADDRESS_Permanent_STREET_ML`)
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
