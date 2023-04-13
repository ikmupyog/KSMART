import { CRService } from "../../services/elements/CRMARRIAGE";
import { useMutation } from "react-query";

const useMarriageCorrectionAction = (tenantId) => {
    
    return useMutation((data) => {
        console.log("params==",data);
        return CRService.correctBirth(data, tenantId)
    });
};

export default useMarriageCorrectionAction;