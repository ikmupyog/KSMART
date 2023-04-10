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

    let validation = {};
    const cmbPlace = [
        { i18nKey: "Religious Institution", name: "RELIGIOUSINSTITUTION", namelocal: "മത സ്ഥാപനം" },
        {
            i18nKey: "Mandapam/Hall/Auditorium/Convention Centre",
            name: "MANDAPAM/HALL/AUDITORIUM/CONVENTIONALCENTRE",
            namelocal: "മണ്ഡപം/ ഹാൾ / ഓഡിറ്റോറിയം",
        },
        { i18nKey: "Sub Registrar's Office", name: "SUBREGISTRARSOFFICE", namelocal: "സബ് രജിസ്ട്രാർ ഓഫീസ്" },
        { i18nKey: "House", name: "HOUSE", namelocal: "വീട്" },
        { i18nKey: "Private Place", name: "PRIVATEPLACE", namelocal: "സ്വകാര്യ സ്ഥലം" },
        { i18nKey: "Public Place", name: "PUBLICPLACE", namelocal: "പൊതു സ്ഥലം" },
    ];


    return (
        <>
            <SearchField>
                <label> {t("APPLICATION NO")}</label>
                <TextInput name="applicationNo"
                           inputRef={register({})}
                           control={control}
                           {...(validation = { isRequired: false, type: "text" })}
                           placeholder={`${t("Application No")}`} />
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("DATE OF MARRIAGE")}</label>
                <Controller
                    render={(props) => <DatePicker date={props.value} onChange={props.onChange} />}
                    name="marriageDOM"
                    defaultValue={""}
                    rules={{ required: true }}
                    control={control}
                />
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("FIRST NAME OF HUSBAND")}</label>
                <TextInput name="groomFirstnameEn" inputRef={register({})}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: true, title: t("Invalid name of husband") })} placeholder={`${t("Invalid name of husband")}`}/>
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("FIRST NAME OF WIFE")}</label>
                <TextInput name="brideFirstnameEn" inputRef={register({})}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: true, title: t("Invalid name of wife") })} placeholder={`${t("Name of Wife")}`} />
            </SearchField>
            <SearchField>
                <label> {t("PLACE OF MARRIAGE")}</label>
                <Controller
                    control={control}
                    name="placeOfMarriage"
                    rules={{ required: false}}
                    defaultValue={""}
                    render={(props) => (
                        <Dropdown
                            selected={props.value}
                            select={props.onChange}
                            onBlur={props.onBlur}
                            option={cmbPlace}
                            optionKey="i18nKey"
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
                }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
            </SearchField>
        </>
    )

};

export default SearchFields
