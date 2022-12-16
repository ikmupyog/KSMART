import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useDFMGenderMDMS = (tenantId, moduleCode, type, config = {}) => {
  const useDFMGenders = () => {
    return useQuery("DFM_GENDER_DETAILS", () => MdmsService.CRGenderType(tenantId, moduleCode ,type), config);
  };
  

  switch (type) {
    case "GenderType":
      return useDFMGenders();
    default:
      return null;
  }
};



export default useDFMGenderMDMS;