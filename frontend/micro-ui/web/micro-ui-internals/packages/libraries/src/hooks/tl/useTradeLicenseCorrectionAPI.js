import { TLService } from "../../services/elements/TL";
import { useMutation } from "react-query";

const useTradeLicenseCorrectionAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => TLService.createcorrection(data, tenantId));
} else {
  return useMutation((data) => TLService.update(data, tenantId));
}
};

export default useTradeLicenseCorrectionAPI;
