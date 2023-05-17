import { DFMService } from "../../elements/DFM";

const UpdateSubFunct = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.updatesubfunct(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default UpdateSubFunct;
