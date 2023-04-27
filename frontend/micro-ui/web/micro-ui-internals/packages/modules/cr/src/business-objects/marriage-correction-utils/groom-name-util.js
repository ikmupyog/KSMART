export const getFilteredGroomNameData = (selectedData, inclusionData) => {
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
    const groomName = {
        firstNameEn:groomDetails?.groomFirstnameEn,
        firstNameMl:groomDetails?.groomFirstnameMl,
        middleNameEn:groomDetails?.groomMiddlenameEn,
        middleNameMl:groomDetails?.groomMiddlenameMl,
        lastNameEn:groomDetails?.groomLastnameEn,
        lastNameMl:groomDetails?.groomLastnameMl,
      };
    return groomName;
  };

  const computeCurrentValue = (groomDetails) => {
    const groomName = {
        firstNameEn:groomDetails?.groomFirstnameEn,
        firstNameMl:groomDetails?.groomFirstnameMl,
        middleNameEn:groomDetails?.groomMiddlenameEn,
        middleNameMl:groomDetails?.groomMiddlenameMl,
        lastNameEn:groomDetails?.groomLastnameEn,
        lastNameMl:groomDetails?.groomLastnameMl,
      };
    return groomName;
  };
  
  const getFilteredDocuments = (correctionData) => {
    let filteredData  = correctionData;
    return {documentData:filteredData, docFlag: "GROOM_NAME"};
  };