import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM"

const useSearch = ({tenantId, filters, config={}}) => useQuery(
    ["DFM_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => DFMService.DFMsearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearch
