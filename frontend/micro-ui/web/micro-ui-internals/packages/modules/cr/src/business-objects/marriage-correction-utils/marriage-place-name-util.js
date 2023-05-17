export const getFilteredMarriagePlaceNameData = (selectedData, inclusionData, cmbPlaceName) => {
    let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
    // const computedValue = computeInitialValue(selectedData?.marriagePlacetype);
    const computedInitialValue = computeInitialValue(selectedData?.placeid, cmbPlaceName);
    const computedCurrentValue = computeCurrentValue(selectedData?.placeid, cmbPlaceName);
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
  // const computeInitialValue = (place) => {
  //   const initialValue = place;
  //   return initialValue;
  //   return {firstName:"sdsa",middleNmae:"dsasd",lastNma:'"d'};
  // };
  
  const computeInitialValue = (marriagePlaceName, placeArray) => {
    const initialValue = placeArray.find((item) => item.code === marriagePlaceName);
    return initialValue;
  };
  
  const computeCurrentValue = (marriagePlaceName, placeArray) => {
    const currentValue = placeArray.find((item) => item.code === marriagePlaceName);
    return currentValue;
  };
  
  const getFilteredDocuments = (selectedData,inclusionData) => {
    let filteredData  = {};
    if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
      filteredData = inclusionData?.filter((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = inclusionData?.filter((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    return filteredData;
  };