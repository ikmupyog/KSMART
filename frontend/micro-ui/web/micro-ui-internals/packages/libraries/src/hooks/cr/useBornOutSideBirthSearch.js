import React from "react";
import { useQuery } from "react-query";
import { CRBornOutSideIndiaBirthService } from "../../services/elements/CRBORNOUTSIDEINDIABIRTH"

const useBornOutSideBirthSearch = ({tenantId, filters, config={}}) => useQuery(
    
    ["CR_BORN_OUTSIDE_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
    () => CRBornOutSideIndiaBirthService.CRBornOutsideIndiasearch({tenantId, filters}),
    {
        // select: (data) => data.Licenses,
        ...config
    }
 )


export default useBornOutSideBirthSearch
