import React from "react";
import { useQuery } from "react-query";
import { CRNACDeathService } from "../../services/elements/CRNACDEATH";

const useRegistryNacSearchDeath = ({ tenantId, filters, config = {} }) =>
  useQuery(
    ["CR_NACSEARCH", ...Object.keys(filters)?.map((e) => filters?.[e])],
    () => CRNACDeathService.CRRegistrySearchDeath({ tenantId, filters }),
    {
      ...config,
    }
  );

export default useRegistryNacSearchDeath;
