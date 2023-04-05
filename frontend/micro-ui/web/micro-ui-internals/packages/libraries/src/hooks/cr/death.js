import { useMutation } from "react-query";
import { CRDeathService } from "../../services/elements/CRDEATH";

export const useRegSearchDeath = (tenantId) => {
    return useMutation(({ filters }) => CRDeathService.CRRegistrySearchDeath({ tenantId, filters }))
};

export const getDeathFileSourceDetails = (tenantId) => {
    return useMutation(({ filters }) => CRDeathService.CRRegDownloadDeathFileDetails({ params: { tenantId, ...filters }, additionalProps: { setTimeParam: false } }))
};