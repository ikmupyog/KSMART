import moment from "moment";

export const getFilteredMarriageDOMData = (selectedData, inclusionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
  const computedInitialValue = computeInitialValue(selectedData?.marriageDOM);
  const computedCurrentValue = computeCurrentValue(selectedData?.marriageDOM);
  let selectedDomObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    isDisable: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDomObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (dom) => {
  const initialValue = dom;
  return initialValue;
};

const computeCurrentValue = (dom) => {
  const initialValue = dom && moment(dom).format("DD/MM/YYYY");
  return initialValue;
};

const getFilteredDocuments = (selectedData,inclusionData) => {
  let filteredData  = {};
  if (selectedData?.marriagePlacetype === "MANDAPAM_HALL_AND_OTHER") {
    filteredData = inclusionData?.filter((item) => item.conditionCode === "MANDAPAM_HALL_AND_OTHER");
  } else {
    filteredData = inclusionData?.filter((item) => item.conditionCode === "RELIGIOUS_INSTITUTION");
  }
  console.log("filtered data", filteredData);
  return {documentData:filteredData, docFlag: "DOM"};
};