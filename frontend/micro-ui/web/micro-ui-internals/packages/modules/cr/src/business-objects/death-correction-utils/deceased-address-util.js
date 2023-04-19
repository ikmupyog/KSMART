import { DEATH_CORRECTION_FIELD_NAMES } from "../../config/constants";

export const getFilteredDeceasedAddress = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  const computedInitialValue = computeInitialValue(selectedData);
  let selectedDodObj = {
    fieldName: DEATH_CORRECTION_FIELD_NAMES.PERMANENT_ADDRESS,
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


const computeInitialValue = (data) => {
  const initialValue = {
    houseNameEn: data?.AddressBirthDetails?.PermanentAddrHoueNameEn, 
    houseNameMl: data?.AddressBirthDetails?.PermanentAddrHoueNameMl, 
    localityNameEn: data?.AddressBirthDetails?.PermanentAddrLocalityEn,
    localityNameMl: data?.AddressBirthDetails?.PermanentAddrLocalityMl,
    streetNameEn: data?.AddressBirthDetails?.PermanentAddrStreetNameEn,
    streetNameMl: data?.AddressBirthDetails?.PermanentAddrStreetNameMl,
  };
  return initialValue;
};
const computeCurrentValue = (data) => {
  const currentValue = {
    houseNameEn: data?.AddressBirthDetails?.PermanentAddrHoueNameEn, 
    houseNameMl: data?.AddressBirthDetails?.PermanentAddrHoueNameMl, 
    localityNameEn: data?.AddressBirthDetails?.PermanentAddrLocalityEn,
    localityNameMl: data?.AddressBirthDetails?.PermanentAddrLocalityMl,
    streetNameEn: data?.AddressBirthDetails?.PermanentAddrStreetNameEn,
    streetNameMl: data?.AddressBirthDetails?.PermanentAddrStreetNameMl,
  };
  return currentValue;
};


const getFilteredDocuments = (correctionData) => {
  let filteredData = correctionData[0];
  return filteredData;
};



