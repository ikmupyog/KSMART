import React, { Fragment } from "react"
import { Controller } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import _ from "lodash";

let validation = {}

const SearchFields = ({ register, control, reset, tenantId, t, previousPage, onRestClick }) => {
    const stateId = Digit.ULBService.getStateId();
    const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
    const { data: hospitalData = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "hospital");

    let GenderOptions = [];
    Menu &&
        Menu.map((genderDetails) => {
            GenderOptions.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
        });

    return <Fragment>
        <SearchField>
            <label>
                <span className="mandatorycss">*</span>
                {t("DC_NAME_DECEASED")}</label>
            <TextInput name="DeceasedFirstNameEn" inputRef={register({})}
                placeholder={`${t("DC_NAME_DECEASED")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title:t("TEMPLATE_INVALID", { type: t("DC_NAME_DECEASED") }) })} />
        </SearchField>

        <SearchField>
            <label>
                <span className="mandatorycss">*</span>
                {t("DATE_OF_DEATH")}</label>
            <Controller
                render={(props) => <DatePicker date={props.value} onChange={props.onChange}  {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: true, title: t("TEMPLATE_INVALID", { type: t("DATE_OF_DEATH") }) })} />}
                name="DateOfDeath"
                control={control}
            />
        </SearchField>

        <SearchField>
            <label>
                <span className="mandatorycss">*</span>
                {t("SEX")}</label>
            <Controller
                control={control}
                name="DeceasedGender"
                render={(props) => (
                    <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={GenderOptions}
                        optionKey="code"
                        t={t}
                        placeholder={`${t("SEX")}`}
                        {...(validation = { isRequired: true, title: t("TEMPLATE_INVALID", { type: t("SEX") }) })}
                    />
                )}
            />
        </SearchField>

        <SearchField>
            <label> {t("TEMPLATE_NAME", { type: t("MOTHER", { context: 'S' }) })}</label>
            <TextInput name="MotherNameEn" inputRef={register({})} placeholder={t("TEMPLATE_NAME", { type: t("MOTHER", { context: 'S' }) })}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("TEMPLATE_INVALID", { type: t("TEMPLATE_NAME", { type: t("MOTHER", { context: 'S' }) }) }) })} />
        </SearchField>

        <SearchField>
            <label> {t("TEMPLATE_NAME", { type: t("FATHER", { context: 'S' }) })}</label>
            <TextInput name="FatherNameEn" inputRef={register({})} placeholder={t("TEMPLATE_NAME", { type: t("FATHER", { context: 'S' }) })}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("TEMPLATE_INVALID", { type: t("TEMPLATE_NAME", { type: t("FATHER", { context: 'S' }) }) }) })} />
        </SearchField>

        <SearchField>
            <label> {t("TEMPLATE_NAME", { type: t("HOSPITAL", { context: 'S' }) })}</label>
            <Controller
                control={control}
                name="hospital"
                render={(props) => (
                    <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={_.get(hospitalData, "egov-location.hospitalList", [])}
                        optionKey="hospitalName"
                        t={t}
                        placeholder={t("TEMPLATE_NAME", { type: t("HOSPITAL", { context: 'S' }) })}
                    />
                )}
            />
        </SearchField>

        <SearchField>
            <label> {t("TEMPLATE_NUMBER", { type: t("REGISTRATION") })}</label>
            <TextInput name="RegistrationNo" inputRef={register({})} placeholder={t("TEMPLATE_NUMBER", { type: t("REGISTRATION") })}
                {...(validation = { isRequired: false, type: "text", title: t("TEMPLATE_INVALID", { type: t("TEMPLATE_NUMBER", { type: t("REGISTRATION") }) }) })} />
        </SearchField>

        <SearchField>
            <label> {t("TEMPLATE_NUMBER", { type: t("DEATH_ACKNOWLEDGEMENT") })}</label>
            <TextInput
                name="DeathACKNo"
                inputRef={register({})}
                placeholder={t("TEMPLATE_NUMBER", { type: t("DEATH_ACKNOWLEDGEMENT") })}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TEMPLATE_INVALID", { type: t("TEMPLATE_NUMBER", { type: t("DEATH_ACKNOWLEDGEMENT") }) }) })}
            />
        </SearchField>

        <SearchField>
            <label> {t("TEMPLATE_NUMBER", { type: t("KEY") })}</label>
            <TextInput
                name="CertificateNo"
                inputRef={register({})}
                placeholder={t("TEMPLATE_NUMBER", { type: t("KEY") })}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TEMPLATE_INVALID", { type: t("TEMPLATE_NUMBER", { type: t("KEY") }) }) })}
            />
        </SearchField>

        <SearchField className="submit">
            <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
            <p onClick={() => {
                reset({
                    DeceasedFirstNameEn: "",
                    DateOfDeath: "",
                    DeceasedGender: "",
                    MotherNameEn: "",
                    FatherNameEn: "",
                    hospital: "",
                    RegistrationNo: "",
                    DeathACKNo: "",
                    CertificateNo: "",
                    offset: 0,
                    limit: 10,
                    sortBy: "DateOfDeath",
                    sortOrder: "DESC",
                });
                onRestClick && onRestClick({})
                previousPage();
            }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
        </SearchField>
    </Fragment>
}
export default SearchFields