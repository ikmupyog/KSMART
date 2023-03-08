import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Toast,
  InputCard,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import Hospital from "./Hospital";
import Institution from "./Institution";
import DeathPlaceHome from "./DeathPlaceHome";
import DeathPlaceVehicle from "./DeathPlaceVehicle";
import DeathPublicPlace from "./DeathPublicPlace";
import DeathOutsideJurisdiction from "./DeathOutsideJurisdiction ";
import { useParams } from "react-router-dom";

const InformationDeath = ({ config, onSelect, userType, formData, iseditDeath }) => {
  const [isEditDeathPageComponents, setIsEditDeathPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(iseditDeath ? iseditDeath : false);
  console.log(iseditDeath);
  console.log(JSON.stringify(formData));
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const convertEpochToDate = (dateEpoch) => {
    console.log("MaxDate");
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      console.log("MaxDate" + dateEpoch);
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
      //  return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "WorkFlowDeath"
  );
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  // const { data: documentType = {}, isdocmentLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "IdProof");
  // const { data: documentType = {}, isdocmentLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "IdProofDetails");
  const { data: AgeUnitvalue = {}, isAgeUnitLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AgeUnit");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const { data: OccupationMain = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Occupation");
  const { data: Profession = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  let cmbPlace = [];
  let workFlowData = [];

  WorkFlowDetails &&
  WorkFlowDetails["birth-death-service"] &&
  WorkFlowDetails["birth-death-service"].WorkFlowDeath &&
  WorkFlowDetails["birth-death-service"].WorkFlowDeath.map((ob) => {
    workFlowData.push(ob);
    // console.log(workFlowData);
  });
  place &&
  place["common-masters"] &&
  place["common-masters"].PlaceMasterDeath &&
  place["common-masters"].PlaceMasterDeath.map((ob) => {
    cmbPlace.push(ob);
  });
  // place &&
  //   place["common-masters"] &&
  //   place["common-masters"].PlaceMasterDeath.map((ob) => {
  //     cmbPlace.push(ob);
  //   });
  let cmbAgeUnit = [];
  AgeUnitvalue &&
    AgeUnitvalue["birth-death-service"] &&
    AgeUnitvalue["birth-death-service"].AgeUnit.map((ob) => {
      cmbAgeUnit.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  let cmbReligion = [];
  religion &&
    religion["common-masters"] &&
    religion["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
   
  let cmbOccupationMain = [];
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbOccupationMain.push(ob);
    });

  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  const [DateOfDeath, setDateOfDeath] = useState(
    iseditDeath &&
      isEditDeathPageComponents === false &&
      (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.InformationDeath?.DateOfDeath)
      : formData?.InformationDeath?.DateOfDeath
  ); //formData?.ChildDetails?.childDOB

  // const [DateOfDeath, setDateOfDeath] = useState(
  //   isedit ? convertEpochToDate(formData?.InformationDeath?.DateOfDeath) : formData?.InformationDeath?.DateOfDeath
  // );
  const [TimeOfDeath, setTimeOfDeath] = useState("");
  // (formData?.InformationDeath?.TimeOfDeath ? formData?.InformationDeath?.TimeOfDeath : "");
  const [DeceasedAadharNotAvailable, setDeceasedAadharNotAvailable] = useState(
    formData?.InformationDeath?.DeceasedAadharNotAvailable ? formData?.InformationDeath?.DeceasedAadharNotAvailable : false
  );
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(
    formData?.InformationDeath?.DeceasedAadharNumber ? formData?.InformationDeath?.DeceasedAadharNumber : ""
  );
  const [DeceasedIdproofType, setSelectedDeceasedIdproofType] = useState(
    formData?.InformationDeath?.DeceasedIdproofType ? formData?.InformationDeath?.DeceasedIdproofType : null
  );
  const [DeceasedIdproofNo, setDeceasedIdproofNo] = useState(
    formData?.InformationDeath?.DeceasedIdproofNo ? formData?.InformationDeath?.DeceasedIdproofNo : null
  );
  const [DeceasedFirstNameEn, setDeceasedFirstNameEn] = useState(
    formData?.InformationDeath?.DeceasedFirstNameEn ? formData?.InformationDeath?.DeceasedFirstNameEn : ""
  );
  const [DeceasedMiddleNameEn, setDeceasedMiddleNameEn] = useState(
    formData?.InformationDeath?.DeceasedMiddleNameEn ? formData?.InformationDeath?.DeceasedMiddleNameEn : ""
  );
  const [DeceasedLastNameEn, setDeceasedLastNameEn] = useState(
    formData?.InformationDeath?.DeceasedLastNameEn ? formData?.InformationDeath?.DeceasedLastNameEn : ""
  );
  const [DeceasedFirstNameMl, setDeceasedFirstNameMl] = useState(
    formData?.InformationDeath?.DeceasedFirstNameMl ? formData?.InformationDeath?.DeceasedFirstNameMl : ""
  );
  const [DeceasedMiddleNameMl, setDeceasedMiddleNameMl] = useState(
    formData?.InformationDeath?.DeceasedMiddleNameMl ? formData?.InformationDeath?.DeceasedMiddleNameMl : ""
  );
  const [DeceasedLastNameMl, setDeceasedLastNameMl] = useState(
    formData?.InformationDeath?.DeceasedLastNameMl ? formData?.InformationDeath?.DeceasedLastNameMl : ""
  );
  const [Age, setAge] = useState(formData?.InformationDeath?.Age ? formData?.InformationDeath?.Age : "");
  // const [gender, selectGender] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (menu.filter(menu => menu.code === formData?.ChildDetails?.gender)[0]) : formData?.ChildDetails?.gender);

  // const [DeceasedGender, setselectedDeceasedGender] = useState(formData?.InformationDeath?.DeceasedGender);
  // const [Nationality, setSelectedNationality] = useState(formData?.InformationDeath?.Nationality);
  const [Nationality, setSelectedNationality] = useState(
    formData?.InformationDeath?.Nationality?.code
      ? formData?.InformationDeath?.Nationality
      : formData?.InformationDeath?.Nationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeath?.Nationality)[0]
      : ""
  );
  const [Religion, setSelectedReligion] = useState(
    formData?.InformationDeath?.Religion?.code
      ? formData?.InformationDeath?.Religion
      : formData?.InformationDeath?.Religion
      ? cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.InformationDeath?.Religion)[0]
      : ""
  );
  const { data: State = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const [CommencementDate, setCommencementDate] = useState(
    formData?.InformationDeath?.CommencementDate ? formData?.InformationDeath?.CommencementDate : ""
  );

  // const [checked, setChecked] = useState(formData?.InformationDeath?.checked ? formData?.InformationDeath?.checked : false);
  const [AgeUnit, setSelectedAgeUnit] = useState(
    formData?.InformationDeath?.AgeUnit?.code
      ? formData?.InformationDeath?.AgeUnit
      : formData?.InformationDeath?.AgeUnit
      ? cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeath?.DeceasedGender)[0]
      : ""
  );

  const [DeceasedGender, setselectedDeceasedGender] = useState(
    formData?.InformationDeath?.DeceasedGender?.code
      ? formData?.InformationDeath?.DeceasedGender
      : formData?.InformationDeath?.DeceasedGender
      ? menu.filter((menu) => menu.code === formData?.InformationDeath?.DeceasedGender)[0]
      : ""
  );
  const [Occupation, setSelectedOccupation] = useState(
    formData?.InformationDeath?.Occupation?.code
      ? formData?.InformationDeath?.Occupation
      : formData?.InformationDeath?.Occupation
      ? cmbOccupationMain.filter((cmbOccupationMain) => cmbOccupationMain.code === formData?.InformationDeath?.Occupation)[0]
      : ""
  );
  // const [DeathPlace, setselectDeathPlace] = useState(formData?.InformationDeath?.DeathPlace);
  const [DeathPlace, setselectDeathPlace] = useState(
    formData?.InformationDeath?.DeathPlace?.code
      ? formData?.InformationDeath?.DeathPlace
      : formData?.InformationDeath?.DeathPlace
      ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.ChildDetails?.DeathPlace)[0]
      : ""
  );

  // const [DeathPlace, setselectDeathPlace] = useState(cmbPlace?(cmbPlace.filter(cmbPlace=>cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]) :formData?.InformationDeath?.DeathPlace) ;
  //Hospital, Intitution, vehicle, Public Place {DeathPlaceType}
  const [DeathPlaceType, selectDeathPlaceType] = useState(formData?.InformationDeath?.DeathPlaceType);
  const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(
    formData?.InformationDeath?.DeathPlaceInstId ? formData?.InformationDeath?.DeathPlaceInstId : null
  );
  const [HospitalNameMl, selectHospitalNameMl] = useState(formData?.InformationDeath?.HospitalNameMl);
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.InformationDeath?.DeathPlaceInstId);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  // Home
  const [DeathPlaceHomepostofficeId, setDeathPlaceHomepostofficeId] = useState(formData?.InformationDeath?.DeathPlaceHomepostofficeId);
  const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(formData?.InformationDeath?.DeathPlaceHomepincode);
  const [DeathPlaceHomehoueNameEn, setDeathPlaceHomehoueNameEn] = useState(formData?.InformationDeath?.DeathPlaceHomehoueNameEn);
  const [DeathPlaceHomelocalityEn, setDeathPlaceHomelocalityEn] = useState(formData?.InformationDeath?.DeathPlaceHomelocalityEn);
  const [DeathPlaceHomelocalityMl, setDeathPlaceHomelocalityMl] = useState(formData?.InformationDeath?.DeathPlaceHomelocalityMl);
  const [DeathPlaceHomestreetNameEn, setDeathPlaceHomestreetNameEn] = useState(formData?.InformationDeath?.DeathPlaceHomestreetNameEn);
  const [DeathPlaceHomestreetNameMl, setDeathPlaceHomestreetNameMl] = useState(formData?.InformationDeath?.DeathPlaceHomestreetNameMl);
  const [DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl] = useState(formData?.InformationDeath?.DeathPlaceHomehoueNameMl);
  //Vehicle home OutsideJurisdiction{DeathPlaceWardId} Publicplace OutsideJurisdiction {GeneralRemarks} Publicplace {DeathPlaceWardId}
  //
  const [VehicleNumber, setVehicleNumber] = useState(formData?.InformationDeath?.VehicleNumber);
  const [VehicleFromplaceEn, setVehicleFromplaceEn] = useState(formData?.InformationDeath?.VehicleFromplaceEn);
  const [VehicleToPlaceEn, setVehicleToPlaceEn] = useState(formData?.InformationDeath?.VehicleToPlaceEn);
  const [VehicleFromplaceMl, setVehicleFromplaceMl] = useState(formData?.InformationDeath?.VehicleFromplaceMl);
  const [VehicleToPlaceMl, setVehicleToPlaceMl] = useState(formData?.InformationDeath?.VehicleToPlaceMl);
  const [GeneralRemarks, setGeneralRemarks] = useState(formData?.InformationDeath?.GeneralRemarks);
  const [VehicleFirstHaltEn, setVehicleFirstHaltEn] = useState(formData?.InformationDeath?.VehicleFirstHaltEn);
  const [VehicleFirstHaltMl, setVehicleFirstHaltMl] = useState(formData?.InformationDeath?.VehicleFirstHaltMl);
  const [VehicleHospitalEn, setSelectedVehicleHospitalEn] = useState(formData?.InformationDeath?.VehicleHospitalEn);
  const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData?.InformationDeath?.DeathPlaceWardId);
  //Public Place

  const [DeathPlaceLocalityEn, setDeathPlaceLocalityEn] = useState(
    formData?.InformationDeath?.DeathPlaceLocalityEn ? formData?.InformationDeath?.DeathPlaceLocalityEn : ""
  );
  const [DeathPlaceLocalityMl, setDeathPlaceLocalityMl] = useState(
    formData?.InformationDeath?.DeathPlaceLocalityMl ? formData?.InformationDeath?.DeathPlaceLocalityMl : ""
  );
  const [DeathPlaceStreetEn, setDeathPlaceStreetEn] = useState(
    formData?.InformationDeath?.DeathPlaceStreetEn ? formData?.InformationDeath?.DeathPlaceStreetEn : ""
  );
  const [DeathPlaceStreetMl, setDeathPlaceStreetMl] = useState(
    formData?.InformationDeath?.DeathPlaceStreetMl ? formData?.InformationDeath?.DeathPlaceStreetMl : ""
  );

  //DeathOutsideJurisdiction
  const [DeathPlaceCountry, setSelectDeathPlaceCountry] = useState(formData?.InformationDeath?.DeathPlaceCountry);
  const [DeathPlaceState, SelectDeathPlaceState] = useState(formData?.InformationDeath?.DeathPlaceState);
  const [DeathPlaceDistrict, SelectDeathPlaceDistrict] = useState(formData?.InformationDeath?.DeathPlaceDistrict);
  const [DeathPlaceCity, SelectDeathPlaceCity] = useState(formData?.InformationDeath?.DeathPlaceCity);
  const [DeathPlaceRemarksEn, SelectDeathPlaceRemarksEn] = useState(formData?.InformationDeath?.DeathPlaceRemarksEn);
  const [DeathPlaceRemarksMl, SelectDeathPlaceRemarksMl] = useState(formData?.InformationDeath?.DeathPlaceRemarksMl);
  const [PlaceOfBurialEn, SelectPlaceOfBurialEn] = useState(formData?.InformationDeath?.PlaceOfBurialEn);
  const [PlaceOfBurialMl, SelectPlaceOfBurialMl] = useState(formData?.InformationDeath?.PlaceOfBurialMl);

  const [toast, setToast] = useState(false);
  const [value, setValue] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderDeathPlace, setIsInitialRenderDeathPlace] = useState(true);

  const [sexError, setsexError] = useState(formData?.InformationDeath?.sexError ? false : false);
  const [DOBError, setDOBError] = useState(formData?.InformationDeath?.ChildDOB ? false : false);
  const [AadharError, setAadharError] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? false : false);
  const [HospitalError, setHospitalError] = useState(formData?.InformationDeath?.DeathPlaceType ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.InformationDeath?.DeathPlaceType ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.InformationDeath?.DeathPlaceInstId ? false : false);
  const [AgeError, setAgeError] = useState(formData?.InformationDeath?.Age ? false : false);
  const [WardNameError, setWardNameError] = useState(formData?.InformationDeath?.DeathPlaceWardId ? false : false);
  let DeathPlaceTypecode = "";
  let institutionNameCode = "";
  let naturetypecmbvalue = null;
  const maxDate = new Date();
  let workFlowCode = "";
  let Difference_In_DaysRounded = "";
  // let workFlowCode = "BIRTHHOSP21";
  

  // let cmbDocumentType = [];
  // documentType &&
  //   documentType["birth-death-service"] &&
  //   documentType["birth-death-service"].IdProofDetails.map((ob) => {
  //     cmbDocumentType.push(ob);
  //   });

  // let cmbOccupationMain = [];
  // OccupationMain &&
  //   OccupationMain["common-masters"] &&
  //   OccupationMain["common-masters"]?.Occupation?.map((ob) => {
  //     cmbOccupationMain.push(ob);
  //   });

  let cmbState = [];
  State &&
    State["common-masters"] &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
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
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeceasedLastNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectDeceasedMiddleNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeceasedMiddleNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectDeceasedFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeceasedFirstNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectDeceasedFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeceasedFirstNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }

  function setSelectDeceasedMiddleNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeceasedMiddleNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }

  function setSelectDeceasedLastNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeceasedLastNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectAge(e) {
    // const newValue = parseInt(e.target.value);
    // if (newValue >= 0 && newValue <= 150) {
    //   setValue(newValue);
    // }
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value <= 120) {
        setAge(e.target.value);
      }
    }
  }
  function setSelectDeceasedAadharNumber(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setDeceasedAadharNumber(e.target.value);
        setAadharError(true);
        return false;
        // const limit = 12;
        // setDeceasedAadharNumber(e.target.value.slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.length < 12) {
        setAadharError(true);
        setDeceasedAadharNumber(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setDeceasedAadharNumber(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setDeceasedAadharNumber(e.target.value);
      return true;
    }
  }
  // function setSelectDeceasedAadharNumber(e) {
  //   setDeceasedAadharNumber(e.target.value);
  // }
  function setSelectDeceasedIdproofNo(e) {
    // console.log("Test" + e);
    setDeceasedIdproofNo(e.target.value);
  }
  function selectOccupation(value) {
    setSelectedOccupation(value);
  }
  function selectDateOfDeath(value) {
    setDateOfDeath(value);
    const today = new Date();
    const deathDate = new Date(value);
    if (deathDate.getTime() <= today.getTime()) {
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);

      // if(Difference_In_DaysRounded<=21){
      //   workFlowCode="death21days"
      // }
    } else {
      setDateOfDeath(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function selectDeathPlace(value) {
    setselectDeathPlace(value);
    setValue(value.code);

    let currentWorgFlow = workFlowData.filter(
      (workFlowData) => workFlowData.DeathPlace === value.code
       &&
      workFlowData.startdateperiod <= Difference_In_DaysRounded &&
      workFlowData.enddateperiod >= Difference_In_DaysRounded
    );
    // console.log(currentWorgFlow[0].WorkflowCode);
    workFlowCode = currentWorgFlow[0].WorkflowCode;

    //   Deathplacevalue = DeathPlace.code;
    //   // setValue(Deathplacevalue);
    //   if(Deathplacevalue === "HOME" ){
    //     workFlowCode="DEATHHOME";
    //     console.log(workFlowCode);
    //   }
    //   // else{
    //   //   workFlowCode="DEATHHOSP";
    //   // }
    // console.log(workFlowCode);
  }
  // let workFlowCode ="";
 

  function selectAgeUnit(value) {
    setSelectedAgeUnit(value);
  }
  function selectDeceasedIdproofType(value) {
    setSelectedDeceasedIdproofType(value);
  }

  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };

  function setCheckedAdhar(e) {
    if (e.target.checked === true) {
      setDeceasedAadharNotAvailable(e.target.checked);
    } else {
      setDeceasedAadharNotAvailable(e.target.checked);
      setSelectedDeceasedIdproofType("");
      setDeceasedIdproofNo("");
    }
  }

  const onSkip = () => onSelect();
  let cmbfilterNation = [];
  let cmbfilterReligion = [];
  let cmbfilterAgeUnit = [];
  let naturetype = null;
  let cmbfilterNationI = [];
  let cmbFilterState = [];

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
      if (AgeUnit == null || AgeUnit == "") {
        if (stateId === "kl" && cmbAgeUnit.length > 0) {
          cmbfilterAgeUnit = cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.name.includes("Years"));
          setSelectedAgeUnit(cmbfilterAgeUnit[0]);
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

  // cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
  // setAdrsStateName(cmbFilterState[0]);

  // if (isInitialRender) {
  //   if (formData?.InformationDeath?.ischeckedAdhar  != null) {
  //     setIsInitialRender(false);
  //     setisCheckedAdhar(formData?.InformationDeath?.ischeckedAdhar );
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
            DeathPlaceHomepostofficeId={DeathPlaceHomepostofficeId}
            DeathPlaceHomepincode={DeathPlaceHomepincode}
            DeathPlaceHomehoueNameEn={DeathPlaceHomehoueNameEn}
            DeathPlaceHomehoueNameMl={DeathPlaceHomehoueNameMl}
            DeathPlaceHomelocalityEn={DeathPlaceHomelocalityEn}
            DeathPlaceHomelocalityMl={DeathPlaceHomelocalityMl}
            DeathPlaceHomestreetNameEn={DeathPlaceHomestreetNameEn}
            DeathPlaceHomestreetNameMl={DeathPlaceHomestreetNameMl}
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
        if (naturetype === "OUTSIDE_JURISDICTION") {
          <DeathOutsideJurisdiction
            DeathPlaceCountry={DeathPlaceCountry}
            DeathPlaceState={DeathPlaceState}
            DeathPlaceDistrict={DeathPlaceDistrict}
            DeathPlaceCity={DeathPlaceCity}
            DeathPlaceRemarksEn={DeathPlaceRemarksEn}
            DeathPlaceRemarksMl={DeathPlaceRemarksMl}
            PlaceOfBurialMl={PlaceOfBurialMl}
            PlaceOfBurialEn={PlaceOfBurialEn}
            GeneralRemarks={GeneralRemarks}
            DeathPlaceWardId={DeathPlaceWardId}
          />;
        }
      }
    }
  }, [isInitialRenderDeathPlace]);
  let validFlag = true;
  const goNext = () => {
    // console.log(DeathPlace.code);
    console.log(Difference_In_DaysRounded);
    if (Difference_In_DaysRounded <= 21) {
      if (DeathPlace.code == "HOSPITAL") {
        workFlowCode = "DEATHHOSP";
        console.log(workFlowCode);
      } else {
        workFlowCode = "DEATHHOME";
      }
    }
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
    if (AadharError) {
      validFlag = false;
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAadharError(false);
    }
    if (Age == null || Age == "" || Age == undefined) {
      validFlag = false;
      setAgeError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAgeError(false);
    }
    // if (DeathPlaceWardId == null || DeathPlaceWardId == "" || DeathPlaceWardId == undefined) {
    //   validFlag = false;
    //   setWardNameError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setWardNameError(false);
    // }

    if (DeathPlace.code == "HOSPITAL") {
      if (DeathPlaceType == null) {
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        DeathPlaceTypecode = DeathPlaceType.code;
        setHospitalError(false);
      }
    } else if (DeathPlace.code === "INSTITUTION") {
      if (DeathPlaceType == null) {
        setInstitutionError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        DeathPlaceTypecode = DeathPlaceType.code;
        setInstitutionError(false);
        if (DeathPlaceInstId === null) {
          setInstitutionNameError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          institutionNameCode = DeathPlaceInstId.code;
          setInstitutionNameError(false);
        }
      }
    }

    if (validFlag == true) {
      sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      sessionStorage.setItem("DateOfDeath", DateOfDeath ? DateOfDeath : null);
      sessionStorage.setItem("TimeOfDeath", TimeOfDeath ? TimeOfDeath : null);
      sessionStorage.setItem("DeceasedFirstNameEn", DeceasedFirstNameEn ? DeceasedFirstNameEn : null);
      sessionStorage.setItem("DeceasedMiddleNameEn", DeceasedMiddleNameEn ? DeceasedMiddleNameEn : null);
      sessionStorage.setItem("DeceasedLastNameEn", DeceasedLastNameEn ? DeceasedLastNameEn : null);
      sessionStorage.setItem("DeceasedFirstNameMl", DeceasedFirstNameMl ? DeceasedFirstNameMl : null);
      sessionStorage.setItem("DeceasedMiddleNameMl", DeceasedMiddleNameMl ? DeceasedMiddleNameMl : null);
      sessionStorage.setItem("DeceasedLastNameMl", DeceasedLastNameMl ? DeceasedLastNameMl : null);
      sessionStorage.setItem("Age", Age ? Age : null);
      sessionStorage.setItem("DeceasedAadharNumber", DeceasedAadharNumber ? DeceasedAadharNumber : null);
      sessionStorage.setItem("DeceasedIdproofNo", DeceasedIdproofNo ? DeceasedIdproofNo : null);
      sessionStorage.setItem("Nationality", Nationality ? Nationality.code : null);
      sessionStorage.setItem("Religion", Religion ? Religion.code : null);
      sessionStorage.setItem("DeceasedGender", DeceasedGender ? DeceasedGender.code : null);
      sessionStorage.setItem("DeceasedIdproofType", DeceasedIdproofType ? DeceasedIdproofType.code : null);
      sessionStorage.setItem("AgeUnit", AgeUnit ? AgeUnit.code : null);
      // sessionStorage.setItem("checked", checked ? checked : false);
      sessionStorage.setItem("DeceasedAadharNotAvailable ", DeceasedAadharNotAvailable ? DeceasedAadharNotAvailable : false);
      sessionStorage.setItem("Occupation", Occupation ? Occupation.code : null);
      sessionStorage.setItem("DeathPlace", DeathPlace ? DeathPlace.code : null);

      sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      sessionStorage.setItem("HospitalNameMl", HospitalNameMl ? HospitalNameMl.code : null);
      sessionStorage.setItem("workFlowCode", workFlowCode);

      sessionStorage.setItem("DeathPlaceTypecode", DeathPlaceType ? DeathPlaceType.code : null);
      sessionStorage.setItem("institutionNameCode", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      // if (validFlag === true) {

      if (DeathPlace.code === "HOSPITAL") {
        //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
        sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
        sessionStorage.removeItem("DeathPlaceInstId");
      }
      if (DeathPlace.code === "INSTITUTION") {
        //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
        sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
        sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
        sessionStorage.setItem("InstitutionIdMl", InstitutionIdMl ? InstitutionIdMl.InstitutionIdMl : null);
      }
      if (DeathPlace.code === "HOME") {
        sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
        sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
        sessionStorage.setItem("DeathPlaceHomehoueNameEn", DeathPlaceHomehoueNameEn ? DeathPlaceHomehoueNameEn : null);
        sessionStorage.setItem("DeathPlaceHomehoueNameMl", DeathPlaceHomehoueNameMl ? DeathPlaceHomehoueNameMl : null);
        sessionStorage.setItem("DeathPlaceHomelocalityEn", DeathPlaceHomelocalityEn ? DeathPlaceHomelocalityEn : null);
        sessionStorage.setItem("DeathPlaceHomelocalityMl", DeathPlaceHomelocalityMl ? DeathPlaceHomelocalityMl : null);
        sessionStorage.setItem("DeathPlaceHomestreetNameEn", DeathPlaceHomestreetNameEn ? DeathPlaceHomestreetNameEn : null);
        sessionStorage.setItem("DeathPlaceHomestreetNameMl", DeathPlaceHomestreetNameMl ? DeathPlaceHomestreetNameMl : null);
        sessionStorage.setItem("DeathPlaceHomepostofficeId", DeathPlaceHomepostofficeId ? DeathPlaceHomepostofficeId.code : null);
        sessionStorage.setItem("DeathPlaceHomepincode", DeathPlaceHomepincode ? DeathPlaceHomepincode.code : null);
      }
      if (DeathPlace.code === "VEHICLE") {
        sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
        sessionStorage.setItem("VehicleNumber", VehicleNumber ? VehicleNumber : null);
        sessionStorage.setItem("VehicleFromplaceEn", VehicleFromplaceEn ? VehicleFromplaceEn : null);
        sessionStorage.setItem("VehicleToPlaceEn", VehicleToPlaceEn ? VehicleToPlaceEn : null);
        sessionStorage.setItem("VehicleFromplaceMl", VehicleFromplaceMl ? VehicleFromplaceMl : null);
        sessionStorage.setItem("VehicleToPlaceMl", VehicleToPlaceMl ? VehicleToPlaceMl : null);
        sessionStorage.setItem("VehicleFirstHaltEn", VehicleFirstHaltEn ? VehicleFirstHaltEn : null);
        sessionStorage.setItem("VehicleFirstHaltMl", VehicleFirstHaltMl ? VehicleFirstHaltMl : null);
        sessionStorage.setItem("VehicleHospitalEn", VehicleHospitalEn ? VehicleHospitalEn.code : null);
        sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
        sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
      }
      if (DeathPlace.code === "PUBLIC_PLACES") {
        sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
        sessionStorage.setItem("DeathPlaceLocalityEn", DeathPlaceLocalityEn ? DeathPlaceLocalityEn : null);
        sessionStorage.setItem("DeathPlaceLocalityMl", DeathPlaceLocalityMl ? DeathPlaceLocalityMl : null);
        sessionStorage.setItem("DeathPlaceStreetEn", DeathPlaceStreetEn ? DeathPlaceStreetEn : null);
        sessionStorage.setItem("DeathPlaceStreetMl", DeathPlaceStreetMl ? DeathPlaceStreetMl : null);
        sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
        sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId : null);
      }
      if (DeathPlace.code === "OUTSIDE_JURISDICTION") {
        sessionStorage.setItem("DeathPlaceCountry", DeathPlaceCountry ? DeathPlaceCountry.code : null);
        sessionStorage.setItem("DeathPlaceState", DeathPlaceState ? DeathPlaceState.code : null);
        sessionStorage.setItem("DeathPlaceDistrict", DeathPlaceDistrict ? DeathPlaceDistrict.code : null);
        sessionStorage.setItem("DeathPlaceCity", DeathPlaceCity ? DeathPlaceCity : null);
        sessionStorage.setItem("DeathPlaceRemarksEn", DeathPlaceRemarksEn ? DeathPlaceRemarksEn : null);
        sessionStorage.setItem("DeathPlaceRemarksMl", DeathPlaceRemarksMl ? DeathPlaceRemarksMl : null);
        sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
        sessionStorage.setItem("PlaceOfBurialEn", PlaceOfBurialEn ? PlaceOfBurialEn : null);
        sessionStorage.setItem("PlaceOfBurialMl", PlaceOfBurialMl ? PlaceOfBurialMl : null);
        sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
      }
      let IsEditChangeScreen = iseditDeath ? iseditDeath : false;

      onSelect(config.key, {
        IsEditChangeScreen,
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
        DeathPlaceHomehoueNameEn,
        DeathPlaceHomehoueNameMl,
        DeathPlaceHomelocalityEn,
        DeathPlaceHomelocalityMl,
        DeathPlaceHomestreetNameEn,
        DeathPlaceHomestreetNameMl,
        DeathPlaceHomepostofficeId,
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
      });
    }
  };
  if (
    iseditDeath &&
    isEditDeathPageComponents === false &&
    (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
  ) {
    if (formData?.InformationDeath?.DeceasedGender != null) {
      if (menu.length > 0 && (DeceasedGender === undefined || DeceasedGender === "")) {
        setselectedDeceasedGender(menu.filter((menu) => menu.code === formData?.InformationDeath?.DeceasedGender)[0]);
      }
    }
    if (formData?.InformationDeath?.DeathPlace != null) {
      if (cmbPlace.length > 0 && (DeathPlace === undefined || DeathPlace === "")) {
        setselectDeathPlace(cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]);
        setValue(formData?.InformationDeath?.DeathPlace);
      }
    }
    // if (formData?.ChildDetails?.medicalAttensionSub != null) {
    //   if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
    //     setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.ChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.deliveryMethods != null) {
    //   if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
    //     // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.ChildDetails?.deliveryMethods)[0]);
    //     setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]);
    //   }
    // }
  }
  if (isWorkFlowDetailsLoading) {
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
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH")}`}</span>
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_PLACE_OF_DEATH")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={false}
                  option={cmbPlace}
                  selected={DeathPlace}
                  select={selectDeathPlace}
                  disabled={isEdit}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
              </div>
              {/* {value === "HOSPITAL" && (
          <div className="col-md-6">
            <Hospital selectDeathPlaceType={selectDeathPlaceType} DeathPlaceType={DeathPlaceType} />
          </div>
        )}
        {value === "INSTITUTION" && (
         <div className="col-md-6">
            <Institution
              selectDeathPlaceType={selectDeathPlaceType}
              DeathPlaceType={DeathPlaceType}
              DeathPlaceInstId={DeathPlaceInstId}
              setSelectedDeathPlaceInstId={setSelectedDeathPlaceInstId}
            />
          </div>
        )} */}
            </div>
          </div>
          {value === "HOSPITAL" && (
            <div>
              <Hospital
                formData={formData}
                iseditDeath={iseditDeath}
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
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
                DeathPlaceHomepostofficeId={DeathPlaceHomepostofficeId}
                setDeathPlaceHomepostofficeId={setDeathPlaceHomepostofficeId}
                DeathPlaceHomepincode={DeathPlaceHomepincode}
                setDeathPlaceHomepincode={setDeathPlaceHomepincode}
                DeathPlaceHomehoueNameEn={DeathPlaceHomehoueNameEn}
                setDeathPlaceHomehoueNameEn={setDeathPlaceHomehoueNameEn}
                DeathPlaceHomehoueNameMl={DeathPlaceHomehoueNameMl}
                setDeathPlaceHomehoueNameMl={setDeathPlaceHomehoueNameMl}
                DeathPlaceHomelocalityEn={DeathPlaceHomelocalityEn}
                setDeathPlaceHomelocalityEn={setDeathPlaceHomelocalityEn}
                DeathPlaceHomelocalityMl={DeathPlaceHomelocalityMl}
                setDeathPlaceHomelocalityMl={setDeathPlaceHomelocalityMl}
                DeathPlaceHomestreetNameEn={DeathPlaceHomestreetNameEn}
                setDeathPlaceHomestreetNameEn={setDeathPlaceHomestreetNameEn}
                DeathPlaceHomestreetNameMl={DeathPlaceHomestreetNameMl}
                setDeathPlaceHomestreetNameMl={setDeathPlaceHomestreetNameMl}
              />
            </div>
          )}
          {value === "VEHICLE" && (
            <div>
              <DeathPlaceVehicle
                formData={formData}
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
          )}

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
                    isMandatory={false}
                    option={cmbAgeUnit}
                    selected={DeceasedIdproofType}
                    select={selectDeceasedIdproofType}
                    disabled={isEdit}
                    placeholder={`${t("CR_ID_DETAILS_OF_DECEASED")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("CR_ID_NO")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="DeceasedIdproofNo"
                    value={DeceasedIdproofNo}
                    onChange={setSelectDeceasedIdproofNo}
                    disable={isEdit}
                    placeholder={`${t("CR_ID_NO")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                  />
                </div>
              </div>
            </div>
          )}
          {DeceasedAadharNotAvailable === false && (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_AADHAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="DeceasedAadharNumber"
                    value={DeceasedAadharNumber}
                    onChange={setSelectDeceasedAadharNumber}
                    disable={isEdit}
                    placeholder={`${t("CR_AADHAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameEn"
                  value={DeceasedFirstNameEn}
                  onChange={setSelectDeceasedFirstNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_FIRST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameEn"
                  value={DeceasedMiddleNameEn}
                  onChange={setSelectDeceasedMiddleNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameEn"
                  value={DeceasedLastNameEn}
                  onChange={setSelectDeceasedLastNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_LAST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_ML")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameMl"
                  value={DeceasedFirstNameMl}
                  onChange={setSelectDeceasedFirstNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_FIRST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_FIRST_NAME_ML"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameMl"
                  value={DeceasedMiddleNameMl}
                  onChange={setSelectDeceasedMiddleNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_INVALID_MIDDLE_NAME_ML"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameMl"
                  value={DeceasedLastNameMl}
                  onChange={setSelectDeceasedLastNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_INVALID_LAST_NAME_ML"),
                  })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-2">
                <CardLabel>
                  {`${t("CR_AGE")}`}
                  <span className="mandatorycss">*</span>{" "}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type="number"
                  optionKey="i18nKey"
                  name="Age"
                  onChange={setSelectAge}
                  value={Age}
                  disable={isEdit}
                  placeholder={`${t("CR_AGE")}`}
                  {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CS_COMMON_INVALID_AGE") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {`${t("CR_AGE_UNIT")}`}
                  <span className="mandatorycss">*</span>{" "}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbAgeUnit}
                  selected={AgeUnit}
                  select={selectAgeUnit}
                  disabled={isEdit}
                  placeholder={`${t("CR_AGE_UNIT")}`}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {t("CR_GENDER")} <span className="mandatorycss">*</span>{" "}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={DeceasedGender}
                  select={selectDeceasedGender}
                  disabled={isEdit}
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {t("CR_NATIONALITY")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="nationalityname"
                  isMandatory={true}
                  option={cmbNation}
                  selected={Nationality}
                  select={selectNationality}
                  disabled={isEdit}
                  placeholder={`${t("CR_NATIONALITY")}`}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>
                  {t("CS_COMMON_RELIGION")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbReligion}
                  selected={Religion}
                  select={selectReligion}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_RELIGION")}`}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>{t("CR_PROFESSIONAL")}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbOccupationMain}
                  selected={Occupation}
                  select={selectOccupation}
                  disabled={isEdit}
                  placeholder={`${t("CR_PROFESSIONAL")}`}
                />
              </div>
            </div>
          </div>
          {/* <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_OCCUPATION_DECEASED_NO")} onChange={() => setChecked((checked) => !checked)} value={checked} />
          </div>
        </div> */}
          {/* <div className="row">
          {checked ? null : (
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_OCCUPATION_MAIN_LEVEL")}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbOccupationMain}
                selected={Occupation}
                select={selectOccupation}WardNameError
                disabled={isEdit}
                placeholder={`${t("CR_OCCUPATION_MAIN_LEVEL")}`}
              />
            </div>
          </div>
           )}
        </div> */}

          {toast && (
            <Toast
              error={DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || AgeError || sexError || WardNameError}
              label={
                DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || AgeError || sexError || WardNameError
                  ? DOBError
                    ? t(`CR_INVALID_DATE`)
                    : sexError
                    ? t(`DEATH_ERROR_SEX_CHOOSE`)
                    : AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : HospitalError
                    ? t(`CR_ERROR_HOSPITAL_CHOOSE`)
                    : InstitutionError
                    ? t(`CR_ERROR_INSTITUTION_TYPE_CHOOSE`)
                    : InstitutionNameError
                    ? t(`CR_ERROR_INSTITUTION_NAME_CHOOSE`)
                    : AgeError
                    ? t(`CR_ERROR_AGE_CHOOSE`)
                    : WardNameError
                    ? t(`CR_ERROR_WARD_CHOOSE`)
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
  }
};
export default InformationDeath;
