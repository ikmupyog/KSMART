import { DFMService } from "../../elements/DFM";

const ApplicationModuleadd = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.modulesearch(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};
console.log("helo");

export default ApplicationModuleadd;
