import { useMutation } from "react-query";
import ApplicationNoteDrafting from "../../services/molecules/DFM/ApplicationNoteDrafting";

const useApplicationNoteDrafting = (tenantId) => {
  return useMutation((applicationData) => ApplicationNoteDrafting(applicationData, tenantId));
};

export default useApplicationNoteDrafting;
