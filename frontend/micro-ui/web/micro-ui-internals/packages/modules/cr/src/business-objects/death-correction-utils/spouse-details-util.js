import { DEATH_CORRECTION_FIELD_NAMES } from "../../config/constants";
 
 
 export const getFilteredDeceasedSpouseName = (selectedData, correctionData) => {
    let filteredDocuments = getFilteredDocuments(correctionData);
    const computedInitialValue = computeInitialValue(selectedData);
    const computedCurrentValue = computeCurrentValue(selectedData)
    let selectedDodObj = {
      fieldName: DEATH_CORRECTION_FIELD_NAMES.DECEASED_SPOUSE,
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
        spouseNameEn: selectedData?.FamilyInformationDeath?.SpouseNameEn,
        spouseNameMl: selectedData?.FamilyInformationDeath?.SpouseNameMl
      };
      return initialValue;
      };
    

const computeCurrentValue = (selectedData) => {
const currentValue = {
  spouseNameEn: selectedData?.FamilyInformationDeath?.SpouseNameEn,
  spouseNameMl: selectedData?.FamilyInformationDeath?.SpouseNameMl
};
return currentValue;
};

const getFilteredDocuments = (correctionData) => {
  let filteredData  = correctionData[0];
  return filteredData;
};
