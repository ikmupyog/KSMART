import React from "react";
import { useQuery } from "react-query";
import { CRDeathService } from "../../services/elements/CRDEATH";

const useRegistrySearchDeath = ({ tenantId, filters, config = {},enableFlag }) =>
  useQuery(
    ["CR_SEARCH", tenantId, ...Object.keys(filters)?.map((e) => filters?.[e])],
    () => CRDeathService.CRRegistrySearchDeath({ tenantId, filters }),
    {
        refetchOnWindowFocus: false,
        enabled: enableFlag,
        cacheTime: 0,
      }
  );

export default useRegistrySearchDeath;
