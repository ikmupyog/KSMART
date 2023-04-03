import React from "react";
import { SearchForm, Table } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchFields from "./SearchFields";
import { useForm } from "react-hook-form";

const SearchApplicationMarriage = () => {
    const { t } = useTranslation();
    const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
        defaultValues: {
            offset: 0,
            limit: 10,
            sortBy: "DateOfDeath",
            sortOrder: "DESC",
        },
    });

    const onSubmit = () => {

    }

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
