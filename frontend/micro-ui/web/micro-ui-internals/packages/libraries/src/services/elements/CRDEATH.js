import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRDeathService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.crdeath.create,
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
      url: Urls.crdeath.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  CRsearch: ({ tenantId, filters }) =>
     Request({
      url: Urls.crdeath.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.crdeath.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
