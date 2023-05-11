import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";
import { useMutation } from "react-query";
import { CRMarriageService } from "../../services/elements/CRMARRIAGE";

export const useMarriageApplicationSearch = ({tenantId="",filters={}, config={}}) => {
    console.log("filtyers--11",tenantId,filters);
    return useMutation(() => CRMarriageService.CRMarriagesearch({tenantId, filters}))
}
