export const getFilteredBrideAddressData = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  const computedInitialValue = computeInitialValue(selectedData);
  const computedAddressTYpe = getAddressType(selectedData.BrideAddressDetails);
  let selectedDodObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    addressType: computedAddressTYpe,
    isDisable: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDodObj };
};


//TODO need validation to check dob is null
const getAddressType = (details) => {
  let addressType = "";
  if (details.permtaddressCountry === "COUNTRY_INDIA") {
    if (details.permtaddressStateName === "kl") {
      addressType = "insideKerala";
    } else {
      addressType = "outsideKerala";
    }
  } else {
    addressType = "outsideIndia";
  }
  return addressType;
};

const computeInitialValue = (data) => {
  let initialValue = {};
  if (data.BrideAddressDetails.permtaddressCountry !== "COUNTRY_INDIA") {
    initialValue = {
      addressLine1En: data?.BrideAddressDetails?.permntOutsideIndiaLineoneEn,
      addressLine1Ml: data?.BrideAddressDetails?.permntOutsideIndiaLineoneMl,
      addressLine2En: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn,
      addressLine2Ml: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl,
    };
  } else if (data.BrideAddressDetails.permtaddressStateName === "kl") {
    initialValue = {
      houseNameEn: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn,
      houseNameMl: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl,
      localityNameEn: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn,
      localityNameMl: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl,
      streetNameEn: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn,
      streetNameMl: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl,
    };
  } else {
    initialValue = {
      houseNameEn: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn,
      houseNameMl: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl,
      localityNameEn: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn,
      localityNameMl: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl,
      streetNameEn: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn,
      streetNameMl: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl,
    };
  }

  return initialValue;
};
const computeCurrentValue = (data) => {
  let currentValue = {};
  if (data.BrideAddressDetails.permtaddressCountry !== "COUNTRY_INDIA") {
    currentValue = {
      addressLine1En: data?.BrideAddressDetails?.permntOutsideIndiaLineoneEn,
      addressLine1Ml: data?.BrideAddressDetails?.permntOutsideIndiaLineoneMl,
      addressLine2En: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn,
      addressLine2Ml: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl,
    };
  } else if (data.BrideAddressDetails.permtaddressStateName === "kl") {
    currentValue = {
      houseNameEn: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn,
      houseNameMl: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl,
      localityNameEn: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn,
      localityNameMl: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl,
      streetNameEn: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn,
      streetNameMl: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl,
    };
  } else {
    currentValue = {
      houseNameEn: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn,
      houseNameMl: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl,
      localityNameEn: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn,
      localityNameMl: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl,
      streetNameEn: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn,
      streetNameMl: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl,
    };
  }
  return currentValue;
};

const getFilteredDocuments = (correctionData) => {
  let filteredData  = correctionData;
  return {documentData:filteredData, docFlag: "BRIDE_PERADD"};
};



