import { BIRTH_INCLUSION_FIELD_NAMES, DEATH_CORRECTION_FIELD_NAMES, MARRIAGE_INCLUSION_FIELD_NAMES } from "../config/constants";
import { getFilteredGroomNameEnData, getFilteredMarriageDOMData, getFilteredWardData } from "./marriage-correction-utils";
import {
  getFilteredChildDobData,
  getFilteredChildNameData,
  getFilteredChildSexData,
  getFilteredFatherData,
  getFilteredMotherData,
  getFilteredParentAddressData,
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

export const initializeBirthInclusionObject = (birthInclusionDocData, selectedData) => {
  let formObj = {};
  for (let field_key in BIRTH_INCLUSION_FIELD_NAMES) {
    const filteredData = birthInclusionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = birthInclusionFilterFieldsObj[field_key]?.(selectedData, filteredData);
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

export const initializeMarriageCorrectionObject = (marriageCorrectionDocData, selectedData) => {
  let formObj = {};
  for (let field_key in MARRIAGE_INCLUSION_FIELD_NAMES) {
    const filteredData = marriageCorrectionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = marriageCorrectionFilterFieldsObj[field_key]?.(selectedData, filteredData);
    let tempObj = { ...inclusionsDocsData };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};

export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: (data, inclusionData) => getFilteredChildDobData(data, inclusionData),
  CHILD_NAME: (data, inclusionData) => getFilteredChildNameData(data, inclusionData),
  CHILD_SEX: (data, inclusionData) => getFilteredChildSexData(data, inclusionData),
  FATHER_DETAILS: (data, inclusionData) => getFilteredFatherData(data, inclusionData),
  MOTHER_DETAILS: (data, inclusionData) => getFilteredMotherData(data, inclusionData),
  PRESENT_ADDRESS: (data, inclusionData) => getFilteredParentAddressData(data, inclusionData),
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
  CHILD_DOB: (data, inclusionData) => getFilteredMarriageDOMData(data, inclusionData),
  GROOM_NAME_EN: (data, inclusionData) => getFilteredGroomNameEnData(data, inclusionData),
  CHILD_SEX: (data, inclusionData) => getFilteredChildSexData(data, inclusionData),
  CHILD_WARD: (data, inclusionData) => getFilteredWardData(data, inclusionData),
};
