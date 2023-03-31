import { CRService } from "../../elements/CR";

const AdoptionAppUpdateAction = async (applicationData, tenantId) => {
  console.log(applicationData); 
  let tmpApplnData = applicationData
  tmpApplnData['AdoptionDetails'] = [tmpApplnData['Property']];
  delete tmpApplnData['Property'];
  // console.log('tmp',tmpApplnData);
  try {
    const response = await CRService.updateAdoption(tmpApplnData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default AdoptionAppUpdateAction;