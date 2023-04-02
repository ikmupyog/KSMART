import { CRNACsearch } from "../../services/molecules/CRNACBIRTH/Search";
import { useQuery } from "react-query";

const useApplicationBIRTHNACDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRNACsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRNACsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationBIRTHNACDetail;
