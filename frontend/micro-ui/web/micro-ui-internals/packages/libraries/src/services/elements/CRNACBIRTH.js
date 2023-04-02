import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRNACBirthService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.crnacbirth.create,
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
      url: Urls.crnacbirth.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  CRRegistrySearchBirth: ({ filters }) =>
    Request({
      url: Urls.crnacbirth.registry_search_birth,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { ...filters },
    }),
  CRResistryDownloadBirth: (id, source) =>
    Request({
      url: Urls.crnacbirth.registry_download,
      data: {},
      useCache: false,
      method: "POST",
      params: { id, source },
      auth: true,
      locale: true,
      userInfo: true,
      userDownloadInfo: true,
    }),
  CRNACsearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.crnacbirth.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.crnacbirth.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
