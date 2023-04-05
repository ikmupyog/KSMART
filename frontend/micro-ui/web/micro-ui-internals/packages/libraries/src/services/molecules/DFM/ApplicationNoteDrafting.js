import { DFMService } from "../../elements/DFM";

const ApplicationNoteDrafting = async (applicationData, tenantId) => {
  try {
    const response = await DFMService.note_drafting(applicationData, tenantId);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationNoteDrafting;
