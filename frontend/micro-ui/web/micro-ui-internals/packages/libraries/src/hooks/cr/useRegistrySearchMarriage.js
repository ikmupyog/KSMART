import React from "react";
import { useQuery } from "react-query";
import { CRMarriageService } from "../../services/elements/CRMARRIAGE"

const useRegistrySearchMarriage = ({tenantId, filters, config={}}) => useQuery(
  
        ["CR_SEARCH_MARRIAGE", tenantId,  ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRMarriageService.CRRegistrySearchMarriage({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
    
    
 )


export default useRegistrySearchMarriage

