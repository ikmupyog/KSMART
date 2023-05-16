import { useMutation } from "react-query";
import UpdateModule from "../../services/molecules/DFM/UpdateModule";

const useUpdateModule = (tenantId) => {
  return useMutation((applicationData) => UpdateModule(applicationData, tenantId));
};

export default useUpdateModule;
