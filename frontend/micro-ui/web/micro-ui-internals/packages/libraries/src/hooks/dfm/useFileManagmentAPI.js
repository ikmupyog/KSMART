import { DFMService } from "../../services/elements/DFM";
import { useMutation } from "react-query";

const useFileManagmentAPI = (tenantId, type = true) => {
  if(type){
  return useMutation((data) => DFMService.create(data, tenantId));
} else {
  return useMutation((data) => DFMService.update(data, tenantId));
}
};

export default useFileManagmentAPI;
