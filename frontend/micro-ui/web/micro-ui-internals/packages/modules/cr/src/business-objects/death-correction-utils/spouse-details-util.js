
  export const getFilteredDeceasedSpouseName = (selectedData, correctionData) => {
    let filteredDocuments = getFilteredDocuments(correctionData);
    const computedCurrentValue = computeCurrentValue({spouseNameEn: selectedData?.FamilyInformationDeath?.SpouseNameEn, spouseNameMl: selectedData?.FamilyInformationDeath?.SpouseNameMl});
    const computedInitialValue = computeInitialValue({spouseNameEn: selectedData?.FamilyInformationDeath?.SpouseNameEn, spouseNameMl: selectedData?.FamilyInformationDeath?.SpouseNameMl});
    let selectedDodObj = {
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
  
    const computeInitialValue = (spouseName) => {
      const initialValue = spouseName;
      return initialValue;
    };
    
    const computeCurrentValue = (spouseName) => {
      const currentValue = spouseName;
      return currentValue;
    };


const getFilteredDocuments = (correctionData) => {
  let filteredData  = correctionData[0];
  return filteredData;
};
