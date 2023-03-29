import { CRMarriageService } from "../../services/elements/CRMARRIAGE";
import { useMutation } from "react-query";

const useCivilRegistrationMarriageAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => CRMarriageService.create(data, tenantId));
} else {
  return useMutation((data) => CRMarriageService.update(data, tenantId));
}
};

export default useCivilRegistrationMarriageAPI;
