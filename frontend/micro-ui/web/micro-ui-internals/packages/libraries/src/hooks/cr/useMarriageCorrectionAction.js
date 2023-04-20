import { useMutation } from "react-query";
import { CRMarriageService } from "../../services/elements/CRMARRIAGE";

const useMarriageCorrectionAction = (tenantId) => { 
    console.log("tenant id ===", tenantId);  
    return useMutation((data) => CRMarriageService.correctMarriage(data, tenantId));
};

export default useMarriageCorrectionAction;