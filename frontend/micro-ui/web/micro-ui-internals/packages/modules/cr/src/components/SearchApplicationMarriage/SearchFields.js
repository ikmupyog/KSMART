import React, { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import {DatePicker, Dropdown, SearchField, SubmitBar, TextInput} from "@egovernments/digit-ui-react-components";

const SearchFields = ({
                          t,
                          register,
                          control,
                          reset,
                          searchType,
                          emptyRecords
                      }) => {

    let validation = {};
    const stateId = Digit.ULBService.getStateId();
    const [isIdPresent, setIsIdPresent] = useState(false);
    const { data: marriagePlaceType = {}, isMarriagePlaceTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
        stateId,
        "birth-death-service",
        "MarriagePlaceType"
    );
    const cmbPlace = []
    marriagePlaceType &&
    marriagePlaceType["birth-death-service"] &&
    marriagePlaceType["birth-death-service"].MarriagePlaceType &&
    marriagePlaceType["birth-death-service"].MarriagePlaceType.map((ob) => {
        cmbPlace.push(ob);
    });

    const idOnChange = (e) => {
        if (e.target.value) {
            setIsIdPresent(true);
        } else {
            setIsIdPresent(false);
        }
    }


    return (
        <>
            <SearchField>
                <label> {searchType == 'application' ? t("APPLICATION NO") : t("REGISTRATION NO")}</label>
                <TextInput name={searchType == 'application' ? "applicationNo" : "registrationNo"}
                           inputRef={register({})}
                           onChange={idOnChange}
                           control={control}
                           {...(validation = { isRequired: false, type: "text" })}
                           placeholder={`${searchType == 'application' ? t("Application No") : t("Registration No")}`} />
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("DATE OF MARRIAGE")}</label>
                <Controller
                    render={(props) => <DatePicker
                        date={props.value}
                        {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: !isIdPresent, title: t("CR_INVALID_DATE") })}
                        onChange={props.onChange} />}
                    name="marriageDOM"
                    control={control}
                />
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("FIRST NAME OF HUSBAND")}</label>
                <TextInput name="groomFirstnameEn" inputRef={register({})}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: !isIdPresent, title: t("Invalid name of husband") })} placeholder={`${t("Invalid name of husband")}`}/>
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("FIRST NAME OF WIFE")}</label>
                <TextInput name="brideFirstnameEn" inputRef={register({})}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: !isIdPresent, title: t("Invalid name of wife") })} placeholder={`${t("Name of Wife")}`} />
            </SearchField>
            <SearchField>
                <label> {t("PLACE OF MARRIAGE")}</label>
                <Controller
                    control={control}
                    name="marriagePlacetype"
                    rules={{ required: false}}
                    defaultValue={""}
                    render={(props) => (
                        <Dropdown
                            selected={props.value}
                            select={props.onChange}
                            onBlur={props.onBlur}
                            option={cmbPlace}
                            optionKey="name"
                            t={t}
                            placeholder={`${t("CR_MARRIAGE_PLACE_TYPE")}`}
                        />
                    )}
                />
            </SearchField>
            <SearchField className="submit">
                <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
                <p onClick={() => {
                    reset();
                    emptyRecords();
                }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
            </SearchField>
        </>
    )

};

export default SearchFields
