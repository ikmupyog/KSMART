import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM";

const useSearchservice = ({ tenantId,subFunctionId, config = {} }) =>
  useQuery(["DFM_SERVICE_MODULE", tenantId,subFunctionId], () => DFMService.servicesearch({ tenantId,subFunctionId }), {
    // select: (data) => data.Licenses,
    ...config,
  });

export default useSearchservice;
