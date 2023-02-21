import { useMutation } from "react-query";
import ApplicationDeathUpdateActions from "../../services/molecules/CRDEATH/ApplicationDeathUpdateActions";

const useApplicationDeathActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationDeathUpdateActions(applicationData, tenantId));
};

export default useApplicationDeathActions;
