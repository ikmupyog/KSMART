import moment from "moment";

export const getFilteredChildNameData = (selectedData, inclusionData) => {
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
    filteredData = inclusionData?.find((item) => item.conditionCode === "LESS_THAN_SIX");
  } else if (selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_NON_STUDENT");
  } else if (selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_STUDENT");
  } else if (selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE_CORRECTION");
  } else if (selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  } else if (selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  }
  return filteredData;
};
