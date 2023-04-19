import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import _ from "lodash";

let validation = {};

const SearchFields = ({ register, control, reset, tenantId, previousPage }) => {
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const { data: hospitalData = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "hospital");
  const { data: genderData = [] } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");

  return (
    <Fragment>
      <SearchField>
        <label>
          {t("BC_CHILD_NAME")}
        </label>
        <TextInput
          name="childName"
          inputRef={register({})}
          placeholder={`${t("BC_CHILD_NAME")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_DECEASED") })}
        />
      </SearchField>
      <SearchField>
        <label>
          {" "}
          <span className="mandatorycss">*</span>
          {t("DATE_OF_BIRTH")}
        </label>
        <Controller
          render={(props) => (
            <DatePicker
              date={props.value}
              onChange={props.onChange}
              {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: true, title: t("CR_INVALID_DATE") })}
            />
          )}
          name="birthDate"
          control={control}
        />
      </SearchField>
      <SearchField>
        <label>
          <span className="mandatorycss">*</span>
          {t("SEX")}
        </label>
        <Controller
          control={control}
          name="gender"
          render={(props) => (
            <Dropdown
              selected={props.value}
              select={props.onChange}
              onBlur={props.onBlur}
              option={genderData.map((genderDetails) => ({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` })) || []}
              optionKey="code"
              t={t}
              placeholder={`${t("SEX")}`}
              {...(validation = { isRequired: true, title: t("DC_INVALID_GENDER") })}
            />
          )}
        />
      </SearchField>
      <SearchField>
        <label>
          {" "}
          <span className="mandatorycss">*</span>
          {t("NAME_OF_MOTHER")}
        </label>
        <TextInput
          name="nameOfMother"
          inputRef={register({})}
          placeholder={`${t("NAME_OF_MOTHER")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("INVALID_NAME_MOTHER") })}
        />
      </SearchField>

      <SearchField>
        <label>{t("NAME_OF_FATHER")}</label>
        <TextInput
          name="nameOfFather"
          inputRef={register({})}
          placeholder={`${t("NAME_OF_FATHER")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("INVALID_NAME_OF_FATHER") })}
        />
      </SearchField>
      <SearchField>
        <label> {t("TEMPLATE_NAME", { type: t("HOSPITAL") })}</label>
        <Controller
          control={control}
          name="hospitalId"
          render={(props) => (
            <Dropdown
              selected={props.value}
              select={props.onChange}
              onBlur={props.onBlur}
              option={_.get(hospitalData, "egov-location.hospitalList", [])}
              optionKey="hospitalName"
              t={t}
              placeholder={t("TEMPLATE_NAME", { type: t("HOSPITAL") })}
            />
          )}
        />
      </SearchField>
      <SearchField>
        <label> {t("TEMPLATE_NUMBER", { type: t("REGISTRATION") })}</label>
        <TextInput name="registrationNo" inputRef={register({})} />
      </SearchField>
      <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
        <p
          onClick={() => {
            reset({
              childName: "",
              birthDate: "",
              gender: "",
              nameOfMother: "",
              nameOfFather: "",
              hospitalId: "",
              registrationNo: "",
              offset: 0,
              limit: 10,
              sortBy: "birthDate",
              sortOrder: "DESC",
            });
            previousPage();
          }}
        >
          {t(`ES_COMMON_CLEAR_ALL`)}
        </p>
      </SearchField>
    </Fragment>
  );
};
export default SearchFields;
