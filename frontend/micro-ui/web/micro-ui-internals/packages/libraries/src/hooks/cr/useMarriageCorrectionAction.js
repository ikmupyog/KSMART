import { CRMarriageService } from "../../services/elements/CRMARRIAGE";
import { useMutation } from "react-query";

const useMarriageCorrectionAction = (tenantId) => {
    
    return useMutation((data) => {
        console.log("params==",data);
        return CRMarriageService.correctMarriage(data, tenantId)
    });
};

export default useMarriageCorrectionAction;