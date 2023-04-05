export const getFilteredDeceasedFathersName = (selectedData, correctionData) => {
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DateofDeath && moment(selectedData?.InformationDeath?.DateofDeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {fathersNameEn: selectedData?.FamilyInformationDeath?.FatherNameEn, fathersNameMl: selectedData?.FamilyInformationDeath?.FatherNameMl}};
    return { ...filteredData, ...currentValue };
  };