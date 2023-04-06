import moment from 'moment';

export const getFilteredChildAdharData = (selectedData, correctionData) => {
  console.log("selectedData==123",selectedData,correctionData);
  let filteredData = {};
  if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let currentValue = {curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY")}
  return {...filteredData,...currentValue};
};
