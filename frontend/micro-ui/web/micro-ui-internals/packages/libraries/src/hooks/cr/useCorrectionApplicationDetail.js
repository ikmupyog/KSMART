import { CRCorrectionSearch } from "../../services/molecules/CRCORRECTION/Search";
import { CRService } from "../../services/elements/CR";
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

export const useBirthCorrectionApplicationDetail = ({ tenantId, filter,config={}}) => {
console.log("api filters==",tenantId, filter);
  const resp =  useQuery(
    ["BIRTH_CORRECTION_APPLICATION_SEARCH", "CRsearch", filter?.applicationNumber],
    () => CRService.birthCorrectionSearch(tenantId, filter),
    config
  );
  console.log("resp==",resp);
  return resp;
};
