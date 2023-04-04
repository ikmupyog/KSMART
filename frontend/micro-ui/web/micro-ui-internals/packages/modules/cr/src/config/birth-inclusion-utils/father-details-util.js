import moment from 'moment'

export const getFatherDetailsbData = (selectedData, inclusionData) => {
  console.log("selectedData==123", selectedData, inclusionData);
  let filteredData = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let childDobObj = {
    curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY"),
    // changeCurValue: (value,data)=> _changeCurValue(value,data)
  };
  let currentValue = { curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY") };
  return { ...filteredData, ...currentValue };
};

// const _changeCurValue = (value,data) =>{
//   return()
// }
