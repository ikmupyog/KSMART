import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/NACDRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import Hospital from "../deathComponents/Hospital";
// import Institution from "../deathComponents/Institution";
// import DeathPlaceHome from "../deathComponents/DeathPlaceHome";
// import DeathPlaceVehicle from "../deathComponents/DeathPlaceVehicle";
// import DeathPublicPlace from "../deathComponents/DeathPublicPlace";
// import DeathOutsideJurisdiction from "../deathComponents/DeathOutsideJurisdiction ";
import { useParams } from "react-router-dom";
import moment from "moment";
import DeathPlaceHome from "./DeathPlaceHome";
import DeathPublicPlace from "./DeathPublicPlace";
import DeathPlaceHospital from "./DeathPlaceHospital";
import DeathPlaceInstitution from "./DeathPlaceInstitution";
import DeathPlaceVehicle from "./DeathPlaceVehicle"



const NACDeathInformation = ({ config, onSelect, userType, formData, isEditDeath }) => {
  const [isEditDeathPageComponents, setIsEditDeathPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditDeath ? isEditDeath : false);
  const stateId = Digit.ULBService.getStateId();
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [workFlowCode, setWorkFlowCode] = useState(formData?.DeathNACDetails?.workFlowCode);
  let tenantid = "";
  tenantid = Digit.ULBService.getCurrentTenantId();
  if (tenantid === "kl") {
    tenantid = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};

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
  // let workFlowCode = "";
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
    isEditDeath &&
      isEditDeathPageComponents === false &&
      (formData?.DeathNACDetails?.IsEditChangeScreen === false || formData?.DeathNACDetails?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.DeathNACDetails?.DateOfDeath)
      : formData?.DeathNACDetails?.DateOfDeath
  );
  const [FromDate, setFromDate] = useState(
    isEditDeath &&
      isEditDeathPageComponents === false &&
      (formData?.DeathNACDetails?.IsEditChangeScreen === false || formData?.DeathNACDetails?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.DeathNACDetails?.FromDate)
      : formData?.DeathNACDetails?.FromDate
  );
  const handleFromTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const [DeathTimeFrom, setDeathTimeFrom] = useState(
    isEditDeathPageComponents === false &&
      (formData?.DeathNACDetails?.IsEditChangeScreen === false || formData?.DeathNACDetails?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.DeathNACDetails?.DeathTimeFrom)
      : formData?.DeathNACDetails?.DeathTimeFrom
  );

  const handleToTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const [DeathTimeTo, setDeathTimeTo] = useState(
    isEditDeathPageComponents === false &&
      (formData?.DeathNACDetails?.IsEditChangeScreen === false || formData?.DeathNACDetails?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.DeathNACDetails?.setDeathTimeTo)
      : formData?.DeathNACDetails?.setDeathTimeTo
  );

  const [ToDate, setToDate] = useState(
    isEditDeathPageComponents === false &&
      (formData?.DeathNACDetails?.IsEditChangeScreen === false || formData?.DeathNACDetails?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.DeathNACDetails?.ToDate)
      : formData?.DeathNACDetails?.ToDate
  );

  // const [DeathTime, setDeathTime] = useState("");
  const [DeathDateUnavailable, setChecked] = useState(
    formData?.DeathNACDetails?.DeathDateUnavailable
      ? formData?.DeathNACDetails?.DeathDateUnavailable
      : formData?.DeathNACDetails?.DeathDateUnavailable
      ? formData?.DeathNACDetails?.DeathDateUnavailable
      : false
  );
  const [TimeOfDeath, setDeathTime] = useState("");
  const [DeceasedAadharNotAvailable, setDeceasedAadharNotAvailable] = useState(
    formData?.DeathNACDetails?.DeceasedAadharNotAvailable ? formData?.DeathNACDetails?.DeceasedAadharNotAvailable : false
  );
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(
    formData?.DeathNACDetails?.DeceasedAadharNumber ? formData?.DeathNACDetails?.DeceasedAadharNumber : ""
  );
  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);
  const [DeceasedIdproofType, setSelectedDeceasedIdproofType] = useState(
    formData?.DeathNACDetails?.DeceasedIdproofType ? formData?.DeathNACDetails?.DeceasedIdproofType : null
  );
  const [DeceasedIdproofNo, setDeceasedIdproofNo] = useState(
    formData?.DeathNACDetails?.DeceasedIdproofNo ? formData?.DeathNACDetails?.DeceasedIdproofNo : null
  );

  const handleDropdownChange = () => {
    setIsTextboxEnabled(true);
  };
  const [placeofBurial, setPlaceofBurial] = useState(
    formData?.DeathNACDetails?.placeofBurial ? formData?.DeathNACDetails?.placeofBurial : ""
  );
  const [DeceasedFirstNameEn, setDeceasedFirstNameEn] = useState(
    formData?.DeathNACDetails?.DeceasedFirstNameEn ? formData?.DeathNACDetails?.DeceasedFirstNameEn : ""
  );
  const [DeceasedMiddleNameEn, setDeceasedMiddleNameEn] = useState(
    formData?.DeathNACDetails?.DeceasedMiddleNameEn ? formData?.DeathNACDetails?.DeceasedMiddleNameEn : ""
  );
  const [DeceasedLastNameEn, setDeceasedLastNameEn] = useState(
    formData?.DeathNACDetails?.DeceasedLastNameEn ? formData?.DeathNACDetails?.DeceasedLastNameEn : ""
  );
  const [DeceasedFirstNameMl, setDeceasedFirstNameMl] = useState(
    formData?.DeathNACDetails?.DeceasedFirstNameMl ? formData?.DeathNACDetails?.DeceasedFirstNameMl : ""
  );
  const [DeceasedMiddleNameMl, setDeceasedMiddleNameMl] = useState(
    formData?.DeathNACDetails?.DeceasedMiddleNameMl ? formData?.DeathNACDetails?.DeceasedMiddleNameMl : ""
  );
  const [DeceasedLastNameMl, setDeceasedLastNameMl] = useState(
    formData?.DeathNACDetails?.DeceasedLastNameMl ? formData?.DeathNACDetails?.DeceasedLastNameMl : ""
  );
  const [Age, setAge] = useState(formData?.DeathNACDetails?.Age ? formData?.DeathNACDetails?.Age : "");
  const [Nationality, setSelectedNationality] = useState(
    formData?.DeathNACDetails?.Nationality?.code
      ? formData?.DeathNACDetails?.Nationality
      : formData?.DeathNACDetails?.Nationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.DeathNACDetails?.Nationality)[0]
      : ""
  );
  const [Religion, setSelectedReligion] = useState(
    formData?.DeathNACDetails?.Religion?.code
      ? formData?.DeathNACDetails?.Religion
      : formData?.DeathNACDetails?.Religion
      ? cmbReligion.filter((cmbReligion) => cmbReligion.code === formData?.DeathNACDetails?.Religion)[0]
      : ""
  );

  const [CommencementDate, setCommencementDate] = useState(
    formData?.DeathNACDetails?.CommencementDate ? formData?.DeathNACDetails?.CommencementDate : ""
  );
  const [cmbAgeUnitFilter, setcmbAgeUnitFilter] = useState();

  const [AgeUnit, setSelectedAgeUnit] = useState(
    formData?.DeathNACDetails?.AgeUnit?.code
      ? formData?.DeathNACDetails?.AgeUnit
      : formData?.DeathNACDetails?.AgeUnit
      ? cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.code === formData?.DeathNACDetails?.DeceasedGender)[0]
      : ""
  );

  const [DeceasedGender, setselectedDeceasedGender] = useState(
    formData?.DeathNACDetails?.DeceasedGender?.code
      ? formData?.DeathNACDetails?.DeceasedGender
      : formData?.DeathNACDetails?.DeceasedGender
      ? menu.filter((menu) => menu.code === formData?.DeathNACDetails?.DeceasedGender)[0]
      : ""
  );
  const [Occupation, setSelectedOccupation] = useState(
    formData?.DeathNACDetails?.Occupation?.code
      ? formData?.DeathNACDetails?.Occupation
      : formData?.DeathNACDetails?.Occupation
      ? cmbOccupationMain.filter((cmbOccupationMain) => cmbOccupationMain.code === formData?.DeathNACDetails?.Occupation)[0]
      : ""
  );
  const [DeathPlace, setselectDeathPlace] = useState(
    formData?.DeathNACDetails?.DeathPlace?.code
      ? formData?.DeathNACDetails?.DeathPlace
      : formData?.DeathNACDetails?.DeathPlace
      // ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.ChildDetails?.DeathPlace)[0]
      // : ""
  );

  // const [DeathPlace, setselectDeathPlace] = useState(cmbPlace?(cmbPlace.filter(cmbPlace=>cmbPlace.code === formData?.DeathNACDetails?.DeathPlace)[0]) :formData?.DeathNACDetails?.DeathPlace) ;
  //Hospital, Intitution, vehicle, Public Place {DeathPlaceType}
  const [DeathPlaceType, selectDeathPlaceType] = useState(
    formData?.DeathNACDetails?.DeathPlaceType?.code
      ? formData?.DeathNACDetails?.DeathPlaceType
      : formData?.DeathNACDetails?.DeathPlaceType
      ? ""
      : ""
  );
  const [HospitalNameMl, selectHospitalNameMl] = useState(
    formData?.DeathNACDetails?.HospitalNameMl?.code
      ? formData?.DeathNACDetails?.HospitalNameMl
      : formData?.DeathNACDetails?.HospitalNameMl
      ? ""
      : ""
  );

  const [hospitalNameEn, selectHospitalNameEn] = useState(
      formData?.DeathNACDetails?.hospitalNameEn?.code
        ? formData?.DeathNACDetails?.hospitalNameEn
        : formData?.DeathNACDetails?.hospitalNameEn
        ? ""
        : ""
  );
  const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(
    formData?.DeathNACDetails?.DeathPlaceInstId ? formData?.DeathNACDetails?.DeathPlaceInstId : null
  );
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.DeathNACDetails?.DeathPlaceInstId);
  const [institution, selectinstitution] = useState(
        formData?.DeathNACDetails?.institution?.code
        ? formData?.DeathNACDetails?.institution
        : formData?.DeathNACDetails?.institution
        ? ""
        : ""
        );  
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  // Home
  const [DeathPlaceHomePostofficeId, setDeathPlaceHomepostofficeId] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomePostofficeId ? formData?.DeathNACDetails?.DeathPlaceHomePostofficeId : null
  );
  const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomepincode ? formData?.DeathNACDetails?.DeathPlaceHomepincode : null
  );

  const [DeathPlaceHomeHoueNameEn, setDeathPlaceHomehoueNameEn] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomeHoueNameEn ? formData?.DeathNACDetails?.DeathPlaceHomeHoueNameEn : null
  );
  const [DeathPlaceHomeLocalityEn, setDeathPlaceHomelocalityEn] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomeLocalityEn ? formData?.DeathNACDetails?.DeathPlaceHomeLocalityEn : null
  );
  const [DeathPlaceHomeLocalityMl, setDeathPlaceHomelocalityMl] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomeLocalityMl ? formData?.DeathNACDetails?.DeathPlaceHomeLocalityMl : null
  );
  const [DeathPlaceHomeStreetNameEn, setDeathPlaceHomestreetNameEn] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomeStreetNameEn ? formData?.DeathNACDetails?.DeathPlaceHomeStreetNameEn : null
  );
  const [DeathPlaceHomeStreetNameMl, setDeathPlaceHomestreetNameMl] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomeStreetNameMl ? formData?.DeathNACDetails?.DeathPlaceHomeStreetNameMl : null
  );
  const [DeathPlaceHomehoueNameMl, setDeathPlaceHomehoueNameMl] = useState(
    formData?.DeathNACDetails?.DeathPlaceHomehoueNameMl ? formData?.DeathNACDetails?.DeathPlaceHomehoueNameMl : null
  );
  //Vehicle home OutsideJurisdiction{DeathPlaceWardId} Publicplace OutsideJurisdiction {GeneralRemarks} Publicplace {DeathPlaceWardId}
  //
  const [VehicleNumber, setVehicleNumber] = useState(formData?.DeathNACDetails?.VehicleNumber);
  const [VehicleFromplaceEn, setVehicleFromplaceEn] = useState(formData?.DeathNACDetails?.VehicleFromplaceEn);
  const [VehicleToPlaceEn, setVehicleToPlaceEn] = useState(formData?.DeathNACDetails?.VehicleToPlaceEn);
  const [VehicleFromplaceMl, setVehicleFromplaceMl] = useState(formData?.DeathNACDetails?.VehicleFromplaceMl);
  const [VehicleToPlaceMl, setVehicleToPlaceMl] = useState(formData?.DeathNACDetails?.VehicleToPlaceMl);
  const [GeneralRemarks, setGeneralRemarks] = useState(formData?.DeathNACDetails?.GeneralRemarks);
  const [VehicleFirstHaltEn, setVehicleFirstHaltEn] = useState(formData?.DeathNACDetails?.VehicleFirstHaltEn);
  const [VehicleFirstHaltMl, setVehicleFirstHaltMl] = useState(formData?.DeathNACDetails?.VehicleFirstHaltMl);
  const [VehicleHospitalEn, setSelectedVehicleHospitalEn] = useState(formData?.DeathNACDetails?.VehicleHospitalEn);
  const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData?.DeathNACDetails?.DeathPlaceWardId);
  const [DeathPlaceHomeWardId, setDeathPlaceHomeWardId] = useState(formData?.DeathNACDetails?.DeathPlaceHomeWardId);
  const [vehicleType, selectvehicleType] = useState(formData?.DeathNACDetails?.vehicleType?.code
      ? formData?.DeathNACDetails?.vehicleType
      : formData?.DeathNACDetails?.vehicleType
      ? ""
      : ""
  );
  //Public Place

  const [DeathPlaceLocalityEn, setDeathPlaceLocalityEn] = useState(
    formData?.DeathNACDetails?.DeathPlaceLocalityEn ? formData?.DeathNACDetails?.DeathPlaceLocalityEn : ""
  );
  const [DeathPlaceLocalityMl, setDeathPlaceLocalityMl] = useState(
    formData?.DeathNACDetails?.DeathPlaceLocalityMl ? formData?.DeathNACDetails?.DeathPlaceLocalityMl : ""
  );
  const [DeathPlaceStreetEn, setDeathPlaceStreetEn] = useState(
    formData?.DeathNACDetails?.DeathPlaceStreetEn ? formData?.DeathNACDetails?.DeathPlaceStreetEn : ""
  );
  const [DeathPlaceStreetMl, setDeathPlaceStreetMl] = useState(
    formData?.DeathNACDetails?.DeathPlaceStreetMl ? formData?.DeathNACDetails?.DeathPlaceStreetMl : ""
  );
  const [publicPlaceType, selectpublicPlaceType] = useState(formData?.DeathNACDetails?.publicPlaceType?.code
    ? formData?.DeathNACDetails?.publicPlaceType
    : formData?.DeathNACDetails?.publicPlaceType
    ? ""
    : ""
  );

  //DeathOutsideJurisdiction
  const [DeathPlaceCountry, setSelectDeathPlaceCountry] = useState(formData?.DeathNACDetails?.DeathPlaceCountry);
  const [DeathPlaceState, SelectDeathPlaceState] = useState(formData?.DeathNACDetails?.DeathPlaceState);
  const [DeathPlaceDistrict, SelectDeathPlaceDistrict] = useState(formData?.DeathNACDetails?.DeathPlaceDistrict);
  const [DeathPlaceCity, SelectDeathPlaceCity] = useState(formData?.DeathNACDetails?.DeathPlaceCity);
  const [DeathPlaceRemarksEn, SelectDeathPlaceRemarksEn] = useState(formData?.DeathNACDetails?.DeathPlaceRemarksEn);
  const [DeathPlaceRemarksMl, SelectDeathPlaceRemarksMl] = useState(formData?.DeathNACDetails?.DeathPlaceRemarksMl);
  const [PlaceOfBurialEn, SelectPlaceOfBurialEn] = useState(formData?.DeathNACDetails?.PlaceOfBurialEn);
  const [PlaceOfBurialMl, SelectPlaceOfBurialMl] = useState(formData?.DeathNACDetails?.PlaceOfBurialMl);

  const [toast, setToast] = useState(false);
  const [value, setValue] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderDeathPlace, setIsInitialRenderDeathPlace] = useState(true);

  const [sexError, setsexError] = useState(formData?.DeathNACDetails?.sexError ? false : false);
  const [DOBError, setDOBError] = useState(formData?.DeathNACDetails?.ChildDOB ? false : false);
  const [AadharError, setAadharError] = useState(formData?.DeathNACDetails?.DeceasedAadharNumber ? false : false);
  const [HospitalError, setHospitalError] = useState(formData?.DeathNACDetails?.DeathPlaceType ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.DeathNACDetails?.DeathPlaceType ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.DeathNACDetails?.DeathPlaceInstId ? false : false);
  // const [AgeError, setAgeError] = useState(formData?.DeathNACDetails?.Age ? false : false);
  const [WardNameError, setWardNameError] = useState(formData?.DeathNACDetails?.DeathPlaceWardId ? false : false);
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

  // cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
  // setAdrsStateName(cmbFilterState[0]);

  // if (isInitialRender) {
  //   if (formData?.DeathNACDetails?.ischeckedAdhar  != null) {
  //     setIsInitialRender(false);
  //     setisCheckedAdhar(formData?.DeathNACDetails?.ischeckedAdhar );
  //   }
  // }
  React.useEffect(() => {
    if (isInitialRenderDeathPlace) {
      if (DeathPlace) {
        setIsInitialRender(false);
        naturetype = DeathPlace.code;
        setValue(naturetype);
        if (naturetype === "HOSPITAL") {
          // <Hospital DeathPlaceType={DeathPlaceType} HospitalNameMl={HospitalNameMl} hospitalNameEn={hospitalNameEn} />;
          <DeathPlaceHospital DeathPlaceType={DeathPlaceType} HospitalNameMl={HospitalNameMl} hospitalNameEn={hospitalNameEn}/>;
        }
        if (naturetype === "INSTITUTION") {
          <DeathPlaceInstitution 
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
        setDOBError(true);
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
    // else {
    //   setToDate(null);
    //   setDOBError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 3000);
    // }
  }

  // function selectToDate(value) {
  //   setToDate(value);
  //   const today = new Date();
  //   const deathDate = new Date(value);
  //   if (deathDate.getTime() <= today.getTime()) {
  //     let Difference_In_Time = today.getTime() - deathDate.getTime();
  //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //     Difference_In_DaysRounded = Math.floor(Difference_In_Days);
  //   } else {
  //     setToDate(null);
  //     setDOBError(true);
  //     setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 3000);
  //   }

  // }
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
    // else {
    //   setDateOfDeath(null);
    //   setDOBError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 3000);
    // }
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
  function setSelectPlaceofBurial(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setPlaceofBurial(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
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
  // function setSelectDeceasedAadharNumber(e) {
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 12) {
  //       setAadharError(true);
  //       return false;
  //     } else if (e.target.value.length < 12) {
  //       setAadharError(true);
  //       setDeceasedAadharNumber(e.target.value);
  //       return false;
  //     } else {
  //       setAadharError(false);
  //       setDeceasedAadharNumber(e.target.value);
  //       return true;
  //     }
  //   } else {
  //     setAadharError(false);
  //     setDeceasedAadharNumber(e.target.value);
  //     return true;
  //   }
  // }
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
  // function selectDateOfDeath(value) {
  //   setDateOfDeath(value);
  //   const today = new Date();
  //   const deathDate = new Date(value);
  //   if (deathDate.getTime() <= today.getTime()) {
  //     let Difference_In_Time = today.getTime() - deathDate.getTime();
  //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //     Difference_In_DaysRounded = Math.floor(Difference_In_Days);
  //   } else {
  //     setDateOfDeath(null);
  //     setDOBError(true);
  //     setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 3000);
  //   }
  // }
  function selectDeathPlace(value) {
    setselectDeathPlace(value);
    setValue(value.code);

    let currentWorkFlow = workFlowData.filter(
      (workFlowData) =>
        workFlowData.DeathPlace === value.code &&
        workFlowData.startdateperiod <= Difference_In_DaysRounded &&
        workFlowData.enddateperiod >= Difference_In_DaysRounded
    );
    if (currentWorkFlow.length > 0) {
      setWorkFlowCode(currentWorkFlow[0].WorkflowCode);
    }
    console.log(value.code,);
      // workFlowCode = currentWorkFlow[0].WorkflowCode;
      // if (value.code === "HOSPITAL") {
      //   //Institution
      //   setSelectedDeathPlaceInstId(null);
      //   setInstitutionIdMl(null);
      //   setInstitutionFilterList(null);
      //   // setIsInitialRenderInstitutionList
      //   //Home
      //   setDeathPlaceHomepostofficeId(null);
      //   setDeathPlaceHomepincode(null);
      //   setDeathPlaceHomehoueNameEn(null);
      //   setDeathPlaceHomehoueNameMl(null);
      //   setDeathPlaceHomelocalityEn(null);
      //   setDeathPlaceHomelocalityMl(null);
      //   setDeathPlaceHomestreetNameEn(null);
      //   setDeathPlaceHomestreetNameMl(null);
      //   setDeathPlaceWardId(null);
      //   setPostOfficevalues(null);
      //   //Vehicle
      //   setVehicleNumber(null);
      //   setVehicleFromplaceEn(null);
      //   setVehicleToPlaceEn(null);
      //   setGeneralRemarks(null);
      //   setVehicleFirstHaltEn(null);
      //   setVehicleFirstHaltMl(null);
      //   setSelectedVehicleHospitalEn(null);
      //   setVehicleFromplaceMl(null);
      //   setVehicleToPlaceMl(null);
      //   //PublicPlace
      //   setDeathPlaceLocalityEn(null);
      //   setDeathPlaceLocalityMl(null);
      //   setDeathPlaceStreetEn(null);
      //   setDeathPlaceStreetMl(null);
      //   //DeathOutsideJurisdiction
      //   setSelectDeathPlaceCountry(null);
      //   SelectDeathPlaceState(null);
      //   SelectDeathPlaceDistrict(null);
      //   SelectDeathPlaceCity(null);
      //   SelectDeathPlaceRemarksEn(null);
      //   SelectDeathPlaceRemarksMl(null);
      //   SelectPlaceOfBurialEn(null);
      //   SelectPlaceOfBurialMl(null);
      // } else if (value.code === "INSTITUTION") {
      //   //Hospital
      //   selectHospitalNameMl(null);
      //   //Home
      //   setDeathPlaceHomepostofficeId(null);
      //   setDeathPlaceHomepincode(null);
      //   setDeathPlaceHomehoueNameEn(null);
      //   setDeathPlaceHomehoueNameMl(null);
      //   setDeathPlaceHomelocalityEn(null);
      //   setDeathPlaceHomelocalityMl(null);
      //   setDeathPlaceHomestreetNameEn(null);
      //   setDeathPlaceHomestreetNameMl(null);
      //   setDeathPlaceWardId(null);
      //   setPostOfficevalues(null);
      //   //Vehicle
      //   selectDeathPlaceType(null);
      //   setVehicleNumber(null);
      //   setVehicleFromplaceEn(null);
      //   setVehicleToPlaceEn(null);
      //   setGeneralRemarks(null);
      //   setVehicleFirstHaltEn(null);
      //   setVehicleFirstHaltMl(null);
      //   setSelectedVehicleHospitalEn(null);
      //   setVehicleFromplaceMl(null);
      //   setVehicleToPlaceMl(null);
      //   //PublicPlace
      //   setDeathPlaceLocalityEn(null);
      //   setDeathPlaceLocalityMl(null);
      //   setDeathPlaceStreetEn(null);
      //   setDeathPlaceStreetMl(null);
      //   //DeathOutsideJurisdiction
      //   setSelectDeathPlaceCountry(null);
      //   SelectDeathPlaceState(null);
      //   SelectDeathPlaceDistrict(null);
      //   SelectDeathPlaceCity(null);
      //   SelectDeathPlaceRemarksEn(null);
      //   SelectDeathPlaceRemarksMl(null);
      //   SelectPlaceOfBurialEn(null);
      //   SelectPlaceOfBurialMl(null);
      // } else if (value.code === "VEHICLE") {
      //   //Hospital
      //   // selectDeathPlaceType(null);
      //   selectHospitalNameMl(null);
      //   //Institution
      //   selectDeathPlaceType(null);
      //   setSelectedDeathPlaceInstId(null);
      //   setInstitutionIdMl(null);
      //   setInstitutionFilterList(null);
      //   //Home
      //   setDeathPlaceHomepostofficeId(null);
      //   setDeathPlaceHomepincode(null);
      //   setDeathPlaceHomehoueNameEn(null);
      //   setDeathPlaceHomehoueNameMl(null);
      //   setDeathPlaceHomelocalityEn(null);
      //   setDeathPlaceHomelocalityMl(null);
      //   setDeathPlaceHomestreetNameEn(null);
      //   setDeathPlaceHomestreetNameMl(null);
      //   setDeathPlaceWardId(null);
      //   setPostOfficevalues(null);
      //   //PublicPlace
      //   setDeathPlaceLocalityEn(null);
      //   setDeathPlaceLocalityMl(null);
      //   setDeathPlaceStreetEn(null);
      //   setDeathPlaceStreetMl(null);
      //   setGeneralRemarks(null);
      //   //DeathOutsideJurisdiction
      //   setSelectDeathPlaceCountry(null);
      //   SelectDeathPlaceState(null);
      //   SelectDeathPlaceDistrict(null);
      //   SelectDeathPlaceCity(null);
      //   SelectDeathPlaceRemarksEn(null);
      //   SelectDeathPlaceRemarksMl(null);
      //   SelectPlaceOfBurialEn(null);
      //   SelectPlaceOfBurialMl(null);
      // }
      // if (value.code === "PUBLIC_PLACES") {
      //   //Hospital
      //   selectDeathPlaceType(null);
      //   selectHospitalNameMl(null);
      //   //Institution
      //   setSelectedDeathPlaceInstId(null);
      //   setInstitutionIdMl(null);
      //   setInstitutionFilterList(null);
      //   // setIsInitialRenderInstitutionList
      //   //Home
      //   setDeathPlaceHomepostofficeId(null);
      //   setDeathPlaceHomepincode(null);
      //   setDeathPlaceHomehoueNameEn(null);
      //   setDeathPlaceHomehoueNameMl(null);
      //   setDeathPlaceHomelocalityEn(null);
      //   setDeathPlaceHomelocalityMl(null);
      //   setDeathPlaceHomestreetNameEn(null);
      //   setDeathPlaceHomestreetNameMl(null);
      //   setPostOfficevalues(null);
      //   //Vehicle
      //   setVehicleNumber(null);
      //   setVehicleFromplaceEn(null);
      //   setVehicleToPlaceEn(null);
      //   setVehicleFirstHaltEn(null);
      //   setVehicleFirstHaltMl(null);
      //   setSelectedVehicleHospitalEn(null);
      //   setVehicleFromplaceMl(null);
      //   setVehicleToPlaceMl(null);
      //   setDeathPlaceWardId(null);
      //   //DeathOutsideJurisdiction
      //   setSelectDeathPlaceCountry(null);
      //   SelectDeathPlaceState(null);
      //   SelectDeathPlaceDistrict(null);
      //   SelectDeathPlaceCity(null);
      //   SelectDeathPlaceRemarksEn(null);
      //   SelectDeathPlaceRemarksMl(null);
      //   SelectPlaceOfBurialEn(null);
      //   SelectPlaceOfBurialMl(null);
      //   setGeneralRemarks(null);
      // }
      
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
      setAadharError(false);
      setToast(false);
    }
  }
  // const isTextBoxValid = () => {

  //   // } else if (Age > 23 && Age <= 29) {
  //   //   return value ===  ["Years", "Days"].includes(AgeUnit);
  //   // } else if (Age > 29 && Age <= 120) {
  //   //   return value ===  ["Years"].includes(AgeUnit);
  //   // } else {
  //   //   return false;
  //   // }
  // };
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
    // if (Age == null || Age == "" || Age == undefined) {
    //   validFlag = false;
    //   setAgeError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setAgeError(false);
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
      // // sessionStorage.setItem("checked", checked ? checked : false);
      // sessionStorage.setItem("DeceasedAadharNotAvailable ", DeceasedAadharNotAvailable ? DeceasedAadharNotAvailable : false);
      // sessionStorage.setItem("Occupation", Occupation ? Occupation.code : null);
      // sessionStorage.setItem("DeathPlace", DeathPlace ? DeathPlace.code : null);

      // sessionStorage.setItem("workFlowCode", workFlowCode);

      // sessionStorage.setItem("DeathPlaceTypecode", DeathPlaceType ? DeathPlaceType.code : null);
      // sessionStorage.setItem("institutionNameCode", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      // sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      // // if (validFlag === true) {
      // sessionStorage.setItem("DeceasedIdproofType", DeceasedIdproofType ? DeceasedIdproofType.code : null);
      // sessionStorage.setItem("DeceasedIdproofNo", DeceasedIdproofNo ? DeceasedIdproofNo : null);

      // sessionStorage.setItem("DeceasedAadharNumber", DeceasedAadharNumber ? DeceasedAadharNumber : null);

      // if (DeathPlace.code === "HOSPITAL") {
      //   //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
      //   // sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      //   sessionStorage.setItem("HospitalNameMl", HospitalNameMl ? HospitalNameMl.code : null);
      //   sessionStorage.removeItem("DeathPlaceInstId");
      // }
      // if (DeathPlace.code === "INSTITUTION") {
      //   //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
      //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      //   sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
      //   sessionStorage.setItem("InstitutionIdMl", InstitutionIdMl ? InstitutionIdMl.InstitutionIdMl : null);
      // }
      // if (DeathPlace.code === "HOME") {
      //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
      //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      //   sessionStorage.setItem("DeathPlaceHomeHoueNameEn", DeathPlaceHomeHoueNameEn ? DeathPlaceHomeHoueNameEn : null);
      //   sessionStorage.setItem("DeathPlaceHomehoueNameMl", DeathPlaceHomehoueNameMl ? DeathPlaceHomehoueNameMl : null);
      //   sessionStorage.setItem("DeathPlaceHomeLocalityEn", DeathPlaceHomeLocalityEn ? DeathPlaceHomeLocalityEn : null);
      //   sessionStorage.setItem("DeathPlaceHomeLocalityMl", DeathPlaceHomeLocalityMl ? DeathPlaceHomeLocalityMl : null);
      //   sessionStorage.setItem("DeathPlaceHomeStreetNameEn", DeathPlaceHomeStreetNameEn ? DeathPlaceHomeStreetNameEn : null);
      //   sessionStorage.setItem("DeathPlaceHomeStreetNameMl", DeathPlaceHomeStreetNameMl ? DeathPlaceHomeStreetNameMl : null);
      //   sessionStorage.setItem("DeathPlaceHomePostofficeId", DeathPlaceHomePostofficeId ? DeathPlaceHomePostofficeId.code : null);
      //   sessionStorage.setItem("DeathPlaceHomepincode", DeathPlaceHomepincode ? DeathPlaceHomepincode.code : null);
      // }
      // if (DeathPlace.code === "VEHICLE") {
      //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      //   sessionStorage.setItem("VehicleNumber", VehicleNumber ? VehicleNumber : null);
      //   sessionStorage.setItem("VehicleFromplaceEn", VehicleFromplaceEn ? VehicleFromplaceEn : null);
      //   sessionStorage.setItem("VehicleToPlaceEn", VehicleToPlaceEn ? VehicleToPlaceEn : null);
      //   sessionStorage.setItem("VehicleFromplaceMl", VehicleFromplaceMl ? VehicleFromplaceMl : null);
      //   sessionStorage.setItem("VehicleToPlaceMl", VehicleToPlaceMl ? VehicleToPlaceMl : null);
      //   sessionStorage.setItem("VehicleFirstHaltEn", VehicleFirstHaltEn ? VehicleFirstHaltEn : null);
      //   sessionStorage.setItem("VehicleFirstHaltMl", VehicleFirstHaltMl ? VehicleFirstHaltMl : null);
      //   sessionStorage.setItem("VehicleHospitalEn", VehicleHospitalEn ? VehicleHospitalEn.code : null);
      //   sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
      //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
      // }
      // if (DeathPlace.code === "PUBLIC_PLACES") {
      //   sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      //   sessionStorage.setItem("DeathPlaceLocalityEn", DeathPlaceLocalityEn ? DeathPlaceLocalityEn : null);
      //   sessionStorage.setItem("DeathPlaceLocalityMl", DeathPlaceLocalityMl ? DeathPlaceLocalityMl : null);
      //   sessionStorage.setItem("DeathPlaceStreetEn", DeathPlaceStreetEn ? DeathPlaceStreetEn : null);
      //   sessionStorage.setItem("DeathPlaceStreetMl", DeathPlaceStreetMl ? DeathPlaceStreetMl : null);
      //   sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
      //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId : null);
      // }
      // if (DeathPlace.code === "OUTSIDE_JURISDICTION") {
      //   sessionStorage.setItem("DeathPlaceCountry", DeathPlaceCountry ? DeathPlaceCountry.code : null);
      //   sessionStorage.setItem("DeathPlaceState", DeathPlaceState ? DeathPlaceState.code : null);
      //   sessionStorage.setItem("DeathPlaceDistrict", DeathPlaceDistrict ? DeathPlaceDistrict.code : null);
      //   sessionStorage.setItem("DeathPlaceCity", DeathPlaceCity ? DeathPlaceCity : null);
      //   sessionStorage.setItem("DeathPlaceRemarksEn", DeathPlaceRemarksEn ? DeathPlaceRemarksEn : null);
      //   sessionStorage.setItem("DeathPlaceRemarksMl", DeathPlaceRemarksMl ? DeathPlaceRemarksMl : null);
      //   sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
      //   sessionStorage.setItem("PlaceOfBurialEn", PlaceOfBurialEn ? PlaceOfBurialEn : null);
      //   sessionStorage.setItem("PlaceOfBurialMl", PlaceOfBurialMl ? PlaceOfBurialMl : null);
      //   sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
      // }
      let IsEditChangeScreen = isEditDeath ? isEditDeath : false;

      onSelect(config.key, {
        IsEditChangeScreen,
        ToDate,
        DeathDateUnavailable,
        DeathTimeTo,
        FromDate,
        DeathTimeFrom,
        tenantid,
        DateOfDeath,
        TimeOfDeath,
        placeofBurial,
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
        hospitalNameEn,
        DeathPlaceTypecode,
        DeathPlaceInstId,
        InstitutionIdMl,
        institution,
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
        vehicleType,
        VehicleFromplaceEn,
        VehicleToPlaceEn,
        VehicleFromplaceMl,
        VehicleToPlaceMl,
        VehicleFirstHaltEn,
        VehicleFirstHaltMl,
        VehicleHospitalEn,
        GeneralRemarks,
        DeathPlaceWardId,
        DeathPlaceHomeWardId,
        DeathPlaceType,
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
      });
    }
  };
  if (
    isEditDeath &&
    isEditDeathPageComponents === false &&
    (formData?.DeathNACDetails?.IsEditChangeScreen === false || formData?.DeathNACDetails?.IsEditChangeScreen === undefined)
  ) {
    if (formData?.DeathNACDetails?.DeceasedGender != null) {
      if (menu.length > 0 && (DeceasedGender === undefined || DeceasedGender === "")) {
        setselectedDeceasedGender(menu.filter((menu) => menu.code === formData?.DeathNACDetails?.DeceasedGender)[0]);
      }
    }
    if (formData?.DeathNACDetails?.DeathPlace != null) {
      if (cmbPlace.length > 0 && (DeathPlace === undefined || DeathPlace === "")) {
        setselectDeathPlace(cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.DeathNACDetails?.DeathPlace)[0]);
        setValue(formData?.DeathNACDetails?.DeathPlace);
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
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2}/> : null}
          {window.location.href.includes("/employee") ? <Timeline currentStep={2}/> : null}

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
            {/* <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CheckBox label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")} onChange={() => setChecked((checked) => !checked)} value={checked} />
                  <CheckBox
                    label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")}
                    onChange={setCheckedDate}
                    value={DeathDateUnavailable}
                    checked={DeathDateUnavailable}
                  />
                </div>
              </div>
            </div> */}
            {/* {inside && ( */}
            {/* {DeathDateUnavailable === true && (
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
                    <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
                    <CustomTimePicker name="DeathTimeFrom" onChange={(val) => handleFromTimeChange(val, setDeathTimeFrom)} value={DeathTimeFrom} />
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
                  <div className="col-md-3">
                    <CardLabel>{t("CR_TO_TIME")}</CardLabel>
                    <CustomTimePicker name="DeathTimeTo" onChange={(val) => handleToTimeChange(val, setDeathTimeTo)} value={DeathTimeTo} />
                  </div>
                </div>
              </div>
            )} */}
            {/* {DeathDateUnavailable === false && ( */}
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6" >
                  <CardLabel>
                    {t("CR_DATE_OF_DEATH")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  {/* date={CommencementDate} */}
                  <DatePicker
                    date={DateOfDeath}
                    max={moment().subtract(1, "year").format("YYYY-MM-DD")}
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
                {/* <div className="col-md-2">
                    <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                    <CustomTimePicker name="TimeOfDeath" onChange={(val) => handleTimeChange(val, setDeathTime)} value={TimeOfDeath} />
                  </div> */}
              </div>
            </div>
            {/* )} */}
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
              <div className="col-md-6">
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
            // <div>
              <DeathPlaceHospital
                formData={formData}
                isEditDeath={isEditDeath}
                // selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceType={DeathPlaceType}
                HospitalNameMl={HospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
                hospitalNameEn={hospitalNameEn}
                selecthospitalNameEn={selectHospitalNameEn}
              />
            // </div>
          )}
          {value === "INSTITUTION" && (
            <div>
              <DeathPlaceInstitution
                formData={formData}
                isEditDeath={isEditDeath}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceType={DeathPlaceType}
                DeathPlaceInstId={DeathPlaceInstId}
                setSelectedDeathPlaceInstId={setSelectedDeathPlaceInstId}
                InstitutionIdMl={InstitutionIdMl}
                setInstitutionIdMl={setInstitutionIdMl}
                institution={institution}
                selectinstitution={selectinstitution}
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
                {/* <DeathPlaceVehicle1
                  formData={formData}
                  // isEditAbandonedDeath={isEditAbandonedDeath}
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

                  DeathPlaceType={DeathPlaceType}
                  selectDeathPlaceType={selectDeathPlaceType}
                /> */}
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
              {/* <DeathPublicPlace
                formData={formData}
                isEditDeath={isEditDeath}
                DeathPlaceType={DeathPlaceType}
                selectDeathPlaceType={selectDeathPlaceType}
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
              /> */}
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
          </div>

          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BURIAL_INFO")}`}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{`${t("CR_BURIAL_PLACE")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type="number"
                  max="12"
                  optionKey="i18nKey"
                  name="placeofBurial"
                  value={placeofBurial}
                  onChange={setSelectPlaceofBurial}
                  placeholder="Place of Burial"
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: "Invalid Place of Burial" })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LEGAL_INFORMATION")}`}</span>
              </h1>
            </div>
          </div>
          {/* <div className="row">
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
          </div> */}
          {/* {DeceasedAadharNotAvailable === true && (
            // {checkedAdhar ? (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
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
                <div className="col-md-6">
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
          )} */}
          {/* {DeceasedAadharNotAvailable === false && ( */}
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
                  placeholder={`${t("CR_AADHAR")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
            </div>
          </div>
          {/* )} */}

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
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  {...(validation = {
                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                    isRequired: false,
                    type: "text",
                    title: t("CR_INVALID_LAST_NAME_ML"),
                  })}
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
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
            </div>
          </div>

          {toast && (
            <Toast
              error={DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || sexError || WardNameError}
              label={
                DOBError || AadharError || HospitalError || InstitutionError || InstitutionNameError || sexError || WardNameError
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
                              // : AgeError
                              // ? t(`CR_ERROR_AGE_CHOOSE`)
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
export default NACDeathInformation;
