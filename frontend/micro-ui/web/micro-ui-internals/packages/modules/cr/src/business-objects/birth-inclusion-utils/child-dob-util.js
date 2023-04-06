import moment from "moment";

export const getFilteredChildDobData = (selectedData, inclusionData) => {
  console.log("selectedData==dob", selectedData);
  let filteredDocuments = getFilteredDocuments(selectedData, inclusionData);
  const computedCurrentValue = computeCurrentValue(selectedData?.dateofbirth);
  const computedInitialValue = computeInitialValue(selectedData?.dateofbirth);
  console.log("c==omputedInitialValue",computedInitialValue);
  let selectedDobObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDobObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (dob) => {
  console.log("initial value---",dob);
  const initialValue = dob;

  return initialValue;
};

const computeCurrentValue = (dob) => {
  const currentValue = dob && moment(dob).format("DD/MM/YYYY");

  return currentValue;
};

const getFilteredDocuments = (selectedData, inclusionData) => {
  let filteredData = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  return filteredData;
};
