import React from "react";
import { useQuery } from "react-query";
import { TLService } from "../../services/elements/TL"

const useSearchPde = ({tenantId, filters, config={}}) => useQuery(
    ["TL_SEARCH_PDE", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => TLService.searchpde({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchPde
