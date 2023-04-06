export const getFilteredDeceasedAddressEn = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData,correctionData);
  const computedValue = computeInitialValue({houseNameEn: selectedData?.AddressBirthDetails?.PermanentAddrHoueNameEn, 
    localityNameEn: selectedData?.AddressBirthDetails?.PermanentAddrLocalityEn,
    streetNameEn: selectedData?.AddressBirthDetails?.PermanentAddrStreetNameEn,
  });
  let selectedDodObj = {
    initialValue: computedValue,
    curValue: computedValue,
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDodObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (addressEn) => {
  const initialValue = addressEn;
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
