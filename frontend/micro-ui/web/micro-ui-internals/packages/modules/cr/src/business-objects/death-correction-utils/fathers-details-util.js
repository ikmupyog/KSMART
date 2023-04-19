  import { DEATH_CORRECTION_FIELD_NAMES } from "../../config/constants";
  
  export const getFilteredDeceasedFathersName = (selectedData, correctionData) => {
    let filteredDocuments = getFilteredDocuments(correctionData);
    const computedCurrentValue = computeCurrentValue(selectedData);
    const computedInitialValue = computeInitialValue(selectedData);
    let selectedDodObj = {
      fieldName: DEATH_CORRECTION_FIELD_NAMES.DECEASED_FATHER,
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
  const computeInitialValue = (selectedData) => {
    const initialValue = {
      fathersNameEn: selectedData?.FamilyInformationDeath?.FatherNameEn, 
      fathersNameMl: selectedData?.FamilyInformationDeath?.FatherNameMl
    };
    return initialValue;
  };
  
  
const computeCurrentValue = (selectedData) => {
  const currentValue = {
    fathersNameEn: selectedData?.FamilyInformationDeath?.FatherNameEn, 
    fathersNameMl: selectedData?.FamilyInformationDeath?.FatherNameMl
  }
  return currentValue;
};

  
  const getFilteredDocuments = (correctionData) => {
    let filteredData  = correctionData[0];
    return filteredData;
  };
  