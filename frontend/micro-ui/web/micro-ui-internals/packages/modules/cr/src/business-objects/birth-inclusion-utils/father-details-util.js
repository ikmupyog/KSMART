import moment from "moment";

export const getFilteredFatherData = (selectedData, inclusionData) => {
 
  let filteredDocuments = getFilteredDocuments(inclusionData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  const computedInitialValue = computeInitialValue(selectedData);
  console.log("c==omputedInitialValue",computedInitialValue);
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
const computeInitialValue = (data) => {
  const initialValue = {
    fatherNameEn: data?.registerBirthFather?.firstname_en,
    fatherNameMl: data?.registerBirthFather?.firstname_ml,
    fatherAdhar: data?.registerBirthFather?.aadharno
  };

  return initialValue;
};

const computeCurrentValue = (data) => {
  const currentValue = {
    fatherNameEn: data?.registerBirthFather?.firstname_en,
    fatherNameMl: data?.registerBirthFather?.firstname_ml,
    fatherAdhar: data?.registerBirthFather?.aadharno
  };
  return currentValue;
};

const getFilteredDocuments = ( inclusionData) => {
  let filteredData = inclusionData;
  return {documentData:filteredData,docFlag: "FATHER_DETAILS"};
};
