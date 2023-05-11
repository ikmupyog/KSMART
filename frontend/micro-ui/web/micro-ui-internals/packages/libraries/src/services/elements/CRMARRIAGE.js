import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRMarriageService = {
  correctMarriage: (details, tenantId) =>
    Request({
      url: Urls.crmarriage.correct_update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  create: (details, tenantId) =>
    Request({
      url: Urls.crmarriage.create,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  search: ({ filters }) =>
    Request({
      url: Urls.crmarriage.search,
      useCache: false,
      userService: false,
      method: "POST",
      params: { ...filters },
      auth: true,
    }),
    CRRegistrySearchMarriage: ({ filters }) =>
    Request({
      url: Urls.crmarriage.registry_search_marriage,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.crmarriage.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
    CRMarriagesearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.crmarriage.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
    CRMarriageCorrectionSearch: ({ tenantId, filters }) =>{
      console.log("reached==",filters);
    return Request({
      url: Urls.crcorrection.marriage_correction_search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { ...filters },
    })},
    CRRegDownloadMarriageRegistryDetails: ({params={}, tenantId, additionalProps={}}) =>
        Request({
            url: Urls.crmarriage.registry_download,
            data: {},
            useCache: false,
            method: "POST",
            params,
            auth: true,
            locale: true,
            userInfo: true,
            userDownloadInfo: true,
            ...additionalProps
        })
};
