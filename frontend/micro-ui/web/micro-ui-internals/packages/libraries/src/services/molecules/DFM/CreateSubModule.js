import { DFMService } from "../../elements/DFM";

const CreateSubModule = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.createsubmodule(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default CreateSubModule;
