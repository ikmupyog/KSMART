import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import {DatePicker, Dropdown, SearchField, SubmitBar, TextInput} from "@egovernments/digit-ui-react-components";

const SearchFields = ({
                          t,
                          register,
                          control,
                          reset,
                          previousPage
                      }) => {
    const stateId = Digit.ULBService.getStateId();
    const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");

    let validation = {};
    let cmbPlace = [];
    place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMasterDeath &&
    place["common-masters"].PlaceMasterDeath.map((ob) => {
        cmbPlace.push(ob);
    });


    return (
        <>
            <SearchField>
                <label> {t("REGISTRATION NO")}</label>
                <TextInput name="registrationNo" inputRef={register({})}
                           placeholder={`${t("Registration No")}`}
                           {...(validation = { isRequired: false, type: "text", title: t("Invalid Registration No.") })}/>
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("DATE OF MARRIAGE")}</label>
                <Controller
                    render={(props) => <DatePicker date={props.value} onChange={props.onChange} {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: true, title: t("CR_INVALID_DATE") })} />}
                    name="dateOfMarriage"
                    control={control}
                />
            </SearchField>
            <SearchField>
                <label> {t("NAME OF HUSBAND")}</label>
                <TextInput name="nameOfHusband" inputRef={register({})} placeholder={`${t("Name Of Husband")}`}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("Invalid Husband name") })} />
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("NAME OF WIFE")}</label>
                <TextInput name="nameOfWife" inputRef={register({})} placeholder={`${t("Name Of Wife")}`}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("Invalid Wife name") })} />
            </SearchField>
            <SearchField>
                <label> {t("PLACE OF MARRIAGE")}</label>
                <Controller
                    control={control}
                    name="placeOfMarriage"
                    render={(props) => (
                        <Dropdown
                            selected={props.value}
                            select={props.onChange}
                            onBlur={props.onBlur}
                            option={cmbPlace}
                            optionKey="code"
                            t={t}
                            placeholder={`${t("PLACE_OF_MARRIAGE")}`}
                            {...(validation = { isRequired: false, title: t("Invalid Place Of Marriage") })}
                        />
                    )}
                />
            </SearchField>
            <SearchField>
                <label> {t("KEY NO")}</label>
                <TextInput name="keyNo" inputRef={register({})}
                           placeholder={`${t("Key No")}`}
                           {...(validation = { isRequired: false, type: "text", title: t("Invalid Key No.") })}/>
            </SearchField>
            <SearchField className="submit">
                <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
                <p onClick={() => {

                    reset({
                        registrationNo: "",
                        dateOfMarriage: "",
                        nameOfHusband: "",
                        nameOfWife: "",
                        placeOfMarriage: "",
                        keyNo: ""
                    });
                    previousPage();
                }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
            </SearchField>
        </>
    )

};

export default SearchFields
