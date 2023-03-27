import { CRSearchMarriage } from "../../services/molecules/CRMARRIAGE/Search";
import { useQuery } from "react-query";

const useApplicationMarriageDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRMarriagesearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRSearchMarriage.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationMarriageDetail;
