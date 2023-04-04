import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Loader } from "@egovernments/digit-ui-react-components";
import moment from "moment";
import DeathCorrectionEditPage from "./DeathCorrectionEditPage";

function DeathCorrectionPage({ formData, isEditDeath }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const [uploadStatus, setUploadStatus] = useState({
    approvedPhotoId: false,
  });
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [value, setValue1] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderDeathPlace, setIsInitialRenderDeathPlace] = useState(true);
  const [isInitialMdmsServiceCompleted, setIsInitialMdmsServiceCompleted] = useState(false);

  let location = useLocation();
  let navigationData = location?.state?.correctionData;

  let validation = {};

  console.log("locartion dayta==", location);
  const { data: correctionsData = {}, isSuccess, isError, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "BirthCorrectionDocuments"
  );
  
  
 
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: Menu, isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  let cmbPlace = [];
  let menu = [];
  let cmbNation = [];
  let BirthCorrectionDocuments = [];
  let cmbState = [];
  let naturetype = null;

  
  BirthCorrectionDocuments = correctionsData["birth-death-service"]?.BirthCorrectionDocuments;

  place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMasterDeath &&
    place["common-masters"].PlaceMasterDeath.map((ob) => {
      cmbPlace.push(ob);
    });
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });

  const [DeathPlaceType, selectDeathPlaceType] = useState(
    formData?.InformationDeath?.DeathPlaceType?.code
      ? formData?.InformationDeath?.DeathPlaceType
      : formData?.InformationDeath?.DeathPlaceType
      ? ""
      : ""
  );
  const [HospitalNameMl, selectHospitalNameMl] = useState(
    formData?.InformationDeathails?.HospitalNameMl?.code
      ? formData?.InformationDeath?.HospitalNameMl
      : formData?.InformationDeath?.HospitalNameMl
      ? ""
      : ""
  );

  const [DeathPlace, setselectDeathPlace] = useState(
    formData?.InformationDeath?.DeathPlace?.code
    ? formData?.InformationDeath?.DeathPlace
    : formData?.InformationDeath?.DeathPlace
    ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.ChildDetails?.DeathPlace)[0]
    : "");

  const [DeceasedGender, setselectedDeceasedGender] = useState(
    formData?.InformationDeath?.DeceasedGender?.code
      ? formData?.InformationDeath?.DeceasedGender
      : formData?.InformationDeath?.DeceasedGender
      ? menu.filter((menu) => menu.code === formData?.InformationDeath?.DeceasedGender)[0]
      : ""
  );
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(
    formData?.InformationDeath?.DeceasedAadharNumber ? formData?.InformationDeath?.DeceasedAadharNumber : ""
  );
  const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(
    formData?.InformationDeath?.DeathPlaceInstId ? formData?.InformationDeath?.DeathPlaceInstId : null
  );
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.InformationDeath?.DeathPlaceInstId);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  const [Nationality, setSelectedNationality] = useState(
    formData?.InformationDeath?.Nationality?.code
      ? formData?.InformationDeath?.Nationality
      : formData?.InformationDeath?.Nationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeath?.Nationality)[0]
      : ""
  );


  // Home
  const [DeathPlaceHomePostofficeId, setDeathPlaceHomepostofficeId] = useState(
    formData?.InformationDeath?.DeathPlaceHomePostofficeId ? formData?.InformationDeath?.DeathPlaceHomePostofficeId : null
  );
  const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(
    formData?.InformationDeath?.DeathPlaceHomepincode ? formData?.InformationDeath?.DeathPlaceHomepincode : null
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
  const [DeathPlaceHomeHoueNameMl, setDeathPlaceHomehoueNameMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeHoueNameMl ? formData?.InformationDeath?.DeathPlaceHomeHoueNameMl : null
  );
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

  const [AadharError, setAadharError] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? false : false);



  if ((isLoad || isGenderLoad || isNationLoad || isLoading)) {
    return <Loader />;
  }
  if (
    cmbNation?.length > 0 &&
    menu?.length > 0 &&
    cmbPlace?.length > 0 &&
    BirthCorrectionDocuments?.length > 0 
    // birthInclusionFormData?.length > 0
  ) {
    return (
      <DeathCorrectionEditPage
        cmbNation={cmbNation}
        menu={menu}
        cmbPlace={cmbPlace}
        BirthCorrectionDocuments={BirthCorrectionDocuments}
        navigationData={navigationData}
        // birthInclusionFormData={birthInclusionFormData}
      />
    );
  }
};
export default DeathCorrectionPage;
