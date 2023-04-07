import { CRAbandonedDeathService } from "../../services/elements/CRABANDONEDDEATH";
import { useMutation } from "react-query";

const useAbandonedDeathCreationAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRAbandonedDeathService.create(data, tenantId));
} else {
  return useMutation((data) => CRAbandonedDeathService.update(data, tenantId));
}
};

export default useAbandonedDeathCreationAPI;
