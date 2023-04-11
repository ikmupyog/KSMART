import { BIRTH_INCLUSION_FIELD_NAMES, DEATH_CORRECTION_FIELD_NAMES, MARRIAGE_INCLUSION_FIELD_NAMES } from "../config/constants";
import { 
  getFilteredGroomNameData,
  getFilteredMarriageDOMData,
  getFilteredMarriagePlaceWardData,
  getFilteredMarriagePlaceTypeData,
  getFilteredGroomFatherNameData,
  getFilteredGroomMotherNameData,
  getFilteredGroomGuardianNameData,
  getFilteredGroomDOBData,
  getFilteredGroomAgeData,
} from "./marriage-correction-utils";
import {
  getFilteredChildDobData,
  getFilteredChildNameData,
  getFilteredChildSexData,
  getFilteredChildAdharData,
  getFilteredParentAddressData,
  getFilteredMotherData,
  getFilteredFatherData,
} from "./birth-inclusion-utils";

import {
  getFilteredDodData,
  getFilteredDeceasedAadharData,
  getFilteredDeceasedNameDataEn,
  getFilteredDeceasedNameDataMl,
  getFilteredDeceasedMothersName,
  getFilteredDeceasedFathersName,
  getFilteredDeceasedSpouseName,
  getFilteredDeceasedAddressEn,
  getFilteredDeceasedAddressMl,
  getFilteredDeceasedPlaceOfDeath,
  getFilteredDeceasedGender,
} from "./death-correction-utils";

export const initializeBirthInclusionObject = (birthInclusionDocData, selectedData,sex,places) => {
  let formObj = {};
  console.log("sex data==",sex);
  for (let field_key in BIRTH_INCLUSION_FIELD_NAMES) {
    const filteredData = birthInclusionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = birthInclusionFilterFieldsObj[field_key]?.({data:selectedData, inclusionData:filteredData,sex,places});
    let tempObj = { ...inclusionsDocsData};
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};
export const initializedDeathCorrectionObject = (deathCorrectionDocData, selectedData) => {
  let formObj = {};
  for (let field_key in DEATH_CORRECTION_FIELD_NAMES) {
    const filteredData = deathCorrectionDocData?.filter((item) => item.CorrectionField === field_key);
    let correctionDocsData = deathCorrectionFilterFieldsObj[field_key]?.(selectedData, filteredData);
    let tempObj = { ...correctionDocsData, isDisabled: true, isEditable: false, isFocused: false };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};

export const initializeMarriageCorrectionObject = (marriageCorrectionDocData, selectedData, cmbWardNo) => {
  let formObj = {};
  for (let field_key in MARRIAGE_INCLUSION_FIELD_NAMES) {
    const filteredData = marriageCorrectionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = marriageCorrectionFilterFieldsObj[field_key]?.(selectedData, filteredData,cmbWardNo);
    let tempObj = { ...inclusionsDocsData };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};





export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: ({data, inclusionData}) => getFilteredChildDobData(data, inclusionData),
  CHILD_NAME: ({data, inclusionData}) => getFilteredChildNameData(data, inclusionData),
  CHILD_SEX: ({data, inclusionData, sex}) => getFilteredChildSexData(data, inclusionData, sex),
  CHILD_ADHAR: ({data, inclusionData}) => getFilteredChildAdharData(data, inclusionData),
  FATHER_DETAILS: ({data, inclusionData}) => getFilteredFatherData(data, inclusionData),
  MOTHER_DETAILS: ({data, inclusionData}) => getFilteredMotherData(data, inclusionData),
  PRESENT_ADDRESS: ({data, inclusionData}) => getFilteredParentAddressData(data, inclusionData),
};

export const deathCorrectionFilterFieldsObj = {
  CHILD_DOB: (data, correctionData) => getFilteredDodData(data, correctionData),
  DECEASED_AADHAR: (data, correctionData) => getFilteredDeceasedAadharData(data, correctionData),
  DECEASED_NAME_EN: (data, correctionData) => getFilteredDeceasedNameDataEn(data, correctionData),
  DECEASED_NAME_ML: (data, correctionData) => getFilteredDeceasedNameDataMl(data, correctionData),
  PLACE_OF_DEATH: (data, correctionData) => getFilteredDeceasedPlaceOfDeath(data, correctionData),
  GENDER: (data, correctionData) => getFilteredDeceasedGender(data, correctionData),
  MOTHERS_NAME: (data, correctionData) => getFilteredDeceasedMothersName(data, correctionData),
  FATHERS_NAME: (data, correctionData) => getFilteredDeceasedFathersName(data, correctionData),
  SPOUSE_NAME: (data, correctionData) => getFilteredDeceasedSpouseName(data, correctionData),
  ADDRESS_EN: (data, correctionData) => getFilteredDeceasedAddressEn(data, correctionData),
  ADDRESS_ML: (data, correctionData) => getFilteredDeceasedAddressMl(data, correctionData),
};

export const marriageCorrectionFilterFieldsObj = {
  MARRIAGE_DOM: (data, inclusionData) => getFilteredMarriageDOMData(data, inclusionData),
  GROOM_NAME_EN: (data, inclusionData) => getFilteredGroomNameData(data, inclusionData),
  MARRIAGE_PLACE_WARD: (data, inclusionData, cmbWardNo) => getFilteredMarriagePlaceWardData(data, inclusionData, cmbWardNo),
  MARRIAGE_PLACE_TYPE: (data, inclusionData) => getFilteredMarriagePlaceTypeData(data, inclusionData),
  GROOM_FATHER_NAME_EN: (data, inclusionData) => getFilteredGroomFatherNameData(data, inclusionData),
  GROOM_MOTHER_NAME_EN: (data, inclusionData) => getFilteredGroomMotherNameData(data, inclusionData),
  GROOM_GUARDIAN_NAME_EN: (data, inclusionData) => getFilteredGroomGuardianNameData(data, inclusionData),
  GROOM_DOB: (data, inclusionData) => getFilteredGroomDOBData(data, inclusionData),
  GROOM_AGE: (data, inclusionData) => getFilteredGroomAgeData(data, inclusionData),
};

