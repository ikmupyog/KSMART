import { DFMService } from "../../elements/DFM";

const MajorFunction = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.majorFunction(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default MajorFunction;
