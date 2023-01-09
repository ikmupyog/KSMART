import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/CRDEATH/ApplicationUpdateActions";

const useApplicationDeathActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId));
};

export default useApplicationDeathActions;
