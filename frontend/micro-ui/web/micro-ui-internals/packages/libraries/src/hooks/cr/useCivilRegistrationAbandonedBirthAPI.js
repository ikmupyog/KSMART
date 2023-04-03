import { CRABNBirthService } from "../../services/elements/CRABANDONEDBIRTH";
import { useMutation } from "react-query";

const useCivilRegistrationAbandonedBirthAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRABNBirthService.create(data, tenantId));
} else {
  return useMutation((data) => CRABNBirthService.update(data, tenantId));
}
};

export default useCivilRegistrationAbandonedBirthAPI;
