import { useMutation } from "react-query";
import ApplicationModuleadd from "../../services/molecules/DFM/ApplicationModuleadd";

const useApplicationModule = (tenantId) => {
  return useMutation((applicationData) => ApplicationModuleadd(applicationData, tenantId));
};
console.log("hiiiii");


export default useApplicationModule;
