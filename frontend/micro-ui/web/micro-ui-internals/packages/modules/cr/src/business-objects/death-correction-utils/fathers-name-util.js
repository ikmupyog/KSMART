  export const getFilteredDeceasedFathersName = (selectedData, correctionData) => {
    let filteredDocuments = getFilteredDocuments(correctionData);
    const computedCurrentValue = computeCurrentValue({fathersNameEn: selectedData?.FamilyInformationDeath?.FatherNameEn, fathersNameMl: selectedData?.FamilyInformationDeath?.FatherNameMl});
    const computedInitialValue = computeInitialValue({fathersNameEn: selectedData?.FamilyInformationDeath?.FatherNameEn, fathersNameMl: selectedData?.FamilyInformationDeath?.FatherNameMl});
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
  const computeInitialValue = (fatherName) => {
    const initialValue = fatherName;
    return initialValue;
  };
  
  
const computeCurrentValue = (fatherName) => {
  const currentValue = fatherName;
  return currentValue;
};

  
  const getFilteredDocuments = (correctionData) => {
    let filteredData  = correctionData[0];
    return filteredData;
  };
  