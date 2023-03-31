import { useMutation } from "react-query";
import AdoptionAppUpdateAction from "../../services/molecules/CR/AdoptionAppUpdateAction";

const useAdoptionApplActions = (tenantId) => {
  return useMutation((applicationData) => AdoptionAppUpdateAction(applicationData, tenantId));
};

export default useAdoptionApplActions;