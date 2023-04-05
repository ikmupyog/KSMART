import { BIRTH_INCLUSION_FIELD_NAMES } from "../config/constants";
import {
  getFilteredChildDobData,
  getFilteredChildNameData,
  getFilteredChildSexData,
  getFilteredFatherData,
  getFilteredMotherData,
  getFilteredParentAddressData,
} from "../business-objects/birth-inclusion-utils";
import { DEATH_CORRECTION_FIELD_NAMES } from "../config/constants";

import {
  getFilteredDeceasedAadharData,
  getFilteredDeceasedFirstNameData,
  getFilteredDodData,
  // getFilteredDeceasedMiddleNameData,
} from "../config/death-correction-utils";

export const initializeBirthInclusionObject = (birthInclusionDocData, selectedData) => {
  let formObj = {};

  for (let field_key in BIRTH_INCLUSION_FIELD_NAMES) {
    const filteredData = birthInclusionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = birthInclusionFilterFieldsObj[field_key]?.(selectedData, filteredData);

    let tempObj = { ...inclusionsDocsData, isDisabled: true, isEditable: false, isFocused: false };
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
  DECEASED_FIRST_NAME: (data, correctionData) => getFilteredDeceasedFirstNameData(data, correctionData),
  // DECEASED_MIDDLE_NAME: (data, correctionData) => getFilteredDeceasedMiddleNameData(data, correctionData),
};

export const initializeMarriageCorrectionObject = (birthInclusionDocData, selectedData) => {
  let formObj = {};

  for (let field_key in BIRTH_INCLUSION_FIELD_NAMES) {
    const filteredData = birthInclusionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = marriageCorrectionFilterFieldsObj[field_key]?.(selectedData, filteredData);

    let tempObj = { ...inclusionsDocsData, isDisable: true, isEditable: false, isFocused: false };
    Object.assign(formObj, { [field_key]: tempObj });
  }

  return formObj;
};

export const marriageCorrectionFilterFieldsObj = {
  CHILD_DOB: (data, inclusionData) => getFilteredChildDobData(data, inclusionData),
  CHILD_NAME: (data, inclusionData) => getFilteredChildNameData(data, inclusionData),
  CHILD_SEX: (data, inclusionData) => getFilteredChildSexData(data, inclusionData),
};
