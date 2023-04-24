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
        <label> {t("ACKNOWLEDGMENT_NUMBER", { type: t("REGISTRATION") })}</label>
        <TextInput name="applicationNumber" inputRef={register({})} />
      </SearchField>
      <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
        <p
          onClick={() => {
            reset({
              // childName: "",
              // birthDate: "",
              // gender: "",
              // nameOfMother: "",
              // nameOfFather: "",
              // hospitalId: "",
              applicationNumber: "",
              // offset: 0,
              // limit: 10,
              // sortBy: "birthDate",
              // sortOrder: "DESC",
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
