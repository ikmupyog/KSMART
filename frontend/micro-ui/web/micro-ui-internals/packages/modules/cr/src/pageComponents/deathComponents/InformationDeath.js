import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, Loader, BackButton, UploadFile, PopUp, Toast, CardText } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import Hospital from "./Hospital";
import Institution from "./Institution";
import DeathPlaceHome from "./DeathPlaceHome";
import DeathPlaceVehicle from "./DeathPlaceVehicle";
import DeathPublicPlace from "./DeathPublicPlace";
import DeathOutsideJurisdiction from "./DeathOutsideJurisdiction ";
import { sortDropdownNames } from "../../utils";
// import _ from "lodash";
// import { STATE_CODE } from "../../config/constants";

const InformationDeath = ({ config, onSelect, userType, formData, isEditDeath = false }) => {
  console.log(isEditDeath);
  console.log(formData);
  // console.log(JSON.stringify(formData));  
  sessionStorage.removeItem("applicationNumber");
  const [isEditDeathPageComponents, setIsEditDeathPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(false);
  //const [isDisableEdit, setisDisableEdit] = useState(isEditDeath ? isEditDeath : false);
  const stateId = Digit.ULBService.getStateId();
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [workFlowCode, setWorkFlowCode] = useState(formData?.InformationDeath?.workFlowCode);
  const [workFlowAmount, setWorkFlowAmount] = useState(formData?.InformationDeath?.workFlowAmount);
  const [isPayment, setIsPayment] = useState(formData?.InformationDeath?.isPayment);

  const [NACFile, setNACFile] = useState(formData?.InformationDeath?.uploadedFile ? formData?.InformationDeath?.uploadedFile : null);
  const [uploadedFile, setUploadedFile] = useState(formData?.InformationDeath?.uploadedFile ? formData?.InformationDeath?.uploadedFile : null);
  const [error, setError] = useState(null);
  const [popUpState, setpopUpState] = useState(false);
  const [popUpStateNac, setpopUpStateNac] = useState(false);
  const [UploadNACHIde, setUploadNACHIde] = useState(formData?.InformationDeath?.UploadNACHIde ? true : false);

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  // const [cmbAgeUnitFilter, setcmbAgeUnitFilter] = useState();

  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "WorkFlowDeath");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Menu, isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: documentType = {}, isdocmentLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "IdProofDetails");
  const { data: AgeUnitvalue = {}, isAgeUnitLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AgeUnit");
  const { data: Profession = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: State = {}, isStateLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  //const { uuid: uuid } = Digit.UserService.getUser().info;
  const [userRole, setuserRole] = useState(formData?.InformationDeath?.userRole);
  const [isDisableEditRole, setisDisableEditRole] = useState(false);
  const [hospitalCode, sethospitalCode] = useState(formData?.InformationDeath?.hospitalCode);
  const { roles: userRoles, uuid: uuid, } = Digit.UserService.getUser().info;
  const roletemp = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("HOSPITAL_OPERATOR"));
  const convertEpochFormateToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${day}/${month}/${year}`;
    } else {
      return null;
    }
  };
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
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
    place["common-masters"] &&
    place["common-masters"].PlaceMasterDeath &&
    place["common-masters"].PlaceMasterDeath.map((ob) => {
      cmbPlace.push(ob);
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

  const [DateOfDeath, setDateOfDeath] = useState(isEditDeath ? convertEpochToDate(formData?.InformationDeath?.DateOfDeath) : formData?.InformationDeath?.DateOfDeath);
  const [FromDate, setFromDate] = useState(isEditDeath ? convertEpochToDate(formData?.InformationDeath?.FromDate) : formData?.InformationDeath?.FromDate);
  const [ToDate, setToDate] = useState(isEditDeath ? convertEpochToDate(formData?.InformationDeath?.ToDate) : formData?.InformationDeath?.ToDate);

  const handleFromTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };

  const [DeathDateUnavailable, setChecked] = useState(
    formData?.InformationDeath?.DeathDateUnavailable
      ? formData?.InformationDeath?.DeathDateUnavailable
      : formData?.InformationDeath?.DeathDateUnavailable
        ? formData?.InformationDeath?.DeathDateUnavailable
        : false
  );
  const [TimeOfDeath, setDeathTime] = useState(formData?.InformationDeath?.TimeOfDeath ? formData?.InformationDeath?.TimeOfDeath : "");

  const [DeceasedAadharNotAvailable, setDeceasedAadharNotAvailable] = useState(
    formData?.InformationDeath?.DeceasedAadharNotAvailable ? formData?.InformationDeath?.DeceasedAadharNotAvailable : false
  );
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(
    formData?.InformationDeath?.DeceasedAadharNumber ? formData?.InformationDeath?.DeceasedAadharNumber : null);

  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);
  const [DeceasedIdproofType, setSelectedDeceasedIdproofType] = useState(
    formData?.InformationDeath?.DeceasedIdproofType ? formData?.InformationDeath?.DeceasedIdproofType : null
  );
  const [DeceasedIdproofNo, setDeceasedIdproofNo] = useState(
    formData?.InformationDeath?.DeceasedIdproofNo ? formData?.InformationDeath?.DeceasedIdproofNo : null
  );

  const handleDropdownChange = () => {
    setIsTextboxEnabled(true);
  };
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
  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);

  const [proceedNoRDO, setproceedNoRDO] = useState(formData?.InformationDeath?.proceedNoRDO ? formData?.InformationDeath?.proceedNoRDO : "");
  const [regNoNAC, setregNoNAC] = useState(formData?.InformationDeath?.regNoNAC ? formData?.InformationDeath?.regNoNAC : "");
  const [isInitialRenderuploadDoc, setisInitialRenderuploadDoc] = useState(true);


  const getAgeUnitOptions = () => {
    if (Age <= 11) {
      return cmbAgeUnit;
    } else if (Age > 11 && Age <= 23) {
      return cmbAgeUnit.filter(
        (cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS" || cmbAgeUnit.code === "AGE_UNIT_DAYS" || cmbAgeUnit.code === "AGE_UNIT_HOURS"
      );
    } else if (Age > 23 && Age <= 29) {
      return cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS" || cmbAgeUnit.code === "AGE_UNIT_DAYS");
    } else if (Age > 29 && Age <= 120) {
      return cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === "AGE_UNIT_YEARS");
    }
  };

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
  const [DifferenceInTime, setDifferenceInTime] = useState(formData?.InformationDeath?.DifferenceInTime);
  const [DifferenceInDaysRounded, setDifferenceInDaysRounded] = useState();

  const [CommencementDate, setCommencementDate] = useState(
    formData?.InformationDeath?.CommencementDate ? formData?.InformationDeath?.CommencementDate : ""
  );

  const [AgeUnit, setSelectedAgeUnit] = useState(
    formData?.InformationDeath?.AgeUnit?.code
      ? formData?.InformationDeath?.AgeUnit
      : formData?.InformationDeath?.AgeUnit
        ? cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeath?.AgeUnit)[0]
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
  const [DeathPlace, setselectDeathPlace] = useState(
    formData?.InformationDeath?.DeathPlace?.code
      ? formData?.InformationDeath?.DeathPlace
      : formData?.InformationDeath?.DeathPlace
        ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]
        : ""
  );

  // const [DeathPlace, setselectDeathPlace] = useState(cmbPlace?(cmbPlace.filter(cmbPlace=>cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]) :formData?.InformationDeath?.DeathPlace) ;
  //Hospital, Intitution, vehicle, Public Place {DeathPlaceType}
  const [hospitalNameEn, selecthospitalNameEn] = useState(
    formData?.InformationDeath?.hospitalNameEn?.code
      ? formData?.InformationDeath?.hospitalNameEn
      : formData?.InformationDeath?.hospitalNameEn
        ? ""
        : ""
  );
  const [HospitalNameMl, selectHospitalNameMl] = useState(
    formData?.InformationDeath?.HospitalNameMl?.code
      ? formData?.InformationDeath?.HospitalNameMl
      : formData?.InformationDeath?.HospitalNameMl
        ? ""
        : ""
  );


  const [institution, selectinstitution] = useState(
    formData?.InformationDeath?.institution ? formData?.InformationDeath?.institution : null
  );
  const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(
    formData?.InformationDeath?.DeathPlaceInstId ? formData?.InformationDeath?.DeathPlaceInstId : null
  );
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.InformationDeath?.DeathPlaceInstId);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  // Home
  const [DeathPlaceHomePostofficeId, setDeathPlaceHomepostofficeId] = useState(
    formData?.InformationDeath?.DeathPlaceHomePostofficeId ? formData?.InformationDeath?.DeathPlaceHomePostofficeId : null
  );
  const [DeathPlaceHomePincode, setDeathPlaceHomepincode] = useState(
    formData?.InformationDeath?.DeathPlaceHomePincode ? formData?.InformationDeath?.DeathPlaceHomePincode : null
  );

  const [DeathPlaceHomeHoueNameEn, setDeathPlaceHomehoueNameEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeHoueNameEn ? formData?.InformationDeath?.DeathPlaceHomeHoueNameEn : null
  );
  const [DeathPlaceHomeLocalityEn, setDeathPlaceHomelocalityEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeLocalityEn ? formData?.InformationDeath?.DeathPlaceHomeLocalityEn : null
  );
  const [DeathPlaceHomeLocalityMl, setDeathPlaceHomelocalityMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeLocalityMl ? formData?.InformationDeath?.DeathPlaceHomeLocalityMl : null
  );
  const [DeathPlaceHomeStreetNameEn, setDeathPlaceHomestreetNameEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeStreetNameEn ? formData?.InformationDeath?.DeathPlaceHomeStreetNameEn : null
  );
  const [DeathPlaceHomeStreetNameMl, setDeathPlaceHomestreetNameMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeStreetNameMl ? formData?.InformationDeath?.DeathPlaceHomeStreetNameMl : null
  );
  const [DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomehoueNameMl ? formData?.InformationDeath?.DeathPlaceHomehoueNameMl : null
  );
  //Vehicle home OutsideJurisdiction{DeathPlaceWardId} Publicplace OutsideJurisdiction {GeneralRemarks} Publicplace {DeathPlaceWardId}
  //
  const [vehicleType, selectvehicleType] = useState(
    formData?.InformationDeath?.vehicleType ? formData?.InformationDeath?.vehicleType : null
  );
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
  const [DeathPlaceHomeWardId, setDeathPlaceHomeWardId] = useState(formData?.InformationDeath?.DeathPlaceHomeWardId);
  //Public Place
  const [publicPlaceType, selectpublicPlaceType] = useState(
    formData?.InformationDeath?.publicPlaceType ? formData?.InformationDeath?.publicPlaceType : null
  );
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
  const [isInitialRenderRoles, setInitialRenderRoles] = useState(true);
  // const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [isInitialRenderFormData, setisInitialRenderFormData] = useState(false);

  const [sexError, setsexError] = useState(false);
  const [DOBError, setDOBError] = useState(false);
  const [AadharError, setAadharError] = useState(false);
  const [DeceasedFirstNameEnError, setDeceasedFirstNameEnError] = useState(false);
  const [DeceasedFirstNameMlError, setDeceasedFirstNameMlError] = useState(false);
  const [DeceasedMiddleNameEnError, setDeceasedMiddleNameEnError] = useState(false);
  const [DeceasedMiddleNameMlError, setDeceasedMiddleNameMlError] = useState(false);
  const [DeceasedLastNameEnError, setDeceasedLastNameEnError] = useState(false);
  const [DeceasedLastNameMlError, setDeceasedLastNameMlError] = useState(false);
  const [HospitalError, setHospitalError] = useState(false);
  const [InstitutionError, setInstitutionError] = useState(false);
  const [InstitutionNameError, setInstitutionNameError] = useState(false);
  const [AgeError, setAgeError] = useState(false);
  const [AgeUnitError, setAgeUnitError] = useState(false);
  const [WardNameError, setWardNameError] = useState(false);

  const [DeathPlaceHomelocalityEnError, setDeathPlaceHomelocalityEnError] = useState(false);
  const [DeathPlaceHomehoueNameEnError, setDeathPlaceHomehoueNameEnError] = useState(false);
  const [DeathPlaceHomeStreetNameEnError, setDeathPlaceHomeStreetNameEnError] = useState(false);
  const [DeathPlaceHomelocalityMlError, setDeathPlaceHomelocalityMlError] = useState(false);
  const [DeathPlaceHomestreetNameMlError, setDeathPlaceHomestreetNameMlError] = useState(false);
  const [DeathPlaceHomehoueNameMlError, setDeathPlaceHomehoueNameMlError] = useState(false);
  const [VehicleFromplaceEnError, setVehicleFromplaceEnError] = useState(false);
  const [VehicleToPlaceEnError, setVehicleToPlaceEnError] = useState(false);
  const [VehicleNumberError, setvVehicleNumberError] = useState(false);
  const [vehicleTypeError, setvehicleTypeError] = useState(false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(false);
  const [VehicleFirstHaltEnError, setvehicleHaltPlaceError] = useState(false);
  const [GeneralRemarksError, setGeneralRemarksError] = useState(false);
  const [VehicleHospitalEnError, setVehicleHospitalEnError] = useState(false);
  const [DeathPlaceLocalityEnError, setDeathPlaceLocalityEnError] = useState(false);
  const [DeathPlaceLocalityMlError, setDeathPlaceLocalityMlError] = useState(false);

  // const [sexError, setsexError] = useState(formData?.InformationDeath?.sexError ? false : false);
  // const [DOBError, setDOBError] = useState(formData?.InformationDeath?.DateOfDeath ? false : false);
  // const [AadharError, setAadharError] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? false : false);
  // const [DeceasedFirstNameEnError, setDeceasedFirstNameEnError] = useState(formData?.InformationDeath?.DeceasedFirstNameEn ? false : false);
  // const [DeceasedFirstNameMlError, setDeceasedFirstNameMlError] = useState(formData?.InformationDeath?.DeceasedFirstNameMl ? false : false);
  // const [HospitalError, setHospitalError] = useState(formData?.InformationDeath?.hospitalNameEn ? false : false);
  // const [InstitutionError, setInstitutionError] = useState(formData?.InformationDeath?.institution ? false : false);
  // const [InstitutionNameError, setInstitutionNameError] = useState(formData?.InformationDeath?.DeathPlaceInstId ? false : false);
  // const [AgeError, setAgeError] = useState(formData?.InformationDeath?.Age ? false : false);
  // const [AgeUnitError, setAgeUnitError] = useState(formData?.InformationDeath?.AgeUnit ? false : false);
  // const [WardNameError, setWardNameError] = useState(formData?.InformationDeath?.DeathPlaceWardId ? false : false);

  // const [DeathPlaceHomelocalityEnError, setDeathPlaceHomelocalityEnError] = useState(formData?.InformationDeath?.DeathPlaceHomeLocalityEn ? false : false);
  // const [DeathPlaceHomehoueNameEnError, setDeathPlaceHomehoueNameEnError] = useState(formData?.InformationDeath?.DeathPlaceHomehoueNameEn ? false : false);
  // const [DeathPlaceHomeStreetNameEnError, setDeathPlaceHomeStreetNameEnError] = useState(formData?.InformationDeath?.DeathPlaceHomestreetNameEn ? false : false);
  // const [DeathPlaceHomelocalityMlError, setDeathPlaceHomelocalityMlError] = useState(formData?.InformationDeath?.DeathPlaceHomelocalityMl ? false : false);
  // const [DeathPlaceHomestreetNameMlError, setDeathPlaceHomestreetNameMlError] = useState(formData?.InformationDeath?.DeathPlaceHomestreetNameMl ? false : false);
  // const [DeathPlaceHomehoueNameMlError, setDeathPlaceHomehoueNameMlError] = useState(formData?.InformationDeath?.DeathPlaceHomehoueNameMl ? false : false);
  // const [VehicleFromplaceEnError, setVehicleFromplaceEnError] = useState(formData?.InformationDeath?.VehicleFromplaceEn ? false : false);
  // const [VehicleToPlaceEnError, setVehicleToPlaceEnError] = useState(formData?.InformationDeath?.setVehicleToPlaceEn ? false : false);
  // const [VehicleNumberError, setvVehicleNumberError] = useState(formData?.InformationDeath?.VehicleNumber ? false : false);
  // const [vehicleTypeError, setvehicleTypeError] = useState(formData?.InformationDeath?.vehicleType ? false : false);
  // const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(false);
  // const [VehicleFirstHaltEnError, setvehicleHaltPlaceError] = useState(formData?.InformationDeath?.VehicleFirstHaltEn ? false : false);
  // const [GeneralRemarksError, setGeneralRemarksError] = useState(formData?.InformationDeath?.GeneralRemarks ? false : false);
  // const [VehicleHospitalEnError, setVehicleHospitalEnError] = useState(formData?.InformationDeath?.VehicleHospitalEn ? false : false);
  // const [DeathPlaceLocalityEnError, setDeathPlaceLocalityEnError] = useState(formData?.InformationDeath?.DeathPlaceLocalityEn ? false : false);
  // const [DeathPlaceLocalityMlError, setDeathPlaceLocalityMlError] = useState(formData?.InformationDeath?.DeathPlaceLocalityMl ? false : false);
  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();
  useEffect(() => {
    if (isInitialRender) {
      if (Nationality == null || Nationality == "") {
        if (stateId === "kl" && cmbNation.length > 0) {
          cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
          setSelectedNationality(cmbfilterNation[0]);
        }
      }


      // if (Religion == null || Religion == "") {
      //   if (stateId === "kl" && cmbReligion.length > 0) {
      //     cmbfilterReligion = cmbReligion.filter((cmbReligion) => cmbReligion.name.includes("No Religion"));
      //     setSelectedReligion(cmbfilterReligion[0]);
      //   }
      // }

      // }

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
  const roleall = [];
  roleall.push(...roletemp);
  const rolecombine = [];
  roleall?.map?.((e) => {
    rolecombine.push(e.code);
  });
  const { data: userData, isLoading: PTALoading } = Digit.Hooks.useEmployeeSearch(
    tenantId,
    {
      roles: rolecombine?.map?.((e) => ({ code: e })),
      isActive: true,
      uuids: uuid,
      rolecodes: rolecombine?.map?.((e) => (e)).join(",")
    }
    // { enabled: !action?.isTerminateState }
  );

  const getHospitalCode = () => {
    if (userRoles[0].code === "HOSPITAL_OPERATOR") {
      const operatorHospDet = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("HOSPITAL_OPERATOR"));
      const tempArray = operatorHospDet?.map((ob) => {
        return ob.hospitalCode;
      });
      return tempArray?.[0];
    } else if (userRoles[0].code === "HOSPITAL_APPROVER") {
      const approverHospDet = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("HOSPITAL_APPROVER"));
      const tempArray = approverHospDet?.map((ob) => {
        return ob.hospitalCode
      });
      return tempArray?.[0];
    }
  }


  useEffect(() => {
    if (isInitialRenderRoles) {
      if (userRoles.length > 0) {
        if (userRoles[0].code === "HOSPITAL_OPERATOR") {
          if (cmbPlace.length > 0) {
            const operatorHospCode = getHospitalCode();
            if (operatorHospCode != null) {
              sethospitalCode(operatorHospCode);
            }
            selectDeathPlace(cmbPlace.filter(cmbPlace => cmbPlace.code === "HOSPITAL")[0]);
            setValue(cmbPlace.filter(cmbPlace => cmbPlace.code === "HOSPITAL")[0].code);
            setisDisableEditRole(true);
            setInitialRenderRoles(false);
          }
        } else if (userRoles[0].code === "HOSPITAL_APPROVER") {
          if (cmbPlace.length > 0) {
            const approverHospCode = getHospitalCode();
            if (approverHospCode != null) {
              sethospitalCode(approverHospCode);
            }
            selectDeathPlace(cmbPlace.filter(cmbPlace => cmbPlace.code === "HOSPITAL")[0]);
            setValue(cmbPlace.filter(cmbPlace => cmbPlace.code === "HOSPITAL")[0].code);
            setisDisableEditRole(true);
            setInitialRenderRoles(false);
          }
        }
      }
    }
  }, [cmbPlace, isInitialRenderRoles]);


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
          <Hospital
            hospitalNameEn={hospitalNameEn}
            HospitalNameMl={HospitalNameMl}
            hospitalCode={hospitalCode}
            isDisableEditRole={isDisableEditRole}
            setisDisableEditRole={setisDisableEditRole}
            userRoles={userRoles}
          />;
        }
        if (naturetype === "INSTITUTION") {
          <Institution
            institution={institution}
            DeathPlaceInstId={DeathPlaceInstId}
            InstitutionIdMl={InstitutionIdMl}
            InstitutionFilterList={InstitutionFilterList}
            isInitialRenderInstitutionList={isInitialRenderInstitutionList}
          />;
        }
        if (naturetype === "HOME") {
          <DeathPlaceHome
            DeathPlaceHomeWardId={DeathPlaceHomeWardId}
            // DeathPlaceType={DeathPlaceType}
            DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
            DeathPlaceHomePincode={DeathPlaceHomePincode}
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
            vehicleType={vehicleType}
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
            publicPlaceType={publicPlaceType}
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

  useEffect(() => {
    (async () => {
      setError(null);
      if (NACFile) {
        if (NACFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", NACFile, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) { }
        }
      }
    })();
  }, [NACFile]);

  function selectFromDate(value) {
    setFromDate(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deathDate = new Date(value);
    deathDate.setHours(0, 0, 0, 0);

    if (deathDate.getTime() <= today.getTime()) {

      setDOBError(false);
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      // console.log("Difference_In_Time" + Difference_In_Time);
      setDifferenceInTime(today.getTime() - deathDate.getTime());
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      // console.log("Difference_In_Days" + Math.floor(Difference_In_Days));
      setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      if (DeathPlace) {
        let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.DeathPlace === DeathPlace.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
        if (currentWorgFlow.length > 0) {
          setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
          setIsPayment(currentWorgFlow[0].payment);
          setAmount(currentWorgFlow[0].amount);
        }
      }

      // if (Difference_In_Days > 365) {
      //   setUploadNACHIde(true);
      //   setpopUpState(true);
      // } else {
      //    setUploadNACHIde(false);
      //   setpopUpState(false);

      // }
    }
  }


  function selectToDate(value) {
    setToDate(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deathDate = new Date(value);
    deathDate.setHours(0, 0, 0, 0);
    if (deathDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      // console.log("Difference_In_Time" + Difference_In_Time);
      setDifferenceInTime(today.getTime() - deathDate.getTime());
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      // console.log("Difference_In_Days" + Math.floor(Difference_In_Days));
      setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      if (DeathPlace) {
        let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.DeathPlace === DeathPlace.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
        if (currentWorgFlow.length > 0) {
          setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
          setIsPayment(currentWorgFlow[0].payment);
          setAmount(currentWorgFlow[0].amount);
        }
      }
      if (Difference_In_Days > 365) {
        setUploadNACHIde(true);
        setpopUpState(true);
      } else {
        setUploadNACHIde(false);
        setpopUpState(false);

      }
    }
  }
  function selectDeathDate(value) {
    setDateOfDeath(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deathDate = new Date(value);
    deathDate.setHours(0, 0, 0, 0);

    if (deathDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - deathDate.getTime();
      // console.log("Difference_In_Time" + Difference_In_Time);
      setDifferenceInTime(today.getTime() - deathDate.getTime());
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      if (DeathPlace) {
        let currentWorgFlow = workFlowData.filter((workFlowData) => workFlowData.DeathPlace === DeathPlace.code && workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime);
        if (currentWorgFlow.length > 0) {
          // console.log(currentWorgFlow[0].WorkflowCode);
          setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
          setIsPayment(currentWorgFlow[0].payment);
          setWorkFlowAmount(currentWorgFlow[0].amount);

        }

      }
      if (Difference_In_Days > 365) {
        setUploadNACHIde(true);
        setpopUpState(true);
      } else {
        setUploadNACHIde(false);
        setpopUpState(false);

      }
    }
  }
  let wardNameEn = "";
  let wardNameMl = "";
  let wardNumber = "";
  function setCheckSpecialCharSpace(e) {
    let pattern = /^[a-zA-Z-.`' ]*$/;
    if (!(e.key.match(pattern)) && e.code === 'Space') {
      e.preventDefault();
    }
  }
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function selectReligion(value) {
    setSelectedReligion(value);
  }
  function selectNationality(value) {
    setSelectedNationality(value);
  }
  function selectDeceasedGender(value) {
    setselectedDeceasedGender(value);
  }
  function setSelectDeceasedLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C @]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedLastNameMl("");
    } else {
      setDeceasedLastNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C @]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedMiddleNameMl("");
    } else {
      setDeceasedMiddleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C @]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setDeceasedFirstNameMl("");
    } else {
      setDeceasedFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }


  function setSelectDeceasedFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z @]*$") != null) {
      setDeceasedFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z @]*$") != null) {
      setDeceasedMiddleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectDeceasedLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z @]*$") != null) {
      setDeceasedLastNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }


  function setSelectDeceasedAadharNumber(e) {
    if (e.target.value.trim().length >= 0) {
      setDeceasedAadharNumber(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
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
    let currentWorgFlow = workFlowData.filter(
      (workFlowData) =>
        workFlowData.DeathPlace === value.code && workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime
    );
    if (currentWorgFlow.length > 0) {
      // console.log(currentWorgFlow[0].WorkflowCode);
      setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
      setIsPayment(currentWorgFlow[0].payment);
      setWorkFlowAmount(currentWorgFlow[0].amount);
    }
    clearDeathPlace(value);
  }
  function clearDeathPlace(value) {
    if (value.code === "HOSPITAL") {
      selectinstitution("");
      setSelectedDeathPlaceInstId("");
      setInstitutionIdMl("");
      setDeathPlaceHomepostofficeId("");
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn("");
      setDeathPlaceHomehoueNameMl("");
      setDeathPlaceHomelocalityEn("");
      setDeathPlaceHomelocalityMl("");
      setDeathPlaceHomestreetNameEn("");
      setDeathPlaceHomestreetNameMl("");
      setDeathPlaceWardId("");
      setDeathPlaceHomeWardId("");
      selectvehicleType("");
      setVehicleNumber("");
      setVehicleFromplaceEn("");
      setVehicleToPlaceEn("");
      setVehicleFromplaceMl("");
      setVehicleFirstHaltEn("");
      setVehicleToPlaceMl("");
      setGeneralRemarks("");
      setSelectedVehicleHospitalEn("");
      selectpublicPlaceType("");
      setDeathPlaceLocalityEn("");
      setDeathPlaceLocalityMl("");
      setDeathPlaceStreetEn("");
      setDeathPlaceStreetMl("");
      setGeneralRemarks("");
    } else if (value.code === "INSTITUTION") {
      selecthospitalNameEn("");
      selectHospitalNameMl("");
      setDeathPlaceHomepostofficeId("");
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn("");
      setDeathPlaceHomehoueNameMl("");
      setDeathPlaceHomelocalityEn("");
      setDeathPlaceHomelocalityMl("");
      setDeathPlaceHomestreetNameEn("");
      setDeathPlaceHomestreetNameMl("");
      setDeathPlaceWardId("");
      setDeathPlaceHomeWardId("");
      selectvehicleType("");
      setVehicleNumber("");
      setVehicleFromplaceEn("");
      setVehicleToPlaceEn("");
      setVehicleFromplaceMl("");
      setVehicleFirstHaltEn("");
      setVehicleToPlaceMl("");
      setGeneralRemarks("");
      setSelectedVehicleHospitalEn("");
      selectpublicPlaceType("");
      setDeathPlaceLocalityEn("");
      setDeathPlaceLocalityMl("");
      setDeathPlaceStreetEn("");
      setDeathPlaceStreetMl("");
      setGeneralRemarks("");
    } else if (value.code === "HOME") {
      selecthospitalNameEn("");
      selectHospitalNameMl("");
      selectinstitution("");
      setSelectedDeathPlaceInstId("");
      setInstitutionIdMl("");
      selectvehicleType("");
      setVehicleNumber("");
      setVehicleFromplaceEn("");
      setVehicleToPlaceEn("");
      setVehicleFromplaceMl("");
      setVehicleFirstHaltEn("");
      setVehicleToPlaceMl("");
      setGeneralRemarks("");
      setSelectedVehicleHospitalEn("");
      selectpublicPlaceType("");
      setDeathPlaceLocalityEn("");
      setDeathPlaceLocalityMl("");
      setDeathPlaceStreetEn("");
      setDeathPlaceStreetMl("");
      setGeneralRemarks("");
    } else if (value.code === "VEHICLE") {
      selecthospitalNameEn("");
      selectHospitalNameMl("");
      selectinstitution("");
      setSelectedDeathPlaceInstId("");
      setInstitutionIdMl("");
      setDeathPlaceHomepostofficeId("");
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn("");
      setDeathPlaceHomehoueNameMl("");
      setDeathPlaceHomelocalityEn("");
      setDeathPlaceHomelocalityMl("");
      setDeathPlaceHomestreetNameEn("");
      setDeathPlaceHomestreetNameMl("");
      setDeathPlaceWardId("");
      setDeathPlaceHomeWardId("");
      selectpublicPlaceType("");
      setDeathPlaceLocalityEn("");
      setDeathPlaceLocalityMl("");
      setDeathPlaceStreetEn("");
      setDeathPlaceStreetMl("");
      setGeneralRemarks("");
    } else if (value.code === "PUBLIC_PLACES") {
      selecthospitalNameEn("");
      selectHospitalNameMl("");
      selectinstitution("");
      setSelectedDeathPlaceInstId("");
      setInstitutionIdMl("");
      setDeathPlaceHomepostofficeId("");
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn("");
      setDeathPlaceHomehoueNameMl("");
      setDeathPlaceHomelocalityEn("");
      setDeathPlaceHomelocalityMl("");
      setDeathPlaceHomestreetNameEn("");
      setDeathPlaceHomestreetNameMl("");
      setDeathPlaceWardId("");
      setDeathPlaceHomeWardId("");
      selectvehicleType("");
      setVehicleNumber("");
      setVehicleFromplaceEn("");
      setVehicleToPlaceEn("");
      setVehicleFromplaceMl("");
      setVehicleFirstHaltEn("");
      setVehicleToPlaceMl("");
      setGeneralRemarks("");
      setSelectedVehicleHospitalEn("");
    } else if (value.code === "OUTSIDE_JURISDICTION") {
      setSelectDeathPlaceCountry("");
      SelectDeathPlaceState("");
      SelectDeathPlaceDistrict("");
      SelectDeathPlaceCity("");
      setDeathPlaceHomeWardId("");
      SelectDeathPlaceRemarksEn("");
      SelectDeathPlaceRemarksMl("");
      setDeathPlaceWardId("");
      SelectPlaceOfBurialEn("");
      SelectPlaceOfBurialMl("");
      setGeneralRemarks("");
    }
  }
  function setSelectAge(e) {
    if (e.target.value.trim().length >= 0) {
      setAge(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
      // getAgeUnitOptions(e.target.value);
    }
  }
  function selectAgeUnit(value) {
    setSelectedAgeUnit(value);
  }
  function selectDeceasedIdproofType(value) {
    setSelectedDeceasedIdproofType(value);
    setIsTextboxEnabled(true);
  }

  function setSelectproceedNoRDO(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9 ]*$") != null)) {
      setproceedNoRDO(e.target.value.trim().length <= 20 ? e.target.value : (e.target.value).substring(0, 20));
    }
  }
  function setSelectregNoNAC(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9 ]*$") != null)) {
      setregNoNAC(e.target.value.trim().length <= 20 ? e.target.value : (e.target.value).substring(0, 20));
    }
  }
  function selectfile(e) {
    setNACFile(e.target.files[0]);
  }


  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      console.log(value);
      // let hour = value;
      // let period = hour > 12 ? "PM" : "AM";
      // console.log(period);
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
      setAadharError(false);
      setToast(false);
    }
  }
  const goNext = () => {

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
    if (DeceasedAadharNumber === null || DeceasedAadharNumber.trim() === '' || DeceasedAadharNumber.trim() === undefined) {
      setDeceasedAadharNumber("");
    } else if (DeceasedAadharNumber != null && DeceasedAadharNumber != "") {
      let adharLength = DeceasedAadharNumber;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAadharError(false);
      }
    }
    if (DeceasedFirstNameEn.trim() == null || DeceasedFirstNameEn.trim() == '' || DeceasedFirstNameEn.trim() == undefined) {
      validFlag = false;
      setDeceasedFirstNameEn("");
      setDeceasedFirstNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeceasedFirstNameEnError(false);
    }
    if (DeceasedMiddleNameEn.trim() == null || DeceasedMiddleNameEn.trim() == '' || DeceasedMiddleNameEn.trim() == undefined) {
      setDeceasedMiddleNameEn("");
    } else {
      if (DeceasedMiddleNameMl.trim() == null || DeceasedMiddleNameMl.trim() == '' || DeceasedMiddleNameMl.trim() == undefined) {
        validFlag = false;
        setDeceasedMiddleNameMl("");
        setDeceasedMiddleNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeceasedMiddleNameMlError(false);
      }
    }

    if (DeceasedLastNameEn.trim() == null || DeceasedLastNameEn.trim() == '' || DeceasedLastNameEn.trim() == undefined) {
      setDeceasedLastNameEn("");
    } else {
      if (DeceasedLastNameMl.trim() == null || DeceasedLastNameMl.trim() == '' || DeceasedLastNameMl.trim() == undefined) {
        validFlag = false;
        setDeceasedLastNameMl("");
        setDeceasedLastNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeceasedLastNameMlError(false);
      }
    }

    if (DeceasedFirstNameMl.trim() == null || DeceasedFirstNameMl.trim() == '' || DeceasedFirstNameMl.trim() == undefined) {
      validFlag = false;
      setDeceasedFirstNameMl("");
      setDeceasedFirstNameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeceasedFirstNameMlError(false);
    }
    if (DeceasedMiddleNameMl.trim() == null || DeceasedMiddleNameMl.trim() == '' || DeceasedMiddleNameMl.trim() == undefined) {
      setDeceasedMiddleNameMl("");
      setDeceasedMiddleNameEnError(false);
    } else {
      if (DeceasedMiddleNameEn.trim() == null || DeceasedMiddleNameEn.trim() == '' || DeceasedMiddleNameEn.trim() == undefined) {
        validFlag = false;
        setDeceasedMiddleNameEn("");
        setDeceasedMiddleNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeceasedMiddleNameEnError(false);
      }
    }

    if (DeceasedLastNameMl.trim() == null || DeceasedLastNameMl.trim() == '' || DeceasedLastNameMl.trim() == undefined) {
      setDeceasedLastNameMl("");
      setDeceasedLastNameEnError(false);
    } else {
      if (DeceasedLastNameEn.trim() == null || DeceasedLastNameEn.trim() == '' || DeceasedLastNameEn.trim() == undefined) {
        validFlag = false;
        setDeceasedLastNameEn("");
        setDeceasedLastNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeceasedLastNameEnError(false);
      }
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
    if (AgeUnit == null || AgeUnit == "" || AgeUnit == undefined) {
      validFlag = false;
      setAgeUnitError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAgeUnitError(false);
    }

    if (DeathPlace.code == "HOSPITAL") {
      if (hospitalNameEn == null || HospitalNameMl === null) {
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        DeathPlaceTypecode = hospitalNameEn.code;
        sethospitalCode(hospitalNameEn.code);
        setHospitalError(false);
      }

    } else if (DeathPlace.code === "INSTITUTION") {
      if (institution == null) {
        setInstitutionError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        DeathPlaceTypecode = institution.code;
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
    else if (DeathPlace.code === "HOME") {
      if (DeathPlaceHomeLocalityEn.trim() == null || DeathPlaceHomeLocalityEn.trim() == '' || DeathPlaceHomeLocalityEn.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomelocalityEn("");
        setDeathPlaceHomelocalityEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomelocalityEnError(false);
      }

      if (DeathPlaceHomeHoueNameEn.trim() == null || DeathPlaceHomeHoueNameEn.trim() == '' || DeathPlaceHomeHoueNameEn.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomehoueNameEn("");
        setDeathPlaceHomehoueNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomehoueNameEnError(false);
      }
      if (DeathPlaceHomeLocalityMl.trim() == null || DeathPlaceHomeLocalityMl.trim() == '' || DeathPlaceHomeLocalityMl.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomelocalityMl("");
        setDeathPlaceHomelocalityMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomelocalityMlError(false);
      }
      if (DeathPlaceHomehoueNameMl.trim() == null || DeathPlaceHomehoueNameMl.trim() == '' || DeathPlaceHomehoueNameMl.trim() == undefined) {
        validFlag = false;
        setDeathPlaceHomehoueNameMl("");
        setDeathPlaceHomehoueNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceHomehoueNameMlError(false);
      }
      if (DeathPlaceHomeStreetNameEn === null || DeathPlaceHomeStreetNameEn.trim() === '' || DeathPlaceHomeStreetNameEn.trim() === undefined) {
        setDeathPlaceHomestreetNameEn("");
      } else {
        if (DeathPlaceHomeStreetNameEn != null && (DeathPlaceHomeStreetNameMl === null || DeathPlaceHomeStreetNameMl.trim() === '' || DeathPlaceHomeStreetNameMl.trim() === undefined)) {
          validFlag = false;
          setDeathPlaceHomestreetNameMl("");
          setDeathPlaceHomestreetNameMlError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setDeathPlaceHomestreetNameMlError(false);
        }
      }
      if (DeathPlaceHomeStreetNameMl === null || DeathPlaceHomeStreetNameMl.trim() === '' || DeathPlaceHomeStreetNameMl.trim() === undefined) {
        setDeathPlaceHomestreetNameMl("");
      } else {
        if (DeathPlaceHomeStreetNameMl != null && (DeathPlaceHomeStreetNameEn === null || DeathPlaceHomeStreetNameEn.trim() === '' || DeathPlaceHomeStreetNameEn.trim() === undefined)) {
          validFlag = false;
          setDeathPlaceHomestreetNameEn("");
          setDeathPlaceHomeStreetNameEnError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setDeathPlaceHomeStreetNameEnError(false);
        }
      }
    } else if (DeathPlace.code === "VEHICLE") {

      if (vehicleType == null || vehicleType == "" || vehicleType == undefined) {
        validFlag = false;
        setvehicleTypeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehicleTypeError(false);
      }
      if (VehicleNumber == null || VehicleNumber == "" || VehicleNumber == undefined) {
        validFlag = false;
        setvVehicleNumberError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvVehicleNumberError(false);
      }
      if (GeneralRemarks == null || GeneralRemarks == "" || GeneralRemarks == undefined) {
        validFlag = false;
        setvehiDesDetailsEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehiDesDetailsEnError(false);
      }
      if (VehicleHospitalEn == null || VehicleHospitalEn == "" || VehicleHospitalEn == undefined) {
        validFlag = false;
        setVehicleHospitalEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehicleHospitalEnError(false);
      }

    }
    else if (DeathPlace.code === "PUBLIC_PLACES") {
      if (DeathPlaceLocalityEn == null || DeathPlaceLocalityEn == "" || DeathPlaceLocalityEn == undefined) {
        validFlag = false;
        setDeathPlaceLocalityEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceLocalityEnError(false);
      }
      if (DeathPlaceLocalityMl == null || DeathPlaceLocalityMl == "" || DeathPlaceLocalityMl == undefined) {
        validFlag = false;
        setDeathPlaceLocalityMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setDeathPlaceLocalityMlError(false);
      }

    }
    if (validFlag == true) {

      let IsEditChangeScreen = isEditDeath ? isEditDeath : false;
      let isWorkflow = isEditDeath ? false : true;
      onSelect(config.key, {
        uuid,
        IsEditChangeScreen,
        ToDate,
        DeathDateUnavailable,
        //DeathTimeTo,
        FromDate,
        //DeathTimeFrom,
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
        workFlowAmount,
        isPayment,
        hospitalNameEn,
        HospitalNameMl,
        DeathPlaceTypecode,
        institution,
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
        DeathPlaceHomeWardId,
        DeathPlaceHomePincode,
        vehicleType,
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
        publicPlaceType,
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
        isWorkflow,
        DifferenceInTime,
        hospitalCode,
        NACFile,
        uploadedFile,
        UploadNACHIde,
        proceedNoRDO,
        regNoNAC
      });
    }
  };
  if (isEditDeath) {
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
    if (formData?.InformationDeath?.AgeUnit != null) {
      if (cmbPlace.length > 0 && (AgeUnit === undefined || AgeUnit === "")) {
        setSelectedAgeUnit(cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeath?.AgeUnit)[0]);
        setValue(formData?.InformationDeath?.AgeUnit);
      }
    }
    // if (formData?.InformationDeath?.AgeUnit != null) {
    //   if (cmbPlace.length > 0 && (AgeUnit === undefined || AgeUnit === "")) {
    //     setSelectedAgeUnit(cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.InformationDeath?.AgeUnit)[0]);
    //     setValue(formData?.InformationDeath?.AgeUnit);
    //   }
    // }
    if (formData?.InformationDeath?.Religion != null) {
      if (cmbReligion.length > 0 && (Religion === undefined || Religion === "")) {
        setSelectedReligion(cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.InformationDeath?.Religion)[0]);
        setValue(formData?.InformationDeath?.Religion);
      }
    }

    if (formData?.InformationDeath?.Occupation != null) {
      if (cmbOccupationMain.length > 0 && (Occupation === undefined || Occupation === "")) {
        selectOccupation(cmbOccupationMain.filter((cmbOccupationMain) => cmbOccupationMain.code === formData?.InformationDeath?.Occupation)[0]);
        setValue(formData?.InformationDeath?.Occupation);
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
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={!DeathPlace
            || (value === "HOSPITAL" ? (!hospitalNameEn || !HospitalNameMl) : false)
            || (value === "INSTITUTION" ? (!institution || !DeathPlaceInstId || !InstitutionIdMl) : false)
            || (value === "HOME" ? (!DeathPlaceHomeWardId || !DeathPlaceHomePostofficeId || DeathPlaceHomePincode === "" || DeathPlaceHomeLocalityEn == ""
              || DeathPlaceHomeHoueNameEn == "" || DeathPlaceHomeLocalityMl == "" || DeathPlaceHomehoueNameMl == "") : false)
            || (value === "PUBLIC_PLACES" ? (!publicPlaceType || !DeathPlaceWardId || DeathPlaceLocalityEn === "") : false)
            // || (value === "VEHICLE" ? (!vehicleType || VehicleNumber === "" || VehicleFirstHaltEn === ""
            //   || !DeathPlaceWardId || GeneralRemarks === "") : false) 
              ||
            (value === "OUTSIDE_JURISDICTION" ? (!DeathPlaceDistrict || DeathPlaceCity == "" || PlaceOfBurialEn == "" || PlaceOfBurialMl == "" || !DeathPlaceWardId) : false)
            || DeceasedFirstNameEn == "" || DeceasedFirstNameMl == "" || !AgeUnit || !Age || !DeceasedGender || !Nationality || !Religion || (UploadNACHIde === true ? (NACFile == null || proceedNoRDO === "" || regNoNAC === "") : false)
          }>
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
                  <CheckBox
                    label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")}
                    onChange={setCheckedDate}
                    value={DeathDateUnavailable}
                    checked={DeathDateUnavailable}
                  />
                </div>
              </div>
            </div>
            {DeathDateUnavailable === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_FROM_DATE")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <DatePicker
                      date={FromDate}
                      max={convertEpochToDate(new Date())}
                      name="FromDate"
                      onChange={selectFromDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>

                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_TO_DATE")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <DatePicker
                      date={ToDate}
                      max={convertEpochToDate(new Date())}
                      name="ToDate"
                      onChange={selectToDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>

                </div>
              </div>
            )}
            {DeathDateUnavailable === false && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>
                      {t("CR_DATE_OF_DEATH")}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <DatePicker
                      date={DateOfDeath}
                      max={convertEpochToDate(new Date())}
                      name="DateOfDeath"
                      onChange={selectDeathDate}
                      {...(validation = {
                        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_DATE"),
                      })}
                    />
                  </div>

                  <div className="col-md-3">
                    <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                    <CustomTimePicker name="TimeOfDeath" onChange={(val) => handleTimeChange(val, setDeathTime)}
                      value={isEditDeath?new Date(TimeOfDeath):TimeOfDeath} />
                    {/* disable={isDisableEdit} */}
                  </div>
                </div>
              </div>
            )}
          </div>

          {UploadNACHIde === true && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAC_CERTIFICATE_UPLOAD")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_RDO_PROCEED_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="proceedNoRDO"
                      value={proceedNoRDO}
                      onChange={setSelectproceedNoRDO}
                      disable={isDisableEdit}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
                      placeholder={`${t("CR_RDO_PROCEED_NO")}`}
                      {...(validation = { pattern: "^[a-zA-Z- 0-9]*$", isRequired: true, type: "text", title: t("CR_RDO_PROCEED_NO") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_NAC_REG_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="regNoNAC"
                      value={regNoNAC}
                      onChange={setSelectregNoNAC}
                      disable={isDisableEdit}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
                      placeholder={`${t("CR_NAC_REG_NO")}`}
                      {...(validation = { pattern: "^[a-zA-Z- 0-9]*$", isRequired: true, type: "text", title: t("CR_NAC_REG_NO") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_PROCE_CERTIFICATE_UPLOAD")}`}<span className="mandatorycss">*</span></CardLabel>
                    <UploadFile
                      extraStyleName={"propertyCreate"}
                      accept=".jpg,.png,.pdf"
                      onUpload={selectfile}
                      onDelete={() => {
                        setUploadedFile(null);
                      }}
                      message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}



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
                  option={sortDropdownNames(cmbPlace ? cmbPlace : [], "name", t)}
                  // option={cmbPlace}
                  selected={DeathPlace}
                  disable={isDisableEditRole}
                  select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
              </div>
            </div>

            {value === "HOSPITAL" && (
              <Hospital
                formData={formData}
                isEditDeath={isEditDeath}
                selecthospitalNameEn={selecthospitalNameEn}
                hospitalNameEn={hospitalNameEn}
                HospitalNameMl={HospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
                hospitalCode={hospitalCode}
                isDisableEditRole={isDisableEditRole}
                setisDisableEditRole={setisDisableEditRole}
              />

            )}
            {value === "INSTITUTION" && (
              <div>
                <Institution
                  formData={formData}
                  isEditDeath={isEditDeath}
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
                  isEditDeath={isEditDeath}
                  DeathPlaceHomeWardId={DeathPlaceHomeWardId}
                  setDeathPlaceHomeWardId={setDeathPlaceHomeWardId}
                  DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
                  setDeathPlaceHomepostofficeId={setDeathPlaceHomepostofficeId}
                  DeathPlaceHomePincode={DeathPlaceHomePincode}
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
                  isEditDeath={isEditDeath}
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
                  isEditDeath={isEditDeath}
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
            {value === "OUTSIDE_JURISDICTION" && (
              <div>
                <DeathOutsideJurisdiction
                  formData={formData}
                  isEditDeath={isEditDeath}
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
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LEGAL_INFORMATION")}`}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
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
                <div className="col-md-4">
                  <CardLabel>{t("CR_ID_DETAILS_OF_DECEASED")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    onChange={handleDropdownChange}
                    option={cmbDocumentType}
                    selected={DeceasedIdproofType}
                    select={selectDeceasedIdproofType}
                    placeholder={`${t("CR_ID_DETAILS_OF_DECEASED")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CR_ID_NO")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="DeceasedIdproofNo"
                    value={DeceasedIdproofNo}
                    disabled={!isTextboxEnabled}
                    onChange={setSelectDeceasedIdproofNo}
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
                <div className="col-md-4">
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
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CR_AADHAR")}`}
                    {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                  onKeyPress={setCheckSpecialCharSpace}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_FIRST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' @]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
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
                  onKeyPress={setCheckSpecialCharSpace}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' @]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
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
                  onKeyPress={setCheckSpecialCharSpace}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_LAST_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' @]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
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
                  onKeyPress={setCheckMalayalamInputField}
                  disable={isDisableEdit}
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
                  onKeyPress={setCheckMalayalamInputField}
                  disable={isDisableEdit}
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
                  onKeyPress={setCheckMalayalamInputField}
                  disable={isDisableEdit}
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
              <div className="col-md-1">
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
                  placeholder={`${t("CR_AGE")}`}
                  validation={{ pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CS_COMMON_INVALID_AGE") }}
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
                  option={getAgeUnitOptions()}
                  selected={AgeUnit}
                  select={selectAgeUnit}
                  placeholder={`${t("CR_AGE_UNIT")}`}
                />
              </div>
              {/* {!isTextBoxValid() && <p>Please enter a valid value based on the conditions</p>} */}

              <div className="col-md-2">
                <CardLabel>
                  {t("CR_GENDER")} <span className="mandatorycss">*</span>{" "}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={sortDropdownNames(menu ? menu : [], "code", t)}
                  // option={menu}
                  selected={DeceasedGender}
                  select={selectDeceasedGender}
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
                  placeholder={`${t("CS_COMMON_RELIGION")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{t("CR_PROFESSIONAL")}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbOccupationMain}
                  selected={Occupation}
                  select={selectOccupation}
                  placeholder={`${t("CR_PROFESSIONAL")}`}
                />
              </div>
            </div>
          </div>
          {(popUpState) && (
            <PopUp>
              <div className="popup-module" style={{ borderRadius: "8px" }}>
                <div style={{ margin: "20px", padding: "20px", border: "1px solid grey", borderRadius: "8px" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_RDO_PROCED_QUESTION")}`}</CardText>
                    </div>
                  </div>
                  <div className="row" style={{ display: "flex", justifyContent: "flex-end", columnGap: "8px" }}>
                    <button type="button"
                      style={{ backgroundColor: "orange", padding: "4px 16px", color: "white", borderRadius: "8px", }}
                      onClick={() => {
                        setUploadNACHIde(true);
                        setpopUpState(false);
                        setpopUpStateNac(false);
                      }}
                    >{`${t("COMMON_YES")}`}</button>
                    <button type="button"
                      style={{ border: "1px solid grey", padding: "4px 16px", borderRadius: "8px" }}
                      onClick={() => {
                        setpopUpState(false);
                        setpopUpStateNac(true);
                      }}
                    >{`${t("COMMON_NO")}`}</button>
                  </div>
                </div>
              </div>
            </PopUp>
          )}
          {(popUpStateNac) && (
            <PopUp>
              <div className="popup-module" style={{ borderRadius: "8px" }}>
                <div style={{ margin: "20px", padding: "20px", border: "1px solid grey", borderRadius: "8px" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAC_REQUEST_MSG")}`}
                      </CardText>
                    </div>
                  </div>
                  <div className="row" style={{ display: "flex", justifyContent: "flex-end", columnGap: "8px" }}>
                    <button type="button"
                      style={{
                        backgroundColor: "orange",
                        padding: "4px 16px",
                        color: "white",
                        borderRadius: "8px",
                      }}
                      onClick={() => {
                        setUploadNACHIde(false);
                        setpopUpStateNac(false);
                        window.location.assign(`${window.location.origin}/digit-ui/citizen/cr/cr-birth-nac/nac-download-details`);
                      }}
                    >
                      {`${t("COMMON_OK")}`}
                    </button>
                  </div>
                </div>
              </div>
            </PopUp>
          )}
          {toast && (
            <Toast
              error={DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || AgeError || sexError || WardNameError || DeceasedFirstNameEnError || DeceasedFirstNameMlError || DeceasedMiddleNameEnError
                || DeceasedMiddleNameMlError || DeceasedLastNameEnError || DeceasedLastNameMlError || vehiDesDetailsEnError || AgeValidationMsg || DeathPlaceHomeStreetNameEnError || DeathPlaceHomestreetNameMlError}
              label={
                DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || AgeError || sexError || WardNameError
                  || DeceasedFirstNameEnError || DeceasedFirstNameMlError || DeceasedMiddleNameEnError
                  || DeceasedMiddleNameMlError || DeceasedLastNameEnError || DeceasedLastNameMlError || vehiDesDetailsEnError || AgeValidationMsg || DeathPlaceHomeStreetNameEnError || DeathPlaceHomestreetNameMlError
                  ? DOBError
                    ? t(`CR_INVALID_DATE`)
                    : sexError
                      ? t(`DEATH_ERROR_SEX_CHOOSE`)
                      : AadharError
                        ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                        : DeceasedFirstNameEnError
                          ? t(`DECEASED_FIRST_NAME_EN`)
                          : DeceasedFirstNameMlError
                            ? t(`DECEASED_FIRST_NAME_ML`)
                            : DeceasedMiddleNameEnError
                              ? t(`DECEASED_MIDDLE_NAME_EN`)
                              : DeceasedMiddleNameMlError
                                ? t(`DECEASED_MIDDLE_NAME_ML`)
                                : DeceasedLastNameEnError
                                  ? t(`DECEASED_LAST_NAME_EN`)
                                  : DeceasedLastNameMlError
                                    ? t(`DECEASED_LAST_NAME_ML`)
                                    : AgeValidationMsg
                                      ? t(`CR_DECEASED_AGE_WARNING`)
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
                                                : vehiDesDetailsEnError ? t(`DEATH_ERROR_DESCRIPTION_BOX_CHOOSE`)
                                                  : DeathPlaceHomeStreetNameEnError
                                                    ? t(`DEATH_ERROR_HOME_STREET_NAME_EN`)
                                                    : DeathPlaceHomestreetNameMlError
                                                      ? t(`DEATH_ERROR_HOME_STREET_NAME_ML`)
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
