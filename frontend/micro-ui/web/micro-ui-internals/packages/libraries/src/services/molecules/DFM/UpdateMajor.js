import { DFMService } from "../../elements/DFM";

const UpdateMajor = async (applicationData) => {
  try {
    const response = await DFMService.updatemajor(applicationData);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default UpdateMajor;
