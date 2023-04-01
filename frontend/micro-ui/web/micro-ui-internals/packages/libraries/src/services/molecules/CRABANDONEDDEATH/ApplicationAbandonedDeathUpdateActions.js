import { CRAbandonedDeathService } from "../../elements/CRABANDONEDDEATH";

const ApplicationAbandonedDeathUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await CRAbandonedDeathService.update(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationAbandonedDeathUpdateActions;
