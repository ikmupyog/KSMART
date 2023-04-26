import { DFMService } from "../../elements/DFM";

const ApplicationArisingFile = async (applicationData, tenantId) => {
    try {
        const response = await DFMService.arising_file(applicationData, tenantId);
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.Errors[0].message);
    }
};

export default ApplicationArisingFile;
