 export const getFilteredDeceasedNameData = (selectedData, correctionData) => {
   let filteredDocuments = getFilteredDocuments(correctionData);
   const computedInitialValue = computeInitialValue(selectedData);
   const computedCurrentValue = computeCurrentValue(selectedData);
   let selectedDodObj = {
   initialValue: computedInitialValue,
   curValue: computedCurrentValue,
   isDisabled: true,
   isEditable: false,
   isFocused: false,
   ...filteredDocuments,
 };
   return { ...selectedDodObj };
 };
 

//TODO need validation to check dob is null
const computeInitialValue = (data) => {
 const initialValue = {
   firstNameEn: data?.InformationDeath?.DeceasedFirstNameEn,
   middleNameEn: data?.InformationDeath?.DeceasedMiddleNameEn,
   lastNameEn:data?.InformationDeath?.DeceasedLastNameEn,
   firstNameMl: data?.InformationDeath?.DeceasedFirstNameMl,
   middleNameMl: data?.InformationDeath?.DeceasedMiddleNameMl,
   lastNameMl:data?.InformationDeath?.DeceasedLastNameMl
 };
 return initialValue;
};

const computeCurrentValue = (data) => {
 const currentValue = {
  firstNameEn: data?.InformationDeath?.DeceasedFirstNameEn,
   middleNameEn: data?.InformationDeath?.DeceasedMiddleNameEn,
   lastNameEn:data?.InformationDeath?.DeceasedLastNameEn,
   firstNameMl: data?.InformationDeath?.DeceasedFirstNameMl,
   middleNameMl: data?.InformationDeath?.DeceasedMiddleNameMl,
   lastNameMl:data?.InformationDeath?.DeceasedLastNameMl
 };
 return currentValue;
};
 
 const getFilteredDocuments = (correctionData) => {
   let filteredData  = correctionData[0];
   return filteredData;
 };
 