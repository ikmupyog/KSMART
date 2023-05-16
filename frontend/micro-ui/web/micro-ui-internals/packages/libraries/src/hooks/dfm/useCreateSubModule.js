import { useMutation } from "react-query";
import CreateSubModule from "../../services/molecules/DFM/CreateSubModule";

const useCreateSubModule = (tenantId) => {
  return useMutation((applicationData) => CreateSubModule(applicationData, tenantId));
};

export default useCreateSubModule;
