import { useMutation } from "react-query";
import ApplicationArisingFile from "../../services/molecules/DFM/ApplicationArisingFile";

const useApplicationArisingFile = (tenantId) => {
  return useMutation((applicationData) => ApplicationArisingFile(applicationData, tenantId));
};

export default useApplicationArisingFile;
