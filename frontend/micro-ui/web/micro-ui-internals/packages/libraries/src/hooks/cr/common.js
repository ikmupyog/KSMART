import { useMutation } from "react-query";
import { service as CommonService } from "../../services/elements/Common";

export const useCommonMutateHook = (props = {}) => {
    const { params = {}, additionalProps = {} } = props;
    return useMutation(({ filters }) => CommonService({
        params: {
            ...params,
            ...filters
        },
        additionalProps: {
            useCache: false,
            setTimeParam: false,
            auth: true,
            locale: true,
            userInfo: true,
            userDownloadInfo: true,
            data: {},
            ...additionalProps
        }
    }))
};