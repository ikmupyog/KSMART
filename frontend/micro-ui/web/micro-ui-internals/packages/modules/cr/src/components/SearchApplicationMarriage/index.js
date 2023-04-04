import React, { useState, useMemo } from "react";
import { SearchForm } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchFields from "./SearchFields";
import { useForm } from "react-hook-form";

const SearchApplicationMarriage = () => {
    const [payload, setPayload] = useState({});
    const tenantId = Digit.ULBService.getCitizenCurrentTenant();
    const { t } = useTranslation();
    const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
        defaultValues: {
            offset: 0,
            limit: 10,
            sortBy: "DateOfDeath",
            sortOrder: "DESC",
        },
    });

    const onSubmit = (_data) => {
        let dateOfMarriage = new Date(_data?.dateOfMarriage);
        dateOfMarriage?.setSeconds(dateOfMarriage?.getSeconds() - 19800);

        let data = {
            ..._data,
            ...(_data.dateOfMarriage ? { dateOfMarriage: dateOfMarriage?.getTime() } : {}),
        };

        setPayload(Object.keys(data)
            .filter((k) => data[k])
            .reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].name : data[key] }), {}))
    };

    const config = {
        enabled: !!(payload && Object.keys(payload).length > 0),
    };


    const {
        data: { results: marriageApplications } = {},
        isSuccess,
        isLoading,
    } = Digit.Hooks.cr.useRegistrySearchMarriage({
        tenantId,
        config,
        filters: payload
    });

    function previousPage() {
        setValue("offset", getValues("offset") - getValues("limit"));
        handleSubmit(onSubmit)();
    }


    return (
        <React.Fragment>
            <div className={"marriage-search-application"}>
                <h1>{t("CR_SEARCH_MARRIAGE_APPLICATION")}</h1>
                <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                    <SearchFields {...{ t, register, control, reset, previousPage }} />
                </SearchForm>
            </div>
        </React.Fragment>
    );
};
export default SearchApplicationMarriage;
