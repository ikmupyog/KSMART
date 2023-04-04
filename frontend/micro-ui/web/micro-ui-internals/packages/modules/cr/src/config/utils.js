import { BIRTH_INCLUSION_FIELD_NAMES } from "../config/constants";
import { 
  getFilteredChildDobData,
  getFilteredChildNameData,
  getFilteredChildSexData,
} from "../config/birth-inclusion-utils";
import {   
  getFilteredDeceasedAadharData,
  getFilteredDeceasedFirstNameData,
  getFilteredDodData,
  // getFilteredDeceasedMiddleNameData
} from "../config/death-correction-utils";

export const   getFormattedBirthInclusionData = (field_id, selectedData,birthInclusionData) => {
    
    const filteredData = birthInclusionData.filter((item)=> item.CorrectionField === field_id);
  let inclusionsDocsData = birthInclusionFilterFieldsObj[field_id]?.(selectedData,filteredData);
  return inclusionsDocsData;
};
export const   getFormattedDeathCorrectionData = (field_id, selectedData,deathCorrectionData) => {
    
    const filteredData = deathCorrectionData.filter((item)=> item.CorrectionField === field_id);
  let correctionDocsData = deathCorrectionFilterFieldsObj[field_id]?.(selectedData,filteredData);
  return correctionDocsData;
};

export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: (data,inclusionData)=>getFilteredChildDobData(data,inclusionData),
  CHILD_NAME: (data,inclusionData)=>getFilteredChildNameData(data,inclusionData),
  CHILD_SEX: (data,inclusionData)=>getFilteredChildSexData(data,inclusionData),
};
export const deathCorrectionFilterFieldsObj = {
  CHILD_DOB: (data, correctionData) => getFilteredDodData(data, correctionData),
  DECEASED_AADHAR: (data, correctionData) => getFilteredDeceasedAadharData(data, correctionData),
  DECEASED_FIRST_NAME: (data, correctionData) => getFilteredDeceasedFirstNameData(data, correctionData),
  // DECEASED_MIDDLE_NAME: (data, correctionData) => getFilteredDeceasedMiddleNameData(data, correctionData),
};
