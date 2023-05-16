import { useQuery, useQueryClient } from "react-query";

const useWorkflowDetails = ({ tenantId, id, moduleCode, role = "CITIZEN", serviceData = {}, getStaleData, config, getTripData = false }) => {
  const queryClient = useQueryClient();
// console.log("work flow params==",tenantId, id, moduleCode, role, config,getStaleData);
  const staleDataConfig = { staleTime: Infinity };

  const { isLoading, error, isError, data } = useQuery(
    ["workFlowDetails",tenantId, id, moduleCode, role],
    () => Digit.WorkflowService.getDetailsById({ tenantId, id, moduleCode, role, getTripData }),
    getStaleData ? { ...staleDataConfig, ...config } : config,
  );

  if (getStaleData) return { isLoading, error, isError, data };

  return { isLoading, error, isError, data, revalidate: () => queryClient.invalidateQueries(["workFlowDetails", tenantId, id, moduleCode, role]) };
};

export default useWorkflowDetails;
