import React from "react";
import { useQuery } from "react-query";
import { CRService } from "../../services/elements/CR"
import { CRAbandonedDeathService } from "../../services/elements/CRABANDONEDDEATH";

const useSearchAbandonedDeath = ({tenantId, filters, config={}}) => useQuery(
    ["CR_ABANDONED_DEATH_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRAbandonedDeathService.CRAbandonedDeathsearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useSearchAbandonedDeath
