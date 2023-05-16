import { DFMService } from "../../elements/DFM";

const DeleteModule = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.deleteModule(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default DeleteModule;
