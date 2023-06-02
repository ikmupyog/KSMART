import { SearchField, TextInput, SubmitBar, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Controller } from "react-hook-form";


let validation = {}

const SearchDeathFields = ({ register, control, reset, tenantId, previousPage, t }) => {
    const stateId = Digit.ULBService.getStateId();
    const { data: Menu, isLoading: genderLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
    const { data: hospitalData = {}, isLoading: hospitalLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");

    let GenderOptions = [];
    Menu &&
        Menu.map((genderDetails) => {
            GenderOptions.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
        });
    let cmbhospital = [];
    hospitalData &&
        hospitalData["egov-location"] &&
        hospitalData["egov-location"].hospitalList.map((ob) => {
            cmbhospital.push(ob);
        });
    return (
        <React.Fragment>
            <SearchField>
                <label>{t("CR_SEARCH_ACK_NO")}</label>
                <TextInput name="DeathACKNo" placeholder={`${t("CR_SEARCH_ACK_NO")}`} inputRef={register({})} />
            </SearchField>
            <SearchField>
                <label>
                    {t("CR_SEARCH_DECEASED_NAME")}
                </label>
                <TextInput
                    name="fullName"
                    placeholder={`${t("CR_SEARCH_DECEASED_NAME")}`}
                    inputRef={register({})}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("TEMPLATE_INVALID", { type: t("DC_NAME_DECEASED") }) })}
                />
            </SearchField>
            <SearchField>
                <label>
                    {t("CR_DATE_OF_DEATH")}
                </label>
                <Controller
                    render={(props) => <DatePicker date={props.value} onChange={props.onChange}  {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, title: t("CR_DATE_OF_DEATH") })} />}
                    name="DeathDate"
                    control={control}
                />
            </SearchField>
            <SearchField>
                <label>
                    {t("CR_GENDER")}
                </label>
                <Controller
                    control={control}
                    name="deceasedGender"
                    render={(props) => (
                        <Dropdown
                            isMandatory={true}

                            selected={props.value}
                            select={props.onChange}
                            onBlur={props.onBlur}
                            option={GenderOptions}
                            optionKey="code"
                            t={t}
                            placeholder={`${t("CR_GENDER")}`}
                            {...(validation = { isRequired: false, title: t("CR_INVALID_GENDER") })}
                        />
                    )}
                />
            </SearchField>
            <SearchField>
                <label> {t("DC_DECEASED_FATHER_NAME")}</label>
                <TextInput name="FatherNameEn" inputRef={register({})} placeholder={`${t("DC_DECEASED_FATHER_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_DECEASED_FATHER_NAME") })} />
            </SearchField>
            <SearchField>
                <label> {t("DC_DECEASED_MOTHER_NAME")}</label>
                <TextInput name="MotherNameEn" inputRef={register({})} placeholder={`${t("DC_DECEASED_MOTHER_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_MOTHER_NAME") })} />
            </SearchField>
            <SearchField>
                <label>{t("DC_HUSBAND_OR_WIFE_NAME")}</label>
                <TextInput name="SpouseNameEn" inputRef={register({})}
                    placeholder={`${t("DC_HUSBAND_OR_WIFE_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_HUSBAND_OR_WIFE_NAME") })} />
            </SearchField>
            <SearchField>
                <label> {t("DC_DECEASED_ADDRESS")}</label>
                <TextInput name="AddressEn" inputRef={register({})} placeholder={`${t("DC_DECEASED_ADDRESS")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_ADDRESS") })} />
            </SearchField>
            <SearchField>
                <label>{`${t("CR_HOSPITAL_EN")}`}</label>
                <Controller
                    control={control}
                    name="hospital"
                    render={(props) => (
                        <Dropdown
                            selected={props.value}
                            select={props.onChange}
                            onBlur={props.onBlur}
                            option={cmbhospital}
                            optionKey="hospitalName"
                            t={t}
                            placeholder={`${t("CR_HOSPITAL_EN")}`}
                        />
                    )}
                />
            </SearchField>
            <SearchField className="submit">
                <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
                <p onClick={() => {
                    reset({
                        id: "",
                    });
                    previousPage();
                }}>
                    CLEAR ALL
                </p>
            </SearchField>
        </React.Fragment>
    )
}

export default SearchDeathFields;