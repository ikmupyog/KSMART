import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM";

const useSearchsubModule = ({ tenantId, config = {} }) =>
  useQuery(["DFM_SEARCH_MODULE", tenantId], () => DFMService.submodulesearch({ tenantId }), {
    // select: (data) => data.Licenses,
    ...config,
  });

export default useSearchsubModule;
