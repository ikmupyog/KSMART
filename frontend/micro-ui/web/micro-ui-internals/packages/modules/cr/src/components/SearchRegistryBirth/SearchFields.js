import React, { Fragment, useState } from "react";
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

  const BIRTH_TYPE_VALUES = {
    NORMAL: { code: 'NORMAL', value: 'CRBRNR' },
    CORRECTION: { code: 'CORRECTION', value: 'CORRECTION' },
    STILL_BIRTH: { code: 'STILL_BIRTH', value: 'CRBRSB' },
    ABANDONED: { code: 'ABANDONED', value: 'CRBRAB ' },
    NAC: { code: 'NAC', value: 'CRBRNC' },
    ADOPTION: { code: 'ADOPTION', value: 'CRBRAD' },
    BORN_OUTSIDE_INDIA: { code: 'BORN_OUTSIDE_INDIA', value: 'CRBRBO' }
  };

  const EXCLUSION_TYPES = [
    BIRTH_TYPE_VALUES.ABANDONED.code,
    BIRTH_TYPE_VALUES.ADOPTION.code,
    BIRTH_TYPE_VALUES.CORRECTION.code,
  ]

  const [birthTypeSelected, setBirthTypeSelected] = useState(BIRTH_TYPE_VALUES.NORMAL);

  return (
    <Fragment>
      <SearchField>
        <label>
          {t("BIRTH_TYPE")}</label>
        <Controller
          control={control}
          name="birthType"
          render={(props) => (
            <Dropdown
              selected={birthTypeSelected}
              select={(e) => {
                setBirthTypeSelected(e);
                props.onChange(e.value);
              }}
              onBlur={props.onBlur}
              option={_.toArray(BIRTH_TYPE_VALUES).filter(item => !EXCLUSION_TYPES.includes(item.code))}
              optionKey="code"
              t={t}
              placeholder={`${t("BIRTH_TYPE")}`}
              {...(validation = { isRequired: true, title: t("BIRTH_TYPE") })}
            />
          )}
        />
      </SearchField>
      {(birthTypeSelected.value === BIRTH_TYPE_VALUES.NORMAL.value ||
        birthTypeSelected.value === BIRTH_TYPE_VALUES.STILL_BIRTH.value ||
        birthTypeSelected.value === BIRTH_TYPE_VALUES.ADOPTION.value ||
        birthTypeSelected.value === BIRTH_TYPE_VALUES.BORN_OUTSIDE_INDIA.value) && <Fragment>
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
              {birthTypeSelected.value === BIRTH_TYPE_VALUES.NORMAL.value && <span className="mandatorycss">*</span>}
              {t("DATE_OF_BIRTH")}
            </label>
            <Controller
              render={(props) => (
                <DatePicker
                  date={props.value}
                  onChange={props.onChange}
                  {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: (birthTypeSelected.value === BIRTH_TYPE_VALUES.NORMAL.value), title: t("CR_INVALID_DATE") })}
                />
              )}
              name="birthDate"
              control={control}
            />
          </SearchField>
          <SearchField>
            <label>
              {birthTypeSelected.value === BIRTH_TYPE_VALUES.NORMAL.value && <span className="mandatorycss">*</span>}
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
                  {...(validation = { isRequired: (birthTypeSelected.value === BIRTH_TYPE_VALUES.NORMAL.value), title: t("DC_INVALID_GENDER") })}
                />
              )}
            />
          </SearchField>
          <SearchField>
            <label>
              {birthTypeSelected.value === BIRTH_TYPE_VALUES.NORMAL.value && <span className="mandatorycss">*</span>}
              {t("NAME_OF_MOTHER")}
            </label>
            <TextInput
              name="nameOfMother"
              inputRef={register({})}
              placeholder={`${t("NAME_OF_MOTHER")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: (birthTypeSelected.value === BIRTH_TYPE_VALUES.NORMAL.value), type: "text", title: t("INVALID_NAME_MOTHER") })}
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
        </Fragment>}
      <SearchField>
        <label> {t("TEMPLATE_NUMBER", { type: t("REGISTRATION") })}</label>
        <TextInput name="registrationNo" inputRef={register({})} />
      </SearchField>
      {birthTypeSelected.value !== BIRTH_TYPE_VALUES.NORMAL.value &&
        birthTypeSelected.value !== BIRTH_TYPE_VALUES.STILL_BIRTH.value &&
        birthTypeSelected.value !== BIRTH_TYPE_VALUES.ADOPTION.value &&
        birthTypeSelected.value !== BIRTH_TYPE_VALUES.BORN_OUTSIDE_INDIA.value && <Fragment>
          <SearchField>
            <label>
              {t("FROM_DATE")}</label>
            <Controller
              render={(props) => <DatePicker date={props.value} onChange={props.onChange}  {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, title: t("TEMPLATE_INVALID", { type: t("FROM_DATE") }) })} />}
              name="fromDate"
              control={control}
            />
          </SearchField>
          <SearchField>
            <label>
              {t("TO_DATE")}</label>
            <Controller
              render={(props) => <DatePicker date={props.value} onChange={props.onChange}  {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, title: t("TEMPLATE_INVALID", { type: t("TO_DATE") }) })} />}
              name="toDate"
              control={control}
            />
          </SearchField>
          <SearchField>
            <label> {t("TEMPLATE_NUMBER", { type: t("BIRTH_ACKNOWLEDGEMENT") })}</label>
            <TextInput name="BirthACKNo" inputRef={register({})} />
          </SearchField>
        </Fragment>}
      <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
        <p
          onClick={() => {
            setBirthTypeSelected(BIRTH_TYPE_VALUES.NORMAL);
            reset({
              fromDate: "",
              toDate: "",
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
