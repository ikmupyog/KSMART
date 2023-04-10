import { CRMarriageService } from "../../services/elements/CRMARRIAGE";
import { useMutation } from "react-query";

const useCivilRegistrationMarriageAPI = (tenantId, type = true) => {
  console.log("marriage params==", tenantId, type);
  if (type) {
    return useMutation((data) => {
      console.log("api params==", data);
      return CRMarriageService.create(data, tenantId);
    });
  } else {
    return useMutation((data) => CRMarriageService.update(data, tenantId));
  }
};

export default useCivilRegistrationMarriageAPI;
