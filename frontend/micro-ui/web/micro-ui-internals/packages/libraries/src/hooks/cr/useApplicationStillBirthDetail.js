import { CRStillBirthsearch } from "../../services/molecules/CRSTILLBIRTH/Search";
import { useQuery } from "react-query";

const useApplicationStillBirthDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRStillBirthsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRStillBirthsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationStillBirthDetail;
