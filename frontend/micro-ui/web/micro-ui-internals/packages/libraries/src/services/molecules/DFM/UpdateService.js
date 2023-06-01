import { DFMService } from "../../elements/DFM";

const UpdateService = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.updateservice(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default UpdateService;
