import { DEATH_CORRECTION_FIELD_NAMES } from "../../config/constants";


export const getFilteredDeceasedAadharData = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData?.InformationDeath?.DeceasedAadharNumber);
  const computedInitialValue = computeInitialValue(selectedData?.InformationDeath?.DeceasedAadharNumber);
  let selectedDodObj = {
  fieldName: DEATH_CORRECTION_FIELD_NAMES.DECEASED_AADHAR,
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
const computeInitialValue = (aadhar) => {
  const initialValue = aadhar;
  return initialValue;
};


const computeCurrentValue = (aadhar) => {
  const currentValue = aadhar;
  return currentValue;
};

const getFilteredDocuments = (correctionData) => {
  let filteredData  = correctionData[0];
  return filteredData;
};
