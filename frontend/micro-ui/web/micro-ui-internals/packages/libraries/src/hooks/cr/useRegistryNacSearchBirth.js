import React from "react";
import { useQuery } from "react-query";
import { CRNACBirthService } from "../../services/elements/CRNACBIRTH";

const useRegistryNacSearchBirth = ({ tenantId, filters, config = {} }) =>
  useQuery(
    ["CR_NACSEARCH", ...Object.keys(filters)?.map((e) => filters?.[e])],
    () => CRNACBirthService.CRRegistrySearchBirth({ tenantId, filters }),
    {
      ...config,
    }
  );

export default useRegistryNacSearchBirth;
