import { CRService } from "../../elements/CR";

const AdoptionAppUpdateAction = async (applicationData, tenantId) => {
  // console.log('tmp1',applicationData); 
  
  let tmpApplnData = applicationData
  if(tmpApplnData?.Property?.workflow){
    tmpApplnData.Property.action = tmpApplnData?.Property?.workflow?.action
    tmpApplnData.Property.assignee = tmpApplnData?.Property?.workflow?.assignes?.length>0?tmpApplnData.Property?.workflow?.assignes[0]?.uuid ? [tmpApplnData.Property?.workflow?.assignes[0]?.uuid]:null:null
    tmpApplnData.Property.businessservice = tmpApplnData?.Property?.workflow?.businessService
    tmpApplnData.Property.comments = tmpApplnData?.Property?.workflow?.comments
    tmpApplnData.Property.moduleName = tmpApplnData?.Property?.workflow?.moduleName
  }
 
  if(tmpApplnData.Property['workflow']){
    delete tmpApplnData.Property['workflow']
  }
  // delete tmpApplnData.Property['action']
  if([tmpApplnData['Property']]){
    tmpApplnData['AdoptionDetails'] = [tmpApplnData['Property']];
    delete tmpApplnData['Property'];
  }
  
 console.log('tmp2', tmpApplnData); 
  try {
    const response = await CRService.updateAdoption(tmpApplnData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default AdoptionAppUpdateAction;