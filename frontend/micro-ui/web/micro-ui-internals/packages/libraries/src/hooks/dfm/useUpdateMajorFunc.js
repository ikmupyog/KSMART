import { useMutation } from "react-query";
import UpdateMajor from "../../services/molecules/DFM/UpdateMajor";

const useUpdateMajorFunc = () => {
  return useMutation((applicationData) => UpdateMajor(applicationData, ));
};
// console.log(moduleId);

export default useUpdateMajorFunc;
