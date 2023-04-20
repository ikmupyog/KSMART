import { DEATH_CORRECTION_FIELD_NAMES } from "../../config/constants";

export const getFilteredDeceasedGender = (selectedData, correctionData, sex) => {
  let filteredDocuments = getFilteredDocuments(selectedData,correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData?.InformationDeath?.DeceasedGender, sex);
  const computedInitialValue = computeInitialValue(selectedData?.InformationDeath?.DeceasedGender, sex);
  let selectedDodObj = {
    fieldName: DEATH_CORRECTION_FIELD_NAMES.DECEASED_SEX,
    initialValue: computedInitialValue,
  curValue: computedCurrentValue,
  isDisabled: true,
  isEditable: false,
  isFocused: false,
  ...filteredDocuments,
};
  return { ...selectedDodObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (gender, sexArray) => {
  const initialValue = sexArray?.find((item) => item.code === gender);
  return initialValue;
};


const computeCurrentValue = (gender, sexArray) => {
  const currentValue = sexArray?.find((item) => item.code === gender);
  return currentValue;
};

const getFilteredDocuments = (selectedData,correctionData) => {
  let filteredData  = {};
  if (selectedData?.InformationDeath?.DeathPlace === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "SEX_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "SEX_NON_INSTITUTIONAL");
  }
  return filteredData;
};
