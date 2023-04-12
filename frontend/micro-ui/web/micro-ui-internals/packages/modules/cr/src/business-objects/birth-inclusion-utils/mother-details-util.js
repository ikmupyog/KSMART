import moment from "moment";

export const getFilteredMotherData = (selectedData, inclusionData) => {
  console.log("selectedData==dob", selectedData);
  let filteredDocuments = getFilteredDocuments(inclusionData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  const computedInitialValue = computeInitialValue(selectedData);
  console.log("c==omputedInitialValue",computedInitialValue);
  let selectedDobObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    docFlag: null,
    // onDobchange: (field,data,dataObj) => _onDobchange(field,data,dataObj),
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDobObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (data) => {
  console.log("initial value---",data);
  const initialValue = {
    motherNameEn: data?.registerBirthMother?.firstname_en,
    motherNameMl: data?.registerBirthMother?.firstname_ml,
    motherAdhar: data?.registerBirthMother?.aadharno
  };

  return initialValue;
};

const computeCurrentValue = (data) => {
  const currentValue = {
    motherNameEn: data?.registerBirthMother?.firstname_en,
    motherNameMl: data?.registerBirthMother?.firstname_ml,
    motherAdhar: data?.registerBirthMother?.aadharno
  };
  return currentValue;
};

const getFilteredDocuments = (inclusionData) => {
  let filteredData = inclusionData;
  return {documentData:filteredData,docFlag: "MOTHER_DETAILS"};
};
