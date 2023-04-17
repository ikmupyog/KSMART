import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/CRMARRIAGE/ApplicationUpdateActions";

const useApplicationMarriageActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId));
};

export default useApplicationMarriageActions;
