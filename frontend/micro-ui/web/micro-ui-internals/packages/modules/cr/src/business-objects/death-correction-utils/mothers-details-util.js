  import { DEATH_CORRECTION_FIELD_NAMES } from "../../config/constants";
  
  export const getFilteredDeceasedMothersName = (selectedData, correctionData) => {
    let filteredDocuments = getFilteredDocuments(correctionData);
    const computedCurrentValue = computeCurrentValue(selectedData);
    const computedInitialValue = computeInitialValue(selectedData);
    let selectedDodObj = {
      fieldName: DEATH_CORRECTION_FIELD_NAMES.DECEASED_MOTHER,
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
      mothersNameEn: selectedData?.FamilyInformationDeath?.MotherNameEn, 
      mothersNameMl: selectedData?.FamilyInformationDeath?.MotherNameMl
    };
    return initialValue;
    };

const computeCurrentValue = (selectedData) => {
  const currentValue = {
    mothersNameEn: selectedData?.FamilyInformationDeath?.MotherNameEn, 
      mothersNameMl: selectedData?.FamilyInformationDeath?.MotherNameMl
  }
  return currentValue;
};

  
  const getFilteredDocuments = (correctionData) => {
    let filteredData  = correctionData[0];
    return filteredData;
  };
  