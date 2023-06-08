import React from "react";
import { useMutation } from "react-query";
import { TLService } from "../../services/elements/TL"

const useSearchPT = (tenantId,config = {}) => {
    return useMutation((data) => TLService.search_pt(data, tenantId));
}
export default useSearchPT
 