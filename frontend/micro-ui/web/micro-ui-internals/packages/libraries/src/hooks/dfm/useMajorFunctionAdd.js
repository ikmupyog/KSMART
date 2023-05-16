import { useMutation } from "react-query";
import MajorFunction from "../../services/molecules/DFM/MajorFunction";

const useMajorFunctionAdd = (tenantId) => {
  return useMutation((applicationData) => MajorFunction(applicationData, tenantId));
};

export default useMajorFunctionAdd;
