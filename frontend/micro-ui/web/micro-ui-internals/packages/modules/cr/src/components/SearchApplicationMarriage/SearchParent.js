import React, { useState} from "react";
import { Loader, SearchForm} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchFields from "./SearchFields";
import { useForm } from "react-hook-form";
import ResultTable from "../SearchMarriageInclusion/ResultTable";
import { useHistory } from "react-router-dom";

const SearchParent = ({
                          searchType = 'application'
                      }) => {
    let history = useHistory();

    const searchDefaultFields = {
        marriageDOM: "",
        groomFirstnameEn: "",
        brideFirstnameEn: "",
        placeOfMarriage: "",
    }

    if (searchType === 'application') {
        searchDefaultFields.applicationNo = "";
    } else {
        searchDefaultFields.registrationNo = "";
    }

    const [results, setResults] = useState([]);
    const [defaultValue, setDefaultValue] = useState({
        offset: 0,
        limit: 10,
        sortBy: "",
        sortOrder: "DESC",
    });

    const tenantId = Digit.ULBService.getCurrentTenantId();
    const { mutate, isLoading } = searchType == 'application' ? Digit.Hooks.cr.useSearchMarriage(tenantId) : Digit.Hooks.cr.useRegistrySearchMarriage(tenantId) ;
    const { t } = useTranslation();
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: searchDefaultFields
    });

    const getValue = (type) => {
        return defaultValue[type];
    }

    const setValue = (type, value) => {
        const obj = {...defaultValue };
        obj[type] = value;
        setDefaultValue(obj);
    }
    const onSuccess = (data) => {
        if (data && data["MarriageDetails"]) {
            setResults(data["MarriageDetails"])
        }
    };

    const onSubmit = (_data) => {
        let marriageDOM = new Date(_data?.marriageDOM);
        marriageDOM?.setSeconds(marriageDOM?.getSeconds() - 19800);

        let data = {
            ..._data,
            ...(_data.marriageDOM ? { marriageDOM: marriageDOM?.getTime() } : {}),
        };

        data = Object.keys(data)
            .filter((k) => data[k])
            .reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].name : data[key] }), {})

        const params = {
            filters: data
        }
        mutate(params, { onSuccess })
    };
    function previousPage() {
        setValue("offset", getValue("offset") - getValue("limit"));
        handleSubmit(onSubmit)();
    }

    const goToLink = (data) => {
        history.push({
            pathname: `/digit-ui/citizen/cr/marriage-correction-edit`,
            state: { marriageCorrectionData: data },
        });
    };


    return (
        <React.Fragment>
            <div className={"marriage-search-application"}>
                <h1>{searchType == 'application' ? t("CR_SEARCH_MARRIAGE_APPLICATION") : t("CR_DOWNLOAD_MARRIAGE_CERTIFICATE")}</h1>
                <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                    <SearchFields
                        searchType={searchType}
                        {...{ t, register, control, reset, previousPage }} />
                </SearchForm>
            </div>
            {isLoading && <Loader/>}
            { results.length == 0 && (
                <React.Fragment>
                    <ResultTable
                        setValue={setValue}
                        getValues={getValue}
                        data={results}
                        handleSubmit={handleSubmit}
                        t={t}
                        onSubmit={onSubmit}
                        goToLink={goToLink}
                        searchType={searchType}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
export default SearchParent;
