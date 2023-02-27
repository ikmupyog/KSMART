import React from "react";
import { useQuery } from "react-query";
import { CRDeathService } from "../../services/elements/CRDEATH"

const useRegistryDownloadDeath = ({tenantId, filters, config={}}) => useQuery(
  
    ["CR_SEARCH", tenantId, ...Object.keys(filters)?.map( e => filters?.[e] )],
() => CRDeathService.CRRegistryDownloadDeath(tenantId, filters?.id,filters?.source),
{
 
    ...config
}


)

export default useRegistryDownloadDeath