import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM"

const useSearchsubModule = ({tenantId, filters, config={}}) => useQuery(
    
    ["SUBMODULE_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => DFMService.submodulesearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchsubModule
