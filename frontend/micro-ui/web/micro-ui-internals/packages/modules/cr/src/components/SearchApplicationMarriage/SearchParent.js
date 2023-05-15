import React, { useState } from "react";
import { Loader, SearchForm } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchFields from "./SearchFields";
import { useForm } from "react-hook-form";
import ResultTable from "../SearchMarriageInclusion/ResultTable";

const SearchParent = ({
    searchType = 'application'
}) => {

    const searchDefaultFields = {
        marriageDOM: "",
        groomFirstnameEn: "",
        brideFirstnameEn: "",
    }

    if (searchType === 'application') {
        searchDefaultFields.applicationNo = "";
    } else {
        searchDefaultFields.registrationNo = "";
        searchDefaultFields.certificateNo = "";
    }

    const [results, setResults] = useState([]);
    const [count, setCount] = useState(0);
    const [defaultValue, setDefaultValue] = useState({
        offset: 0,
        limit: 10,
        sortBy: "",
        sortOrder: "DESC",
    });

    const tenantId = Digit.ULBService.getCurrentTenantId();
    const { mutate, isLoading } = searchType == 'application' ? Digit.Hooks.cr.useSearchMarriage(tenantId) : Digit.Hooks.cr.useRegistrySearchMarriage(tenantId);
    const { t } = useTranslation();
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: searchDefaultFields
    });

    const getValue = (type) => {
        return defaultValue[type];
    }

    const setValue = (type, value) => {
        defaultValue[type] = value;
    }
    const onSuccess = (data) => {
        if (data && data["MarriageDetails"]) {
            setResults(data["MarriageDetails"])
            setCount(data["Count"])
        }
    };

    const onSubmit = (_data) => {
        let data = _data;
        if (_data.marriageDOM) {
            data.marriageDOM = Date.parse(_data.marriageDOM);
        }

        data = Object.keys(data)
            .filter((k) => data[k])
            .reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {})

        data = {
            ...data,
            ...defaultValue
        }

        const params = {
            filters: data
        }
        mutate(params, { onSuccess })
    };
    function emptyRecords() {
        setResults([]);
        setCount(0);
    }

    const downloadLink = (data) => {
        console.log("download certificate");
    }



    return (
        <React.Fragment>
            <div className={"marriage-search-application"}>
                <h1>{searchType == 'application' ? t("CR_SEARCH_MARRIAGE_APPLICATION") : t("CR_DOWNLOAD_MARRIAGE_CERTIFICATE")}</h1>
                <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                    <SearchFields
                        searchType={searchType}
                        {...{ t, register, control, reset, emptyRecords }} />
                </SearchForm>
            </div>
            {isLoading && <Loader />}
            {results && results.length > 0 && (
                <React.Fragment>
                    <ResultTable
                        setValue={setValue}
                        getValues={getValue}
                        data={results}
                        count={count}
                        handleSubmit={handleSubmit}
                        t={t}
                        onSubmit={onSubmit}
                        downloadLink={downloadLink}
                        searchType={searchType}
                        tenantId={tenantId}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
export default SearchParent;
