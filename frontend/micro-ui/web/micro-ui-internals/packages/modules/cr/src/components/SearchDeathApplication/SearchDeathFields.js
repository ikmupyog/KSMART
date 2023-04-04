import { SearchField, TextInput, SubmitBar, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Controller } from "react-hook-form";


let validation = {}

const SearchDeathFields = ({ register, control, reset, tenantId, previousPage, t }) => {
 return(
    <React.Fragment>
    <SearchField>
        <label>{t("CR_SEARCH_ACK_NO")}</label>
        <TextInput name="DeathACKNo" inputRef={register({})}/>
    </SearchField>
    <SearchField>
        <label>
          {" "}
          <span className="mandatorycss">*</span>
          {t("CR_SEARCH_DECEASED_NAME")}
        </label>
        <TextInput
          name="fullName"
          inputRef={register({})}
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
    <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit/>
        <p onClick={()=>{
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