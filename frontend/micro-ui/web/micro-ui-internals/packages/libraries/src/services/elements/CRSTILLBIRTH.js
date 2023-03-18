import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRStillBirthService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.crstillbirth.create,
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
      url: Urls.crstillbirth.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  CRRegistrySearchBirth: ({ filters }) =>
    Request({
      url: Urls.crstillbirth.registry_search_birth,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { ...filters },
    }),
  CRResistryDownloadBirth: (id, source) =>
    Request({
      url: Urls.crstillbirth.registry_download,
      data: {},
      useCache: false,
      method: "POST",
      params: { id, source },
      auth: true,
      locale: true,
      userInfo: true,
      userDownloadInfo: true,
    }),
  CRsearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.crstillbirth.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.crstillbirth.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
