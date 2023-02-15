import React, { useState } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown, Toast } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const SearchPde = (searchdata) => {

    const[searchdatacat,setSearchdatacat]=useState(searchdata);
    const [errorMessage, setErrorMessage] = useState("");
    const [wardmandatory, setWardmandatory] = useState(true);
    const [toast, setToast] = useState(false);
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

    function onSubmit(_data, pageflag) {
        console.log(_data?.wardId);
        setSearchdatacat(_data);
        if (_data?.wardId === undefined || _data?.wardId === null || _data?.wardId === 0) {
            setWardmandatory(false);
            setErrorMessage("Please select ward no");
            setToast(true)
            setTimeout(() => {
                setToast(false);
            }, 2000);
        }
        else
            setWardmandatory(true);
        if (!pageflag) {
            _data.offset = _data.offset
        } else {
            _data.offset = 0;
            _data.sortBy = "wardId",
                _data.sortOrder = "DESC"
        }
        queryClient.removeQueries("TL_SEARCH_PDE");
        const data = {
            ..._data
        }

        setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {}))
    }

    const config = {
        enabled: !!(payload && Object.keys(payload).length > 0)
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
    if (wardmandatory)
    return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} data={!isLoading && isSuccess ? (sortedData?.length > 0 ? sortedData : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    else
        return (
            <div>
                <SearchPde searchdata={searchdatacat}></SearchPde>
                {toast && (
                    <Toast
                        error={toast}
                        label={errorMessage}
                        onClose={() => setToast(false)}
                    />
                )}{""}
            </div>
        )
}

export default SearchPde