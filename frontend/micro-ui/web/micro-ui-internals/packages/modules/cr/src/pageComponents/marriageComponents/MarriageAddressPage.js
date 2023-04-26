import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import AddressPermanent from "../marriageComponents/AddressPermanent";
import AddressPermanentInsideKerala from "../marriageComponents/AddressPermanentInsideKerala";
import AddressPermanentOutsideKerala from "../marriageComponents/AddressPermanentOutsideKerala";
import AddressPermanentOutsideIndia from "../marriageComponents/AddressPermanentOutsideIndia";

const MarriageAddressPage = ({ config, onSelect, userType, formData, isEditBirth = false, isEditDeath = false }) => {
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

  const [presentaddressCountry, setaddressCountry] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentaddressCountry
        ? formData?.GroomAddressDetails?.presentaddressCountry
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentaddressCountry
        : formData?.BrideAddressDetails?.presentaddressCountry
      : ""
  );
  const [presentaddressStateName, setaddressStateName] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentaddressStateName
        ? formData?.GroomAddressDetails?.presentaddressStateName
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentaddressStateName
        : formData?.BrideAddressDetails?.presentaddressStateName
      : ""
  );
  const [countryvalue, setCountryValue] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.countryvalue
        ? formData?.GroomAddressDetails?.countryvalue
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.countryvalue
        : formData?.BrideAddressDetails?.countryvalue
      : ""
  );
  const [value, setValue] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentaddressStateName?.code
        ? formData?.GroomAddressDetails?.presentaddressStateName?.code
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentaddressStateName?.code
        : formData?.BrideAddressDetails?.presentaddressStateName?.code
      : ""
  );

  //################################# Present Inside Kerala #########################################################################################################

  const [presentWardNo, setPresentWardNo] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentWardNo?.code
        ? formData?.GroomAddressDetails?.presentWardNo
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentWardNo?.code
        : formData?.BrideAddressDetails?.presentWardNo
      : ""
  );
  console.log(formData, "details marriage");
  const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaDistrict?.code
        ? formData?.GroomAddressDetails?.presentInsideKeralaDistrict
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaDistrict?.code
        : formData?.BrideAddressDetails?.presentInsideKeralaDistrict
      : ""
  );
  const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaLBTypeName
        ? formData?.GroomAddressDetails?.presentInsideKeralaLBTypeName
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaLBTypeName
        : formData?.BrideAddressDetails?.presentInsideKeralaLBTypeName
      : ""
  );
  const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaLBName?.code
        ? formData?.GroomAddressDetails?.presentInsideKeralaLBName
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaLBName?.code
        : formData?.BrideAddressDetails?.presentInsideKeralaLBName
      : ""
  );
  const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaTaluk
        ? formData?.GroomAddressDetails?.presentInsideKeralaTaluk
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaTaluk
        : formData?.BrideAddressDetails?.presentInsideKeralaTaluk
      : ""
  );
  const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaVillage?.code
        ? formData?.GroomAddressDetails?.presentInsideKeralaVillage
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaVillage?.code
        : formData?.BrideAddressDetails?.presentInsideKeralaVillage
      : ""
  );
  const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaPostOffice?.code
        ? formData?.GroomAddressDetails?.presentInsideKeralaPostOffice
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaPostOffice?.code
        : formData?.BrideAddressDetails?.presentInsideKeralaPostOffice
      : ""
  );
  const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaPincode
        ? formData?.GroomAddressDetails?.presentInsideKeralaPincode
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaPincode
        : formData?.BrideAddressDetails?.presentInsideKeralaPincode
      : ""
  );
  const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaHouseNameEn
        ? formData?.GroomAddressDetails?.presentInsideKeralaHouseNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaHouseNameEn
        : formData?.BrideAddressDetails?.presentInsideKeralaHouseNameEn
      : ""
  );
  const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaHouseNameMl
        ? formData?.GroomAddressDetails?.presentInsideKeralaHouseNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaHouseNameMl
        : formData?.BrideAddressDetails?.presentInsideKeralaHouseNameMl
      : ""
  );
  const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn
        ? formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn
        : formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn
      : ""
  );
  const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl
        ? formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl
        : formData?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl
      : ""
  );
  const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaStreetNameEn
        ? formData?.GroomAddressDetails?.presentInsideKeralaStreetNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaStreetNameEn
        : formData?.BrideAddressDetails?.presentInsideKeralaStreetNameEn
      : ""
  );
  const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentInsideKeralaStreetNameMl
        ? formData?.GroomAddressDetails?.presentInsideKeralaStreetNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentInsideKeralaStreetNameMl
        : formData?.BrideAddressDetails?.presentInsideKeralaStreetNameMl
      : ""
  );
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  //################################# Present Outside Kerala ##########################################################################################################
  const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaDistrict?.code
        ? formData?.GroomAddressDetails?.presentOutsideKeralaDistrict
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaDistrict?.code
        : formData?.BrideAddressDetails?.presentOutsideKeralaDistrict
      : ""
  );
  const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaTaluk
        ? formData?.GroomAddressDetails?.presentOutsideKeralaTaluk
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaTaluk
        : formData?.BrideAddressDetails?.presentOutsideKeralaTaluk
      : ""
  );
  // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaTaluk?.code ? formData?.AddressBirthDetails?.presentOutsideKeralaTaluk : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk ? "" : "");
  const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn
        ? formData?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
        : formData?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
      : ""
  );
  const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaVillage?.code
        ? formData?.GroomAddressDetails?.presentOutsideKeralaVillage
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaVillage?.code
        : formData?.BrideAddressDetails?.presentOutsideKeralaVillage
      : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
  const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaPincode
        ? formData?.GroomAddressDetails?.presentOutsideKeralaPincode
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaPincode
        : formData?.BrideAddressDetails?.presentOutsideKeralaPincode
      : ""
  );
  const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn
        ? formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn
        : formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn
      : ""
  );
  const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl
        ? formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl
        : formData?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl
      : ""
  );
  const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn
        ? formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn
        : formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn
      : ""
  );
  const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl
        ? formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl
        : formData?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl
      : ""
  );
  const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn
        ? formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn
        : formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn
      : ""
  );
  const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl
        ? formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl
        : formData?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl
      : ""
  );
  const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn
        ? formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
        : formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
      : ""
  );
  const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl
        ? formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl
        : formData?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl
      : ""
  );

  //############################################### Present Out Side India ###########################################################################################################

  const [presentOutSideIndiaAdressEn, setAdressEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressEn
        ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressEn
        : formData?.BrideAddressDetails?.presentOutSideIndiaAdressEn
      : ""
  );
  const [presentOutSideIndiaAdressMl, setAdressMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressMl
        ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressMl
        : formData?.BrideAddressDetails?.presentOutSideIndiaAdressMl
      : ""
  );
  const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressEnB
        ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressEnB
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressEnB
        : formData?.BrideAddressDetails?.presentOutSideIndiaAdressEnB
      : ""
  );
  const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressMlB
        ? formData?.GroomAddressDetails?.presentOutSideIndiaAdressMlB
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaAdressMlB
        : formData?.BrideAddressDetails?.presentOutSideIndiaAdressMlB
      : ""
  );
  const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaProvinceEn
        ? formData?.GroomAddressDetails?.presentOutSideIndiaProvinceEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaProvinceEn
        : formData?.BrideAddressDetails?.presentOutSideIndiaProvinceEn
      : ""
  );
  const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaProvinceMl
        ? formData?.GroomAddressDetails?.presentOutSideIndiaProvinceMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaProvinceMl
        : formData?.BrideAddressDetails?.presentOutSideIndiaProvinceMl
      : ""
  );
  const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsVillage
        ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsVillage
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaadrsVillage
        : formData?.BrideAddressDetails?.presentOutSideIndiaadrsVillage
      : ""
  );
  const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
        ? formData?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
        : formData?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
      : ""
  );
  const [presentOutSideIndiaPostCode, setPostCode] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideIndiaPostCode
        ? formData?.GroomAddressDetails?.presentOutSideIndiaPostCode
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideIndiaPostCode
        : formData?.BrideAddressDetails?.presentOutSideIndiaPostCode
      : ""
  );
  const [presentOutSideCountry, setOutSideCountry] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentOutSideCountry
        ? formData?.GroomAddressDetails?.presentOutSideCountry
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentOutSideCountry
        : formData?.BrideAddressDetails?.presentOutSideCountry
      : ""
  );

  //############################################### Same As Above ##################################################################################################

  const [isPrsentAddress, setIsPrsentAddress] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.isPrsentAddress
        ? formData?.GroomAddressDetails?.isPrsentAddress
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.isPrsentAddress
        : formData?.BrideAddressDetails?.isPrsentAddress
      : true
  );

  //################################################### Country State Permanent ###########################################################################

  const [permtaddressCountry, setpermtaddressCountry] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permtaddressCountry
        ? formData?.GroomAddressDetails?.permtaddressCountry
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permtaddressCountry
        : formData?.BrideAddressDetails?.permtaddressCountry
      : ""
  );
  const [permtaddressStateName, setpermtaddressStateName] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permtaddressStateName?.code
        ? formData?.GroomAddressDetails?.permtaddressStateName
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permtaddressStateName?.code
        : formData?.BrideAddressDetails?.permtaddressStateName
      : ""
  );
  const [countryValuePermanent, setCountryValuePermanent] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.countryValuePermanent?.code
        ? formData?.GroomAddressDetails?.countryValuePermanent
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.countryValuePermanent?.code
        : formData?.BrideAddressDetails?.countryValuePermanent
      : ""
  );
  const [valuePermanent, setValuePermanent] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.presentaddressStateName?.code
        ? formData?.GroomAddressDetails?.presentaddressStateName
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.presentaddressStateName?.code
        : formData?.BrideAddressDetails?.presentaddressStateName
      : ""
  );

  //################################################# Permanent Inside Kerala ##########################################################################################

  const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrDistrict?.code
        ? formData?.GroomAddressDetails?.permntInKeralaAdrDistrict
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrDistrict?.code
        : formData?.BrideAddressDetails?.permntInKeralaAdrDistrict
      : ""
  );
  // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName ? formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName : null);
  const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrLBName?.code
        ? formData?.GroomAddressDetails?.permntInKeralaAdrLBName
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrLBName?.code
        : formData?.BrideAddressDetails?.permntInKeralaAdrLBName
      : ""
  );
  const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrTaluk
        ? formData?.GroomAddressDetails?.permntInKeralaAdrTaluk
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrTaluk
        : formData?.BrideAddressDetails?.permntInKeralaAdrTaluk
      : ""
  );
  const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrVillage
        ? formData?.GroomAddressDetails?.permntInKeralaAdrVillage
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrVillage
        : formData?.BrideAddressDetails?.permntInKeralaAdrVillage
      : ""
  );
  const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrPostOffice
        ? formData?.GroomAddressDetails?.permntInKeralaAdrPostOffice
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrPostOffice
        : formData?.BrideAddressDetails?.permntInKeralaAdrPostOffice
      : ""
  );
  const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrPincode
        ? formData?.GroomAddressDetails?.permntInKeralaAdrPincode
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrPincode
        : formData?.BrideAddressDetails?.permntInKeralaAdrPincode
      : ""
  );
  const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn
        ? formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn
        : formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn
      : ""
  );
  const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl
        ? formData?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl
        : formData?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl
      : ""
  );
  const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(
    formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
      ? formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
      : formData?.StillBirthChildDetails?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
      ? formData?.StillBirthChildDetails?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
      : ""
  );

  const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl
        ? formData?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl
        : formData?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl
      : ""
  );
  const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn
        ? formData?.GroomAddressDetails?.presentOutSideIndiaPostCode
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn
        : formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn
      : ""
  );
  const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl
        ? formData?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl
        : formData?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl
      : ""
  );
  const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntInKeralaWardNo
        ? formData?.GroomAddressDetails?.permntInKeralaWardNo
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntInKeralaWardNo
        : formData?.BrideAddressDetails?.permntInKeralaWardNo
      : ""
  );

  //############################################################################### Permanent Outside Kerala ############################################################################

  const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaDistrict?.code
        ? formData?.GroomAddressDetails?.permntOutsideKeralaDistrict
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaDistrict?.code
        : formData?.BrideAddressDetails?.permntOutsideKeralaDistrict
      : ""
  );
  const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaTaluk
        ? formData?.GroomAddressDetails?.permntOutsideKeralaTaluk
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaTaluk
        : formData?.BrideAddressDetails?.permntOutsideKeralaTaluk
      : ""
  );
  const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn
        ? formData?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn
        : formData?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn
      : ""
  );
  const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaVillage
        ? formData?.GroomAddressDetails?.permntOutsideKeralaVillage
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaVillage
        : formData?.BrideAddressDetails?.permntOutsideKeralaVillage
      : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
  const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaPincode
        ? formData?.GroomAddressDetails?.permntOutsideKeralaPincode
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaPincode
        : formData?.BrideAddressDetails?.permntOutsideKeralaPincode
      : ""
  );
  const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn
        ? formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn
        : formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn
      : ""
  );
  const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl
        ? formData?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl
        : formData?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl
      : ""
  );
  const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn
        ? formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn
        : formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn
      : ""
  );
  const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl
        ? formData?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl
        : formData?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl
      : ""
  );
  const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn
        ? formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn
        : formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn
      : ""
  );
  const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl
        ? formData?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl
        : formData?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl
      : ""
  );
  const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
        ? formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
        : formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
      : ""
  );
  const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl
        ? formData?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl
        : formData?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl
      : ""
  );

  //######################################################################## Permanent Ouside Country #############################################################################################

  const [permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaLineoneEn
        ? formData?.GroomAddressDetails?.permntOutsideIndiaLineoneEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaLineoneEn
        : formData?.BrideAddressDetails?.permntOutsideIndiaLineoneEn
      : ""
  );
  const [permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaLineoneMl
        ? formData?.GroomAddressDetails?.permntOutsideIndiaLineoneMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaLineoneMl
        : formData?.BrideAddressDetails?.permntOutsideIndiaLineoneMl
      : ""
  );
  const [permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn
        ? formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn
        : formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn
      : ""
  );
  const [permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl
        ? formData?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl
        : formData?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl
      : ""
  );
  const [permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaprovinceEn
        ? formData?.GroomAddressDetails?.permntOutsideIndiaprovinceEn
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaprovinceEn
        : formData?.BrideAddressDetails?.permntOutsideIndiaprovinceEn
      : ""
  );
  const [permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaprovinceMl
        ? formData?.GroomAddressDetails?.permntOutsideIndiaprovinceMl
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaprovinceMl
        : formData?.BrideAddressDetails?.permntOutsideIndiaprovinceMl
      : ""
  );
  const [permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaVillage
        ? formData?.GroomAddressDetails?.permntOutsideIndiaVillage
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaVillage
        : formData?.BrideAddressDetails?.permntOutsideIndiaVillage
      : ""
  );
  const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaCityTown
        ? formData?.GroomAddressDetails?.permntOutsideIndiaCityTown
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaCityTown
        : formData?.BrideAddressDetails?.permntOutsideIndiaCityTown
      : ""
  );
  const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permanentOutsideIndiaPostCode
        ? formData?.GroomAddressDetails?.permanentOutsideIndiaPostCode
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permanentOutsideIndiaPostCode
        : formData?.BrideAddressDetails?.permanentOutsideIndiaPostCode
      : ""
  );
  const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(
    window.location.href.includes("address-groom")
      ? formData?.GroomAddressDetails?.permntOutsideIndiaCountry
        ? formData?.GroomAddressDetails?.permntOutsideIndiaCountry
        : window.location.href.includes("address-bride")
        ? formData?.BrideAddressDetails?.permntOutsideIndiaCountry
        : formData?.BrideAddressDetails?.permntOutsideIndiaCountry
      : ""
  );

  //############################################################# Error Constants #####################################################################################

  const [PresentAddressCountryError, setPresentAddressCountryError] = useState(false);
  const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(false);
  const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(false);
  const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(false);
  const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(false);
  const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(false);
  const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(false);
  const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(false);
  const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(false);
  const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(false);
  const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(false);

  const [PresentInsideKeralaStreetNameEnError, setPresentInsideKeralaStreetNameEnError] = useState(false);
  const [PresentInsideKeralaStreetNameMlError, setPresentInsideKeralaStreetNameMlError] = useState(false);

  const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(false);
  const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(false);
  const [PresentCityVillageError, setCityVillageError] = useState(false);
  const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(false);
  const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(false);
  const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(false);
  const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(false);
  const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(false);
  const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(false);
  const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(false);
  const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(false);

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
        console.log(presentInsideKeralaPostOffice);
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
        console.log(presentInsideKeralaLocalityNameEn);
        if (presentInsideKeralaLocalityNameEn === null) {
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
        console.log(presentInsideKeralaStreetNameEn);
        if (presentInsideKeralaStreetNameEn != null) {
          if (presentInsideKeralaStreetNameMl == null) {
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
          setPresentInsideKeralaStreetNameEnError(false);
        }
        if (presentInsideKeralaStreetNameMl != null) {
          if (presentInsideKeralaStreetNameEn == null) {
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
          setPresentInsideKeralaStreetNameMlError(false);
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
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}> */}
        {/* {isPrsentAddress === false && ( */}
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
        {/* )} */}
        {countryValuePermanent === "IND" && valuePermanent === "KL" && (
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
        {countryValuePermanent === "IND" && valuePermanent !== "KL" && (
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
        {countryValuePermanent != "IND" && (
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
        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default MarriageAddressPage;
