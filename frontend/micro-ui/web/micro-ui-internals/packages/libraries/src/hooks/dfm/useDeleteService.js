import { DFMService } from "../../services/elements/DFM";
import { useMutation } from "react-query";

const useDeleteService = (tenantId) => {
  return useMutation((applicationData) => DFMService.deleteService(applicationData, tenantId));
};
export default useDeleteService;
