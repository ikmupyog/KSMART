import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Toast, BackButton, Loader, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import DRTimeline from "../../components/DRTimeline";
import AdoptionTimeline from "../../components/AdoptionTimeline";
import { useTranslation } from "react-i18next";
import AddressPresent from "./AddressPresent";
import AddressPresentInsideKerala from "./AddressPresentInsideKerala";
import AddressPresentOutsideKerala from "./AddressPresentOutsideKerala";
import AddressPresentOutsideIndia from "./AddressPresentOutsideIndia";
import AddressSameAsAbove from "./AddressSameAsAbove";
import AddressPermanent from "./AddressPermanent";
import AddressPermanentInsideKerala from "./AddressPermanentInsideKerala";
import AddressPermanentOutsideKerala from "./AddressPermanentOutsideKerala";
import AddressPermanentOutsideIndia from "./AddressPermanentOutsideIndia";

const AddressBasePage = ({
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
    formData?.AddressBirthDetails?.presentaddressCountry?.code
      ? formData?.AddressBirthDetails?.presentaddressCountry
      : formData?.ChildDetails?.AddressBirthDetails?.presentaddressCountry
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressCountry
      ? ""
      : ""
  );
  const [presentaddressStateName, setaddressStateName] = useState(
    formData?.AddressBirthDetails?.presentaddressStateName?.code
      ? formData?.AddressBirthDetails?.presentaddressStateName
      : formData?.ChildDetails?.AddressBirthDetails?.presentaddressStateName
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressStateName
      ? ""
      : ""
  );
  let countrycode = "";
  if (formData?.ChildDetails?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA") {
    countrycode = "IND";
  } else {
    countrycode = formData?.ChildDetails?.AddressBirthDetails?.presentaddressCountry;
  }
  const [countryvalue, setCountryValue] = useState(
    formData?.AddressBirthDetails?.presentaddressCountry?.code
      ? formData?.AddressBirthDetails?.presentaddressCountry.countrycode
      : formData?.ChildDetails?.AddressBirthDetails?.presentaddressCountry
      ? countrycode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressCountry
      ? countrycode
      : "IND"
  );
  const [value, setValue] = useState(
    formData?.AddressBirthDetails?.presentaddressStateName?.code
      ? formData?.AddressBirthDetails?.presentaddressStateName.code
      : formData?.ChildDetails?.AddressBirthDetails?.presentaddressStateName
      ? formData?.ChildDetails?.AddressBirthDetails?.presentaddressStateName
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressStateName
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentaddressStateName
      : "kl"
  );

  //################################# Present Inside Kerala #########################################################################################################

  const [presentWardNo, setPresentWardNo] = useState(
    formData.AddressBirthDetails?.presentWardNo?.code
      ? formData.AddressBirthDetails?.presentWardNo
      : formData?.ChildDetails?.AddressBirthDetails?.presentWardNo
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentWardNo
      ? ""
      : ""
  );
  const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaDistrict?.code
      ? formData?.AddressBirthDetails?.presentInsideKeralaDistrict
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict
      ? ""
      : ""
  );
  const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaLBTypeName ? formData?.AddressBirthDetails?.presentInsideKeralaLBTypeName : null
  );
  const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaLBName?.code
      ? formData?.AddressBirthDetails?.presentInsideKeralaLBName
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName
      ? ""
      : ""
  );
  const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaTaluk?.code
      ? formData?.AddressBirthDetails?.presentInsideKeralaTaluk
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaTaluk
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaTaluk
      ? ""
      : ""
  );
  const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaVillage?.code
      ? formData?.AddressBirthDetails?.presentInsideKeralaVillage
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaVillage
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaVillage
      ? ""
      : ""
  );
  const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaPostOffice?.code
      ? formData?.AddressBirthDetails?.presentInsideKeralaPostOffice
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice
      ? ""
      : ""
  );
  const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaPincode
      ? formData?.AddressBirthDetails?.presentInsideKeralaPincode
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPincode
      ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPincode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPincode
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPincode
      : null
  );
  const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaHouseNameEn
      ? formData?.AddressBirthDetails?.presentInsideKeralaHouseNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameEn
      : ""
  );
  const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaHouseNameMl
      ? formData?.AddressBirthDetails?.presentInsideKeralaHouseNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaHouseNameMl
      : ""
  );
  const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
      ? formData?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
      : ""
  );
  const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl
      ? formData?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl
      : ""
  );
  const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaStreetNameEn
      ? formData?.AddressBirthDetails?.presentInsideKeralaStreetNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameEn
      : ""
  );
  const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(
    formData?.AddressBirthDetails?.presentInsideKeralaStreetNameMl
      ? formData?.AddressBirthDetails?.presentInsideKeralaStreetNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameMl
      : ""
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
    formData?.AddressBirthDetails?.presentOutsideKeralaDistrict?.code
      ? formData?.AddressBirthDetails?.presentOutsideKeralaDistrict
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaDistrict
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaDistrict
      ? ""
      : ""
  );
  const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaTaluk
      ? formData?.AddressBirthDetails?.presentOutsideKeralaTaluk
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk
      : ""
  );
  // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaTaluk?.code ? formData?.AddressBirthDetails?.presentOutsideKeralaTaluk : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk ? "" : "");
  const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn
      ? formData?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn
      : ""
  );
  const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaVillage?.code
      ? formData?.AddressBirthDetails?.presentOutsideKeralaVillage
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaVillage
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaVillage
      ? ""
      : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
  const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaPincode
      ? formData?.AddressBirthDetails?.presentOutsideKeralaPincode
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaPincode
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaPincode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaPincode
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaPincode
      : null
  );
  const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn
      ? formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn
      : ""
  );
  const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl
      ? formData?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl
      : ""
  );
  const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn
      ? formData?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn
      : ""
  );
  const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl
      ? formData?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl
      : ""
  );
  const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn
      ? formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn
      : ""
  );
  const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl
      ? formData?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl
      : ""
  );
  const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn
      ? formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn
      : ""
  );
  const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(
    formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl
      ? formData?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl
      : ""
  );

  //############################################### Present Out Side India ###########################################################################################################

  const [presentOutSideIndiaAdressEn, setAdressEn] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaAdressEn
      ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEn
      : ""
  );
  const [presentOutSideIndiaAdressMl, setAdressMl] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaAdressMl
      ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMl
      : ""
  );
  const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaAdressEnB
      ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressEnB
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEnB
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEnB
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEnB
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressEnB
      : ""
  );
  const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaAdressMlB
      ? formData?.AddressBirthDetails?.presentOutSideIndiaAdressMlB
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMlB
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMlB
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMlB
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaAdressMlB
      : ""
  );
  const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaProvinceEn
      ? formData?.AddressBirthDetails?.presentOutSideIndiaProvinceEn
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceEn
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceEn
      : ""
  );

  const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaProvinceMl
      ? formData?.AddressBirthDetails?.presentOutSideIndiaProvinceMl
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceMl
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaProvinceMl
      : ""
  );
  const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaadrsVillage?.code
      ? formData?.AddressBirthDetails?.presentOutSideIndiaadrsVillage
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsVillage
      ? ""
      : ""
  );
  const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown
      ? formData?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown
      : ""
  );
  const [presentOutSideIndiaPostCode, setPostCode] = useState(
    formData?.AddressBirthDetails?.presentOutSideIndiaPostCode
      ? formData?.AddressBirthDetails?.presentOutSideIndiaPostCode
      : formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaPostCode
      ? formData?.ChildDetails?.AddressBirthDetails?.presentOutSideIndiaPostCode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaPostCode
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutSideIndiaPostCode
      : ""
  );

  //const [presentOutSideCountry, setOutSideCountry] = useState(formData?.AddressBirthDetails?.presentOutSideCountry ? formData?.AddressBirthDetails?.presentOutSideCountry : null);

  //############################################### Same As Above ##################################################################################################

  const [isPrsentAddress, setIsPrsentAddress] = useState(
    formData?.AddressBirthDetails?.isPrsentAddress
      ? formData?.AddressBirthDetails?.isPrsentAddress
      : formData?.ChildDetails?.AddressBirthDetails?.isPrsentAddress
      ? formData?.ChildDetails?.AddressBirthDetails?.isPrsentAddress
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.isPrsentAddress
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.isPrsentAddress
      : false
  );

  //################################################### Country State Permanent ###########################################################################

  const [permtaddressCountry, setpermtaddressCountry] = useState(
    formData?.AddressBirthDetails?.permtaddressCountry?.code
      ? formData?.AddressBirthDetails?.permtaddressCountry
      : formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressCountry
      ? ""
      : ""
  );
  const [permtaddressStateName, setpermtaddressStateName] = useState(
    formData?.AddressBirthDetails?.permtaddressStateName?.code
      ? formData?.AddressBirthDetails?.permtaddressStateName
      : formData?.ChildDetails?.AddressBirthDetails?.permtaddressStateName
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressStateName
      ? ""
      : ""
  );
  let countryPermcode = "";
  if (formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry === "COUNTRY_INDIA") {
    countryPermcode = "IND";
  } else {
    countryPermcode = formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry;
  }
  const [countryValuePermanent, setCountryValuePermanent] = useState(
    formData?.AddressBirthDetails?.permtaddressCountry?.code
      ? formData?.AddressBirthDetails?.permtaddressCountry.countrycode
      : formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry
      ? countryPermcode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressCountry
      ? countryPermcode
      : "IND"
  );
  const [valuePermanent, setValuePermanent] = useState(
    formData?.AddressBirthDetails?.permtaddressStateName?.code
      ? formData?.AddressBirthDetails?.permtaddressStateName.code
      : formData?.ChildDetails?.AddressBirthDetails?.permtaddressStateName
      ? formData?.ChildDetails?.AddressBirthDetails?.permtaddressStateName
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressStateName
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressStateName
      : "kl"
  );

  //################################################# Permanent Inside Kerala ##########################################################################################

  const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrDistrict?.code
      ? formData?.AddressBirthDetails?.permntInKeralaAdrDistrict
      : formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressCountry
      ? ""
      : ""
  );
  // const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName ? formData?.AddressBirthDetails?.permntInKeralaAdrLBTypeName : null);
  const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrLBName?.code
      ? formData?.AddressBirthDetails?.permntInKeralaAdrLBName
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName
      ? ""
      : ""
  );
  const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrTaluk
      ? formData?.AddressBirthDetails?.permntInKeralaAdrTaluk
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk
      ? ""
      : ""
  );
  const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrVillage
      ? formData?.AddressBirthDetails?.permntInKeralaAdrVillage
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage
      ? ""
      : ""
  );
  const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice
      ? formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice
      ? ""
      : ""
  );
  const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrPincode
      ? formData?.AddressBirthDetails?.permntInKeralaAdrPincode
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPincode
      ? formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPincode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPincode
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPincode
      : ""
  );
  const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn
      ? formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn
      : ""
  );
  const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl
      ? formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl
      : ""
  );
  const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn
      ? formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn
      : ""
  );
  const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl
      ? formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl
      : ""
  );
  const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn
      ? formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn
      : ""
  );
  const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(
    formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl
      ? formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl
      : ""
  );
  const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(
    formData?.AddressBirthDetails?.permntInKeralaWardNo
      ? formData?.AddressBirthDetails?.permntInKeralaWardNo
      : formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaWardNo
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaWardNo
      ? ""
      : ""
  );

  //############################################################################### Permanent Outside Kerala ############################################################################

  const [permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaDistrict?.code
      ? formData?.AddressBirthDetails?.permntOutsideKeralaDistrict
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaDistrict
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaDistrict
      ? ""
      : ""
  );
  const [permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaTaluk
      ? formData?.AddressBirthDetails?.permntOutsideKeralaTaluk
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaTaluk
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaTaluk
      ? ""
      : ""
  );
  const [permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn
      ? formData?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn
      : ""
  );
  const [permntOutsideKeralaVillage, setpermntOutsideKeralaVillage] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaVillage
      ? formData?.AddressBirthDetails?.permntOutsideKeralaVillage
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaVillage
      : ""
  );
  // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressBirthDetails?.presentOutsideKeralaPostOffice);
  const [permntOutsideKeralaPincode, setpermntOutsideKeralaPincode] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaPincode
      ? formData?.AddressBirthDetails?.permntOutsideKeralaPincode
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaPincode
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaPincode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaPincode
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaPincode
      : ""
  );
  const [permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn
      ? formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn
      : ""
  );
  const [permntOutsideKeralaHouseNameMl, setpermntOutsideKeralaHouseNameMl] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl
      ? formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl
      : ""
  );
  const [permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn
      ? formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn
      : ""
  );
  const [permntOutsideKeralaLocalityNameMl, setpermntOutsideKeralaLocalityNameMl] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl
      ? formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl
      : ""
  );
  const [permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn
      ? formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn
      : ""
  );
  const [permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl
      ? formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl
      : ""
  );
  const [permntOutsideKeralaPostOfficeEn, setpermntoutsideKeralaPostOfficeEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn
      ? formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn
      : ""
  );
  const [permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl] = useState(
    formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl
      ? formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl
      : ""
  );

  //######################################################################## Permanent Ouside Country #############################################################################################

  const [permntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaLineoneEn
      ? formData?.AddressBirthDetails?.permntOutsideIndiaLineoneEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneEn
      : ""
  );
  const [permntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaLineoneMl
      ? formData?.AddressBirthDetails?.permntOutsideIndiaLineoneMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLineoneMl
      : ""
  );
  const [permntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn
      ? formData?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn
      : ""
  );
  const [permntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl
      ? formData?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl
      : ""
  );
  const [permntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaprovinceEn
      ? formData?.AddressBirthDetails?.permntOutsideIndiaprovinceEn
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceEn
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceEn
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceEn
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceEn
      : ""
  );
  const [permntOutsideIndiaprovinceMl, setPermntOutsideIndiaprovinceMl] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaprovinceMl
      ? formData?.AddressBirthDetails?.permntOutsideIndiaprovinceMl
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceMl
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceMl
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceMl
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaprovinceMl
      : ""
  );
  const [permntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaVillage?.code
      ? formData?.AddressBirthDetails?.permntOutsideIndiaVillage
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaVillage
      ? ""
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaVillage
      ? ""
      : ""
  );
  const [permntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(
    formData?.AddressBirthDetails?.permntOutsideIndiaCityTown
      ? formData?.AddressBirthDetails?.permntOutsideIndiaCityTown
      : formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaCityTown
      ? formData?.ChildDetails?.AddressBirthDetails?.permntOutsideIndiaCityTown
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaCityTown
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permntOutsideIndiaCityTown
      : ""
  );
  const [permanentOutsideIndiaPostCode, setPermantpostCode] = useState(
    formData?.AddressBirthDetails?.permanentOutsideIndiaPostCode
      ? formData?.AddressBirthDetails?.permanentOutsideIndiaPostCode
      : formData?.ChildDetails?.AddressBirthDetails?.permanentOutsideIndiaPostCode
      ? formData?.ChildDetails?.AddressBirthDetails?.permanentOutsideIndiaPostCode
      : formData?.StillBirthChildDetails?.AddressBirthDetails?.permanentOutsideIndiaPostCode
      ? formData?.StillBirthChildDetails?.AddressBirthDetails?.permanentOutsideIndiaPostCode
      : ""
  );

  //const [permntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(formData?.AddressBirthDetails?.permntOutsideIndiaCountry ? formData?.AddressBirthDetails?.permntOutsideIndiaCountry : null);

  //############################################################# Error Constants #####################################################################################

  const [PresentAddressCountryError, setPresentAddressCountryError] = useState(
    formData?.AddressBirthDetails?.PresentAddressCountryError ? false : false
  );
  const [PresentAddressStateNameError, setPresentAddressStateNameError] = useState(
    formData?.AddressBirthDetails?.PresentAddressStateNameError ? false : false
  );
  const [PresentInsideKeralaDistrictError, setPresentInsideKeralaDistrictError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaDistrictError ? false : false
  );
  const [PresentInsideKeralaTalukError, setPresentInsideKeralaTalukError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaTalukError ? false : false
  );
  const [PresentInsideKeralaVillageError, setPresentInsideKeralaVillageError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaVillageError ? false : false
  );
  const [PresentInsideKeralaLBNameError, setPresentInsideKeralaLBNameError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaLBNameError ? false : false
  );
  const [PresentInsideKeralaWardNoError, setPresentInsideKeralaWardNoError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaWardNoError ? false : false
  );
  const [PresentInsideKeralaHouseNameEnError, setPresentInsideKeralaHouseNameEnError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaHouseNameEnError ? false : false
  );
  const [PresentInsideKeralaHouseNameMlError, setPresentInsideKeralaHouseNameMlError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaHouseNameMlError ? false : false
  );
  const [PresentInsideKeralaLocalityNameEnError, setPresentInsideKeralaLocalityNameEnError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaLocalityNameEnError ? false : false
  );
  const [PresentInsideKeralaLocalityNameMlError, setPresentInsideKeralaLocalityNameMlError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaLocalityNameMlError ? false : false
  );

  const [PresentInsideKeralaStreetNameEnError, setPresentInsideKeralaStreetNameEnError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaStreetNameEnError ? false : false
  );
  const [PresentInsideKeralaStreetNameMlError, setPresentInsideKeralaStreetNameMlError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaStreetNameMlError ? false : false
  );

  const [PresentInsideKeralaPostOfficeError, setPresentInsideKeralaPostOfficeError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaPostOfficeError ? false : false
  );
  const [PresentInsideKeralaPincodeError, setPresentInsideKeralaPincodeError] = useState(
    formData?.AddressBirthDetails?.PresentInsideKeralaPincodeError ? false : false
  );
  const [PresentCityVillageError, setCityVillageError] = useState(formData?.AddressBirthDetails?.PresentCityVillageError ? false : false);
  const [PresentOutSideIndiaProvinceEnError, setPresentOutSideIndiaProvinceEnError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaProvinceEnError ? false : false
  );
  const [PresentOutSideIndiaProvinceMlError, setPresentOutSideIndiaProvinceMlError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaProvinceMlError ? false : false
  );
  const [PresentOutSideIndiaCityError, setPresentOutSideIndiaCityError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaCityError ? false : false
  );
  const [PresentOutSideIndiaPostCodeError, setPresentOutSideIndiaPostCodeError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaPostCodeError ? false : false
  );
  const [PresentOutSideIndiaLineOneEnError, setPresentOutSideIndiaLineOneEnError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaLineOneEnError ? false : false
  );
  const [PresentOutSideIndiaLineOneMlError, setPresentOutSideIndiaLineOneMlError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaLineOneMlError ? false : false
  );
  const [PresentOutSideIndiaLineTwoEnError, setPresentOutSideIndiaLineTwoEnError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaLineTwoEnError ? false : false
  );
  const [PresentOutSideIndiaLineTwoMlError, setPresentOutSideIndiaLineTwoMlError] = useState(
    formData?.AddressBirthDetails?.PresentOutSideIndiaLineTwoMlError ? false : false
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
        if (
          presentOutSideIndiaAdressEnB === null ||
          presentOutSideIndiaAdressEnB.trim() === "" ||
          presentOutSideIndiaAdressEnB.trim() === undefined
        ) {
          setAdressEnB("");
        } else {
          if (
            presentOutSideIndiaAdressEnB != null &&
            (presentOutSideIndiaAdressMlB === null || presentOutSideIndiaAdressMlB.trim() === "" || presentOutSideIndiaAdressMlB.trim() === undefined)
          ) {
            setPresentOutSideIndiaLineTwoEnError(false);
            setPresentOutSideIndiaLineTwoMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPresentOutSideIndiaLineTwoMlError(false);
            setPresentOutSideIndiaLineTwoEnError(false);
          }
        }
        if (
          presentOutSideIndiaAdressMlB === null ||
          presentOutSideIndiaAdressMlB.trim() === "" ||
          presentOutSideIndiaAdressMlB.trim() === undefined
        ) {
          setAdressMlB("");
        } else {
          if (
            presentOutSideIndiaAdressMlB != null &&
            (presentOutSideIndiaAdressEnB === null || presentOutSideIndiaAdressEnB.trim() === "" || presentOutSideIndiaAdressEnB.trim() === undefined)
          ) {
            setPresentOutSideIndiaLineTwoMlError(false);
            setPresentOutSideIndiaLineTwoEnError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPresentOutSideIndiaLineTwoEnError(false);
            setPresentOutSideIndiaLineTwoMlError(false);
          }
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
            setPermntOutsideIndiaprovinceEn("");
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
            setPermntOutsideIndiaprovinceMl("");
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
            setadrsPermntOutsideIndiaLineoneEn("");
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
            setadrsPermntOutsideIndiaLineoneMl("");
            setPermanentOutSideIndiaLineOneMlError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setPermanentOutSideIndiaLineOneMlError(false);
          }
          if (permntOutsideIndiaLinetwoEn === null || permntOutsideIndiaLinetwoEn.trim() === "" || permntOutsideIndiaLinetwoEn.trim() === undefined) {
            setadrsPermntOutsideIndiaLinetwoEn("");
          } else {
            if (
              permntOutsideIndiaLinetwoEn != null &&
              (permntOutsideIndiaLinetwoMl === null || permntOutsideIndiaLinetwoMl.trim() === "" || permntOutsideIndiaLinetwoMl.trim() === undefined)
            ) {
              setPermanentOutSideIndiaLineTwoEnError(false);
              setPermanentOutSideIndiaLineTwoMlError(true);
              validFlag = false;
              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 2000);
            } else {
              setPermanentOutSideIndiaLineTwoMlError(false);
              setPermanentOutSideIndiaLineTwoEnError(false);
            }
          }
          if (permntOutsideIndiaLinetwoMl === null || permntOutsideIndiaLinetwoMl.trim() === "" || permntOutsideIndiaLinetwoMl.trim() === undefined) {
            setadrsPermntOutsideIndiaLinetwoMl("");
          } else {
            if (
              permntOutsideIndiaLinetwoMl != null &&
              (permntOutsideIndiaLinetwoEn === null || permntOutsideIndiaLinetwoEn.trim() === "" || permntOutsideIndiaLinetwoEn.trim() === undefined)
            ) {
              setPresentOutSideIndiaLineTwoMlError(false);
              setPermanentOutSideIndiaLineTwoEnError(true);
              validFlag = false;
              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 2000);
            } else {
              setPermanentOutSideIndiaLineTwoEnError(false);
              setPresentOutSideIndiaLineTwoMlError(false);
            }
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
      {window.location.href.includes("/citizen/cr/cr-birth-creation/address-birth") ? (
        <Timeline currentStep={3} />
      ) : null || window.location.href.includes("employee/cr/cr-flow") ? (
        <Timeline currentStep={3} />
      ) : null}
      {window.location.href.includes("/citizen/cr/cr-adoption/adoption-address-birth") ? (
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
              isEditBirth={isEditBirth}
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
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
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
          <AddressSameAsAbove
            isPrsentAddress={isPrsentAddress}
            setIsPrsentAddress={setIsPrsentAddress}
            isEditBirth={isEditBirth}
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
              isEditStillBirth={isEditStillBirth}
              isEditAdoption={isEditAdoption}
              isEditBirthNAC={isEditBirthNAC}
              formData={formData}
            />
          </div>
        )}
        {countryValuePermanent === "IND" && valuePermanent === "kl" && isPrsentAddress === false && (
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
              isEditBirth={isEditBirth}
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
export default AddressBasePage;
