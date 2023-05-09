export const getFilteredGroomAddressData = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(correctionData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  const computedInitialValue = computeInitialValue(selectedData);
  const computedAddressTYpe = getAddressType(selectedData.GroomAddressDetails);
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
  if (data.GroomAddressDetails.permtaddressCountry !== "COUNTRY_INDIA") {
    initialValue = {
      addressLine1En: data?.GroomAddressDetails?.permntOutsideIndiaLineoneEn,
      addressLine1Ml: data?.GroomAddressDetails?.permntOutsideIndiaLineoneMl,
      addressLine2En: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn,
      addressLine2Ml: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl,
    };
  } else if (data.GroomAddressDetails.permtaddressStateName === "kl") {
    initialValue = {
      houseNameEn: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn,
      houseNameMl: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl,
      localityNameEn: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn,
      localityNameMl: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl,
      streetNameEn: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn,
      streetNameMl: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl,
    };
  } else {
    initialValue = {
      houseNameEn: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn,
      houseNameMl: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl,
      localityNameEn: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn,
      localityNameMl: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl,
      streetNameEn: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn,
      streetNameMl: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl,
    };
  }

  return initialValue;
};
const computeCurrentValue = (data) => {
  let currentValue = {};
  if (data.GroomAddressDetails.permtaddressCountry !== "COUNTRY_INDIA") {
    currentValue = {
      addressLine1En: data?.GroomAddressDetails?.permntOutsideIndiaLineoneEn,
      addressLine1Ml: data?.GroomAddressDetails?.permntOutsideIndiaLineoneMl,
      addressLine2En: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn,
      addressLine2Ml: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl,
    };
  } else if (data.GroomAddressDetails.permtaddressStateName === "kl") {
    currentValue = {
      houseNameEn: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn,
      houseNameMl: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl,
      localityNameEn: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn,
      localityNameMl: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl,
      streetNameEn: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn,
      streetNameMl: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl,
    };
  } else {
    currentValue = {
      houseNameEn: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn,
      houseNameMl: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl,
      localityNameEn: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn,
      localityNameMl: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl,
      streetNameEn: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn,
      streetNameMl: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl,
    };
  }
  return currentValue;
};

const getFilteredDocuments = (correctionData) => {
  let filteredData = correctionData;
  return { documentData: filteredData, docFlag: "GROOM_PERADD" };
};
