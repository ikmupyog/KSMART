export const getFilteredGroomMotherNameData = (selectedData, inclusionData) => {
    let filteredDocuments = getFilteredDocuments(inclusionData);
    const computedInitialValue = computeInitialValue(selectedData?.GroomDetails);
    const computedCurrentValue = computeCurrentValue(selectedData?.GroomDetails);
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
  const computeInitialValue = (groomDetails) => {
    const initialValue = {
      groomMotherNameEn: groomDetails?.groomMothernameEn,
      groomMotherNameMl: groomDetails?.groomMothernameMl,
    };
    return initialValue;
  };

  const computeCurrentValue = (groomDetails) => {
    const currentValue = {
      groomMotherNameEn: groomDetails?.groomMothernameEn,
      groomMotherNameMl: groomDetails?.groomMothernameMl,
    };
    return currentValue;
  };
  
  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    return {documentData:filteredData, docFlag: "GROOM_MOTHER"};  
  };