import { useMutation } from "react-query";
import UpdateSubFunct from "../../services/molecules/DFM/UpdateSubFunct";

const useUpdateSubFunct = () => {
  return useMutation((applicationData) => UpdateSubFunct(applicationData, ));
};
// console.log(moduleId);

export default useUpdateSubFunct;