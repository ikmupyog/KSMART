import { CRService } from "../../services/elements/CR";
import { useMutation } from "react-query";

const useBirthCorrectionAction = (tenantId) => {
    
    return useMutation((data) => {
        console.log("params==",data);
        return CRService.correctBirth(data, tenantId)
    });
};

export default useBirthCorrectionAction;