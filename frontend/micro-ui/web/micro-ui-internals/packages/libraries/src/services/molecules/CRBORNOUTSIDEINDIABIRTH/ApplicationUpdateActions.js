import { CRStillBirthService } from "../../elements/CRSTILLBIRTH";

const ApplicationUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await CRStillBirthService.update(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationUpdateActions;
