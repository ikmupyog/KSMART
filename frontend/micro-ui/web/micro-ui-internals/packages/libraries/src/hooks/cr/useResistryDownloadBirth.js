import React from "react";
import { useQuery } from "react-query";
import { CRService } from "../../services/elements/CR"

const useResistryDownloadBirth = ({ filters, config={}}) => useQuery(
  
    ["CR_SEARCH", ...Object.keys(filters)?.map( e => filters?.[e] )],
() => CRService.CRResistryDownloadBirth( filters?.id,filters?.source),
{
 
    ...config
}


)

export default useResistryDownloadBirth