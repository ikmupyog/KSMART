import { useMutation } from "react-query";
import { CRDeathService } from "../../services/elements/CRDEATH";
import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";


export const useRegSearchDeath = (tenantId) => {
    return useMutation(({ filters }) => CRDeathService.CRRegistrySearchDeath({ tenantId, filters }))
};

export const getDeathFileSourceDetails = (tenantId) => {
    return useMutation(({ filters }) => CRDeathService.CRRegDownloadDeathFileDetails({ params: { tenantId, ...filters }, additionalProps: { setTimeParam: false } }))
};

export const getNacDeathFileSourceDetails = ({ params = {}, additionalProps = {} }) => {
    return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.crnacdeath.registry_download } });
};

export const updateDeathCorrectionAction = ({ params = {}, additionalProps = {} }) => {
    return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.deathdetailsupdatedeathcorrection } });
};

