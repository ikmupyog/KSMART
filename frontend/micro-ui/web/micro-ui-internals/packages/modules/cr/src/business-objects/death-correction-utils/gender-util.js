export const getFilteredDeceasedGender = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,correctionData);
  const computedValue = computeInitialValue(selectedData?.InformationDeath?.DeceasedGender);
  let selectedDodObj = {
    initialValue: computedValue,
    curValue: computedValue,
    isDisabled: true,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDodObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (gender) => {
  const initialValue = gender;
  return initialValue;
};

const getFilteredDocuments = (selectedData,correctionData) => {
  let filteredData  = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  return filteredData;
};
