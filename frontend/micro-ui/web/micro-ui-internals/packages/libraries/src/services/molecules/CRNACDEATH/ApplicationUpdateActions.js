import { CRNACDeathService } from "../../elements/CRNACDEATH";

const ApplicationUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await CRNACDeathService.update(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationUpdateActions;
