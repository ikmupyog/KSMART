import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/CRNACBIRTH/ApplicationUpdateActions";

const useApplicationBirthNACActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId));
};

export default useApplicationBirthNACActions;
