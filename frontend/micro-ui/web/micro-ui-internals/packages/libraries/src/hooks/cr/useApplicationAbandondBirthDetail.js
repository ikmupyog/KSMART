// import { CRAbandonedBirthsearch } from "../../services/molecules/CRABANDONEDBIRTH/Search";
import { CRAbandonedsearch } from "../../services/molecules/CRABANDONEDBIRTH/Search";
import { useQuery } from "react-query";

const useApplicationAbandondBirthDetail = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRAbandonedsearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRAbandonedsearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationAbandondBirthDetail;
