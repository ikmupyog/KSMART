import { CRsearch } from "../../services/molecules/CRADOPTION/Search";
import { useQuery } from "react-query";

const useApplicationAdoptionDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationAdoptionDetail;
