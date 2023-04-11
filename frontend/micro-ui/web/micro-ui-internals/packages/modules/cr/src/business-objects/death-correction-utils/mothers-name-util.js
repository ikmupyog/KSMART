  export const getFilteredDeceasedMothersName = (selectedData, correctionData) => {
    let filteredDocuments = getFilteredDocuments(correctionData);
    const computedCurrentValue = computeCurrentValue({mothersNameEn: selectedData?.FamilyInformationDeath?.MotherNameEn, mothersNameMl: selectedData?.FamilyInformationDeath?.MotherNameMl});
    const computedInitialValue = computeInitialValue({mothersNameEn: selectedData?.FamilyInformationDeath?.MotherNameEn, mothersNameMl: selectedData?.FamilyInformationDeath?.MotherNameMl});
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
  const computeInitialValue = (motherName) => {
    const initialValue = motherName;
    return initialValue;
  };


const computeCurrentValue = (motherName) => {
  const currentValue = motherName;
  return currentValue;
};

  
  const getFilteredDocuments = (correctionData) => {
    let filteredData  = correctionData[0];
    return filteredData;
  };
  