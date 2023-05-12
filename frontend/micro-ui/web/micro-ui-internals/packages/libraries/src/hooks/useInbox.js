import React from "react";
import { useQuery } from "react-query";
import { InboxGeneral } from "../services/elements/InboxService"

const useInbox = ({tenantId, filters, config}) => {
    console.log("filters in inbox==",filters);
    return useQuery(
        ["INBOX_DATA",tenantId],
        () => InboxGeneral.Search({inbox: {...filters}}),
        { ...config }
    )
}

export default useInbox;