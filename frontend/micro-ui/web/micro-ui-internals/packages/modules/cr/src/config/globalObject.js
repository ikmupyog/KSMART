import { BIRTH_INCLUSION_FIELD_NAMES, MARRIAGE_INCLUSION_FIELD_NAMES } from "../config/constants";
import { getFilteredChildDobData, getFilteredChildNameData, getFilteredChildSexData } from "../config/birth-inclusion-utils";
import { getFilteredGroomNameEnData, getFilteredMarriageDOMData, getFilteredWardData } from "../config/marriage-correction-utils";

export const initializeBirthInclusionObject = (birthInclusionDocData, selectedData) => {
  let formObj = {};
  console.log("correction docs==",birthInclusionDocData);
  for (let field_key in BIRTH_INCLUSION_FIELD_NAMES) {
    const filteredData = birthInclusionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = birthInclusionFilterFieldsObj[field_key]?.(selectedData, filteredData);
    console.log("filteredData", selectedData, filteredData);
    let tempObj = { ...inclusionsDocsData, isDisable: true, isEditable: false, isFocused: false };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  return formObj;
};

export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: (data, inclusionData) => getFilteredChildDobData(data, inclusionData),
  CHILD_NAME: (data, inclusionData) => getFilteredChildNameData(data, inclusionData),
  CHILD_SEX: (data, inclusionData) => getFilteredChildSexData(data, inclusionData),
};

export const initializeMarriageCorrectionObject = (marriageCorrectionDocData, selectedData) => {
  let formObj = {};
  for (let field_key in MARRIAGE_INCLUSION_FIELD_NAMES) {
    const filteredData = marriageCorrectionDocData?.filter((item) => item.CorrectionField === field_key);
    let inclusionsDocsData = marriageCorrectionFilterFieldsObj[field_key]?.(selectedData, filteredData);
    let tempObj = { ...inclusionsDocsData, isDisable: true, isEditable: false, isFocused: false };
    Object.assign(formObj, { [field_key]: tempObj });
  }
  console.log("returned formObj==", formObj);
  return formObj;
};

export const marriageCorrectionFilterFieldsObj = {
  CHILD_DOB: (data, inclusionData) => getFilteredMarriageDOMData(data, inclusionData),
  GROOM_NAME_EN: (data, inclusionData) => getFilteredGroomNameEnData(data, inclusionData),
  CHILD_SEX: (data, inclusionData) => getFilteredChildSexData(data, inclusionData),
  CHILD_WARD: (data, inclusionData) => getFilteredWardData(data, inclusionData),
};
