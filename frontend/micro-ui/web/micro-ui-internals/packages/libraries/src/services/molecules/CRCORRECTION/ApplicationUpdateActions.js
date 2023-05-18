import { CRService } from "../../elements/CR";

const ApplicationUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await CRService.update(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationUpdateActions;

export const BirthApplicationUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await CRService.birthCorrectionUpdate(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export const MarriageApplicationUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await CRService.marriageCorrectionUpdate(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};


