import React from "react";
import { useQuery } from "react-query";
import { CRService } from "../../services/elements/CR"

const useAdoptionSearch = ({tenantId, filters, config={}}) => useQuery(
    
    ["CR_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRService.CRAdoptionSearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useAdoptionSearch
