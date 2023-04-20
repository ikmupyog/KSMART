import React from "react";
import { useMutation } from "react-query";
import { CRMarriageService } from "../../services/elements/CRMARRIAGE";

const useRegistrySearchMarriage = (tenantId) => useMutation(({ filters }) => CRMarriageService.CRRegistrySearchMarriage({ tenantId, filters }));

export default useRegistrySearchMarriage;
