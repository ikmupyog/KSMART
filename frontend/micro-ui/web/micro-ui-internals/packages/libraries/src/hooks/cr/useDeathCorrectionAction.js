import { CRDeathService } from "../../services/elements/CRDEATH";
import { useMutation } from "react-query";

const useDeathCorrectionAction = (tenantId) => {
    
    return useMutation((data) => {
        console.log("params==",data);
        return CRDeathService.correctDeath(data, tenantId)
    });
};

export default useDeathCorrectionAction;