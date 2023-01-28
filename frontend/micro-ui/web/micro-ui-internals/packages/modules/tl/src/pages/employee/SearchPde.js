import React, { useState } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const SearchPde = () => {
    const { variant } = useParams();
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [payload, setPayload] = useState({})
    const queryClient = useQueryClient();

    const { roles: userRoles } = Digit.UserService.getUser().info;
    const roletemp = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("TL_PDEAPPROVER"));
    const roletempop = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("TL_PDEOPERATOR"));
    const approle = roletemp?.length > 0 ? true : false;
    const oprole = roletempop?.length > 0 ? true : false;


    const Search = Digit.ComponentRegistryService.getComponent("SearchPdeApplication");

    function onSubmit(_data) {
        queryClient.removeQueries("TL_SEARCH_PDE");
        const data = {
            ..._data
        }

        setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {}))
    }

    const config = {
        enabled: !!(payload && Object.keys(payload).length > 0)
    }
    function pageChange(_data) {
        console.log(JSON.stringify(_data));
        queryClient.removeQueries("TL_SEARCH_PDE");
        const data = {
            ..._data
        }

        setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {}))

    }
    const { data: { Licenses: searchReult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.tl.useSearchPde({ tenantId, filters: payload, config })

    const initiataed = searchReult ? searchReult.filter((data) => data?.status === null ? data : data?.status.includes("INITIATED")) : "";
    const forwarded = searchReult ? searchReult.filter((data) => data?.status === null ? data : data?.status.includes("FORWARDED")) : "";
    const approved = searchReult ? searchReult.filter((data) => data?.status === null ? data : data?.status.includes("APPROVED")) : "";

    let sortedData = [];
    if (oprole) {
        if (initiataed?.length > 0)
            initiataed.map((ob) => {
                sortedData.push(ob);
            });
        if (forwarded?.length > 0)
            forwarded.map((ob) => {
                sortedData.push(ob);
            });
        if (approved?.length > 0)
            approved.map((ob) => {
                sortedData.push(ob);
            });
    }

    else if (approle) {
        if (forwarded?.length > 0)
            forwarded.map((ob) => {
                sortedData.push(ob);
            });
        if (approved?.length > 0)
            approved.map((ob) => {
                sortedData.push(ob);
            });
    }

    sortedData = sortedData?.length > 0 ? sortedData : searchReult;
    return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} onPageChage={pageChange} data={!isLoading && isSuccess ? (sortedData?.length > 0 ? sortedData : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    //return <div>hai</div>
}

export default SearchPde