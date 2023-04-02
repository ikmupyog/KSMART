import { CRNACBirthService } from "../../services/elements/CRNACBIRTH";
import { useMutation } from "react-query";

const useCivilRegistrationNACBIRTHAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRNACBirthService.create(data, tenantId));
} else {
  return useMutation((data) => CRNACBirthService.update(data, tenantId));
}
};

export default useCivilRegistrationNACBIRTHAPI;
