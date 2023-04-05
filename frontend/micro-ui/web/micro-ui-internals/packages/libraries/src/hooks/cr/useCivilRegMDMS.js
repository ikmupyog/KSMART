import { MdmsService } from "../../services/elements/MDMS";
import { useMutation } from "react-query";

// const useCivilRegMDMS = (tenantId, moduleCode, type, filter, config = {}) => {
//   const useCivilRegMDMS = () => {
//         return useMutation(() => MdmsService.getTLFinancialYear(tenantId, moduleCode, type), config);
//       };
//   const _default = () => {
//     return useQuery([tenantId, moduleCode, type], () => MdmsService.getMultipleTypes(tenantId, moduleCode, type), config);
//   };

//   switch (type) {
//     case "":
//     return useMarriagePlaces();
   
//     default:
//       return _default();
//   }
// };

// export default useCivilRegMDMS;

export const useCivilRegMDMS = (tenantId) => {
    return useMutation(({moduleCode, type}) => MdmsService.getCommonDbmsService(tenantId,moduleCode, type));
  };
