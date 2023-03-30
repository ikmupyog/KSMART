import { CRBornOutsideIndiasearch } from "../../services/molecules/CRBORNOUTSIDEINDIABIRTH/Search";
import { useQuery } from "react-query";

const useApplicationBornOutsideIndiaBirthDetail  = (t, tenantId, applicationNumber, config = {}, userType) => {
  let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  return useQuery(
    ["APPLICATION_SEARCH", "CRBornOutsideIndiasearch", applicationNumber, userType, EditRenewalApplastModifiedTime],
    () => CRBornOutsideIndiasearch.applicationDetails(t, tenantId, applicationNumber, userType),
    config
  );
};

export default useApplicationBornOutsideIndiaBirthDetail ;
