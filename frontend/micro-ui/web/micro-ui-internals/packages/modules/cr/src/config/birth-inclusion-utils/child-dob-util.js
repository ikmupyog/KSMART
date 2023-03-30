export const getFilteredChildDobData = (selectedData, inclusionData) => {
  let filteredData = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  return filteredData;
};
