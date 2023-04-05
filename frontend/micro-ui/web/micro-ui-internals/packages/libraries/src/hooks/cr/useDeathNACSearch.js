import React from "react";
import { useQuery } from "react-query";
import { CRNACDeathService } from "../../services/elements/CRNACDEATH"

const useDeathNACSearch = ({tenantId, filters, config={}}) => useQuery(
    
    ["CR_NAC SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRNACDeathService.CRNACDeathsearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useDeathNACSearch
