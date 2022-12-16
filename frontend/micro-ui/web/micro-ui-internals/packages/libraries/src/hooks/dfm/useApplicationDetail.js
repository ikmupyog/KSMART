import { DFMsearch } from "../../services/molecules/DFM/Search";
import { useQuery } from "react-query";

const useApplicationDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "DFMsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => DFMsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationDetail;
