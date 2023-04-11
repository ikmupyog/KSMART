import React from "react";
import { useQuery } from "react-query";
import { DFMService } from "../../services/elements/DFM";

const useApplicationFetchDraft = ({ tenantId, id, config = {} }) =>
    useQuery(["DFM_FETCH", tenantId, id],
        () => DFMService.fetch_draft(tenantId, id), {
        ...config,
    });


export default useApplicationFetchDraft;