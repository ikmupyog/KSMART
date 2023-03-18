import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/CRSTILLBIRTH/ApplicationUpdateActions";

const useApplicationStillBirthActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId));
};

export default useApplicationStillBirthActions;
