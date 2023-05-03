import { useMutation } from "react-query";
import CreateModule from "../../services/molecules/DFM/CreateModule";

const useCreateModule = (tenantId) => {
  return useMutation((applicationData) => CreateModule(applicationData, tenantId));
};

export default useCreateModule;
