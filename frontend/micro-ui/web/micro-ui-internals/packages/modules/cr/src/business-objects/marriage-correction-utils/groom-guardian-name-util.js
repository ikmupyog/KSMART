export const getFilteredGroomGuardianNameData = (selectedData, inclusionData) => {
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
      groomGuardianNameEn: groomDetails?.groomGuardiannameEn,
      groomGuardianNameMl: groomDetails?.groomGuardiannameMl,
    };
    return initialValue;
  };
  const computeCurrentValue = (groomDetails) => {
    const currentValue = {
      groomGuardianNameEn: groomDetails?.groomGuardiannameEn,
      groomGuardianNameMl: groomDetails?.groomGuardiannameMl,
    };
    return currentValue;
  };
  
  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    return {documentData:filteredData, docFlag: "GROOM_GUARDIAN"};  
  };