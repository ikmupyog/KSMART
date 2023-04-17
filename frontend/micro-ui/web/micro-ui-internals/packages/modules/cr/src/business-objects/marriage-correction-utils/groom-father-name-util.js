export const getFilteredGroomFatherNameData = (selectedData, inclusionData) => {
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
      groomFatherNameEn: groomDetails?.groomFathernameEn,
      groomFatherNameMl: groomDetails?.groomFathernameMl,
    };
    return initialValue;
  };

  const computeCurrentValue = (groomDetails) => {
    const currentValue = {
      groomFatherNameEn: groomDetails?.groomFathernameEn,
      groomFatherNameMl: groomDetails?.groomFathernameMl,
    };
    return currentValue;
  };
  
  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    console.log("filtered data ===", filteredData);
    return {documentData:filteredData, docFlag: "GROOM_FATHER"}; 
  };