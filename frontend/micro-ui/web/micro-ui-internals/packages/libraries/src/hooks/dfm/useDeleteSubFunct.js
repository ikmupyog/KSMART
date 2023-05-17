

import { DFMService } from "../../services/elements/DFM";
import { useMutation } from "react-query";

const useDeleteSubFunct = (tenantId) => {
  return useMutation((applicationData) => DFMService.deleteSubFunct(applicationData,tenantId));
};
console.log("delteapi");
export default useDeleteSubFunct;
