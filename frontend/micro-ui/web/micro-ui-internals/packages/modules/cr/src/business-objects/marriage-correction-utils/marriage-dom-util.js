import moment from "moment";

export const getFilteredMarriageDOMData = (selectedData, inclusionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
  const computedValue = computeInitialValue(selectedData?.marriageDOM);
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
const computeInitialValue = (dom) => {
  const initialValue = dom && moment(dom).format("DD/MM/YYYY");
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