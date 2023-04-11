import moment from "moment";

export const getFilteredChildAdharData = (selectedData, inclusionData) => {
  console.log("selectedData==dob", selectedData);
  let filteredDocuments = getFilteredDocuments(selectedData, inclusionData);
  const computedCurrentValue = computeCurrentValue(selectedData?.aadharno);
  const computedInitialValue = computeInitialValue(selectedData?.aadharno);
  console.log("c==omputedInitialValue", computedInitialValue);
  let selectedDobObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    docFlag: null,
    // onDobchange: (field,data,dataObj) => _onDobchange(field,data,dataObj),
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDobObj };
};

// _onDobchange = (field,data,dataObj = {}) =>{
//   const tempData = {...dataObj}
//   if(tempData){
//     tempData[field]?.curValue = data;
//   }
//    return tempData
// }

//TODO need validation to check dob is null
const computeInitialValue = (aadharNo) => {
  console.log("initial value---", aadharNo);
  const initialValue = aadharNo;

  return initialValue;
};

const computeCurrentValue = (aadharNo) => {
  const currentValue = aadharNo;
  return currentValue;
};

const getFilteredDocuments = (selectedData, inclusionData) => {
  let filteredData = [];
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.filter((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.filter((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  return { documentData: filteredData };
};
