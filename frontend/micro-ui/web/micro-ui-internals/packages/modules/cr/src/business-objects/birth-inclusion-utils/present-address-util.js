import moment from "moment";
import {BIRTH_INCLUSION_FIELD_NAMES} from "../../config/constants";

export const getFilteredPresentAddressData = (selectedData, inclusionData) => {
  console.log("selectedData==dob", selectedData);
  let filteredDocuments = getFilteredDocuments(selectedData, inclusionData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  const computedInitialValue = computeInitialValue(selectedData);
  console.log("c==omputedInitialValue",computedInitialValue);
  let selectedDobObj = {
    fieldName: BIRTH_INCLUSION_FIELD_NAMES.PRESENT_ADDRESS,
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
  console.log("initial value---",data);
  const initialValue = {
    houseNameEn: data?.registerBirthPresent?.housename_en,
    houseNameMl: data?.registerBirthPresent?.housename_ml,
    localityEn: data?.registerBirthPresent?.locality_en,
    localityMl: data?.registerBirthPresent?.locality_ml,
    streetEn: data?.registerBirthPresent?.street_name_en,
    streetMl: data?.registerBirthPresent?.street_name_ml,
  };

  return initialValue;
};

const computeCurrentValue = (data) => {
  const currentValue = {
    houseNameEn: data?.registerBirthPresent?.housename_en,
    houseNameMl: data?.registerBirthPresent?.housename_ml,
    localityEn: data?.registerBirthPresent?.locality_en,
    localityMl: data?.registerBirthPresent?.locality_ml,
    streetEn: data?.registerBirthPresent?.street_name_en,
    streetMl: data?.registerBirthPresent?.street_name_ml,
  };
  return currentValue;
};

const getFilteredDocuments = (selectedData, inclusionData) => {
  let filteredData = inclusionData;
 
  console.log("dob filter==",filteredData);
  return {documentData:filteredData,docFlag: "PRESENT_ADDRESS"};
};
