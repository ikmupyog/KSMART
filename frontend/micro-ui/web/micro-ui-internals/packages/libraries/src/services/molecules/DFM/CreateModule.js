import { DFMService } from "../../elements/DFM";

const CreateModule = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.createmodule(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default CreateModule;
