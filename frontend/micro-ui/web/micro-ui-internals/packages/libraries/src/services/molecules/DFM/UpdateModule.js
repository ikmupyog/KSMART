import { DFMService } from "../../elements/DFM";

const UpdateModule = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.updatemodule(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default UpdateModule;
