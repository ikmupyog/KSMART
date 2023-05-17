

import { DFMService } from "../../services/elements/DFM";
import { useMutation } from "react-query";

const useDeleteModule = (tenantId) => {
  return useMutation((applicationData) => DFMService.deleteModule(applicationData,tenantId));
};
export default useDeleteModule;
