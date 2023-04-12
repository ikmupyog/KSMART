export const getFilteredBrideNameData = (selectedData, inclusionData) => {
    let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
    const computedValue = computeInitialValue(selectedData?.BrideDetails);
    let selectedDomObj = {
      initialValue: computedValue,
      curValue: computedValue,
      isDisable: true,
      isEditable: false,
      isFocused: false,
      ...filteredDocuments,
    };
    return { ...selectedDomObj };
  };
  
  //TODO need validation to check dob is null
  const computeInitialValue = (brideDetails) => {
    const brideName = {firstNameEn:brideDetails?.brideFirstnameEn,
        middleNameEn:brideDetails?.brideMiddlenameEn,
        lastNameEn:brideDetails?.brideLastnameEn,
        firstNameMl:brideDetails?.brideFirstnameMl,
        middleNameMl:brideDetails?.brideMiddlenameMl,
        lastNameMl:brideDetails?.brideLastnameMl,
      };
    return brideName;
  };
  
  const getFilteredDocuments = (selectedData,inclusionData) => {
    let filteredData  = {};
    if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    return filteredData;
  };