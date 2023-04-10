import React from "react";
import { useQuery } from "react-query";
import { CRNACBirthService } from "../../services/elements/CRNACBIRTH"

const useBirthNACSearch = ({tenantId, filters, config={}}) => useQuery(
    
    ["CR_NAC_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRNACBirthService.CRNACsearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useBirthNACSearch
