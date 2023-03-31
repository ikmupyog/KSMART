import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/CRBORNOUTSIDEINDIABIRTH/ApplicationUpdateActions";

const useApplicationBornOutsideIndiaBirthActions = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId));
};

export default useApplicationBornOutsideIndiaBirthActions;
