import moment from "moment";

export const getFilteredChildNameData = (selectedData, inclusionData) => {
  console.log("selected name==", selectedData);
  let filteredDocuments = getFilteredDocuments(selectedData, inclusionData);
  console.log("filtererd docs==", filteredDocuments);
  const computedInitialValue = computeInitialValue(selectedData);
  const computedCurrentValue = computeCurrentValue(selectedData);
  let selectedDobObj = {
    initialValue: computedInitialValue,
    curValue: computedCurrentValue,
    isDisabled: true,
    isEditable: false,
    isFocused: false,
    ...filteredDocuments,
  };
  return {...selectedDobObj };
};

//TODO need validation to check dob is null
const computeInitialValue = (data) => {
  const initialValue = {
    firstNameEn: data?.firstname_en,
    middleNameEn: data?.middlename_en,
    lastNameEn: data?.lastname_en,
    firstNameMl: data?.firstname_ml,
    middleNameMl: data?.middlename_ml,
    lastNameMl: data?.lastname_ml,
  };
  return initialValue;
};

const computeCurrentValue = (data) => {
  const currentValue = {
    firstNameEn: data?.firstname_en,
    middleNameEn: data?.middlename_en,
    lastNameEn: data?.lastname_en,
    firstNameMl: data?.firstname_ml,
    middleNameMl: data?.middlename_ml,
    lastNameMl: data?.lastname_ml,
  };
  return currentValue;
};

const getFilteredDocuments = (selectedData, inclusionData) => {
  console.log("SELECTED DATA OBJ===",selectedData);
  let filteredData = [];
  let docFlag = "";
  const childAge = selectedData?.dateofbirth && moment().diff(moment(selectedData?.dateofbirth), "years");
  if (childAge >= 0 && childAge <= 6) {
    filteredData =  inclusionData?.filter((item) => item.conditionCode === "NAME_INCLUSION_LESS_THAN_SIX");
  } else if (childAge > 6 )  {
    filteredData = inclusionData?.filter((item) => {
      if(item.conditionCode === "NAME_INCLUSION_GREATER_THAN_SIX_STUDENT" 
      || item.conditionCode === "NAME_INCLUSION_GREATER_THAN_SIX_NON_STUDENT"
      || item.conditionCode === "NAME_CORRECTION_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE"
      || item.conditionCode === "NAME_CHANGE_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE"
      || item.conditionCode === "NAME_INCLUSION_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE"
      || item.conditionCode === "AGE_MAJOR_CORRECTION"
      || item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION"){
        return item;
      }
    });
    docFlag = "CHILD_NAME_CHANGE";
  }
  //  else if (childAge < 15) {
  //   filteredData = inclusionData?.filter((item) => item.conditionCode === "NAME_INCLUSION_GREATER_THAN_SIX_STUDENT");
  // } else if (childAge > 15) {
  //   filteredData = inclusionData?.filter((item) => item.conditionCode === "NAME_INCLUSION_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE");
  // } else if (childAge >= 6 && childAge <= 18) {
  //   filteredData = inclusionData?.filter((item) => {
  //     if (item.conditionCode === "NAME_INCLUSION_GREATER_THAN_SIX_NON_STUDENT" || item.conditionCode === "NAME_INCLUSION_GREATER_THAN_SIX_STUDENT") {
  //       return item;
  //     }
  //   });
  //   docFlag = "STUDENT_CHANGE";
  // } else if (childAge >= 6 && childAge <= 18) {
  //   filteredData = inclusionData?.filter((item) => {
  //     if (item.conditionCode === "NAME_INCLUSION_GREATER_THAN_SIX_NON_STUDENT" || item.conditionCode === "NAME_INCLUSION_GREATER_THAN_SIX_STUDENT") {
  //       return item;
  //     }
  //   });
  //   docFlag = "STUDENT_CHANGE";
  // } else if (childAge == 0) {
  //   filteredData = inclusionData?.filter((item) => {
  //     if (
  //       item.conditionCode === "NAME_CORRECTION_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE" ||
  //       item.conditionCode === "NAME_CHANGE_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE"
  //     ) {
  //       return item;
  //     }
  //   });
  //   docFlag = "NAME_CORRECTION_CHANGE";
  // } else if (childAge >= 18) {
  //   filteredData = inclusionData?.filter((item) => {
  //     if (item.conditionCode === "AGE_MAJOR_CORRECTION" || item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION") {
  //       return item;
  //     }
  //   });
  //   docFlag = "AGE_CORRECTION_CHANGE";
  // }
  return { documentData:filteredData, docFlag };
};
