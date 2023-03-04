import React from "react";
import { useQuery } from "react-query";
import { CRDeathService } from "../../services/elements/CRDEATH"

const useRegistrySearchDeath = ({tenantId, filters, config={}}) => useQuery(
  
        ["CR_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRDeathService.CRRegistrySearchDeath({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
    
    
 )


export default useRegistrySearchDeath

