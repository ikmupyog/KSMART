import { DFMService } from "../../elements/DFM";

const ApplicationDrafting = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.drafting(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationDrafting;
