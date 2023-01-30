import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.cr.create,
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
      url: Urls.cr.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  CRRegistrySearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.crdeath.registry_search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
    CRResistryDownload: (tenantId, id, source ) =>
    Request({
      url: Urls.crdeath.registry_download,
      data: {},
      useCache: false,
      method: "POST",
      params: { tenantId, id, source },
      auth: true,
      locale: true,
      userInfo: true,
      userDownloadInfo: true,
    }),
    CRResistryDownloadBirth: (tenantId, id, source ) =>
    Request({
      url: Urls.crbirth.registry_download,
      data: {},
      useCache: false,
      method: "POST",
      params: { tenantId, id, source },
      auth: true,
      locale: true,
      userInfo: true,
      userDownloadInfo: true,
    }),
    CRRegistrySearchBirth: ({  tenantId, filters }) =>
    Request({
      url: Urls. crbirth.registry_search_birth,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  CRsearch: ({ tenantId, filters }) =>
     Request({
      url: Urls.cr.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.cr.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
