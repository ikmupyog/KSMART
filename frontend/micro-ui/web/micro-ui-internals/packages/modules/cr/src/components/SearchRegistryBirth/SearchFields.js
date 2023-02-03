import React, { Fragment } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

//style
const mystyle = {
  display: "block",
};
let validation = {};

const SearchFields = ({ register, control, reset, tenantId, previousPage }) => {
  // const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.cr.useMDMS.applicationTypes(tenantId);
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  let cmbhospital = [];
  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  const applicationType = useWatch({ control, name: "applicationType" });

  let businessServices = [];
  if (applicationType && applicationType?.code === "RENEWAL") businessServices = ["EDITRENEWAL", "DIRECTRENEWAL"];
  else if (applicationType && applicationType?.code === "NEW") businessServices = ["NewTL"];
  else businessServices = ["EDITRENEWAL", "DIRECTRENEWAL", "NewTL"];

  // const { data: statusData, isLoading } = Digit.Hooks.useApplicationStatusGeneral({ businessServices, tenantId }, {});
  let applicationStatuses = [];

  // statusData &&
  //   statusData?.otherRoleStates?.map((status) => {
  //     let found = applicationStatuses.length > 0 ? applicationStatuses?.some((el) => el?.code === status.applicationStatus) : false;
  //     if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${status?.applicationStatus}` });
  //   });

  // statusData &&
  //   statusData?.userRoleStates?.map((status) => {
  //     let found = applicationStatuses.length > 0 ? applicationStatuses?.some((el) => el?.code === status.applicationStatus) : false;
  //     if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${status?.applicationStatus}` });
  //   });

  return (
    <>
      <SearchField>
        <label>{t("Registry ID")}</label>
        <TextInput name="id" inputRef={register({})} />
      </SearchField>
      <SearchField>
        <label>
          {" "}
          <span className="mandatorycss">*</span>
          {t("BC_CHILD_NAME")}
        </label>
        <TextInput
          name="fullName"
          inputRef={register({})}
          placeholder={`${t("BC_CHILD_NAME")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_DECEASED") })}
        />
      </SearchField>
      <SearchField>
        <label>
          {" "}
          <span className="mandatorycss">*</span>
          {t("CR_DATE_OF_BIRTH_TIME")}
        </label>
        <Controller
          render={(props) => (
            <DatePicker
              date={props.value}
              onChange={props.onChange}
              {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, title: t("CR_INVALID_DATE") })}
            />
          )}
          name="dateofbirth"
          control={control}
        />
      </SearchField>
      <SearchField>
        <label>
          <span className="mandatorycss">*</span>
          {t("DC_GENDER")}
        </label>
        <Controller
          control={control}
          name="Gender"
          render={(props) => (
            <Dropdown
              selected={props.value}
              select={props.onChange}
              onBlur={props.onBlur}
              option={menu}
              optionKey="code"
              t={t}
              placeholder={`${t("DC_GENDER")}`}
              {...(validation = { isRequired: false, title: t("DC_INVALID_GENDER") })}
            />
          )}
        />
      </SearchField>
      <SearchField>
        <label>
          {" "}
          <span className="mandatorycss">*</span>
          {t("BC_MOTHER_NAME")}
        </label>
        <TextInput
          name="WifeorMotherName"
          inputRef={register({})}
          placeholder={`${t("DC_NAME_MOTHER_OR_WIFE")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_MOTHER_OR_WIFE") })}
        />
      </SearchField>

      <SearchField>
        <label>{t("BC_FATHER_NAME")}</label>
        <TextInput
          name="HusbandorfatherName"
          inputRef={register({})}
          placeholder={`${t("DC_NAME_FATHER_OR_HUSBAND")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_FATHER_OR_HUSBAND") })}
        />
      </SearchField>
      <SearchField>
        <label>{`${t("BC_HOSPITAL_NAME")}`}</label>
        <Controller
          control={control}
          name="HospitalName"
          render={(props) => (
            <Dropdown
              selected={props.value}
              select={props.onChange}
              onBlur={props.onBlur}
              option={cmbhospital}
              optionKey="code"
              t={t}
              placeholder={`${t("CD_HOSPITAL")}`}
            />
          )}
        />
      </SearchField>
      {/* <SearchField>
            <label>  {t("DC_REGISTRATION_NUMBER")}</label>
            <TextInput name="RegistrationNumber" inputRef={register({})}
                placeholder={`${t("DC_REGISTRATION_NUMBER")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })} />
        </SearchField> */}
      <SearchField>
        <label> {t("DC_BIRTH_AKNOWLEDGEMENT_NUMBER")}</label>
        <TextInput
          name="deathACKNo"
          inputRef={register({})}
          placeholder={`${t("DC_DEATH_AKNOWLEDGEMENT_NUMBER")}`}
          {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })}
        />
      </SearchField>

      {/* {applicationTypesLoading ? <Loader/> : <SearchField> 
            <label>{t("CR_SEARCH_APPLICATION_TYPE")}</label>
            <Controller
           
                    control={control}
                    name="applicationType"
                    render={(props) => (
                        <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={applicationTypes}
                        optionKey="i18nKey"
                        t={t}
                        />
                    )}
                    />
        </SearchField>}
        <SearchField>
            <label  style={mystyle}>{t("CR_SEARCH_FROM_DATE")}</label>
            <Controller
           
                render={(props) => <DatePicker  date={props.value} onChange={props.onChange} />}
                name="fromDate"
                control={control}
                />
        </SearchField>
        <SearchField>
            <label style={mystyle}>{t("CR_SEARCH_TO_DATE")}</label>
            <Controller
                render={(props) => <DatePicker   date={props.value} onChange={props.onChange} />}
                name="toDate"
                control={control}
                />
        </SearchField>
        { isLoading ? <Loader/> : <SearchField>
            <label>{t("CR_SEARCH_RESULTS_APP_STATUS_LABEL")}</label>
            <Controller
                    control={control}
                    name="status"
                    render={(props) => (
                        <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={applicationStatuses}
                        optionKey="i18nKey"
                        t={t}
                        />
                    )}
            />
        </SearchField>}
        <SearchField>
            <label>{t("CR_SEARCH_MOTHER_NAME")}</label>
            <TextInput  name="tradeName" inputRef={register({})}/>
        </SearchField>
       */}
      <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
        <p
          onClick={() => {
            reset({
              id: "",
              fullName:"",
              dateofbirth:"",
              gender:"",
              mother_fullname:"",
              hospitalid:"",
              //   DeceasedName: "",
              //   DeathDate: "",
              //   Gender: "",
              //   WifeorMotherName: "",
              //   HusbandorfatherName: "",
              //   HospitalName: "",
              //   RegistrationNumber: "",
              //   offset: 0,
              //   limit: 10,
              //   sortBy: "dateofreport",
              //   sortOrder: "DESC",
            });
            previousPage();
          }}
        >
          {t(`ES_COMMON_CLEAR_ALL`)}
        </p>
      </SearchField>
    </>
  );
};
export default SearchFields;
