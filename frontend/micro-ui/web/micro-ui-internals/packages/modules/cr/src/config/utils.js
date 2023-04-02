import { BIRTH_INCLUSION } from "../config/constants";
import { getFilteredChildDobData,getFilteredChildNameData,getFilteredChildSexData } from "../config/birth-inclusion-utils";

export const   getFormattedBirthInclusionData = (field_id, selectedData,birthInclusionData) => {
    
    const filteredData = birthInclusionData.filter((item)=> item.CorrectionField === field_id);
  let inclusionsDocsData = birthInclusionFilterFieldsObj[field_id]?.(selectedData,filteredData);
  return inclusionsDocsData;
};

export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: (data,inclusionData)=>getFilteredChildDobData(data,inclusionData),
  CHILD_NAME: (data,inclusionData)=>getFilteredChildNameData(data,inclusionData),
  CHILD_SEX: (data,inclusionData)=>getFilteredChildSexData(data,inclusionData),
};
