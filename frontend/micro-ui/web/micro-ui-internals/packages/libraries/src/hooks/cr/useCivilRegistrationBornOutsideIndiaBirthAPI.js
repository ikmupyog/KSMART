import { CRBornOutSideIndiaBirthService } from "../../services/elements/CRBORNOUTSIDEINDIABIRTH";
import { useMutation } from "react-query";

const useCivilRegistrationBornOutsideIndiaBirthAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRBornOutSideIndiaBirthService.create(data, tenantId));
} else {
  return useMutation((data) => CRBornOutSideIndiaBirthService.update(data, tenantId));
}
};

export default useCivilRegistrationBornOutsideIndiaBirthAPI;
