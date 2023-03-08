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
  CRDeathsearch: ({ tenantId, filters }) =>
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
  CRRegistrySearchDeath: ({ tenantId, filters }) =>
    Request({
      url: Urls.crdeath.registry_search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  CRRegistryDownloadDeath: (tenantId, id, source) =>
    Request({
      url: Urls.crdeath.registry_download,
      data: {},
      useCache: false,
      method: "POST",
      params: { id, source, tenantId },
      auth: true,
      locale: true,
      userInfo: true,
      userDownloadInfo: true,
    }),
};
