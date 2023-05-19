import React, { useState } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Search = ({ path }) => {
    const { variant } = useParams();
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [payload, setPayload] = useState({})
    const [applicationType, setApplicationType] = React.useState([])
    const [applicationDeathType, setApplicationDeathType] = React.useState([])
    // const Search = Digit.ComponentRegistryService.getComponent( variant === "death-correction" ? "DeathCorrection" : "SearchCrApplication" )

    const Search = Digit.ComponentRegistryService.getComponent('SearchCrApplication');
    const SearchDeath = Digit.ComponentRegistryService.getComponent('SearchDeathApplication');
    const SearchMarriage = Digit.ComponentRegistryService.getComponent('SearchMarriageApplication');

    function onSubmit(_data) {
        var fromDate = new Date(_data?.fromDate)
        fromDate?.setSeconds(fromDate?.getSeconds() - 19800)
        var toDate = new Date(_data?.toDate)
        toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800)
        const data = {
            ..._data,
            ...(_data.toDate ? { toDate: toDate?.getTime() } : {}),
            ...(_data.fromDate ? { fromDate: fromDate?.getTime() } : {})
        }

        setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {}))
    }
    console.log(window.location.href.includes("/marriagesearch"));
    const config = {
        enabled: !!(payload && Object.keys(payload).length > 0)
    }
    if (window.location.href.includes("/birthsearch") == true && applicationType?.value == "birthsearch") {
        const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearch({ tenantId, filters: payload, config })
        //console.log(searchResult);
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />

    } else if (window.location.href.includes("/birthsearch") == true && applicationType?.value == "adoptionsearch") {
        const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useAdoptionSearch({ tenantId, filters: payload, config })
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/birthsearch") == true && applicationType?.value == "stillbirthsearch") {
        const { data: { StillBirthChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearchStillBirth({ tenantId, filters: payload, config })
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/birthsearch") == true && applicationType?.value == "bornoutsidebirthsearch") {
        const { data: { BornOutsideChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useBornOutSideBirthSearch({ tenantId, filters: payload, config })
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/birthsearch") == true && applicationType?.value == "nacbirthsearch") {
        const { data: { nacDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useBirthNACSearch({ tenantId, filters: payload, config })
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/birthsearch") == true && applicationType?.value == "abandonedbirthsearch") {
        const { data: { AbandonedDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useAbandonedBirthSearch({ tenantId, filters: payload, config })
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/deathsearch") == true && applicationDeathType?.value == "death") {
        const { data: { deathCertificateDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearchDeath({ tenantId, filters: payload, config })
        return <SearchDeath t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationDeathType={setApplicationDeathType} applicationDeathType={applicationDeathType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/deathsearch") == true && applicationDeathType?.value == "deathnac") {
        const { data: { deathNACDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useDeathNACSearch({ tenantId, filters: payload, config })
        return <SearchDeath t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationDeathType={setApplicationDeathType} applicationDeathType={applicationDeathType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/deathsearch") == true && applicationDeathType?.value == "abandoneddeathsearch") {
        const { data: { deathAbandonedDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearchAbandonedDeath({ tenantId, filters: payload, config })

        return <SearchDeath t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationDeathType={setApplicationDeathType} applicationDeathType={applicationDeathType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/deathsearch") == true && applicationDeathType?.value == "deathcorrection") {
        const { data: { deathCertificateDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useDeathCorrectionApplicationSearch({ tenantId, filter: payload, config })
        return <SearchDeath t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationDeathType={setApplicationDeathType} applicationDeathType={applicationDeathType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }else if (window.location.href.includes("/birthsearch") == true && applicationType?.value == "birthcorrection") {
        const { data: { CorrectionApplication: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useBirthCorrectionApplicationSearch({ tenantId, filter: payload })
        console.log("SDEARCH RESULTS==",searchResult);
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }
    else if (window.location.href.includes("/birthsearch") == true) {
        const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearch({ tenantId, filters: payload, config })
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    } else if (window.location.href.includes("/deathsearch") == true) {
        const { data: { deathCertificateDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearchDeath({ tenantId, filters: payload, config })
        return <SearchDeath t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationDeathType={setApplicationDeathType} applicationDeathType={applicationDeathType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }else if (window.location.href.includes("/marriagesearch") == true && applicationType?.value === "marriagecorrection")  {
        console.log("initial");
        const { data: { MarriageDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useMarriageCorrectionApplicationDetail({ tenantId, filter: payload, config })
        return <SearchMarriage t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    } else if (window.location.href.includes("/marriagesearch") == true) {
        console.log("initial");
        const { data: { MarriageDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useMarriageSearch({ tenantId, filters: payload, config })
        return <SearchMarriage t={t} tenantId={tenantId} onSubmit={onSubmit} setApplicationType={setApplicationType} applicationType={applicationType} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    } 



}

export default Search