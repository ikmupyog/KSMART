import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";

export const getBirthFileSourceDetails = ({ params = {}, additionalProps = {} }) => {
    return useCommonMutateHook({ params, additionalProps: {...additionalProps,url:Urls.cr.registry_download} })
};
