import React from "react";
import { useQuery } from "react-query";
import { CRStillBirthService } from "../../services/elements/CRSTILLBIRTH"

const useSearchStillBirth = ({tenantId, filters, config={}}) => useQuery(
    
    ["CR_STILL_BIRTH_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRStillBirthService.CRsearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchStillBirth
