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
        middleNameEn:groomDetails?.groomMiddlenameEn,
        lastNameEn:groomDetails?.groomLastnameEn,
        firstNameMl:groomDetails?.groomFirstnameMl,
        middleNameMl:groomDetails?.groomMiddlenameMl,
        lastNameMl:groomDetails?.groomLastnameMl,
      };
    return groomName;
  };

  const computeCurrentValue = (groomDetails) => {
    const groomName = {firstNameEn:groomDetails?.groomFirstnameEn,
        middleNameEn:groomDetails?.groomMiddlenameEn,
        lastNameEn:groomDetails?.groomLastnameEn,
        firstNameMl:groomDetails?.groomFirstnameMl,
        middleNameMl:groomDetails?.groomMiddlenameMl,
        lastNameMl:groomDetails?.groomLastnameMl,
      };
    return groomName;
  };
  
  const getFilteredDocuments = (correctionData) => {
    let filteredData  = correctionData;
    return {documentData:filteredData, docFlag: "GROOM_NAME"};
  };