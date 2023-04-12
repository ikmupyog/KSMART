export const getFilteredMarriagePlaceTypeData = (selectedData, inclusionData, cmbPlace) => {
  let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
  // const computedValue = computeInitialValue(selectedData?.marriagePlacetype);
  const computedInitialValue = computeInitialValue(selectedData?.marriagePlacetype, cmbPlace);
  const computedCurrentValue = computeCurrentValue(selectedData?.marriagePlacetype, cmbPlace);
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
// const computeInitialValue = (place) => {
//   const initialValue = place;
//   return initialValue;
//   return {firstName:"sdsa",middleNmae:"dsasd",lastNma:'"d'};
// };

const computeInitialValue = (marriagePlace, placeArray) => {
  const initialValue = placeArray.find((item) => item.code === marriagePlace);
  return initialValue;
};

const computeCurrentValue = (marriagePlace, placeArray) => {
  const currentValue = placeArray.find((item) => item.code === marriagePlace);
  return currentValue;
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