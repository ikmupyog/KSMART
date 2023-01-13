import { TLService } from "../../elements/TL";

const ApplicationUpdateActions = async (applicationData, tenantId ,pdewsupdate=false) => {
  try {
    if(!pdewsupdate){
      const response = await TLService.update(applicationData, tenantId);
      return response;
    }else{
      const response = await TLService.updatepdewf(applicationData, tenantId);
      return response;
    }
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationUpdateActions;
