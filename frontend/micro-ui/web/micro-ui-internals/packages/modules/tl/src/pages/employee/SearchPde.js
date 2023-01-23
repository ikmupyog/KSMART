import React, { useState } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";

const SearchPde = () => {
    const { variant } = useParams();
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [payload, setPayload] = useState({})

    const Search = Digit.ComponentRegistryService.getComponent( "SearchPdeApplication" );

    function onSubmit (_data) {
        const data = {
            ..._data
        }

        setPayload(Object.keys(data).filter( k => data[k] ).reduce( (acc, key) => ({...acc,  [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {} ))
    }

    const config = {
        enabled: !!( payload && Object.keys(payload).length > 0 )
    }

    const {data: {Licenses: searchReult, Count: count} = {}, isLoading , isSuccess } = Digit.Hooks.tl.useSearchPde({tenantId, filters: payload, config})

    return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} data={ !isLoading && isSuccess ? (searchReult?.length>0? searchReult : { display: "ES_COMMON_NO_DATA" }) : "" } count={count} /> 
//return <div>hai</div>
}

export default SearchPde