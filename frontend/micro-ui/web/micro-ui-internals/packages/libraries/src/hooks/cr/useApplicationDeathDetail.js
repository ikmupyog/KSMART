import { CRDeathsearch } from "../../services/molecules/CRDEATH/Search";
import { useQuery } from "react-query";

const useApplicationDeathDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRDeathsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRDeathsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationDeathDetail;
