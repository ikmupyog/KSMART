import React, { Fragment, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, CardLabel, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
  display: "block",
};

const SearchFields = ({ register, control, reset, tenantId, t }) => {
  // const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.tl.useMDMS.applicationTypes(tenantId);

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
  const mutation = Digit.Hooks.dfm.useCreateSubModule(tenantId);
  const [ModuleName, setModuleName] = useState("");
  const [majorFunction, setmajorFunction] = useState("");
  const [sfCode, setSfcode] = useState("");
  const [subFuncNm, setsubFuncNm] = useState("");
  const [subFuncMl, setsubFuncMl] = useState("");
  const [subFuncNmMl, setsubFuncNmMl] = useState("");

  function selectModuleName(value) {
    setModuleName(value);
  }
  function selectMajorFunction(value) {
    setmajorFunction(value);
  }

  const setsetSfcode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setSfcode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetsubFuncNm = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setsubFuncNm(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetsubFuncMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setsubFuncMl("");
    } else {
      setsubFuncMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetsubFuncNmMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setsubFuncNmMl("");
    } else {
      setsubFuncNmMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
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
      SubFunctionDetails: {
        id: null,
        tenantId: "kl.cochin",
        subFunctionCode: sfCode,
        majorFunctionId: majorFunction,
        subFunctionNameEnglish: subFuncNm,
        subFunctionNameMalayalam: subFuncMl,
        auditDetails: {
          createdBy: null,
          createdTime: 111111111,
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
      {/* {applicationTypesLoading ? ( */}
        {/* <Loader />
      ) : ( */}
        <SearchField>
          <CardLabel>
            {t("MODULE_NAME_ENG")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            selected={ModuleName}
            select={selectModuleName}
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="RegistrationNo"
            placeholder={t("MODULE_NAME_ENG")}
          />
        </SearchField>
      {/* )} */}
      <SearchField>
        <CardLabel>
          {t("MAJOR_FUNCTION_NAME_ENG")}
          <span className="mandatorycss">*</span>
        </CardLabel>
        <Dropdown
          selected={majorFunction}
          select={selectMajorFunction}
          t={t}
          type={"text"}
          optionKey="i18nKey"
          name="RegistrationNo"
          placeholder={t("MAJOR_FUNCTION_NAME_ENG")}
        />
      </SearchField>
      <SearchField>
        <CardLabel>
          {t("SF_CODE")}
          <span className="mandatorycss">*</span>
        </CardLabel>
        <TextInput onChange={setsetSfcode} value={sfCode} t={t} type={"text"} optionKey="i18nKey" name="RegistrationNo" placeholder={t("SF_CODE")} />
      </SearchField>
      <SearchField>
        <CardLabel>
          {t("SUB_FUNCTION_NAME_ENG")}
          <span className="mandatorycss">*</span>
        </CardLabel>
        <TextInput
          onChange={setsetsubFuncNm}
          value={subFuncNm}
          t={t}
          type={"text"}
          optionKey="i18nKey"
          name="RegistrationNo"
          placeholder={t("SUB_FUNCTION_NAME_ENG")}
        />
      </SearchField>
      <SearchField>
        <CardLabel>
          {t("SUB_FUNCTION_NAME_MAL")}
          <span className="mandatorycss">*</span>
        </CardLabel>
        <TextInput
          onChange={setsetsubFuncMl}
          value={subFuncMl}
          t={t}
          type={"text"}
          optionKey="i18nKey"
          name="RegistrationNo"
          placeholder={t("SUB_FUNCTION_NAME_MAL")}
        />
      </SearchField>
      <SearchField>
        <CardLabel>
          {t("SUB_FUNCTION_NAME_MAL")}
          <span className="mandatorycss">*</span>
        </CardLabel>
        <TextInput
          onChange={setsetsubFuncNmMl}
          value={subFuncNmMl}
          t={t}
          type={"text"}
          optionKey="i18nKey"
          name="RegistrationNo"
          placeholder={t("SUB_FUNCTION_NAME_MAL")}
        />
      </SearchField>
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
              sortBy: "moduleCode",
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
