import React, { useState } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";

const SearchCorrection = ({path}) => {
    const { variant } = useParams();
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [payload, setPayload] = useState({})
    const Search = Digit.ComponentRegistryService.getComponent('CRDeathcorrection')
    const SearchDeath = Digit.ComponentRegistryService.getComponent('CRDeathcorrection')

    // const Search = Digit.ComponentRegistryService.getComponent('SearchCrApplication')

    function onSubmit (_data) {
        var fromDate = new Date(_data?.fromDate)
        fromDate?.setSeconds(fromDate?.getSeconds() - 19800 )
        var toDate = new Date(_data?.toDate)
        toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800)
        const data = {
            ..._data,
            ...(_data.toDate ? {toDate: toDate?.getTime()} : {}),
            ...(_data.fromDate ? {fromDate: fromDate?.getTime()} : {})
        }

        setPayload(Object.keys(data).filter( k => data[k] ).reduce( (acc, key) => ({...acc,  [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {} ))
    }

    const config = {
        enabled: !!( payload && Object.keys(payload).length > 0 )
    }

    const { data: { deathCertificateDtls: searchReult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearchDeath({ tenantId, filters: payload, config })
    console.log(searchReult);
    return <SearchDeath t={t} tenantId={tenantId} onSubmit={onSubmit} data={!isLoading && isSuccess ? (searchReult?.length > 0 ? searchReult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />

}

export default SearchCorrection