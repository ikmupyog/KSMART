import { BIRTH_INCLUSION_FIELD_NAMES, DEATH_CORRECTION_FIELD_NAMES, MARRIAGE_INCLUSION_FIELD_NAMES } from "../config/constants";
import { 
  getFilteredGroomNameData,
  getFilteredMarriageDOMData,
  // getFilteredMarriagePlaceWardData,
  // getFilteredMarriagePlaceTypeData,
  getFilteredGroomFatherNameData,
  getFilteredGroomMotherNameData,
  getFilteredGroomGuardianNameData,
  getFilteredGroomAgeData,
  getFilteredBrideNameData,
  getFilteredBrideFatherNameData,
  getFilteredBrideGuardianNameData,
  getFilteredBrideMotherNameData,
  getFilteredBrideAgeData,
  // getFilteredBrideDOBData,
  getFilteredMarriagePlaceNameData,
  getFilteredGroomAddressData,
  getFilteredBrideAddressData,
} from "./marriage-correction-utils";
import {
  getFilteredChildDobData,
  getFilteredChildNameData,
  getFilteredChildSexData,
  getFilteredChildAdharData,
  getFilteredPresentAddressData,
  getFilteredMotherData,
  getFilteredFatherData,
} from "./birth-inclusion-utils";

import {
  getFilteredDodData,
  getFilteredDeceasedAadharData,
  getFilteredDeceasedNameData,
  getFilteredDeceasedMothersName,
  getFilteredDeceasedFathersName,
  getFilteredDeceasedSpouseName,
  getFilteredDeceasedAddress,
  getFilteredDeceasedPlaceOfDeath,
  getFilteredDeceasedGender,
} from "./death-correction-utils";

export const initializeBirthInclusionObject = (birthInclusionDocData, selectedData,sex,places) => {
  let formObj = {};
  for (let field_key in BIRTH_INCLUSION_FIELD_NAMES) {
    const filteredData = birthInclusionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = birthInclusionFilterFieldsObj[field_key]?.({data:selectedData, inclusionData:filteredData,sex});
    let tempObj = { ...inclusionsDocsData};
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};
export const initializedDeathCorrectionObject = (deathCorrectionDocData, selectedData, sex, places) => {
  let formObj = {};
  for (let field_key in DEATH_CORRECTION_FIELD_NAMES) {
    const filteredData = deathCorrectionDocData?.filter((item) => item.CorrectionField === field_key);
    let correctionDocsData = deathCorrectionFilterFieldsObj[field_key]?.({data:selectedData, correctionData:filteredData,sex,places});
    let tempObj = { ...correctionDocsData };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};

export const initializeMarriageCorrectionObject = (marriageCorrectionDocData, selectedData, cmbWardNo, cmbPlace,cmbPlaceName) => {
  let formObj = {};
  for (let field_key in MARRIAGE_INCLUSION_FIELD_NAMES) {
    const filteredData = marriageCorrectionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = marriageCorrectionFilterFieldsObj[field_key]?.({data:selectedData, inclusionData: filteredData,cmbWardNo,cmbPlace,cmbPlaceName});
    let tempObj = { ...inclusionsDocsData };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};

export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: ({data, inclusionData}) => getFilteredChildDobData(data, inclusionData),
  CHILD_NAME: ({data, inclusionData}) => getFilteredChildNameData(data, inclusionData),
  CHILD_SEX: ({data, inclusionData, sex}) => getFilteredChildSexData(data, inclusionData, sex),
  CHILD_AADHAAR: ({data, inclusionData}) => getFilteredChildAdharData(data, inclusionData),
  FATHER_DETAILS: ({data, inclusionData}) => getFilteredFatherData(data, inclusionData),
  MOTHER_DETAILS: ({data, inclusionData}) => getFilteredMotherData(data, inclusionData),
  PRESENT_ADDRESS: ({data, inclusionData}) => getFilteredPresentAddressData (data, inclusionData),
};

export const deathCorrectionFilterFieldsObj = {
  DECEASED_DOB: ({data, correctionData}) => getFilteredDodData(data, correctionData),
  DECEASED_AADHAR: ({data, correctionData}) => getFilteredDeceasedAadharData(data, correctionData),
  DECEASED_NAME: ({data, correctionData}) => getFilteredDeceasedNameData(data, correctionData),
  DECEASED_PLACE_OF_DEATH: ({data, correctionData, places}) => getFilteredDeceasedPlaceOfDeath(data, correctionData, places),
  DECEASED_SEX: ({data, correctionData, sex}) => getFilteredDeceasedGender(data, correctionData, sex),
  DECEASED_MOTHER	: ({data, correctionData}) => getFilteredDeceasedMothersName(data, correctionData),
  DECEASED_FATHER: ({data, correctionData}) => getFilteredDeceasedFathersName(data, correctionData),
  DECEASED_SPOUSE: ({data, correctionData}) => getFilteredDeceasedSpouseName(data, correctionData),
  PERMANENT_ADDRESS: ({data, correctionData}) => getFilteredDeceasedAddress(data, correctionData),
};

export const marriageCorrectionFilterFieldsObj = {
  DOM: ({data, inclusionData}) => getFilteredMarriageDOMData(data, inclusionData),
  GROOM_NAME: ({data, inclusionData}) => getFilteredGroomNameData(data, inclusionData),
  PLACE_OF_MARRIAGE: ({data, inclusionData}) => getFilteredMarriagePlaceNameData(data, inclusionData),
  // MARRIAGE_PLACE_TYPE: ({data, inclusionData, cmbPlace}) => getFilteredMarriagePlaceTypeData(data, inclusionData, cmbPlace),
  // MARRIAGE_PLACE_NAME: ({data, inclusionData, cmbPlaceName}) => getFilteredMarriagePlaceNameData(data, inclusionData, cmbPlaceName),
  GROOM_FATHER: ({data, inclusionData}) => getFilteredGroomFatherNameData(data, inclusionData),
  GROOM_MOTHER: ({data, inclusionData}) => getFilteredGroomMotherNameData(data, inclusionData),
  GROOM_GUARDIAN: ({data, inclusionData}) => getFilteredGroomGuardianNameData(data, inclusionData),
  GROOM_AGE: ({data, inclusionData}) => getFilteredGroomAgeData(data, inclusionData),
  BRIDE_NAME: ({data, inclusionData}) => getFilteredBrideNameData(data, inclusionData),
  BRIDE_MOTHER: ({data, inclusionData}) => getFilteredBrideMotherNameData(data, inclusionData),
  BRIDE_FATHER: ({data, inclusionData}) => getFilteredBrideFatherNameData(data, inclusionData),
  BRIDE_GUARDIAN: ({data, inclusionData}) => getFilteredBrideGuardianNameData(data, inclusionData),
  BRIDE_AGE: ({data, inclusionData}) => getFilteredBrideAgeData(data, inclusionData),
  // BRIDE_DOB: ({data, inclusionData}) => getFilteredBrideDOBData(data, inclusionData),
  GROOM_PERADD: ({data, inclusionData}) => getFilteredGroomAddressData(data, inclusionData),
  BRIDE_PERADD: ({data, inclusionData}) => getFilteredBrideAddressData(data, inclusionData),
};

