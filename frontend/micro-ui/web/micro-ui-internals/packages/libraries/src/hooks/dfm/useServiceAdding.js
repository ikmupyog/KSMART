import { useMutation } from "react-query";
import ServiceAdding from "../../services/molecules/DFM/ServiceAdding";

const useServiceAdding = (tenantId) => {
  return useMutation((applicationData) => ServiceAdding(applicationData, tenantId));
};

export default useServiceAdding;