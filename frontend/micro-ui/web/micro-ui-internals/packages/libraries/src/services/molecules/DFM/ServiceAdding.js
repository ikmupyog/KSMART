import { DFMService } from "../../elements/DFM";

const ServiceAdding = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.serviceAdding(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ServiceAdding;
