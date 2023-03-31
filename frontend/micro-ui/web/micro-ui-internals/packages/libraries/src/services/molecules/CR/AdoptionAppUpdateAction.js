import { CRService } from "../../elements/CR";

const AdoptionAppUpdateAction = async (applicationData, tenantId) => {
  try {
    const response = await CRService.updateAdoption(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default AdoptionAppUpdateAction;