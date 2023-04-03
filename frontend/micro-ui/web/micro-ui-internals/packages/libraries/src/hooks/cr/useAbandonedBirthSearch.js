import React from "react";
import { useQuery } from "react-query";
import { CRABNBirthService } from "../../services/elements/CRABANDONEDBIRTH"

const useAbandonedBirthSearch = ({tenantId, filters, config={}}) => useQuery(
    
    ["CR_ABANDONED_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRABNBirthService.CRAbandonedsearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useAbandonedBirthSearch
