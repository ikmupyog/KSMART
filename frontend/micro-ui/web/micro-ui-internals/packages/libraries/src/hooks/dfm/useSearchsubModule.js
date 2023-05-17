import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM";

const useSearchsubModule = ({ tenantId,majorFunctionId, config = {} }) =>
  useQuery(["DFM__SUBFUNCT_SEARCH_MODULE", tenantId,majorFunctionId], () => DFMService.submodulesearch({ tenantId,majorFunctionId }), {
    // select: (data) => data.Licenses,
    ...config,
  });

export default useSearchsubModule;
