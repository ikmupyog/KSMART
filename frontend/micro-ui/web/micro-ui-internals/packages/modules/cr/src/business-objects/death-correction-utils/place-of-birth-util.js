export const getFilteredDeceasedPlaceOfDeath = (selectedData, correctionData, places) => {
  let filteredDocuments = getFilteredDocuments(selectedData,correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData?.InformationDeath?.DeathPlace, places);
  const computedInitialValue = computeInitialValue(selectedData?.InformationDeath?.DeathPlace, places);
  let selectedDodObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
    return { ...selectedDodObj };
  };
//TODO need validation to check dob is null
const computeInitialValue = (placeOfDeath, placeArray) => {
  const initialValue = placeArray?.find((item) => item.code === placeOfDeath);
  return initialValue;
};

const computeCurrentValue = (placeOfDeath, placeArray) => {
  const currentValue =  placeArray?.find((item) => item.code === placeOfDeath);
  return currentValue;
};


const getFilteredDocuments = (selectedData,correctionData) => {
  let filteredData  = {};
  if (selectedData?.InformationDeath?.DeathPlace === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "POD_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "POD_NON_INSTITUTIONAL");
  }
  return filteredData;
};
