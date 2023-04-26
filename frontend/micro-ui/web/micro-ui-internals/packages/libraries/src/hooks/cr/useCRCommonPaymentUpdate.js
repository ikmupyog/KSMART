import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/CRCOMMONPAYMENT/ApplicationUpdateActions";

const useCRCommonPaymentUpdate = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActions(applicationData, tenantId));
};

export default useCRCommonPaymentUpdate;
