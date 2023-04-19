export const getFilteredBrideAddressData = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  const computedInitialValue = computeInitialValue(selectedData);
  let selectedDodObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    isDisable: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDodObj };
};


//TODO need validation to check dob is null


const computeInitialValue = (data) => {
  console.log("data ===>", data);
  const initialValue = {
    houseNameEn: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn, 
    houseNameMl: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl, 
    localityNameEn: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn,
    localityNameMl: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl,
    streetNameEn: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn,
    streetNameMl: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl,
  };
  return initialValue;
};
const computeCurrentValue = (data) => {
  const currentValue = {
    houseNameEn: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn, 
    houseNameMl: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl, 
    localityNameEn: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn,
    localityNameMl: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl,
    streetNameEn: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn,
    streetNameMl: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl,
  };
  return currentValue;
};


const getFilteredDocuments = (correctionData) => {
  let filteredData  = correctionData;
  return {documentData:filteredData, docFlag: "BRIDE_PERADD"};
};



