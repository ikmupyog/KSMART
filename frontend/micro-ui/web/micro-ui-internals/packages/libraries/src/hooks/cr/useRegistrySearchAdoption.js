import React from "react";
import { useQuery } from "react-query";
import { CRService } from "../../services/elements/CR";

const useRegistrySearchAdoption = ({ tenantId, filters, config = {} }) =>
  useQuery(["CR_SEARCH", ...Object.keys(filters)?.map((e) => filters?.[e])], 
          () => CRService.CRRegistrySearchAdoption({ tenantId, filters }), {
    ...config,
  });

export default useRegistrySearchAdoption;
