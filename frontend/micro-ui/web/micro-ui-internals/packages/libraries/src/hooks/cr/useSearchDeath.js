import React from "react";
import { useQuery } from "react-query";
import { CRService } from "../../services/elements/CR"
import { CRDeathService } from "../../services/elements/CRDEATH";

const useSearchDeath = ({tenantId, filters, config={}}) => useQuery(
    ["CR_DEATH_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRDeathService.CRDeathsearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchDeath
