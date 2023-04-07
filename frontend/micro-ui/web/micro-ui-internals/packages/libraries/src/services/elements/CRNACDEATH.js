import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const CRNACDeathService = {
    create: (details, tenantId) =>
        Request({
            url: Urls.crnacdeath.create,
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
            url: Urls.crnacdeath.search,
            useCache: false,
            setTimeParam: false,
            userService: true,
            method: "POST",
            params: details,
            auth: true,
        }),
    CRNACDeathsearch: ({ tenantId, filters }) =>
        Request({
            url: Urls.crnacdeath.search,
            useCache: false,
            method: "POST",
            auth: true,
            userService: false,
            params: { tenantId, ...filters },
        }),
    update: (details, tenantId) =>
        Request({
            url: Urls.crnacdeath.update,
            data: details,
            useCache: false,
            setTimeParam: false,
            userService: true,
            method: "POST",
            params: {},
            auth: true,
        }),
};
