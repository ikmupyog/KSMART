import React from "react";
import { useQuery } from "react-query";
import { CRMarriageService } from "../../services/elements/CRMARRIAGE"

const useSearchMarriage = ({tenantId, filters, config={}}) => useQuery(
    
    ["CR_MARRIAGE_SEARCH", tenantId, ...Object.keys(filters)?.map((e) => filters?.[e])],
    () => CRMarriageService.search({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchMarriage;
