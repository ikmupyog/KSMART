import { DFMService } from "../../services/elements/DFM";
import { useMutation } from "react-query";

const useDeleteMajorFunc = (tenantId) => {
  return useMutation((applicationData) => DFMService.deleteMajor(applicationData, tenantId));
};
console.log("delteapi");
export default useDeleteMajorFunc;
