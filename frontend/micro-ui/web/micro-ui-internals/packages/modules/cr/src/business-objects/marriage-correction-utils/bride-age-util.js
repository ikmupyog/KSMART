import moment from "moment";
export const getFilteredBrideAgeData = (selectedData, inclusionData) => {
    let filteredDocuments = getFilteredDocuments(inclusionData);
    const computedInitialValue = computeInitialValue(selectedData?.BrideDetails);
    const computedCurrentValue = computeCurrentValue(selectedData?.BrideDetails);
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
  const computeInitialValue = (brideDetails) => {
    const brideDOB = {
      dob: brideDetails?.brideDOB,
      age: brideDetails?.brideAge,
    }
    return brideDOB;
  };
  
  const computeCurrentValue = (brideDetails) => {
    const brideDOBAge = {
      dob: brideDetails && moment(brideDetails?.brideDOB).format("DD/MM/YYYY"),
      age: brideDetails?.brideAge,
    }
    return brideDOBAge;
  };
  
  
  const getFilteredDocuments = (inclusionData) => {
    let filteredData  = inclusionData;
    return {documentData:filteredData, docFlag: "BRIDE_AGE"}; 
  };