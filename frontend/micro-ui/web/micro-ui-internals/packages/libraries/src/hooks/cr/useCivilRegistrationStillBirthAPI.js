import { CRStillBirthService } from "../../services/elements/CRSTILLBIRTH";
import { useMutation } from "react-query";

const useCivilRegistrationStillBirthAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRStillBirthService.create(data, tenantId));
} else {
  return useMutation((data) => CRStillBirthService.update(data, tenantId));
}
};

export default useCivilRegistrationStillBirthAPI;
