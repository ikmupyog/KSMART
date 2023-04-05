export const getFilteredDeceasedGender = (selectedData, correctionData) => {
  let filteredData = {};
  if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let currentValue = { curValue: selectedData?.InformationDeath?.DeceasedGender };
  return { ...filteredData, ...currentValue };
};
