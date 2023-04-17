import moment from "moment";
export const getFilteredGroomAgeData = (selectedData, inclusionData) => {
    let filteredDocuments = getFilteredDocuments(inclusionData);
    const computedInitialValue = computeInitialValue(selectedData?.GroomDetails);
    const computedCurrentValue = computeCurrentValue(selectedData?.GroomDetails);
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
  const computeInitialValue = (groomDetails) => {
    const groomDOBAge = {
      dob: groomDetails && moment(groomDetails?.groomDOB).format("DD/MM/YYYY"),
      age: groomDetails && moment(groomDetails?.groomAge),
    }
    return groomDOBAge;
  };
  
  const computeCurrentValue = (groomDetails) => {
    const groomDOBAge = {
      dob: groomDetails && moment(groomDetails?.groomDOB).format("DD/MM/YYYY"),
      age: groomDetails && moment(groomDetails?.groomAge),
    }
    return groomDOBAge;
  };
  
  
  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    console.log("filtered data ===", filteredData);
    return {documentData:filteredData, docFlag: "GROOM_AGE"}; 
  };