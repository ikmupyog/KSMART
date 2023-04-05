export const getFilteredDeceasedNameDataMl = (selectedData, correctionData) => {
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DeceasedFirstNameEn,
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {firstName: selectedData?.InformationDeath?.DeceasedFirstNameMl ,middleName: selectedData?.InformationDeath?.DeceasedMiddleNameMl,lastName:selectedData?.InformationDeath?.DeceasedLastNameMl}};
    return { ...filteredData, ...currentValue };
  };