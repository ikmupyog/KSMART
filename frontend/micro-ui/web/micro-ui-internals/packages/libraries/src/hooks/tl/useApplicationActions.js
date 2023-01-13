import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/TL/ApplicationUpdateActions";

const useApplicationActions = (tenantId,pdewsupdate=false) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId,pdewsupdate));
};

export default useApplicationActions;
