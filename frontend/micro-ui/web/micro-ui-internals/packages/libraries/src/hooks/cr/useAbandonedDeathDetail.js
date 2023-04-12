import { CRAbandonedDeathsearch } from "../../services/molecules/CRABANDONEDDEATH/Search";
import { useQuery } from "react-query";

const useAbandonedDeathDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRAbandonedDeathsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useAbandonedDeathDetail;
