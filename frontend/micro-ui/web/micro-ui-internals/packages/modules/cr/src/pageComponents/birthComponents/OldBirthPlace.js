import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, TextArea, Toast, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import HospitalDetails from "./OldHospitalDetails";
import InstitutionDetails from "./OldInstitutionDetails";
import BirthVehicle from "./BirthVehicle";
import PublicPlace from "./OldPublicPlace";
import OtherCountry from "./OldOtherCountry";
import InstitutionAddress from "./OldInstitutionAddress";
import PlaceofBirthHome from "./OldPlaceofBirthHome";
import InformantDetails from "./OldInformantDetails";
import InformantAddress from "./OldInformantAddress";

// import VehicleInformtAddress from "./VehicleInformtAddress";

const BirthPlace = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  // const { data: Menu = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");

  const { data: Menu = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [BirthPlace, selectBirthPlace] = useState(formData?.BirthPlace?.BirthPlace);

  const [toast, setToast] = useState(false);
  const [HospitalError, setHospitalError] = useState(formData?.BirthPlace?.HospitalName ? false : false);
  const [signedOfficerError, setSignedOfficerError] = useState(formData?.BirthPlace?.SignedOfficerName ? false : false);
  const [signedOfficerDesgError, setSignedOfficerDesgError] = useState(formData?.BirthPlace?.SignedOfficerDesignation ? false : false);
  const [mobileError, setMobileError] = useState(formData?.BirthPlace?.SignedOfficerMobileNo ? false : false);
  const [mobileLengthError, setMobileLengthError] = useState(formData?.BirthPlace?.SignedOfficerMobileNo ? false : false);
  const [SignedOfficerAdharNoError, setSignedOfficerAdharNoError] = useState(formData?.BirthPlace?.SignedOfficerAadharNo ? false : false);

  const [InstitutionError, setInstitutionError] = useState(formData?.BirthPlace?.setInstitution ? false : false);
  const [SignedOfficerInstError, setSignedOfficerInstError] = useState(formData?.BirthPlace?.SiginedOfficerDesignation ? false : false);
  const [signedOfficerDesgInstError, setSignedOfficerDesgInstError] = useState(formData?.BirthPlace?.SiginedOfficerDesignation ? false : false);
  const [InstitutionMobilError, setInstitutionMobilError] = useState(formData?.BirthPlace?.InstitutionMobilNo ? false : false);
  const [InstitutionAadharError, setInstitutionAadharError] = useState(formData?.BirthPlace?.InstitutionAadhaar ? false : false);

  const [VehicleRegiNoError, setVehicleRegiNoError] = useState(formData?.BirthPlace?.VehicleRegistrationNo ? false : false);
  const [VehiFromEnError, setVehiFromEnError] = useState(formData?.BirthPlace?.VehicleFromEn ? false : false);
  const [VehiToEnError, setVehiToEnError] = useState(formData?.BirthPlace?.VehicleToEn ? false : false);
  const [VehiFromMlError, setVehiFromMlError] = useState(formData?.BirthPlace?.VehicleFromMl ? false : false);
  const [VehiToMlError, setVehiToMlError] = useState(formData?.BirthPlace?.VehicleToMl ? false : false);

  const [PublicPlaceError, setPublicPlaceError] = useState(formData?.BirthPlace?.setPublicPlaceType ? false : false);
  const [PublicPlaceInfomantFstNameEnError, setPublicPlaceInfomantFstNameEnError] = useState(formData?.BirthPlace?.InfomantFirstNameEn ? false : false);
  const [PublicPlaceInfomantMobileNoError, setPublicPlaceInfomantMobileNoError] = useState(formData?.BirthPlace?.InfomantMobile ? false : false);
  const [PublicPlaceInfomantAadharError, setPublicPlaceInfomantAadharError] = useState(formData?.BirthPlace?.InfomantAadhar ? false : false);
  // const [AdrsInfonmntNameError, setAdrsInfonmntNameError] = useState(formData?.BirthPlace?.AdrsInfontName ? false : false);
  // const [PublicPlaceAdrsError, setPublicPlaceAdrsError] = useState(formData?.BirthPlace?.AdrsPublicPlace ? false : false);

  const [AdrsHomeCountryError, setAdrsHomeCountryError] = useState(formData?.BirthPlace?.AdrsHomeCountry ? false : false);
  const [AdrsHomeStateNameError, setAdrsHomeStateNameError] = useState(formData?.BirthPlace?.AdrsHomeStateName ? false : false);
  const [AdrsHomeDistrictError, setAdrsHomeDistrictError] = useState(formData?.BirthPlace?.AdrsHomeDistrict ? false : false);
  const [AdrsHomeLBTypeNameError, setAdrsHomeLBTypeNameError] = useState(formData?.BirthPlace?.AdrsHomeLBTypeName ? false : false);
  const [AdrsHomeLBNameError, setAdrsHomeLBNameError] = useState(formData?.BirthPlace?.AdrsHomeLBName ? false : false);
  const [AdrsHomeTalukError, setAdrsHomeTalukError] = useState(formData?.BirthPlace?.AdrsHomeTaluk ? false : false);
  const [AdrsHomePostOfficeError, setAdrsHomePostOfficeError] = useState(formData?.BirthPlace?.AdrsHomePostOffice ? false : false);
  const [AdrsHomePincodeError, setAdrsHomePincodeError] = useState(formData?.BirthPlace?.AdrsHomePincode ? false : false);
  const [AdrsHomeHouseNameEnError, setAdrsHomeHouseNameEnError] = useState(formData?.BirthPlace?.AdrsHomeHouseNameEn ? false : false);
  // const [AdrsHomeBuldingNo, setAdrsHomeBuldingNo] = useState(formData?.BirthPlace?.AdrsHomeBuldingNo);
  const [AdrsHomeResNoEnError, setAdrsHomeResNoEnError] = useState(formData?.BirthPlace?.AdrsHomeResNoEn ? false : false);
  // const [AdrsHomeInfomntNameError, setAdrsHomeInfomntNameError] = useState(formData?.BirthPlace?.AdrsHomeInfomntName ? false: false );
  const [AdrsHomeDoorNoError, setAdrsHomeDoorNoError] = useState(formData?.BirthPlace?.AdrsHomeDoorNo ? false : false);
  const [AdrsHomeMainPlaceEnError, setAdrsHomeMainPlaceEnError] = useState(formData?.BirthPlace?.AdrsHomeMainPlaceEn ? false : false);
  const [AdrsHomeLocalityNameEnError, setAdrsHomeLocalityNameEnError] = useState(formData?.BirthPlace?.AdrsHomeLocalityNameEn ? false : false);
  const [AdrsHomeStreetNameEnError, setAdrsHomeStreetNameEnError] = useState(formData?.BirthPlace?.AdrsHomeStreetNameEn ? false : false);
  const [AdrsHomeVillageError, setAdrsHomeVillageError] = useState(formData?.BirthPlace?.AdrsHomeVillage ? false : false);
  const [AdrsHomeMainPlaceMlError, setAdrsHomeMainPlaceMlError] = useState(formData?.BirthPlace?.AdrsHomeMainPlaceMl ? false : false);
  const [AdrsHomeLocalityNameMlError, setAdrsHomeLocalityNameMlError] = useState(formData?.BirthPlace?.AdrsHomeLocalityNameMl ? false : false);
  const [AdrsHomeStreetNameMlError, setAdrsHomeStreetNameMlError] = useState(formData?.BirthPlace?.AdrsHomeStreetNameMl ? false : false);
  const [AdrsHomeHouseNameMlError, setAdrsHomeHouseNameMlError] = useState(formData?.BirthPlace?.AdrsHomeHouseNameMl ? false : false);
  const [AdrsHomeResNoMlError, setAdrsHomeResNoMlError] = useState(formData?.BirthPlace?.AdrsHomeResNoMl ? false : false);

  const [VehiInfomantFstNameEnError, setVehiInfomantFstNameEnError] = useState(formData?.BirthPlace?.InfomantFirstNameEn ? false : false);
  const [VehiInfomantMobileNoError, setVehiInfomantMobileNoError] = useState(formData?.BirthPlace?.InfomantMobile ? false : false);
  const [VehiInfomantAadharError, setVehiInfomantAadharError] = useState(formData?.BirthPlace?.InfomantAadhar ? false : false);

  // const [VehiInfomantAdrCountryError, setVehiInfomantAdrCountryError] = useState(formData?.BirthPlace?.InformantAdrsCountry ? false : false);
  // const [VehiInfomantAdrStateNameError, setVehiInfomantAdrStateNameError] = useState(formData?.BirthPlace?.InformantAdrsStateName ? false : false);
  // const [VehiInfomantAdrDistrictError, setVehiInfomantAdrDistrictError] = useState(formData?.BirthPlace?.InformantAdrsDistrict ? false : false);
  // const [VehiInfomantAdrLBTypeNameError, setVehiInfomantAdrLBTypeNameError] = useState(formData?.BirthPlace?.InformantAdrsLBTypeName ? false : false);
  // const [VehiInfomantAdrLBNameError, setVehiInfomantAdrLBNameError] = useState(formData?.BirthPlace?.InformantAdrsLBName ? false : false);
  // const [VehiInfomantAdrTalukError, setVehiInfomantAdrTalukError] = useState(formData?.BirthPlace?.InformantAdrsTaluk ? false : false);
  // const [VehiInfomantAdrPostOfficeError, setVehiInfomantAdrPostOfficeError] = useState(formData?.BirthPlace?.InformantAdrsPostOffice ? false : false);
  // const [VehiInfomantAdrPincodeError, setVehiInfomantAdrPincodeError] = useState(formData?.BirthPlace?.InformantAdrsPincode ? false : false);
  // const [VehiInfomantAdrHouseNameEnError, setVehiInfomantAdrHouseNameEnError] = useState(formData?.BirthPlace?.InformantAdrsHouseNameEn ? false : false);
  // const [VehiInfomantAdrResNoEnError, setVehiInfomantAdrResNoEnError] = useState(formData?.BirthPlace?.InformantAdrsResNo ? false : false);
  // const [VehiInfomantAdrDoorNoError, setVehiInfomantAdrDoorNoError] = useState(formData?.BirthPlace?.InformantAdrsDoorNo ? false : false);
  // const [VehiInfomantAdrMainPlaceEnError, setVehiInfomantAdrMainPlaceEnError] = useState(formData?.BirthPlace?.InformantAdrsMainPlaceEn ? false : false);
  // const [VehiInfomantAdrLocalityNameEnError, setVehiInfomantAdrLocalityNameEnError] = useState(formData?.BirthPlace?.InformantAdrsLocalityNameEn ? false : false);
  // const [VehiInfomantAdrStreetNameEnError, setVehiInfomantAdrStreetNameEnError] = useState(formData?.BirthPlace?.InformantAdrsStreetNameEn ? false : false);
  // const [VehiInfomantAdrVillageError, setVehiInfomantAdrVillageError] = useState(formData?.BirthPlace?.InformantAdrsVillage ? false : false);

  const [HomeInformantFstNameEnError, setHomeInformantFstNameEnError] = useState(formData?.BirthPlace?.InfomantFirstNameEn ? false : false);
  const [HomeInformantMobileNoError, setHomeInformantMobileNoError] = useState(formData?.BirthPlace?.InfomantMobile ? false : false);
  const [HomeInformantAadharError, setHomeInformantAadharError] = useState(formData?.BirthPlace?.InfomantAadhar ? false : false);

  // const [HomeInformantAdrCountryError, setHomeInformantAdrCountryError] = useState(formData?.BirthPlace?.InformantAdrsCountry ? false : false);
  // const [HomeInformantAdrStateNameError, setHomeInformantAdrStateNameError] = useState(formData?.BirthPlace?.InformantAdrsStateName ? false : false);
  // const [HomeInformantAdrDistrictError, setHomeInformantAdrDistrictError] = useState(formData?.BirthPlace?.InformantAdrsDistrict ? false : false);
  // const [HomeInformantAdrLBTypeNameError, setHomeInformantAdrLBTypeNameError] = useState(formData?.BirthPlace?.InformantAdrsLBTypeName ? false : false);
  // const [HomeInformantAdrLBNameError, setHomeInformantAdrLBNameError] = useState(formData?.BirthPlace?.InformantAdrsLBName ? false : false);
  // const [HomeInformantAdrTalukError, setHomeInformantAdrTalukError] = useState(formData?.BirthPlace?.InformantAdrsTaluk ? false : false);
  // const [HomeInformantAdrPostOfficeError, setHomeInformantAdrPostOfficeError] = useState(formData?.BirthPlace?.InformantAdrsPostOffice ? false : false);
  // const [HomeInformantAdrPincodeError, setHomeInformantAdrPincodeError] = useState(formData?.BirthPlace?.InformantAdrsPincode ? false : false);
  // const [HomeInformantAdrHouseNameEnError, setHomeInformantAdrHouseNameEnError] = useState(formData?.BirthPlace?.InformantAdrsHouseNameEn ? false : false);
  // const [HomeInformantAdrResNoEnError, setHomeInformantAdrResNoEnError] = useState(formData?.BirthPlace?.InformantAdrsResNo ? false : false);
  // const [HomeInformantAdrDoorNoError, setHomeInformantAdrDoorNoError] = useState(formData?.BirthPlace?.InformantAdrsDoorNo ? false : false);
  // const [HomeInformantAdrMainPlaceEnError, setHomeInformantAdrMainPlaceEnError] = useState(formData?.BirthPlace?.InformantAdrsMainPlaceEn ? false : false);
  // const [HomeInformantAdrLocalityNameEnError, setHomeInformantAdrLocalityNameEnError] = useState(formData?.BirthPlace?.InformantAdrsLocalityNameEn ? false : false);
  // const [HomeInformantAdrStreetNameEnError, setHomeInformantAdrStreetNameEnError] = useState(formData?.BirthPlace?.InformantAdrsStreetNameEn ? false : false);
  // const [HomeInformantAdrVillageError, setHomeInformantAdrVillageError] = useState(formData?.BirthPlace?.InformantAdrsVillage ? false : false);

  // const [BirthPlaceDescription, setBirthPlaceDeccription] = useState(formData?.BirthPlace?.BirthPlaceDescription);
  const [HospitalName, selectHospitalName] = useState(formData?.BirthPlace?.HospitalName ? formData?.BirthPlace?.HospitalName : null);
  const [SignedOfficerName, selectSignedOfficerName] = useState(
    formData?.BirthPlace?.SignedOfficerName ? formData?.BirthPlace?.SignedOfficerName : null
  );
  const [SignedOfficerDesignation, selectSignedOfficerDesignation] = useState(
    formData?.BirthPlace?.SignedOfficerDesignation ? formData?.BirthPlace?.SignedOfficerDesignation : null
  );
  const [SignedOfficerAadharNo, setSignedOfficerAadharNo] = useState(
    formData?.BirthPlace?.SignedOfficerAadharNo ? formData?.BirthPlace?.SignedOfficerAadharNo : ""
  );
  const [SignedOfficerMobileNo, setSignedOfficerMobileNo] = useState(
    formData?.BirthPlace?.SignedOfficerMobileNo ? formData?.BirthPlace?.SignedOfficerMobileNo : ""
  );
  const [SignedOfficerNameOther, selectSignedOfficerNameOther] = useState(formData?.BirthPlace?.SignedOfficerNameOther ? formData?.BirthPlace?.SignedOfficerNameOther : "");
  const [SignedOfficerDesignationOther, selectSignedOfficerDesignationOther] = useState(formData?.BirthPlace?.SignedOfficerDesignationOther ? formData?.BirthPlace?.SignedOfficerDesignationOther : "");
  const [SignedOfficerOtherStatus, setSignedOfficerOtherStatus] = useState(formData?.BirthPlace?.SignedOfficerOtherStatus ? formData?.BirthPlace?.SignedOfficerOtherStatus : "");


  const [setInstitution, setSelectedInstitution] = useState(formData?.BirthPlace?.setInstitution ? formData?.BirthPlace?.setInstitution : null);
  const [setInstitutionId, setSelectedInstitutionId] = useState(
    formData?.BirthPlace?.setInstitutionId ? formData?.BirthPlace?.setInstitutionId : null
  );
  const [SiginedOfficer, setSiginedOfficer] = useState(formData?.BirthPlace?.SiginedOfficer ? formData?.BirthPlace?.SiginedOfficer : "");
  const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(
    formData?.BirthPlace?.SiginedOfficerDesignation ? formData?.BirthPlace?.SiginedOfficerDesignation : ""
  );
  const [InstitutionMobilNo, setInstitutionMobilNo] = useState(
    formData?.BirthPlace?.InstitutionMobilNo ? formData?.BirthPlace?.InstitutionMobilNo : ""
  );
  const [InstitutionAadhaar, setInstitutionAadhaar] = useState(
    formData?.BirthPlace?.InstitutionAadhaar ? formData?.BirthPlace?.InstitutionAadhaar : ""
  );

  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(
    formData?.BirthPlace?.VehicleRegistrationNo ? formData?.BirthPlace?.VehicleRegistrationNo : ""
  );
  const [VehicleFromEn, setVehicleFromEn] = useState(formData?.BirthPlace?.setVehicleFromEn ? formData?.BirthPlace?.setVehicleFromEn : "");
  const [VehicleToEn, setVehicleToEn] = useState(formData?.BirthPlace?.setSelectVehicleToEn ? formData?.BirthPlace?.setSelectVehicleToEn : "");
  const [VehicleHaltPlace, setVehicleHaltPlace] = useState(formData?.BirthPlace?.VehicleHaltPlace ? formData?.BirthPlace?.VehicleHaltPlace : "");
  const [VehicleFromMl, setVehicleFromMl] = useState(formData?.BirthPlace?.VehicleFromMl ? formData?.BirthPlace?.VehicleFromMl : "");
  const [VehicleToMl, setVehicleToMl] = useState(formData?.BirthPlace?.VehicleToMl ? formData?.BirthPlace?.VehicleToMl : "");
  const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(
    formData?.BirthPlace?.VehicleOtherDetailsEn ? formData?.BirthPlace?.VehicleOtherDetailsEn : ""
  );
  const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(
    formData?.BirthPlace?.VehicleOtherDetailsMl ? formData?.BirthPlace?.VehicleOtherDetailsMl : ""
  );
  const [setAdmittedHospitalEn, setSelectedAdmittedHospitalEn] = useState(formData?.BirthPlace?.setAdmittedHospitalEn);
  const [setAdmittedHospitalMl, setSelectedAdmittedHospitalMl] = useState(formData?.BirthPlace?.setAdmittedHospitalMl);

  // const [WardNo, setWardNo] = useState(formData.BirthPlace?.wardno);

  const [setPublicPlaceType, setSelectedPublicPlaceType] = useState(
    formData?.BirthPlace?.setPublicPlaceType ? formData?.BirthPlace?.setPublicPlaceType : null
  );
  // const [AdrsInfontName, setAdrsInfontName] = useState(formData?.BirthPlace?.AdrsInfontName ? formData?.BirthPlace?.AdrsInfontName : "");
  const [AdrsPublicPlace, setAdrsPublicPlace] = useState(formData?.BirthPlace?.AdrsPublicPlace ? formData?.BirthPlace?.AdrsPublicPlace : "");
  // const [PublicPlaceDesption, setPublicPlaceDesption] = useState(
  //   formData?.BirthPlace?.PublicPlaceDesption ? formData?.BirthPlace?.PublicPlaceDesption : ""
  // );

  const [AdrsCountry, setAdrsCountry] = useState(formData?.BirthPlace?.AdrsCountry ? formData?.BirthPlace?.AdrsCountry : null);
  const [AdrsStateName, setAdrsStateName] = useState(formData?.BirthPlace?.AdrsStateName ? formData?.BirthPlace?.AdrsStateName : null);
  const [AdrsDistrict, setAdrsDistrict] = useState(formData?.BirthPlace?.AdrsDistrict ? formData?.BirthPlace?.AdrsDistrict : null);
  const [AdrsLBTypeName, setAdrsLBTypeName] = useState(formData?.BirthPlace?.AdrsLBTypeName ? formData?.BirthPlace?.AdrsLBTypeName : null);
  const [AdrsLBName, setAdrsLBName] = useState(formData?.BirthPlace?.AdrsLBName ? formData?.BirthPlace?.AdrsLBName : null);
  const [AdrsTaluk, setAdrsTaluk] = useState(formData?.BirthPlace?.AdrsTaluk ? formData?.BirthPlace?.AdrsTaluk : null);
  const [AdrsVillage, setAdrsVillage] = useState(formData?.BirthPlace?.AdrsVillage ? formData?.BirthPlace?.AdrsVillage : null);
  const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.BirthPlace?.AdrsPostOffice ? formData?.BirthPlace?.AdrsPostOffice : null);
  const [AdrsPincode, setAdrsPincode] = useState(formData?.BirthPlace?.AdrsPincode ? formData?.BirthPlace?.AdrsPincode : "");
  const [AdrsMainPlaceEn, setAdrsMainPlaceEn] = useState(formData?.BirthPlace?.AdrsMainPlaceEn ? formData?.BirthPlace?.AdrsMainPlaceEn : "");
  const [AdrsMainPlaceMl, setAdrsMainPlaceMl] = useState(formData?.BirthPlace?.AdrsMainPlaceMl ? formData?.BirthPlace?.AdrsMainPlaceMl : "");
  const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(
    formData?.BirthPlace?.AdrsLocalityNameEn ? formData?.BirthPlace?.AdrsLocalityNameEn : ""
  );
  const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(
    formData?.BirthPlace?.AdrsLocalityNameMl ? formData?.BirthPlace?.AdrsLocalityNameMl : ""
  );
  const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.BirthPlace?.AdrsStreetNameEn ? formData?.BirthPlace?.AdrsStreetNameEn : "");
  const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.BirthPlace?.AdrsStreetNameMl ? formData?.BirthPlace?.AdrsStreetNameMl : "");
  const [AdrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.BirthPlace?.AdrsHouseNameEn ? formData?.BirthPlace?.AdrsHouseNameEn : "");
  const [AdrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.BirthPlace?.AdrsHouseNameMl ? formData?.BirthPlace?.AdrsHouseNameMl : "");
  const [AdrsDoorNo, setAdrsDoorNo] = useState(formData?.BirthPlace?.AdrsDoorNo ? formData?.BirthPlace?.AdrsDoorNo : "");
  const [AdrsSubNo, setAdrsSubNo] = useState(formData?.BirthPlace?.AdrsSubNo ? formData?.BirthPlace?.AdrsSubNo : "");
  const [AdrsResNoEn, setAdrsResNoEn] = useState(formData?.BirthPlace?.AdrsResNoEn ? formData?.BirthPlace?.AdrsResNoEn : "");
  const [AdrsResNoMl, setAdrsResNoMl] = useState(formData?.BirthPlace?.AdrsResNoMl ? formData?.BirthPlace?.AdrsResNoMl : "");

  const [InfomantFirstNameEn, setInfomantFirstNameEn] = useState(
    formData?.BirthPlace?.InfomantFirstNameEn ? formData?.BirthPlace?.InfomantFirstNameEn : ""
  );
  const [InfomantAadhar, setInfomantAadhar] = useState(formData?.BirthPlace?.InfomantAadhar ? formData?.BirthPlace?.InfomantAadhar : "");
  const [InfomantEmail, setInfomantEmail] = useState(formData?.BirthPlace?.InfomantEmail ? formData?.BirthPlace?.InfomantEmail : "");
  const [InfomantMobile, setInfomantMobile] = useState(formData?.BirthPlace?.InfomantMobile ? formData?.BirthPlace?.InfomantMobile : "");
  const [InformantAddressLineOne, setInformantAddressLineOne] = useState(
    formData?.BirthPlace?.InformantAddressLineOne ? formData?.BirthPlace?.InformantAddressLineOne : ""
  );
  const [InformantAddressLineTwo, setInformantAddressLineTwo] = useState(
    formData?.BirthPlace?.InformantAddressLineTwo ? formData?.BirthPlace?.InformantAddressLineTwo : ""
  );

  // const [InformantAdrsCountry, setInformantAdrsCountry] = useState(formData?.BirthPlace?.InformantAdrsCountry ? formData?.BirthPlace?.InformantAdrsCountry : null);
  // const [InformantAdrsStateName, setInformantAdrsStateName] = useState(formData?.BirthPlace?.InformantAdrsStateName ? formData?.BirthPlace?.InformantAdrsStateName : null);
  // const [InformantAdrsDistrict, setInformantAdrsDistrict] = useState(formData?.BirthPlace?.InformantAdrsDistrict ? formData?.BirthPlace?.InformantAdrsDistrict : null);
  // const [InformantAdrsLBTypeName, setInformantAdrsLBTypeName] = useState(formData?.BirthPlace?.InformantAdrsLBTypeName ? formData?.BirthPlace?.InformantAdrsLBTypeName : null);
  // const [InformantAdrsLBName, setInformantAdrsLBName] = useState(formData?.BirthPlace?.InformantAdrsLBName ? formData?.BirthPlace?.InformantAdrsLBName : null);
  // const [InformantAdrsTaluk, setInformantAdrsTaluk] = useState(formData?.BirthPlace?.InformantAdrsTaluk ? formData?.BirthPlace?.InformantAdrsTaluk : null);
  // const [InformantAdrsVillage, setInformantAdrsVillage] = useState(formData?.BirthPlace?.InformantAdrsVillage ? formData?.BirthPlace?.InformantAdrsVillage : null);
  // const [InformantAdrsPostOffice, setInformantAdrsPostOffice] = useState(formData?.BirthPlace?.InformantAdrsPostOffice ? formData?.BirthPlace?.InformantAdrsPostOffice : null);
  // const [InformantAdrsPincode, setInformantAdrsPincode] = useState(formData?.BirthPlace?.InformantAdrsPincode ? formData?.BirthPlace?.InformantAdrsPincode : null);
  // const [InformantAdrsMainPlaceEn, setInformantAdrsMainPlaceEn] = useState(formData?.BirthPlace?.InformantAdrsMainPlaceEn ? formData?.BirthPlace?.InformantAdrsMainPlaceEn : "");
  // const [InformantAdrsLocalityNameEn, setInformantAdrsLocalityNameEn] = useState(formData?.BirthPlace?.InformantAdrsLocalityNameEn ? formData?.BirthPlace?.InformantAdrsLocalityNameEn : null);
  // const [InformantAdrsStreetNameEn, setInformantAdrsStreetNameEn] = useState(formData?.BirthPlace?.InformantAdrsStreetNameEn ? formData?.BirthPlace?.InformantAdrsStreetNameEn : null);
  // const [InformantAdrsHouseNameEn, setInformantAdrsHouseNameEn] = useState(formData?.BirthPlace?.InformantAdrsHouseNameEn ? formData?.BirthPlace?.InformantAdrsHouseNameEn : null);
  // const [InformantAdrsDoorNo, setInformantAdrsDoorNo] = useState(formData?.BirthPlace?.InformantAdrsDoorNo ? formData?.BirthPlace?.InformantAdrsDoorNo : null);
  // const [InformantAdrsResNo, setInformantAdrsResNo] = useState(formData?.BirthPlace?.InformantAdrsResNo ? formData?.BirthPlace?.InformantAdrsResNo : null);

  // const [InfntWardNo, setInfntWardNo] = useState(formData.BirthPlace?.InfntWardNo);

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [LBCombo, setLBCombo] = useState(null);

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let menu = [];
  let naturetype = null;
  let cmbLB = [];
  let cmbDistrict = [];
  let cmbCountry = [];
  let cmbState = [];
  let cmbLBType = [];
  let cmbTaluk = [];
  let cmbVillage = [];

  // Menu &&
  // Menu["birth-death-service"] &&
  // Menu["birth-death-service"].PlaceMaster.map((ob) => {
  //   menu.push(ob);
  // });

  Menu &&
  Menu["birth-death-service"] &&
  Menu["birth-death-service"].PlaceMaster.map((ob) => {
    menu.push(ob);
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
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
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
  const onSkip = () => onSelect();

  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
    // setIsInitialRenderLB(true);

  }

  React.useEffect(() => {
    if (isInitialRender) {
      if (BirthPlace) {
        setIsInitialRender(false);
        naturetype = BirthPlace.code;
        setValue(naturetype);
        // setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        if (naturetype === "HOSPITAL") {
          <HospitalDetails
            HospitalName={HospitalName}
            SignedOfficerName={SignedOfficerName}
            SignedOfficerDesignation={SignedOfficerDesignation}
            SignedOfficerAadharNo={SignedOfficerAadharNo}
            SignedOfficerMobileNo={SignedOfficerMobileNo}
            SignedOfficerNameOther={SignedOfficerNameOther}
            SignedOfficerDesignationOther={SignedOfficerDesignationOther}
            SignedOfficerOtherStatus={SignedOfficerOtherStatus}
          />;
        }
        if (naturetype === "INSTITUTION") {
          <InstitutionDetails
            setInstitution={setInstitution}
            setInstitutionId={setInstitutionId}
            SiginedOfficer={SiginedOfficer}
            SiginedOfficerDesignation={SiginedOfficerDesignation}
            InstitutionMobilNo={InstitutionMobilNo}
            InstitutionAadhaar={InstitutionAadhaar}
          />;
        }
        if (naturetype === "VEHICLE") {
          <BirthVehicle
            VehicleRegistrationNo={VehicleRegistrationNo}
            VehicleFromEn={VehicleFromEn}
            VehicleToEn={VehicleToEn}
            VehicleFromMl={VehicleFromMl}
            VehicleHaltPlace={VehicleHaltPlace}
            VehicleToMl={VehicleToMl}
            VehicleOtherDetailsEn={VehicleOtherDetailsEn}
            VehicleOtherDetailsMl={VehicleOtherDetailsMl}
            setAdmittedHospitalEn={setAdmittedHospitalEn}
            setAdmittedHospitalMl={setAdmittedHospitalMl}
          />;
        }

        if (naturetype === "PUBLIC_PLACES") {
          <PublicPlace
            setPublicPlaceType={setPublicPlaceType}
          // AdrsInfontName={AdrsInfontName}
          // AdrsPublicPlace={AdrsPublicPlace}
          // PublicPlaceDesption={PublicPlaceDesption}
          />;
        }

        if (naturetype === "HOME") {
          <PlaceofBirthHome
            AdrsCountry={AdrsCountry}
            AdrsStateName={AdrsStateName}
            AdrsDistrict={AdrsDistrict}
            AdrsLBTypeName={AdrsLBTypeName}
            AdrsLBName={AdrsLBName}
            AdrsTaluk={AdrsTaluk}
            AdrsVillage={AdrsVillage}
            AdrsPostOffice={AdrsPostOffice}
            AdrsPincode={AdrsPincode}
            AdrsMainPlaceEn={AdrsMainPlaceEn}
            AdrsMainPlaceMl={AdrsMainPlaceMl}
            AdrsLocalityNameEn={AdrsLocalityNameEn}
            AdrsLocalityNameMl={AdrsLocalityNameMl}
            AdrsStreetNameEn={AdrsStreetNameEn}
            AdrsStreetNameMl={AdrsStreetNameMl}
            AdrsHouseNameEn={AdrsHouseNameEn}
            AdrsHouseNameMl={AdrsHouseNameMl}
            AdrsDoorNo={AdrsDoorNo}
            AdrsSubNo={AdrsSubNo}
            AdrsResNoEn={AdrsResNoEn}
            AdrsResNoMl={AdrsResNoMl}
            LBCombo={LBCombo}

          />;
        }
        if (naturetype === "HOME  || VEHICLE || PUBLIC_PLACES") {
          <InformantDetails
            InfomantFirstNameEn={InfomantFirstNameEn}
            InfomantAadhar={InfomantAadhar}
            InfomantEmail={InfomantEmail}
            InfomantMobile={InfomantMobile}
            InformantAddressLineOne={InformantAddressLineOne}
            InformantAddressLineTwo={InformantAddressLineTwo}
          />;
        }

        // if (naturetype === "HOME || VEHICLE") {
        //   <InformantAddress
        //     InformantAdrsCountry={InformantAdrsCountry}
        //     InformantAdrsStateName={InformantAdrsStateName}
        //     InformantAdrsDistrict={InformantAdrsDistrict}
        //     InformantAdrsLBTypeName={InformantAdrsLBTypeName}
        //     InformantAdrsLBName={InformantAdrsLBName}
        //     InformantAdrsTaluk={InformantAdrsTaluk}
        //     InformantAdrsVillage={InformantAdrsVillage}
        //     InformantAdrsPostOffice={InformantAdrsPostOffice}
        //     InformantAdrsPincode={InformantAdrsPincode}
        //     InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
        //     InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
        //     InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
        //     InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
        //     InformantAdrsDoorNo={InformantAdrsDoorNo}
        //     InformantAdrsResNo={InformantAdrsResNo}

        //   />

        // }
      }
    }
  }, [isInitialRender]);

  let validFlag = true;
  const goNext = () => {
    if (BirthPlace.code === "HOSPITAL") {
      if (HospitalName == null) {
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setHospitalError(false);
        if (SignedOfficerName == null) {
          setSignedOfficerError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setSignedOfficerError(false);
          if (SignedOfficerName.hospitalRegistar === "Others") {
            if (SignedOfficerNameOther == null || SignedOfficerNameOther == "" || SignedOfficerNameOther == undefined) {
              setSignedOfficerError(true);
              validFlag = false;
              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 2000);
            } else {
              setSignedOfficerError(false);
            }
            if (SignedOfficerDesignationOther == null || SignedOfficerDesignationOther == "" || SignedOfficerDesignationOther == undefined) {
              setSignedOfficerDesgError(true);
              validFlag = false;
              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 2000);
            }
            else {
              setSignedOfficerDesgError(false);
            }
          } else {
            if (SignedOfficerDesignation == null || SignedOfficerDesignation == "") {
              setSignedOfficerDesgError(true);
              validFlag = false;
              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 2000);
            } else {
              setSignedOfficerDesgError(false);
            }
          }
        }
      }
      if (SignedOfficerMobileNo != null || SignedOfficerMobileNo != "") {
        let MobileLen = SignedOfficerMobileNo;
        if (MobileLen.length != 0) {
          if (MobileLen.length > 10) {
            setMobileError(false);
            setMobileLengthError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else if (MobileLen.length < 10) {
            setMobileError(false);
            setMobileLengthError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else {
            setMobileError(false);
            setMobileLengthError(false);
          }
        } else {
          setMobileError(true);
          setMobileLengthError(false);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          return false;
        }
      } else {
        setMobileError(true);
        setMobileLengthError(false);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        return false;
      }
      if (SignedOfficerAadharNo != null || SignedOfficerAadharNo != "") {
        let AdharLen = SignedOfficerAadharNo;
        if (AdharLen.length != 0) {
          if (AdharLen.length > 12) {
            setSignedOfficerAdharNoError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else if (AdharLen.length < 12) {
            setSignedOfficerAdharNoError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else {
            setSignedOfficerAdharNoError(false);
          }
        }
      } else {
        setSignedOfficerAdharNoError(false);
      }
    }

    if (BirthPlace.code === "INSTITUTION") {
      if (setInstitution == null) {
        setInstitutionError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setInstitutionError(false);
      }
      if (SiginedOfficer == null || SiginedOfficer == "") {
        setSignedOfficerInstError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setSignedOfficerInstError(false);
      }
      if (SiginedOfficerDesignation == null || SiginedOfficerDesignation == "") {
        setSignedOfficerDesgInstError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setSignedOfficerDesgInstError(false);
      }
      if (InstitutionMobilNo != null || InstitutionMobilNo != "") {
        let MobileLen = InstitutionMobilNo;
        if (MobileLen.length != 0) {
          if (MobileLen.length > 10) {
            setMobileLengthError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else if (MobileLen.length < 10) {
            setMobileLengthError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else {
            setMobileLengthError(false);
            setInstitutionMobilError(false);
          }
        }
      } else {
        setMobileLengthError(false);
        setInstitutionMobilError(false);
      }
      if (InstitutionAadhaar != null || InstitutionAadhaar != "") {
        let AdharLen = InstitutionAadhaar;
        if (AdharLen.length != 0) {
          if (AdharLen.length > 12) {
            setInstitutionAadharError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else if (AdharLen.length < 12) {
            setInstitutionAadharError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else {
            setInstitutionAadharError(false);
          }
        }
      } else {
        setInstitutionAadharError(false);
      }
    }

    if (BirthPlace.code === "VEHICLE") {
      if (VehicleRegistrationNo == null || VehicleRegistrationNo == "") {
        setVehicleRegiNoError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehicleRegiNoError(false);
      }
      if (VehicleFromEn == null || VehicleFromEn == "") {
        setVehiFromEnError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehiFromEnError(false);
      }
      if (VehicleToEn == null || VehicleToEn == "") {
        setVehiToEnError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehiToEnError(false);
      }

      if (VehicleFromMl == null || VehicleFromMl == "") {
        setVehiFromMlError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehiFromMlError(false);
      }
      if (VehicleToMl == null || VehicleToMl == "") {
        setVehiToMlError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehiToMlError(false);
      }
      if (InfomantFirstNameEn == null || InfomantFirstNameEn == "") {
        setVehiInfomantFstNameEnError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehiInfomantFstNameEnError(false);
      }
      if (InfomantMobile != null || InfomantMobile != "") {
        let MobileLen = InfomantMobile;
        if (MobileLen.length != 0) {
          if (MobileLen.length > 10) {
            setVehiInfomantMobileNoError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else if (MobileLen.length < 10) {
            setVehiInfomantMobileNoError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else {
            setMobileError(false);
            setVehiInfomantMobileNoError(false);
          }
        }
      } else {
        setMobileError(false);
        setInstitutionMobilError(false);
      }

      if (InfomantMobile == null || InfomantMobile == "") {
        setVehiInfomantMobileNoError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setVehiInfomantMobileNoError(false);
      }

      // if (InformantAdrsCountry == null) {
      //   setVehiInfomantAdrCountryError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrCountryError(false);
      // }

      // if (InformantAdrsStateName == null) {
      //   setVehiInfomantAdrStateNameError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrStateNameError(false);
      // }
      // if (InformantAdrsDistrict == null) {
      //   setVehiInfomantAdrDistrictError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrDistrictError(false);
      // }
      // if (InformantAdrsLBTypeName == null) {
      //   setVehiInfomantAdrLBTypeNameError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrLBTypeNameError(false);
      // }
      // if (InformantAdrsLBName == null) {
      //   setVehiInfomantAdrLBNameError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrLBNameError(false);
      // }
      // if (InformantAdrsTaluk == null) {
      //   setVehiInfomantAdrTalukError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrTalukError(false);
      // }
      // if (InformantAdrsVillage == null) {
      //   setVehiInfomantAdrVillageError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrVillageError(false);
      // }
      // if (InformantAdrsPostOffice == null) {
      //   setVehiInfomantAdrPostOfficeError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrPostOfficeError(false);
      // }

      // if (InformantAdrsPincode == null || InformantAdrsPincode == "") {
      //   setVehiInfomantAdrPincodeError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrPincodeError(false);
      // }
      // if (InformantAdrsMainPlaceEn == null || InformantAdrsMainPlaceEn == "") {
      //   setVehiInfomantAdrMainPlaceEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrMainPlaceEnError(false);
      // }
      // if (InformantAdrsLocalityNameEn == null || InformantAdrsLocalityNameEn == "") {
      //   setVehiInfomantAdrLocalityNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrLocalityNameEnError(false);
      // }
      // if (InformantAdrsStreetNameEn == null || InformantAdrsStreetNameEn == "") {
      //   setVehiInfomantAdrStreetNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrStreetNameEnError(false);
      // }
      // if (InformantAdrsHouseNameEn == null || InformantAdrsHouseNameEn == "") {
      //   setVehiInfomantAdrHouseNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrHouseNameEnError(false);
      // }

      // if (InformantAdrsDoorNo == null || InformantAdrsDoorNo == "") {
      //   setVehiInfomantAdrDoorNoError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrDoorNoError(false);
      // }

      // if (InformantAdrsResNo == null || InformantAdrsResNo == "") {
      //   setVehiInfomantAdrResNoEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setVehiInfomantAdrResNoEnError(false);
      // }
    }
    if (BirthPlace.code === "PUBLIC_PLACES") {
      if (setPublicPlaceType == null) {
        setPublicPlaceError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setPublicPlaceError(false);
      }
      if (InfomantFirstNameEn == null || InfomantFirstNameEn == "") {
        setPublicPlaceInfomantFstNameEnError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setPublicPlaceInfomantFstNameEnError(false);
      }
      if (InfomantMobile != null || InfomantMobile != "") {
        let MobileLen = InfomantMobile;
        if (MobileLen.length != 0) {
          if (MobileLen.length > 10) {
            setPublicPlaceInfomantMobileNoError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else if (MobileLen.length < 10) {
            setPublicPlaceInfomantMobileNoError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            return false;
          } else {
            setMobileError(false);
            setPublicPlaceInfomantMobileNoError(false);
          }
        }
      } else {
        setMobileError(false);
        setPublicPlaceInfomantMobileNoError(false);
      }

      if (InfomantMobile == null || InfomantMobile == "") {
        setPublicPlaceInfomantMobileNoError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setPublicPlaceInfomantMobileNoError(false);
      }


    }



    //   if (AdrsInfontName == null || AdrsInfontName == "") {
    //     setAdrsInfonmntNameError(true);
    //     validFlag = false;
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setAdrsInfonmntNameError(false);
    //   }
    //   if (AdrsPublicPlace == null || AdrsPublicPlace == "") {
    //     setPublicPlaceAdrsError(true);
    //     validFlag = false;
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setPublicPlaceAdrsError(false);
    //   }
    // }

    if (BirthPlace.code === "HOME") {
      if (AdrsCountry == null) {
        setAdrsHomeCountryError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdrsHomeCountryError(false);
      }

      if (AdrsStateName == null) {
        setAdrsHomeStateNameError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdrsHomeStateNameError(false);
      }
      if (AdrsDistrict == null) {
        setAdrsHomeDistrictError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdrsHomeDistrictError(false);
      }
      if (AdrsLBTypeName == null) {
        setAdrsHomeLBTypeNameError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdrsHomeLBTypeNameError(false);
      }
      if (AdrsLBName == null) {
        setAdrsHomeLBNameError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdrsHomeLBNameError(false);
      }
      // if (AdrsTaluk == null) {
      //   setAdrsHomeTalukError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeTalukError(false);
      // }
      // if (AdrsVillage == null) {
      //   setAdrsHomeVillageError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeVillageError(false);
      // }
      // if (AdrsPostOffice == null) {
      //   setAdrsHomePostOfficeError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomePostOfficeError(false);
      // }

      if (AdrsPincode == null || AdrsPincode == "") {
        setAdrsHomePincodeError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdrsHomePincodeError(false);
      }
      // if (AdrsMainPlaceEn == null || AdrsMainPlaceEn == "") {
      //   setAdrsHomeMainPlaceEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeMainPlaceEnError(false);
      // }
      // if (AdrsMainPlaceMl == null || AdrsMainPlaceMl == "") {
      //   setAdrsHomeMainPlaceMlError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeMainPlaceMlError(false);
      // }
      // if (AdrsLocalityNameEn == null || AdrsLocalityNameEn == "") {
      //   setAdrsHomeLocalityNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeLocalityNameEnError(false);
      // }
      // if (AdrsLocalityNameMl == null || AdrsLocalityNameMl == "") {
      //   setAdrsHomeLocalityNameMlError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeLocalityNameMlError(false);
      // }
      // if (AdrsStreetNameEn == null || AdrsStreetNameEn == "") {
      //   setAdrsHomeStreetNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeStreetNameEnError(false);
      // }
      // if (AdrsStreetNameMl == null || AdrsStreetNameMl == "") {
      //   setAdrsHomeStreetNameMlError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeStreetNameMlError(false);
      // }
      // if (AdrsHouseNameEn == null || AdrsHouseNameEn == "") {
      //   setAdrsHomeHouseNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeHouseNameEnError(false);
      // }
      // if (AdrsHouseNameMl == null || AdrsHouseNameMl == "") {
      //   setAdrsHomeHouseNameMlError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeHouseNameMlError(false);
      // }
      // if (AdrsDoorNo == null || AdrsDoorNo == "") {
      //   setAdrsHomeDoorNoError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeDoorNoError(false);
      // }

      // if (AdrsResNoEn == null || AdrsResNoEn == "") {
      //   setAdrsHomeResNoEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeResNoEnError(false);
      // }

      // if (AdrsResNoMl == null || AdrsResNoMl == "") {
      //   setAdrsHomeResNoMlError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setAdrsHomeResNoMlError(false);
      // }

      if (InfomantFirstNameEn == null || InfomantFirstNameEn == "") {
        setHomeInformantFstNameEnError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setHomeInformantFstNameEnError(false);
      }
      if (InfomantMobile == null || InfomantMobile == "") {
        setHomeInformantMobileNoError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setHomeInformantMobileNoError(false);
      }

      // if (InformantAdrsCountry == null) {
      //   setHomeInformantAdrCountryError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrCountryError(false);
      // }

      // if (InformantAdrsStateName == null) {
      //   setHomeInformantAdrStateNameError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrStateNameError(false);
      // }
      // if (InformantAdrsDistrict == null) {
      //   setHomeInformantAdrDistrictError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrDistrictError(false);
      // }
      // if (InformantAdrsLBTypeName == null) {
      //   setHomeInformantAdrLBTypeNameError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrLBTypeNameError(false);
      // }
      // if (InformantAdrsLBName == null) {
      //   setHomeInformantAdrLBNameError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrLBNameError(false);
      // }
      // if (InformantAdrsTaluk == null) {
      //   setHomeInformantAdrTalukError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrTalukError(false);
      // }
      // if (InformantAdrsVillage == null) {
      //   setHomeInformantAdrVillageError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrVillageError(false);
      // }
      // if (InformantAdrsPostOffice == null) {
      //   setHomeInformantAdrPostOfficeError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrPostOfficeError(false);
      // }

      // if (InformantAdrsPincode == null || InformantAdrsPincode == "") {
      //   setHomeInformantAdrPincodeError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrPincodeError(false);
      // }
      // if (InformantAdrsMainPlaceEn == null || InformantAdrsMainPlaceEn == "") {
      //   setHomeInformantAdrMainPlaceEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrMainPlaceEnError(false);
      // }
      // if (InformantAdrsLocalityNameEn == null || InformantAdrsLocalityNameEn == "") {
      //   setHomeInformantAdrLocalityNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrLocalityNameEnError(false);
      // }
      // if (InformantAdrsStreetNameEn == null || InformantAdrsStreetNameEn == "") {
      //   setHomeInformantAdrStreetNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrStreetNameEnError(false);
      // }

      // if (InformantAdrsHouseNameEn == null || InformantAdrsHouseNameEn == "") {
      //   setHomeInformantAdrHouseNameEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrHouseNameEnError(false);
      // }
      // if (InformantAdrsDoorNo == null || InformantAdrsDoorNo == "") {
      //   setHomeInformantAdrDoorNoError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrDoorNoError(false);
      // }
      // if (InformantAdrsResNo == null || InformantAdrsResNo == "") {
      //   setHomeInformantAdrResNoEnError(true);
      //   validFlag = false;
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setHomeInformantAdrResNoEnError(false);
      // }
    }

    if (validFlag === true) {
      if (BirthPlace.code === "HOSPITAL") {
        sessionStorage.removeItem("BirthPlace");
        sessionStorage.setItem("BirthPlace", BirthPlace.code);
        sessionStorage.setItem("HospitalName", HospitalName ? HospitalName.hospitalName : null);
        sessionStorage.setItem("SignedOfficerName", SignedOfficerName ? SignedOfficerName.hospitalRegistar : null);
        sessionStorage.setItem("SignedOfficerDesignation", SignedOfficerDesignation ? SignedOfficerDesignation.registarDesig : null);
        sessionStorage.setItem("SignedOfficerNameOther", SignedOfficerNameOther ? SignedOfficerNameOther : null);
        sessionStorage.setItem("SignedOfficerDesignationOther", SignedOfficerDesignationOther ? SignedOfficerDesignationOther : null);
        sessionStorage.setItem("SignedOfficerOtherStatus", SignedOfficerOtherStatus ? SignedOfficerOtherStatus : null);
        sessionStorage.setItem("SignedOfficerAadharNo", SignedOfficerAadharNo ? SignedOfficerAadharNo.SignedOfficerAadharNo : null);
        sessionStorage.setItem("SignedOfficerMobileNo", SignedOfficerMobileNo ? SignedOfficerMobileNo.SignedOfficerMobileNo : null);

        sessionStorage.removeItem("setInstitution");
        sessionStorage.removeItem("setInstitutionId");
        sessionStorage.removeItem("SiginedOfficer");
        sessionStorage.removeItem("SiginedOfficerDesignation");
        sessionStorage.removeItem("InstitutionMobilNo");
        sessionStorage.removeItem("InstitutionAadhaar");

        sessionStorage.removeItem("VehicleRegistrationNo");
        sessionStorage.removeItem("VehicleFromEn");
        sessionStorage.removeItem("VehicleToEn");
        sessionStorage.removeItem("VehicleFromMl");
        sessionStorage.removeItem("VehicleHaltPlace");
        sessionStorage.removeItem("VehicleToMl");
        sessionStorage.removeItem("setAdmittedHospitalEn");
        sessionStorage.removeItem("setAdmittedHospitalMl");
        sessionStorage.removeItem("VehicleOtherDetailsEn");
        sessionStorage.removeItem("VehicleOtherDetailsMl");

        sessionStorage.removeItem("setPublicPlaceType");
        // sessionStorage.removeItem("AdrsInfontName");
        // sessionStorage.removeItem("AdrsPublicPlace");
        // sessionStorage.removeItem("PublicPlaceDesption");

        sessionStorage.removeItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
        sessionStorage.removeItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
        sessionStorage.removeItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
        sessionStorage.removeItem("AdrsResNoEn", AdrsResNoEn ? AdrsResNoEn : null);
        sessionStorage.removeItem("AdrsResNoMl", AdrsResNoMl ? AdrsResNoMl : null);
        sessionStorage.removeItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
        sessionStorage.removeItem("AdrsSubNo", AdrsSubNo ? AdrsSubNo : null);
        sessionStorage.removeItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
        sessionStorage.removeItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
        sessionStorage.removeItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
        sessionStorage.removeItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
        sessionStorage.removeItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
        sessionStorage.removeItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
        sessionStorage.removeItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl : null);
        sessionStorage.removeItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl : null);
        sessionStorage.removeItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);
        sessionStorage.removeItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
        sessionStorage.removeItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
        sessionStorage.removeItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
        sessionStorage.removeItem("AdrsPincode", AdrsPincode ? AdrsPincode.code : null);
        sessionStorage.removeItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);

        sessionStorage.removeItem("InfomantFirstNameEn", InfomantFirstNameEn ? InfomantFirstNameEn : null);
        sessionStorage.removeItem("InfomantAadhar", InfomantAadhar ? InfomantAadhar : null);
        sessionStorage.removeItem("InfomantEmail", InfomantEmail ? InfomantEmail : null);
        sessionStorage.removeItem("InfomantMobile", InfomantMobile ? InfomantMobile : null);
        sessionStorage.removeItem("InformantAddressLineOne", InformantAddressLineOne ? InformantAddressLineOne : null);
        sessionStorage.removeItem("InformantAddressLineTwo", InformantAddressLineTwo ? InformantAddressLineTwo : null);

        // sessionStorage.removeItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
        // sessionStorage.removeItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
        // sessionStorage.removeItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
        // sessionStorage.removeItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
        // sessionStorage.removeItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
        // sessionStorage.removeItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
        // sessionStorage.removeItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
        // sessionStorage.removeItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
        // sessionStorage.removeItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
        // sessionStorage.removeItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
        // sessionStorage.removeItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
        // sessionStorage.removeItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
        // sessionStorage.removeItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
        // sessionStorage.removeItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
        // sessionStorage.removeItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPincode.code : null);

        onSelect(config.key, {
          BirthPlace,
          HospitalName,
          SignedOfficerName,
          SignedOfficerDesignation,
          SignedOfficerNameOther,
          SignedOfficerDesignationOther,
          SignedOfficerOtherStatus,
          SignedOfficerAadharNo,
          SignedOfficerMobileNo,
          setInstitution,
          setInstitutionId,
          SiginedOfficer,
          SiginedOfficerDesignation,
          InstitutionMobilNo,
          InstitutionAadhaar,
          setPublicPlaceType,

          AdrsCountry,
          AdrsStateName,
          AdrsLBTypeName,
          AdrsResNoEn,
          AdrsDoorNo,
          AdrsSubNo,
          AdrsHouseNameEn,
          AdrsHouseNameMl,
          AdrsMainPlaceEn,
          AdrsLocalityNameEn,
          AdrsStreetNameEn,
          AdrsVillage,
          AdrsLBName,
          AdrsDistrict,
          AdrsTaluk,
          AdrsPostOffice,
          AdrsPincode,
          AdrsMainPlaceMl,
          AdrsLocalityNameMl,
          AdrsStreetNameMl,
          AdrsResNoMl,
          InfomantFirstNameEn,
          InfomantAadhar,
          InfomantEmail,
          InfomantMobile,
          InformantAddressLineOne,
          InformantAddressLineTwo,
          VehicleRegistrationNo,
          VehicleFromEn,
          VehicleToEn,
          VehicleFromMl,
          VehicleToMl,
          VehicleHaltPlace,
          setAdmittedHospitalEn,
          setAdmittedHospitalMl,
          VehicleOtherDetailsEn,
          VehicleOtherDetailsMl,
        });
      } else if (BirthPlace.code === "INSTITUTION") {
        sessionStorage.removeItem("BirthPlace");
        sessionStorage.setItem("BirthPlace", BirthPlace.code);
        sessionStorage.setItem("setInstitution", setInstitution ? setInstitution.setInstitution : null);
        sessionStorage.setItem("setInstitutionId", setInstitutionId ? setInstitutionId.setInstitutionId : null);
        sessionStorage.setItem("SiginedOfficer", SiginedOfficer ? SiginedOfficer.SiginedOfficer : null);
        sessionStorage.setItem("SiginedOfficerDesignation", SiginedOfficerDesignation ? SiginedOfficerDesignation.SiginedOfficerDesignation : null);
        sessionStorage.setItem("InstitutionMobilNo", InstitutionMobilNo ? InstitutionMobilNo.InstitutionMobilNo : null);
        sessionStorage.setItem("InstitutionAadhaar", InstitutionAadhaar ? InstitutionAadhaar.InstitutionAadhaar : null);

        sessionStorage.removeItem("HospitalName");
        sessionStorage.removeItem("SignedOfficerName");
        sessionStorage.removeItem("SignedOfficerDesignation");
        sessionStorage.removeItem("SignedOfficerAadharNo");
        sessionStorage.removeItem("SignedOfficerMobileNo");

        sessionStorage.removeItem("VehicleRegistrationNo");
        sessionStorage.removeItem("VehicleFromEn");
        sessionStorage.removeItem("VehicleToEn");
        sessionStorage.removeItem("VehicleFromMl");
        sessionStorage.removeItem("VehicleHaltPlace");
        sessionStorage.removeItem("VehicleToMl");
        sessionStorage.removeItem("setAdmittedHospitalEn");
        sessionStorage.removeItem("setAdmittedHospitalMl");
        sessionStorage.removeItem("VehicleOtherDetailsEn");
        sessionStorage.removeItem("VehicleOtherDetailsMl");

        sessionStorage.removeItem("setPublicPlaceType");
        // sessionStorage.removeItem("AdrsInfontName");
        // sessionStorage.removeItem("AdrsPublicPlace");
        // sessionStorage.removeItem("PublicPlaceDesption");

        sessionStorage.removeItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
        sessionStorage.removeItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
        sessionStorage.removeItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
        sessionStorage.removeItem("AdrsResNoEn", AdrsResNoEn ? AdrsResNoEn : null);
        sessionStorage.removeItem("AdrsResNoMl", AdrsResNoMl ? AdrsResNoMl : null);
        sessionStorage.removeItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
        sessionStorage.removeItem("AdrsSubNo", AdrsSubNo ? AdrsSubNo : null);
        sessionStorage.removeItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
        sessionStorage.removeItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
        sessionStorage.removeItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
        sessionStorage.removeItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
        sessionStorage.removeItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
        sessionStorage.removeItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
        sessionStorage.removeItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl : null);
        sessionStorage.removeItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl : null);
        sessionStorage.removeItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);
        sessionStorage.removeItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
        sessionStorage.removeItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
        sessionStorage.removeItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
        sessionStorage.removeItem("AdrsPincode", AdrsPincode ? AdrsPincode.code : null);
        sessionStorage.removeItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);

        sessionStorage.removeItem("InfomantFirstNameEn", InfomantFirstNameEn ? InfomantFirstNameEn : null);
        sessionStorage.removeItem("InfomantAadhar", InfomantAadhar ? InfomantAadhar : null);
        sessionStorage.removeItem("InfomantEmail", InfomantEmail ? InfomantEmail : null);
        sessionStorage.removeItem("InfomantMobile", InfomantMobile ? InfomantMobile : null);
        sessionStorage.removeItem("InformantAddressLineOne", InformantAddressLineOne ? InformantAddressLineOne : null);
        sessionStorage.removeItem("InformantAddressLineTwo", InformantAddressLineTwo ? InformantAddressLineTwo : null);

        // sessionStorage.removeItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
        // sessionStorage.removeItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
        // sessionStorage.removeItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
        // sessionStorage.removeItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
        // sessionStorage.removeItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
        // sessionStorage.removeItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
        // sessionStorage.removeItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
        // sessionStorage.removeItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
        // sessionStorage.removeItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
        // sessionStorage.removeItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
        // sessionStorage.removeItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
        // sessionStorage.removeItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
        // sessionStorage.removeItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
        // sessionStorage.removeItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
        // sessionStorage.removeItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPincode.code : null);

        onSelect(config.key, {
          BirthPlace,
          HospitalName,
          SignedOfficerName,
          SignedOfficerDesignation,
          SignedOfficerAadharNo,
          SignedOfficerMobileNo,
          setInstitution,
          setInstitutionId,
          SiginedOfficer,
          SiginedOfficerDesignation,
          InstitutionMobilNo,
          InstitutionAadhaar,
          setPublicPlaceType,

          AdrsCountry,
          AdrsStateName,
          AdrsLBTypeName,
          AdrsResNoEn,
          AdrsDoorNo,
          AdrsSubNo,
          AdrsHouseNameEn,
          AdrsHouseNameMl,
          AdrsMainPlaceEn,
          AdrsLocalityNameEn,
          AdrsStreetNameEn,
          AdrsVillage,
          AdrsLBName,
          AdrsDistrict,
          AdrsTaluk,
          AdrsPostOffice,
          AdrsPincode,
          AdrsMainPlaceMl,
          AdrsLocalityNameMl,
          AdrsStreetNameMl,
          AdrsResNoMl,
          InfomantFirstNameEn,
          InfomantAadhar,
          InfomantEmail,
          InfomantMobile,
          InformantAddressLineOne,
          InformantAddressLineTwo,
          VehicleRegistrationNo,
          VehicleFromEn,
          VehicleToEn,
          VehicleFromMl,
          VehicleToMl,
          VehicleHaltPlace,
          setAdmittedHospitalEn,
          setAdmittedHospitalMl,
          VehicleOtherDetailsEn,
          VehicleOtherDetailsMl,
        });
      } else if (BirthPlace.code === "VEHICLE") {
        sessionStorage.removeItem("BirthPlace");
        sessionStorage.setItem("BirthPlace", BirthPlace.code);
        sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo ? VehicleRegistrationNo : null);
        sessionStorage.setItem("VehicleFromEn", VehicleFromEn ? VehicleFromEn : null);
        sessionStorage.setItem("VehicleToEn", VehicleToEn ? VehicleToEn : null);
        sessionStorage.setItem("VehicleFromMl", VehicleFromMl ? VehicleFromMl : null);
        sessionStorage.setItem("VehicleHaltPlace", VehicleHaltPlace ? VehicleHaltPlace : null);
        sessionStorage.setItem("VehicleToMl", VehicleToMl ? VehicleToMl : null);
        sessionStorage.setItem("setAdmittedHospitalEn", setAdmittedHospitalEn ? setAdmittedHospitalEn.hospitalName : null);
        sessionStorage.setItem("setAdmittedHospitalMl", setAdmittedHospitalMl ? setAdmittedHospitalMl.hospitalName : null);
        sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn ? VehicleOtherDetailsEn : null);
        sessionStorage.setItem("VehicleOtherDetailsMl", VehicleOtherDetailsEn ? VehicleOtherDetailsEn : null);

        sessionStorage.setItem("InfomantFirstNameEn", InfomantFirstNameEn ? InfomantFirstNameEn : null);
        sessionStorage.setItem("InfomantAadhar", InfomantAadhar ? InfomantAadhar : null);
        sessionStorage.setItem("InfomantEmail", InfomantEmail ? InfomantEmail : null);
        sessionStorage.setItem("InfomantMobile", InfomantMobile ? InfomantMobile : null);
        sessionStorage.setItem("InformantAddressLineOne", InformantAddressLineOne ? InformantAddressLineOne : null);
        sessionStorage.setItem("InformantAddressLineTwo", InformantAddressLineTwo ? InformantAddressLineTwo : null);

        // sessionStorage.setItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
        // sessionStorage.setItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
        // sessionStorage.setItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
        // sessionStorage.setItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
        // sessionStorage.setItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
        // sessionStorage.setItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
        // sessionStorage.setItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
        // sessionStorage.setItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
        // sessionStorage.setItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
        // sessionStorage.setItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
        // sessionStorage.setItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
        // sessionStorage.setItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
        // sessionStorage.setItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
        // sessionStorage.setItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
        // sessionStorage.setItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPincode.code : null);

        sessionStorage.removeItem("HospitalName");
        sessionStorage.removeItem("SignedOfficerName");
        sessionStorage.removeItem("SignedOfficerDesignation");
        sessionStorage.removeItem("SignedOfficerAadharNo");
        sessionStorage.removeItem("SignedOfficerMobileNo");

        sessionStorage.removeItem("setInstitution");
        sessionStorage.removeItem("setInstitutionId");
        sessionStorage.removeItem("SiginedOfficer");
        sessionStorage.removeItem("SiginedOfficerDesignation");
        sessionStorage.removeItem("InstitutionMobilNo");
        sessionStorage.removeItem("InstitutionAadhaar");

        sessionStorage.removeItem("setPublicPlaceType");
        // sessionStorage.removeItem("AdrsInfontName");
        // sessionStorage.removeItem("AdrsPublicPlace");
        // sessionStorage.removeItem("PublicPlaceDesption");

        sessionStorage.removeItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
        sessionStorage.removeItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
        sessionStorage.removeItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
        sessionStorage.removeItem("AdrsResNoEn", AdrsResNoEn ? AdrsResNoEn : null);
        sessionStorage.removeItem("AdrsResNoMl", AdrsResNoMl ? AdrsResNoMl : null);
        sessionStorage.removeItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
        sessionStorage.removeItem("AdrsSubNo", AdrsSubNo ? AdrsSubNo : null);
        sessionStorage.removeItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
        sessionStorage.removeItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
        sessionStorage.removeItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
        sessionStorage.removeItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
        sessionStorage.removeItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
        sessionStorage.removeItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
        sessionStorage.removeItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl : null);
        sessionStorage.removeItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl : null);
        sessionStorage.removeItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);
        sessionStorage.removeItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
        sessionStorage.removeItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
        sessionStorage.removeItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
        sessionStorage.removeItem("AdrsPincode", AdrsPincode ? AdrsPincode.code : null);
        sessionStorage.removeItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);

        onSelect(config.key, {
          BirthPlace,
          HospitalName,
          SignedOfficerName,
          SignedOfficerDesignation,
          SignedOfficerAadharNo,
          SignedOfficerMobileNo,
          setInstitution,
          setInstitutionId,
          SiginedOfficer,
          SiginedOfficerDesignation,
          InstitutionMobilNo,
          InstitutionAadhaar,
          setPublicPlaceType,

          AdrsCountry,
          AdrsStateName,
          AdrsLBTypeName,
          AdrsResNoEn,
          AdrsDoorNo,
          AdrsSubNo,
          AdrsHouseNameEn,
          AdrsHouseNameMl,
          AdrsMainPlaceEn,
          AdrsLocalityNameEn,
          AdrsStreetNameEn,
          AdrsVillage,
          AdrsLBName,
          AdrsDistrict,
          AdrsTaluk,
          AdrsPostOffice,
          AdrsPincode,
          AdrsMainPlaceMl,
          AdrsLocalityNameMl,
          AdrsStreetNameMl,
          AdrsResNoMl,
          InfomantFirstNameEn,
          InfomantAadhar,
          InfomantEmail,
          InfomantMobile,
          InformantAddressLineOne,
          InformantAddressLineTwo,
          VehicleRegistrationNo,
          VehicleFromEn,
          VehicleToEn,
          VehicleFromMl,
          VehicleToMl,
          VehicleHaltPlace,
          setAdmittedHospitalEn,
          setAdmittedHospitalMl,
          VehicleOtherDetailsEn,
          VehicleOtherDetailsMl,
        });
      } else if (BirthPlace.code === "PUBLIC_PLACES") {
        sessionStorage.removeItem("BirthPlace");
        sessionStorage.setItem("BirthPlace", BirthPlace.code);
        sessionStorage.setItem("setPublicPlaceType", setPublicPlaceType ? setPublicPlaceType.code : null);
        // sessionStorage.setItem("AdrsInfontName", AdrsInfontName ? AdrsInfontName : null);
        // sessionStorage.setItem("AdrsPublicPlace", AdrsPublicPlace ? AdrsPublicPlace : null);
        // sessionStorage.setItem("PublicPlaceDesption", PublicPlaceDesption ? PublicPlaceDesption : null);

        sessionStorage.removeItem("HospitalName");
        sessionStorage.removeItem("SignedOfficerName");
        sessionStorage.removeItem("SignedOfficerDesignation");
        sessionStorage.removeItem("SignedOfficerAadharNo");
        sessionStorage.removeItem("SignedOfficerMobileNo");

        sessionStorage.removeItem("setInstitution");
        sessionStorage.removeItem("setInstitutionId");
        sessionStorage.removeItem("SiginedOfficer");
        sessionStorage.removeItem("SiginedOfficerDesignation");
        sessionStorage.removeItem("InstitutionMobilNo");
        sessionStorage.removeItem("InstitutionAadhaar");

        sessionStorage.removeItem("VehicleRegistrationNo");
        sessionStorage.removeItem("VehicleFromEn");
        sessionStorage.removeItem("VehicleToEn");
        sessionStorage.removeItem("VehicleFromMl");
        sessionStorage.removeItem("VehicleHaltPlace");
        sessionStorage.removeItem("VehicleToMl");
        sessionStorage.removeItem("setAdmittedHospitalEn");
        sessionStorage.removeItem("setAdmittedHospitalMl");
        sessionStorage.removeItem("VehicleOtherDetailsEn");
        sessionStorage.removeItem("VehicleOtherDetailsMl");

        sessionStorage.removeItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
        sessionStorage.removeItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
        sessionStorage.removeItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
        sessionStorage.removeItem("AdrsResNoEn", AdrsResNoEn ? AdrsResNoEn : null);
        sessionStorage.removeItem("AdrsResNoMl", AdrsResNoMl ? AdrsResNoMl : null);
        sessionStorage.removeItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
        sessionStorage.removeItem("AdrsSubNo", AdrsSubNo ? AdrsSubNo : null);
        sessionStorage.removeItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
        sessionStorage.removeItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
        sessionStorage.removeItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
        sessionStorage.removeItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
        sessionStorage.removeItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
        sessionStorage.removeItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
        sessionStorage.removeItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl : null);
        sessionStorage.removeItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl : null);
        sessionStorage.removeItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);
        sessionStorage.removeItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
        sessionStorage.removeItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
        sessionStorage.removeItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
        sessionStorage.removeItem("AdrsPincode", AdrsPincode ? AdrsPincode.code : null);
        sessionStorage.removeItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);

        sessionStorage.removeItem("InfomantFirstNameEn", InfomantFirstNameEn ? InfomantFirstNameEn : null);
        sessionStorage.removeItem("InfomantAadhar", InfomantAadhar ? InfomantAadhar : null);
        sessionStorage.removeItem("InfomantEmail", InfomantEmail ? InfomantEmail : null);
        sessionStorage.removeItem("InfomantMobile", InfomantMobile ? InfomantMobile : null);
        sessionStorage.removeItem("InformantAddressLineOne", InformantAddressLineOne ? InformantAddressLineOne : null);
        sessionStorage.removeItem("InformantAddressLineTwo", InformantAddressLineTwo ? InformantAddressLineTwo : null);

        // sessionStorage.removeItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
        // sessionStorage.removeItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
        // sessionStorage.removeItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
        // sessionStorage.removeItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
        // sessionStorage.removeItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
        // sessionStorage.removeItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
        // sessionStorage.removeItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
        // sessionStorage.removeItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
        // sessionStorage.removeItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
        // sessionStorage.removeItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
        // sessionStorage.removeItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
        // sessionStorage.removeItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
        // sessionStorage.removeItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
        // sessionStorage.removeItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
        // sessionStorage.removeItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPincode.code : null);
        onSelect(config.key, {
          BirthPlace,
          HospitalName,
          SignedOfficerName,
          SignedOfficerDesignation,
          SignedOfficerAadharNo,
          SignedOfficerMobileNo,
          setInstitution,
          setInstitutionId,
          SiginedOfficer,
          SiginedOfficerDesignation,
          InstitutionMobilNo,
          InstitutionAadhaar,
          setPublicPlaceType,

          AdrsCountry,
          AdrsStateName,
          AdrsLBTypeName,
          AdrsResNoEn,
          AdrsDoorNo,
          AdrsSubNo,
          AdrsHouseNameEn,
          AdrsHouseNameMl,
          AdrsMainPlaceEn,
          AdrsLocalityNameEn,
          AdrsStreetNameEn,
          AdrsVillage,
          AdrsLBName,
          AdrsDistrict,
          AdrsTaluk,
          AdrsPostOffice,
          AdrsPincode,
          AdrsMainPlaceMl,
          AdrsLocalityNameMl,
          AdrsStreetNameMl,
          AdrsResNoMl,
          InfomantFirstNameEn,
          InfomantAadhar,
          InfomantEmail,
          InfomantMobile,
          InformantAddressLineOne,
          InformantAddressLineTwo,
          VehicleRegistrationNo,
          VehicleFromEn,
          VehicleToEn,
          VehicleFromMl,
          VehicleToMl,
          VehicleHaltPlace,
          setAdmittedHospitalEn,
          setAdmittedHospitalMl,
          VehicleOtherDetailsEn,
          VehicleOtherDetailsMl,
        });
      } else if (BirthPlace.code === "HOME") {
        sessionStorage.removeItem("BirthPlace");
        sessionStorage.setItem("BirthPlace", BirthPlace.code);
        sessionStorage.setItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
        sessionStorage.setItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
        sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
        sessionStorage.setItem("AdrsResNoEn", AdrsResNoEn ? AdrsResNoEn : null);
        sessionStorage.setItem("AdrsResNoMl", AdrsResNoMl ? AdrsResNoMl : null);
        sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
        sessionStorage.setItem("AdrsSubNo", AdrsSubNo ? AdrsSubNo : null);
        sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
        sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
        sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
        sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
        sessionStorage.setItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
        sessionStorage.setItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
        sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl : null);
        sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl : null);
        sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);
        sessionStorage.setItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
        sessionStorage.setItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
        sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
        sessionStorage.setItem("AdrsPincode", AdrsPincode ? AdrsPincode.code : null);
        sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);

        sessionStorage.setItem("InfomantFirstNameEn", InfomantFirstNameEn ? InfomantFirstNameEn : null);
        sessionStorage.setItem("InfomantAadhar", InfomantAadhar ? InfomantAadhar : null);
        sessionStorage.setItem("InfomantEmail", InfomantEmail ? InfomantEmail : null);
        sessionStorage.setItem("InfomantMobile", InfomantMobile ? InfomantMobile : null);

        sessionStorage.setItem("InformantAddressLineOne", InformantAddressLineOne ? InformantAddressLineOne : null);
        sessionStorage.setItem("InformantAddressLineTwo", InformantAddressLineTwo ? InformantAddressLineTwo : null);

        // sessionStorage.setItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
        // sessionStorage.setItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
        // sessionStorage.setItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
        // sessionStorage.setItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
        // sessionStorage.setItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
        // sessionStorage.setItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
        // sessionStorage.setItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
        // sessionStorage.setItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
        // sessionStorage.setItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
        // sessionStorage.setItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
        // sessionStorage.setItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
        // sessionStorage.setItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
        // sessionStorage.setItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
        // sessionStorage.setItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
        // sessionStorage.setItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPincode.code : null);

        sessionStorage.removeItem("HospitalName");
        sessionStorage.removeItem("SignedOfficerName");
        sessionStorage.removeItem("SignedOfficerDesignation");
        sessionStorage.removeItem("SignedOfficerAadharNo");
        sessionStorage.removeItem("SignedOfficerMobileNo");

        sessionStorage.removeItem("setInstitution");
        sessionStorage.removeItem("setInstitutionId");
        sessionStorage.removeItem("SiginedOfficer");
        sessionStorage.removeItem("SiginedOfficerDesignation");
        sessionStorage.removeItem("InstitutionMobilNo");
        sessionStorage.removeItem("InstitutionAadhaar");

        sessionStorage.removeItem("VehicleRegistrationNo");
        sessionStorage.removeItem("VehicleFromEn");
        sessionStorage.removeItem("VehicleToEn");
        sessionStorage.removeItem("VehicleFromMl");
        sessionStorage.removeItem("VehicleHaltPlace");
        sessionStorage.removeItem("VehicleToMl");
        sessionStorage.removeItem("setAdmittedHospitalEn");
        sessionStorage.removeItem("setAdmittedHospitalMl");
        sessionStorage.removeItem("VehicleOtherDetailsEn");
        sessionStorage.removeItem("VehicleOtherDetailsMl");

        sessionStorage.removeItem("setPublicPlaceType");
        // sessionStorage.removeItem("AdrsInfontName");
        // sessionStorage.removeItem("AdrsPublicPlace");
        // sessionStorage.removeItem("PublicPlaceDesption");

        onSelect(config.key, {
          BirthPlace,
          HospitalName,
          SignedOfficerName,
          SignedOfficerDesignation,
          SignedOfficerAadharNo,
          SignedOfficerMobileNo,
          setInstitution,
          setInstitutionId,
          SiginedOfficer,
          SiginedOfficerDesignation,
          InstitutionMobilNo,
          InstitutionAadhaar,
          setPublicPlaceType,
          // AdrsInfontName,
          // AdrsPublicPlace,
          // PublicPlaceDesption,
          AdrsCountry,
          AdrsStateName,
          AdrsLBTypeName,
          AdrsResNoEn,
          AdrsDoorNo,
          AdrsHomeStateNameError,
          AdrsHouseNameEn,
          AdrsHouseNameMl,
          AdrsMainPlaceEn,
          AdrsLocalityNameEn,
          AdrsStreetNameEn,
          AdrsVillage,
          AdrsLBName,
          AdrsDistrict,
          AdrsTaluk,
          AdrsPostOffice,
          AdrsPincode,
          AdrsMainPlaceMl,
          AdrsLocalityNameMl,
          AdrsStreetNameMl,
          AdrsResNoMl,
          InfomantFirstNameEn,
          InfomantAadhar,
          InfomantEmail,
          InfomantMobile,
          InformantAddressLineOne,
          InformantAddressLineTwo,
          VehicleRegistrationNo,
          VehicleFromEn,
          VehicleToEn,
          VehicleFromMl,
          VehicleToMl,
          VehicleHaltPlace,
          setAdmittedHospitalEn,
          setAdmittedHospitalMl,
          VehicleOtherDetailsEn,
          VehicleOtherDetailsMl,
        });
      }
    }
  };
  if (isLoading || islocalbodiesLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthPlace}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_BIRTH")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_PLACE_OF_BIRTH")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menu}
                selected={BirthPlace}
                select={setselectBirthPlace}
                disabled={isEdit}
                placeholder={`${t("CR_BIRTH_PLACE")}`}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-6 " >
            <CardLabel>{`${t("CR_DESCRIPTION")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthPlaceDescription" value={BirthPlaceDescription} onChange={setSelectBirthPlaceDeccription} disable={isEdit} placeholder={`${t("CR_DESCRIPTION")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })} />
          </div>
        </div> */}
        {value === "HOSPITAL" && (
          <div>
            <HospitalDetails
              selectHospitalName={selectHospitalName}
              HospitalName={HospitalName}
              selectSignedOfficerName={selectSignedOfficerName}
              SignedOfficerName={SignedOfficerName}
              selectSignedOfficerDesignation={selectSignedOfficerDesignation}
              SignedOfficerDesignation={SignedOfficerDesignation}
              setSignedOfficerAadharNo={setSignedOfficerAadharNo}
              SignedOfficerAadharNo={SignedOfficerAadharNo}
              setSignedOfficerMobileNo={setSignedOfficerMobileNo}
              SignedOfficerMobileNo={SignedOfficerMobileNo}
              selectSignedOfficerNameOther={selectSignedOfficerNameOther}
              SignedOfficerNameOther={SignedOfficerNameOther}
              selectSignedOfficerDesignationOther={selectSignedOfficerDesignationOther}
              SignedOfficerDesignationOther={SignedOfficerDesignationOther}
              setSignedOfficerOtherStatus={setSignedOfficerOtherStatus}
              SignedOfficerOtherStatus={SignedOfficerOtherStatus}
            />
          </div>
        )}
        {value === "INSTITUTION" && (
          <div>
            <InstitutionDetails
              setSelectedInstitution={setSelectedInstitution}
              setInstitution={setInstitution}
              setSelectedInstitutionId={setSelectedInstitutionId}
              setInstitutionId={setInstitutionId}
              setSiginedOfficer={setSiginedOfficer}
              SiginedOfficer={SiginedOfficer}
              setSiginedOfficerDesignation={setSiginedOfficerDesignation}
              SiginedOfficerDesignation={SiginedOfficerDesignation}
              setInstitutionMobilNo={setInstitutionMobilNo}
              InstitutionMobilNo={InstitutionMobilNo}
              setInstitutionAadhaar={setInstitutionAadhaar}
              InstitutionAadhaar={InstitutionAadhaar}
            />
          </div>
        )}
        {value === "VEHICLE" && (
          <div>
            <BirthVehicle
              VehicleRegistrationNo={VehicleRegistrationNo}
              setVehicleRegistrationNo={setVehicleRegistrationNo}
              VehicleFromEn={VehicleFromEn}
              setVehicleToEn={setVehicleToEn}
              VehicleToEn={VehicleToEn}
              setVehicleFromEn={setVehicleFromEn}
              VehicleFromMl={VehicleFromMl}
              setVehicleFromMl={setVehicleFromMl}
              VehicleToMl={VehicleToMl}
              setVehicleToMl={setVehicleToMl}
              VehicleHaltPlace={VehicleHaltPlace}
              setVehicleHaltPlace={setVehicleHaltPlace}
              VehicleOtherDetailsEn={VehicleOtherDetailsEn}
              setVehicleOtherDetailsEn={setVehicleOtherDetailsEn}
              VehicleOtherDetailsMl={VehicleOtherDetailsMl}
              setVehicleOtherDetailsMl={setVehicleOtherDetailsMl}
              setAdmittedHospitalEn={setAdmittedHospitalEn}
              setSelectedAdmittedHospitalEn={setSelectedAdmittedHospitalEn}
              setAdmittedHospitalMl={setAdmittedHospitalMl}
              setSelectedAdmittedHospitalMl={setSelectedAdmittedHospitalMl}
            />
            <InformantDetails
              setInfomantFirstNameEn={setInfomantFirstNameEn}
              InfomantFirstNameEn={InfomantFirstNameEn}
              setInfomantAadhar={setInfomantAadhar}
              InfomantAadhar={InfomantAadhar}
              setInfomantEmail={setInfomantEmail}
              InfomantEmail={InfomantEmail}
              setInfomantMobile={setInfomantMobile}
              InfomantMobile={InfomantMobile}
              setInformantAddressLineOne={setInformantAddressLineOne}
              InformantAddressLineOne={InformantAddressLineOne}
              setInformantAddressLineTwo={setInformantAddressLineTwo}
              InformantAddressLineTwo={InformantAddressLineTwo}
            />

            {/* <InformantAddress
              setInformantAdrsCountry={setInformantAdrsCountry} InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsStateName={setInformantAdrsStateName} InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsDistrict={setInformantAdrsDistrict} InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName} InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBName={setInformantAdrsLBName} InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsTaluk={setInformantAdrsTaluk} InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsVillage={setInformantAdrsVillage} InformantAdrsVillage={InformantAdrsVillage}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice} InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPincode={setInformantAdrsPincode} InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn} InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn} InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn} InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn} InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo} InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsResNo={setInformantAdrsResNo} InformantAdrsResNo={InformantAdrsResNo}


            // setInfntWardNo={setInfntWardNo} InfntWardNo={InfntWardNo}
            /> */}
          </div>
        )}
        {value === "PUBLIC_PLACES" && (
          <div>
            <PublicPlace
              setSelectedPublicPlaceType={setSelectedPublicPlaceType}
              setPublicPlaceType={setPublicPlaceType}
            // setAdrsInfontName={setAdrsInfontName}
            // AdrsInfontName={AdrsInfontName}
            // setAdrsPublicPlace={setAdrsPublicPlace}
            // AdrsPublicPlace={AdrsPublicPlace}
            // setPublicPlaceDesption={setPublicPlaceDesption}
            // PublicPlaceDesption={PublicPlaceDesption}
            />
            <InformantDetails
              setInfomantFirstNameEn={setInfomantFirstNameEn}
              InfomantFirstNameEn={InfomantFirstNameEn}
              setInfomantAadhar={setInfomantAadhar}
              InfomantAadhar={InfomantAadhar}
              setInfomantEmail={setInfomantEmail}
              InfomantEmail={InfomantEmail}
              setInfomantMobile={setInfomantMobile}
              InfomantMobile={InfomantMobile}
              setInformantAddressLineOne={setInformantAddressLineOne}
              InformantAddressLineOne={InformantAddressLineOne}
              setInformantAddressLineTwo={setInformantAddressLineTwo}
              InformantAddressLineTwo={InformantAddressLineTwo}
            />
          </div>
        )}
        {value === "HOME" && (
          <div>
            <PlaceofBirthHome
              setAdrsCountry={setAdrsCountry}
              AdrsCountry={AdrsCountry}
              setAdrsStateName={setAdrsStateName}
              AdrsStateName={AdrsStateName}
              setAdrsDistrict={setAdrsDistrict}
              AdrsDistrict={AdrsDistrict}
              setAdrsLBTypeName={setAdrsLBTypeName}
              AdrsLBTypeName={AdrsLBTypeName}
              setAdrsLBName={setAdrsLBName}
              AdrsLBName={AdrsLBName}
              setAdrsTaluk={setAdrsTaluk}
              AdrsTaluk={AdrsTaluk}
              setAdrsVillage={setAdrsVillage}
              AdrsVillage={AdrsVillage}
              setAdrsPostOffice={setAdrsPostOffice}
              AdrsPostOffice={AdrsPostOffice}
              setAdrsPincode={setAdrsPincode}
              AdrsPincode={AdrsPincode}
              setAdrsMainPlaceEn={setAdrsMainPlaceEn}
              AdrsMainPlaceEn={AdrsMainPlaceEn}
              setAdrsMainPlaceMl={setAdrsMainPlaceMl}
              AdrsMainPlaceMl={AdrsMainPlaceMl}
              setAdrsLocalityNameEn={setAdrsLocalityNameEn}
              AdrsLocalityNameEn={AdrsLocalityNameEn}
              setAdrsLocalityNameMl={setAdrsLocalityNameMl}
              AdrsLocalityNameMl={AdrsLocalityNameMl}
              setAdrsStreetNameEn={setAdrsStreetNameEn}
              AdrsStreetNameEn={AdrsStreetNameEn}
              setAdrsStreetNameMl={setAdrsStreetNameMl}
              AdrsStreetNameMl={AdrsStreetNameMl}
              setAdrsHouseNameEn={setAdrsHouseNameEn}
              AdrsHouseNameEn={AdrsHouseNameEn}
              setAdrsHouseNameMl={setAdrsHouseNameMl}
              AdrsHouseNameMl={AdrsHouseNameMl}
              setAdrsDoorNo={setAdrsDoorNo}
              AdrsDoorNo={AdrsDoorNo}
              setAdrsSubNo={setAdrsSubNo}
              AdrsSubNo={AdrsSubNo}
              setAdrsResNoEn={setAdrsResNoEn}
              AdrsResNoEn={AdrsResNoEn}
              setAdrsResNoMl={setAdrsResNoMl}
              AdrsResNoMl={AdrsResNoMl}
              setLBCombo={setLBCombo}
              LBCombo={LBCombo}
            />
            <InformantDetails
              setInfomantFirstNameEn={setInfomantFirstNameEn}
              InfomantFirstNameEn={InfomantFirstNameEn}
              setInfomantAadhar={setInfomantAadhar}
              InfomantAadhar={InfomantAadhar}
              setInfomantEmail={setInfomantEmail}
              InfomantEmail={InfomantEmail}
              setInfomantMobile={setInfomantMobile}
              InfomantMobile={InfomantMobile}
              setInformantAddressLineOne={setInformantAddressLineOne}
              InformantAddressLineOne={InformantAddressLineOne}
              setInformantAddressLineTwo={setInformantAddressLineTwo}
              InformantAddressLineTwo={InformantAddressLineTwo}
            />
            {/* <InformantAddress
              setInformantAdrsCountry={setInformantAdrsCountry} InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsStateName={setInformantAdrsStateName} InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsDistrict={setInformantAdrsDistrict} InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName} InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBName={setInformantAdrsLBName} InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsTaluk={setInformantAdrsTaluk} InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsVillage={setInformantAdrsVillage} InformantAdrsVillage={InformantAdrsVillage}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice} InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPincode={setInformantAdrsPincode} InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn} InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn} InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn} InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn} InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo} InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsResNo={setInformantAdrsResNo} InformantAdrsResNo={InformantAdrsResNo}


            // setInfntWardNo={setInfntWardNo} InfntWardNo={InfntWardNo}
            /> */}
          </div>
        )}

        {/* {value === "HOME" && (
          <div>
            <PlaceofBirthHome />
          </div>)
        } */}
        {/* {value === "VEHICLE" && (
          <div>
            <BirthVehicle />
          </div>)
        } */}
        {/* {value === "PUBLIC_PLACES" && (
          <div>
            <PublicPlace />
          </div>)
        } */}
        {toast && (
          <Toast
            error={
              HospitalError ||
              signedOfficerError ||
              signedOfficerDesgError ||
              mobileError ||
              mobileLengthError ||
              SignedOfficerAdharNoError ||
              InstitutionError ||
              SignedOfficerInstError ||
              signedOfficerDesgInstError ||
              InstitutionMobilError ||
              InstitutionAadharError ||
              VehicleRegiNoError ||
              VehiFromEnError ||
              VehiToEnError ||
              VehiFromMlError ||
              VehiToMlError ||
              VehiInfomantFstNameEnError ||
              VehiInfomantMobileNoError ||
              // VehiInfomantAdrCountryError || VehiInfomantAdrStateNameError || VehiInfomantAdrDistrictError || VehiInfomantAdrLBTypeNameError || VehiInfomantAdrLBNameError || VehiInfomantAdrTalukError || VehiInfomantAdrVillageError || VehiInfomantAdrPostOfficeError ||
              // VehiInfomantAdrPincodeError || VehiInfomantAdrMainPlaceEnError || VehiInfomantAdrLocalityNameEnError  ||
              // VehiInfomantAdrHouseNameEnError ||
              //  VehiInfomantAdrDoorNoError || VehiInfomantAdrResNoEnError ||  VehiInfomantAdrStreetNameEnError ||
              PublicPlaceError ||
              PublicPlaceInfomantFstNameEnError ||
              PublicPlaceInfomantMobileNoError ||
              AdrsHomeCountryError ||
              AdrsHomeStateNameError ||
              AdrsHomeDistrictError ||
              AdrsHomeLBTypeNameError ||
              AdrsHomeLBNameError ||
              AdrsHomePincodeError ||
              //  AdrsHomeTalukError || AdrsHomeVillageError || AdrsHomePostOfficeError ||  AdrsHomeMainPlaceEnError ||
              // AdrsHomeMainPlaceMlError || AdrsHomeLocalityNameEnError || AdrsHomeLocalityNameMlError  || AdrsHomeHouseNameEnError || AdrsHomeHouseNameMlError   ||
              HomeInformantFstNameEnError ||
              HomeInformantMobileNoError
              // AdrsHomeDoorNoError || AdrsHomeStreetNameEnError || AdrsHomeStreetNameMlError ||  AdrsHomeResNoEnError || AdrsHomeResNoMlError ||
              // HomeInformantAdrStreetNameEnError ||HomeInformantAdrDoorNoError || HomeInformantAdrResNoEnError ||
              // HomeInformantAdrCountryError || HomeInformantAdrStateNameError || HomeInformantAdrDistrictError || HomeInformantAdrLBTypeNameError || HomeInformantAdrLBNameError || HomeInformantAdrTalukError || HomeInformantAdrVillageError || HomeInformantAdrPostOfficeError ||
              // HomeInformantAdrPincodeError || HomeInformantAdrMainPlaceEnError || HomeInformantAdrLocalityNameEnError || HomeInformantAdrHouseNameEnError
            }
            label={
              // (!HospitalError ? t(`CS_COMPLAINT_COMMENT_SUCCESS`) : t(`BIRTH_ERROR_HOSPITAL_CHOOSE`))

              HospitalError ||
                signedOfficerError ||
                signedOfficerDesgError ||
                mobileError ||
                mobileLengthError ||
                SignedOfficerAdharNoError ||
                InstitutionError ||
                SignedOfficerInstError ||
                signedOfficerDesgInstError ||
                InstitutionMobilError ||
                InstitutionAadharError ||
                VehicleRegiNoError ||
                VehiFromEnError ||
                VehiToEnError ||
                VehiFromMlError ||
                VehiToMlError ||
                VehiInfomantFstNameEnError ||
                VehiInfomantMobileNoError ||
                // VehiInfomantAdrCountryError || VehiInfomantAdrStateNameError || VehiInfomantAdrDistrictError || VehiInfomantAdrLBTypeNameError || VehiInfomantAdrLBNameError || VehiInfomantAdrTalukError || VehiInfomantAdrVillageError || VehiInfomantAdrPostOfficeError ||
                // VehiInfomantAdrPincodeError || VehiInfomantAdrMainPlaceEnError || VehiInfomantAdrLocalityNameEnError ||
                // VehiInfomantAdrHouseNameEnError ||
                // VehiInfomantAdrStreetNameEnError || VehiInfomantAdrDoorNoError || VehiInfomantAdrResNoEnError ||
                PublicPlaceError ||
                PublicPlaceInfomantFstNameEnError ||
                PublicPlaceInfomantMobileNoError ||
                AdrsHomeCountryError ||
                AdrsHomeStateNameError ||
                AdrsHomeDistrictError ||
                AdrsHomeLBTypeNameError ||
                AdrsHomeLBNameError ||
                AdrsHomePincodeError |
                //  AdrsHomeTalukError || AdrsHomeVillageError || AdrsHomePostOfficeError || AdrsHomePincodeError || AdrsHomeMainPlaceEnError ||
                // AdrsHomeMainPlaceMlError || AdrsHomeLocalityNameEnError || AdrsHomeLocalityNameMlError  || AdrsHomeHouseNameEnError || AdrsHomeHouseNameMlError ||
                // AdrsHomeDoorNoError ||AdrsHomeResNoEnError || AdrsHomeResNoMlError || AdrsHomeStreetNameEnError || AdrsHomeStreetNameMlError ||
                // HomeInformantAdrDoorNoError || HomeInformantAdrResNoEnError || HomeInformantAdrStreetNameEnError
                // HomeInformantAdrCountryError || HomeInformantAdrStateNameError || HomeInformantAdrDistrictError || HomeInformantAdrLBTypeNameError || HomeInformantAdrLBNameError || HomeInformantAdrTalukError || HomeInformantAdrVillageError || HomeInformantAdrPostOfficeError ||
                // HomeInformantAdrPincodeError || HomeInformantAdrMainPlaceEnError || HomeInformantAdrLocalityNameEnError  ||
                // HomeInformantAdrHouseNameEnError
                HomeInformantFstNameEnError ||
                HomeInformantMobileNoError
                ? HospitalError
                  ? t(`BIRTH_ERROR_HOSPITAL_CHOOSE`)
                  : signedOfficerError
                    ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`)
                    : signedOfficerDesgError
                      ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)
                      : mobileError
                        ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`)
                        : mobileLengthError
                          ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                          : SignedOfficerAdharNoError
                            ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                            : InstitutionError
                              ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`)
                              : SignedOfficerInstError
                                ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`)
                                : signedOfficerDesgInstError
                                  ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)
                                  : InstitutionMobilError
                                    ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`)
                                    : InstitutionAadharError
                                      ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                                      : PublicPlaceError
                                        ? t(`BIRTH_ERROR_PUBLIC_PLACE_TYPE_CHOOSE`)
                                        : PublicPlaceInfomantFstNameEnError
                                          ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                                          : PublicPlaceInfomantMobileNoError
                                            ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                                            : AdrsHomeCountryError
                                              ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`)
                                              : AdrsHomeStateNameError
                                                ? t(`BIRTH_ERROR_STATE_CHOOSE`)
                                                : AdrsHomeDistrictError
                                                  ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`)
                                                  : AdrsHomeLBTypeNameError
                                                    ? t(`BIRTH_ERROR_LBTYPE_CHOOSE`)
                                                    : AdrsHomeLBNameError
                                                      ? t(`BIRTH_ERROR_LBNAME_CHOOSE`)
                                                      : AdrsHomePincodeError
                                                        ? t(`BIRTH_ERROR_PINCODE_CHOOSE`)
                                                        : // : AdrsHomeTalukError ? t(`BIRTH_ERROR_TALUK_CHOOSE`) : AdrsHomeVillageError ? t(`BIRTH_ERROR_VILLAGE_CHOOSE`)
                                                        //   : AdrsHomePostOfficeError ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`) : AdrsHomePincodeError ? t(`BIRTH_ERROR_PINCODE_CHOOSE`) : AdrsHomeMainPlaceEnError ? t(`BIRTH_ERROR_MAIN_PLACE_EN_CHOOSE`)
                                                        //     : AdrsHomeMainPlaceMlError ? t(`BIRTH_ERROR_MAIN_PLACE_ML_CHOOSE`) : AdrsHomeLocalityNameEnError ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`) : AdrsHomeLocalityNameMlError ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                                                        //      : AdrsHomeHouseNameEnError ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`) : AdrsHomeHouseNameMlError ? t(`BIRTH_ERROR_HOUSE_NAME_ML_CHOOSE`)
                                                        //  : AdrsHomeStreetNameEnError ? t(`BIRTH_ERROR_STREET_NAME_EN_CHOOSE`): AdrsHomeStreetNameMlError ? t(`BIRTH_ERROR_STREET_NAME_ML_CHOOSE`) : AdrsHomeDoorNoError ? t(`BIRTH_ERROR_DOOR_NO_CHOOSE`) : AdrsHomeResNoEnError ? t(`BIRTH_ERROR_RES_ASSOCIATION_NO_EN_CHOOSE`) : AdrsHomeResNoMlError ? t(`BIRTH_ERROR_RES_ASSOCIATION_NO_ML_CHOOSE`)
                                                        VehicleRegiNoError
                                                          ? t(`BIRTH_ERROR_VEHICLE_REGI_NO_CHOOSE`)
                                                          : VehiFromEnError
                                                            ? t(`BIRTH_ERROR_VEHICLE_TRAVELLING_FROM_EN_CHOOSE`)
                                                            : VehiToEnError
                                                              ? t(`BIRTH_ERROR_VEHICLE_TRAVELLING_TO_EN_CHOOSE`)
                                                              : VehiFromMlError
                                                                ? t(`BIRTH_ERROR_VEHICLE_TRAVELLING_FROM_ML_CHOOSE`)
                                                                : VehiToMlError
                                                                  ? t(`BIRTH_ERROR_VEHICLE_TRAVELLING_TO_ML_CHOOSE`)
                                                                  : VehiInfomantFstNameEnError
                                                                    ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                                                                    : VehiInfomantMobileNoError
                                                                      ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                                                                      : // : VehiInfomantAdrCountryError ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`) : VehiInfomantAdrStateNameError ? t(`BIRTH_ERROR_STATE_CHOOSE`) : VehiInfomantAdrDistrictError ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`)
                                                                      //   : VehiInfomantAdrLBTypeNameError ? t(`BIRTH_ERROR_LBTYPE_CHOOSE`) : VehiInfomantAdrLBNameError ? t(`BIRTH_ERROR_LBNAME_CHOOSE`) : VehiInfomantAdrTalukError ? t(`BIRTH_ERROR_TALUK_CHOOSE`) : VehiInfomantAdrVillageError ? t(`BIRTH_ERROR_VILLAGE_CHOOSE`)
                                                                      //     : VehiInfomantAdrPostOfficeError ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`) : VehiInfomantAdrPincodeError ? t(`BIRTH_ERROR_PINCODE_CHOOSE`) : VehiInfomantAdrMainPlaceEnError ? t(`BIRTH_ERROR_MAIN_PLACE_EN_CHOOSE`)
                                                                      //       : VehiInfomantAdrLocalityNameEnError ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)  : VehiInfomantAdrHouseNameEnError ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`)
                                                                      //  : VehiInfomantAdrStreetNameEnError ? t(`BIRTH_ERROR_STREET_NAME_EN_CHOOSE`) : VehiInfomantAdrDoorNoError ? t(`BIRTH_ERROR_DOOR_NO_CHOOSE`) : VehiInfomantAdrResNoEnError ? t(`BIRTH_ERROR_RES_ASSOCIATION_NO_EN_CHOOSE`)
                                                                      HomeInformantFstNameEnError
                                                                        ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                                                                        : HomeInformantMobileNoError
                                                                          ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                                                                          : HomeInformantAdrCountryError
                                                                            ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`)
                                                                            : HomeInformantAdrStateNameError
                                                                              ? t(`BIRTH_ERROR_STATE_CHOOSE`)
                                                                              : HomeInformantAdrDistrictError
                                                                                ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`)
                                                                                : // : HomeInformantAdrLBTypeNameError ? t(`BIRTH_ERROR_LBTYPE_CHOOSE`) : HomeInformantAdrLBNameError ? t(`BIRTH_ERROR_LBNAME_CHOOSE`) : HomeInformantAdrTalukError ? t(`BIRTH_ERROR_TALUK_CHOOSE`) : HomeInformantAdrVillageError ? t(`BIRTH_ERROR_VILLAGE_CHOOSE`)
                                                                                //   : HomeInformantAdrPostOfficeError ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`) : HomeInformantAdrPincodeError ? t(`BIRTH_ERROR_PINCODE_CHOOSE`) : HomeInformantAdrMainPlaceEnError ? t(`BIRTH_ERROR_MAIN_PLACE_EN_CHOOSE`)
                                                                                //     : HomeInformantAdrLocalityNameEnError ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)  : HomeInformantAdrHouseNameEnError ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`)
                                                                                //  : HomeInformantAdrStreetNameEnError ? t(`BIRTH_ERROR_STREET_NAME_EN_CHOOSE`): HomeInformantAdrDoorNoError ? t(`BIRTH_ERROR_DOOR_NO_CHOOSE`) : HomeInformantAdrResNoEnError ? t(`BIRTH_ERROR_RES_ASSOCIATION_NO_EN_CHOOSE`)
                                                                                setToast(false)
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
export default BirthPlace;
