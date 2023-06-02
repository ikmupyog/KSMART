import React, { Fragment, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

//style
const mystyle = {
  display: "block",
};
let validation = {};

const SearchFields = ({ register, control, reset, tenantId, previousPage }) => {
  const [hospitalList, setHospitalList] = React.useState([]);
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const citizentenantId = Digit.ULBService.getCitizenCurrentTenant();
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(citizentenantId, `${citizentenantId.replace("kl.", "")}/egov-location`, "hospital");
  useEffect(() => {
    let cmbhospital = [];
    hospitalData &&
      hospitalData["egov-location"] &&
      hospitalData["egov-location"]?.hospitalList?.map((ob) => {
        cmbhospital.push(ob);
      });
    if (cmbhospital.length > 0) {
      setHospitalList(cmbhospital);
    }
  }, [hospitalData, citizentenantId])

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

  let applicationStatuses = [];

  return (
    <>
      <SearchField >
        <label>{t("CR_SEARCH_ACK_NO")}</label>
        <TextInput name="applicationNumber" placeholder={`${t("CR_SEARCH_ACK_NO")}`} inputRef={register({})} />
      </SearchField>
      <SearchField>
        <label>
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
          name="HospitalId"
          render={(props) => (
            <Dropdown
              selected={props.value}
              select={props.onChange}
              onBlur={props.onBlur}
              option={hospitalList}
              optionKey="hospitalName"
              t={t}
              placeholder={`${t("CD_HOSPITAL")}`}
            />
          )}
        />
      </SearchField>
      <SearchField>
        <label> {t("DC_BIRTH_AKNOWLEDGEMENT_NUMBER")}</label>
        <TextInput
          name="deathACKNo"
          inputRef={register({})}
          placeholder={`${t("DC_DEATH_AKNOWLEDGEMENT_NUMBER")}`}
          {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })}
        />
      </SearchField>
      <SearchField className="submit" style={{ marginLeft: "100px"}}>
      <p
          onClick={() => {
            reset({
              id: "",
              applicationNumber: "",
              fullName: "",
              dateofbirth: "",
              Gender: "",
              WifeorMotherName: '',
              HusbandorfatherName: "",
              HospitalId: ""
            });
            previousPage();
          }}
        >
          {t(`ES_COMMON_CLEAR_ALL`)}
        </p>
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
       
      </SearchField>
    </>
  );
};
export default SearchFields;
