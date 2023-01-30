import React from "react";
import { useQuery } from "react-query";
import { CRService } from "../../services/elements/CR"

const useResistryDownload = ({tenantId, filters, config={}}) => useQuery(
  
    ["CR_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
() => CRService.CRResistryDownload(tenantId, filters?.id,filters?.source),
{
 
    ...config
}


)

export default useResistryDownload