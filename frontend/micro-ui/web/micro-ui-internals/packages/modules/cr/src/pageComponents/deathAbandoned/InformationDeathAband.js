// import React from 'react'

// function InformationDeathAbandonedAband() {
//   return (
//     <div>InformationDeathAbandonedAband</div>
//   )
// }

// export default InformationDeathAbandonedAband
import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Toast,TextArea} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import Hospital from "./Hospital";
import Institution from "./Institution";
import DeathPlaceHome from "./DeathPlaceHome";
import DeathPlaceVehicle from "./DeathPlaceVehicle";
import DeathPublicPlace from "./DeathPublicPlace";
import { useParams } from "react-router-dom";
import PlaceofBurial from "./PlaceofBurial";

const InformationDeathAbandonedAband = ({ config, onSelect, userType, formData, isEditAbandonedDeath ,}) => {
  const [isEditDeathPageComponents, setIsEditDeathPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditAbandonedDeath ? isEditAbandonedDeath : false);
  const stateId = Digit.ULBService.getStateId();
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {

  };

  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "WorkFlowDeath"
  );
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Menu, isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: documentType = {}, isdocmentLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "IdProofDetails");
  const { data: AgeUnitvalue = {}, isAgeUnitLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AgeUnit");
  const { data: Profession = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: State = {}, isStateLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const convertEpochToDate = (dateEpoch) => {
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
  let workFlowData = [];
  let cmbAgeUnit = [];
  let cmbPlace = [];
  let cmbNation = [];
  let cmbReligion = [];
  let cmbOccupationMain = [];
  let menu = [];
  let cmbDocumentType = [];
  let cmbState = [];
  let DeathPlaceTypecode = "";
  let institutionNameCode = "";
  let naturetypecmbvalue = null;
  const maxDate = new Date();
  let workFlowCode = "";
  let Difference_In_DaysRounded = "";
  let cmbfilterNation = [];
  let cmbfilterReligion = [];
  let cmbfilterAgeUnit = [];
  let naturetype = null;
  let cmbfilterNationI = [];
  let cmbFilterState = [];
  let validFlag = true;
  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] &&
    WorkFlowDetails["birth-death-service"].WorkFlowDeath &&
    WorkFlowDetails["birth-death-service"].WorkFlowDeath.map((ob) => {
      workFlowData.push(ob);
    });
  place &&
  place &&
   place["common-masters"] &&
   place["common-masters"].PlaceMasterDeath &&  
   place["common-masters"].PlaceMasterDeath.map((ob) => {  
  if (ob.code !== "OUTSIDE_JURISDICTION") {
   cmbPlace.push(ob);
  }
   });

  AgeUnitvalue &&
    AgeUnitvalue["birth-death-service"] &&
    AgeUnitvalue["birth-death-service"].AgeUnit &&
    AgeUnitvalue["birth-death-service"].AgeUnit.map((ob) => {
      cmbAgeUnit.push(ob);
    });
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  religion &&
    religion["common-masters"] &&
    religion["common-masters"].Religion &&
    religion["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbOccupationMain.push(ob);
    });
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  documentType &&
    documentType["birth-death-service"] &&
    documentType["birth-death-service"].IdProofDetails &&
    documentType["birth-death-service"].IdProofDetails.map((ob) => {
      cmbDocumentType.push(ob);
    });
  State &&
    State["common-masters"] &&
    State["common-masters"].State &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
  const [DateOfDeath, setDateOfDeath] = useState(
    isEditAbandonedDeath &&
      isEditDeathPageComponents === false &&
      (formData?.InformationDeathAband?.IsEditChangeScreen === false || formData?.InformationDeathAband?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeathAband?.DateOfDeath)
      : formData?.InformationDeathAband?.DateOfDeath
  );
  const [FromDate, setFromDate] = useState(
    isEditAbandonedDeath &&
      isEditDeathPageComponents === false &&
      (formData?.InformationDeathAband?.IsEditChangeScreen === false || formData?.InformationDeathAband?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeathAband?.FromDate)
      : formData?.InformationDeathAband?.FromDate
  );
  const handleFromTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const [DeathTimeFrom, setDeathTimeFrom] = useState(
    isEditDeathPageComponents === false &&
      (formData?.InformationDeathAband?.IsEditChangeScreen === false || formData?.InformationDeathAband?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeathAband?.DeathTimeFrom)
      : formData?.InformationDeathAband?.DeathTimeFrom
  );

  const handleToTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const [DeathTimeTo, setDeathTimeTo] = useState(
    isEditDeathPageComponents === false &&
      (formData?.InformationDeathAband?.IsEditChangeScreen === false || formData?.InformationDeathAband?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeathAband?.setDeathTimeTo)
      : formData?.InformationDeathAband?.setDeathTimeTo
  );

  const [ToDate, setToDate] = useState(
    isEditDeathPageComponents === false &&
      (formData?.InformationDeathAband?.IsEditChangeScreen === false || formData?.InformationDeathAband?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeathAband?.ToDate)
      : formData?.InformationDeathAband?.ToDate
  );

  // const [DeathTime, setDeathTime] = useState("");
  const [DeathDateUnavailable, setChecked] = useState(
    formData?.InformationDeathAband?.DeathDateUnavailable
      ? formData?.InformationDeathAband?.DeathDateUnavailable
      : formData?.InformationDeathAband?.DeathDateUnavailable
      ? formData?.InformationDeathAband?.DeathDateUnavailable
      : false
  );
  const [TimeOfDeath, setDeathTime] = useState("");
  const [DeceasedAadharNotAvailable, setDeceasedAadharNotAvailable] = useState(
    formData?.InformationDeathAband?.DeceasedAadharNotAvailable ? formData?.InformationDeathAband?.DeceasedAadharNotAvailable : false
  );
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(
    formData?.InformationDeathAband?.DeceasedAadharNumber ? formData?.InformationDeathAband?.DeceasedAadharNumber : ""
  );
  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);
  const [DeceasedIdproofType, setSelectedDeceasedIdproofType] = useState(
    formData?.InformationDeathAband?.DeceasedIdproofType ? formData?.InformationDeathAband?.DeceasedIdproofType : null
  );
  const [DeceasedIdproofNo, setDeceasedIdproofNo] = useState(
    formData?.InformationDeathAband?.DeceasedIdproofNo ? formData?.InformationDeathAband?.DeceasedIdproofNo : null
  );

  const handleDropdownChange = () => {
    setIsTextboxEnabled(true);
  };
  const [DeceasedFirstNameEn, setDeceasedFirstNameEn] = useState(
    formData?.InformationDeathAband?.DeceasedFirstNameEn ? formData?.InformationDeathAband?.DeceasedFirstNameEn : ""
  );
  const [DeceasedMiddleNameEn, setDeceasedMiddleNameEn] = useState(
    formData?.InformationDeathAband?.DeceasedMiddleNameEn ? formData?.InformationDeathAband?.DeceasedMiddleNameEn : ""
  );
  const [DeceasedLastNameEn, setDeceasedLastNameEn] = useState(
    formData?.InformationDeathAband?.DeceasedLastNameEn ? formData?.InformationDeathAband?.DeceasedLastNameEn : ""
  );
  const [DeceasedFirstNameMl, setDeceasedFirstNameMl] = useState(
    formData?.InformationDeathAband?.DeceasedFirstNameMl ? formData?.InformationDeathAband?.DeceasedFirstNameMl : ""
  );
  const [DeceasedMiddleNameMl, setDeceasedMiddleNameMl] = useState(
    formData?.InformationDeathAband?.DeceasedMiddleNameMl ? formData?.InformationDeathAband?.DeceasedMiddleNameMl : ""
  );
  const [DeceasedLastNameMl, setDeceasedLastNameMl] = useState(
    formData?.InformationDeathAband?.DeceasedLastNameMl ? formData?.InformationDeathAband?.DeceasedLastNameMl : ""
  );
  const [Age, setAge] = useState(formData?.InformationDeathAband?.Age ? formData?.InformationDeathAband?.Age : "");
  const [Nationality, setSelectedNationality] = useState(
    formData?.InformationDeathAband?.Nationality?.code
      ? formData?.InformationDeathAband?.Nationality
      : formData?.InformationDeathAband?.Nationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeathAband?.Nationality)[0]
      : ""
  );
  const [Religion, setSelectedReligion] = useState(
    formData?.InformationDeathAband?.Religion?.code
      ? formData?.InformationDeathAband?.Religion
      : formData?.InformationDeathAband?.Religion
      ? cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.InformationDeathAband?.Religion)[0]
      : ""
  );

  const [CommencementDate, setCommencementDate] = useState(
    formData?.InformationDeathAband?.CommencementDate ? formData?.InformationDeathAband?.CommencementDate : ""
  );
  const [cmbAgeUnitFilter, setcmbAgeUnitFilter] = useState();

  const [AgeUnit, setSelectedAgeUnit] = useState(
    formData?.InformationDeathAband?.AgeUnit?.code
      ? formData?.InformationDeathAband?.AgeUnit
      : formData?.InformationDeathAband?.AgeUnit
      ? cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeathAband?.DeceasedGender)[0]
      : ""
  );

  const [DeceasedGender, setselectedDeceasedGender] = useState(
    formData?.InformationDeathAbandoned?.DeceasedGender?.code
      ? formData?.InformationDeathAbandoned?.DeceasedGender
      : formData?.InformationDeathAbandoned?.DeceasedGender
      ? menu.filter((menu) => menu.code === formData?.InformationDeathAbandoned?.DeceasedGender)[0]
      : ""
  );
  const [Occupation, setSelectedOccupation] = useState(
    formData?.InformationDeathAband?.Occupation?.code
      ? formData?.InformationDeathAband?.Occupation
      : formData?.InformationDeathAband?.Occupation
      ? cmbOccupationMain.filter((cmbOccupationMain) => cmbOccupationMain.code === formData?.InformationDeathAband?.Occupation)[0]
      : ""
  );DeathPlace
  const [DeathPlace, setselectDeathPlace] = useState(
    formData?.InformationDeathAband?.DeathPlace?.code
      ? formData?.InformationDeathAband?.DeathPlace
      : formData?.InformationDeathAband?.DeathPlace
      ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.ChildDetails?.DeathPlace)[0]
      : ""
  );
  const [vehicleType, selectvehicleType] = useState(
    formData?.InformationDeathAband?.vehicleType ? formData?.InformationDeathAband?.vehicleType : null
  );
  const [publicPlaceType, selectpublicPlaceType] = useState(
    formData?.InformationDeathAband?.publicPlaceType ? formData?.InformationDeathAband?.publicPlaceType : null
  );
  // const [DeathPlace, setselectDeathPlace] = useState(cmbPlace?(cmbPlace.filter(cmbPlace=>cmbPlace.code === formData?.InformationDeathAband?.DeathPlace)[0]) :formData?.InformationDeathAbandoned?.DeathPlace) ;
  //Hospital, Intitution, vehicle, Public Place {DeathPlaceType}
  const [hospitalNameEn, selecthospitalNameEn] = useState(
    formData?.InformationDeathAband?.hospitalNameEn?.code
      ? formData?.InformationDeathAband?.hospitalNameEn
      : formData?.InformationDeathAband?.hospitalNameEn
      ? ""
      : ""
  );
  const [institution, selectinstitution] = useState(
    formData?.InformationDeathAband?.institution ? formData?.InformationDeathAband?.institution : null
  );
  const [DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomehoueNameMl ? formData?.InformationDeathAband?.DeathPlaceHomehoueNameMl : null
  );
  const [DeathPlaceType, selectDeathPlaceType] = useState(
    formData?.InformationDeathAband?.DeathPlaceType?.code
      ? formData?.InformationDeathAband?.DeathPlaceType
      : formData?.InformationDeathAband?.DeathPlaceType
      ? ""
      : ""
  );
  const [HospitalNameMl, selectHospitalNameMl] = useState(
    formData?.InformationDeathAband?.HospitalNameMl?.code
      ? formData?.InformationDeathAband?.HospitalNameMl
      : formData?.InformationDeathAband?.HospitalNameMl
      ? ""
      : ""
  );
  const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(
    formData?.InformationDeathAband?.DeathPlaceInstId ? formData?.InformationDeathAband?.DeathPlaceInstId : null
  );
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.InformationDeathAband?.DeathPlaceInstId);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  // Home
  const [DeathPlaceHomePostofficeId, setDeathPlaceHomepostofficeId] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomePostofficeId ? formData?.InformationDeathAband?.DeathPlaceHomePostofficeId : null
  );
  const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomepincode ? formData?.InformationDeathAband?.DeathPlaceHomepincode : null
  );

  const [DeathPlaceHomeHoueNameEn, setDeathPlaceHomehoueNameEn] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomeHoueNameEn ? formData?.InformationDeathAband?.DeathPlaceHomeHoueNameEn : null
  );
  const [DeathPlaceHomeLocalityEn, setDeathPlaceHomelocalityEn] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomeLocalityEn ? formData?.InformationDeathAband?.DeathPlaceHomeLocalityEn : null
  );
  const [DeathPlaceHomeLocalityMl, setDeathPlaceHomelocalityMl] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomeLocalityMl ? formData?.InformationDeathAband?.DeathPlaceHomeLocalityMl : null
  );
  const [DeathPlaceHomeStreetNameEn, setDeathPlaceHomestreetNameEn] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomeStreetNameEn ? formData?.InformationDeathAband?.DeathPlaceHomeStreetNameEn : null
  );
  const [DeathPlaceHomeStreetNameMl, setDeathPlaceHomestreetNameMl] = useState(
    formData?.InformationDeathAband?.DeathPlaceHomeStreetNameMl ? formData?.InformationDeathAband?.DeathPlaceHomeStreetNameMl : null
  );
  // const [DeathPlaceHomeHoueNameMl, setDeathPlaceHomehoueNameMl] = useState(
  //   formData?.InformationDeathAband?.DeathPlaceHomeHoueNameMl ? formData?.InformationDeathAband?.DeathPlaceHomeHoueNameMl : null
  // );
  //Vehicle home OutsideJurisdiction{DeathPlaceWardId} Publicplace OutsideJurisdiction {GeneralRemarks} Publicplace {DeathPlaceWardId}
  //
  const [VehicleNumber, setVehicleNumber] = useState(formData?.InformationDeathAband?.VehicleNumber);
  const [VehicleFromplaceEn, setVehicleFromplaceEn] = useState(formData?.InformationDeathAband?.VehicleFromplaceEn);
  const [VehicleToPlaceEn, setVehicleToPlaceEn] = useState(formData?.InformationDeathAband?.VehicleToPlaceEn);
  const [VehicleFromplaceMl, setVehicleFromplaceMl] = useState(formData?.InformationDeathAband?.VehicleFromplaceMl);
  const [VehicleToPlaceMl, setVehicleToPlaceMl] = useState(formData?.InformationDeathAband?.VehicleToPlaceMl);
  const [GeneralRemarks, setGeneralRemarks] = useState(formData?.InformationDeathAband?.GeneralRemarks);
  const [BurialDescription,setBurialDescription]= useState(formData?.InformationDeathAband?.BurialDescription);
  const [VehicleFirstHaltEn, setVehicleFirstHaltEn] = useState(formData?.InformationDeathAband?.VehicleFirstHaltEn);
  const [VehicleFirstHaltMl, setVehicleFirstHaltMl] = useState(formData?.InformationDeathAband?.VehicleFirstHaltMl);
  const [VehicleHospitalEn, setSelectedVehicleHospitalEn] = useState(formData?.InformationDeathAband?.VehicleHospitalEn);
  const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData?.InformationDeathAband?.DeathPlaceWardId);
  //Public Place

  const [DeathPlaceLocalityEn, setDeathPlaceLocalityEn] = useState(
    formData?.InformationDeathAband?.DeathPlaceLocalityEn ? formData?.InformationDeathAband?.DeathPlaceLocalityEn : ""
  );
  const [DeathPlaceLocalityMl, setDeathPlaceLocalityMl] = useState(
    formData?.InformationDeathAband?.DeathPlaceLocalityMl ? formData?.InformationDeathAband?.DeathPlaceLocalityMl : ""
  );
  const [DeathPlaceStreetEn, setDeathPlaceStreetEn] = useState(
    formData?.InformationDeathAband?.DeathPlaceStreetEn ? formData?.InformationDeathAband?.DeathPlaceStreetEn : ""
  );
  const [DeathPlaceStreetMl, setDeathPlaceStreetMl] = useState(
    formData?.InformationDeathAband?.DeathPlaceStreetMl ? formData?.InformationDeathAband?.DeathPlaceStreetMl : ""
  );

  //DeathOutsideJurisdiction
  const [DeathPlaceCountry, setSelectDeathPlaceCountry] = useState(formData?.InformationDeathAband?.DeathPlaceCountry);
  const [DeathPlaceState, SelectDeathPlaceState] = useState(formData?.InformationDeathAband?.DeathPlaceState);
  const [DeathPlaceDistrict, SelectDeathPlaceDistrict] = useState(formData?.InformationDeathAband?.DeathPlaceDistrict);
  const [DeathPlaceCity, SelectDeathPlaceCity] = useState(formData?.InformationDeathAband?.DeathPlaceCity);
  const [DeathPlaceRemarksEn, SelectDeathPlaceRemarksEn] = useState(formData?.InformationDeathAband?.DeathPlaceRemarksEn);
  const [DeathPlaceRemarksMl, SelectDeathPlaceRemarksMl] = useState(formData?.InformationDeathAband?.DeathPlaceRemarksMl);
  const [PlaceOfBurialEn, SelectPlaceOfBurialEn] = useState(formData?.InformationDeathAband?.PlaceOfBurialEn);
  const [PlaceOfBurialMl, SelectPlaceOfBurialMl] = useState(formData?.InformationDeathAband?.PlaceOfBurialMl);
  const [lbs, setLbs] = useState(0);
  const [toast, setToast] = useState(false);
  const [value, setValue] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderDeathPlace, setIsInitialRenderDeathPlace] = useState(true);


  const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressBirthDetails?.isPrsentAddress ? formData?.AddressBirthDetails?.isPrsentAddress : formData?.ChildDetails?.AddressBirthDetails?.isPrsentAddress ? formData?.ChildDetails?.AddressBirthDetails?.isPrsentAddress : true);
  // 

  

  const [sexError, setsexError] = useState(formData?.InformationDeathAband?.sexError ? false : false);
  // const [DOBError, setDOBError] = useState(formData?.InformationDeathAbandoned?.ChildDOB ? false : false);
  // const [AadharError, setAadharError] = useState(formData?.InformationDeathAbandoned?.DeceasedAadharNumber ? false : false);
  // const [HospitalError, setHospitalError] = useState(formData?.InformationDeathAbandoned?.DeathPlaceType ? false : false);
  // const [InstitutionError, setInstitutionError] = useState(formData?.InformationDeathAbandoned?.DeathPlaceType ? false : false);
  // const [InstitutionNameError, setInstitutionNameError] = useState(formData?.InformationDeathAbandoned?.DeathPlaceInstId ? false : false);
  // const [AgeError, setAgeError] = useState(formData?.InformationDeathAbandoned?.Age ? false : false);
  // const [WardNameError, setWardNameError] = useState(formData?.InformationDeathAbandoned?.DeathPlaceWardId ? false : false);
  const onSkip = () => onSelect();
  useEffect(() => {
    if (isInitialRender) {
      if (Nationality == null || Nationality == "") {
        if (stateId === "kl" && cmbNation.length > 0) {
          cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
          setSelectedNationality(cmbfilterNation[0]);
        }
      }
      if (Religion == null || Religion == "") {
        if (stateId === "kl" && cmbReligion.length > 0) {
          cmbfilterReligion = cmbReligion.filter((cmbReligion) => cmbReligion.name.includes("No Religion"));
          setSelectedReligion(cmbfilterReligion[0]);
        }
      }
      if (DeathPlaceCountry == null || DeathPlaceCountry == "") {
        if (stateId === "kl" && cmbNation.length > 0) {
          cmbfilterNationI = cmbNation.filter((cmbNation) => cmbNation.name.includes("India"));
          setSelectDeathPlaceCountry(cmbfilterNationI[0]);
        }
      }
      if (DeathPlaceState == null || DeathPlaceState == "") {
        if (stateId === "kl" && cmbState.length > 0) {
          cmbFilterState = cmbState.filter((cmbState) => cmbState.name != "Kerala");
          SelectDeathPlaceState(cmbFilterState);
        }
      }
    }
  }, [Nation, isInitialRender]);

  const [DeceasedDescription, setDeceasedDescription] = useState(formData?.InformationDeathAband?.DeceasedDescription);


  function setSelectDeceasedDescription(e) {
    if (e.target.value.length === 102) {
      return false;
    } else {
      setDeceasedDescription(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  // cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
  // setAdrsStateName(cmbFilterState[0]);

  // if (isInitialRender) {
  //   if (formData?.InformationDeathAbandoned?.ischeckedAdhar  != null) {
  //     setIsInitialRender(false);
  //     setisCheckedAdhar(formData?.InformationDeathAbandoned?.ischeckedAdhar );
  //   }
  // }
  React.useEffect(() => {
    if (isInitialRenderDeathPlace) {
      if (DeathPlace) {
        setIsInitialRender(false);
        naturetype = DeathPlace.code;
        setValue(naturetype);
        if (naturetype === "HOSPITAL") {
          <Hospital DeathPlaceType={DeathPlaceType} HospitalNameMl={HospitalNameMl} />;
        }
        if (naturetype === "INSTITUTION") {
          <Institution
            DeathPlaceType={DeathPlaceType}
            DeathPlaceInstId={DeathPlaceInstId}
            InstitutionIdMl={InstitutionIdMl}
            InstitutionFilterList={InstitutionFilterList}
            isInitialRenderInstitutionList={isInitialRenderInstitutionList}
          />;
        }
        if (naturetype === "HOME") {
          <DeathPlaceHome
            DeathPlaceWardId={DeathPlaceWardId}
            DeathPlaceType={DeathPlaceType}
            DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
            DeathPlaceHomepincode={DeathPlaceHomepincode}
            DeathPlaceHomeHoueNameEn={DeathPlaceHomeHoueNameEn}
            DeathPlaceHomehoueNameMl={DeathPlaceHomehoueNameMl}
            DeathPlaceHomeLocalityEn={DeathPlaceHomeLocalityEn}
            DeathPlaceHomeLocalityMl={DeathPlaceHomeLocalityMl}
            DeathPlaceHomeStreetNameEn={DeathPlaceHomeStreetNameEn}
            DeathPlaceHomeStreetNameMl={DeathPlaceHomeStreetNameMl}
            PostOfficevalues={PostOfficevalues}
          />;
        }
        if (naturetype === "VEHICLE") {
          <DeathPlaceVehicle
            DeathPlaceType={DeathPlaceType}
            VehicleNumber={VehicleNumber}
            VehicleFromplaceEn={VehicleFromplaceEn}
            VehicleToPlaceEn={VehicleToPlaceEn}
            GeneralRemarks={GeneralRemarks}
            VehicleFirstHaltEn={VehicleFirstHaltEn}
            VehicleFirstHaltMl={VehicleFirstHaltMl}
            VehicleHospitalEn={VehicleHospitalEn}
            DeathPlaceWardId={DeathPlaceWardId}
            VehicleFromplaceMl={VehicleFromplaceMl}
            VehicleToPlaceMl={VehicleToPlaceMl}
          />;
        }
        if (naturetype === "PUBLIC_PLACES") {
          <DeathPublicPlace
            DeathPlaceType={DeathPlaceType}
            DeathPlaceLocalityEn={DeathPlaceLocalityEn}
            DeathPlaceLocalityMl={DeathPlaceLocalityMl}
            DeathPlaceStreetEn={DeathPlaceStreetEn}
            DeathPlaceStreetMl={DeathPlaceStreetMl}
            DeathPlaceWardId={DeathPlaceWardId}
            GeneralRemarks={GeneralRemarks}
          />;
        }
        // if (naturetype === "OUTSIDE_JURISDICTION") {
        //   <DeathOutsideJurisdiction
        //     DeathPlaceCountry={DeathPlaceCountry}
        //     DeathPlaceState={DeathPlaceState}
        //     DeathPlaceDistrict={DeathPlaceDistrict}
        //     DeathPlaceCity={DeathPlaceCity}
        //     DeathPlaceRemarksEn={DeathPlaceRemarksEn}
        //     DeathPlaceRemarksMl={DeathPlaceRemarksMl}
        //     PlaceOfBurialMl={PlaceOfBurialMl}
        //     PlaceOfBurialEn={PlaceOfBurialEn}
        //     GeneralRemarks={GeneralRemarks}
        //     DeathPlaceWardId={DeathPlaceWardId}
        //   />;
        // }
      }
    }
  }, [isInitialRenderDeathPlace]);
  function setCheckedDate(e) {
    if (e.target.checked === true) {
      setChecked(e.target.checked);
      setFromDate("");
      setToDate("");
    } else {
      setChecked(e.target.checked);
      setDateOfDeath("");
      setDeathTime("");
    }
  }
  // function setChecked(e) {
  //   if (e.target.checked === true) {
  //     checked(e.target.checked);
  //     setFromDate("");
  //     setToDate("");
  //   } else {
  //     setDateOfDeath("");
  //   }
  // }
  function selectFromDate(value) {
    setFromDate(value);
    const today = new Date();
    const deathDate = new Date(value);
    if (deathDate.getTime() <= today.getTime()) {
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_DaysRounded = Math.floor(Difference_In_Days);
    }
    // else {
    //   setFromDate(null);
    //   setDOBError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 3000);
    // }
  }
  function selectToDate(value) {
    setToDate(value);
    const today = new Date();
    const toDate = new Date(value);
    const fromDate = new Date(FromDate);

    if (toDate.getTime() <= today.getTime()) {
      if (fromDate && toDate.getTime() < fromDate.getTime()) {
        setToDate(null);
        // setDOBError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      } else {
        let Difference_In_Time = today.getTime() - toDate.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      }
    }
   
  }

 
  function selectDeathDate(value) {
    // setDeathDate(value);
    setDateOfDeath(value);
    const today = new Date();
    const deathDate = new Date(value);
    if (deathDate.getTime() <= today.getTime()) {
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_DaysRounded = Math.floor(Difference_In_Days);
    }
   
  }
  function selectReligion(value) {
    setSelectedReligion(value);
  }
  function selectNationality(value) {
    setSelectedNationality(value);
  }
  function selectDeceasedGender(value) {
    // console.log("gender" + value);
    setselectedDeceasedGender(value);
  }
  function setSelectDeceasedLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedLastNameMl("");
    } else {
      setDeceasedLastNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedMiddleNameMl("");
    } else {
      setDeceasedMiddleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedFirstNameMl("");
    } else {
      setDeceasedFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setDeceasedFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setDeceasedMiddleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setDeceasedLastNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectAge(e) {
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value <= 120) {
        setAge(e.target.value);
      }
    }
    if (e.target.value <= 11) {
      setcmbAgeUnitFilter(cmbAgeUnit);
    } else if (e.target.value > 11 && e.target.value <= 23) {
      setcmbAgeUnitFilter(
        cmbAgeUnit.filter(
          (cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS" || cmbAgeUnit.code === "AGE_UNIT_DAYS" || cmbAgeUnit.code === "AGE_UNIT_HOURS"
        )
      );
    } else if (e.target.value > 23 && e.target.value <= 29) {
      setcmbAgeUnitFilter(cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS" || cmbAgeUnit.code === "AGE_UNIT_DAYS"));
    } else if (e.target.value > 29 && e.target.value <= 120) {
      setcmbAgeUnitFilter(cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS"));
    }
  }
 
  function setSelectDeceasedAadharNumber(e) {
    if (e.target.value.trim().length >= 0) {
      setDeceasedAadharNumber(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function setSelectDeceasedIdproofNo(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9 ]*$") != null) {
      setDeceasedIdproofNo(e.target.value.length <= 16 ? e.target.value : e.target.value.substring(0, 16));
    }
  }
  function selectOccupation(value) {
    setSelectedOccupation(value);
  }
  
  function selectDeathPlace(value) {
    setselectDeathPlace(value);
    setValue(value.code);

    let currentWorkFlow = workFlowData.filter(
      (workFlowData) =>
        workFlowData.DeathPlace === value.code &&
        workFlowData.startdateperiod <= Difference_In_DaysRounded &&
        workFlowData.enddateperiod >= Difference_In_DaysRounded
    );
    workFlowCode = currentWorkFlow[0].WorkflowCode;
    if (value.code === "HOSPITAL") {
      //Institution
      setSelectedDeathPlaceInstId(null);
      setInstitutionIdMl(null);
      setInstitutionFilterList(null);
      // setIsInitialRenderInstitutionList
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setDeathPlaceWardId(null);
      setPostOfficevalues(null);
      //Vehicle
      setVehicleNumber(null);
      setVehicleFromplaceEn(null);
      setVehicleToPlaceEn(null);
      setGeneralRemarks(null);
      setVehicleFirstHaltEn(null);
      setVehicleFirstHaltMl(null);
      setSelectedVehicleHospitalEn(null);
      setVehicleFromplaceMl(null);
      setVehicleToPlaceMl(null);
      //PublicPlace
      setDeathPlaceLocalityEn(null);
      setDeathPlaceLocalityMl(null);
      setDeathPlaceStreetEn(null);
      setDeathPlaceStreetMl(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
    } else if (value.code === "INSTITUTION") {
      //Hospital
      selecthospitalNameEn(null);
      selectHospitalNameMl(null);
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setDeathPlaceWardId(null);
      setPostOfficevalues(null);
      //Vehicle
      selectDeathPlaceType(null);
      setVehicleNumber(null);
      setVehicleFromplaceEn(null);
      setVehicleToPlaceEn(null);
      setGeneralRemarks(null);
      setVehicleFirstHaltEn(null);
      setVehicleFirstHaltMl(null);
      setSelectedVehicleHospitalEn(null);
      setVehicleFromplaceMl(null);
      setVehicleToPlaceMl(null);
      //PublicPlace
      setDeathPlaceLocalityEn(null);
      setDeathPlaceLocalityMl(null);
      setDeathPlaceStreetEn(null);
      setDeathPlaceStreetMl(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
    } else if (value.code === "VEHICLE") {
      //Hospital
      // selectDeathPlaceType(null);
      selecthospitalNameEn(null);
      selectHospitalNameMl(null);
      //Institution
      selectDeathPlaceType(null);
      setSelectedDeathPlaceInstId(null);
      setInstitutionIdMl(null);
      setInstitutionFilterList(null);
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setDeathPlaceWardId(null);
      setPostOfficevalues(null);
      //PublicPlace
      setDeathPlaceLocalityEn(null);
      setDeathPlaceLocalityMl(null);
      setDeathPlaceStreetEn(null);
      setDeathPlaceStreetMl(null);
      setGeneralRemarks(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
    }
    if (value.code === "PUBLIC_PLACES") {
      //Hospital
      selectDeathPlaceType(null);
      selecthospitalNameEn(null);
      selectHospitalNameMl(null);
      //Institution
      setSelectedDeathPlaceInstId(null);
      setInstitutionIdMl(null);
      setInstitutionFilterList(null);
      // setIsInitialRenderInstitutionList
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setPostOfficevalues(null);
      //Vehicle
      setVehicleNumber(null);
      setVehicleFromplaceEn(null);
      setVehicleToPlaceEn(null);
      setVehicleFirstHaltEn(null);
      setVehicleFirstHaltMl(null);
      setSelectedVehicleHospitalEn(null);
      setVehicleFromplaceMl(null);
      setVehicleToPlaceMl(null);
      setDeathPlaceWardId(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
      setGeneralRemarks(null);
    }
   
  }
  function selectAgeUnit(value) {
    setSelectedAgeUnit(value);
  }
  function selectDeceasedIdproofType(value) {
    setSelectedDeceasedIdproofType(value);
    setIsTextboxEnabled(true);
  }
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      console.log(value);
      let hour = value;
      let period = hour > 12 ? "PM" : "AM";
      console.log(period);
      setDeathTime(value);
    }
  };

  function setCheckedAdhar(e) {
    if (e.target.checked === true) {
      setDeceasedAadharNotAvailable(e.target.checked);
      setSelectedDeceasedIdproofType("");
      setDeceasedIdproofNo("");
    } else {
      // setDeceasedAadharNotAvailable(e.target.checked);
      setDeceasedAadharNotAvailable(e.target.checked);
      setDeceasedAadharNumber("");
      // setAadharError(false);
      setToast(false);
    }
  }



  // 
  
  const [presentWardNo, setPresentWardNo] = useState(formData.InformationDeathAband?.presentWardNo?.code ? formData.InformationDeathAband?.presentWardNo.code : formData?.ChildDetails?.InformationDeathAband?.presentWardNo ? "" : "");
  const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(formData?.InformationDeathAband?.presentInsideKeralaDistrict?.code ? formData?.InformationDeathAband?.presentInsideKeralaDistrict.code : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaDistrict ? "" : "");
  const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(formData?.InformationDeathAband?.presentInsideKeralaLBTypeName ? formData?.InformationDeathAband?.presentInsideKeralaLBTypeName.code : null);
  const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(formData?.InformationDeathAband?.presentInsideKeralaLBName?.code ? formData?.InformationDeathAband?.presentInsideKeralaLBName.code : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaLBName ? "" : "");
  const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(formData?.InformationDeathAband?.presentInsideKeralaTaluk?.code ? formData?.InformationDeathAband?.presentInsideKeralaTaluk : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaTaluk ? "" : "");
  const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(formData?.InformationDeathAband?.presentInsideKeralaVillage?.code ? formData?.InformationDeathAband?.presentInsideKeralaVillage : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaVillage ? "" : "");
  const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(formData?.InformationDeathAband?.presentInsideKeralaPostOffice?.code ? formData?.InformationDeathAband?.presentInsideKeralaPostOffice : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaPostOffice ? "" : "");
  const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(formData?.InformationDeathAband?.presentInsideKeralaPincode ? formData?.InformationDeathAband?.presentInsideKeralaPincode : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaPincode ? formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaPincode : "");
  const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(formData?.InformationDeathAband?.presentInsideKeralaHouseNameEn ? formData?.InformationDeathAband?.presentInsideKeralaHouseNameEn : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaHouseNameEn ? formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaHouseNameEn : "");
  const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(formData?.InformationDeathAband?.presentInsideKeralaHouseNameMl ? formData?.InformationDeathAband?.presentInsideKeralaHouseNameMl : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaHouseNameMl ? formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaHouseNameMl : "");
  const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(formData?.InformationDeathAband?.presentInsideKeralaLocalityNameEn ? formData?.InformationDeathAband?.presentInsideKeralaLocalityNameEn : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaLocalityNameEn ? formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaLocalityNameEn : "");
  const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(formData?.InformationDeathAband?.presentInsideKeralaLocalityNameMl ? formData?.InformationDeathAband?.presentInsideKeralaLocalityNameMl : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaLocalityNameMl ? formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaLocalityNameMl : "");
  const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(formData?.InformationDeathAband?.presentInsideKeralaStreetNameEn ? formData?.InformationDeathAband?.presentInsideKeralaStreetNameEn : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaStreetNameEn ? formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaStreetNameEn : "");
  const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(formData?.InformationDeathAband?.presentInsideKeralaStreetNameMl ? formData?.InformationDeathAband?.presentInsideKeralaStreetNameMl : formData?.ChildDetails?.InformationDeathAband?.presentInsideKeralaStreetNameMl ? formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaStreetNameMl : "");
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
 
  const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?.InformationDeathAband?.permntInKeralaAdrDistrict?.code ? formData?.InformationDeathAband?.permntInKeralaAdrDistrict : formData?.ChildDetails?.InformationDeathAband?.permtaddressCountry ? "" : "");
  const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.InformationDeathAband?.permntInKeralaAdrLBTypeName ? formData?.InformationDeathAband?.permntInKeralaAdrLBTypeName : null);
  const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?.InformationDeathAband?.permntInKeralaAdrLBName?.code ? formData?.InformationDeathAband?.permntInKeralaAdrLBName : formData?.ChildDetails?.InformationDeathAband?.permntInKeralaAdrLBName ? "" : "");
  const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?.InformationDeathAband?.permntInKeralaAdrTaluk ? formData?.InformationDeathAband?.permntInKeralaAdrTaluk : formData?.ChildDetails?.InformationDeathAband?.permntInKeralaAdrTaluk ? "" : "");
  const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?.InformationDeathAband?.permntInKeralaAdrVillage ? formData?.InformationDeathAband?.permntInKeralaAdrVillage : formData?.ChildDetails?.InformationDeathAband?.permntInKeralaAdrVillage ? "" : "");
  const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?.InformationDeathAband?.permntInKeralaAdrPostOffice ? formData?.InformationDeathAband?.permntInKeralaAdrPostOffice : formData?.ChildDetails?.InformationDeathAband?.permntInKeralaAdrPostOffice ? "" : "");
  const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?.InformationDeathAband?.permntInKeralaAdrPincode ? formData?.InformationDeathAband?.permntInKeralaAdrPincode : "");
  const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?.InformationDeathAband?.permntInKeralaAdrHouseNameEn ? formData?.InformationDeathAband?.permntInKeralaAdrHouseNameEn : "");
  const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?.InformationDeathAband?.permntInKeralaAdrHouseNameMl ? formData?.InformationDeathAband?.permntInKeralaAdrHouseNameMl : "");
  const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(formData?.InformationDeathAband?.permntInKeralaAdrLocalityNameEn ? formData?.InformationDeathAband?.permntInKeralaAdrLocalityNameEn : "");
  const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(formData?.InformationDeathAband?.permntInKeralaAdrLocalityNameMl ? formData?.InformationDeathAband?.permntInKeralaAdrLocalityNameMl : "");
  const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(formData?.InformationDeathAband?.permntInKeralaAdrStreetNameEn ? formData?.InformationDeathAband?.permntInKeralaAdrStreetNameEn : "");
  const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(formData?.InformationDeathAband?.permntInKeralaAdrStreetNameMl ? formData?.InformationDeathAband?.permntInKeralaAdrStreetNameMl : "");
  const [permntInKeralaWardNo, setpermntInKeralaWardNo] = useState(formData?.InformationDeathAband?.permntInKeralaWardNo ? formData?.InformationDeathAband?.permntInKeralaWardNo : formData?.ChildDetails?.InformationDeathAband?.permntInKeralaWardNo ? "" : "");


  const goNext = () => {
    // if (Difference_In_DaysRounded <= 21) {
    //   if (DeathPlace.code == "HOSPITAL") {
    //     workFlowCode = "DEATHHOSP";
    //     console.log(workFlowCode);
    //   } else {
    //     workFlowCode = "21DEATHHHOME";
    //   }
    // }
 if (DeceasedGender == null || DeceasedGender == "" || DeceasedGender == undefined) {
      validFlag = false;
      setsexError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setsexError(false);
    }


    
    if (validFlag == true) {
      // sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      // sessionStorage.setItem("DeathDateUnavailable", DeathDateUnavailable ? DeathDateUnavailable : false);
      // sessionStorage.setItem("ToDate", ToDate ? ToDate : null);
      // sessionStorage.setItem("FromDate", FromDate ? FromDate : null);
      // sessionStorage.setItem("DeathTimeFrom", DeathTimeFrom ? DeathTimeFrom : null);
      // sessionStorage.setItem("DeathTimeTo", DeathTimeTo ? DeathTimeTo : null);

      // sessionStorage.setItem("DateOfDeath", DateOfDeath ? DateOfDeath : null);
      // sessionStorage.setItem("TimeOfDeath", TimeOfDeath ? TimeOfDeath : null);
      // sessionStorage.setItem("DeceasedFirstNameEn", DeceasedFirstNameEn ? DeceasedFirstNameEn : null);
      // sessionStorage.setItem("DeceasedMiddleNameEn", DeceasedMiddleNameEn ? DeceasedMiddleNameEn : null);
      // sessionStorage.setItem("DeceasedLastNameEn", DeceasedLastNameEn ? DeceasedLastNameEn : null);
      // sessionStorage.setItem("DeceasedFirstNameMl", DeceasedFirstNameMl ? DeceasedFirstNameMl : null);
      // sessionStorage.setItem("DeceasedMiddleNameMl", DeceasedMiddleNameMl ? DeceasedMiddleNameMl : null);
      // sessionStorage.setItem("DeceasedLastNameMl", DeceasedLastNameMl ? DeceasedLastNameMl : null);
      // sessionStorage.setItem("Age", Age ? Age : null);
      // sessionStorage.setItem("Nationality", Nationality ? Nationality.code : null);
      // sessionStorage.setItem("Religion", Religion ? Religion.code : null);
      // sessionStorage.setItem("DeceasedGender", DeceasedGender ? DeceasedGender.code : null);
      // sessionStorage.setItem("AgeUnit", AgeUnit ? AgeUnit.code : null);
      // sessionStorage.setItem("checked", checked ? checked : false);
      sessionStorage.setItem("DeceasedAadharNotAvailable ", DeceasedAadharNotAvailable ? DeceasedAadharNotAvailable : false);
      sessionStorage.setItem("Occupation", Occupation ? Occupation.code : null);
      sessionStorage.setItem("DeathPlace", DeathPlace ? DeathPlace.code : null);

      sessionStorage.setItem("workFlowCode", workFlowCode);

      sessionStorage.setItem("DeathPlaceTypecode", DeathPlaceType ? DeathPlaceType.code : null);
      sessionStorage.setItem("institutionNameCode", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      // if (validFlag === true) {
      sessionStorage.setItem("DeceasedIdproofType", DeceasedIdproofType ? DeceasedIdproofType.code : null);
      sessionStorage.setItem("DeceasedIdproofNo", DeceasedIdproofNo ? DeceasedIdproofNo : null);

      sessionStorage.setItem("DeceasedAadharNumber", DeceasedAadharNumber ? DeceasedAadharNumber : null);

    
     
      let IsEditChangeScreen = isEditAbandonedDeath ? isEditAbandonedDeath : false;

      onSelect(config.key, {
        IsEditChangeScreen,
        ToDate,
        DeathDateUnavailable,
        DeathTimeTo,
        FromDate,
        DeathTimeFrom,
        tenantId,
        DateOfDeath,
        TimeOfDeath,
        DeceasedFirstNameEn,
        DeceasedMiddleNameEn,
        DeceasedLastNameEn,
        DeceasedFirstNameMl,
        DeceasedMiddleNameMl,
        DeceasedLastNameMl,
        Age,
        DeceasedAadharNotAvailable,
        DeceasedAadharNumber,
        DeceasedIdproofType,
        DeceasedIdproofNo,
        CommencementDate,
        DeceasedGender,
        Nationality,
        Religion,
        AgeUnit,
        Occupation,
        // checked,
        DeathPlace,
        workFlowCode,
        DeathPlaceType,
        HospitalNameMl,
        DeathPlaceTypecode,
        DeathPlaceInstId,
        InstitutionIdMl,
        institutionNameCode,
        DeathPlaceHomeHoueNameEn,
        DeathPlaceHomehoueNameMl,
        DeathPlaceHomeLocalityEn,
        DeathPlaceHomeLocalityMl,
        DeathPlaceHomeStreetNameEn,
        DeathPlaceHomeStreetNameMl,
        DeathPlaceHomePostofficeId,
        DeathPlaceHomepincode,
        DeathPlaceType,
        VehicleNumber,
        VehicleFromplaceEn,
        VehicleToPlaceEn,
        VehicleFromplaceMl,
        VehicleToPlaceMl,
        VehicleFirstHaltEn,
        VehicleFirstHaltMl,
        VehicleHospitalEn,
        GeneralRemarks,
        DeathPlaceWardId,
        DeathPlaceType,
        DeathPlaceLocalityEn,
        DeathPlaceLocalityMl,
        DeathPlaceStreetEn,
        DeathPlaceStreetMl,
        DeathPlaceCountry,
        DeathPlaceState,
        DeathPlaceDistrict,
        DeathPlaceCity,
        DeathPlaceRemarksEn,
        DeathPlaceRemarksMl,
        PlaceOfBurialMl,
        PlaceOfBurialEn,
        DeceasedDescription,
        BurialDescription,
        hospitalNameEn,
        institution,
        vehicleType,
        publicPlaceType
      });
    }
  };
  if (
    isEditAbandonedDeath &&
    isEditDeathPageComponents === false &&
    (formData?.InformationDeathAband?.IsEditChangeScreen === false || formData?.InformationDeathAband?.IsEditChangeScreen === undefined)
  ) {
    if (formData?.InformationDeathAband?.DeceasedGender != null) {
      if (menu.length > 0 && (DeceasedGender === undefined || DeceasedGender === "")) {
        setselectedDeceasedGender(menu.filter((menu) => menu.code === formData?.InformationDeathAband?.DeceasedGender)[0]);
      }
    }
    if (formData?.InformationDeathAband?.DeathPlace != null) {
      if (cmbPlace.length > 0 && (DeathPlace === undefined || DeathPlace === "")) {
        setselectDeathPlace(cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.InformationDeathAband?.DeathPlace)[0]);
        setValue(formData?.InformationDeathAband?.DeathPlace);
      }
    }
   
  }
  if (
    isWorkFlowDetailsLoading ||
    isNationLoad ||
    isreligionLoad ||
    isdocmentLoad ||
    isAgeUnitLoad ||
    isOccupationLoad ||
    isLoad ||
    isStateLoad ||
    isGenderLoad
  ) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}

        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          // isDisabled={!DateOfDeath || !TimeOfDeath || !DeceasedGender || !DeceasedFirstNameEn || !DeceasedFirstNameMl || !Age}
        >
          {/* //    isDisabled={!CommencementDate} */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}</span>
              </h1>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  {/* <CheckBox label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")} onChange={() => setChecked((checked) => !checked)} value={checked} /> */}
                  <CheckBox
                    label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")}
                    onChange={setCheckedDate}
                    value={DeathDateUnavailable}
                    checked={DeathDateUnavailable}
                  />
                </div>
              </div>
            </div>
            {/* {inside && ( */}
            {DeathDateUnavailable === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_FROM_DATE")}
                    </CardLabel>
                    <DatePicker
                      date={FromDate}
                      max={convertEpochToDate(new Date())}
                      name="FromDate"
                      onChange={selectFromDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        type: "text",
                        isRequired: true,
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>
                  {/* <div className="col-md-3">
                    <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
                    <CustomTimePicker name="DeathTimeFrom" onChange={(val) => handleFromTimeChange(val, setDeathTimeFrom)} value={DeathTimeFrom} />
                  </div> */}

                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_TO_DATE")}
                    </CardLabel>
                    <DatePicker
                      date={ToDate}
                      max={convertEpochToDate(new Date())}
                      name="ToDate"
                      onChange={selectToDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>
                  {/* <div className="col-md-3">
                    <CardLabel>{t("CR_TO_TIME")}</CardLabel>
                    <CustomTimePicker name="DeathTimeTo" onChange={(val) => handleToTimeChange(val, setDeathTimeTo)} value={DeathTimeTo} />
                  </div> */}
                </div>
              </div>
            )}
            {DeathDateUnavailable === false && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel>
                      {t("CR_DATE_OF_DEATH")}
                    </CardLabel>
                    {/* date={CommencementDate} */}
                    <DatePicker
                      date={DateOfDeath}
                      max={convertEpochToDate(new Date())}
                      name="DateOfDeath"
                      onChange={selectDeathDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>
                  {/* <div className="col-md-2">
                    <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                    <CustomTimePicker name="TimeOfDeath" onChange={(val) => handleTimeChange(val, setDeathTime)} value={TimeOfDeath} />
                  </div> */}
                </div>
              </div>
            )}
          </div>
          {/* <div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>
                    {t("CR_DATE_OF_DEATH")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <DatePicker
                    disable={isDisableEdit}
                    date={DateOfDeath}
                    name="DateOfDeath"
                    inputFormat="DD-MM-YYYY"
                    placeholder={`${t("CR_DATE_OF_DEATH")}`}
                    onChange={selectDateOfDeath}
                    {...(validation = {
                      pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_DATE"),
                    })}
                  />
                </div>
                <div className="col-md-2">
                  <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                  <CustomTimePicker
                    name="TimeOfDeath"
                    onChange={(val) => handleTimeChange(val, setTimeOfDeath)}
                    value={TimeOfDeath}
                    disable={isDisableEdit}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH")}`}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_PLACE_OF_DEATH")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbPlace}
                  selected={DeathPlace}
                  select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
              </div>
            </div>

            {value === "HOSPITAL" && (
              <Hospital
                formData={formData}
                isEditAbandonedDeath={isEditAbandonedDeath}
                selecthospitalNameEn={selecthospitalNameEn}
                hospitalNameEn={hospitalNameEn}
                HospitalNameMl={HospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
              />
            )}
            {value === "INSTITUTION" && (
              <div>
                <Institution
                  formData={formData}
                  isEditAbandonedDeath={isEditAbandonedDeath}
                  selectinstitution={selectinstitution}
                  institution={institution}
                  DeathPlaceInstId={DeathPlaceInstId}
                  setSelectedDeathPlaceInstId={setSelectedDeathPlaceInstId}
                  InstitutionIdMl={InstitutionIdMl}
                  setInstitutionIdMl={setInstitutionIdMl}
                  InstitutionFilterList={InstitutionFilterList}
                  setInstitutionFilterList={setInstitutionFilterList}
                  isInitialRenderInstitutionList={isInitialRenderInstitutionList}
                  setIsInitialRenderInstitutionList={setIsInitialRenderInstitutionList}
                />
              </div>
            )}
            {value === "HOME" && (
              <div>
                <DeathPlaceHome
                  formData={formData}
                  isEditAbandonedDeath={isEditAbandonedDeath}
                  DeathPlaceWardId={DeathPlaceWardId}
                  setDeathPlaceWardId={setDeathPlaceWardId}
                  DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
                  setDeathPlaceHomepostofficeId={setDeathPlaceHomepostofficeId}
                  DeathPlaceHomepincode={DeathPlaceHomepincode}
                  setDeathPlaceHomepincode={setDeathPlaceHomepincode}
                  DeathPlaceHomeHoueNameEn={DeathPlaceHomeHoueNameEn}
                  setDeathPlaceHomehoueNameEn={setDeathPlaceHomehoueNameEn}
                  DeathPlaceHomehoueNameMl={DeathPlaceHomehoueNameMl}
                  setDeathPlaceHomehoueNameMl={setDeathPlaceHomehoueNameMl}
                  DeathPlaceHomeLocalityEn={DeathPlaceHomeLocalityEn}
                  setDeathPlaceHomelocalityEn={setDeathPlaceHomelocalityEn}
                  DeathPlaceHomeLocalityMl={DeathPlaceHomeLocalityMl}
                  setDeathPlaceHomelocalityMl={setDeathPlaceHomelocalityMl}
                  DeathPlaceHomeStreetNameEn={DeathPlaceHomeStreetNameEn}
                  setDeathPlaceHomestreetNameEn={setDeathPlaceHomestreetNameEn}
                  DeathPlaceHomeStreetNameMl={DeathPlaceHomeStreetNameMl}
                  setDeathPlaceHomestreetNameMl={setDeathPlaceHomestreetNameMl}
                  PostOfficevalues={PostOfficevalues}
                  setPostOfficevalues={setPostOfficevalues}
                />
              </div>
            )}
            {value === "VEHICLE" && (
              <div>
                <DeathPlaceVehicle
                  formData={formData}
                  isEditAbandonedDeath={isEditAbandonedDeath}
                  vehicleType={vehicleType}
                  selectvehicleType={selectvehicleType}
                  VehicleNumber={VehicleNumber}
                  setVehicleNumber={setVehicleNumber}
                  VehicleFromplaceEn={VehicleFromplaceEn}
                  setVehicleFromplaceEn={setVehicleFromplaceEn}
                  VehicleToPlaceEn={VehicleToPlaceEn}
                  setVehicleToPlaceEn={setVehicleToPlaceEn}
                  GeneralRemarks={GeneralRemarks}
                  setGeneralRemarks={setGeneralRemarks}
                  VehicleFirstHaltEn={VehicleFirstHaltEn}
                  setVehicleFirstHaltEn={setVehicleFirstHaltEn}
                  VehicleFirstHaltMl={VehicleFirstHaltMl}
                  setVehicleFirstHaltMl={setVehicleFirstHaltMl}
                  VehicleHospitalEn={VehicleHospitalEn}
                  setSelectedVehicleHospitalEn={setSelectedVehicleHospitalEn}
                  DeathPlaceWardId={DeathPlaceWardId}
                  setDeathPlaceWardId={setDeathPlaceWardId}
                  VehicleFromplaceMl={VehicleFromplaceMl}
                  setVehicleFromplaceMl={setVehicleFromplaceMl}
                  VehicleToPlaceMl={VehicleToPlaceMl}
                  setVehicleToPlaceMl={setVehicleToPlaceMl}
                />
              </div>
            )}
            {value === "PUBLIC_PLACES" && (
              <div>
                <DeathPublicPlace
                  formData={formData}
                  isEditAbandonedDeath={isEditAbandonedDeath}
                  publicPlaceType={publicPlaceType}
                  selectpublicPlaceType={selectpublicPlaceType}
                  DeathPlaceLocalityEn={DeathPlaceLocalityEn}
                  setDeathPlaceLocalityEn={setDeathPlaceLocalityEn}
                  DeathPlaceLocalityMl={DeathPlaceLocalityMl}
                  setDeathPlaceLocalityMl={setDeathPlaceLocalityMl}
                  DeathPlaceStreetEn={DeathPlaceStreetEn}
                  setDeathPlaceStreetEn={setDeathPlaceStreetEn}
                  DeathPlaceStreetMl={DeathPlaceStreetMl}
                  setDeathPlaceStreetMl={setDeathPlaceStreetMl}
                  DeathPlaceWardId={DeathPlaceWardId}
                  setDeathPlaceWardId={setDeathPlaceWardId}
                  GeneralRemarks={GeneralRemarks}
                  setGeneralRemarks={setGeneralRemarks}
                />
              </div>
            )}
           
          </div>
{/* 
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_PLACE_OF_DEATH")}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbPlace}
                  selected={DeathPlace}
                  select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
              </div>
            </div>
          </div>
          {value === "HOSPITAL" && (
            <div>
              <Hospital
                formData={formData}
                isEditAbandonedDeath={isEditAbandonedDeath}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceType={DeathPlaceType}
                HospitalNameMl={HospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
              />
            </div>
          )}
          {value === "INSTITUTION" && (
            <div>
              <Institution
                formData={formData}
                isEditAbandonedDeath={isEditAbandonedDeath}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceType={DeathPlaceType}
                DeathPlaceInstId={DeathPlaceInstId}
                setSelectedDeathPlaceInstId={setSelectedDeathPlaceInstId}
                InstitutionIdMl={InstitutionIdMl}
                setInstitutionIdMl={setInstitutionIdMl}
                InstitutionFilterList={InstitutionFilterList}
                setInstitutionFilterList={setInstitutionFilterList}
                isInitialRenderInstitutionList={isInitialRenderInstitutionList}
                setIsInitialRenderInstitutionList={setIsInitialRenderInstitutionList}
              />
            </div>
          )}
          {value === "HOME" && (
            <div>
              <DeathPlaceHome
                formData={formData}
                isEditAbandonedDeath={isEditAbandonedDeath}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
                DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
                setDeathPlaceHomepostofficeId={setDeathPlaceHomepostofficeId}
                DeathPlaceHomepincode={DeathPlaceHomepincode}
                setDeathPlaceHomepincode={setDeathPlaceHomepincode}
                DeathPlaceHomeHoueNameEn={DeathPlaceHomeHoueNameEn}
                setDeathPlaceHomehoueNameEn={setDeathPlaceHomehoueNameEn}
                DeathPlaceHomeHoueNameMl={DeathPlaceHomeHoueNameMl}
                setDeathPlaceHomehoueNameMl={setDeathPlaceHomehoueNameMl}
                DeathPlaceHomeLocalityEn={DeathPlaceHomeLocalityEn}
                setDeathPlaceHomelocalityEn={setDeathPlaceHomelocalityEn}
                DeathPlaceHomeLocalityMl={DeathPlaceHomeLocalityMl}
                setDeathPlaceHomelocalityMl={setDeathPlaceHomelocalityMl}
                DeathPlaceHomeStreetNameEn={DeathPlaceHomeStreetNameEn}
                setDeathPlaceHomestreetNameEn={setDeathPlaceHomestreetNameEn}
                DeathPlaceHomeStreetNameMl={DeathPlaceHomeStreetNameMl}
                setDeathPlaceHomestreetNameMl={setDeathPlaceHomestreetNameMl}
                PostOfficevalues={PostOfficevalues}
                setPostOfficevalues={setPostOfficevalues}
              />
            </div>
          )}
          {value === "VEHICLE" && (
            <div>
              <DeathPlaceVehicle
                formData={formData}
                isEditAbandonedDeath={isEditAbandonedDeath}
                DeathPlaceType={DeathPlaceType}
                selectDeathPlaceType={selectDeathPlaceType}
                VehicleNumber={VehicleNumber}
                setVehicleNumber={setVehicleNumber}
                VehicleFromplaceEn={VehicleFromplaceEn}
                setVehicleFromplaceEn={setVehicleFromplaceEn}
                VehicleToPlaceEn={VehicleToPlaceEn}
                setVehicleToPlaceEn={setVehicleToPlaceEn}
                GeneralRemarks={GeneralRemarks}
                setGeneralRemarks={setGeneralRemarks}
                VehicleFirstHaltEn={VehicleFirstHaltEn}
                setVehicleFirstHaltEn={setVehicleFirstHaltEn}
                VehicleFirstHaltMl={VehicleFirstHaltMl}
                setVehicleFirstHaltMl={setVehicleFirstHaltMl}
                VehicleHospitalEn={VehicleHospitalEn}
                setSelectedVehicleHospitalEn={setSelectedVehicleHospitalEn}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
                VehicleFromplaceMl={VehicleFromplaceMl}
                setVehicleFromplaceMl={setVehicleFromplaceMl}
                VehicleToPlaceMl={VehicleToPlaceMl}
                setVehicleToPlaceMl={setVehicleToPlaceMl}
              />
            </div>
          )}
          {value === "PUBLIC_PLACES" && (
            <div>
              <DeathPublicPlace
                formData={formData}
                isEditAbandonedDeath={isEditAbandonedDeath}
                DeathPlaceType={DeathPlaceType}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceLocalityEn={DeathPlaceLocalityEn}
                setDeathPlaceLocalityEn={setDeathPlaceLocalityEn}
                DeathPlaceLocalityMl={DeathPlaceLocalityMl}
                setDeathPlaceLocalityMl={setDeathPlaceLocalityMl}
                DeathPlaceStreetEn={DeathPlaceStreetEn}
                setDeathPlaceStreetEn={setDeathPlaceStreetEn}
                DeathPlaceStreetMl={DeathPlaceStreetMl}
                setDeathPlaceStreetMl={setDeathPlaceStreetMl}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
                GeneralRemarks={GeneralRemarks}
                setGeneralRemarks={setGeneralRemarks}
              />
            </div>
          )}
          {value === "OUTSIDE_JURISDICTION" && (
            <div>
              <DeathOutsideJurisdiction
                formData={formData}
                isEditAbandonedDeath={isEditAbandonedDeath}
                DeathPlaceCountry={DeathPlaceCountry}
                setSelectDeathPlaceCountry={setSelectDeathPlaceCountry}
                DeathPlaceState={DeathPlaceState}
                SelectDeathPlaceState={SelectDeathPlaceState}
                DeathPlaceDistrict={DeathPlaceDistrict}
                SelectDeathPlaceDistrict={SelectDeathPlaceDistrict}
                DeathPlaceCity={DeathPlaceCity}
                SelectDeathPlaceCity={SelectDeathPlaceCity}
                DeathPlaceRemarksEn={DeathPlaceRemarksEn}
                SelectDeathPlaceRemarksEn={SelectDeathPlaceRemarksEn}
                DeathPlaceRemarksMl={DeathPlaceRemarksMl}
                SelectDeathPlaceRemarksMl={SelectDeathPlaceRemarksMl}
                PlaceOfBurialMl={PlaceOfBurialMl}
                SelectPlaceOfBurialMl={SelectPlaceOfBurialMl}
                PlaceOfBurialEn={PlaceOfBurialEn}
                SelectPlaceOfBurialEn={SelectPlaceOfBurialEn}
                GeneralRemarks={GeneralRemarks}
                setGeneralRemarks={setGeneralRemarks}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
              />
            </div>
          )} */}
          {/* PLACE OF BURIAL */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_BURIAL")}`}</span>
              </h1>
            </div>
          </div>
           {/* END OF PLACE OF BURIAL */}
           <div className="row">
            <div className="col-md-12">
          <PlaceofBurial
           presentWardNo={presentWardNo}
           setPresentWardNo={setPresentWardNo}
           permntInKeralaAdrLBTypeName={permntInKeralaAdrLBTypeName}
           setpermntInKeralaAdrLBTypeName={setpermntInKeralaAdrLBTypeName}
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
           isEditAbandonedDeath={isEditAbandonedDeath}
           PlaceOfBurialMl={PlaceOfBurialMl}
                SelectPlaceOfBurialMl={SelectPlaceOfBurialMl}
                PlaceOfBurialEn={PlaceOfBurialEn}
                SelectPlaceOfBurialEn={SelectPlaceOfBurialEn}
                GeneralRemarks={GeneralRemarks}
                setGeneralRemarks={setGeneralRemarks}
                BurialDescription={BurialDescription}
                setBurialDescription={setBurialDescription}
           formData={formData}/>
           </div>
           </div>

          {/* END OF PLACE OF BURIAL */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LEGAL_INFORMATION")}`}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CheckBox
                  label={t("CR_AADHAR_NOT_AVAILABLE")}
                  onChange={setCheckedAdhar}
                  value={DeceasedAadharNotAvailable}
                  checked={DeceasedAadharNotAvailable}
                />
              </div>
            </div>
          </div>
          {DeceasedAadharNotAvailable === true && (
            // {checkedAdhar ? (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_ID_DETAILS_OF_DECEASED")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    onChange={handleDropdownChange}
                    option={cmbDocumentType}
                    selected={DeceasedIdproofType}
                    select={selectDeceasedIdproofType}
                    placeholder={`${t("CR_ID_DETAILS_OF_DECEASED")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("CR_ID_NO")}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    optionKey="i18nKey"
                    name="DeceasedIdproofNo"
                    value={DeceasedIdproofNo}
                    disabled={!isTextboxEnabled}
                    onChange={setSelectDeceasedIdproofNo}
                    placeholder={`${t("CR_ID_NO")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$",  type: "Text", title: t("CR_INVALID_ID") })}
                  />
                </div>
              </div>
            </div>
          )}
          {DeceasedAadharNotAvailable === false && (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_AADHAR")} <span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                    t={t}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="DeceasedAadharNumber"
                    value={DeceasedAadharNumber}
                    onChange={setSelectDeceasedAadharNumber}
                    placeholder={`${t("CR_AADHAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$",isRequired: true, type: "text",  title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_EN")}`}
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameEn"
                  value={DeceasedFirstNameEn}
                  onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_FIRST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$",  type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameEn"
                  value={DeceasedMiddleNameEn}
                  onChange={setSelectDeceasedMiddleNameEn}
                  placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$",  type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameEn"
                  value={DeceasedLastNameEn}
                  onChange={setSelectDeceasedLastNameEn}
                  placeholder={`${t("CR_LAST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$",  type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_ML")}`}
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameMl"
                  value={DeceasedFirstNameMl}
                  onChange={setSelectDeceasedFirstNameMl}
                  placeholder={`${t("CR_FIRST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    type: "text",
                    title: t("CR_INVALID_FIRST_NAME_ML"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameMl"
                  value={DeceasedMiddleNameMl}
                  onChange={setSelectDeceasedMiddleNameMl}
                  placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    type: "text",
                    title: t("CR_INVALID_MIDDLE_NAME_ML"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameMl"
                  value={DeceasedLastNameMl}
                  onChange={setSelectDeceasedLastNameMl}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",

                    type: "text",
                    title: t("CR_INVALID_LAST_NAME_ML"),
                  })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-1">
                <CardLabel>
                  {`${t("CR_AGE")}`}
                </CardLabel>
                <TextInput
                  t={t}
                  type="number"
                  optionKey="i18nKey"
                  name="Age"
                  onChange={setSelectAge}
                  value={Age}
                  placeholder={`${t("CR_AGE")}`}
                  {...(validation = { pattern: "^[.0-9`' ]*$",  type: "number", title: t("CS_COMMON_INVALID_AGE") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {`${t("CR_AGE_UNIT")}`}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbAgeUnitFilter}
                  selected={AgeUnit}
                  select={selectAgeUnit}
                  placeholder={`${t("CR_AGE_UNIT")}`}
                />
              </div>
              {/* {!isTextBoxValid() && <p>Please enter a valid value based on the conditions</p>} */}

              <div className="col-md-2">
               <CardLabel>
                  {t("CR_GENDER")}
                  <span className="mandatorycss">*</span>
                </CardLabel> 
                <Dropdown
                  t={t}
                  optionKey="code"
                  option={menu}
                  selected={DeceasedGender}
                  select={selectDeceasedGender}
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = {  title: t("CR_INVALID_GENDER") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {t("CR_NATIONALITY")}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="nationalityname"
                  option={cmbNation}
                  selected={Nationality}
                  select={selectNationality}
                  placeholder={`${t("CR_NATIONALITY")}`}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {t("CS_COMMON_RELIGION")}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbReligion}
                  selected={Religion}
                  select={selectReligion}
                  placeholder={`${t("CS_COMMON_RELIGION")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_PROFESSIONAL")}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbOccupationMain}
                  selected={Occupation}
                  select={selectOccupation}
                  placeholder={`${t("CR_PROFESSIONAL")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_DESCRIPTION_OF_PERSON")}`}

              </CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeceasedDescription"
                value={DeceasedDescription}
                onChange={setSelectDeceasedDescription}
                placeholder={`${t("CR_DESCRIPTION_OF_PERSON")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
              />
            </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={sexError}
              label={
               sexError
                  ?  sexError
                    ? t(`DEATH_ERROR_SEX_CHOOSE`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
        </FormStep>
      </React.Fragment>
    );
  }
};
export default InformationDeathAbandonedAband;
