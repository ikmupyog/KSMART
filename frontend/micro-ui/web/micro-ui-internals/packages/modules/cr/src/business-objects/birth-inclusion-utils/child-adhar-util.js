import moment from 'moment';

export const getFilteredChildAdharData = (selectedData, inclusionData) => {
  let filteredData = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let currentValue = {curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY")}
  return {...filteredData,...currentValue};
};
