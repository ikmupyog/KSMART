import { CRService } from "../../elements/CR";

const AdoptionAppUpdateAction = async (applicationData, tenantId) => {
  console.log(applicationData); 
  
  let tmpApplnData = applicationData
  tmpApplnData.Property.action = tmpApplnData.Property.workflow.action
  tmpApplnData.Property.assignee = tmpApplnData.Property.workflow.assignes
  tmpApplnData.Property.businessservice = tmpApplnData.Property.workflow.businessService
  tmpApplnData.Property.comments = tmpApplnData.Property.workflow.comments
  tmpApplnData.Property.moduleName = tmpApplnData.Property.workflow.moduleName
  delete tmpApplnData.Property['workflow']
  delete tmpApplnData.Property['action']
  tmpApplnData['AdoptionDetails'] = [tmpApplnData['Property']];
  delete tmpApplnData['Property'];
//  console.log('tmp',tmpApplnData); 
  try {
    const response = await CRService.updateAdoption(tmpApplnData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default AdoptionAppUpdateAction;