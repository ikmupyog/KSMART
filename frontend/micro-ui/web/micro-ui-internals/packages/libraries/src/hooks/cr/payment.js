import Urls from "../../services/atoms/urls";
import { useCommonMutateHook } from "./common";

export const setPaymentStatus = ({ params = {}, additionalProps = {} }) => {
    return useCommonMutateHook({ params, additionalProps: { ...additionalProps, url: Urls.crcommonpayment.update } })
};