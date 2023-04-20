export const getFilteredBrideGuardianNameData = (selectedData, inclusionData) => {
    let filteredDocuments = getFilteredDocuments(inclusionData);
    const computedInitialValue = computeInitialValue(selectedData?.BrideDetails);
    const computedCurrentValue = computeCurrentValue(selectedData?.BrideDetails);
    let selectedDomObj = {
      initialValue: computedInitialValue,
      curValue: computedCurrentValue,
      isDisable: true,
      isEditable: false,
      isFocused: false,
      ...filteredDocuments,
    };
    return { ...selectedDomObj };
  };
  
  //TODO need validation to check dob is null
  const computeInitialValue = (brideDetails) => {
    const initialValue = {
      brideGuardianNameEn: brideDetails?.brideGuardiannameEn,
      brideGuardianNameMl: brideDetails?.brideGuardiannameMl,
    };
    return initialValue;
  };
  
  const computeCurrentValue = (brideDetails) => {
    const currentValue = {
      brideGuardianNameEn: brideDetails?.brideGuardiannameEn,
      brideGuardianNameMl: brideDetails?.brideGuardiannameMl,
    };
    return currentValue;
  };

  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    return {documentData:filteredData, docFlag: "BRIDE_GUARDIAN"};  
  };