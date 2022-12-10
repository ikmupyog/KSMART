import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const DFMService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.dfm_Create,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  search: (details) =>
    Request({
      url: Urls.dfm.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  
};
