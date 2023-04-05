import moment from "moment";

export const getFilteredChildSexData = (selectedData, inclusionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
  const computedValue = computeInitialValue(selectedData?.dateofbirth);
  let selectedDobObj = {
    initialValue: computedValue,
    curValue: computedValue,
    documentsData: filteredDocuments,
  };
  return { ...selectedDobObj };
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
