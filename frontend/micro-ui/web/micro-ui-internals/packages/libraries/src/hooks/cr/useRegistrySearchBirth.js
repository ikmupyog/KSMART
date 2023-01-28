import React from "react";
import { useQuery } from "react-query";
import { CRService } from "../../services/elements/CR"

const useRegistrySearchBirth = ({tenantId, filters, config={}}) => useQuery(
  
        ["CR_SEARCH",  ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRService.CRRegistrySearchBirth({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
    
    
 )


export default useRegistrySearchBirth

