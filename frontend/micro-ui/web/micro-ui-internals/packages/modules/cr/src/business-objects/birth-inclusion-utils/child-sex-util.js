import moment from "moment";
import {BIRTH_INCLUSION_FIELD_NAMES} from "../../config/constants";

export const getFilteredChildSexData = (selectedData, inclusionData, sex) => {
  console.log("selected name==in sex--", selectedData, sex);
  let filteredDocuments = getFilteredDocuments(selectedData, inclusionData);
  console.log("filtererd docs==", filteredDocuments);
  const computedInitialValue = computeInitialValue(selectedData?.gender, sex);
  const computedCurrentValue = computeCurrentValue(selectedData?.gender, sex);
  let selectedDobObj = {
    fieldName: BIRTH_INCLUSION_FIELD_NAMES.CHILD_SEX,
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
  const initialValue = sexArray?.find((item) => item.code === gender);
  return initialValue;
};

const computeCurrentValue = (gender, sexArray) => {
  const currentValue = sexArray?.find((item) => item.code === gender);
  return currentValue;
};

const getFilteredDocuments = (selectedData, inclusionData) => {
  let filteredData = [];
  let docFlag = "";
  const childAge = selectedData?.dateofbirth && moment().diff(moment(selectedData?.dateofbirth), "years");
  const birthPlace = selectedData?.registerBirthPlace?.placeofbirthid ; 
  console.log("childAge==", childAge,selectedData?.registerBirthPlace?.placeofbirthid,birthPlace);
  if (childAge >= 0 && childAge <= 17 && birthPlace === "HOSPITAL") {
    filteredData = inclusionData?.filter((item) => {
      if (
        item.conditionCode === "INSTITUTIONAL_SEX_CORRECTION_MINOR" ||
        item.conditionCode === "INSTITUTIONAL_SEX_CHAGE_MINOR" 
      ) {
        return item;
      }
    });
    docFlag = "INSTITUTIONAL_SEX_CHANGE";
  } else if (childAge >= 0 && childAge <= 17 && birthPlace !== "HOSPITAL") {
    filteredData = inclusionData?.filter((item) => {
      if (
        item.conditionCode === "NON_INSTITUTIONAL_SEX_CORRECTION_MINOR" ||
        item.conditionCode === "NON_INSTITUTIONAL_SEX_CHAGE_MINOR"
      ) {
        return item;
      }
    });
    docFlag = "NON_INSTITUTIONAL_SEX_CHANGE_MINOR";
  }
   else if (childAge >= 18 && birthPlace !== "HOSPITAL") {
    filteredData = inclusionData?.filter((item) => {
      if (item.conditionCode === "NON_INSTITUTIONAL_SEX_CORRECTION_MAJOR" || item.conditionCode === "NON_INSTITUTIONAL_SEX_CHANGE_MAJOR") {
        return item;
      }
    });
    docFlag = "NON_INSTITUTIONAL_SEX_CHANGE_MAJOR";
  }

  return { documentData: filteredData, docFlag };
};
