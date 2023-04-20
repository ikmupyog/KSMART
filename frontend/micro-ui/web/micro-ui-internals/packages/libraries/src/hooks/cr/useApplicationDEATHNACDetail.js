import { CRNACDeathsearch } from "../../services/molecules/CRNACDEATH/Search";
import { useQuery } from "react-query";

const useApplicationDEATHNACDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRNACDeathsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRNACDeathsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationDEATHNACDetail;
