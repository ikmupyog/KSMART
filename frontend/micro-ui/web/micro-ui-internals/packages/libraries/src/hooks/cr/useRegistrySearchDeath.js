import React from "react";
import { useQuery } from "react-query";
import { CRDeathService } from "../../services/elements/CRDEATH";

// const useRegistrySearchDeath = ({ tenantId, filters, config = {} }) =>
//   useQuery(
//     ["CR_SEARCH_DEATH", tenantId, ...Object.keys(filters)?.map((e) => filters?.[e])],
//     () => CRDeathService.CRRegistrySearchDeath({ tenantId, filters }),
//     {
//       ...config
//         // refetchOnWindowFocus: false,
//         // enabled: enableFlag,
//         // cacheTime: 0,
//       }
//   );

// export default useRegistrySearchDeath;



const useRegistrySearchDeath = ({tenantId, filters, config={}}) => useQuery(
  
  ["CR_SEARCH_DEATH", tenantId,  ...Object.keys(filters)?.map( e => filters?.[e] )],
() => CRDeathService.CRRegistrySearchDeath({tenantId, filters}),
{
  // select: (data) => data.Licenses,
  ...config
}


)


export default useRegistrySearchDeath
