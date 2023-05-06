import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM"

const useSearchmodule = ({tenantId,  config={}}) => useQuery(
    
    ["DFM_SEARCH_MODULE", tenantId],
    () => DFMService.modulesearch({tenantId}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchmodule
