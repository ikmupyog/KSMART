import moment from "moment";

export const getFilteredChildSexData = (selectedData, inclusionData, sex) => {
  console.log("selected name==", selectedData, sex);
  let filteredDocuments = getFilteredDocuments(selectedData, inclusionData);
  console.log("filtererd docs==", filteredDocuments);
  const computedInitialValue = computeInitialValue(selectedData?.gender, sex);
  const computedCurrentValue = computeCurrentValue(selectedData?.gender, sex);
  let selectedDobObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return { ...selectedDobObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (gender, sexArray) => {
  const initialValue = sexArray.find((item) => item.code === gender);
  return initialValue;
};

const computeCurrentValue = (gender, sexArray) => {
  const currentValue = sexArray.find((item) => item.code === gender);
  return currentValue;
};

const getFilteredDocuments = (selectedData, inclusionData) => {
  let filteredData = [];
  let docFlag = "";
  const childAge = selectedData?.dateofbirth && moment().diff(moment(selectedData?.dateofbirth), "years");
  console.log("childAge==", childAge);
  if (childAge >= 0 && childAge <= 17) {
    filteredData = inclusionData?.filter((item) => {
      if (
        item.conditionCode === "INSTITUTIONAL_SEX_CORRECTION_MINOR" ||
        item.conditionCode === "INSTITUTIONAL_SEX_CHAGE_MINOR" ||
        item.conditionCode === "NON_INSTITUTIONAL_SEX_CORRECTION_MINOR" ||
        item.conditionCode === "NON_INSTITUTIONAL_SEX_CHAGE_MAJOR"
      ) {
        return item;
      }
    });
    docFlag = "SEX_CHANGE";
  } else if (childAge >= 18) {
    filteredData = inclusionData?.filter((item) => {
      if (item.conditionCode === "NON_INSTITUTIONAL_SEX_CORRECTION_MAJOR" || item.conditionCode === "NON_INSTITUTIONAL_SEX_CORRECTION_MAJOR") {
        return item;
      }
    });
    docFlag = "NON_INSTITUTIONAL_SEX_CHANGE";
  }

  return { documentData: filteredData, docFlag };
};
