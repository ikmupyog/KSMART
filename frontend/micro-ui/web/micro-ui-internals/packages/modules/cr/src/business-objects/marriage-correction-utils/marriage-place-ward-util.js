export const getFilteredMarriagePlaceWardData = (selectedData, inclusionData, wards) => {

    let filteredDocuments = getFilteredDocuments(selectedData, inclusionData);
    // const computedValue = computeInitialValue(selectedData?.marriageWardCode, wards);
    const computedInitialValue = computeInitialValue(selectedData?.marriageWardCode, wards);
    const computedCurrentValue = computeCurrentValue(selectedData?.marriageWardCode, wards);
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
  // const computeInitialValue = (wardCode,wards) => {
  //   // marriageCorrectionFormsObj?.marriageWardCode ? cmbWardNoFinal.filter(cmbWardNo=> cmbWardNo.code === marriageCorrectionFormsObj?.marriageWardCode[0]):""
  //   const initialValue = wards && wards.find((item)=> item.code === wardCode);
  //   return wardCode;
  // };

  const computeInitialValue = (wardCode,wards) => {
    const initialValue = wards && wards.find((ward)=>(`${ward.label.toLowerCase()}-${ward.boundaryNum}`) == wardCode.trim());
    return initialValue;
  };
  
  const computeCurrentValue = (wardCode,wards) => {
    const currentValue = wards && wards.find((ward)=>(`${ward.label.toLowerCase()}-${ward.boundaryNum}`) == wardCode.trim());
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