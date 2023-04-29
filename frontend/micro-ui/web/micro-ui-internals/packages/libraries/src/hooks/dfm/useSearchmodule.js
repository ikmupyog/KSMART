import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM"

const useSearchmodule = ({tenantId, filters, config={}}) => useQuery(
    
    ["DFM_SEARCH_MODULE", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => DFMService.modulesearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchmodule
