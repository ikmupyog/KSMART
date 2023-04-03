import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/CRABANDONEDBIRTH/ApplicationUpdateActions";

const useApplicationAbandonedBirthActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId));
};

export default useApplicationAbandonedBirthActions;
