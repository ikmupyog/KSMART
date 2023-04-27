import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";

export const getNacDeathFileSourceDetails = ({ params = {}, additionalProps = {} }) => {
  return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.crnacdeath.registry_download } });
};
