import React, { Fragment, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, CardLabel, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
  display: "block",
};

const SearchFields = ({ register, control, reset, tenantId, t }) => {
  const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.tl.useMDMS.applicationTypes(tenantId);

  const applicationType = useWatch({ control, name: "applicationType" });

  let businessServices = [];
  if (applicationType && applicationType?.code === "RENEWAL") businessServices = ["EDITRENEWAL", "DIRECTRENEWAL"];
  else if (applicationType && applicationType?.code === "NEW") businessServices = ["NewTL"];
  else businessServices = ["EDITRENEWAL", "DIRECTRENEWAL", "NewTL"];

  const { data: statusData, isLoading } = Digit.Hooks.useApplicationStatusGeneral({ businessServices, tenantId }, {});
  let applicationStatuses = [];

  statusData &&
    statusData?.otherRoleStates?.map((status) => {
      let found = applicationStatuses.length > 0 ? applicationStatuses?.some((el) => el?.code === status.applicationStatus) : false;
      if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${status?.applicationStatus}` });
    });

  statusData &&
    statusData?.userRoleStates?.map((status) => {
      let found = applicationStatuses.length > 0 ? applicationStatuses?.some((el) => el?.code === status.applicationStatus) : false;
      if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${status?.applicationStatus}` });
    });
  const mutation = Digit.Hooks.dfm.useCreateModule(tenantId);
  const [moduleCode, setModulecode] = useState("");
  const [moduleNameEn, setModuleNameEn] = useState("");
  const [moduleNameMl, setModuleNameMl] = useState("");
  const setsetModulecode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setModulecode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // setDesignation(e.target.value);
  };
  const setsetModuleNameEn = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setModuleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // setDesignation(e.target.value);
  };
  const setsetModuleNameMl = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setModuleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const saveModule = () => {
    const formData = {
      RequestInfo: {
        apiId: "apiId",
        ver: "1.0",
        ts: null,
        action: null,
        did: null,
        key: null,
        msgId: null,
        authToken: "5d11c6dc-a87c-4b1e-8353-d1e2d8fb3bff",
        correlationId: null,
        userInfo: {
          id: null,
          tenantId: "kl.cochin",
          uuid: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
          roles: [
            {
              id: null,
              name: null,
              code: "EMPLOYEE",
              tenantId: null,
            },
          ],
        },
      },
      ModuleDetails: {
        id: null,
        tenantId: "kl.cochin",
        moduleCode: moduleCode,
        moduleNameEnglish: moduleNameEn,
        moduleNameMalayalam: moduleNameMl,
        status: null,
        auditDetails: {
          createdBy: null,
          createdTime: "111111111",
          lastModifiedBy: null,
          lastModifiedTime: null,
        },
      },
    };
    mutation.mutate(formData);
  };
  return (
    <>
      {/* <SearchField>
        <label>{t("File No")}</label>
        <TextInput name="fileCode" inputRef={register({})} />
      </SearchField> */}
      {applicationTypesLoading ? (
        <Loader />
      ) : (
        <SearchField>
          <CardLabel>
            {t("MODULE_CODE")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <TextInput
            onChange={setsetModulecode}
            value={moduleCode}
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="ModuleCode"
            placeholder={t("ENTER_MODULE_CODE")}
          />
        </SearchField>
      )}
      <SearchField>
        <CardLabel>
          {t("MODULE_NAME_ENG")}
          <span className="mandatorycss">*</span>
        </CardLabel>
        <TextInput
          onChange={setsetModuleNameEn}
          value={moduleNameEn}
          t={t}
          type={"text"}
          optionKey="i18nKey"
          name="ModuleNameEn"
          placeholder={t("MODULE_NAME_ENG")}
        />
      </SearchField>
      <SearchField>
        <CardLabel>
          {t("MODULE_NAME_MAL")}
          <span className="mandatorycss">*</span>
        </CardLabel>
        <TextInput
          onChange={setsetModuleNameMl}
          value={moduleNameMl}
          t={t}
          type={"text"}
          optionKey="i18nKey"
          name="ModuleNameEN"
          placeholder={t("MODULE_NAME_MAL")}
        />
      </SearchField>

      {/* <SubmitBar onSubmit={saveModule} label={t("save")} style={{ marginBottom: "10px" }} */}

      <SearchField className="submit">
        <SubmitBar label={t("SAVE")} submit onSubmit={saveModule} />
        <p
          onClick={() => {
            reset({
              applicationType: "",
              fromDate: "",
              toDate: "",
              licenseNumbers: "",
              status: "",
              tradeName: "",
              offset: 0,
              limit: 10,
              sortBy: "commencementDate",
              sortOrder: "DESC",
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
