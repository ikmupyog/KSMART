

import { DFMService } from "../../services/elements/DFM";
import { useMutation } from "react-query";

const useDeleteModule = (tenantId) => {
  return useMutation((applicationData) => DFMService.deleteModule(applicationData,tenantId));
};
console.log("delteapi");
export default useDeleteModule;
