import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM"

const useSearchmajorFunction = ({tenantId, moduleId, config={}}) => useQuery(
    
    ["DFM_SEARCH_MAJOR", tenantId,moduleId],
    () => DFMService.majorFunctionSearch(tenantId, moduleId),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchmajorFunction


