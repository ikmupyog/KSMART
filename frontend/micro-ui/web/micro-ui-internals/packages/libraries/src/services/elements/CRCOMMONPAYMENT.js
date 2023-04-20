import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRCommonPaymentService = {
  update: (details, tenantId) =>
    Request({
      url: Urls.crcommonpayment.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
