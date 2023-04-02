export const getFilteredChildNameData = (selectedData, inclusionData) =>{
    let filteredData = {};
    console.log("filteredData==",selectedData, inclusionData);
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "LESS_THAN_SIX");
  } else if(selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_NON_STUDENT");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_STUDENT");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE_CORRECTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  }
  let currentValue = {curValue: {firstName: selectedData?.firstname_en ,middleName: selectedData?.middlename_en,lastName:selectedData?.lastname_en}}
  return {...filteredData,...currentValue};
}