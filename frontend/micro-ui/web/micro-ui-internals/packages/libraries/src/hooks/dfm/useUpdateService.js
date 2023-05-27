import { useMutation } from "react-query";
import UpdateService from "../../services/molecules/DFM/UpdateService";

const useUpdateService = () => {
  return useMutation((applicationData) => UpdateService(applicationData, ));
};
// console.log(moduleId);

export default useUpdateService;