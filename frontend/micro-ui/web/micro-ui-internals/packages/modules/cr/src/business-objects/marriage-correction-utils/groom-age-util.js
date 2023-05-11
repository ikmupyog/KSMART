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
    const groomDOB = {
      dob: groomDetails?.groomDOB,
      age: groomDetails?.groomAge,
    }
    return groomDOB;
  };
  
  const computeCurrentValue = (groomDetails) => {
    const groomDOBAge = {
      dob: groomDetails && moment(groomDetails?.groomDOB).format("DD/MM/YYYY"),
      age: groomDetails?.groomAge,
    }
    return groomDOBAge;
  };
  
  
  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    return {documentData:filteredData, docFlag: "GROOM_AGE"}; 
  };