import { TLService } from "../../services/elements/TL";
import { useMutation } from "react-query";

const useTradeLicensePdeAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => TLService.createpde(data, tenantId));
} else {
  return useMutation((data) => TLService.update(data, tenantId));
}
};

export default useTradeLicensePdeAPI;
