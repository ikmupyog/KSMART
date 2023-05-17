import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";
import {BirthApplicationUpdateActions} from "../../services/molecules/CRCORRECTION/ApplicationUpdateActions";
import { useMutation } from "react-query";

export const getBirthFileSourceDetails = ({ params = {}, additionalProps = {} }) => {
    return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.cr.registry_download } })
};

export const getNacBirthFileSourceDetails = ({ params = {}, additionalProps = {} }) => {
    return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.crnacbirth.registry_download } });
};

export const updateBirthCorrectionAction = (tenantId) => {
    return useMutation((applicationData) => BirthApplicationUpdateActions(applicationData, tenantId));
};
