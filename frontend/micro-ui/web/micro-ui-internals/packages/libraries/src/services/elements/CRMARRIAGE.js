import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRMarriageService = {
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
  search: (details) =>
    Request({
      url: Urls.crmarriage.search,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: details,
      auth: true,
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
};
