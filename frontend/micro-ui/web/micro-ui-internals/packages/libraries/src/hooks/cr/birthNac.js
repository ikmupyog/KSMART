import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";

export const getNacBirthFileSourceDetails = ({ params = {}, additionalProps = {} }) => {
  return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.crnacbirth.registry_download } });
};
