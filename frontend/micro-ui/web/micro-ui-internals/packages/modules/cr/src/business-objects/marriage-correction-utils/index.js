import { getFilteredMarriageDOMData } from './marriage-dom-util';
import  { getFilteredMarriagePlaceWardData } from './marriage-place-ward-util';
import { getFilteredMarriagePlaceTypeData } from './marriage-place-type-util';
import { getFilteredGroomNameData } from './groom-name-util';
import { getFilteredGroomFatherNameData } from './groom-father-name-util';
import { getFilteredGroomMotherNameData } from './groom-mother-name-util';
import { getFilteredGroomGuardianNameData } from './groom-guardian-name-util';
import { getFilteredGroomDOBData } from './groom-dob-util';
import { getFilteredGroomAgeData } from './groom-age-util';
import { getFilteredBrideNameData } from './bride-name-util';
import { getFilteredBrideFatherNameData } from './bride-father-name-util';
import { getFilteredBrideMotherNameData } from './bride-mother-name-util';
import { getFilteredBrideGuardianNameData } from './bride-guardian-name-util';
import { getFilteredBrideAgeData } from './bride-age-util';
import { getFilteredBrideDOBData } from './bride-dob-util';
import { getFilteredMarriagePlaceNameData } from './marriage-place-name-util';


export const getFilteredChildNameData = (selectedData, inclusionData) =>{
    let filteredData = {};
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

  export { 
    getFilteredMarriageDOMData,
    getFilteredMarriagePlaceWardData,
    getFilteredMarriagePlaceTypeData,
    getFilteredGroomNameData,
    getFilteredGroomFatherNameData,
    getFilteredGroomMotherNameData,
    getFilteredGroomGuardianNameData, 
    getFilteredGroomDOBData,
    getFilteredGroomAgeData,
    getFilteredBrideNameData,
    getFilteredBrideFatherNameData,
    getFilteredBrideMotherNameData,
    getFilteredBrideGuardianNameData,
    getFilteredBrideAgeData,
    getFilteredBrideDOBData,
    getFilteredMarriagePlaceNameData,
  };