import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRABNBirthService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.crabandonedbirth.create,
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
      url: Urls.crabandonedbirth.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
    }),
  CRAbandonedsearch: ({ tenantId, filters }) =>
    Request({
      url: Urls.crabandonedbirth.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: false,
      params: { tenantId, ...filters },
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.crabandonedbirth.update,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),
};
