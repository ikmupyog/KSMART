import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const DFMService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.dfm.create,
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
  modulesearch: (details) =>
    Request({
      url: Urls.dfm.modulesearch,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  majorFunctionSearch: (tenantId, moduleId) =>
    Request({
      url: Urls.dfm.majorFunctionSearch,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: { tenantId, moduleId },
      auth: true,
    }),
  submodulesearch: (details) =>
    Request({
      url: Urls.dfm.submodulesearch,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),

  // search_bill: ({ tenantId, filters }) =>
  //   Request({
  //     url: filters.businesService !== "PT" ? Urls.mcollect.search_bill : Urls.mcollect.search_bill_pt,
  //     useCache: false,
  //     method: "POST",
  //     data: { searchCriteria: { tenantId, ...filters } },
  //     auth: true,
  //     userService: false,
  //     //params: { tenantId, ...filters },
  //   }),
  DFMsearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.dfm.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.dfm.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  drafting: (details, tenantId) =>
    Request({
      url: Urls.dfm.create_draft,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  note_drafting: (details, tenantId) =>
    Request({
      url: Urls.dfm.create_note,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  fetch_draft: (tenantId, fileCode) =>
    Request({
      url: Urls.dfm.fetch_draft,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { fileCode },
    }),
  arising_file: (details, tenantId) =>
    Request({
      url: Urls.dfm.arising_file,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
  createmodule: (details, tenantId) =>
    Request({
      url: Urls.dfm.createmodule,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  majorFunction: (details, tenantId) =>
    Request({
      url: Urls.dfm.majorFunction,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  updatemodule: (details, tenantId) =>
    Request({
      url: Urls.dfm.updatemodule,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  updatemajor: (details, ) =>
    Request({
      url: Urls.dfm.updatemajor,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {  },
      auth: true,
    }),
  deleteModule: (details, tenantId) =>
    Request({
      url: Urls.dfm.deleteModule,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  deleteMajor: (details, tenantId) =>
    Request({
      url: Urls.dfm.deleteMajor,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  createsubmodule: (details, tenantId) =>
    Request({
      url: Urls.dfm.createsubmodule,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),

  // billingslab: ({ tenantId, filters, auth }) =>
  //   Request({
  //     url: Urls.tl.billingslab,
  //     useCache: false,
  //     setTimeParam: false,
  //     userService: true,
  //     method: "POST",
  //     params: { tenantId },
  //     auth: true,
  //   }),
};
