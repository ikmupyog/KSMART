import { CRDeathService } from "../../services/elements/CRDEATH";
import { useMutation } from "react-query";

const useCivilRegistrationDeathAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRDeathService.create(data, tenantId));
} else {
  return useMutation((data) => CRDeathService.update(data, tenantId));
}
};

export default useCivilRegistrationDeathAPI;
