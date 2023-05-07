import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";

export const setPaymentStatus = (props = {}) => {
    const { params = {}, additionalProps = {} } = props;
    console.log({ params, additionalProps });
    return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.crcommonpayment.update } })
};