export const getFilteredMarriagePlaceNameData = (selectedData, correctionData) => {
  let filteredDocuments = getFilteredDocuments(selectedData, correctionData);
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

const computeInitialValue = (data) => {
  let initialValue = {};
    initialValue = {
      houseNameEn: data?.marriageHouseNoAndNameEn,
      houseNameMl: data?.marriageHouseNoAndNameMl,
      localityNameEn: data?.marriageLocalityEn,
      localityNameMl: data?.marriageLocalityMl,
      streetNameEn: data?.marriageStreetEn,
      streetNameMl: data?.marriageStreetMl,
    };
  return initialValue;
};
const computeCurrentValue = (data) => {
  let currentValue = {};
    currentValue = {
      houseNameEn: data?.marriageHouseNoAndNameEn,
      houseNameMl: data?.marriageHouseNoAndNameMl,
      localityNameEn: data?.marriageLocalityEn,
      localityNameMl: data?.marriageLocalityMl,
      streetNameEn: data?.marriageStreetEn,
      streetNameMl: data?.marriageStreetMl,
    }; 
  return currentValue;
};

const getFilteredDocuments = (selectedData,inclusionData) => {
  let filteredData  = {};
  if (selectedData?.marriagePlacetype === "RELIGIOUS_INSTITUTION") {
    filteredData = inclusionData?.filter((item) => item.conditionCode === "RELIGIOUS_INSTITUTION");
  } else {
    filteredData = inclusionData?.filter((item) => item.conditionCode === "MANDAPAM_HALL_AND_OTHER");
  }
  return {documentData:filteredData};
};
