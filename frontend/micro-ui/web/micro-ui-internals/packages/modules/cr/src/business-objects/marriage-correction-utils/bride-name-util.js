export const getFilteredBrideNameData = (selectedData, inclusionData) => {
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
    const brideName = {
        firstNameEn:brideDetails?.brideFirstnameEn,
        firstNameMl:brideDetails?.brideFirstnameMl,
        middleNameEn:brideDetails?.brideMiddlenameEn,
        middleNameMl:brideDetails?.brideMiddlenameMl,
        lastNameEn:brideDetails?.brideLastnameEn, 
        lastNameMl:brideDetails?.brideLastnameMl,
      };
    return brideName;
  };

  const computeCurrentValue = (brideDetails) => {
    const brideName = {
        firstNameEn:brideDetails?.brideFirstnameEn,
        firstNameMl:brideDetails?.brideFirstnameMl,
        middleNameEn:brideDetails?.brideMiddlenameEn,
        middleNameMl:brideDetails?.brideMiddlenameMl,
        lastNameEn:brideDetails?.brideLastnameEn,
        lastNameMl:brideDetails?.brideLastnameMl,
      };
    return brideName;
  };
  
  const getFilteredDocuments = (correctionData) => {
    let filteredData  = correctionData;
    return {documentData:filteredData, docFlag: "BRIDE_NAME"};
  };