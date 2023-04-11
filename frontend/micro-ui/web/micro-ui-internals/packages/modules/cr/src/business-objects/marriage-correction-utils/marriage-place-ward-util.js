export const getFilteredMarriagePlaceWardData = (selectedData, inclusionData, wards) => {

    let filteredDocuments = getFilteredDocuments(selectedData,inclusionData);
    const computedValue = computeInitialValue(selectedData?.marriageWardCode, wards);
    let selectedDomObj = {
      initialValue: computedValue,
      curValue: computedValue,
      isDisable: true,
      isEditable: false,
      isFocused: false,
      ...filteredDocuments,
    };
    return { ...selectedDomObj };
  };
  
  //TODO need validation to check dob is null
  const computeInitialValue = (wardCode,wards) => {
    // marriageCorrectionFormsObj?.marriageWardCode ? cmbWardNoFinal.filter(cmbWardNo=> cmbWardNo.code === marriageCorrectionFormsObj?.marriageWardCode[0]):""
    const initialValue = wards && wards.find((item)=> item.code === wardCode);
    console.log("wards==",wards,initialValue,wardCode);
    return wardCode;
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