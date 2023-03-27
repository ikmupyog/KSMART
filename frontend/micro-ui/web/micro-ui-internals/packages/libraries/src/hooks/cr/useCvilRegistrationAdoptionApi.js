import { CRService } from "../../services/elements/CR";
import { useMutation } from "react-query";

const useCvilRegistrationAdoptionApi = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRService.createAdoption(data, tenantId));
} else {
  return useMutation((data) => CRService.updateAdoption(data, tenantId));
}
};

export default useCvilRegistrationAdoptionApi;
