import { Request } from "../atoms/Utils/Request";

export const service = ({ params = {}, additionalProps = {} }) => {
    const { url, method = "POST", ...rest } = additionalProps;
    return Request({
        url,
        method,
        params,
        ...rest
    })
}