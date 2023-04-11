import React from "react";
import { useMutation } from "react-query";
import { CRMarriageService } from "../../services/elements/CRMARRIAGE";

const useSearchMarriage = (tenantId) => {
    return useMutation(({ filters }) => CRMarriageService.search({ tenantId, filters }));
};

export default useSearchMarriage;
