import { useMutation } from "react-query";
import ApplicationDrafting from "../../services/molecules/DFM/ApplicationDrafting";

const useApplicationDrafting = (tenantId) => {
  return useMutation((applicationData) => ApplicationDrafting(applicationData, tenantId));
};

export default useApplicationDrafting;
