import { CRCorrectionSearch } from "../../services/molecules/CRCORRECTION/Search";
import { useQuery } from "react-query";

const useCorrectionApplicationDetail = (t, tenantId, applicationNumber, correctionType,config = {},) => {
//   let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
console.log("reched");
  return useQuery(
    ["CORRECTION_APPLICATION_SEARCH", "CRsearch", applicationNumber, correctionType],
    () => CRCorrectionSearch.applicationDetails(t, tenantId, applicationNumber, correctionType),
    config
  );
};

export default useCorrectionApplicationDetail;
