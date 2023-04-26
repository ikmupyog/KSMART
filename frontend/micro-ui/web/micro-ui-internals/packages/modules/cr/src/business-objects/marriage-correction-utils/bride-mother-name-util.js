export const getFilteredBrideMotherNameData = (selectedData, inclusionData) => {
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
      brideMotherNameEn: brideDetails?.brideMothernameEn,
      brideMotherNameMl: brideDetails?.brideMothernameMl,
    };
    return initialValue;
  };

  const computeCurrentValue = (brideDetails) => {
    const currentValue = {
      brideMotherNameEn: brideDetails?.brideMothernameEn,
      brideMotherNameMl: brideDetails?.brideMothernameMl,
    };
    return currentValue;
  };
  
  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    return {documentData:filteredData, docFlag: "BRIDE_MOTHER"};  
  };