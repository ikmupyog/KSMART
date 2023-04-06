import moment from "moment";

export const getFilteredChildDobData = (selectedData, inclusionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
  const computedValue = computeInitialValue(selectedData?.dateofbirth);
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
const computeInitialValue = (dob) => {
  const initialValue = dob && moment(dob).format("DD/MM/YYYY");
  return initialValue;
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



// import moment from "moment";

// export const getFilteredChildDobData = (selectedData, correctionData) => {
//   console.log("selectedData==123", selectedData, correctionData);
//   let filteredData = {};
//   if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
//     filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
//   } else {
//     filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
//   }
//   //TODO need validation to check dob is null
//   let childDobObj = {
//     curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY"),
//     // changeCurValue: (value,data)=> _changeCurValue(value,data)
//   };
//   let currentValue = { curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY") };
//   return { ...filteredData, ...currentValue };
// };

// const _changeCurValue = (value,data) =>{
//   return()
// }
